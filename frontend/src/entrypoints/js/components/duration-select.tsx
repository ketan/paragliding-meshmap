export function DurationSelect({ duration, updateDuration }: { duration: string; updateDuration: (value: string) => void }) {
  return (
    <select
      className="ml-auto my-1 py-0 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(e) => updateDuration(e.target.value)}
      value={duration}
    >
      <option value="P1D">1 day</option>
      <option value="P3D">3 days</option>
      <option value="P7D">7 days</option>
    </select>
  )
}
