import { ReactNode } from 'react'

type Value = ReactNode

type KeyValueType<T> = {
  name: string
  className?: string
} & (
  | { renderer: () => Value }
  | {
      value: T
      precision?: number
      unit?: ReactNode
    }
)

export function NameValue<T>(props: KeyValueType<T>) {
  const title = <span className="font-extrabold me-1">{props.name}:</span>

  if ('renderer' in props) {
    const value = props.renderer()
    if (value === null || value === undefined) {
      return
    }
    return (
      <span key={props.name} className={props.className}>
        {title}
        {value}
      </span>
    )
  }

  if ('value' in props) {
    if (props.value === undefined || props.value === null) {
      return
    }

    if (typeof props.value === 'string') {
      return (
        <span key={props.name} className={props.className}>
          {title}
          {props.value}
        </span>
      )
    } else if (typeof props.value === 'number') {
      if (Number.isInteger(props.value)) {
        return (
          <span key={props.name} className={props.className}>
            {title}
            {props.value}
            {props.unit}
          </span>
        )
      } else {
        return (
          <span key={props.name} className={props.className}>
            {title}
            {Number(props.value).toFixed(props.precision)}
            {props.unit}
          </span>
        )
      }
    }
  }
}
