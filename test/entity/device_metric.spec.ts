import DeviceMetric from '#entity/device_metric'
import { AppDataSource } from '#config/data-source'

describe('DeviceMetric', () => {
  it('should find recent similar metric', async () => {
    const dm = new DeviceMetric({
      nodeId: 123,
      batteryLevel: 98,
      voltage: 3.3,
      channelUtilization: 0.5,
      airUtilTx: 0.1,
      uptimeSeconds: 123,
    })

    await AppDataSource.transaction(async (trx) => {
      await trx.save(dm)
    })
  })
})
