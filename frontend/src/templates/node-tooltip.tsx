import _ from 'lodash'
import { DateTime, Duration } from 'luxon'
import { Fragment, ReactNode, useEffect } from 'react'
import { Tooltip } from '../entrypoints/js/components/tooltip'
import { CopyIcon } from '../entrypoints/js/utils/icon-constants'
import {
  BROADCAST_ADDR,
  googleMapsLink,
  nodeRole,
  nodeStatus,
  positionPrecision,
  randomHex,
  timeAgo,
} from '../entrypoints/js/utils/ui-util'
import { HardwareModelIDToName } from '../hardware-modules'
import { imageForModel } from '../image-for-model'
import { NodesEntityForUI } from '../nodes-entity'
import { nodeUrl } from '../entrypoints/js/utils/link-utils'

function status(node: NodesEntityForUI, onlineAge: Duration, offlineAge: Duration) {
  const status = nodeStatus(node, onlineAge, offlineAge)
  if (status === 'online') {
    return (
      <>
        <span className="text-green-600">Online</span> {timeAgo(node.updatedAt, true)}
      </>
    )
  } else if (status === 'old') {
    return (
      <>
        <span className="text-purple-600">Old</span> {timeAgo(node.updatedAt, true)}
      </>
    )
  } else {
    return (
      <>
        <span className="text-gray-600">Offline</span> {timeAgo(node.updatedAt, true)}
      </>
    )
  }
}

const location = (node: NodesEntityForUI) => {
  return [
    keyValue({
      key: `Location`,
      renderer: () => {
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
      },
    }),
    keyValue([
      { key: 'Altitude', value: node.altitude, unit: 'm' },
      { key: 'Satellites', value: node.satsInView },
    ]),
    keyValue({ key: 'Position Acquired at', value: node.positionTimestamp, renderer: timeAgo }),
    keyValue({ key: 'Position Precision', value: positionPrecision(node) }),
  ]
}

type Value = ReactNode | ReactNode[]

type KeyValueType<T> =
  | ({
      key: string
      precision?: number
      unit?: string
    } & ({ renderer: () => Value } | { value: T }))
  | Iterable<KeyValueType<T>>

const keyValue = function <T>(data: KeyValueType<T>) {
  const types = Array.isArray(data) ? data : [data]

  const response = types.map((args) => {
    const title = <span className={`font-extrabold me-1`}>{args.key}:</span>
    if ('renderer' in args) {
      const value = args.renderer()
      if (value === null || value === undefined) {
        return
      }
      return (
        <Fragment key={args.key}>
          {title}
          {value}
        </Fragment>
      )
    }

    if ('value' in args) {
      if (args.value === undefined || args.value === null) {
        return
      }

      if (typeof args.value === 'string') {
        return (
          <Fragment key={args.key}>
            {title}
            {args.value}
          </Fragment>
        )
      } else if (typeof args.value === 'number') {
        if (Number.isInteger(args.value)) {
          return (
            <Fragment key={args.key}>
              {title}
              {args.value}
              {args.unit}
            </Fragment>
          )
        } else {
          return (
            <Fragment key={args.key}>
              {title}
              {Number(args.value).toFixed(args.precision)}
              {args.unit}
            </Fragment>
          )
        }
      }
    }
  })

  const joinedResponse = _.compact(response).flatMap((element, index, array) =>
    array.length - 1 !== index ? [element, <span key={`separator-${index}`}> / </span>] : element
  )

  return <li key={types.map((t) => t.key).join('-')}>{joinedResponse}</li>
}

function lastMessage(node: NodesEntityForUI) {
  if (!node.outbox || node.outbox.length === 0) {
    return
  }

  const mostRecentMessage = node.outbox
    .filter((msg) => ('from' in msg && msg.from === BROADCAST_ADDR) || ('to' in msg && msg.to === BROADCAST_ADDR))
    .sort((a, b) => DateTime.fromISO(a.time).diff(DateTime.fromISO(b.time)).toMillis())
    .reverse()
    .at(0)

  if (!mostRecentMessage) {
    return
  }

  return keyValue({
    key: 'Last message',
    renderer: () => (
      <>
        {mostRecentMessage.text} {timeAgo(mostRecentMessage.time, true)}
      </>
    ),
  })
}

interface Props {
  node: NodesEntityForUI
  callback?: () => void
  showDetail: (node: NodesEntityForUI) => void
  showTrackLog: (node: NodesEntityForUI) => void
  showMessages: (node: NodesEntityForUI) => void

