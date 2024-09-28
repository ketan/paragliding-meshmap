import Node from '#entity/node'
import { expect } from 'chai'
import { DateTime, Duration } from 'luxon'
import { BROADCAST_ADDR } from '#helpers/utils'
import { AppDataSource } from '#config/data-source'
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import MapReport from '#entity/map_report'
import { meshtastic } from '../../src/gen/meshtastic-protobufs.js'
import _ from 'lodash'
import HardwareModel = meshtastic.HardwareModel

describe('Node', () => {
  describe('inboundMessage', () => {
    it('should purge messages in inbox older than retention period', () => {
      const purgeOlderThan = Duration.fromISO('PT11M')

      const n = new Node()
      const m1 = {
        from: 1,
        to: 123,
        text: 'abc',
        createdAt: DateTime.now().minus(Duration.fromISO('PT10M')).toJSDate(),
      }
      const m2 = {
        from: 2,
        to: 123,
        text: 'pqr',
        createdAt: DateTime.now().minus(Duration.fromISO('PT20M')).toJSDate(),
      }
      const m3 = {
        from: 3,
        to: 123,
        text: 'xyz',
        createdAt: DateTime.now().minus(Duration.fromISO('PT30M')).toJSDate(),
      }

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
      const m1 = {
        to: 1,
        from: 123,
        text: 'abc',
        createdAt: DateTime.now().minus(Duration.fromISO('PT10M')).toJSDate(),
      }
      const m2 = {
        to: 2,
        from: 123,
        text: 'pqr',
        createdAt: DateTime.now().minus(Duration.fromISO('PT20M')).toJSDate(),
      }
      const m3 = {
        to: 3,
        from: 123,
        text: 'xyz',
        createdAt: DateTime.now().minus(Duration.fromISO('PT30M')).toJSDate(),
      }
      n.outboundMessage(m1, purgeOlderThan, [])
      n.outboundMessage(m2, purgeOlderThan, [])
      n.outboundMessage(m3, purgeOlderThan, [])

      expect(n.outbox).to.deep.equal([m2, m1].map((m) => ({ to: m.to, text: m.text, time: m.createdAt.toISOString() })))
    })
  })

  describe('updateDeviceMetrics', () => {
    it('should create a new node with specified metrics if a node does not exist', async () => {
      expect(await Node.find(AppDataSource)).to.be.empty

      const dm = new DeviceMetric({
        nodeId: 123,

        batteryLevel: 98,
        voltage: 3.3,
        channelUtilization: 0.5,
        airUtilTx: 0.1,
        uptimeSeconds: 123,
      })

      await Node.updateDeviceMetrics(AppDataSource, dm)

      const node = await Node.findOne(AppDataSource, { where: { nodeId: 123 } })
      expect(node).excluding(['createdAt', 'updatedAt', 'id']).to.deep.include(dm)
    })

    it('should update an existing node if one exists', async () => {
      expect(await Node.find(AppDataSource)).to.be.empty

      await AppDataSource.manager.save(new Node({ nodeId: 123, batteryLevel: 10, voltage: 1.2 }))

      const dm = new DeviceMetric({
        nodeId: 123,

        batteryLevel: 98,
        voltage: 3.3,
        channelUtilization: 0.5,
        airUtilTx: 0.1,
        uptimeSeconds: 123,
      })

      await Node.updateDeviceMetrics(AppDataSource, dm)

      const node = await Node.findOne(AppDataSource, { where: { nodeId: 123 } })
      expect(node).excluding(['createdAt', 'updatedAt', 'id']).to.deep.include(dm)
    })
  })

  describe('updateEnvironmentMetrics', () => {
    it('should create a new node with specified metrics if a node does not exist', async () => {
      expect(await Node.find(AppDataSource)).to.be.empty

      const em = new EnvironmentMetric({
        nodeId: 123,
        iaq: 98,
        temperature: 32,
        relativeHumidity: 0.5,
        gasResistance: 123,
        barometricPressure: 1013.25,
        voltage: 3.3,
        current: 32,
        createdAt: DateTime.now().minus({ minutes: 1 }).toJSDate(),
      })

      await Node.updateEnvironmentMetrics(AppDataSource, em)

      const node = await Node.findOne(AppDataSource, { where: { nodeId: 123 } })
      expect(node).excluding(['createdAt', 'updatedAt', 'id', 'iaq', 'current', 'gasResistance']).to.deep.include(em)
    })

    it('should update an existing node if one exists', async () => {
      expect(await Node.find(AppDataSource)).to.be.empty

      await AppDataSource.manager.save(
        new Node({ nodeId: 123, barometricPressure: 10, relativeHumidity: 0.5, temperature: 20, voltage: 1.2 })
      )

      const em = new EnvironmentMetric({
        nodeId: 123,
        iaq: 98,
        temperature: 32,
        relativeHumidity: 0.5,
        gasResistance: 123,
        barometricPressure: 1013.25,
        voltage: 3.3,
        current: 32,
        createdAt: DateTime.now().minus({ minutes: 1 }).toJSDate(),
      })

      await Node.updateEnvironmentMetrics(AppDataSource, em)

      const node = await Node.findOne(AppDataSource, { where: { nodeId: 123 } })
      expect(node).excluding(['createdAt', 'updatedAt', 'id', 'iaq', 'current', 'gasResistance']).to.deep.include(em)
    })
  })

  describe('updateMapReports', () => {
    it('should create a new node with specified metrics if a node does not exist', async () => {
      expect(await Node.find(AppDataSource)).to.be.empty

      const em = new MapReport({
        nodeId: 123,
        shortName: 'bob',
        longName: 'robert',
        altitude: 127,
        latitude: 1000000,
        longitude: 1234567,
        firmwareVersion: '1.23',
        hardwareModel: HardwareModel.BETAFPV_2400_TX,
        role: meshtastic.Config.DeviceConfig.Role.CLIENT_MUTE,
        createdAt: DateTime.now().minus({ minutes: 1 }).toJSDate(),
      })

      await Node.updateMapReports(AppDataSource, em)

      const node = await Node.findOne(AppDataSource, { where: { nodeId: 123 } })
      expect(_.omitBy(node, _.isNil))
        .to.excluding(['createdAt', 'updatedAt', 'id', 'positionUpdatedAt', 'flyXCToken'])
        .to.deep.equal(_.omitBy(em, _.isNil))
    })

    it('should update an existing node if one exists', async () => {
      expect(await Node.find(AppDataSource)).to.be.empty

      await AppDataSource.manager.save(new Node({ nodeId: 123, altitude: 99, shortName: 'foo', longName: 'blah' }))

      const em = new MapReport({
        nodeId: 123,
        shortName: 'bob',
        longName: 'robert',
        altitude: 127,
        latitude: 1000000,
        longitude: 1234567,
        firmwareVersion: '1.23',
        hardwareModel: HardwareModel.BETAFPV_2400_TX,
        role: meshtastic.Config.DeviceConfig.Role.CLIENT_MUTE,

        createdAt: DateTime.now().minus({ minutes: 1 }).toJSDate(),
      })

      await Node.updateMapReports(AppDataSource, em)

      const node = await Node.findOne(AppDataSource, { where: { nodeId: 123 } })
      expect(_.omitBy(node, _.isNil))
        .to.excluding(['createdAt', 'updatedAt', 'id', 'positionUpdatedAt', 'flyXCToken'])
        .to.deep.equal(_.omitBy(em, _.isNil))
    })
  })

  describe('createflyXCToken', () => {
    it('should generate a flyXCToken when nodeId, shortName, and longName are present', async () => {
      const node = new Node({ nodeId: 123, shortName: 'short', longName: 'long' })

      await AppDataSource.getRepository(Node).save(node)
      expect(node.flyXCToken).to.exist
    })

    it('should not generate a flyXCToken if nodeId is missing', async () => {
      const node = new Node({ shortName: 'short', longName: 'long' })
      try {
        await AppDataSource.getRepository(Node).save(node)
      } catch (ignore) {
        // not allowed to save a node without a nodeId
      }
      expect(node.flyXCToken).to.not.exist
    })

    it('should not generate a flyXCToken if shortName is missing', async () => {
      const node = new Node({ nodeId: 123, longName: 'long' })
      await AppDataSource.getRepository(Node).save(node)
      expect(node.flyXCToken).to.not.exist
    })

    it('should not generate a flyXCToken if longName is missing', async () => {
      const node = new Node({ nodeId: 123, shortName: 'short' })
      await AppDataSource.getRepository(Node).save(node)
      expect(node.flyXCToken).to.not.exist
    })

    it('should not overwrite an existing flyXCToken', async () => {
      const node = new Node({ nodeId: 123, shortName: 'short', longName: 'long', flyXCToken: 'existing-token' })
      await AppDataSource.getRepository(Node).save(node)
      expect(node.flyXCToken).to.equal('existing-token')
    })
  })

  describe('createOrUpdate', () => {
    it('should create a new node if it does not exist', async () => {
      expect(await Node.find(AppDataSource)).to.be.empty

      const node = new Node({ nodeId: 123, shortName: 'short', longName: 'long' })
      await node.createOrUpdate(AppDataSource.manager)

      const savedNode = await Node.findOne(AppDataSource, { where: { nodeId: 123 } })
      expect(savedNode).to.exist
      expect(savedNode).to.deep.include({ nodeId: 123, shortName: 'short', longName: 'long' })
    })

    it('should update an existing node if it already exists', async () => {
      expect(await Node.find(AppDataSource)).to.be.empty

      await AppDataSource.manager.save(new Node({ nodeId: 123, shortName: 'oldShort', longName: 'oldLong' }))

      const node = new Node({ nodeId: 123, shortName: 'newShort', longName: 'newLong' })
      await node.createOrUpdate(AppDataSource.manager)

      const updatedNode = await Node.findOne(AppDataSource, { where: { nodeId: 123 } })
      expect(updatedNode).to.exist
      expect(updatedNode).to.deep.include({ nodeId: 123, shortName: 'newShort', longName: 'newLong' })
    })
  })
})
