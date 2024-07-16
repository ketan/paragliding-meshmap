import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { PowerMetrics } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '#config/data-source'
import { parseProtobuf, secondsAgo } from '#helpers/utils'
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

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    const metrics = parseProtobuf(() => PowerMetrics.fromBinary((packet.payloadVariant.value as Data).payload, { readUnknownFields: true }))

    try {
      return AppDataSource.manager.merge(PowerMetric, new PowerMetric(), {
        nodeId: packet.from,
        ch1Current: metrics.ch1Current,
        ch1Voltage: metrics.ch1Voltage,

        ch2Current: metrics.ch2Current,
        ch2Voltage: metrics.ch2Voltage,

        ch3Current: metrics.ch3Current,
        ch3Voltage: metrics.ch3Voltage,
      })
    } catch (e) {
      errLog(`unable to parse power metric`, { err: e, metrics, envelope })
    }
  }

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
}
