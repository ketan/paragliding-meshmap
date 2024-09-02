import { dateTimeType, jsonType } from '#helpers/migration-helper'
import { DateTime, Duration } from 'luxon'
import { BeforeInsert, BeforeUpdate, Column, DataSource, Entity, EntityManager, Index } from 'typeorm'
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
import { v5 as uuidv5 } from 'uuid'
import { AppDataSource } from '#config/data-source'
import { Configs } from '#entity/configs'
import { randomUUID } from 'node:crypto'

@Entity()
export default class Node extends BaseTypeWithoutPrimaryKey {
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
  @Column({ type: 'text', nullable: true })
  flyXCToken?: string

  static flyXCTokenNamespace: Configs

  constructor(opts: Partial<Node> = {}) {
    super()
    _.assign(this, opts)
  }

  @BeforeInsert()
  @BeforeUpdate()
  async createflyXCToken() {
    if (this.flyXCToken) {
      return
    }

    const nodeId = this.nodeId?.toString().trim()
    const shortName = this.shortName?.trim()
    const longName = this.longName?.trim()

    if (nodeId && shortName && longName && nodeId !== '' && shortName !== '' && longName !== '') {
      const value = `${nodeId}-${shortName}-${longName}`
      this.flyXCToken = uuidv5(value, await this.createFlyXCTokenNamespaceIfNotExisting())
    }
  }

  private async createFlyXCTokenNamespaceIfNotExisting() {
    if (!Node.flyXCTokenNamespace) {
      const flyXCTokenNamespace =
        (await Configs.byName(AppDataSource, 'flyXCTokenNamespace')) ||
        new Configs({
          key: 'flyXCTokenNamespace',
          value: randomUUID(),
        })

      if (!flyXCTokenNamespace.id) {
        await flyXCTokenNamespace.save(AppDataSource)
      }

      Node.flyXCTokenNamespace = flyXCTokenNamespace
    }

    return Node.flyXCTokenNamespace.value as string
  }

  merge(opts: Partial<Node>) {
    _.assign(this, opts)
  }

  static async updateDeviceMetrics(trx: EntityManager | DataSource, dm: DeviceMetric) {
    const repository = trx.getRepository(Node)
    const node = (await repository.findOne({ where: { nodeId: dm.nodeId } })) || new Node({ nodeId: dm.nodeId })

    node.merge({
      nodeId: dm.nodeId,
      batteryLevel: dm.batteryLevel,
      voltage: dm.voltage,
      airUtilTx: dm.airUtilTx,
      channelUtilization: dm.channelUtilization,
      uptimeSeconds: dm.uptimeSeconds,
    })

    return await repository.save(node)
  }

  static async updateEnvironmentMetrics(trx: EntityManager | DataSource, em: EnvironmentMetric) {
    const repository = trx.getRepository(Node)
    const node = (await repository.findOne({ where: { nodeId: em.nodeId } })) || new Node({ nodeId: em.nodeId })

    node.merge({
      nodeId: em.nodeId,
      barometricPressure: em.barometricPressure,
      relativeHumidity: em.relativeHumidity,
      temperature: em.temperature,
      voltage: em.voltage,
    })

    return await repository.save(node)
  }

  static async updateMapReports(trx: EntityManager | DataSource, mr: MapReport) {
    const repository = trx.getRepository(Node)
    const node = (await repository.findOne({ where: { nodeId: mr.nodeId } })) || new Node({ nodeId: mr.nodeId })

    node.merge({
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
    })

    return await repository.save(node)
  }

  static async updatePosition(trx: EntityManager, position: Position) {
    const repository = trx.getRepository(Node)
    const node = (await repository.findOne({ where: { nodeId: position.from } })) || new Node({ nodeId: position.from })

    node.merge({
      nodeId: position.from,
      positionUpdatedAt: new Date(),
      latitude: BaseType.sanitizeNumber(position.latitude), // unlikely that lat/lon/alt are exactly `0`
      longitude: BaseType.sanitizeNumber(position.longitude),
      altitude: BaseType.sanitizeNumber(position.altitude),

      positionPdop: BaseType.sanitizeNumber(position.pdop),
      positionTimestamp: _([position.time, position.timestamp]).compact().min(),
      positionPrecisionBits: BaseType.sanitizeNumber(position.precisionBits),
      satsInView: BaseType.sanitizeNumber(position.satsInView),
    })

    return await repository.save(node)
  }

  static async updateNeighbors(trx: EntityManager, neighborInfo: NeighbourInfo) {
    const repository = trx.getRepository(Node)
    const node = (await repository.findOne({ where: { nodeId: neighborInfo.nodeId } })) || new Node({ nodeId: neighborInfo.nodeId })

    node.merge({
      nodeId: neighborInfo.nodeId,
      neighbours: neighborInfo.neighbours,
      neighboursUpdatedAt: new Date(),
    })

    return await repository.save(node)
  }

  static async hardwareModels(mgr: EntityManager | DataSource) {
    return (
      (await mgr.query('select hardware_model as hardwareModel, count(hardware_model) as count from nodes group by hardware_model')) || []
    )
  }

  async createOrUpdate(trx: EntityManager) {
    const repository = trx.getRepository(Node)
    const node = (await repository.findOne({ where: { nodeId: this.nodeId } })) || new Node({ nodeId: this.nodeId })

    this.merge(node)

    return await trx.getRepository(Node).save(this)
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
