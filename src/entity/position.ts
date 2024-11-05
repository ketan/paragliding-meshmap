import { Column, DataSource, Entity, EntityManager, Index, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_types.js'
import _ from 'lodash'
import { PositionDTO } from '#entity/map_report'
import { dateTimeType } from '#helpers/migration-helper'
import { DateTime, Duration } from 'luxon'

@Entity()
export default class Position extends BaseType {
  @Index()
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
  latitude?: number | null

  @Column({ type: 'integer', nullable: true })
  longitude?: number | null

  @Column({ type: 'integer', nullable: true })
  altitude?: number | null

  @Column({ type: 'integer', nullable: true })
  aboveGroundLevel?: number | null

  @Column({ type: 'integer', nullable: true })
  satsInView: number

  @Column({ type: 'integer', nullable: true })
  precisionBits: number

  @Column({ ...dateTimeType(), nullable: true })
  timestamp?: Date

  @Column({ ...dateTimeType(), nullable: true })
  time?: Date

  @Column({ type: 'integer', nullable: true })
  pdop: number

  @Column({ type: 'double precision', nullable: true })
  groundSpeed?: number

  @Column({ type: 'double precision', nullable: true })
  groundTrack?: number

  constructor(opts: Partial<Position> = {}) {
    super()
    _.assign(this, opts)
  }

  async findRecentPosition(trx: EntityManager, since: Date) {
    return await trx.findOne(Position, {
      where: {
        nodeId: this.nodeId,
        packetId: this.packetId,
        createdAt: MoreThanOrEqual(since),
      },
    })
  }

  static async forNode(db: EntityManager | DataSource, nodeId: number, since: Date) {
    return (await db.getRepository(this).find({
      select: ['createdAt', 'latitude', 'longitude', 'altitude', 'id', 'pdop', 'time', 'timestamp', 'precisionBits', 'satsInView'],
      where: {
        nodeId,
        createdAt: MoreThanOrEqual(since),
      },
      order: {
        createdAt: 'ASC',
      },
    })) as PositionDTO[]
  }

  static async countByGatewayId(
    db: EntityManager | DataSource,
    since: Date,
    duration: Duration
  ): Promise<
    {
      gatewayId: number
      count: number
    }[]
  > {
    return await db
      .getRepository(this)
      .createQueryBuilder('position')
      .leftJoinAndSelect('nodes', 'node', 'position.gatewayId = node.nodeId')
      .select('position.gatewayId', 'gateway_id')
      .addSelect('COUNT(position.id)', 'count')
      .addSelect('node.short_name', 'short_name')
      .addSelect('node.long_name', 'long_name')
      .where('position.createdAt >= :since', { since })
      .andWhere('position.createdAt <= :duration', { duration: DateTime.fromJSDate(since).plus(duration).toJSDate() })
      .groupBy('position.gatewayId')
      .addGroupBy('node.short_name')
      .addGroupBy('node.long_name')
      .orderBy('count', 'DESC')
      .limit(20)
      .getRawMany()
  }

  static async countByNodeId(
    db: EntityManager | DataSource,
    since: Date,
    duration: Duration
  ): Promise<
    {
      nodeId: number
      count: number
    }[]
  > {
    return await db
      .getRepository(this)
      .createQueryBuilder('position')
      .leftJoinAndSelect('nodes', 'node', 'position.nodeId = node.nodeId')
      .select('position.nodeId', 'node_id')
      .addSelect('COUNT(*)', 'count')
      .addSelect('node.short_name', 'short_name')
      .addSelect('node.long_name', 'long_name')
      .where('position.createdAt >= :since', { since })
      .andWhere('position.createdAt <= :duration', { duration: DateTime.fromJSDate(since).plus(duration).toJSDate() })
      .groupBy('position.nodeId')
      .addGroupBy('node.short_name')
      .addGroupBy('node.long_name')
      .orderBy('count', 'DESC')
      .limit(20)
      .getRawMany()
  }

  static async dailyPositionCount(
    db: EntityManager | DataSource,
    since: Date,
    duration: Duration
  ): Promise<
    {
      date: string
      count: number
    }[]
  > {
    return await db
      .getRepository(this)
      .createQueryBuilder('position')
      .select("DATE_TRUNC('day', position.createdAt)", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('position.createdAt >= :since', { since })
      .andWhere('position.createdAt <= :duration', { duration: DateTime.fromJSDate(since).plus(duration).toJSDate() })
      .groupBy("DATE_TRUNC('day', position.createdAt)")
      .orderBy('date', 'ASC')
      .getRawMany()
  }
}
