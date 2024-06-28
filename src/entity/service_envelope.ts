import { ServiceEnvelope as ServiceEnvelopeProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { BaseType } from './base_type.js'
import { toBigInt } from '../helpers/utils.js'

@Entity()
export default class ServiceEnvelope extends BaseType {
  @Column()
  mqttTopic: string

  @Column()
  channelId: string

  @Column()
  gatewayId?: number

  @Column()
  to: number

  @Column()
  from: number

  @Column()
  protobuf: Buffer

  static fromPacket(mqttTopic: string, payload: Buffer, envelope: ServiceEnvelopeProtobuf): ServiceEnvelope {
    const packet = envelope.packet!

    return AppDataSource.manager.merge(ServiceEnvelope, new ServiceEnvelope(), {
      from: packet.from,
      to: packet.to,

      protobuf: payload,
      mqttTopic: mqttTopic,
      channelId: envelope.channelId,
      gatewayId: toBigInt(envelope.gatewayId),
    })
  }
}
