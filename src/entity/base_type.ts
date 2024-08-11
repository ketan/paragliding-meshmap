import debug from 'debug'
import { DateTime, Duration } from 'luxon'
import {
  CreateDateColumn,
  DataSource,
  Entity,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { dateTimeType } from '#helpers/migration-helper'

@Entity()
export abstract class BaseTypeWithoutPrimaryKey {
  static logger = debug('meshmap:model')
  static decodeLogger = debug('meshmap:decode')

  @UpdateDateColumn({ ...dateTimeType() })
  @Index()
  updatedAt: Date
  @CreateDateColumn({ ...dateTimeType() })
  @Index()
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

    return await query.execute()
  }

  static async find<T extends BaseTypeWithoutPrimaryKey>(
    this: {
      new (): T
    } & typeof BaseTypeWithoutPrimaryKey,
    db: DataSource | EntityManager,
    options?: FindManyOptions<T>
  ) {
    return await db.getRepository<T>(this).find(options)
  }

  static async findOne<T extends BaseTypeWithoutPrimaryKey>(
    this: {
      new (): T
    } & typeof BaseTypeWithoutPrimaryKey,
    db: DataSource | EntityManager,
    options: FindOneOptions<T>
  ) {
    return await db.getRepository<T>(this).findOne(options)
  }
}

@Entity()
export abstract class BaseType extends BaseTypeWithoutPrimaryKey {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number
}
