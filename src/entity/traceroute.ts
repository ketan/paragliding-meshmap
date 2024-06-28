import { Data, RouteDiscovery } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { ignorableProtobufError, toBigInt } from '../helpers/utils.js'
import { BaseType } from './base_type.js'

@Entity()
export default class Traceroute extends BaseType {
  @Column({type: 'json'})
  route: object

  @Column()
  channel?: number

  @Column()
  channelId?: string

  @Column()
  gatewayId?: number

  @Column()
  packetId?: number

  @Column()
  from: number

  @Column()
  to: number

  @Column()
  wantResponse: boolean

  static fromPacket(envelope: ServiceEnvelope) {
    try {
      const packet = envelope.packet!

      const rd = RouteDiscovery.fromBinary((packet.payloadVariant.value as Data).payload)

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
      if (!ignorableProtobufError(e)) {
        this.logger({ err: e, envelope }, `Unable to parse traceroute`)
      }
    }
  }
}
