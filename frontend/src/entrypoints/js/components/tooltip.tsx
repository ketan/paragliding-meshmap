import React from 'react'

type TooltipProps = React.HTMLAttributes<HTMLSpanElement> & {
  tooltipText: string
  className?: string
  tooltipDir?: TooltipDirection
}

export type TooltipDirection = 'left' | 'top' | 'right' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export function Tooltip({ children, tooltipText, className, tooltipDir = 'bottom', ...rest }: TooltipProps) {
  return (
    <span className={`has-tooltip font-light ${className || ''}`} aria-label={tooltipText} data-cooltipz-dir={tooltipDir} {...rest}>
      {children}
    </span>
  )
}
