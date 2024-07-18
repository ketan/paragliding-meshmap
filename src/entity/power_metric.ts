import { PowerMetrics } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '#config/data-source'
import { secondsAgo } from '#helpers/utils'
import { BaseType } from './base_type.js'
import { errLog } from '#helpers/logger'

@Entity()
export default class PowerMetric extends BaseType {
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

  async findRecentSimilarMetric(since: Date, trx: EntityManager) {
    return await trx.findOne(PowerMetric, {
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

  async saveIfNoSimilarRecentMetric(trx: EntityManager) {
    if (!(await this.findRecentSimilarMetric(secondsAgo(15), trx))) {
      await trx.save(this)
    }
  }

  static fromTelemetry(nodeId: number, telemetry: PowerMetrics) {
    try {
      const entity = AppDataSource.manager.merge(PowerMetric, new PowerMetric(), {
        nodeId: nodeId,
        ch1Current: telemetry.ch1Current,
        ch1Voltage: telemetry.ch1Voltage,

        ch2Current: telemetry.ch2Current,
        ch2Voltage: telemetry.ch2Voltage,

        ch3Current: telemetry.ch3Current,
        ch3Voltage: telemetry.ch3Voltage,
      })
      this.decodeLogger(`Decoded ${this.name}`, entity, telemetry)
      return entity
    } catch (e) {
      errLog(`unable to parse power metric`, { err: e, metrics: telemetry })
    }
  }
}
