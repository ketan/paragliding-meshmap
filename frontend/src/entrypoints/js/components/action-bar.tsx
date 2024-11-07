import { ReactNode } from 'react'

export function ActionBar({ children }: { children: ReactNode }) {
  return <div className="flex justify-end border-t mt-3 pt-3 p-2 lg:px-4">{children}</div>
}
