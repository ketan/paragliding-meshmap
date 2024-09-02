import { dateTimeType, jsonType } from '#helpers/migration-helper'
import { DateTime, Duration } from 'luxon'
import { Column, DataSource, Entity, EntityManager, Index } from 'typeorm'
import { BaseType, BaseTypeWithoutPrimaryKey } from './base_type.js'
import DeviceMetric from './device_metric.js'
import EnvironmentMetric from './environment_metric.js'
import MapReport from './map_report.js'
import { MessageIn, MessageOut, Neighbors } from './neighbors.js'
import NeighbourInfo from './neighbour_info.js'
import Position from './position.js'
import TextMessage from './text_message.js'
import _ from 'lodash'
import { BROADCAST_ADDR } from '#helpers/utils'

@Entity()
export default class Node extends BaseTypeWithoutPrimaryKey {
  private static conflictResolve = {
    skipUpdateIfNoValuesChanged: true,
    conflictPaths: ['nodeId'],
  }
  @Index()
  @Column({ type: 'bigint', unique: true, primary: true, nullable: false })
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
  @Column({ type: 'double precision', nullable: true })
  airUtilTx?: number
  @Column({ type: 'integer', nullable: true })
  batteryLevel?: number
  @Column({ type: 'double precision', nullable: true })
  channelUtilization?: number
  @Column({ type: 'double precision', nullable: true })
  voltage?: number
  @Column({ type: 'integer', nullable: true })
  neighbourBroadcastIntervalSecs?: number
  @Column({ type: jsonType(), nullable: true })
  neighbours?: Neighbors[]
  @Column({ type: jsonType(), nullable: true })
  outbox?: MessageOut[]
  @Column({ type: jsonType(), nullable: true })
  inbox?: MessageIn[]
  @Column({ ...dateTimeType(), nullable: true })
  neighboursUpdatedAt?: Date
  @Column({ ...dateTimeType(), nullable: true })
  positionUpdatedAt?: Date
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
  @Column({ type: 'double precision', nullable: true })
  barometricPressure?: number
  @Column({ type: 'double precision', nullable: true })
  relativeHumidity?: number
  @Column({ type: 'double precision', nullable: true })
  temperature?: number
  @Column({ type: 'integer', nullable: true })
  satsInView: number
  @Column({ type: 'integer', nullable: true })
  positionPrecisionBits: number
  @Column({ ...dateTimeType(), nullable: true })
  positionTimestamp: Date
  @Column({ type: 'integer', nullable: true })
  positionPdop: number

  constructor(opts: Partial<Node> = {}) {
    super()
    _.assign(this, opts)
  }

  static async updateDeviceMetrics(trx: EntityManager | DataSource, dm: DeviceMetric) {
    return await trx.getRepository(Node).upsert(
      {
        nodeId: dm.nodeId,
        batteryLevel: dm.batteryLevel,
        voltage: dm.voltage,
        airUtilTx: dm.airUtilTx,
        channelUtilization: dm.channelUtilization,
        uptimeSeconds: dm.uptimeSeconds,
      },
      this.conflictResolve
    )
  }

  static async updateEnvironmentMetrics(trx: EntityManager | DataSource, em: EnvironmentMetric) {
    return await trx.getRepository(Node).upsert(
      {
        nodeId: em.nodeId,
        barometricPressure: em.barometricPressure,
        relativeHumidity: em.relativeHumidity,
        temperature: em.temperature,
        voltage: em.voltage,
      },
      this.conflictResolve
    )
  }

  static async updateMapReports(trx: EntityManager | DataSource, mr: MapReport) {
    return await trx.getRepository(Node).upsert(
      {
        nodeId: mr.nodeId,
        shortName: mr.shortName,
        longName: mr.longName,
        role: mr.role,
        latitude: mr.latitude,
        longitude: mr.longitude,
        altitude: BaseType.sanitizeNumber(mr.altitude),
        firmwareVersion: mr.firmwareVersion,
        hardwareModel: mr.hardwareModel,
        region: mr.region,
        modemPreset: mr.modemPreset,
        hasDefaultChannel: mr.hasDefaultChannel,
        positionPrecision: mr.positionPrecision,
        numOnlineLocalNodes: mr.numOnlineLocalNodes,
        positionUpdatedAt: new Date(),
      },
      this.conflictResolve
    )
  }

  static async updatePosition(trx: EntityManager, position: Position) {
    return await trx.getRepository(Node).upsert(
      {
        nodeId: position.from,
        positionUpdatedAt: new Date(),
        latitude: BaseType.sanitizeNumber(position.latitude), // unlikely that lat/lon/alt are exactly `0`
        longitude: BaseType.sanitizeNumber(position.longitude),
        altitude: BaseType.sanitizeNumber(position.altitude),

        positionPdop: BaseType.sanitizeNumber(position.pdop),
        positionTimestamp: _([position.time, position.timestamp]).compact().min(),
        positionPrecisionBits: BaseType.sanitizeNumber(position.precisionBits),
        satsInView: BaseType.sanitizeNumber(position.satsInView),
      },
      this.conflictResolve
    )
  }

  static async updateNeighbors(trx: EntityManager, neighborInfo: NeighbourInfo) {
    return await trx.getRepository(Node).upsert(
      {
        nodeId: neighborInfo.nodeId,
        neighbours: neighborInfo.neighbours,
        neighboursUpdatedAt: new Date(),
      },
      this.conflictResolve
    )
  }

  static async hardwareModels(mgr: EntityManager | DataSource) {
    return (
      (await mgr.query('select hardware_model as hardwareModel, count(hardware_model) as count from nodes group by hardware_model')) || []
    )
  }

  async createOrUpdate(trx: EntityManager) {
    return await trx.getRepository(Node).upsert(this, {
      skipUpdateIfNoValuesChanged: true,
      conflictPaths: ['nodeId'],
    })
  }

  inboundMessage(tm: Pick<TextMessage, 'from' | 'text' | 'to' | 'createdAt'>, purgeOlderThan: Duration) {
    if (tm.to === BROADCAST_ADDR) {
      return
    }

    const now = DateTime.now()
    this.inbox ||= []
    this.inbox.unshift({ from: tm.from, text: tm.text, time: tm.createdAt.toISOString() })
    if (purgeOlderThan) {
      this.inbox = this.inbox.filter((msg) => {
        const messageAge = now.diff(DateTime.fromISO(msg.time))
        return messageAge < purgeOlderThan
      })
    }
  }

  outboundMessage(tm: Pick<TextMessage, 'from' | 'text' | 'to' | 'createdAt'>, purgeOlderThan: Duration) {
    const now = DateTime.now()
    this.outbox ||= []
    this.outbox.unshift({ to: tm.to, text: tm.text, time: tm.createdAt.toISOString() })
    if (purgeOlderThan) {
      this.outbox = this.outbox.filter((msg) => {
        const messageAge = now.diff(DateTime.fromISO(msg.time))
        return messageAge < purgeOlderThan
      })
    }
  }

  static async findOrBuild(trx: EntityManager, nodeId: number) {
    return (await trx.getRepository(Node).findOne({ where: { nodeId } })) || new Node({ nodeId })
  }
}
