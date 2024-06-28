import { Data, Waypoint as WaypointProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { BaseType } from './base_type.js'
import { AppDataSource } from '../data-source.js'
import { ignorableProtobufError, toBigInt } from '../helpers/utils.js'

@Entity()
export default class Waypoint extends BaseType {
  @Column()
  from: number

  @Column()
  to: number

  @Column()
  waypointId: number

  @Column()
  latitude: number

  @Column()
  longitude: number

  @Column()
  expire?: number

  @Column()
  lockedTo?: number

  @Column()
  name?: string

  @Column()
  description?: string

  @Column()
  icon?: number

  @Column()
  channel: number

  @Column()
  packetId: number

  @Column()
  channelId: string

  @Column()
  gatewayId?: number

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!
    try {
      const waypoint = WaypointProtobuf.fromBinary((packet.payloadVariant.value as Data).payload)

      return AppDataSource.manager.merge(Waypoint, new Waypoint(), {
        to: packet.to,
        from: packet.from,
        waypointId: waypoint.id,
        latitude: waypoint.latitudeI,
        longitude: waypoint.longitudeI,
        expire: waypoint.expire,
        lockedTo: waypoint.lockedTo,
        name: waypoint.name,
        description: waypoint.description,
        icon: waypoint.icon,
        channel: packet.channel,
        packetId: packet.id,
        channelId: envelope.channelId,
        gatewayId: toBigInt(envelope.gatewayId),
      })
    } catch (e) {
      if (!ignorableProtobufError(e)) {
        this.logger({ err: e, envelope }, `Unable to parse waypoint`)
      }
    }
  }
}
