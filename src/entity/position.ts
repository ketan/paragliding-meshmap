import { AppDataSource } from '#config/data-source'
import { Column, DataSource, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'

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

  constructor(opts: Partial<Position> = {}) {
    super()
    _.assign(this, opts)
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

  async findRecentPosition(since: Date, trx: EntityManager) {
    return await trx.findOne(Position, {
      where: {
        nodeId: this.nodeId,
        packetId: this.packetId,
        createdAt: MoreThanOrEqual(since),
      },
    })
  }

  static async forNode(db: EntityManager | DataSource, nodeId: number, since: Date) {
    return await db.getRepository(this).find({
      select: ['createdAt', 'latitude', 'longitude', 'altitude'],
      where: {
        nodeId,
        createdAt: MoreThanOrEqual(since),
      },
      order: {
        createdAt: 'ASC',
      },
    })
  }
}
