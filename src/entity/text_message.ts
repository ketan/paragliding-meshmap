import { AppDataSource } from '#config/data-source'
import { errLog } from '#helpers/logger'
import { toBigInt } from '#helpers/utils'
import { Column, Entity } from 'typeorm'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { BaseType } from './base_type.js'

@Entity()
export default class TextMessage extends BaseType {
  @Column({ type: 'bigint' })
  to: number

  @Column({ type: 'bigint' })
  from: number

  @Column({ type: 'integer', nullable: true })
  channel?: number

  @Column({ type: 'bigint', nullable: true })
  packetId?: number

  @Column({ type: 'text', nullable: true })
  channelId?: string

  @Column({ type: 'bigint', nullable: true })
  gatewayId?: number

  @Column({ type: 'text' })
  text: string

  @Column({ type: 'bigint', nullable: true })
  rxTime?: number

  @Column({ type: 'double precision', nullable: true })
  rxSnr?: number

  @Column({ type: 'integer', nullable: true })
  rxRssi?: number

  @Column({ type: 'integer', nullable: true })
  hopLimit?: number

  @Column({ type: 'boolean', nullable: true })
  wantResponse?: boolean | null

  static fromPacket(envelope: meshtastic.ServiceEnvelope) {
    const packet = envelope.packet!

    try {
      const entity = AppDataSource.manager.merge(TextMessage, new TextMessage(), {
        channelId: envelope.channelId!,
        channel: packet.channel!,
        from: packet.from!,
        to: packet.to!,
        packetId: packet.id!,
        text: packet!.decoded!.payload!.toString(),
        wantResponse: packet.wantAck,
        gatewayId: toBigInt(envelope.gatewayId),
        hopLimit: packet.hopLimit!,
        rxRssi: packet.rxRssi!,
        rxSnr: packet.rxSnr!,
        rxTime: packet.rxTime!,
      })
      this.decodeLogger(`Decoded ${this.name}`, entity, envelope)
      return entity
    } catch (e) {
      errLog(`unable to parse text message`, { err: e, envelope })
    }
  }
}
