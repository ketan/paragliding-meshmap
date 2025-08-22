import { PartnerMessage } from '#entity/partner_message'
import { expect } from 'chai'

describe('PartnerMessage', () => {
  it('should call emailSender with the correct payload', async () => {
    const msg = new PartnerMessage({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Hello,\nThis is a test.',
    })

    const payload = msg.emailParams()
    expect(payload).to.include({
      from: 'no-reply@example.com',
      to: 'no-reply@example.com',
      subject: '[BIRCOM] Partner request email',
    })
    expect(payload.text).to.include('Hi Bircom Support,')
    expect(payload.text).to.include('There is a new partner enquiry from John Doe (john@example.com):')
    expect(payload.text).to.include('Subject: Test Subject')
    expect(payload.text).to.include('Message follows:')
    expect(payload.text).to.include('Hello,\nThis is a test.')
  })
})
