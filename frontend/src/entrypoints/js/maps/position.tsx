import { Header } from './node-details-modal/header.tsx'
import { NameValue } from './node-details-modal/name-value.tsx'
import { googleMapsLink, timeAgo } from '../utils/ui-util.tsx'
import { PointTuple } from 'leaflet'
import { DateTime } from 'luxon'

interface PositionProps {
  latLng?: PointTuple
  positionUpdatedAt?: string | Date | DateTime
  altitude?: number
}

export function Position({ node, title = 'Position' }: { node: PositionProps; title?: string }) {
  if (!node?.positionUpdatedAt) {
    return
  }
  return (
    <>
      <Header str={title} />
      <div className="p-2 px-4 text-sm md:text-md">
        <div>
          <NameValue
            name={`Location`}
            renderer={() => {
              if (!node.latLng) {
                return
              }
              return (
                <>
                  <a target="_blank" rel="noreferrer" href={googleMapsLink(node.latLng)}>
                    {node.latLng.join(', ')}
                  </a>{' '}
                  {timeAgo(node.positionUpdatedAt, true)}
                </>
              )
            }}
          />
        </div>
        <div>
          <NameValue name="Altitude" value={node.altitude} unit="m" />
        </div>
        <div>
          <NameValue name="Position updated" value={node.positionUpdatedAt} renderer={timeAgo} />
        </div>
      </div>
    </>
  )
}
