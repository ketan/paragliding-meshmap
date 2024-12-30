import { Column, Entity, Index } from 'typeorm'
import { BaseType } from '#entity/base_types'

@Entity()
export class Location extends BaseType {
  @Column({ nullable: false, unique: true, type: 'text' })
  @Index()
  location: string
}
