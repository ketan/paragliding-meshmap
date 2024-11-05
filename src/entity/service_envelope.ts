import { blobType } from '#helpers/migration-helper'
import { Column, Entity } from 'typeorm'
import { BaseType } from './base_types.js'
import _ from 'lodash'

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

  constructor(opts: Partial<ServiceEnvelope> = {}) {
    super()
    _.assign(this, opts)
  }
}
