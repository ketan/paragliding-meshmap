import { AppDataSource } from '#config/data-source'
import { errLog } from '#helpers/logger'
import { parseProtobuf } from '#helpers/utils'
import { Column, Entity } from 'typeorm'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { BaseType } from './base_type.js'

@Entity()
export default class MapReport extends BaseType {
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'text' })
  longName: string

  @Column({ type: 'text' })
  shortName: string

  @Column({ type: 'integer' })
  role: number

  @Column({ type: 'integer' })
  hardwareModel: number

  @Column({ type: 'text' })
  firmwareVersion: string

  @Column({ type: 'integer', nullable: true })
  region?: number

  @Column({ type: 'integer', nullable: true })
  modemPreset?: number

  @Column({ type: 'boolean', nullable: true })
  hasDefaultChannel?: boolean

  @Column({ type: 'integer', nullable: true })
  latitude?: number

  @Column({ type: 'integer', nullable: true })
  longitude?: number

  @Column({ type: 'integer', nullable: true })
  altitude?: number

  @Column({ type: 'integer', nullable: true })
  positionPrecision?: number

  @Column({ type: 'integer', nullable: true })
  numOnlineLocalNodes?: number

  static fromPacket(envelope: meshtastic.ServiceEnvelope) {
    const packet = envelope.packet
    const payload = packet?.decoded?.payload

    if (payload) {
      return
    }

    const mr = parseProtobuf(() => meshtastic.MapReport.decode(payload))

    try {
      const entity = AppDataSource.manager.merge(MapReport, new MapReport(), {
        nodeId: packet.from!,
        longName: mr.longName!,
        shortName: mr.shortName!,
        role: mr.role!,
        hardwareModel: mr.hwModel!,
        firmwareVersion: mr.firmwareVersion!,
        region: mr.region!,
        modemPreset: mr.modemPreset!,
        hasDefaultChannel: mr.hasDefaultChannel!,
        latitude: mr.latitudeI!,
        longitude: mr.longitudeI!,
        altitude: mr.altitude!,
        positionPrecision: mr.positionPrecision!,
        numOnlineLocalNodes: mr.numOnlineLocalNodes!,
      })
      this.decodeLogger(`Decoded ${this.name}`, entity, mr, envelope)
      return entity
    } catch (e) {
      errLog(`unable to create map report`, { err: e, mr, envelope })
    }
  }
}
