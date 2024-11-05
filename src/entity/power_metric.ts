import { Column, DataSource, Entity, EntityManager, Index, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_types.js'
import _ from 'lodash'

@Entity()
export default class PowerMetric extends BaseType {
  @Index()
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'double precision', nullable: true })
  ch1Voltage?: number

  @Column({ type: 'double precision', nullable: true })
  ch1Current?: number

  @Column({ type: 'double precision', nullable: true })
  ch2Voltage?: number

  @Column({ type: 'double precision', nullable: true })
  ch2Current?: number

  @Column({ type: 'double precision', nullable: true })
  ch3Voltage?: number

  @Column({ type: 'double precision', nullable: true })
  ch3Current?: number

  constructor(opts: Partial<PowerMetric> = {}) {
    super()
    _.assign(this, opts)
  }

  async findRecentSimilarMetric(trx: EntityManager | DataSource, since: Date) {
    return await trx.getRepository(PowerMetric).findOne({
      where: {
        nodeId: this.nodeId,
        ch1Voltage: this.ch1Voltage,
        ch1Current: this.ch1Current,
        ch2Voltage: this.ch2Voltage,
        ch2Current: this.ch2Current,
        ch3Voltage: this.ch3Voltage,
        ch3Current: this.ch3Current,
        createdAt: MoreThanOrEqual(since),
      },
    })
  }
}
