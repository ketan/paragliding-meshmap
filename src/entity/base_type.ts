import debug from 'debug'
import { DateTime, Duration } from 'luxon'
import { CreateDateColumn, Entity, EntityManager, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export abstract class BaseTypeWithoutPrimaryKey {
  static logger = debug('meshmap:model')
  static decodeLogger = debug('meshmap:decode')
  static purgeEvery: Duration
  static purgeDataOlderThan: Duration
  @UpdateDateColumn()
  updatedAt: Date
  @CreateDateColumn()
  createdAt: Date

  static sanitizeNumber(num: number | undefined | null) {
    if (num === undefined || num === null) {
      return undefined
    }
    if (num !== 0) {
      return num
    }
    return undefined
  }

  static async purge(durationAgo: Duration, trx: EntityManager) {
    const purgeCutoff = DateTime.now().toLocal().minus(durationAgo)

    const query = trx.createQueryBuilder().delete().from(this.name).where('updated_at <= :updated_at', {
      updated_at: purgeCutoff.toISO(),
    })

    const result = await query.execute()

    this.logger(`Purged ${result.affected} rows from ${this.name} table which were updated earlier than ${purgeCutoff.toRelative()}`)
  }
}

@Entity()
export abstract class BaseType extends BaseTypeWithoutPrimaryKey {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number
}
