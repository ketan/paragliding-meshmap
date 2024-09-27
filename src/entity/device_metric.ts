import { Between, Column, DataSource, Entity, EntityManager, Index, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'
import { DateTime, Duration } from 'luxon'

@Entity()
export default class DeviceMetric extends BaseType {
  @Index()
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'integer', nullable: true })
  batteryLevel?: number

  @Column({ type: 'double precision', nullable: true })
  voltage?: number

  @Column({ type: 'double precision', nullable: true })
  channelUtilization?: number

  @Column({ type: 'double precision', nullable: true })
  airUtilTx?: number

  @Column({ type: 'bigint', nullable: true })
  uptimeSeconds?: number

  constructor(opts: Partial<DeviceMetric> = {}) {
    super()
    _.assign(this, opts)
  }

  async findRecentSimilarMetric(trx: EntityManager | DataSource, since: Date) {
    return await trx.getRepository(DeviceMetric).findOne({
      where: {
        nodeId: this.nodeId,
        batteryLevel: this.batteryLevel,
        voltage: this.voltage,
        channelUtilization: this.channelUtilization,
        airUtilTx: this.airUtilTx,
        uptimeSeconds: this.uptimeSeconds,
        createdAt: MoreThanOrEqual(since),
      },
    })
  }

  static forNode(db: DataSource | EntityManager, nodeId: number, since: Date, duration: Duration) {
    return this.find(db, {
      select: ['batteryLevel', 'voltage', 'channelUtilization', 'airUtilTx', 'createdAt'],
      where: {
        nodeId: nodeId,
        createdAt: Between(since, DateTime.fromJSDate(since).plus(duration).toJSDate()),
      },
      order: {
        createdAt: 'asc',
      },
    })
  }
}
