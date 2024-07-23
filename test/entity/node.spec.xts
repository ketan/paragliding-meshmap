import { BaseType } from '#entity/base_type'
import Node from '#entity/node'
import { expect } from 'chai'
import { DateTime, Duration } from 'luxon'

describe('Node', () => {
  describe('purgeTextMessages', () => {
    it('should purge messages in inbox older than retention period', () => {
      BaseType.purgeDataOlderThan = Duration.fromISO('PT11M')

      const n = new Node()
      const m1 = { from: 1, text: 'abc', time: DateTime.now().minus(Duration.fromISO('PT10M')).toJSON() }
      const m2 = { from: 2, text: 'pqr', time: DateTime.now().minus(Duration.fromISO('PT20M')).toJSON() }
      const m3 = { from: 3, text: 'xyz', time: DateTime.now().minus(Duration.fromISO('PT30M')).toJSON() }
      n.inbox = [m1, m2, m3]

      n.purgeTextMessages()

      expect(n.inbox).to.deep.equal([m1])
    })

    it('should purge messages in outbox older than retention period', () => {
      BaseType.purgeDataOlderThan = Duration.fromISO('PT21M')

      const n = new Node()
      const m1 = { to: 1, text: 'abc', time: DateTime.now().minus(Duration.fromISO('PT10M')).toJSON() }
      const m2 = { to: 2, text: 'pqr', time: DateTime.now().minus(Duration.fromISO('PT20M')).toJSON() }
      const m3 = { to: 3, text: 'xyz', time: DateTime.now().minus(Duration.fromISO('PT30M')).toJSON() }
      n.outbox = [m1, m2, m3]

      n.purgeTextMessages()

      expect(n.outbox).to.deep.equal([m1, m2])
    })

    it('should not fail on null messages', () => {
      const n = new Node()
      expect(n.outbox).to.not.exist
      expect(n.inbox).to.not.exist

      n.purgeTextMessages()

      expect(n.outbox).to.not.exist
      expect(n.inbox).to.not.exist
    })

    it('should not purge if `purgeDataOlderThan` is unset', () => {
      BaseType.purgeDataOlderThan = undefined

      const n = new Node()
      const m1 = { to: 1, text: 'abc', time: DateTime.now().minus(Duration.fromISO('PT10M')).toJSON() }
      const m2 = { to: 2, text: 'pqr', time: DateTime.now().minus(Duration.fromISO('PT20M')).toJSON() }
      const m3 = { to: 3, text: 'xyz', time: DateTime.now().minus(Duration.fromISO('PT30M')).toJSON() }
      n.outbox = [m1, m2, m3]

      n.purgeTextMessages()

      expect(n.outbox).to.deep.equal([m1, m2, m3])
    })
  })
})
