import { Data, Waypoint as WaypointProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '#config/data-source'
import { parseProtobuf, toBigInt } from '#helpers/utils'
import { BaseType } from './base_type.js'
import { errLog } from '#helpers/logger'

@Entity()
export default class Waypoint extends BaseType {
  @Column({ type: 'bigint' })
  from: number

  @Column({ type: 'bigint' })
  to: number

  @Column({ type: 'bigint' })
  waypointId: number

  @Column({ type: 'integer' })
  latitude: number

  @Column({ type: 'integer' })
  longitude: number

  @Column({ type: 'bigint', nullable: true })
  expire?: number

  @Column({ type: 'bigint', nullable: true })
  lockedTo?: number

  @Column({ type: 'text', nullable: true })
  name?: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'integer', nullable: true })
  icon?: number

  @Column({ type: 'integer' })
  channel: number

  @Column({ type: 'bigint' })
  packetId: number

  @Column({ type: 'text' })
  channelId: string

  @Column({ type: 'bigint', nullable: true })
  gatewayId?: number

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    const waypoint = parseProtobuf(() =>
      WaypointProtobuf.fromBinary((packet.payloadVariant.value as Data).payload, { readUnknownFields: true })
    )

    try {
      const entity = AppDataSource.manager.merge(Waypoint, new Waypoint(), {
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

      this.decodeLogger(`Decoded ${this.name}`, entity, waypoint, envelope)
      return entity
    } catch (e) {
      errLog(`unable to parse waypoint`, { err: e, waypoint, envelope })
    }
  }
}
