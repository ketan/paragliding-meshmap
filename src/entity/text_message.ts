import { Column, Entity } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'

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

  constructor(opts: Partial<TextMessage> = {}) {
    super()
    _.assign(this, opts)
  }
}
