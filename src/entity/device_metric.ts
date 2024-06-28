import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { DeviceMetrics } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { ignorableProtobufError, secondsAgo } from '../helpers/utils.js'
import { BaseType } from './base_type.js'

@Entity()
export default class DeviceMetric extends BaseType {
  @Column()
  nodeId: number

  @Column()
  batteryLevel?: number

  @Column()
  voltage?: number

  @Column()
  channelUtilization?: number

  @Column()
  airUtilTx?: number

  @Column()
  uptimeSeconds?: number

  static fromPacket(envelope: ServiceEnvelope) {
    try {
      const packet = envelope.packet!
      const metrics = DeviceMetrics.fromBinary((packet.payloadVariant.value as Data).payload)

      return AppDataSource.manager.merge(DeviceMetric, new DeviceMetric(), {
        nodeId: packet.from,
        batteryLevel: this.sanitizeNumber(metrics.batteryLevel),
        voltage: this.sanitizeNumber(metrics.voltage),
        channelUtilization: this.sanitizeNumber(metrics.channelUtilization),
        airUtilTx: this.sanitizeNumber(metrics.airUtilTx),
        uptimeSeconds: this.sanitizeNumber(metrics.uptimeSeconds),
      })
    } catch (e) {
      if (!ignorableProtobufError(e)) {
        this.logger({ err: e, envelope }, `unable to parse device metric`)
      }
    }
  }

  async hasRecentSimilarMetric(since: Date, trx: EntityManager) {
    return await trx.find(DeviceMetric, {
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

  async saveIfNoSimilarRecentMetric(trx: EntityManager) {
    if (!(await this.hasRecentSimilarMetric(secondsAgo(15), trx))) {
      await trx.save(this)
    }
  }
}
