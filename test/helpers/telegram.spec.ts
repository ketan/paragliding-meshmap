import sinon from 'sinon'
import { sendTelegramMessage } from '#helpers/telegram'
import { expect } from 'chai'

describe('sendTelegramMessage', () => {
  let fetchStub: sinon.SinonStub

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch')
  })

  afterEach(() => {
    fetchStub.restore()
  })

  it('should send a message to Telegram API', async () => {
    const botToken = 'test-bot-token'
    const chatId = 'test-chat-id'
    const message = 'test-message with some <script>content</script>'
    const threadId = 'test-thread-id'
    const from = 'bob'

    fetchStub.resolves({
      ok: true,
      json: async () => ({ result: 'success' }),
    } as Response)

    await sendTelegramMessage(botToken, chatId, threadId, from, message)

    expect(fetchStub.calledOnce).to.be.true
    const [url, options] = fetchStub.firstCall.args
    expect(url).to.equal(`https://api.telegram.org/bot${botToken}/sendMessage`)
    expect(options.method).to.equal('POST')
    expect(options.headers['Content-Type']).to.equal('application/json')
    expect(JSON.parse(options.body)).to.deep.equal({
      chat_id: chatId,
      text: '<strong>bob</strong> says\n<blockquote>test-message with some &lt;script&gt;content&lt;/script&gt;</blockquote>',
      message_thread_id: threadId,
      parse_mode: 'HTML',
    })
  })

  it('should throw an error if Telegram API response is not ok', async () => {
    const botToken = 'test-bot-token'
    const chatId = 'test-chat-id'
    const message = 'test-message'
    const threadId = 'test-thread-id'
    const from = 'bob'

    fetchStub.resolves({
      ok: false,
      text: async () => 'error message',
    } as Response)

    try {
      await sendTelegramMessage(botToken, chatId, threadId, from, message)
      throw new Error('Expected sendTelegramMessage to throw an error')
    } catch (error) {
      expect(error.message).to.equal('Telegram API error: error message')
    }
  })
})
