import { Duration } from 'luxon'
import { ChangeEvent } from 'react'

export interface DurationDropdownProps {
  durationSinceNow: Duration
  setDurationSinceNow: (duration: Duration) => void
  selectedDuration: Duration
  setSelectedDuration: (duration: Duration) => void
}

export function DurationSelect({ durationSinceNow, setDurationSinceNow, selectedDuration, setSelectedDuration }: DurationDropdownProps) {
  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDuration = Duration.fromObject({ days: Number(e.target.value) })
    setSelectedDuration(newDuration)
    setDurationSinceNow(Duration.fromObject({ days: 0 })) // reset to "now"
  }

  const handlePrevious = () => {
    const newDurationSinceNow = durationSinceNow.plus(selectedDuration)
    setDurationSinceNow(newDurationSinceNow)
  }

  const handleNext = () => {
    const newDurationSinceNow = durationSinceNow.minus(selectedDuration)
    setDurationSinceNow(newDurationSinceNow)
  }

  const select = (
    <select
      className="ml-auto my-1 py-0 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={handleDurationChange}
      value={selectedDuration.as('days')}
    >
      <option value={1}>1 Day</option>
      <option value={3}>3 Days</option>
      <option value={7}>7 Days</option>
    </select>
  )

  const previousDuration = (
    <button
      className="my-1 mr-2 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onClick={handlePrevious}
    >
      &lt; Previous {selectedDuration.rescale().toHuman()}
    </button>
  )

  const nextDuration = (
    <button
      className="my-1 mr-2 px-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onClick={handleNext}
    >
      Next {selectedDuration.rescale().toHuman()} &gt;
    </button>
  )

  return (
    <div className="ml-auto py-0 flex">
      {previousDuration}
      {select}
      {durationSinceNow.toMillis() !== 0 && nextDuration}
    </div>
  )
}
