import { BeforeInsert, Column, Entity } from 'typeorm'
import { BaseType } from '#entity/base_types'
import { sendEmail } from '#helpers/email-job'
import { mandatoryEnv } from '#helpers/utils'
import _ from 'lodash'

@Entity()
export class PartnerMessage extends BaseType {
  @Column({ type: 'text', nullable: false })
  name: string

  @Column({ type: 'text', nullable: false })
  email: string

  @Column({ type: 'text', nullable: false })
  subject: string

  @Column({ type: 'text', nullable: false })
  message: string

  constructor(opts: Partial<PartnerMessage> = {}) {
    super()
    _.assign(this, opts)
  }

  @BeforeInsert()
  async sendNotification() {
    await sendEmail(this.emailParams())
  }

  emailParams() {
    return {
      from: mandatoryEnv('SMTP_SENDER_FROM'),
      to: mandatoryEnv('SMTP_SENDER_FROM'),
      subject: '[BIRCOM] Partner request email',
      text: this.composeEmail(),
    }
  }

  composeEmail() {
    return PartnerMessage.trimEmailWhitespace(`
        Hi Bircom Support,

        There is a new partner enquiry from ${this.name} (${this.email}):

        Subject: ${this.subject}
        Message follows: ${this.message}
    `)
  }

  static trimEmailWhitespace(email: string): string {
    // Trim leading/trailing whitespace from each line, but preserve line breaks
    return email
      .split('\n')
      .map((line) => line.trim())
      .join('\n')
      .trim()
  }
}
