import { expect } from 'chai'
import NeighbourInfo from '#entity/neighbour_info'
import { AppDataSource } from '#config/data-source'

describe('NeighbourInfo', () => {
  it('should fetch neighbors for a specific node since a given date', async () => {
    const nodeId = 123
    const since = new Date(Date.now() - 1000 * 60 * 60 * 24) // 24 hours ago

    const info1 = new NeighbourInfo({
      nodeId,
      nodeBroadcastIntervalSecs: 10,
      neighbours: [
        { nodeId: 10, snr: 20 },
        { nodeId: 11, snr: 30 },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
    })

    const info2 = new NeighbourInfo({
      nodeId,
      nodeBroadcastIntervalSecs: 20,
      neighbours: [
        { nodeId: 12, snr: 21 },
        { nodeId: 13, snr: 31 },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
    })

    await AppDataSource.manager.save([info1, info2])

    const infos = await NeighbourInfo.forNode(AppDataSource, nodeId, since)
    expect(infos).to.be.an('array').that.has.lengthOf(2)
    expect(infos).to.deepEqualIgnoreUndefined([
      {
        createdAt: info1.createdAt,
        neighbours: [
          {
            nodeId: 10,
            snr: 20,
          },
          {
            nodeId: 11,
            snr: 30,
          },
        ],
      },
      {
        createdAt: info2.createdAt,
        neighbours: [
          {
            nodeId: 12,
            snr: 21,
          },
          {
            nodeId: 13,
            snr: 31,
          },
        ],
      },
    ])
  })
})
