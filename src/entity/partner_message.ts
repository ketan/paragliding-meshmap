import { BeforeInsert, Column, Entity } from 'typeorm'
import { BaseType } from '#entity/base_types'
import { sendEmail } from '#helpers/email-job'
import { mandatoryEnv } from '#helpers/utils'

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

  @BeforeInsert()
  async sendEmail() {
    const payload = { from: mandatoryEnv('SMTP_SENDER_FROM'), to: this.email, subject: this.subject, text: this.composeEmail() }
    await sendEmail(payload)
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
