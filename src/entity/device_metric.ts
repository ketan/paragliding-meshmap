import { AppDataSource } from '#config/data-source'
import { Column, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_type.js'
import { errLog } from '#helpers/logger'
import { meshtastic } from '../gen/meshtastic-protobufs.js'

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

  static fromTelemetry(nodeId: number, telemetry: meshtastic.DeviceMetrics) {
    try {
      const entity = AppDataSource.manager.merge(DeviceMetric, new DeviceMetric(), {
        nodeId: nodeId,
        batteryLevel: this.sanitizeNumber(telemetry.batteryLevel),
        voltage: this.sanitizeNumber(telemetry.voltage),
        channelUtilization: this.sanitizeNumber(telemetry.channelUtilization),
        airUtilTx: this.sanitizeNumber(telemetry.airUtilTx),
        uptimeSeconds: this.sanitizeNumber(telemetry.uptimeSeconds),
      })
      this.decodeLogger(`Decoded ${this.name}`, entity, telemetry)
      return entity
    } catch (e) {
      errLog(`unable to create device metric`, { error: e, telemetry })
    }
  }
}
