import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { toast, ToastContent } from 'react-toastify'
import { SubmitButtonIcon } from '../components/submit-button.tsx'
import countryList from 'country-list'

export const inputClassNames = `block py-1.5 px-1 w-full text-sm text-gray-900 bg-transparent focus:bg-blue-50 border rounded-md bg-gray-200 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`
export const labelClassNames = `peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1.5 peer-focus:px-0 px-0 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:px-2 peer-focus:scale-75 peer-focus:-translate-y-6`
export const groupClassNames = `relative z-0 w-full mb-6 group`
export const fieldsetClassNames = `border rounded-lg border-gray-300 shadow-lg lg:p-4 lg:m-4 p-4 m-2`
export const legendClassNames = `text mb-3`
export const helpTextClassNames = `mt-1 text-xs text-gray-500`
export const errorClassNames = `mt-1 text-xs text-red-500`
export const countries = countryList.getData().sort((a, b) => a.name.localeCompare(b.name))

export function useFetchDataIntoForm<T extends FieldValues>(setValue: UseFormSetValue<T>, fetchUserProfile: () => Promise<T | undefined>) {
  useEffect(() => {
    async function fetchData() {
      const profileData = await fetchUserProfile()
      if (!profileData) {
        return
      }

      Object.keys(profileData).forEach((key) => {
        const fieldKey = key as keyof T
        // @ts-expect-error ignore this
        setValue(fieldKey, profileData[fieldKey])
      })
    }

    fetchData()
  }, [setValue, fetchUserProfile])
}

export function createOnSubmit<T extends object>({
  submitHandler,
  successMessage = 'Form submitted successfully!',
  errorMessage = 'There was an error submitting your data. Please try again!',
  submissionStatus,
}: {
  submitHandler: (data: T) => Promise<Response>
  successMessage?: ToastContent
  errorMessage?: ToastContent
  submissionStatus: Dispatch<SetStateAction<SubmitButtonIcon | undefined>>
}) {
  return async function onSubmit(data: T) {
    submissionStatus('submitting')
    try {
      const response = await submitHandler(data)

      if (response.ok) {
        toast.success(successMessage)
        submissionStatus('submitted')
        return await response.json()
      } else {
        toast.error(errorMessage)
        throw new Error('Network response was not ok')
      }
    } catch (_ignore) {
      submissionStatus('error')
    } finally {
      setTimeout(() => submissionStatus(undefined), 3000)
    }
  }
}

function formDataFor<T extends object>(data: T) {
  const formData = new FormData()

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof T]
    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i])
      }
    } else {
      formData.append(key, value as string | Blob)
    }
  })
  return formData
}

export async function submitFormData<T extends object>(data: T, fetchUrl: string, method: string): Promise<Response> {
  return await fetch(fetchUrl, {
    method: method,
    body: formDataFor(data),
    headers: {
      Accept: 'application/json',
    },
  })
}

// export function createOnSubmitDeprecated(fetchUrl: string, method: string) {
//   return async function onSubmit<T extends object>(data: T) {
//     const formData = formDataFor(data)
//
//     try {
//       const response = await fetch(fetchUrl, {
//         method: method,
//         body: formData,
//         headers: {
//           Accept: 'application/json',
//         },
//       })
//
//       if (!response.ok) {
//         throw new Error('Network response was not ok')
//       }
//
//       const result = await response.json()
//       console.log('Success:', result)
//     } catch (error) {
//       console.error('Error:', error)
//     }
//   }
// }
