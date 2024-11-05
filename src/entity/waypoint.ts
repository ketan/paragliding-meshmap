import { Column, Entity } from 'typeorm'
import { BaseType } from './base_types.js'
import _ from 'lodash'

@Entity()
export default class Waypoint extends BaseType {
  @Column({ type: 'bigint' })
  from?: number

  @Column({ type: 'bigint' })
  to?: number

  @Column({ type: 'bigint' })
  waypointId: number

  @Column({ type: 'integer' })
  latitude?: number | null

  @Column({ type: 'integer' })
  longitude?: number | null

  @Column({ type: 'bigint', nullable: true })
  expire?: number

  @Column({ type: 'bigint', nullable: true })
  lockedTo?: number

  @Column({ type: 'text', nullable: true })
  name?: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'integer', nullable: true })
  icon?: number

  @Column({ type: 'integer' })
  channel?: number

  @Column({ type: 'bigint' })
  packetId?: number

  @Column({ type: 'text' })
  channelId: string

  @Column({ type: 'bigint', nullable: true })
  gatewayId?: number

  constructor(opts: Partial<Waypoint> = {}) {
    super()
    _.assign(this, opts)
  }
}
