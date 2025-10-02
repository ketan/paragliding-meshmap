import { Modal, ModalBaseProps } from './modal'
import { Wizard, WizardStep } from './wizard'
import { InstructionsPage } from './instructions-page'
import { ConfigFormPage, FormInputs } from './config-form-page'
import { useEffect, useState } from 'react'
import { ApplyConfigurationPage } from './apply-configuration-page'
import { FactoryResetPage } from './factory-reset-page'
import { useSearchParam } from '../hooks/use-window-location.tsx'
import { ChooseYourDevicePage } from './choose-your-device-page.tsx'
import { DownloadConfiguration } from './download-android-config.tsx'

export type ResetType = 'android' | 'bluetooth' | 'usb'

export function ConfigModal({ onClose, isOpen }: ModalBaseProps) {
  const [stepNumberParam, setStepNumberParam] = useSearchParam('configure', '0')
  const [resetTypeParam, setResetTypeParam] = useSearchParam('resetType', 'android')

  const [stepNumber, setStepNumber] = useState<number>(parseInt(stepNumberParam ?? '0') || 0)
  const [resetType, setResetType] = useState<ResetType>((resetTypeParam as ResetType) ?? 'android')

  const [shortNameParam, setShortNameParam] = useSearchParam('shortName')
  const [longNameParam, setLongNameParam] = useSearchParam('longName')

  const [formData, setFormData] = useState<FormInputs>({
    shortName: shortNameParam ?? '',
    longName: longNameParam ?? '',
  })

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (shortNameParam !== formData.shortName) {
      setShortNameParam(formData.shortName ?? '')
    }
  }, [formData.shortName, shortNameParam, setShortNameParam])

  useEffect(() => {
    if (longNameParam !== formData.longName) {
      setLongNameParam(formData.longName ?? '')
    }
  }, [formData.longName, longNameParam, setLongNameParam])

  useEffect(() => {
    setStepNumberParam(stepNumber.toString())
  }, [stepNumber, setStepNumberParam])

  useEffect(() => {
    setResetTypeParam(resetType)
  }, [resetType, setResetTypeParam])

  const steps: WizardStep[] = [
    {
      name: 'Instructions',
      description: 'Read these before continuing',
      component: <InstructionsPage />,
    },
    {
      name: 'Choose how to reset',
      description: 'Choose how you want to reset your device',
      component: <ChooseYourDevicePage resetType={resetType} setResetType={setResetType} />,
    },
    // Only add Factory reset step if not android
    ...(resetType !== 'android'
      ? [
          {
            name: 'Factory reset',
            description: 'Make sure your device is in factory reset mode',
            component: <FactoryResetPage resetType={resetType} />,
          },
        ]
      : []),
    {
      name: 'Capture details',
      description: 'Fill out the form and configure your device',
      component: <ConfigFormPage formData={formData} setFormData={setFormData} setFormValid={setIsFormValid} />,
    },
    ...(resetType == 'android'
      ? [
          {
            name: 'Apply configuration',
            description: 'Follow the instructions to apply the configuration',
            component: formData ? <DownloadConfiguration formData={formData} /> : <></>,
          },
        ]
      : [
          {
            name: 'Apply configuration',
            description: 'Follow the instructions to apply the configuration',
            component: formData ? <ApplyConfigurationPage formData={formData} resetType={resetType} /> : <></>,
          },
        ]),
  ]

  // Only allow proceeding from step 2 (form) if the form is valid
  const canProceed = stepNumber.toString() !== '3' || isFormValid

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShortNameParam(undefined)
        setLongNameParam(undefined)
        setResetTypeParam(undefined)
        onClose()
      }}
      header={`Configure Meshtastic device`}
    >
      <Wizard steps={steps} onStepChange={setStepNumber} canProceed={canProceed} stepNumber={stepNumber} />
    </Modal>
  )
}
