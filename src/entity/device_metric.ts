import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
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

  async findRecentSimilarMetric(since: Date, trx: EntityManager) {
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
}
