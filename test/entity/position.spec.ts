import { expect } from 'chai'
import Position from '#entity/position'
import { AppDataSource } from '#config/data-source'
import { BROADCAST_ADDR } from '#helpers/utils'

describe('Position', () => {
  it('should fetch recent positions for a specific node since a given date', async () => {
    const nodeId = 123
    const since = new Date(Date.now() - 1000 * 60 * 60 * 24) // 24 hours ago

    const position1 = new Position({
      nodeId,
      to: BROADCAST_ADDR,
      from: 123,
      latitude: 123456,
      longitude: 654321,
      altitude: 1000,
      satsInView: 10,
      precisionBits: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
      time: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20 hours ago
    })

    const position2 = new Position({
      nodeId,
      to: BROADCAST_ADDR,
      from: 123,
      latitude: 123457,
      longitude: 654322,
      altitude: 1001,
      satsInView: 11,
      precisionBits: 6,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21), // 21 hours ago
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      time: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20 hours ago
    })

    await AppDataSource.manager.save([position1, position2])

    const positions = await Position.forNode(AppDataSource, nodeId, since)
    expect(positions).to.be.instanceof(Array).that.has.lengthOf(2)
    expect(positions).to.deepEqualIgnoreUndefined([
      {
        createdAt: position1.createdAt,
        id: 1,
        latitude: 123456,
        longitude: 654321,
        altitude: 1000,
        satsInView: 10,
        precisionBits: 5,
        timestamp: position1.timestamp,
        time: position1.time,
        pdop: null,
      },
      {
        createdAt: position2.createdAt,
        id: 2,
        latitude: 123457,
        longitude: 654322,
        altitude: 1001,
        satsInView: 11,
        precisionBits: 6,
        timestamp: position2.timestamp,
        time: position2.time,
        pdop: null,
      },
    ])
  })
})
