import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { XMarkIcon } from '../utils/icon-constants.ts'

interface HeaderButton {
  icon: React.JSX.Element
  onClick: () => void
}

interface FooterButton {
  label: string
  onClick: () => void
  className?: string
}

export interface ModalBaseProps {
  onClose: () => void
  isOpen: boolean
}

interface ConfigurableModalProps extends ModalBaseProps {
  header: React.ReactNode
  headerButtons?: HeaderButton[]
  footerButtons?: FooterButton[]
}

export function Modal({ isOpen, onClose, header, footerButtons, headerButtons, children }: PropsWithChildren<ConfigurableModalProps>) {
  const ref = useRef<HTMLDivElement>(null)

  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (event.target && !ref?.current?.contains(event.target as Node)) {
        onClose()
      }
    },
    [onClose, ref]
  )

  useEffect(() => {
    function uninstallHandlers() {
      document.removeEventListener('mouseup', handleOutsideClick)
      document.removeEventListener('keyup', handleEscKey, false)
    }

    function installHandlers() {
      document.addEventListener('mouseup', handleOutsideClick)
      document.addEventListener('keyup', handleEscKey, false)
    }

    if (isOpen) {
      installHandlers()
    } else {
      uninstallHandlers()
    }
    return () => {
      uninstallHandlers()
    }
  }, [handleOutsideClick, handleEscKey, isOpen])

  if (!isOpen) {
    return null
  }

  function bottomButtons() {
    if (!footerButtons || footerButtons.length === 0) {
      return
    }
    return (
      <div className="flex justify-end p-4 border-t space-x-2">
        {footerButtons.map((button, index) => (
          <button key={index} onClick={button.onClick} className={`p-2 rounded`}>
            {button.label}
          </button>
        ))}
      </div>
    )
  }

  const allHeaderButtons = (headerButtons || []).concat({
    icon: <XMarkIcon className="w-4 h-4" />,
    onClick: onClose,
  })

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-gray-900/75 w-full h-full">
      <div
        className="relative w-[95%] max-w-[95%] sm:w-[90%] sm:max-w-[90%] md:max-w-2xl lg:max-w-2xl mx-auto bg-white rounded-lg shadow-lg max-h-[90vh] h-[90vh] flex flex-col"
        ref={ref}
      >
        <div className="flex justify-between items-center p-2 border-b-1 border-gray-200 shadow-md">
          <h2 className="text-lg font-semibold">{header}</h2>
          <div className="flex space-x-2">
            {allHeaderButtons.map((button, index) => {
              return (
                <div key={index} onClick={button.onClick} className="bg-gray-100 hover:bg-gray-200 rounded-full p-2">
                  {button.icon}
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-2 overflow-y-auto grow">{children}</div>
        {bottomButtons()}
      </div>
    </div>
  )
}
