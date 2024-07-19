import { AppDataSource } from '#config/data-source'
import { errLog } from '#helpers/logger'
import { parseProtobuf } from '#helpers/utils'
import { Column, Entity } from 'typeorm'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { BaseType } from './base_type.js'
import { Neighbors } from './neighbors.js'

@Entity()
export default class NeighbourInfo extends BaseType {
  @Column({ type: 'bigint' })
  nodeId: number

  @Column({ type: 'integer' })
  nodeBroadcastIntervalSecs: number

  @Column({ type: 'json' })
  neighbours: Neighbors[]

  static fromPacket(envelope: meshtastic.ServiceEnvelope) {
    const packet = envelope.packet
    const payload = packet?.decoded?.payload

    if (!payload) {
      return
    }

    // NeighborInfoPB.fromBinary((packet.payloadVariant.value as Data).payload, { readUnknownFields: true })
    const neighborInfo = parseProtobuf(() => meshtastic.NeighborInfo.decode(payload))

    try {
      const entity = AppDataSource.manager.merge(NeighbourInfo, new NeighbourInfo(), {
        nodeId: packet.from!,
        nodeBroadcastIntervalSecs: neighborInfo.nodeBroadcastIntervalSecs!,
        neighbours: neighborInfo.neighbors.map((neighbour) => {
          return {
            nodeId: neighbour.nodeId!,
            snr: neighbour.snr!,
          }
        }),
      })

      this.decodeLogger(`Decoded ${this.name}`, entity, neighborInfo, envelope)
      return entity
    } catch (e) {
      errLog(`unable to create neighbour info`, { err: e, neighborInfo, envelope })
    }
  }
}
