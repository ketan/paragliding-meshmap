import { AppDataSource } from '#config/data-source'
import { PartnerMessage } from '#entity/partner_message'
import { NextFunction, Request, Response, Router } from 'express'

const db = AppDataSource

export const partnerMessagesRouter = Router()

function requireSuperUser(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.superUser) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}

// GET /api/partner-messages
partnerMessagesRouter.get('/', requireSuperUser, async (_req: Request, res: Response) => {
  const repo = db.getRepository(PartnerMessage)
  const messages = await repo.find({ order: { createdAt: 'DESC' } })
  res.json(messages)
})

// POST /api/partner-messages
partnerMessagesRouter.post('/', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }
  const repo = db.getRepository(PartnerMessage)
  const partnerMessage = repo.create({ name, email, subject, message })
  await repo.save(partnerMessage)
  res.status(201).json({ success: true })
})
