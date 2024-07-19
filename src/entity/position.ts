import { AppDataSource } from '#config/data-source'
import { errLog } from '#helpers/logger'
import { parseProtobuf, toBigInt } from '#helpers/utils'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
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

  static fromPacket(envelope: meshtastic.ServiceEnvelope) {
    const packet = envelope.packet
    const payload = packet?.decoded?.payload

    if (!payload) {
      return
    }

    const position = parseProtobuf(() => meshtastic.Position.decode(payload))

    try {
      const entity = AppDataSource.manager.merge(Position, new Position(), {
        nodeId: packet.from!,
        to: packet.to!,
        from: packet.from!,

        channel: packet.channel!,
        packetId: packet.id!,
        channelId: envelope.channelId!,
        gatewayId: toBigInt(envelope.gatewayId),

        latitude: position.latitudeI!,
        longitude: position.longitudeI!,
        altitude: position.altitude!,
      })

      this.decodeLogger(`Decoded ${this.name}`, entity, position, envelope)
      return entity
    } catch (e) {
      errLog(`Unable to parse position`, { err: e, position, envelope })
    }
  }

  async findRecentPosition(since: Date, trx: EntityManager) {
    return await trx.findOne(Position, {
      where: {
        nodeId: this.nodeId,
        packetId: this.packetId,
        createdAt: MoreThanOrEqual(since),
      },
    })
  }

  static async positionsForNode(nodeId: string | number) {
    const sanitizedNodeId = Number(nodeId)

    if (sanitizedNodeId === null || sanitizedNodeId === undefined || isNaN(sanitizedNodeId)) {
      return null
    }

    return await AppDataSource.manager.find(Position, {
      select: ['createdAt', 'latitude', 'longitude', 'altitude'],
      where: {
        nodeId: sanitizedNodeId,
      },
      order: {
        createdAt: 'ASC',
      },
    })
  }
}
