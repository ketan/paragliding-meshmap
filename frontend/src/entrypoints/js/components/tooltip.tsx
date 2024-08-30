import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { randomHex } from '../utils/ui-util.tsx'
type TooltipProps = React.HTMLAttributes<HTMLSpanElement> & {
  tooltipText: string
  className?: string
  tooltipDir?: TooltipDirection
}

export type TooltipDirection =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'

export function Tooltip({ children, tooltipText, className, tooltipDir = 'bottom', ...rest }: TooltipProps) {
  const id = `tooltip-${randomHex(10)}`
  return (
    <>
      <span
        className={`has-tooltip font-light ${className || ''}`}
        data-tooltip-id={id}
        data-tooltip-content={tooltipText}
        data-tooltip-place={tooltipDir}
        {...rest}
      >
        {children}
      </span>
      <ReactTooltip id={id} />
    </>
  )
}
