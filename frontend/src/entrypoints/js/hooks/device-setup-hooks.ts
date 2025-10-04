import { MeshDevice } from '@meshtastic/core'
import * as Protobuf from '@meshtastic/protobufs'
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
  connection.events.onRoutingPacket.subscribe((routingPacket) => {
    switch (routingPacket.data.variant.case) {
      case 'errorReason': {
        if (routingPacket.data.variant.value === Protobuf.Mesh.Routing_Error.NONE) {
          return
        }
        dumpLogger.error(`Routing Error: ${routingPacket.data.variant.value}`)
        break
      }
      case 'routeReply': {
        dumpLogger.error(`Route Reply: ${routingPacket.data.variant.value}`)
        break
      }
      case 'routeRequest': {
        dumpLogger.error(`Route Request: ${routingPacket.data.variant.value}`)
        break
      }
    }
  })

  connection.events.onDeviceMetadataPacket.subscribe((packet) => {
    dumpLogger.info(`onDeviceMetadataPacket`, packet)
  })
  connection.events.onTelemetryPacket.subscribe((packet) => {
    dumpLogger.info(`onTelemetryPacket`, packet)
  })
  connection.events.onDeviceStatus.subscribe((packet) => {
    dumpLogger.info(`onDeviceStatus`, packet)
  })
  connection.events.onWaypointPacket.subscribe((packet) => {
    dumpLogger.info(`onWaypointPacket`, packet)
  })
  connection.events.onMyNodeInfo.subscribe((packet) => {
    dumpLogger.info(`onMyNodeInfo`, packet)
  })
  connection.events.onUserPacket.subscribe((packet) => {
    dumpLogger.info(`onUserPacket`, packet)
  })
  connection.events.onPositionPacket.subscribe((packet) => {
    dumpLogger.info(`onPositionPacket`, packet)
  })
  connection.events.onNodeInfoPacket.subscribe((packet) => {
    dumpLogger.info(`onNodeInfoPacket`, packet)
  })
  connection.events.onChannelPacket.subscribe((packet) => {
    dumpLogger.info(`onChannelPacket`, packet)
  })
  connection.events.onConfigPacket.subscribe((packet) => {
    dumpLogger.info(`onConfigPacket`, packet)
  })
  connection.events.onModuleConfigPacket.subscribe((packet) => {
    dumpLogger.info(`onModuleConfigPacket`, packet)
  })
  connection.events.onMessagePacket.subscribe((packet) => {
    dumpLogger.info(`onMessagePacket`, packet)
  })
  connection.events.onTraceRoutePacket.subscribe((packet) => {
    dumpLogger.info(`onTraceRoutePacket`, packet)
  })
  connection.events.onPendingSettingsChange.subscribe((packet) => {
    dumpLogger.info(`onPendingSettingsChange`, packet)
  })
  connection.events.onMeshPacket.subscribe((packet) => {
    dumpLogger.info(`onMeshPacket`, packet)
  })

  connection.events.onRoutingPacket.subscribe((routingPacket) => {
    if (routingPacket.data.variant.case === 'errorReason') {
      switch (routingPacket.data.variant.value) {
        case Protobuf.Mesh.Routing_Error.MAX_RETRANSMIT:
          console.error(`Routing Error: ${routingPacket.data.variant.value}`)
          break
        case Protobuf.Mesh.Routing_Error.NO_CHANNEL:
          console.error(`Routing Error: ${routingPacket.data.variant.value}`)
          break
        case Protobuf.Mesh.Routing_Error.PKI_UNKNOWN_PUBKEY:
          console.error(`Routing Error: ${routingPacket.data.variant.value}`)
          break
        default: {
          break
        }
      }
    }
  })
}
