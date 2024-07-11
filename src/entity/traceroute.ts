import { Data, RouteDiscovery } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '#config/data-source'
import { parseProtobuf, toBigInt } from '#helpers/utils'
import { BaseType } from './base_type.js'

@Entity()
export default class Traceroute extends BaseType {
  @Column({ type: 'json' })
  route: object

  @Column({ type: 'integer', nullable: true })
  channel?: number

  @Column({ type: 'text', nullable: true })
  channelId?: string

  @Column({ type: 'bigint', nullable: true })
  gatewayId?: number

  @Column({ type: 'bigint', nullable: true })
  packetId?: number

  @Column({ type: 'bigint' })
  from: number

  @Column({ type: 'bigint' })
  to: number

  @Column({ type: 'boolean', nullable: false })
  wantResponse: boolean

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    const rd = parseProtobuf(() => RouteDiscovery.fromBinary((packet.payloadVariant.value as Data).payload, { readUnknownFields: true }))

    try {
      return AppDataSource.manager.merge(Traceroute, new Traceroute(), {
        to: packet.to,
        from: packet.from,
        wantResponse: (packet.payloadVariant.value as Data).wantResponse,
        route: rd.route,
        channel: packet.channel,
        packetId: packet.id,
        channelId: envelope.channelId,
        gatewayId: toBigInt(envelope.gatewayId),
      })
    } catch (e) {
      this.logger(`Unable to parse traceroute`, { err: e, rd, envelope })
    }
  }
}
