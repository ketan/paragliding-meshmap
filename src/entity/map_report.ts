import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { MapReport as MapReportProtobuf, ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { ignorableProtobufError } from '../helpers/utils.js'
import { BaseType } from './base_type.js'

@Entity()
export default class MapReport extends BaseType {
  @Column()
  nodeId: number

  @Column()
  longName: string

  @Column()
  shortName: string

  @Column()
  role: number

  @Column()
  hardwareModel: number

  @Column()
  firmwareVersion: string

  @Column()
  region?: number

  @Column()
  modemPreset?: number

  @Column()
  hasDefaultChannel?: boolean

  @Column()
  latitude?: number

  @Column()
  longitude?: number

  @Column()
  altitude?: number

  @Column()
  positionPrecision?: number

  @Column()
  numOnlineLocalNodes?: number

  static fromPacket(envelope: ServiceEnvelope) {
    try {
      const packet = envelope.packet!

      const mr = MapReportProtobuf.fromBinary((packet.payloadVariant.value as Data).payload)

      return AppDataSource.manager.merge(MapReport, new MapReport(), {
        nodeId: packet.from,
        longName: mr.longName,
        shortName: mr.shortName,
        role: mr.role,
        hardwareModel: mr.hwModel,
        firmwareVersion: mr.firmwareVersion,
        region: mr.region,
        modemPreset: mr.modemPreset,
        hasDefaultChannel: mr.hasDefaultChannel,
        latitude: mr.latitudeI,
        longitude: mr.longitudeI,
        altitude: mr.altitude,
        positionPrecision: mr.positionPrecision,
        numOnlineLocalNodes: mr.numOnlineLocalNodes,
      })
    } catch (e) {
      if (!ignorableProtobufError(e)) {
        this.logger({ err: e, envelope }, `Unable to parse map report`)
      }
    }
  }
}
