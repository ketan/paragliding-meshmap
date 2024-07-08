import _ from 'lodash'
import { DateTime } from 'luxon'
import renderToString from 'preact-render-to-string'
import { JSX } from 'preact/jsx-runtime'
import { HardwareModelIDToName, NodeRoleIDToName } from '../hardware-modules'
import { imageForModel } from '../image-for-model'
import { MessageIn, MessageOut } from '../interfaces'
import { Node } from '../nodes-entity'
import { googleMapsLink } from '../ui-util'

const timeAgo = (timestamp?: string | null, addParens: boolean = false) => {
  if (timestamp) {
    const dateTime = DateTime.fromISO(timestamp)
    return (
      <>
        <span class="has-tooltip font-light">
          {addParens ? '(' : null}
          <span class="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8">{dateTime.toLocaleString(DateTime.DATETIME_MED)}</span>
          {dateTime.toRelative()}
          {addParens ? ')' : null}
        </span>
      </>
    )
  }
  return <></>
}

function mqttStatus(node: Node) {
  if (node.mqttConnectionState === 'online') {
    return [<span class="text-green-700">Online</span>, ' ', timeAgo(node.mqttConnectionStateUpdatedAt, true)]
  } else {
    return [<span class="text-blue-700">Offline</span>, ' ', timeAgo(node.mqttConnectionStateUpdatedAt, true)]
  }
}

const location = (node: Node) => {
  if (!node.latLng) {
    return
  }

  return (
    <li>
      <span class="font-extrabold me-2">Location:</span>
      <a target="_blank" class="external" href={googleMapsLink(node.latLng)}>
        {node.latLng.join(', ')}
      </a>{' '}
      {timeAgo(node.positionUpdatedAt, true)}
    </li>
  )
}

type Value = string | number | null | JSX.Element | JSX.Element[]

const keyValue = function <T>(args: { key: string; value?: T; precision?: 2; unit?: string; renderer?: (v: T) => Value }) {
  if (args.value === undefined || args.value === null) {
    return
  }

  if (args.renderer) {
    return (
      <li>
        <span class="font-extrabold me-2">{args.key}:</span>
        {args.renderer(args.value)}
      </li>
    )
  }

  if (typeof args.value === 'number') {
    if (Number.isInteger(args.value)) {
      return (
        <li>
          <span class="font-extrabold me-2">{args.key}:</span>
          {args.value}
          {args.unit}
        </li>
      )
    } else {
      return (
        <li>
          <span class="font-extrabold me-2">{args.key}:</span>
          {Number(args.value).toFixed(args.precision)}
          {args.unit}
        </li>
      )
    }
  } else if (typeof args.value === 'string') {
    return (
      <li>
        <span class="font-extrabold me-2">{args.key}:</span>
        {args.value}
      </li>
    )
  } else {
    return (
      <li>
        <span class="font-extrabold me-2">{args.key}:</span>
        {args.value}
      </li>
    )
  }
}

const MINUS_ONE_HEX = Number('0xffffffff')
function renderMessage(message: MessageIn | MessageOut) {
  if (('from' in message && message.from !== MINUS_ONE_HEX) || ('to' in message && message.to !== MINUS_ONE_HEX)) {
    return
  }

  return (
    <li class="mb-1">
      <span class="italic">{message.text}</span> {timeAgo(message.time, true)}
    </li>
  )
}

function lastMessages(node: Node) {
  if (!node.outbox || node.outbox.length === 0) {
    return
  }

  return (
    <li class="text-wrap">
      <span class="font-extrabold me-2">Last messages</span>
      <ul class="list-inside ml-3">{_.compact(node.outbox.map(renderMessage))}</ul>
    </li>
  )
}

export function nodeTooltip(node: Node) {
  const image = imageForModel(node.hardwareModel) ? <img class="mb-4 w-40 mx-auto" src={imageForModel(node.hardwareModel)} /> : null
  const nodeRole = node.role === undefined || node.role === null ? 'UNKNOWN' : NodeRoleIDToName[node.role] || 'UNKNOWN'
  const hardwareModel =
    node.hardwareModel === undefined || node.hardwareModel === null ? 'UNKNOWN' : HardwareModelIDToName[node.hardwareModel]

  const elements = _([
    <li>
      <span class="font-extrabold me-2">{node.longName}</span> ({nodeRole})
    </li>,
    keyValue({ key: 'Short Name', value: node.shortName }),
    keyValue({ key: 'MQTT Status', value: mqttStatus(node) }),
    <li class="mt-3"></li>,
    location(node),
    keyValue({ key: 'Altitude', value: node.altitude, unit: 'm' }),
    <li class="mt-3"></li>,
    lastMessages(node),
    <li class="mt-3"></li>,
    keyValue({ key: 'Hardware', value: hardwareModel }),
    keyValue({ key: 'Firmware', value: node.firmwareVersion }),
    keyValue({ key: 'Voltage', value: node.voltage, precision: 2, unit: 'V' }),
    keyValue({ key: 'Battery', value: node.batteryLevel, renderer: (level) => (level > 100 ? 'Plugged In' : `${level}%`) }),
    <li class="mt-3"></li>,
    keyValue({ key: 'Ch Util', value: node.channelUtilization, unit: '%', precision: 2 }),
    keyValue({ key: 'Air Util', value: node.airUtilTx, unit: '%', precision: 2 }),
    <li class="mt-3"></li>,
    keyValue({ key: 'ID', value: `${node.nodeId} (0x${node.nodeId.toString(15)})` }),
    keyValue({ key: 'Updated', value: node.updatedAt, renderer: timeAgo }),
    <p class="text-center mt-3">
      <button class="w-full px-4 py-2 font-semibold border border-gray-400 shadow-lg shadow-gray-100 rounded bg-gray-100">Show details</button>
    </p>,
  ])
    .compact()
    .value()

  return renderToString(
    <div class="text-base tabular-nums max-w-sm hover:max-w-lg">
      {image}
      <ul>{elements}</ul>
    </div>
  )
}
