import { DateTime } from 'luxon'
import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DataKey } from 'recharts/types/util/types'
import { DeviceMetricsEntityForUI, NodesEntityForUI } from '../../../../nodes-entity'
import { humanizedStringDuration } from '../../utils/ui-util'
import { Header } from './header'
import { NameValue } from './name-value'
import { DurationDropdownProps, DurationSelect } from '../../components/duration-select.tsx'

interface Props extends DurationDropdownProps {
  node: NodesEntityForUI
  deviceMetrics?: DeviceMetricsEntityForUI[] | null
}

export function DeviceMetrics({ deviceMetrics, node, ...rest }: Props) {
  if (!deviceMetrics || deviceMetrics.length === 0) {
    return
  }

  const deviceMetricsData: (Omit<DeviceMetricsEntityForUI, 'createdAt'> & { createdAt: number })[] =
    deviceMetrics?.map((metric) => ({
      ...metric,
      createdAt: DateTime.fromISO(metric.createdAt).toMillis(),
    })) || []

  return (
    <>
      <Header str="Device Metrics">
        <DurationSelect {...rest} />
      </Header>
      <div className="p-2 px-4 text-sm md:text-md">
        <AirUtilChUtil data={deviceMetricsData} />

        <Voltage data={deviceMetricsData} />
        <div>
          <NameValue name="Uptime" value={humanizedStringDuration(node?.uptimeSeconds)} />
        </div>
      </div>
    </>
  )

  function AirUtilChUtil({ data }: { data: (Omit<DeviceMetricsEntityForUI, 'createdAt'> & { createdAt: number })[] }) {
    const [activeSeries, setActiveSeries] = useState<Array<DataKey<unknown> | unknown>>([])
    const handleLegendClick = (dataKey: DataKey<unknown> | undefined) => {
      if (activeSeries.includes(dataKey)) {
        setActiveSeries(activeSeries.filter((el) => el !== dataKey))
      } else {
        setActiveSeries((prev) => [...prev, dataKey])
      }
    }

    return (
      <>
        <div>
          <NameValue name="Channel Utilization" value={node?.channelUtilization} unit="%" className="mr-4" precision={2} />
          <NameValue name="Air Utilization Tx" value={node?.airUtilTx} unit="%" className="mr-4" precision={2} />

          <ResponsiveContainer height={200} width="100%" className="mx-auto">
            <LineChart data={data} syncId="nodeDetailsSync">
              <CartesianGrid stroke="#bbb" strokeDasharray="2 2" />

              <XAxis
                padding={{ left: 20, right: 20 }}
                dataKey="createdAt"
                type="number"
                scale="time"
                domain={['auto', 'auto']}
                tickFormatter={(unixTime) => DateTime.fromMillis(unixTime).toFormat('HH:MM')}
              />

              <YAxis yAxisId="left" unit="%" scale="linear" domain={['auto', 'auto']} tickFormatter={(value) => Number(value).toFixed(2)} />
              <YAxis
                yAxisId="right"
                orientation="right"
                unit="%"
                scale="linear"
                domain={['auto', 'auto']}
                tickFormatter={(value) => Number(value).toFixed(2)}
              />

              <Line
                dot={{ strokeWidth: 1, r: 0 }}
                hide={activeSeries.includes('channelUtilization')}
                yAxisId="left"
                type="monotone"
                dataKey="channelUtilization"
                stroke="#008000"
                unit="%"
                name="Ch Util"
              />

              <Line
                dot={{ strokeWidth: 1, r: 0 }}
                hide={activeSeries.includes('airUtilTx')}
                yAxisId="right"
                type="monotone"
                dataKey="airUtilTx"
                stroke="#0000ff"
                unit="%"
                name="Air Util Tx"
              />

              <Tooltip
                formatter={(value) => {
                  if (typeof value === 'number') {
                    return value.toFixed(2)
                  }
                }}
                labelFormatter={(millis) => DateTime.fromMillis(millis).toLocaleString(DateTime.DATETIME_MED)}
              />
              <Legend verticalAlign="bottom" iconType="circle" onClick={(data) => handleLegendClick(data.dataKey)} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    )
  }

  function Voltage({ data }: { data: (Omit<DeviceMetricsEntityForUI, 'createdAt'> & { createdAt: number })[] }) {
    const [activeSeries, setActiveSeries] = useState<Array<DataKey<unknown> | unknown>>([])
    const handleLegendClick = (dataKey: DataKey<unknown> | undefined) => {
      if (activeSeries.includes(dataKey)) {
        setActiveSeries(activeSeries.filter((el) => el !== dataKey))
      } else {
        setActiveSeries((prev) => [...prev, dataKey])
      }
    }

    if (!node?.voltage && !node.batteryLevel) {
      return
    }
    return (
      <>
        <div>
          <NameValue name="Voltage" value={node?.voltage} precision={2} unit="V" className="mr-4" />

          <NameValue
            name="Battery"
            className="mr-4"
            renderer={() => {
              if (node?.batteryLevel === null || node?.batteryLevel === undefined) {
                return
              }

              if (node.batteryLevel > 100) {
                return 'Plugged In'
              } else {
                return `${node.batteryLevel}%`
              }
            }}
          />
          <ResponsiveContainer height={200} className="mx-auto">
            <LineChart data={data} syncId="nodeDetailsSync">
              <CartesianGrid stroke="#bbb" strokeDasharray="2 2" />
              <XAxis
                padding={{ left: 20, right: 20 }}
                dataKey="createdAt"
                type="number"
                scale="time"
                domain={['auto', 'auto']}
                tickFormatter={(unixTime) => DateTime.fromMillis(unixTime).toFormat('HH:MM')}
              />

              <YAxis yAxisId="left" unit="V" scale="linear" domain={['auto', 'auto']} tickFormatter={(value) => Number(value).toFixed(2)} />
              <YAxis
                yAxisId="right"
                orientation="right"
                unit="%"
                scale="linear"
                domain={['auto', 'auto']}
                tickFormatter={(value) => Number(value).toFixed(0)}
              />

              <Line
                dot={{ strokeWidth: 1, r: 0 }}
                yAxisId="left"
                type="monotone"
                dataKey="voltage"
                stroke="#008000"
                unit="V"
                name="Voltage"
              />
              <Line
                dot={{ strokeWidth: 1, r: 0 }}
                yAxisId="right"
                type="monotone"
                dataKey="batteryLevel"
                stroke="#0000ff"
                unit="%"
                name="Percent"
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name === 'Voltage' && typeof value === 'number') {
                    return value.toFixed(2)
                  }
                  if (name === 'Percent' && typeof value === 'number') {
                    return value
                  }
                }}
                labelFormatter={(millis) => DateTime.fromMillis(millis).toLocaleString(DateTime.DATETIME_MED)}
              />
              <Legend verticalAlign="bottom" iconType="circle" onClick={(data) => handleLegendClick(data.dataKey)} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    )
  }
}
