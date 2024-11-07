import { ReactNode, useEffect, useState } from 'react'

interface TabProps {
  tabs: ReactNode[]
  children: ReactNode[]
  defaultActiveTab?: number
}

export function Tabs({ tabs, children, defaultActiveTab = 0 }: TabProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)

  useEffect(() => setActiveTab(defaultActiveTab), [defaultActiveTab])

  return (
    <>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`text-sm me-1 md:me-4 p-2 rounded-t-lg ${activeTab === index ? 'border-b-2 border-blue-500 bg-gray-200' : 'bg-gray-100'}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      {children[activeTab]}
    </>
  )
}
