import { MeshDevice } from '@meshtastic/core'
import { Logger } from 'tslog'

export const deviceLogger = new Logger({
  name: 'meshmap:device',
  prettyLogTemplate: '{{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{name}}]\t',
})

export const dumpLogger = new Logger({
  name: 'meshmap:dump',
  prettyLogTemplate: '{{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{name}}]\t',
})

export function _subscribeAll(connection: MeshDevice) {
  connection.events.onDeviceMetadataPacket.subscribe((packet) => {
    dumpLogger.info(`onDeviceMetadataPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onTelemetryPacket.subscribe((packet) => {
    dumpLogger.info(`onTelemetryPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onDeviceStatus.subscribe((packet) => {
    dumpLogger.info(`onDeviceStatus`, JSON.stringify(packet, null, 2))
  })
  connection.events.onWaypointPacket.subscribe((packet) => {
    dumpLogger.info(`onWaypointPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onMyNodeInfo.subscribe((packet) => {
    dumpLogger.info(`onMyNodeInfo`, JSON.stringify(packet, null, 2))
  })
  connection.events.onUserPacket.subscribe((packet) => {
    dumpLogger.info(`onUserPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onPositionPacket.subscribe((packet) => {
    dumpLogger.info(`onPositionPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onNodeInfoPacket.subscribe((packet) => {
    dumpLogger.info(`onNodeInfoPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onChannelPacket.subscribe((packet) => {
    dumpLogger.info(`onChannelPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onConfigPacket.subscribe((packet) => {
    dumpLogger.info(`onConfigPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onModuleConfigPacket.subscribe((packet) => {
    dumpLogger.info(`onModuleConfigPacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onMessagePacket.subscribe((packet) => {
    dumpLogger.info(`onMessagePacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onTraceRoutePacket.subscribe((packet) => {
    dumpLogger.info(`onTraceRoutePacket`, JSON.stringify(packet, null, 2))
  })
  connection.events.onPendingSettingsChange.subscribe((packet) => {
    dumpLogger.info(`onPendingSettingsChange`, JSON.stringify(packet, null, 2))
  })
  connection.events.onMeshPacket.subscribe((packet) => {
    dumpLogger.info(`onMeshPacket`, JSON.stringify(packet, null, 2))
  })

  connection.events.onRoutingPacket.subscribe((routingPacket) => {
    dumpLogger.info(`onRoutingPacket`, JSON.stringify(routingPacket, null, 2))
  })
}

// Monkey patch to allow JSON.stringify to handle BigInt values
if (!('toJSON' in BigInt.prototype)) {
  Object.defineProperty(BigInt.prototype, 'toJSON', {
    value: function () {
      return this.toString()
    },
    configurable: true,
    writable: true,
  })
}
