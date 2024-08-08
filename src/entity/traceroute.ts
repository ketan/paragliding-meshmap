import { Column, Entity } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'

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
  from?: number

  @Column({ type: 'bigint' })
  to?: number

  @Column({ type: 'boolean', nullable: false })
  wantResponse: boolean

  constructor(opts: Partial<Traceroute> = {}) {
    super()
    _.assign(this, opts)
  }
}
