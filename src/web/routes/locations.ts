import { Router } from 'express'
import { AppDataSource } from '#config/data-source'
import { Location } from '#entity/location'
import { isProduction } from '#web/helpers'

export const locationsRouter = Router()

locationsRouter.get('/locations', async (_req, res) => {
  try {
    const locationRepository = AppDataSource.getRepository(Location)
    const locations = await locationRepository.find()

    if (isProduction) {
      res.header('cache-control', 'public,max-age=600')
    }

    res.json(locations)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error })
  }
})
