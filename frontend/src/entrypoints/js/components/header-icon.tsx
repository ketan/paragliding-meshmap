import React from 'react'
import { TooltipDirection } from './tooltip.tsx'
import { randomHex } from '../utils/ui-util.tsx'
import { Tooltip } from 'react-tooltip'

export function HeaderIcon({
  icon,
  tooltip,
  onClick,
  onMouseOver,
  onMouseOut,
  tooltipDir,
  children,
}: {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  onClick?: () => void
  onMouseOver?: () => void
  onMouseOut?: () => void
  tooltip?: string
  tooltipDir?: TooltipDirection
  className?: string | undefined
  children?: React.ReactNode
}) {
  const id = `tooltip-${randomHex(10)}`
  return (
    <>
      <button
        className={`has-tooltip rounded-full`}
        data-tooltip-content={tooltip}
        data-tooltip-place={tooltipDir}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseOut}
        onMouseOut={onMouseOut}
        data-tooltip-id={id}
      >
        <div className="bg-gray-100 hover:bg-gray-200 p-1 rounded-full min-w-6 min-h-6">
          {React.createElement(icon, { className: 'w-8 h-8' })}
        </div>
        {children}
      </button>
      {tooltip && <Tooltip id={id} openEvents={{ mouseover: true, mouseenter: true }} />}
    </>
  )
}
