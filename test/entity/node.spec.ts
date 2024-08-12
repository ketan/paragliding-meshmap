import Node from '#entity/node'
import { expect } from 'chai'
import { DateTime, Duration } from 'luxon'
import { BROADCAST_ADDR } from '#helpers/utils'

describe('Node', () => {
  describe('inboundMessage', () => {
    it('should purge messages in inbox older than retention period', () => {
      const purgeOlderThan = Duration.fromISO('PT11M')

      const n = new Node()
      const m1 = { from: 1, to: 123, text: 'abc', createdAt: DateTime.now().minus(Duration.fromISO('PT10M')).toJSDate() }
      const m2 = { from: 2, to: 123, text: 'pqr', createdAt: DateTime.now().minus(Duration.fromISO('PT20M')).toJSDate() }
      const m3 = { from: 3, to: 123, text: 'xyz', createdAt: DateTime.now().minus(Duration.fromISO('PT30M')).toJSDate() }

      n.inboundMessage(m1, purgeOlderThan)
      n.inboundMessage(m2, purgeOlderThan)
      n.inboundMessage(m3, purgeOlderThan)

      expect(n.inbox).to.deep.equal([m1].map((m) => ({ from: m.from, text: m.text, time: m.createdAt.toISOString() })))
    })

    it('should not save inbox message for broadcast address', () => {
      const n = new Node()
      const m = { from: 1, to: BROADCAST_ADDR, text: 'abc', createdAt: DateTime.now().toJSDate() }

      n.inboundMessage(m, Duration.fromISO('PT11M'))

      expect(n.inbox).to.not.exist
    })
  })

  describe('outboundMessage', () => {
    it('should purge messages in outbox older than retention period', () => {
      const purgeOlderThan = Duration.fromISO('PT21M')

      const n = new Node()
      const m1 = { to: 1, from: 123, text: 'abc', createdAt: DateTime.now().minus(Duration.fromISO('PT10M')).toJSDate() }
      const m2 = { to: 2, from: 123, text: 'pqr', createdAt: DateTime.now().minus(Duration.fromISO('PT20M')).toJSDate() }
      const m3 = { to: 3, from: 123, text: 'xyz', createdAt: DateTime.now().minus(Duration.fromISO('PT30M')).toJSDate() }
      n.outboundMessage(m1, purgeOlderThan)
      n.outboundMessage(m2, purgeOlderThan)
      n.outboundMessage(m3, purgeOlderThan)

      expect(n.outbox).to.deep.equal([m2, m1].map((m) => ({ to: m.to, text: m.text, time: m.createdAt.toISOString() })))
    })
  })
})
