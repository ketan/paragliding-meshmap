import { Column, DataSource, Entity, EntityManager, Index } from 'typeorm'
import { BaseType } from '#entity/base_type'
import { jsonType } from '#helpers/migration-helper'
import _ from 'lodash'
import { randomUUID } from 'node:crypto'

@Entity()
export class Configs extends BaseType {
  @Index()
  @Column({ type: 'text', nullable: false })
  key: string

  @Column({ type: jsonType(), nullable: false })
  value: unknown

  constructor(opts: Partial<Configs> = {}) {
    super()
    _.assign(this, opts)
  }

  private static async byName(trx: EntityManager | DataSource, key: string) {
    return await this.findOne(trx, { where: { key: key } })
  }

  async save(db: EntityManager | DataSource) {
    return await db.getRepository(Configs).save(this)
  }

  static async flyXCTokenNamespace(db: DataSource | EntityManager) {
    const flyXCTokenNamespace = await this.byName(db, 'flyXCTokenNamespace')

    if (flyXCTokenNamespace) {
      return flyXCTokenNamespace
    }

    return await new Configs({
      key: 'flyXCTokenNamespace',
      value: randomUUID(),
    }).save(db)
  }

  static async mqttClientId(db: DataSource | EntityManager) {
    const clientIdConfig = await Configs.byName(db, 'mqttClientId')
    if (clientIdConfig) {
      return clientIdConfig
    }

    return await new Configs({
      key: 'mqttClientId',
      value: 'paragliding-meshmap-' + Math.random().toString(16).substring(2, 8),
    }).save(db)
  }
}
