import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { BaseType } from './base_type.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { toBigInt } from '../helpers/utils.js'

@Entity()
export default class TextMessage extends BaseType {
  @Column()
  to: number

  @Column()
  from: number

  @Column()
  channel: number

  @Column()
  packetId: number

  @Column()
  channelId: string

  @Column()
  gatewayId?: number

  @Column()
  text: string

  @Column()
  rxTime?: number

  @Column()
  rxSnr?: number

  @Column()
  rxRssi?: number

  @Column()
  hopLimit?: number

  @Column()
  wantResponse: boolean

  static fromPacket(envelope: ServiceEnvelope): TextMessage {
    const packet = envelope.packet!

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
  }
}
