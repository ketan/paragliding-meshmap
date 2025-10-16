import React from 'react'

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
  const id = `global-tooltip`
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
    </>
  )
}
