import React, { useState } from 'react'
import icon from '../assets/images/icon.png'
import { CircleInfoIcon } from '../icon-constants'
import { AboutModal } from './about-modal'

interface PageProps extends React.PropsWithChildren {
  headerIcons: React.ReactNode[] | undefined
}

export function Page(props: PageProps) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="flex flex-col h-full">
          {/* begin header */}
          <div className="flex bg-white p-2 border-gray-300 border-b h-16">
            <IconInHeader />
            <ApplicationName />
            {/* banner */}

            {/* header action buttons */}
            <HeaderActionButtons>
              <HeaderIcon icon={CircleInfoIcon} tooltip="About" tooltipDir="bottom" onClick={() => setShowModal(true)} />
              {props.headerIcons}
            </HeaderActionButtons>
          </div>
          {/* end header */}

          <div className="flex flex-col gap-4 p-8">
            <div className="flex flex-col gap-4">{props.children}</div>
          </div>
        </div>
      </div>
      {showModal && <AboutModal setShowModal={setShowModal} />}
    </>
  )
}

function HeaderActionButtons(props: React.PropsWithChildren) {
  return <div className="header flex my-auto ml-auto mr-0 sm:mr-2 space-x-1 sm:space-x-2">{props.children}</div>
}

function HeaderIcon({
  icon,
  tooltip,
  onClick,
  tooltipDir,
}: {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  onClick?: () => void
  tooltip: string
  tooltipDir: 'left' | 'top' | 'right' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}) {
  // const newLocal = <CircleInfoIcon className="w-6 h-6" />
  return (
    <a href="#" className="has-tooltip rounded-full hidden sm:block" aria-label={tooltip} data-cooltipz-dir={tooltipDir} onClick={onClick}>
      <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full min-w-6 min-h-6">
        {React.createElement(icon, { className: 'w-6 h-6' })}
      </div>
    </a>
  )
}

function ApplicationName() {
  return (
    <div className="my-auto leading-tight block sm:hidden lg:block">
      <a className="font-bold sm:text-sm md:text-base lg:text-xl" href="/">
        Meshtastic map
      </a>
    </div>
  )
}

function IconInHeader() {
  return (
    <a className="hidden sm:block my-auto mr-3 relative" href="/">
      <div className="text-3xl absolute -top-2.5 -right-1.5">&#x1FA82;</div>
      <img className="w-10 h-10 rounded bg-opacity-90" src={icon} />
    </a>
  )
}
