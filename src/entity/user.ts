import { Column, DataSource, Entity, EntityManager, Index, OneToMany } from 'typeorm'
import { BaseType } from '#entity/base_types'
import { IdentityDocument } from '#entity/identity_document'
import { CertificationDocument } from '#entity/certitication_document'
import { InsurancePolicyDocument } from '#entity/insurance_policy_document'
import _ from 'lodash'
import { jsonType } from '#helpers/migration-helper'

@Entity()
export class User extends BaseType {
  @Column({ nullable: true, type: 'text' })
  displayName: string

  @Column({ nullable: false, unique: true, type: 'text' })
  @Index()
  email: string

  @Column({ nullable: true, unique: true, type: 'text' })
  profilePhotoUrl: string

  @Column({ nullable: true, type: 'text' })
  primaryPhone: string

  @Column({ nullable: true, type: 'text' })
  secondaryPhone: string

  @Column({ nullable: true, type: 'date' })
  dob: Date

  @Column({ nullable: true, type: 'text' })
  nationality: string

  @Column({ nullable: true, type: 'text' })
  embassyPhone: string

  @OneToMany(() => IdentityDocument, (document) => document.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  identityDocuments: IdentityDocument[]

  @OneToMany(() => CertificationDocument, (document) => document.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  certificationDocuments: CertificationDocument[]

  @Column({ nullable: true, type: 'text' })
  paraglider1Manufacturer: string

  @Column({ nullable: true, type: 'text' })
  paraglider1Model: string

  @Column({ nullable: true, type: 'text' })
  paraglider1PrimaryColor: string

  @Column({ nullable: true, type: 'text' })
  paraglider1SecondaryColor: string

  @Column({ nullable: true, type: 'text' })
  paraglider2Manufacturer: string

  @Column({ nullable: true, type: 'text' })
  paraglider2Model: string

  @Column({ nullable: true, type: 'text' })
  paraglider2PrimaryColor: string

  @Column({ nullable: true, type: 'text' })
  paraglider2SecondaryColor: string

  @Column({ nullable: true, type: 'text' })
  address1: string

  @Column({ nullable: true, type: 'text' })
  address2: string

  @Column({ nullable: true, type: 'text' })
  city: string

  @Column({ nullable: true, type: 'text' })
  state: string

  @Column({ nullable: true, type: 'text' })
  postalCode: string

  @Column({ nullable: true, type: 'text' })
  country: string

  @Column({ nullable: true, type: 'text' })
  primaryEmergencyContactName: string

  @Column({ nullable: true, type: 'text' })
  primaryEmergencyContactPhone: string

  @Column({ nullable: true, type: 'text' })
  secondaryEmergencyContactName: string

  @Column({ nullable: true, type: 'text' })
  secondaryEmergencyContactPhone: string

  @OneToMany(() => InsurancePolicyDocument, (document) => document.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  insurancePolicies: InsurancePolicyDocument[]

  @Column({ nullable: true, type: 'text' })
  medicalConditions: string

  @Column({ nullable: true, type: 'text' })
  medications: string

  @Column({ nullable: true, type: 'text' })
  allergies: string

  @Column({ nullable: true, type: 'text' })
  bloodGroup: string

  @Column({ type: 'boolean', nullable: false, default: false })
  superUser: boolean

  @Column({ type: jsonType(), nullable: true })
  adminLocations: string[]

  @Column({ type: jsonType(), nullable: true })
  flightLocations: string[]

  @Column({ nullable: true, type: 'text' })
  trackerUrls: string

  constructor(opts: Partial<User> = {}) {
    super()
    _.assign(this, opts)
  }

  static async findUsersThatCanBeAdministeredBy(db: DataSource | EntityManager, adminUser: User): Promise<User[]> {
    if (adminUser.superUser) {
      return await db.getRepository(User).find({
        order: {
          updatedAt: 'DESC',
        },
        loadEagerRelations: true,
      })
    } else if (adminUser.adminLocations && adminUser.adminLocations.length > 0) {
      return db
        .getRepository(User)
        .createQueryBuilder('user')
        .where(
          'EXISTS (SELECT 1 FROM jsonb_array_elements_text("user"."flight_locations") AS location WHERE location IN (:...locations))',
          { locations: adminUser.adminLocations }
        )
        .orderBy('user.updatedAt', 'DESC')
        .getMany()
    }
    throw 'User is not an admin user'
  }

  canSeeDocument(document: IdentityDocument | CertificationDocument | IdentityDocument): boolean {
    const user = document.user

    return this.canAdminister(user)
  }

  canAdminister(user: User): boolean {
    if (this.superUser) {
      return true
    }
    if (user.id === this.id) {
      return true
    }
    if (this.adminLocations && this.adminLocations.length > 0) {
      return _.intersection(this.adminLocations, user.flightLocations).length > 0
    }
    return false
  }

  isAdmin() {
    return (this.adminLocations && this.adminLocations.length > 0) || this.superUser
  }
}
