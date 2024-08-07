import { Column, DataSource, Entity, EntityManager, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_type.js'
import _ from 'lodash'
import { jsonType } from '#helpers/migration-helper'

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

  static async forNode(db: DataSource | EntityManager, nodeId: number, since: Date) {
    return await this.find(db, {
      select: ['route', 'to', 'createdAt'],
      where: {
        from: nodeId,
        createdAt: MoreThanOrEqual(since),
      },
      order: {
        createdAt: 'asc',
      },
    })
  }
}
