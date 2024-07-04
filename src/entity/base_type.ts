import debug from 'debug'
import { DateTime, Duration } from 'luxon'
import { CreateDateColumn, Entity, EntityManager, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export abstract class BaseType {
  static logger = debug('meshmap:model')

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @UpdateDateColumn()
  updatedAt: Date

  @CreateDateColumn()
  createdAt: Date

  static sanitizeNumber(num: number | undefined) {
    if (num !== 0) {
      return num
    }
    return undefined
  }

  static async purge(purgeSecondsAgo: number, trx: EntityManager) {
    const purgeCutoff = DateTime.now()
      .toLocal()
      .minus(Duration.fromObject({ second: purgeSecondsAgo }))

    const query = trx.createQueryBuilder().delete().from(this.name).where('updated_at <= :updated_at', {
      updated_at: purgeCutoff.toISO(),
    })

    const result = await query.execute()

    this.logger(`Purged ${result.affected} rows from ${this.name} table which were updated earlier than ${purgeCutoff.toRelative()}`)
  }
}
