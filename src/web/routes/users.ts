import { Request, Router } from 'express'
import { AppDataSource } from '#config/data-source'
import { User } from '#entity/user'
import _ from 'lodash'
import { HttpError } from '#web/helpers'

export const usersRouter = Router()
const db = AppDataSource

function updateUserData(user: User, body: Partial<User>) {
  const sensitiveFields = [
    'id',
    'email',
    'superUser',
    'createdAt',
    'updatedAt',
    'profilePhotoUrl',
    'identityDocument',
    'certificationDocument',
    'insurancePolicies',
    'adminLocations',
  ] as (keyof User)[]

  if (!_.isPlainObject(body)) {
    return
    throw new HttpError(400, 'Invalid data format')
  }

  const nonSensitiveFields = _.omit(body, sensitiveFields)

  return db.getRepository(User).merge(user, nonSensitiveFields as Partial<User>)
}

usersRouter.get('/users', async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    throw new HttpError(401, 'You are not logged in!')
  }

  if (!req.user?.isAdmin()) {
    return res.status(401).json({ error: 'Not an admin' })
  }

  const users = await User.findUsersThatCanBeAdministeredBy(db, req.user)

  res.json(users)
})

function parseIdParam(req: Request) {
  const idParam = req.params.id

  const id = Number(idParam)
  if (!isNaN(id)) {
    return id
  }

  throw new HttpError(400, `Invalid ID ${idParam}`)
}

usersRouter.get('/user/:id', async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    throw new HttpError(401, 'You are not logged in!')
  }

  const userId = parseIdParam(req)
  const user = await User.findOne(db, {
    where: {
      id: userId,
    },
    order: {
      updatedAt: 'DESC',
    },
    loadEagerRelations: true,
    relations: {
      certificationDocuments: true,
      insurancePolicies: true,
      identityDocuments: true,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (!req.user?.canAdminister(user)) {
    return res.status(401).json({ error: 'Not an admin' })
  }

  res.json(user)
})

usersRouter.get('/profile', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    throw new HttpError(401, 'You are not logged in!')
  }
  res.json(req.user)
})

usersRouter.put('/profile', async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    throw new HttpError(401, 'You are not logged in!')
  }

  try {
    const updatedUser = updateUserData(req.user, req.body)

    if (updatedUser) {
      await db.getRepository(User).save(updatedUser)
      return res.json(updatedUser)
    } else {
      return res.status(400).json({ message: 'Unable to parse submitted user data' })
    }
  } catch (err) {
    return res.status(400).json({ message: 'Unable to save data', err })
  }
})
