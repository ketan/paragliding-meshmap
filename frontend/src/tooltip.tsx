import React from 'react'

type TooltipProps = React.HTMLAttributes<HTMLSpanElement> & {
  tooltipText: string
  className?: string
}

export class Tooltip extends React.Component<TooltipProps> {
  render() {
    const { children, tooltipText, className } = this.props

    return (
      <>
        <span className={`has-tooltip font-light ${className || ''}`} aria-label={tooltipText} data-cooltipz-dir="bottom">
          {children}
        </span>
      </>
    )
  }
}
