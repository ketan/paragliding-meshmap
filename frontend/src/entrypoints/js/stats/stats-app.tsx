import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime, Duration } from 'luxon'
import { DurationSelect } from '../components/duration-select.tsx'
import { toParams } from '../utils/link-utils.ts'

function PositionsOverTime() {
  const [positionsOverTime, setPositionsOverTime] = useState(null)

  useEffect(() => {
    const fetchPositionsOverTime = async () => {
      try {
        const response = await fetch('/api/stats/positions-over-time')
        const data = await response.json()
        setPositionsOverTime(data)
      } catch (error) {
        console.error('Failed to fetch positions over time:', error)
      }
    }

    fetchPositionsOverTime()
    const intervalId = setInterval(fetchPositionsOverTime, 60000)

    return () => clearInterval(intervalId)
  }, [])

  if (!positionsOverTime) {
    return (
      <div>
        <h2>Positions Over Time</h2>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Positions Over Time</h2>

      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={positionsOverTime}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)} />
          <YAxis dataKey="count" />
          <Tooltip
            labelFormatter={(date) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}
            formatter={(value, _name) => [value, 'Count']}
          />
          <Legend />
          <Bar type="monotone" dataKey="count" fill="#8884d8" label="Foo" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function PositionsByNodeId() {
  const [positionsByNodeId, setPositionsByNodeId] = useState<
    {
      short_name: string
      long_name: string
      count: number
      node_id: number
    }[]
  >()
  const [selectedDuration, setSelectedDuration] = useState(Duration.fromObject({ days: 1 }))
  const [durationSinceNow, setDurationSinceNow] = useState(Duration.fromObject({ days: 0 }))

  useEffect(() => {
    const fetchPositionsByNodeId = async () => {
      try {
        const params = toParams(durationSinceNow, selectedDuration)
        const response = await fetch(`/api/stats/positions-by-node-id?${params}`)
        const data = await response.json()
        setPositionsByNodeId(data)
      } catch (error) {
        console.error('Failed to fetch positions by node id:', error)
      }
    }

    fetchPositionsByNodeId()
    const intervalId = setInterval(fetchPositionsByNodeId, 60000)

    return () => clearInterval(intervalId)
  }, [durationSinceNow, selectedDuration])

  if (!positionsByNodeId) {
    return (
      <div>
        <h2>Positions By Node ID</h2>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Positions By Node ID</h2>
      <DurationSelect
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        durationSinceNow={durationSinceNow}
        setDurationSinceNow={setDurationSinceNow}
      />
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={positionsByNodeId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis tickFormatter={(_value, index) => positionsByNodeId[index].short_name} />
          <YAxis />
          <Tooltip labelFormatter={(index) => positionsByNodeId[index].long_name} formatter={(value, _name) => [value, 'Count']} />
          <Legend />
          <Bar type="monotone" dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function PositionsByGatewayId() {
  const [positionsByGatewayId, setPositionsByGatewayId] = useState(null)

  const [selectedDuration, setSelectedDuration] = useState(Duration.fromObject({ days: 1 }))
  const [durationSinceNow, setDurationSinceNow] = useState(Duration.fromObject({ days: 0 }))

  useEffect(() => {
    const fetchPositionsByGatewayId = async () => {
      try {
        const params = toParams(durationSinceNow, selectedDuration)

        const response = await fetch(`/api/stats/positions-by-gateway-id?${params}`)
        const data = await response.json()
        setPositionsByGatewayId(data)
      } catch (error) {
        console.error('Failed to fetch positions by gateway id:', error)
      }
    }

    fetchPositionsByGatewayId()
    const intervalId = setInterval(fetchPositionsByGatewayId, 60000)

    return () => clearInterval(intervalId)
  }, [durationSinceNow, selectedDuration])

  if (!positionsByGatewayId) {
    return (
      <div>
        <h2>Positions By Gateway ID</h2>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Positions By Gateway ID</h2>
      <DurationSelect
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        durationSinceNow={durationSinceNow}
        setDurationSinceNow={setDurationSinceNow}
      />
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={positionsByGatewayId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="short_name" />
          <YAxis />
          <Tooltip formatter={(value, _name) => [value, 'Count']} />
          <Legend />
          <Bar type="monotone" dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function StatsApp() {
  return (
    <div>
      <PositionsOverTime />
      <PositionsByNodeId />
      <PositionsByGatewayId />
    </div>
  )
}
