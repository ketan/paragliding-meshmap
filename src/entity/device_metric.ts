import { Column, DataSource, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'

@Entity()
export default class DeviceMetric extends BaseType {
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

  async findRecentSimilarMetric(trx: EntityManager, since: Date) {
    return await trx.findOne(DeviceMetric, {
      where: {
        nodeId: this.nodeId,
        voltage: this.voltage,
        channelUtilization: this.channelUtilization,
        airUtilTx: this.airUtilTx,
        uptimeSeconds: this.uptimeSeconds,
        createdAt: MoreThanOrEqual(since),
      },
    })
  }

  static forNode(db: DataSource | EntityManager, nodeId: number, since: Date) {
    return this.find(db, {
      select: ['batteryLevel', 'voltage', 'channelUtilization', 'airUtilTx', 'createdAt'],
      where: {
        nodeId: nodeId,
        createdAt: MoreThanOrEqual(since),
      },
      order: {
        createdAt: 'asc',
      },
    })
  }
}
