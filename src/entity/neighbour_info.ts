import { Data, NeighborInfo as NeighborInfoPB } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { parseProtobuf } from '../helpers/utils.js'
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

  static fromPacket(envelope: ServiceEnvelope) {
    const packet = envelope.packet!

    const neighborInfo = parseProtobuf(() =>
      NeighborInfoPB.fromBinary((packet.payloadVariant.value as Data).payload, { readUnknownFields: true })
    )

    try {
      return AppDataSource.manager.merge(NeighbourInfo, new NeighbourInfo(), {
        nodeId: packet.from,
        nodeBroadcastIntervalSecs: neighborInfo.nodeBroadcastIntervalSecs,
        neighbours: neighborInfo.neighbors.map((neighbour) => {
          return {
            nodeId: neighbour.nodeId,
            snr: neighbour.snr,
          }
        }),
      })
    } catch (e) {
      this.logger(`unable to create neighbour info`, { err: e, neighborInfo, envelope })
    }
  }
}
