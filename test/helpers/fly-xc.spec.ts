import sinon from 'sinon'
import { pgBoss } from '#config/data-source'
import { sendToFlyXCJob } from '#helpers/fly-xc'
import { expect } from 'chai'

describe('sendToFlyXC', () => {
  let sendStub: sinon.SinonStub

  beforeEach(() => {
    sendStub = sinon.stub(pgBoss, 'send').resolves()
  })

  afterEach(() => {
    sendStub.restore()
  })

  it('should send payload to FlyXC if API key and URL are set', async () => {
    process.env.FLYXC_API_KEY = 'test-key'
    process.env.FLYXC_API_URL = 'http://test-url'
    const payload = {
      user_id: 'user123',
      time: Date.now(),
      type: 'text',
      message: 'This is a test message',
    }

    await sendToFlyXCJob(payload)
    expect(sendStub.calledOnceWith('fly-xc', payload)).to.be.true
  })

  it('should not send payload if API key or URL are not set', async () => {
    delete process.env.FLYXC_API_KEY
    delete process.env.FLYXC_API_URL
    const payload = {
      user_id: 'user123',
      time: Date.now(),
      type: 'text',
      message: 'This is a test message',
    }

    await sendToFlyXCJob(payload)
    expect(sendStub.notCalled).to.be.true
  })
})
