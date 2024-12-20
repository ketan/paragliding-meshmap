import { Between, Column, DataSource, Entity, EntityManager } from 'typeorm'
import { BaseType } from './base_types.js'
import _ from 'lodash'
import { jsonType } from '#helpers/migration-helper'
import { DateTime, Duration } from 'luxon'

@Entity()
export default class Traceroute extends BaseType {
  @Column({ type: jsonType(), nullable: true })
  route: number[]

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

  static async forNode(db: DataSource | EntityManager, nodeId: number, since: Date, duration: Duration) {
    return await this.find(db, {
      select: ['route', 'to', 'createdAt'],
      where: {
        from: nodeId,
        createdAt: Between(since, DateTime.fromJSDate(since).plus(duration).toJSDate()),
      },
      order: {
        createdAt: 'asc',
      },
    })
  }
}