  onlineAge: Duration
  offlineAge: Duration
}

export function NodeTooltip({ node, callback, showDetail, showTrackLog, showMessages, offlineAge, onlineAge }: Props) {
  const image = imageForModel(node.hardwareModel) ? (
    <img className="mb-4 w-12 float-end" src={imageForModel(node.hardwareModel)} alt={`Image for ${node.hardwareModel}`} />
  ) : null
  const hardwareModel =
    node.hardwareModel === undefined || node.hardwareModel === null ? undefined : HardwareModelIDToName[node.hardwareModel]
  const padding = () => <li key={randomHex(10)} className="mt-1.5"></li>

  const nodeName = keyValue({
    key: 'Long Name',
    renderer: () => <span className="font-extrabold">{node.longName || `(UNKNOWN)`}</span>,
  })

  const showDetailsButton = (
    <p className="text-center mt-1" key="showDetails">
      <button
        className="button block w-full px-4 py-2 font-semibold border border-gray-400 shadow-lg shadow-gray-100 rounded bg-gray-100 show-details-button"
        onClick={() => showDetail(node)}
        data-node-id={node.nodeId}
      >
        Show details
      </button>
    </p>
  )

  const showTrackLogButton = (
    <p className="text-center mt-1" key="showTrackLog">
      <button
        className="button block w-full px-4 py-2 font-semibold border border-gray-400 shadow-lg shadow-gray-100 rounded bg-gray-100 show-details-button"
        onClick={() => showTrackLog(node)}
        data-node-id={node.nodeId}
      >
        Show Tracklog
      </button>
    </p>
  )

  const showMessagesButton = (
    <p className="text-center mt-1" key="showMessages" data-id="showMessagesButton">
      <button
        onClick={() => showMessages(node)}
        rel="noreferrer"
        className="button block w-full px-4 py-2 font-semibold border border-gray-400 shadow-lg shadow-gray-100 rounded bg-gray-100"
      >
        Show Messages
      </button>
    </p>
  )

  const elements = [
    nodeName,
    keyValue({ key: 'Short Name', value: node.shortName }),
    keyValue({ key: 'Status', renderer: () => status(node, onlineAge, offlineAge) }),
    padding(),
    location(node),
    padding(),
    lastMessage(node),
    padding(),
    keyValue({ key: 'Hardware', value: hardwareModel }),
    keyValue({ key: 'Firmware', value: node.firmwareVersion }),
    keyValue([
      { key: 'Voltage', value: node.voltage, precision: 2, unit: 'V' },
      {
        key: 'Battery',
        renderer: () => {
          if (node.batteryLevel === null || node.batteryLevel === undefined) {
            return
          }

          if (node.batteryLevel > 100) {
            return 'Plugged In'
          } else {
            return `${node.batteryLevel}%`
          }
        },
      },
    ]),
    padding(),
    keyValue([
      { key: 'Ch Util', value: node.channelUtilization, unit: '%', precision: 2 },
      {
        key: 'Air Util',
        value: node.airUtilTx,
        unit: '%',
        precision: 2,
      },
    ]),
    padding(),
    keyValue({
      key: 'ID',
      renderer: () => {
        const link = nodeUrl(node)
        return (
          <>
            <a href={link}>
              {node.nodeId} (!{node.nodeId.toString(16)})
            </a>
            <Tooltip tooltipText="Copy link to clipboard" className="border-sm inline-block rounded border ml-3">
              <CopyIcon
                className="w-5 h-5 inline-block p-0.5"
                onClick={() => {
                  const absoluteNodeUrl = new URL(link, window.location.href)
                  navigator.clipboard.writeText(absoluteNodeUrl.toString())
                }}
              />
            </Tooltip>
          </>
        )
      },
    }),
    keyValue({ key: 'Role', value: nodeRole(node) }),
    keyValue({ key: 'Updated', value: node.updatedAt, renderer: timeAgo }),
    <div className="mt-3" key="buttons">
      {showDetailsButton}
      {showTrackLogButton}
      {showMessagesButton}
    </div>,
  ]

  useEffect(() => {
    callback && callback()
  })

  return (
    <div className="lg:text-sm sm:text-xs text-wrap min-w-[250px]">
      {image}
      <ul>{_.compact(elements)}</ul>
    </div>
  )
}
