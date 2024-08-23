import { Column, DataSource, Entity, EntityManager } from 'typeorm'
import { BaseType } from '#entity/base_type'
import { jsonType } from '#helpers/migration-helper'
import _ from 'lodash'

@Entity()
export class Configs extends BaseType {
  @Column({ type: 'text', nullable: false })
  key: string

  @Column({ type: jsonType(), nullable: false })
  value: unknown

  constructor(opts: Partial<Configs> = {}) {
    super()
    _.assign(this, opts)
  }

  static async allConfigs(trx: EntityManager | DataSource) {
    return await this.find(trx)
  }

  static async byName(trx: EntityManager | DataSource, key: string) {
    return await this.findOne(trx, { where: { key: key } })
  }

  async save(db: EntityManager | DataSource) {
    return await db.getRepository(Configs).save(this)
  }
}
