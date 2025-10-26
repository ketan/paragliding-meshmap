import { dateTimeType, jsonType } from '#helpers/migration-helper'
import { DateTime, Duration } from 'luxon'
import { BeforeInsert, BeforeUpdate, Column, DataSource, Entity, EntityManager, Index } from 'typeorm'
import { BaseType, BaseTypeWithoutPrimaryKey } from './base_types.js'
import DeviceMetric from './device_metric.js'
import EnvironmentMetric from './environment_metric.js'
import MapReport from './map_report.js'
import type { MessageIn, MessageOut, Neighbors, NodeActivity } from './neighbors.js'
import NeighbourInfo from './neighbour_info.js'
import Position from './position.js'
import TextMessage from './text_message.js'
import _ from 'lodash'
import { BROADCAST_ADDR } from '#helpers/utils'
import { v5 as uuidv5 } from 'uuid'
import { Configs } from '#entity/configs'
import { AppDataSource } from '#config/data-source'
import { flyXCPositionPayload, sendToFlyXCJob } from '#helpers/fly-xc'
import { sendToTelegram } from '#helpers/telegram'
import { pureTrackPositionPayload, sendToPureTrackIOJob } from '#helpers/pure-track'
import { NodeFilter } from '#helpers/cli'
import { filterLog } from '#helpers/logger'

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
  aboveGroundLevel?: number | null
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
  @Column({ type: 'text', nullable: true })
  activity?: NodeActivity

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
      Node.flyXCTokenNamespace = await Configs.flyXCTokenNamespace(AppDataSource)
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

  static async updatePosition(trx: EntityManager, position: Position, nodeFilter: NodeFilter) {
    const repository = trx.getRepository(Node)
    const node = (await repository.findOne({ where: { nodeId: position.from } })) || new Node({ nodeId: position.from })

    node.merge({
      nodeId: position.from,
      positionUpdatedAt: new Date(),
      latitude: BaseType.sanitizeNumber(position.latitude), // unlikely that lat/lon/alt are exactly `0`
      longitude: BaseType.sanitizeNumber(position.longitude),
      altitude: BaseType.sanitizeNumber(position.altitude),
      aboveGroundLevel: BaseType.sanitizeNumber(position.aboveGroundLevel),

      positionPdop: BaseType.sanitizeNumber(position.pdop),
      positionTimestamp: _([position.time, position.timestamp]).compact().min(),
      positionPrecisionBits: BaseType.sanitizeNumber(position.precisionBits),
      satsInView: BaseType.sanitizeNumber(position.satsInView),
      activity: Node.determineActivity(position),
    })
    await this.maybeForwardCoordinates(node, position, nodeFilter)
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

static determineActivity(position: Position): NodeActivity {
  // Return "unknown" if any required parameter is null or undefined
  if (
    position.aboveGroundLevel == null ||
    position.altitude == null ||
  ) {
    return;
  }

  // Flying: AGL > 50m and speed > 5 km/h
  if (position.aboveGroundLevel > 50 && position.groundSpeed > 5) {
    return 'fly';
  }

  // Hiking: AGL < 50m, speed between 0 and 5 km/h
  if (position.aboveGroundLevel < 50 && position.groundSpeed > 0 && position.groundSpeed < 5) {
    return 'hike';
  }

  // Stationary at high altitude, low AGL (e.g., landed on a mountain)
  if (position.altitude > 1600 && position.aboveGroundLevel < 50 && position.groundSpeed === 0) {
    return 'concern';
  }

  // Default: unknown
  return;
}

  async createOrUpdate(trx: EntityManager) {
    const repository = trx.getRepository(Node)
    const nodeFromDB = (await repository.findOne({ where: { nodeId: this.nodeId } })) || new Node({ nodeId: this.nodeId })

    nodeFromDB.merge(this)
    this.merge(nodeFromDB)

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

  async outboundMessage(tm: Pick<TextMessage, 'from' | 'text' | 'to' | 'createdAt'>, purgeOlderThan: Duration, nodeFilter: NodeFilter) {
    const now = DateTime.now()
    this.outbox ||= []
    this.outbox.unshift({ to: tm.to, text: tm.text, time: tm.createdAt.toISOString() })
    if (tm.to === BROADCAST_ADDR) {
      await this.forwardOutboundMessageFromMe(tm, nodeFilter)
    }
    if (purgeOlderThan) {
      this.outbox = this.outbox.filter((msg) => {
        const messageAge = now.diff(DateTime.fromISO(msg.time))
        return messageAge < purgeOlderThan
      })
    }
  }

  matchesNodeFilter(filter?: NodeFilter | null) {
    if (!filter) {
      return false
    }

    if (filter.includes(this.nodeId)) {
      return this.nodeId
    }

    for (const item of filter) {
      if (typeof item === 'string') {
        if (this.shortName?.toLowerCase() === item.toLowerCase() || this.longName?.toLowerCase() === item.toLowerCase()) {
          return item
        }
      } else if (item instanceof RegExp) {
        const regex = new RegExp(item, 'i')
        if (regex.test(this.shortName || '') || regex.test(this.longName || '')) {
          return item
        }
      }
    }

    return false
  }

  describe() {
    return `nodeId: ${this.nodeId}/!${this.nodeId?.toString(16)}, shortName: ${this.shortName || 'UNKNOWN'}, longName: ${this.longName || 'UNKNOWN'}`
  }

  private static async maybeForwardCoordinates(node: Node, position: Position, nodeFilter: NodeFilter) {
    const matchedFilter = node.matchesNodeFilter(nodeFilter)
    if (matchedFilter) {
      filterLog(`Filtered`, node.describe(), `because it matched`, matchedFilter)
      return
    }
    const flyXCPayLoad = flyXCPositionPayload(node, position)
    if (flyXCPayLoad) {
      await sendToFlyXCJob(flyXCPayLoad)
    }
    const pureTrackPayload = pureTrackPositionPayload(node, position)
    if (pureTrackPayload) {
      await sendToPureTrackIOJob(pureTrackPayload)
    }
  }

  private async forwardOutboundMessageFromMe(tm: Pick<TextMessage, 'from' | 'text' | 'to' | 'createdAt'>, nodeFilter: NodeFilter) {
    const matchedFilter = this.matchesNodeFilter(nodeFilter)
    if (matchedFilter) {
      filterLog(`Filtered`, this.describe(), `because it matched`, matchedFilter)
      return
    }

    const data = {
      type: 'message',
      user_id: this.flyXCToken,
      time: tm.createdAt.getTime(),
      message: tm.text,
    }
    await sendToFlyXCJob(data)
    await sendToTelegram(this, tm.text)
  }

  static async findOrBuild(trx: EntityManager, nodeId: number) {
    return (await trx.getRepository(Node).findOne({ where: { nodeId } })) || new Node({ nodeId })
  }
}
