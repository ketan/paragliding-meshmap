import debug from 'debug'
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

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
}
