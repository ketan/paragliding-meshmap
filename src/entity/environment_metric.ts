import { Between, Column, DataSource, Entity, EntityManager, Index, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'
import { DateTime, Duration } from 'luxon'

@Entity()
export default class EnvironmentMetric extends BaseType {
  @Index()
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

  async findRecentSimilarMetric(trx: EntityManager | DataSource, since: Date) {
    return await trx.getRepository(EnvironmentMetric).findOne({
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

  static async forNode(db: DataSource | EntityManager, nodeId: number, since: Date, duration: Duration) {
    return this.find(db, {
      select: {
        temperature: true,
        relativeHumidity: true,
        barometricPressure: true,
        createdAt: true,
      },
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
