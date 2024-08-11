import { AppDataSource } from '#config/data-source'
import ServiceEnvelope from '#entity/service_envelope'
import { parseProtobuf } from '#helpers/utils'
import { meshtastic } from './gen/meshtastic-protobufs.js'
import _ from 'lodash'
import PortNum = meshtastic.PortNum

await AppDataSource.initialize()
await AppDataSource.runMigrations({
  transaction: 'each',
})

const envelopeEntities = await ServiceEnvelope.find(AppDataSource, { order: { createdAt: 'desc' } })

const portNumMappings = _.invert(meshtastic.PortNum)

envelopeEntities.forEach((envelopeEntity) => {
  const envelope = parseProtobuf(() => meshtastic.ServiceEnvelope.decode(envelopeEntity.protobuf))
  const portnum = envelope.packet!.decoded?.portnum
  if (portnum === PortNum.MAP_REPORT_APP) {
    console.log(`protobuf`, envelopeEntity.protobuf.toString('hex'))
    console.log(`portnum`, portNumMappings[portnum!])
    console.log(envelope)
  }
})

AppDataSource.destroy()
// console.log(envelopeEntities)
