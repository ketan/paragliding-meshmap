import { pgBoss } from '#config/data-source'
import { mailTransport } from '#web/mailer'
import Mail from 'nodemailer/lib/mailer/index.js'

export async function emailJobProcessor() {
  await pgBoss.createQueue('email', {
    retryLimit: 3,
    retryBackoff: true,
    retryDelay: 30,
    name: 'email',
  })

  pgBoss.work<Mail.Options>(
    'email',
    {
      batchSize: 10,
      pollingIntervalSeconds: 10,
    },
    async (jobs) => {
      return await Promise.all(
        jobs.map(async (job) => {
          await mailTransport.sendMail(job.data)
        })
      )
    }
  )
}

export async function sendEmail(email: Mail.Options) {
  await pgBoss.send('email', email)
}
