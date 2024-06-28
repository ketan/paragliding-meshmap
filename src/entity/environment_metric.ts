import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { EnvironmentMetrics } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { BaseType } from './base_type.js'
import { ignorableProtobufError, secondsAgo } from '../helpers/utils.js'

@Entity()
export default class EnvironmentMetric extends BaseType {
  @Column()
  nodeId: number

  @Column()
  temperature?: number

  @Column()
  relativeHumidity?: number

  @Column()
  barometricPressure?: number

  @Column()
  gasResistance?: number

  @Column()
  voltage?: number

  @Column()
  current?: number

  @Column()
  iaq?: number

  static fromPacket(envelope: ServiceEnvelope) {
    try {
      const packet = envelope.packet!
      const metrics = EnvironmentMetrics.fromBinary((packet.payloadVariant.value as Data).payload)

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
      if (!ignorableProtobufError(e)) {
        this.logger({ err: e, envelope }, `unable to parse environment metric`)
      }
    }
  }

  async hasRecentSimilarMetric(since: Date, trx: EntityManager) {
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

  async saveIfNoSimilarRecentMetric(trx: EntityManager) {
    if (!(await this.hasRecentSimilarMetric(secondsAgo(15), trx))) {
      await trx.save(this)
    }
  }
}
