import { ReactNode } from 'react'

export function ActionBar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex justify-end border-t border-gray-200 mt-3 pt-3 p-2 lg:px-4 ${className}`}>{children}</div>
}
