import { Data, Position as PositionProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { ignorableProtobufError, secondsAgo, toBigInt } from '../helpers/utils.js'
import { BaseType } from './base_type.js'

@Entity()
export default class Position extends BaseType {
  @Column()
  nodeId: number

  @Column()
  to: number

  @Column()
  from: number

  @Column()
  channel?: number

  @Column()
  packetId?: number

  @Column()
  channelId?: string

  @Column()
  gatewayId?: number

  @Column()
  latitude?: number

  @Column()
  longitude?: number

  @Column()
  altitude?: number

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!
    try {
      const position = PositionProtobuf.fromBinary((packet.payloadVariant.value as Data).payload)

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
      if (!ignorableProtobufError(e)) {
        this.logger({ err: e, envelope }, `Unable to parse position`)
      }
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
