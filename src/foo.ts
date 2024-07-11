import ServiceEnvelope from '#entity/service_envelope'
import { PortNum } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/portnums_pb.js'
import { AppDataSource } from '#config/data-source'
import { ServiceEnvelope as ServiceEnvelopeProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import Node from '#entity/node'
import { Telemetry } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import { parseProtobuf } from '#helpers/utils'
import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import PowerMetric from '#entity/power_metric'

await AppDataSource.initialize()

const envelopes = await AppDataSource.manager.find(ServiceEnvelope, {
  where: {
    from: 3663164324,
  },
})

envelopes.forEach((envelope) => {
  try {
    const se = parseProtobuf(() => ServiceEnvelopeProtobuf.fromBinary(envelope.protobuf, { readUnknownFields: true }))
    if (se.packet!.payloadVariant.case == 'decoded') {
      switch (se.packet!.payloadVariant.value!.portnum!) {
        case PortNum.NODEINFO_APP:
          console.log(Node.fromPacket(se))
          break
        case PortNum.TELEMETRY_APP: {
          const telemetry = parseProtobuf(() =>
            Telemetry.fromBinary((se.packet!.payloadVariant.value as Data).payload, { readUnknownFields: true })
          )
          let metric: DeviceMetric | EnvironmentMetric | PowerMetric | undefined
          if (telemetry.variant.case == 'deviceMetrics') {
            metric = DeviceMetric.fromPacket(se)
          } else if (telemetry.variant.case == 'environmentMetrics') {
            metric = EnvironmentMetric.fromPacket(se)
          } else if (telemetry.variant.case == 'powerMetrics') {
            metric = PowerMetric.fromPacket(se)
          }
          console.log(metric)
          break
        }
      }
    }
  } catch (e) {
    console.warn(e)
  }
})
