import { useState } from 'react'
import { Modal } from './modal.tsx'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormField } from './form-field.tsx'
import { SubmitButton, SubmitButtonIcon } from './submit-button.tsx'
import { ActionBar } from './action-bar.tsx'
import { createOnSubmit, submitJSONForm } from '../utils/form-helpers.tsx'

interface PartnerModalProps {
  isOpen: boolean
  onClose: () => void
}

interface PartnerFormInputs {
  name: string
  email: string
  subject: string
  message: string
}

const partnerFormSchema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup.string().email('Invalid email address.').required('Email is required.'),
  subject: yup.string().required('Subject is required.'),
  message: yup.string().required('Message is required.'),
})
const resolver = yupResolver(partnerFormSchema)

export function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
  const [submissionStatus, setSubmissionStatus] = useState<SubmitButtonIcon>()

  const form = useForm<PartnerFormInputs>({
    mode: 'onBlur',
    resolver: resolver,
    shouldUnregister: true,
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={'Partner With Us'}>
      <div className="text-sm md:text-md">
        <form
          onSubmit={form.handleSubmit(
            createOnSubmit({
              submitHandler: (data) => submitJSONForm(data, '/api/partner-messages', 'POST'),
              submissionStatus: setSubmissionStatus,
            }),
            (e) => console.log(e)
          )}
          className="space-y-2 p-2"
        >
          <div className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-yellow-200 mb-8">
            <p className="font-semibold text-base">Note!</p>
            <ul className="list-disc list-inside space-y-1 md:text-sm text-xs">
              <li>
                <a target="_blank" rel="noreferrer" href="https://partners.bircom.in/partners.html">
                  See our existing partners here.
                </a>
              </li>
              <li>Please provide your details and a short message. We will get back to you as soon as possible.</li>
            </ul>
          </div>
          <FormField label="Name" id="name" register={form.register} errors={form.formState.errors} helpText="Your full name." />
          <FormField
            label="Email"
            id="email"
            type="email"
            register={form.register}
            errors={form.formState.errors}
            helpText="We'll never share your email."
          />
          <FormField
            label="Subject"
            id="subject"
            register={form.register}
            errors={form.formState.errors}
            helpText="Subject of your message."
          />
          <FormField
            label="Message"
            id="message"
            register={form.register}
            errors={form.formState.errors}
            helpText="Tell us how you'd like to partner with us."
            type="textarea"
          />

          <ActionBar>
            <SubmitButton icon={submissionStatus}>{submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}</SubmitButton>
          </ActionBar>
        </form>
      </div>
    </Modal>
  )
}
