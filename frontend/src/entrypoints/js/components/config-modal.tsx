import { ReactNode, useState } from 'react'
import { Modal, ModalBaseProps } from './modal'
import qs from 'qs'
import { kebabCase } from 'lodash'
import { meshtasticIndiaTelegramLink } from '../utils/link-utils.ts'
import { SubmitHandler, useForm } from 'react-hook-form'

function download(blob: Blob, shortName: string) {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = `${kebabCase(shortName)}.cfg`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}

interface Inputs {
  shortName: string
  longName: string
  skylinesId: string
  adminPass: string
}

export function ConfigModal({ onClose, isOpen }: ModalBaseProps) {
  const [errorMessage, setErrorMessage] = useState<ReactNode>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const queryString = qs.stringify(inputs)
    try {
      const resp = await fetch(`/api/device-config?${queryString}`)
      if (resp.status === 200) {
        const blob = await resp.blob()
        download(blob, inputs.shortName)
      } else {
        setErrorMessage(
          <>
            An error occurred while generating the config. Please try again, if the problem persists, report it on the{' '}
            <a target="_blank" rel="noreferrer" href={meshtasticIndiaTelegramLink()}>
              telegram channel.
            </a>
          </>
        )
      }
    } catch (ignore) {
      setErrorMessage(
        <>
          An error occurred while generating the config. Please try again, if the problem persists, report it on the{' '}
          <a target="_blank" rel="noreferrer" href={meshtasticIndiaTelegramLink()}>
            telegram channel.
          </a>
        </>
      )
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={`Configure Meshtastic device`}>
      <div className="text-sm md:text-md">
        {errorMessage && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 p-2">
          <div className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-yellow-200">
            <p className="font-semibold text-base">Note!</p>
            <ul className="list-disc list-inside space-y-1 md:text-sm text-xs">
              <li>
                Importing this config will share your location <span className="font-semibold italic underline">publicly</span> every 180
                seconds. Do not shorten this interval to avoid increased battery use. Disable GPS or turn off the device if you don’t want
                to share your location.
              </li>
              <li>
                Bluetooth pin is set as{' '}
                <code className="font-mono rounded-[0.25em] py-[0.125rem] px-[0.1875rem] my-0 -mx-[0.1875rem] bg-yellow-600">123456</code>,
                you may change that to more secure pin from the Meshtastic phone application.
              </li>

              <li>Do not turn off Bluetooth on your Meshtastic device, or the app won&apos;t connect.</li>

              <li>
                Check the{' '}
                <a href="https://meshtastic.org/docs/configuration/" target="_blank" rel="noreferrer">
                  Meshtastic documentation
                </a>{' '}
                for more settings.
              </li>

              <li>Happy meshing! Great winds and clear skies!</li>
            </ul>
          </div>
          <div>
            <label htmlFor="shortName" className="block text-sm font-medium text-gray-700">
              Short Name
            </label>
            <input
              type="text"
              {...register('shortName', {
                required: 'This field is required.',
                minLength: {
                  value: 2,
                  message: 'Minimum length is 2.',
                },
                maxLength: {
                  value: 5,
                  message: 'Maximum length is 5.',
                },
              })}
              aria-invalid={errors.shortName ? 'true' : 'false'}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.shortName && <p className="mt-1 text-xs text-red-500">{errors.shortName.message}</p>}
            <p className="mt-1 text-xs text-gray-500">Enter a unique 3-5 character identifier.</p>
          </div>
          <div>
            <label htmlFor="longName" className="block text-sm font-medium text-gray-700">
              Long Name
            </label>
            <input
              type="text"
              {...register('longName', {
                required: 'This field is required.',
                minLength: {
                  value: 5,
                  message: 'Minimum length is 5.',
                },
                maxLength: {
                  value: 12,
                  message: 'Maximum length is 12.',
                },
              })}
              aria-invalid={errors.longName ? 'true' : 'false'}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.longName && <p className="mt-1 text-xs text-red-500">{errors.longName.message}</p>}
            <p className="mt-1 text-xs text-gray-500">Enter a name 5-12 characters long.</p>
          </div>
          <div>
            <label htmlFor="skylinesId" className="block text-sm font-medium text-gray-700">
              Skylines ID
            </label>
            <input
              type="text"
              {...register('skylinesId', {
                required: 'This field is required.',
                minLength: {
                  value: 6,
                  message: 'Minimum length is 8.',
                },
                maxLength: {
                  value: 10,
                  message: 'Maximum length is 10.',
                },
              })}
              aria-invalid={errors.skylinesId ? 'true' : 'false'}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.skylinesId && <p className="mt-1 text-xs text-red-500">{errors.skylinesId.message}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Enter your{' '}
              <a href="https://skylines.aero/settings/tracking" target="_blank" rel="noreferrer">
                Skylines ID.
              </a>{' '}
              You will need to signup on skylines website, navigate to <em className="font-extrabold">Settings&gt;Live Tracking</em> and
              copy the live tracking key here.
            </p>
          </div>

          <div>
            <label htmlFor="adminPass" className="block text-sm font-medium text-gray-700">
              Remote Admin password
            </label>
            <input
              type="text"
              {...register('adminPass', {
                required: 'This field is required.',
                minLength: {
                  value: 3,
                  message: 'Minimum length is 3.',
                },
                maxLength: {
                  value: 5,
                  message: 'Maximum length is 5.',
                },
              })}
              aria-invalid={errors.adminPass ? 'true' : 'false'}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.adminPass && <p className="mt-1 text-xs text-red-500">{errors.adminPass.message}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Set a 3-5 character password for remote access to the Meshtastic device for any technical support.
            </p>
          </div>
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
            Generate my config
          </button>
        </form>
      </div>
    </Modal>
  )
}
