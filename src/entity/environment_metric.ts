import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '#config/data-source'
import { BaseType } from './base_type.js'
import { errLog } from '#helpers/logger'
import { meshtastic } from '../gen/meshtastic-protobufs.js'

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

  static fromTelemetry(nodeId: number, telemetry: meshtastic.EnvironmentMetrics) {
    try {
      const entity = AppDataSource.manager.merge(EnvironmentMetric, new EnvironmentMetric(), {
        nodeId: nodeId,
        temperature: this.sanitizeNumber(telemetry.temperature),
        relativeHumidity: this.sanitizeNumber(telemetry.relativeHumidity),
        barometricPressure: this.sanitizeNumber(telemetry.barometricPressure),
        gasResistance: this.sanitizeNumber(telemetry.gasResistance),
        voltage: this.sanitizeNumber(telemetry.voltage),
        current: this.sanitizeNumber(telemetry.current),
        iaq: this.sanitizeNumber(telemetry.iaq),
      })
      this.decodeLogger(`Decoded ${this.name}`, entity, telemetry)
      return entity
    } catch (e) {
      errLog(`unable to create environment metric`, { err: e, telemetry })
    }
  }
}
