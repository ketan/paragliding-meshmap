import { Data, User } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { parseProtobuf } from '../helpers/utils.js'
import { BaseType } from './base_type.js'
import DeviceMetric from './device_metric.js'
import EnvironmentMetric from './environment_metric.js'
import MapReport from './map_report.js'
import { Neighbors } from './neighbors.js'
import Position from './position.js'

@Entity()
export default class Node extends BaseType {
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'text', nullable: true })
  longName?: string

  @Column({ type: 'text', nullable: true })
  shortName?: string

  @Column({ type: 'integer', nullable: true })
  hardwareModel?: number

  @Column({ type: 'boolean', nullable: true })
  isLicensed?: boolean

  @Column({ type: 'integer', nullable: true })
  role?: number

  @Column({ type: 'integer', nullable: true })
  altitude?: number

  @Column({ type: 'integer', nullable: true })
  latitude?: number

  @Column({ type: 'integer', nullable: true })
  longitude?: number

  @Column({ type: 'double', nullable: true })
  airUtilTx?: number

  @Column({ type: 'integer', nullable: true })
  batteryLevel?: number

  @Column({ type: 'double', nullable: true })
  channelUtilization?: number

  @Column({ type: 'double', nullable: true })
  voltage?: number

  @Column({ type: 'integer', nullable: true })
  neighbourBroadcastIntervalSecs?: number

  @Column({ type: 'json', nullable: true })
  neighbours?: Neighbors[]

  @Column({ type: 'datetime', nullable: true })
  neighboursUpdatedAt?: Date

  @Column({ type: 'datetime', nullable: true })
  positionUpdatedAt?: Date

  @Column({ type: 'text', nullable: true })
  mqttConnectionState?: string

  @Column({ type: 'datetime', nullable: true })
  mqttConnectionStateUpdatedAt?: Date

  @Column({ type: 'text', nullable: true })
  firmwareVersion?: string

  @Column({ type: 'boolean', nullable: true })
  hasDefaultChannel?: boolean

  @Column({ type: 'integer', nullable: true })
  modemPreset?: number

  @Column({ type: 'integer', nullable: true })
  numOnlineLocalNodes?: number

  @Column({ type: 'integer', nullable: true })
  positionPrecision?: number

  @Column({ type: 'integer', nullable: true })
  region?: number

  @Column({ type: 'bigint', nullable: true })
  uptimeSeconds?: number

  @Column({ type: 'double', nullable: true })
  barometricPressure?: number

  @Column({ type: 'double', nullable: true })
  relativeHumidity?: number

  @Column({ type: 'double', nullable: true })
  temperature?: number

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    const user = parseProtobuf(() => User.fromBinary((packet.payloadVariant.value as Data).payload))

    try {
      return AppDataSource.manager.merge(Node, new Node(), {
        nodeId: packet.from,
        longName: user.longName,
        shortName: user.shortName,
        hardwareModel: user.hwModel,
        isLicensed: user.isLicensed,
        role: user.role,
      })
    } catch (e) {
      this.logger(`Unable to create node`, { err: e, user, envelope })
    }
  }

  public updateDeviceMetrics(dm: DeviceMetric) {
    AppDataSource.manager.merge(Node, this, {
      batteryLevel: dm.batteryLevel,
      voltage: dm.voltage,
      airUtilTx: dm.airUtilTx,
      channelUtilization: dm.channelUtilization,
      uptimeSeconds: dm.uptimeSeconds,
    })
  }

  updateEnvironmentMetrics(em: EnvironmentMetric) {
    AppDataSource.manager.merge(Node, this, {
      barometricPressure: em.barometricPressure,
      relativeHumidity: em.relativeHumidity,
      temperature: em.temperature,
      voltage: em.voltage,
    })
  }

  updateMapReports(mr: MapReport) {
    AppDataSource.manager.merge(Node, this, {
      nodeId: mr.nodeId,
      shortName: mr.shortName,
      longName: mr.longName,
      role: mr.role,
      latitude: mr.latitude,
      longitude: mr.longitude,
      altitude: BaseType.sanitizeNumber(mr.altitude),
      firmwareVersion: mr.firmwareVersion,
      region: mr.region,
      modemPreset: mr.modemPreset,
      hasDefaultChannel: mr.hasDefaultChannel,
      positionPrecision: mr.positionPrecision,
      numOnlineLocalNodes: mr.numOnlineLocalNodes,
      positionUpdatedAt: new Date(),
    })
  }

  updateMqttStatus(mqttConnectionState: string, mqttConnectionStateUpdatedAt: Date) {
    AppDataSource.manager.merge(Node, this, {
      mqttConnectionState: mqttConnectionState,
      mqttConnectionStateUpdatedAt: mqttConnectionStateUpdatedAt,
    })
  }

  updatePosition(position: Position) {
    AppDataSource.manager.merge(Node, this, {
      nodeId: position.from,
      positionUpdatedAt: new Date(),
      latitude: position.latitude,
      longitude: position.longitude,
      altitude: BaseType.sanitizeNumber(position.altitude),
    })
  }

  updateNeighbors(neighbours: Neighbors[]) {
    AppDataSource.manager.merge(Node, this, {
      neighboursUpdatedAt: new Date(),
      neighbours: neighbours,
    })
  }

  static async hardwareModels() {
    await AppDataSource.manager.query(
      'select hardware_model as hardwareModel, count(hardware_model) as count from nodes group by hardware_model'
    )
  }
}
