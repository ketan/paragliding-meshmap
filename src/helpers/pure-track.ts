import { errLog, pureTrackLog } from '#helpers/logger'
import { pgBoss } from '#config/data-source'
import Node from '#entity/node'
import Position from '#entity/position'
import { DateTime } from 'luxon'
import { HardwareModelIDToName } from '../../frontend/src/hardware-modules.js'

interface PositionPayload {
  type: string

  // identity
  user_id: string
  node_id: number // for backlink
  long_name?: string

  // the time, ms since epoch
  time: number

  // position info
  latitude: number
  longitude: number
  altitude: number
  ground_speed: number

  // other useful info
  battery?: null | number
  voltage?: null | number
  hardware?: string
}

interface TextMessagePayload {
  user_id: string | undefined
  time: number
  type: string
  message: string
}

export function pureTrackPositionPayload(node: Node, position: Position): PositionPayload | undefined {
  if (!(position.latitude && position.longitude && node.flyXCToken)) {
    return
  }
  return {
    type: 'position',
    user_id: node.flyXCToken,
    node_id: node.nodeId,
    battery: node.batteryLevel,
    voltage: node.voltage,
    long_name: node.longName,
    hardware: node.hardwareModel === undefined || node.hardwareModel === null ? undefined : HardwareModelIDToName[node.hardwareModel],
    time: DateTime.now().toMillis(),
    latitude: position.latitude / 10000000,
    longitude: position.longitude / 10000000,
    altitude: position.altitude || 0,
    ground_speed: position.groundSpeed || 0,
  }
}

export async function sendToPureTrackIOJob(payload: PositionPayload | TextMessagePayload) {
  const pureTrackApiUrl = process.env.PURETRACK_IO_API_URL

  if (pureTrackApiUrl) {
    pureTrackLog('Sending to puretrack.io')
    await pgBoss.send('puretrack.io', payload)
    pureTrackLog('Sent to puretrack.io')
  }
}

export async function pureTrackIOJobProcessor() {
  await pgBoss.createQueue('puretrack.io', {
    retryLimit: 3,
    retryBackoff: true,
    retryDelay: 30,
    name: 'puretrack.io',
  })

  pgBoss.work(
    'puretrack.io',
    {
      batchSize: 10,
      pollingIntervalSeconds: 10,
    },
    async (jobs) => {
      const pureTrackApiUrl = process.env.PURETRACK_IO_API_URL

      if (pureTrackApiUrl) {
        const positions = jobs.map((job) => job.data)
        pureTrackLog(`Sending ${positions.length} positions`)

        const requestHeaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }

        const response = await fetch(pureTrackApiUrl, {
          method: 'POST',
          headers: requestHeaders,
          body: JSON.stringify(positions),
        })
        pureTrackLog(`Sending job to ${pureTrackApiUrl}`)
        pureTrackLog({ requestHeaders })
        pureTrackLog({ body: JSON.stringify(positions) })
        pureTrackLog(`Response`, response)

        if (
          response.status === 200 || // all ok
          response.status === 400 || // ignore, probably some bad data that we're sending
          response.status == 401 || // authentication error, nothing we can do to fix
          response.status == 403 // ignore, auth error, nothing we can do to fix
        ) {
          pureTrackLog(`Job sent`, response.status)
          return await response.text()
        } else if (response.status === 429) {
          errLog(`Rate limited, retrying`, response)
          // rate limited, retry
          throw 'Rate limited, retry'
        } else {
          errLog(`Failed to send data. Got a non-200 response`, response)
          throw 'Failed to send data. Got a non-200 response'
        }
      }
    }
  )
}
