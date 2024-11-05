import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm'
import { Document } from '#entity/base_types'
import { User } from '#entity/user'
import _ from 'lodash'

@Entity()
export class InsurancePolicyDocument extends Document {
  @Column({ nullable: false, type: 'date' })
  validityStart: Date

  @Column({ nullable: false, type: 'date' })
  validityEnd: Date

  @Column({ nullable: false, type: 'text' })
  provider: string

  @Column({ nullable: false, type: 'text' })
  policyNumber: string

  @Column({ nullable: false, type: 'text' })
  contactPhone: string

  @ManyToOne(() => User, (user) => user.insurancePolicies, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  @JoinColumn()
  user: Relation<User>

  constructor(opts: Partial<InsurancePolicyDocument> = {}) {
    super()
    _.assign(this, opts)
  }
}
