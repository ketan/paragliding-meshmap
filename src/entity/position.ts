import { Data, Position as PositionProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { parseProtobuf, secondsAgo, toBigInt } from '../helpers/utils.js'
import { BaseType } from './base_type.js'

@Entity()
export default class Position extends BaseType {
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'bigint' })
  to: number

  @Column({ type: 'bigint' })
  from: number

  @Column({ type: 'integer', nullable: true })
  channel?: number

  @Column({ type: 'bigint', nullable: true })
  packetId?: number

  @Column({ type: 'text', nullable: true })
  channelId?: string

  @Column({ type: 'bigint', nullable: true })
  gatewayId?: number

  @Column({ type: 'integer', nullable: true })
  latitude?: number

  @Column({ type: 'integer', nullable: true })
  longitude?: number

  @Column({ type: 'integer', nullable: true })
  altitude?: number

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    const position = parseProtobuf(() =>
      PositionProtobuf.fromBinary((packet.payloadVariant.value as Data).payload, { readUnknownFields: true })
    )

    try {
      return AppDataSource.manager.merge(Position, new Position(), {
        nodeId: packet.from,
        to: packet.to,
        from: packet.from,

        channel: packet.channel,
        packetId: packet.id,
        channelId: envelope.channelId,
        gatewayId: toBigInt(envelope.gatewayId),

        latitude: position.latitudeI,
        longitude: position.longitudeI,
        altitude: position.altitude,
      })
    } catch (e) {
      this.logger(`Unable to parse position`, { err: e, position, envelope })
    }
  }

  async hasRecentPosition(since: Date, trx: EntityManager) {
    return !!(await trx.findOne(Position, {
      where: {
        nodeId: this.nodeId,
        packetId: this.packetId,
        createdAt: MoreThanOrEqual(since),
      },
    }))
  }

  async saveIfNoSimilarRecentPosition(trx: EntityManager) {
    if (!(await this.hasRecentPosition(secondsAgo(15), trx))) {
      await trx.save(this)
    }
  }
}
