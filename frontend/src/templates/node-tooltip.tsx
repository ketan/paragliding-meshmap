import _ from 'lodash'
import { DateTime } from 'luxon'
import { ReactNode, useEffect } from 'react'
import { HardwareModelIDToName, NodeRoleIDToName } from '../hardware-modules'
import { imageForModel } from '../image-for-model'
import { NodesEntityForUI } from '../nodes-entity'
import { Tooltip } from '../entrypoints/js/components/tooltip'
import { CopyIcon } from '../entrypoints/js/utils/icon-constants'
import { BROADCAST_ADDR, googleMapsLink, nodeUrl, timeAgo } from '../entrypoints/js/utils/ui-util'

function mqttStatus(node: NodesEntityForUI) {
  if (node.mqttConnectionState === 'online') {
    return (
      <>
        <span className="text-green-600">Online</span> {timeAgo(node.mqttConnectionStateUpdatedAt, true)}
      </>
    )
  } else {
    return (
      <>
        <span className="text-purple-600">Offline</span> {timeAgo(node.mqttConnectionStateUpdatedAt, true)}
      </>
    )
  }
}

const location = (node: NodesEntityForUI) => {
  const items = [
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
    keyValue({ key: 'Altitude', value: node.altitude, unit: 'm' }),
  ]
  return items
}

type Value = string | number | ReactNode | ReactNode[]

type KeyValueType<T> = {
  key: string
  precision?: number
  unit?: string
} & ({ renderer: () => Value } | { value: T })

const keyValue = function <T>(args: KeyValueType<T>) {
  const title = <span className="font-extrabold me-1">{args.key}:</span>

  if ('renderer' in args) {
    const value = args.renderer()
    if (value === null || value === undefined) {
      return
    }
    return (
      <li key={args.key}>
        {title}
        {value}
      </li>
    )
  }

  if ('value' in args) {
    if (args.value === undefined || args.value === null) {
      return
    }

    if (typeof args.value === 'string') {
      return (
        <li key={args.key}>
          {title}
          {args.value}
        </li>
      )
    } else if (typeof args.value === 'number') {
      if (Number.isInteger(args.value)) {
        return (
          <li key={args.key}>
            {title}
            {args.value}
            {args.unit}
          </li>
        )
      } else {
        return (
          <li key={args.key}>
            {title}
            {Number(args.value).toFixed(args.precision)}
            {args.unit}
          </li>
        )
      }
    }
  }
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
}

export function NodeTooltip({ node, callback }: Props) {
  const image = imageForModel(node.hardwareModel) ? <img className="mb-4 w-12 float-end" src={imageForModel(node.hardwareModel)} /> : null
  const role = node.role ? NodeRoleIDToName[node.role] : 'UNKNOWN'
  const hardwareModel =
    node.hardwareModel === undefined || node.hardwareModel === null ? undefined : HardwareModelIDToName[node.hardwareModel]
  const padding = () => <li key={window.crypto.randomUUID()} className="mt-1.5"></li>

  const nodeName = keyValue({ key: 'Long Name', renderer: () => <span className="font-extrabold">{node.longName || `(UNKNOWN)`}</span> })

  const showDetailsButton = (
    <p className="text-center mt-3" key="showDetails">
      <a
        className="button block w-full px-4 py-2 font-semibold border border-gray-400 shadow-lg shadow-gray-100 rounded bg-gray-100 show-details-button"
        data-node-id={node.nodeId}
      >
        Show details
      </a>
    </p>
  )

  const showMessagesButton = (
    <p className="text-center mt-3" key="showMessages" data-id="showMessagesButton">
      <a
        href={`/messages.html?from=${node.nodeId}&to=${BROADCAST_ADDR}`}
        target="_blank"
        rel="noreferrer"
        className="button block w-full px-4 py-2 font-semibold border border-gray-400 shadow-lg shadow-gray-100 rounded bg-gray-100"
      >
        Show Messages
      </a>
    </p>
  )

  const elements = [
    nodeName,
    keyValue({ key: 'Short Name', value: node.shortName }),
    keyValue({ key: 'MQTT Status', renderer: () => mqttStatus(node) }),
    padding(),
    location(node),
    padding(),
    lastMessage(node),
    padding(),
    keyValue({ key: 'Hardware', value: hardwareModel }),
    keyValue({ key: 'Firmware', value: node.firmwareVersion }),
    keyValue({ key: 'Voltage', value: node.voltage, precision: 2, unit: 'V' }),
    keyValue({
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
    }),
    padding(),
    keyValue({ key: 'Ch Util', value: node.channelUtilization, unit: '%', precision: 2 }),
    keyValue({ key: 'Air Util', value: node.airUtilTx, unit: '%', precision: 2 }),
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
            <Tooltip tooltipText="Copy link to clipboard" className="border-sm inline-block rounded border ml-3" data-copy={link}>
              <CopyIcon className="w-5 h-5 inline-block p-0.5" />
            </Tooltip>
          </>
        )
      },
    }),
    keyValue({ key: 'Role', value: role }),
    keyValue({ key: 'Updated', value: node.updatedAt, renderer: timeAgo }),
    showDetailsButton,
    showMessagesButton,
  ]

  useEffect(() => {
    callback && callback()
  })

  return (
    <div className="lg:text-sm sm:text-xs text-wrap" onClick={() => console.log(`div clicked`)}>
      {image}
      <ul>{_.compact(elements)}</ul>
    </div>
  )
}

function handleButtonClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  const copyElement = target.closest('[data-copy]')
  if (copyElement) {
    copyElement.classList.add('motion-safe:animate-ping')
    const currentURL = new URL(copyElement.getAttribute('data-copy')!, window.location.href)
    currentURL.hash = ''
    navigator.clipboard.writeText(currentURL.toString())
    setTimeout(() => copyElement.classList.remove('motion-safe:animate-ping'), 500)
  }
}

document.addEventListener('click', handleButtonClick)
