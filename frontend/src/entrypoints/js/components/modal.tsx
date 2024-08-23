import { XMarkIcon } from '../utils/icon-constants'
import { Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useRef } from 'react'

export interface ModalBaseProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export function Modal({ setShowModal, showModal, children }: PropsWithChildren<ModalBaseProps>) {
  const ref = useRef<HTMLDivElement>(null)
  
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowModal(false)
      }
    },
    [() => setShowModal]
  )

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (event.target && !ref?.current?.contains(event.target as Node)) {
        setShowModal(false)
      }
    },
    [() => setShowModal, ref]
  )

  useEffect(() => {
    document.addEventListener('mouseup', handleOutsideClick)
    document.addEventListener('keyup', handleEscKey, false)

    return () => {
      document.removeEventListener('mouseup', handleOutsideClick)
      document.removeEventListener('keyup', handleEscKey, false)
    }
  }, [handleOutsideClick, handleEscKey, showModal])

  if (!showModal) {
    return
  }

  return (
    <div className="relative z-sidebar">
      {/* overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75"></div>
      {/* modal */}
      <div className="fixed left-0 right-0 top-0 bottom-0 lg:pointer-events-none">
        <div className="flex md:w-full h-full overflow-y-auto p-4">
          <div className="mx-auto my-auto sm:w-full md:w-[80%] lg:w-[40%] flex-col bg-white shadow-xl rounded-xl lg:pointer-events-auto sm:min-w-full md:min-w-[80%] lg:min-w-[40%]">
            <div className="relative flex" ref={ref}>
              {/* close button */}
              <div className="absolute top-0 right-0 p-2">
                <div className="h-7">
                  <a href="#" className="rounded-full" onClick={() => setShowModal(false)}>
                    <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                      <XMarkIcon className="w-3 h-3" />
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
