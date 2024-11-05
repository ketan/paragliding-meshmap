import { Column, DataSource, Entity, EntityManager, Index, MoreThanOrEqual } from 'typeorm'
import { BaseType } from './base_types.js'
import { Neighbors } from './neighbors.js'
import _ from 'lodash'
import { jsonType } from '#helpers/migration-helper'

@Entity()
export default class NeighbourInfo extends BaseType {
  @Index()
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'integer' })
  nodeBroadcastIntervalSecs: number

  @Column({ type: jsonType(), nullable: true })
  neighbours: Neighbors[]

  constructor(opts: Partial<NeighbourInfo> = {}) {
    super()
    _.assign(this, opts)
  }

  static async forNode(db: DataSource | EntityManager, nodeId: number, since: Date) {
    return await this.find(db, {
      select: ['neighbours', 'createdAt'],
      where: {
        nodeId: nodeId,
        createdAt: MoreThanOrEqual(since),
      },
      order: {
        createdAt: 'asc',
      },
    })
  }
}
