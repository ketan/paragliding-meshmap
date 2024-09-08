import { expect } from 'chai'
import TextMessage from '#entity/text_message'
import { DateTime } from 'luxon'
import { AppDataSource } from '#config/data-source'

describe('TextMessage', () => {
  it('should fetch outgoing messages for a specific node since a given date', async () => {
    const nodeId = 123
    const since = new Date(Date.now() - 1000 * 60 * 60 * 24) // 24 hours ago

    const message1 = new TextMessage({
      from: nodeId,
      to: 456,
      channel: 1,
      packetId: 1,
      channelId: 'channel-1',
      text: 'Message 1',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
    })

    const message2 = new TextMessage({
      from: nodeId,
      to: 456,
      channel: 1,
      packetId: 2,
      channelId: 'channel-1',
      text: 'Message 2',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
    })

    await AppDataSource.manager.save([message1, message2])

    const messages = await TextMessage.outgoing(AppDataSource, nodeId, 456, since)
    expect(messages).to.be.an('array').that.has.lengthOf(2)
    expect(messages[0].id).to.equal(Number(message1.id))
    expect(messages[1].id).to.equal(Number(message2.id))
  })

  it('should find recent similar message', async () => {
    const oneMinuteAgoMessage = new TextMessage({
      to: 456,
      from: 123,
      channel: 1,
      packetId: 1,
      channelId: 'channel-1',
      text: 'Message 1',
      createdAt: DateTime.now().minus({ minutes: 1 }).toJSDate(),
    })

    const recentMessage = new TextMessage({
      to: 456,
      from: 123,
      channel: 1,
      packetId: 2,
      channelId: 'channel-1',
      text: 'Message 2',
    })

    await AppDataSource.manager.save([oneMinuteAgoMessage, recentMessage])

    expect(oneMinuteAgoMessage.id).to.exist
    expect(recentMessage.id).to.exist

    expect(await oneMinuteAgoMessage.findRecentSimilarMessage(AppDataSource, new Date(Date.now() - 2000))).to.not.exist
    expect(await recentMessage.findRecentSimilarMessage(AppDataSource, new Date(Date.now() - 2000))).to.deep.equal(
      await AppDataSource.manager.findOneBy(TextMessage, { id: recentMessage.id })
    )
  })
})
