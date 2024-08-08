import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'

@Entity()
export default class EnvironmentMetric extends BaseType {
  @Column({ type: 'bigint', nullable: false })
  nodeId: number

  @Column({ type: 'double precision', nullable: true })
  temperature?: number

  @Column({ type: 'double precision', nullable: true })
  relativeHumidity?: number

  @Column({ type: 'double precision', nullable: true })
  barometricPressure?: number

  @Column({ type: 'double precision', nullable: true })
  gasResistance?: number

  @Column({ type: 'double precision', nullable: true })
  voltage?: number

  @Column({ type: 'double precision', nullable: true })
  current?: number

  @Column({ type: 'integer', nullable: true })
  iaq?: number

  constructor(opts: Partial<EnvironmentMetric> = {}) {
    super()
    _.assign(this, opts)
  }

  async findRecentSimilarMetric(since: Date, trx: EntityManager) {
    return await trx.findOne(EnvironmentMetric, {
      where: {
        nodeId: this.nodeId,
        temperature: this.temperature,
        relativeHumidity: this.relativeHumidity,
        barometricPressure: this.barometricPressure,
        gasResistance: this.gasResistance,
        voltage: this.voltage,
        current: this.current,
        iaq: this.iaq,
        createdAt: MoreThanOrEqual(since),
      },
    })
  }
}
