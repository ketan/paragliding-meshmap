import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { EnvironmentMetrics } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '#config/data-source'
import { BaseType } from './base_type.js'
import { parseProtobuf } from '#helpers/utils'
import { errLog } from '#helpers/logger'

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

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    const metrics = parseProtobuf(() =>
      EnvironmentMetrics.fromBinary((packet.payloadVariant.value as Data).payload, { readUnknownFields: true })
    )

    try {
      return AppDataSource.manager.merge(EnvironmentMetric, new EnvironmentMetric(), {
        nodeId: packet.from,
        temperature: this.sanitizeNumber(metrics.temperature),
        relativeHumidity: this.sanitizeNumber(metrics.relativeHumidity),
        barometricPressure: this.sanitizeNumber(metrics.barometricPressure),
        gasResistance: this.sanitizeNumber(metrics.gasResistance),
        voltage: this.sanitizeNumber(metrics.voltage),
        current: this.sanitizeNumber(metrics.current),
        iaq: this.sanitizeNumber(metrics.iaq),
      })
    } catch (e) {
      errLog(`unable to create environment metric`, { err: e, metrics, envelope })
    }
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
