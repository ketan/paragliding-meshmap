import { Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm'
import { Document } from '#entity/base_types'
import _ from 'lodash'
import { User } from '#entity/user'

@Entity()
export class IdentityDocument extends Document {
  @ManyToOne(() => User, (user) => user.identityDocuments, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
  @JoinColumn()
  user: Relation<User>

  constructor(opts: Partial<IdentityDocument> = {}) {
    super()
    _.assign(this, opts)
  }
}
