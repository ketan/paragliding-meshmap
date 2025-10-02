import { MeshDevice } from '@meshtastic/core'
import * as Protobuf from '@meshtastic/protobufs'
import { Logger } from 'tslog'

export const deviceLogger = new Logger({
  name: 'meshmap:device',
  prettyLogTemplate: '{{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{name}}]\t',
})

export function _subscribeAll(connection: MeshDevice) {
  connection.events.onRoutingPacket.subscribe((routingPacket) => {
    switch (routingPacket.data.variant.case) {
      case 'errorReason': {
        if (routingPacket.data.variant.value === Protobuf.Mesh.Routing_Error.NONE) {
          return
        }
        deviceLogger.error(`Routing Error: ${routingPacket.data.variant.value}`)
        break
      }
      case 'routeReply': {
        deviceLogger.error(`Route Reply: ${routingPacket.data.variant.value}`)
        break
      }
      case 'routeRequest': {
        deviceLogger.error(`Route Request: ${routingPacket.data.variant.value}`)
        break
      }
    }
  })

  connection.events.onDeviceMetadataPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onTelemetryPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onDeviceStatus.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onWaypointPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onMyNodeInfo.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onUserPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onPositionPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onNodeInfoPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onChannelPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onConfigPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onModuleConfigPacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onMessagePacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onTraceRoutePacket.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onPendingSettingsChange.subscribe((packet) => {
    console.log(packet)
  })
  connection.events.onMeshPacket.subscribe((packet) => {
    console.log(packet)
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
