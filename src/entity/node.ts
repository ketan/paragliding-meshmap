import { Column, Entity } from 'typeorm'
import DeviceMetric from './device_metric.js'
import EnvironmentMetric from './environment_metric.js'
import MapReport from './map_report.js'
import { Neighbors } from './neighbors.js'
import Position from './position.js'
import { ignorableProtobufError } from '../helpers/utils.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Data, User } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { BaseType } from './base_type.js'
import { AppDataSource } from '../data-source.js'

@Entity()
export default class Node extends BaseType {
  @Column()
  nodeId: number

  @Column()
  longName?: string

  @Column()
  shortName?: string

  @Column()
  hardwareModel?: number

  @Column()
  isLicensed?: boolean

  @Column()
  role?: number

  @Column()
  altitude?: number

  @Column()
  latitude?: number

  @Column()
  longitude?: number

  @Column()
  airUtilTx?: number

  @Column()
  batteryLevel?: number

  @Column()
  channelUtilization?: number

  @Column()
  voltage?: number

  @Column()
  neighbourBroadcastIntervalSecs?: number

  @Column({ type: 'json' })
  neighbours?: Neighbors[]

  @Column()
  neighboursUpdatedAt?: Date

  @Column()
  positionUpdatedAt?: Date

  @Column()
  mqttConnectionState?: string

  @Column()
  mqttConnectionStateUpdatedAt?: Date

  @Column()
  firmwareVersion?: string

  @Column()
  hasDefaultChannel?: boolean

  @Column()
  modemPreset?: number

  @Column()
  numOnlineLocalNodes?: number

  @Column()
  positionPrecision?: number

  @Column()
  region?: number

  @Column()
  uptimeSeconds?: number

  @Column()
  barometricPressure?: number

  @Column()
  relativeHumidity?: number

  @Column()
  temperature?: number

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!
    try {
      const user = User.fromBinary((packet.payloadVariant.value as Data).payload)

      return AppDataSource.manager.merge(Node, new Node(), {
        nodeId: packet.from,
        longName: user.longName,
        shortName: user.shortName,
        hardwareModel: user.hwModel,
        isLicensed: user.isLicensed,
        role: user.role,
      })
    } catch (e) {
      if (!ignorableProtobufError(e)) {
        this.logger({ err: e, envelope }, `Unable to parse node`)
      }
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
