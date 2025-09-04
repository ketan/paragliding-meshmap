import { ReactNode, useState } from 'react'
import { kebabCase } from 'lodash'
import { meshtasticIndiaTelegramLink } from '../utils/link-utils'
import { TRACKER_API_BASE_URL } from '../utils/ui-util'
import qs from 'qs'
import { IconBrandAndroid } from '@tabler/icons-react'
import { FormInputs } from './config-form-page.tsx'

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

interface DownloadConfigurationProps {
  formData: FormInputs
}

export function DownloadConfiguration({ formData }: DownloadConfigurationProps) {
  const [errorMessage, setErrorMessage] = useState<ReactNode>()

  const handleDownloadConfig = async () => {
    const queryString = qs.stringify({
      shortName: formData.shortName,
      longName: formData.longName,
    })
    try {
      const resp = await fetch(`${TRACKER_API_BASE_URL}/api/device-config?${queryString}`)
      if (resp.status === 200) {
        const blob = await resp.blob()
        download(blob, formData.shortName)
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
    <div className="text-sm md:text-md">
      <div className="block w-full sm:text-sm">
        <div className="rounded-md shadow-sm p-4">
          <div className="pl-2">
            <p className="font-semibold text-base text-center pb-4">Apply configuration</p>

            <div className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-yellow-200 mb-8">
              <p className="font-semibold text-base">Before you proceed!</p>
              <ul className="list-disc list-inside space-y-1 md:text-sm text-xs">
                <li>Restart your meshtastic device.</li>
                <li>Wait 30 seconds for it to start up.</li>
                <li>Then attempt a factory reset.</li>
                <li>
                  If this computer or phone cannot pair with your meshtastic device, try &#34;forgetting&#34; the bluetooth device from your
                  phone or computer settings.
                </li>
              </ul>
            </div>

            {errorMessage && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>}

            <div className="flex gap-4 text-white">
              {/*<ConnectionOperationButton*/}
              {/*  connectionStatus={bleConnectionStatus}*/}
              {/*  onButtonClicked={scanBLEDevices}*/}
              {/*  processState={bleConfigurationProcessState}*/}
              {/*  label={'Configure using Bluetooth (warning: may not work)'}*/}
              {/*  icon={({ inProgress, processCompleted }) =>*/}
              {/*    processCompleted ? <IconCheckbox /> : <BluetoothStatusIcon inProgress={inProgress} />*/}
              {/*  }*/}
              {/*  setFactoryResetState={setBleConfigurationProcessState}*/}
              {/*/>*/}
              {/*<ConnectionOperationButton*/}
              {/*  connectionStatus={serialConnectionStatus}*/}
              {/*  onButtonClicked={scanSerialDevices}*/}
              {/*  processState={usbConfigurationProcessState}*/}
              {/*  label={'Configure using USB (recommended)'}*/}
              {/*  icon={({ inProgress, processCompleted }) =>*/}
              {/*    processCompleted ? <IconCheckbox /> : <UsbStatusIcon inProgress={inProgress} />*/}
              {/*  }*/}
              {/*  setFactoryResetState={setUsbConfigurationProcessState}*/}
              {/*/>*/}
              <div className="flex-1 flex items-center gap-2 p-2 bg-blue-500 rounded">
                <IconBrandAndroid className="w-10 h-10 text-blue-600" />
                <button
                  type="button"
                  onClick={handleDownloadConfig}
                  className="flex-1 text-left py-2 rounded-md inline-flex items-center relative"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  Download config and install using Android app
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
