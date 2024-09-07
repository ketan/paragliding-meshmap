import React from 'react'
import icon from '../../../assets/images/icon.png'
import { CircleInfoIcon, GearsIcon } from '../utils/icon-constants'
import { AboutModal } from './about-modal'
import { TooltipDirection } from './tooltip'
import { ToastContainer } from 'react-toastify'
import { ConfigModal } from './config-modal.tsx'
import glider from '../../../assets/images/glider.png'
import { Tooltip } from 'react-tooltip'
import { randomHex } from '../utils/ui-util.tsx'

interface PageProps extends React.PropsWithChildren {
  headerIcons?: React.ReactNode
  bannerMain?: React.ReactNode
  aboutModal: {
    show: boolean
    onClick: () => void
  }
  configModal: {
    show: boolean
    onClick: () => void
  }
}

export function Page(props: PageProps) {
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col h-full">
          {/* begin header */}
          <div className="flex bg-white p-2 border-gray-300 border-b h-16">
            <IconInHeader />
            <ApplicationName />
            {/* banner */}
            {props.bannerMain}
            {/* header action buttons */}
            <HeaderActionButtons>
              <HeaderIcon icon={GearsIcon} tooltip="Configure" tooltipDir="bottom" onClick={() => props.configModal.onClick()} />
              <HeaderIcon icon={CircleInfoIcon} tooltip="About" tooltipDir="bottom-end" onClick={() => props.aboutModal.onClick()} />
              {props.headerIcons}
            </HeaderActionButtons>
          </div>
          {/* end header */}

          {props.children}
        </div>
      </div>
      <ConfigModal onClose={() => props.configModal.onClick()} isOpen={props.configModal.show} />
      <AboutModal onClose={() => props.aboutModal.onClick()} isOpen={props.aboutModal.show} />
      <ToastContainer hideProgressBar theme="dark" />
    </>
  )
}

function HeaderActionButtons(props: React.PropsWithChildren) {
  return <div className="header flex my-auto ml-auto mr-0 sm:mr-2 space-x-1 sm:space-x-2">{props.children}</div>
}

export function HeaderIcon({
  icon,
  tooltip,
  onClick,
  tooltipDir,
}: {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  onClick?: () => void
  tooltip: string
  tooltipDir: TooltipDirection
  className?: string | undefined
}) {
  const id = `tooltip-${randomHex(10)}`
  return (
    <>
      <button
        className={`has-tooltip rounded-full`}
        data-tooltip-content={tooltip}
        data-tooltip-place={tooltipDir}
        onClick={onClick}
        data-tooltip-id={id}
      >
        <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full min-w-6 min-h-6">
          {React.createElement(icon, { className: 'w-6 h-6' })}
        </div>
      </button>
      <Tooltip id={id} />
    </>
  )
}

function ApplicationName() {
  return (
    <div className="my-auto leading-tight hidden md:block">
      <a className="font-bold sm:text-sm md:text-base lg:text-xl text-nowrap" href="https://bircom.in/">
        Bircom Tracker 
      </a>
    </div>
  )
}

function IconInHeader() {
  return (
    <a className="min-w-10 min-h-10 max-w-10 max-h-10 block m-auto relative mr-2.5" href="/">
      <img className="absolute -top-2 -right-5 w-7" src={glider} alt="Glider icon" />
      <img className="w-full h-full rounded bg-opacity-90" src={icon} alt="Meshtastic icon" />
    </a>
  )
}
