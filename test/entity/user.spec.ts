import { AppDataSource } from '#config/data-source'
import { User } from '#entity/user'
import { expect } from 'chai'

const db = AppDataSource

describe('User entity', () => {
  it('should return all users for superUser', async () => {
    const superUser = new User({ superUser: true, email: 'superUser@example.com' })
    await db.getRepository(User).save(superUser)

    const user1 = new User({ email: 'user1@example.com' })
    const user2 = new User({ email: 'user2@example.com' })
    await db.getRepository(User).save([user1, user2])

    const result = await User.findUsersThatCanBeAdministeredBy(db, superUser)
    expect(result.map((u) => u.email)).to.have.members([superUser.email, user1.email, user2.email])
    expect(result).to.have.length(3)
  })

  it('should return users with matching flight locations for admin user', async () => {
    const adminUser = new User({ adminLocations: ['location1'], email: 'location1-admin@example.com' })
    await db.getRepository(User).save(adminUser)

    const user1 = new User({ email: 'location1-user1@example.com', flightLocations: ['location1'] })
    const user2 = new User({ email: 'location2-user1@example.com', flightLocations: ['location2'] })
    await db.getRepository(User).save([user1, user2])

    const result = await User.findUsersThatCanBeAdministeredBy(db, adminUser)
    expect(result).to.have.length(1)
    expect(result[0].email).to.eq('location1-user1@example.com')
  })

  it('should throw error for non-admin user', async () => {
    const nonAdminUser = new User({ superUser: false, adminLocations: [], email: 'nobody@example.com' })
    await db.getRepository(User).save(nonAdminUser)

    const user1 = new User({ email: 'user1@example.com' })
    const user2 = new User({ email: 'user2@example.com' })
    await db.getRepository(User).save([user1, user2])

    await expect(User.findUsersThatCanBeAdministeredBy(db, nonAdminUser)).to.be.rejectedWith('User is not an admin user')
  })
})
