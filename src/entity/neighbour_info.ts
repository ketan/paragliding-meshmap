import { Column, Entity } from 'typeorm'
import { BaseType } from './base_type.js'
import { Neighbors } from './neighbors.js'
import _ from 'lodash'

@Entity()
export default class NeighbourInfo extends BaseType {
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'integer' })
  nodeBroadcastIntervalSecs: number

  @Column({ type: 'json' })
  neighbours: Neighbors[]

  constructor(opts: Partial<NeighbourInfo> = {}) {
    super()
    _.assign(this, opts)
  }
}
