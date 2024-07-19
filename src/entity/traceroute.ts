import { Column, Entity } from 'typeorm'
import { AppDataSource } from '#config/data-source'
import { parseProtobuf, toBigInt } from '#helpers/utils'
import { BaseType } from './base_type.js'
import { errLog } from '#helpers/logger'
import { meshtastic } from '../gen/meshtastic-protobufs.js'

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

  static fromPacket(envelope: meshtastic.ServiceEnvelope) {
    const packet = envelope.packet
    const payload = packet?.decoded?.payload

    if (!payload) {
      return
    }

    const rd = parseProtobuf(() => meshtastic.RouteDiscovery.decode(payload))

    try {
      const entity = AppDataSource.manager.merge(Traceroute, new Traceroute(), {
        to: packet.to!,
        from: packet.from!,
        wantResponse: packet!.decoded!.wantResponse!,
        route: rd.route,
        channel: packet.channel!,
        packetId: packet.id!,
        channelId: envelope.channelId!,
        gatewayId: toBigInt(envelope.gatewayId),
      })
      this.decodeLogger(`Decoded ${this.name}`, entity, rd, envelope)
      return entity
    } catch (e) {
      errLog(`unable to parse traceroute`, { err: e, rd, envelope })
    }
  }
}
