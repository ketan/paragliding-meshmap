import { Router } from 'express'
import { createDeviceProfile } from '#helpers/create-device-profile'
import { meshtastic } from '../../gen/meshtastic-protobufs.js'
import _ from 'lodash'

export const deviceConfigRouter = Router()

deviceConfigRouter.get('/device-config', async function (req, res) {
  const shortName = (req.query.shortName || '').toString().trim()
  const longName = (req.query.longName || '').toString().trim()

  const errors = []

  if (shortName.length < 2 || shortName.length > 4) {
    errors.push('Short name must be between 2 and 4 characters')
  }

  if (longName.length < 5 || longName.length > 12) {
    errors.push('Long name must be between 5 and 12 characters')
  }

  if (errors.length > 0) {
    return res.status(400).json({ messages: errors })
  }

  const dp = createDeviceProfile(shortName, longName)

  res.attachment(_.kebabCase(shortName) + '.cfg').send(meshtastic.DeviceProfile.encode(dp).finish())
})
