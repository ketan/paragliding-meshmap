import { expect } from 'chai'
import MapReport from '#entity/map_report'
import { AppDataSource } from '#config/data-source'

describe('MapReport', () => {
  it('should fetch reports for a specific node since a given date', async () => {
    const nodeId = 123
    const since = new Date(Date.now() - 1000 * 60 * 60 * 24) // 24 hours ago

    const report1 = new MapReport({
      nodeId,
      longName: 'Report 1',
      shortName: 'R1',
      hardwareModel: 1,
      firmwareVersion: '1.0.0',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
    })

    const report2 = new MapReport({
      nodeId,
      longName: 'Report 2',
      shortName: 'R2',
      hardwareModel: 2,
      firmwareVersion: '2.0.0',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
    })

    await AppDataSource.manager.save([report1, report2])

    const reports = await MapReport.forNode(AppDataSource, nodeId, since)
    expect(reports).to.be.instanceof(Array).with.lengthOf(2)
    expect(reports[0].id).to.eq(Number(report1.id))
    expect(reports[1].id).to.eq(Number(report2.id))
  })

  it('should fetch reports for a specific node since a given date with only specified attributes', async () => {
    const nodeId = 123
    const since = new Date(Date.now() - 1000 * 60 * 60 * 24) // 24 hours ago

    const report = new MapReport({
      nodeId,
      longName: 'Report',
      shortName: 'R',
      hardwareModel: 1,
      firmwareVersion: '1.0.0',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
      latitude: 123456,
      longitude: 654321,
      altitude: 1000,
    })

    await AppDataSource.manager.save(report)

    const reports = await MapReport.forNode(AppDataSource, nodeId, since)
    expect(reports).to.be.an('array').with.lengthOf(1)
    const fetchedReport = reports[0]
    expect(fetchedReport).to.deepEqualIgnoreUndefined({
      createdAt: report.createdAt,
      id: Number(report.id),
      latitude: report.latitude,
      longitude: report.longitude,
      altitude: report.altitude,
    })
  })
})
