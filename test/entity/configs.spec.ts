import { expect } from 'chai'
import { Configs } from '#entity/configs'
import { AppDataSource } from '#config/data-source'
import { randomUUID } from 'node:crypto'

describe('Configs', () => {
  describe('flyXCTokenNamespace', () => {
    it('should return a configuration with a UUID value', async () => {
      const config = await Configs.flyXCTokenNamespace(AppDataSource)
      expect(config).to.be.an('object')
      expect(config.key).to.equal('flyXCTokenNamespace')
      expect(config.value).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    })

    it('should return the existing configuration if it already exists', async () => {
      const existingConfig = new Configs({ key: 'flyXCTokenNamespace', value: randomUUID() })
      await existingConfig.save(AppDataSource)

      const config = await Configs.flyXCTokenNamespace(AppDataSource)
      expect(config).to.exist
      expect(config.key).to.equal('flyXCTokenNamespace')
      expect(config.value).to.equal(existingConfig.value)
    })
  })

  describe('mqttClientId', () => {
    it('should return a configuration with a client ID', async () => {
      const config = await Configs.mqttClientId(AppDataSource)
      expect(config).to.be.an('object')
      expect(config.key).to.equal('mqttClientId')
      expect(config.value).to.match(/^paragliding-meshmap-[0-9a-f]{6}$/)
    })

    it('should return the existing configuration if it already exists', async () => {
      const existingConfig = new Configs({
        key: 'mqttClientId',
        value: 'paragliding-meshmap-' + Math.random().toString(16).substring(2, 8),
      })
      await existingConfig.save(AppDataSource)

      const config = await Configs.mqttClientId(AppDataSource)
      expect(config).to.be.an('object')
      expect(config.key).to.equal('mqttClientId')
      expect(config.value).to.equal(existingConfig.value)
    })
  })
})
