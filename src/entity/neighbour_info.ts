import { Data, NeighborInfo as NeighborInfoPB } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Column, Entity } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { ignorableProtobufError } from '../helpers/utils.js'
import { BaseType } from './base_type.js'
import { Neighbors } from './neighbors.js'

@Entity()
export default class NeighbourInfo extends BaseType {
  @Column()
  nodeId: number

  @Column()
  nodeBroadcastIntervalSecs: number

  @Column({ type: 'json' })
  neighbours: Neighbors[]

  static fromPacket(envelope: ServiceEnvelope) {
    try {
      const packet = envelope.packet!
      const neighborInfo = NeighborInfoPB.fromBinary((packet.payloadVariant.value as Data).payload)

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
      if (!ignorableProtobufError(e)) {
        this.logger({ err: e, envelope }, `Unable to parse neighbour info`)
      }
    }
  }
}
