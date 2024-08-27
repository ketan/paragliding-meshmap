import React, { ReactNode, useState } from 'react'
import { Modal, ModalBaseProps } from './modal'
import qs from 'qs'
import { kebabCase } from 'lodash'
import { meshtasticIndiaTelegramLink } from '../utils/link-utils.ts'

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

export function ConfigModal({ onClose, isOpen }: ModalBaseProps) {
  const [shortName, setShortName] = useState('')
  const [longName, setLongName] = useState('')
  const [skylinesId, setSkylinesId] = useState('')
  const [errors, setErrors] = useState({ shortName: '', longName: '', skylinesId: '' })
  const [errorMessage, setErrorMessage] = useState<ReactNode>()

  const validate = () => {
    const newErrors = { shortName: '', longName: '', skylinesId: '' }
    if (!shortName) {
      newErrors.shortName = 'Short Name is required'
    }
    if (!longName) {
      newErrors.longName = 'Long Name is required'
    }
    if (!skylinesId) {
      newErrors.skylinesId = 'Skylines ID is required'
    }
    setErrors(newErrors)
    return !newErrors.shortName && !newErrors.longName && !newErrors.skylinesId
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) {
      return
    }

    const queryString = qs.stringify({
      shortName: shortName,
      longName: longName,
      skylinesId: skylinesId,
    })
    try {
      const resp = await fetch(`/api/device-config?${queryString}`)
      if (resp.status === 200) {
        const blob = await resp.blob()
        download(blob, shortName)
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
    <Modal isOpen={isOpen} onClose={onClose} header={`Configure your meshtastic device`}>
      <div className="pt-4 pb-4 text-sm md:text-md">
        {errorMessage && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label htmlFor="shortName" className="block text-sm font-medium text-gray-700">
              Short Name
            </label>
            <input
              type="text"
              id="shortName"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.shortName && <p className="mt-1 text-xs text-red-500">{errors.shortName}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Enter a unique enough short identifier for yourself (preferably less than 5 characters).
            </p>
          </div>
          <div>
            <label htmlFor="longName" className="block text-sm font-medium text-gray-700">
              Long Name
            </label>
            <input
              type="text"
              id="longName"
              value={longName}
              onChange={(e) => setLongName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.longName && <p className="mt-1 text-xs text-red-500">{errors.longName}</p>}
            <p className="mt-1 text-xs text-gray-500">Enter a long name for yourself.</p>
          </div>
          <div>
            <label htmlFor="skylinesId" className="block text-sm font-medium text-gray-700">
              Skylines ID
            </label>
            <input
              type="text"
              id="skylinesId"
              value={skylinesId}
              onChange={(e) => setSkylinesId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.skylinesId && <p className="mt-1 text-xs text-red-500">{errors.skylinesId}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Enter your{' '}
              <a href="https://skylines.aero/settings/tracking" target="_blank" rel="noreferrer">
                Skylines ID.
              </a>{' '}
              You will need to signup on skylines website, navigate to <em className="font-extrabold">Settings&gt;Live Tracking</em> and
              copy the live tracking key here.
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
