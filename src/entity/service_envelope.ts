import { ServiceEnvelope as ServiceEnvelopeProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { toBigInt } from '../helpers/utils.js'
import { BaseType } from './base_type.js'
import { blobType } from '../helpers/migration-helper.js'

@Entity()
export default class ServiceEnvelope extends BaseType {
  @Column({ type: 'text' })
  mqttTopic: string

  @Column({ type: 'text' })
  channelId: string

  @Column({ type: 'bigint', nullable: true })
  gatewayId?: number

  @Column({ type: 'bigint' })
  to: number

  @Column({ type: 'bigint' })
  from: number

  @Column({ type: blobType() })
  protobuf: Buffer

  static fromPacket(mqttTopic: string, payload: Buffer, envelope: ServiceEnvelopeProtobuf) {
    const packet = envelope.packet!

    try {
      return AppDataSource.manager.merge(ServiceEnvelope, new ServiceEnvelope(), {
        from: packet.from,
        to: packet.to,

        protobuf: payload,
        mqttTopic: mqttTopic,
        channelId: envelope.channelId,
        gatewayId: toBigInt(envelope.gatewayId),
      })
    } catch (e) {
      this.logger(`unable to service envelope`, { err: e, envelope })
    }
  }
}
