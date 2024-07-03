import _ from 'lodash'
import renderToString from 'preact-render-to-string'
import { JSX } from 'preact/jsx-runtime'
import { NodesEntity } from '../database'
import { HardwareModelIDToName, NodeRoleNameToID } from '../hardware-modules'
import { imageForModel } from '../image-for-model'
import { googleMapsLink } from '../ui-util'
import { DateTime } from 'luxon'

const timeAgo = (timestamp?: string | null, addParens: boolean = false) => {
  if (timestamp) {
    if (addParens) {
      return <>({DateTime.fromISO(timestamp).toRelative()})</>
    } else {
      return <>{DateTime.fromISO(timestamp).toRelative()}</>
    }
  }
  return <></>
}

function mqttStatus(node: NodesEntity) {
  if (node.mqttConnectionState === 'online') {
    return [<span class="text-green-700">Online</span>, timeAgo(node.mqttConnectionStateUpdatedAt, true)]
  } else if (node.mqttConnectionState === 'offline') {
    return [<span class="text-blue-700">Offline</span>, timeAgo(node.mqttConnectionStateUpdatedAt, true)]
  } else {
    return [<span class="text-blue-700">Offline</span>, timeAgo(node.mqttConnectionStateUpdatedAt, true)]
  }
}

function batteryLevel(node: NodesEntity) {
  if (node.batteryLevel) {
    if (node.batteryLevel > 100) {
      return <>Battery: Plugged In</>
    } else {
      return <>Battery: {node.batteryLevel}%</>
    }
  }
}

const location = (node: NodesEntity) => {
  return (
    <>
      Location:{' '}
      <a target="_blank" class="external" href={googleMapsLink(node)}>
        {node.latitude}, {node.longitude}
      </a>{' '}
      {timeAgo(node.positionUpdatedAt, true)}
    </>
  )
}

type Value = string | number | null | JSX.Element | JSX.Element[]

const keyValue = function <T>(args: { key: string; value?: T; precision?: 2; unit?: string; renderer?: (v: T) => Value }) {
  if (args.value === undefined || args.value === null) {
    return
  }

  if (args.renderer) {
    return (
      <>
        <strong>{args.key}</strong>: {args.renderer(args.value)}{' '}
      </>
    )
  }

  if (typeof args.value === 'number') {
    if (Number.isInteger(args.value)) {
      return (
        <>
          <strong>{args.key}</strong>: {args.value}
          {args.unit}
        </>
      )
    } else {
      return (
        <>
          <strong>{args.key}</strong>: {Number(args.value).toFixed(args.precision)}
          {args.unit}
        </>
      )
    }
  } else if (typeof args.value === 'string') {
    return (
      <>
        <strong>{args.key}</strong>: {args.value}
      </>
    )
  } else {
    return (
      <>
        <strong>{args.key}</strong>: {args.value}
      </>
    )
  }
}

export function nodeTooltip(node: NodesEntity) {
  const image = imageForModel(node.hardwareModel) ? <img class="mb-4 w-40 mx-auto" src={imageForModel(node.hardwareModel)} /> : null

  const nodeRole = node.role === undefined || node.role === null ? 'UNKNOWN' : NodeRoleNameToID[node.role] || 'UNKNOWN'
  const hardwareModel =
    node.hardwareModel === undefined || node.hardwareModel === null ? 'UNKNOWN' : HardwareModelIDToName[node.hardwareModel]

  const elements = _([
    image,
    <b>{node.longName}</b>,
    keyValue({ key: 'Short Name', value: node.shortName }),
    keyValue({ key: 'MQTT Status', value: mqttStatus(node) }),
    ' ',
    keyValue({ key: 'Role', value: nodeRole }),
    keyValue({ key: 'Hardware', value: hardwareModel }),
    keyValue({ key: 'Firmware', value: node.firmwareVersion }),
    keyValue({ key: 'Voltage', value: node.voltage, precision: 2, unit: 'V' }),
    keyValue({ key: 'Battery', value: node.batteryLevel, renderer: (level) => (level > 100 ? 'Plugged In' : `${level}%`) }),
    location(node),
    keyValue({ key: 'Altitude', value: node.altitude, unit: 'm' }),
    keyValue({ key: 'Ch Util', value: node.channelUtilization, unit: '%', precision: 2 }),
    keyValue({ key: 'Air Util', value: node.airUtilTx, unit: '%', precision: 2 }),
    ' ',
    keyValue({ key: 'ID', value: `${node.nodeId} (0x${node.nodeId.toString(15)})` }),
    keyValue({ key: 'Updated', value: node.updatedAt, renderer: timeAgo }),
    keyValue({ key: 'Neighbours Updated', value: node.neighboursUpdatedAt, renderer: timeAgo }),
  ])
    .compact()
    .flatMap((eachItem) => [eachItem, <br />])
    .value()

  return renderToString(<>{elements}</>)

  //   return  <div class="w-screen max-w-md overflow-hidden">
  //   {...elements}

  //   ID: { node.nodeId }
  //   <br />
  //   Hex ID: !{ node.nodeId.toString(16) }
  //   <br />
  //   Updated: { luxon.DateTime.fromISO(node.updatedAt).toRelative() }
  //   <br />
  //   <% if(node.neighboursUpdatedAt) { -%> Neighbours Updated: { luxon.DateTime.fromISO(node.neighboursUpdatedAt).toRelative() } <% } -%>
  //   <br />
  //   <% if(node.positionUpdatedAt) { -%> Position Updated: { luxon.DateTime.fromISO(node.positionUpdatedAt).toRelative() } <% } -%>
  //   <br />
  //   Latest message: Test<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5 hours ago from K10P <br /><br />
  //   <button onclick="showNodeDetails(3663164324);" class="border border-gray-300 bg-gray-100 p-1 w-full rounded hover:bg-gray-200 mb-1">
  //     Show Full Details
  //   </button>
  //   <br />
  //   <button onclick="showNodeNeighboursThatHeardUs(3663164324);" class="border border-gray-300 bg-gray-100 p-1 w-full rounded hover:bg-gray-200 mb-1">
  //     Show Neighbours (Heard Us)
  //   </button>
  //   <br />
  //   <button onclick="showNodeNeighboursThatWeHeard(3663164324);" class="border border-gray-300 bg-gray-100 p-1 w-full rounded hover:bg-gray-200">
  //     Show Neighbours (We Heard)
  //   </button>
  // </div>
}
