import { Header } from './node-details-modal/header.tsx'
import { NameValue } from './node-details-modal/name-value.tsx'
import { googleMapsLink, positionPrecision, timeAgo } from '../utils/ui-util.tsx'
import { PointTuple } from 'leaflet'
import { DateTime } from 'luxon'

interface PositionProps {
  latLng?: PointTuple
  // positionUpdatedAt?: string | Date | DateTime
  altitude?: number
  aboveGroundLevel?: number
  positionPdop?: number
  positionPrecisionBits?: number
  time?: string | null | Date | DateTime
  satsInView?: number
}

export function Position({ positionAttrs, title = 'Position' }: { positionAttrs: PositionProps; title?: string }) {
  if (!positionAttrs?.time) {
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
              if (!positionAttrs.latLng) {
                return
              }
              return (
                <>
                  <a target="_blank" rel="noreferrer" href={googleMapsLink(positionAttrs.latLng)}>
                    {positionAttrs.latLng.join(', ')}
                  </a>{' '}
                  {timeAgo(positionAttrs.time, true)}
                </>
              )
            }}
          />
        </div>
        <div>
          <NameValue name="Altitude" value={positionAttrs.altitude} unit="m" />
        </div>
	<div>
	  <NameValue name="Above Ground Level" value={positionAttrs.aboveGroundLevel} unit="m" />
	</div>
        <div>
          <NameValue name="Satellites in view" value={positionAttrs.satsInView} />
        </div>
        <div>
          <NameValue name="Time of acquiring last position" value={positionAttrs.time} renderer={timeAgo} />
        </div>
        <div>
          <NameValue name="Meshtastic position precision" value={positionPrecision(positionAttrs)} />
        </div>
        <div>
          <NameValue name="Position DOP" value={positionAttrs.positionPdop} />
        </div>
      </div>
    </>
  )
}
