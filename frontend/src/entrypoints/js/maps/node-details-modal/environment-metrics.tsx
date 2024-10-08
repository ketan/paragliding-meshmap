import { DateTime } from 'luxon'
import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DataKey } from 'recharts/types/util/types'
import { EnvironmentMetricsEntityForUI, NodesEntityForUI } from '../../../../nodes-entity'
import { Header } from './header'
import { NameValue } from './name-value'
import { DurationDropdownProps, DurationSelect } from '../../components/duration-select.tsx'

type MetricType = 'temperature' | 'relativeHumidity' | 'barometricPressure'
type MetricDefinition = { key: MetricType; unit: string; name: string; precision: number }

interface Props extends DurationDropdownProps {
  node: NodesEntityForUI
  environmentMetrics?: EnvironmentMetricsEntityForUI[] | null
}

export function EnvironmentMetrics({ node, environmentMetrics, ...rest }: Props) {
  const [activeSeries, setActiveSeries] = useState<Array<DataKey<unknown> | unknown>>([])
  const handleLegendClick = (dataKey: DataKey<unknown> | undefined) => {
    if (activeSeries.includes(dataKey)) {
      setActiveSeries(activeSeries.filter((el) => el !== dataKey))
    } else {
      setActiveSeries((prev) => [...prev, dataKey])
    }
  }

  if (!environmentMetrics || environmentMetrics.length === 0) {
    return
  }

  const environmentMetricsData: (Omit<EnvironmentMetricsEntityForUI, 'createdAt'> & { createdAt: number })[] =
    environmentMetrics?.map((metric) => ({
      ...metric,
      createdAt: DateTime.fromISO(metric.createdAt).toMillis(),
    })) || []

  return (
    <>
      <Header str="Environment Metrics">
        <DurationSelect {...rest} />
      </Header>
      <div className="p-2 px-4 text-sm md:text-md">
        {(
          [
            {
              key: 'temperature',
              unit: '\u2103',
              precision: 0,
              name: 'Temperature',
            },
            { key: 'relativeHumidity', unit: '%', name: 'Relative Humidity', precision: 0 },
            {
              key: 'barometricPressure',
              unit: 'hPa',
              name: 'Barometric Pressure',
              precision: 2,
            },
          ] as MetricDefinition[]
        ).map((eachMetric) => {
          return (
            <div key={eachMetric.key}>
              <NameValue
                name={eachMetric.name}
                value={node && node[eachMetric.key]}
                unit={eachMetric.unit}
                precision={2}
                className={'mr-4'}
              />
              <ResponsiveContainer height={200} className="content-center mx-auto">
                <LineChart data={environmentMetricsData} syncId="nodeDetailsSync">
                  <CartesianGrid stroke="#bbb" strokeDasharray="2 2" />

                  <XAxis
                    padding={{ left: 20, right: 20 }}
                    dataKey="createdAt"
                    type="number"
                    scale="time"
                    domain={['auto']}
                    tickFormatter={(unixTime) => DateTime.fromMillis(unixTime).toFormat('HH:MM')}
                  />

                  <YAxis
                    yAxisId={eachMetric.key}
                    unit={eachMetric.unit}
                    scale="linear"
                    domain={['auto']}
                    tickFormatter={(value) => Number(value).toFixed(eachMetric.precision)}
                  />
                  <YAxis yAxisId="dummy" orientation="right" unit={eachMetric.unit} scale="linear" />

                  <Line
                    dot={{ strokeWidth: 1, r: 0 }}
                    yAxisId={eachMetric.key}
                    type="monotone"
                    dataKey={eachMetric.key}
                    stroke="#008000"
                    unit={eachMetric.unit}
                    name={eachMetric.name}
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
          )
        })}
      </div>
    </>
  )
}
