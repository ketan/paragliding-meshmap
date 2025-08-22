import { mandatoryEnv } from '#helpers/utils'
import nodemailer from 'nodemailer'

const transport = {
  host: mandatoryEnv('SMTP_HOST'),
  port: Number(mandatoryEnv('SMTP_PORT')),
  secure: mandatoryEnv('SMTP_SSL') === 'true',
  logger: true,
  auth: {
    user: mandatoryEnv('SMTP_USER'),
    pass: mandatoryEnv('SMTP_PASSWORD'),
  },
}
export const mailTransport = nodemailer.createTransport(transport)
