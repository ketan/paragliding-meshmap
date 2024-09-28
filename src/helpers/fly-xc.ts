import { errLog, flyXCLog } from '#helpers/logger'
import { pgBoss } from '#config/data-source'
import _ from 'lodash'
import Position from '#entity/position'
import { DateTime } from 'luxon'
import Node from '#entity/node'

export interface PositionPayload {
  altitude: number
  user_id: string
  latitude: number
  ground_speed: number
  time: number
  type: string
  longitude: number
}

export interface TextMessagePayload {
  user_id: string | undefined
  time: number
  type: string
  message: string
}

export async function sendToFlyXCJob(payload: PositionPayload | TextMessagePayload) {
  const flyXCApiKey = process.env.FLYXC_API_KEY
  const flyXCApiUrl = process.env.FLYXC_API_URL

  if (flyXCApiKey && flyXCApiUrl) {
    flyXCLog('Sending to FlyXC')
    await pgBoss.send('fly-xc', payload)
    flyXCLog('Sent to FlyXC')
  }
}

export async function flyXCJobProcessor() {
  await pgBoss.createQueue('fly-xc', {
    retryLimit: 3,
    retryBackoff: true,
    retryDelay: 30,
    name: 'fly-xc',
  })

  pgBoss.work(
    'fly-xc',
    {
      batchSize: 10,
      pollingIntervalSeconds: 10,
    },
    async (jobs) => {
      const flyXCApiKey = process.env.FLYXC_API_KEY
      const flyXCApiUrl = process.env.FLYXC_API_URL

      if (flyXCApiKey && flyXCApiUrl) {
        return await Promise.all(
          jobs.map(async (job) => {
            flyXCLog(`Picked up job`, job.data)
            const requestHeaders = {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }

            const response = await fetch(flyXCApiUrl, {
              method: 'POST',
              headers: _.assign(
                {
                  Authorization: `Bearer ${flyXCApiKey}`,
                },
                requestHeaders
              ),
              body: JSON.stringify(job.data),
            })
            flyXCLog(`Sending job to ${flyXCApiUrl}`)
            flyXCLog({ requestHeaders })
            flyXCLog({ body: JSON.stringify(job.data) })
            flyXCLog(`Response`, response)

            if (
              response.status === 200 || // all ok
              response.status === 400 || // ignore, probably some bad data that we're sending
              response.status == 401 || // authentication error, nothing we can do to fix
              response.status == 403 // ignore, auth error, nothing we can do to fix
            ) {
              flyXCLog(`Job sent`, response.status)
              return await response.text()
            } else if (response.status === 429) {
              errLog(`Rate limited, retrying`, response)
              // rate limited, retry
              throw 'Rate limited, retry'
            } else {
              errLog(`Failed to send data. Got a non-200 response`, response)
              throw 'Failed to send data. Got a non-200 response'
            }
          })
        )
      }
    }
  )
}

export function flyXCPositionPayload(node: Node, position: Position) {
  if (!(position.latitude && position.longitude && node.flyXCToken)) {
    return
  }
  return {
    type: 'position',
    user_id: node.flyXCToken,
    time: DateTime.now().toMillis(),
    latitude: position.latitude / 10000000,
    longitude: position.longitude / 10000000,
    altitude: position.altitude || 0,
    ground_speed: position.groundSpeed || 0,
  }
}
