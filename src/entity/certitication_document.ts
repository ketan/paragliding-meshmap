import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm'
import { Document } from '#entity/base_types'
import { User } from '#entity/user'
import _ from 'lodash'

@Entity()
export class CertificationDocument extends Document {
  @Column({ nullable: false, type: 'text' })
  issuingOrganization: string

  @Column({ nullable: false, type: 'text' })
  certificateNumber: string

  @ManyToOne(() => User, (user) => user.certificationDocuments, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  @JoinColumn()
  user: Relation<User>

  constructor(opts: Partial<CertificationDocument> = {}) {
    super()
    _.assign(this, opts)
  }
}
