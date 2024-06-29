import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { toBigInt } from '../helpers/utils.js'
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

  @Column({ type: 'double', nullable: true })
  rxSnr?: number

  @Column({ type: 'integer', nullable: true })
  rxRssi?: number

  @Column({ type: 'integer', nullable: true })
  hopLimit?: number

  @Column({ type: 'boolean' })
  wantResponse: boolean

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    try {
      return AppDataSource.manager.merge(TextMessage, new TextMessage(), {
        channelId: envelope.channelId,
        channel: packet.channel,
        from: packet.from,
        to: packet.to,
        packetId: packet.id,
        text: (packet.payloadVariant.value as Data).payload.toString(),
        wantResponse: packet.wantAck,
        gatewayId: toBigInt(envelope.gatewayId),
        hopLimit: packet.hopLimit,
        rxRssi: packet.rxRssi,
        rxSnr: packet.rxSnr,
        rxTime: packet.rxTime,
      })
    } catch (e) {
      this.logger(`unable to parse text message`, { err: e, envelope })
    }
  }
}
