import { XMarkIcon } from '../utils/icon-constants'
import React, { Dispatch, PropsWithChildren, SetStateAction } from 'react'

export interface ModalBaseProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export function Modal({ setShowModal, showModal, children }: PropsWithChildren<ModalBaseProps>) {
  if (!showModal) {
    return
  }

  return (
    <div className="relative z-sidebar">
      {/* overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75"></div>
      {/* modal */}
      <div className="fixed left-0 right-0 top-0 bottom-0 lg:pointer-events-none">
        <div className="flex w-full h-full overflow-y-auto p-4">
          <div className="mx-auto my-auto w-full max-w-2xl flex-col bg-white shadow-xl rounded-xl lg:pointer-events-auto min-w-full">
            <div className="relative flex">
              {/* close button */}
              <div className="absolute top-0 right-0 p-2">
                <div className="h-7">
                  <a href="#" className="rounded-full" onClick={() => setShowModal(false)}>
                    <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                      <XMarkIcon className="w-6 h-6" />
                    </div>
                  </a>
                </div>
              </div>

              {/* content */}

              <div className="flex flex-col w-full py-2 space-y-2">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
