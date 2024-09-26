import { PropsWithChildren } from 'react'

export function Header({ str, children }: PropsWithChildren<{ str: string }>) {
  return (
    <h1 className="font-bold h-10 bg-gray-200 px-4 my-auto flex">
      <span className="my-auto">{str}</span>
      {children}
    </h1>
  )
}
