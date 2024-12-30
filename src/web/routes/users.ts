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

  if (typeof body !== 'object') {
    return
  }

  const nonSensitiveFields = _.omit(body, sensitiveFields)

  return db.getRepository(User).merge(user, nonSensitiveFields as Partial<User>)
}

usersRouter.get('/users', async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    throw new HttpError(401, 'You are not logged in!')
  }

  if (!req.user?.superUser) {
    return res.status(401).json({ error: 'Not an admin' })
  }

  const users = await User.find(db, {
    order: {
      updatedAt: 'DESC',
    },
    loadEagerRelations: true,
  })
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

  if (!req.user?.superUser) {
    return res.status(401).json({ error: 'Not an admin' })
  }

  const userId = parseIdParam(req)

  const users = await User.findOne(db, {
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
  res.json(users)
})

usersRouter.get('/profile', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    throw new HttpError(401, 'You are not logged in!')
  }
  res.json(_.omitBy(req.user, _.isNil))
})

usersRouter.put('/profile', async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    throw new HttpError(401, 'You are not logged in!')
  }

  const user = await db.getRepository(User).findOne({
    where: { id: req.user.id },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  try {
    const updatedUser = updateUserData(user, req.body)

    if (updatedUser) {
      await db.getRepository(User).save(updatedUser)
      res.json(updatedUser)
    } else {
      return res.status(400).json({ message: 'Unable to parse submitted user data' })
    }
  } catch (err) {
    return res.status(400).json({ message: 'Unable to save data', err })
  }
})
