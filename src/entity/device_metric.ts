import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { DeviceMetrics } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { parseProtobuf } from '../helpers/utils.js'
import { BaseType } from './base_type.js'

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

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    const metrics = parseProtobuf(() =>
      DeviceMetrics.fromBinary((packet.payloadVariant.value as Data).payload, { readUnknownFields: true })
    )

    try {
      return AppDataSource.manager.merge(DeviceMetric, new DeviceMetric(), {
        nodeId: packet.from,
        batteryLevel: this.sanitizeNumber(metrics.batteryLevel),
        voltage: this.sanitizeNumber(metrics.voltage),
        channelUtilization: this.sanitizeNumber(metrics.channelUtilization),
        airUtilTx: this.sanitizeNumber(metrics.airUtilTx),
        uptimeSeconds: this.sanitizeNumber(metrics.uptimeSeconds),
      })
    } catch (e) {
      this.logger(`unable to create device metric`, { error: e, metrics, envelope })
    }
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
