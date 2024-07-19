import { AppDataSource } from '#config/data-source'
import { errLog } from '#helpers/logger'
import { blobType } from '#helpers/migration-helper'
import { toBigInt } from '#helpers/utils'
import { Column, Entity } from 'typeorm'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { BaseType } from './base_type.js'

@Entity()
export default class ServiceEnvelope extends BaseType {
  @Column({ type: 'text' })
  mqttTopic: string

  @Column({ type: 'text' })
  channelId: string

  @Column({ type: 'bigint', nullable: true })
  gatewayId?: number

  @Column({ type: 'bigint', nullable: true })
  to?: number

  @Column({ type: 'bigint', nullable: true })
  from?: number

  @Column({ type: blobType() })
  protobuf: Buffer

  static fromPacket(mqttTopic: string, payload: Buffer, envelope: meshtastic.ServiceEnvelope) {
    const packet = envelope.packet!

    try {
      const entity = AppDataSource.manager.merge(ServiceEnvelope, new ServiceEnvelope(), {
        from: packet.from!,
        to: packet.to!,

        protobuf: payload,
        mqttTopic: mqttTopic,
        channelId: envelope.channelId!,
        gatewayId: toBigInt(envelope.gatewayId),
      })

      this.decodeLogger(`Decoded ${this.name}`, entity, envelope)
      return entity
    } catch (e) {
      errLog(`unable to service envelope`, { err: e, envelope })
    }
  }
}
