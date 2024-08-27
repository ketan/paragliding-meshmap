import { useEffect, useState } from 'react'

import { HardwareModelIDToName } from '../../../hardware-modules'
import { imageForModel } from '../../../image-for-model'
import { DeviceMetricsEntityForUI, EnvironmentMetricsEntityForUI, NodesEntityForUI, TraceroutesEntityForUI } from '../../../nodes-entity'
import { Modal } from '../components/modal'
import { DeviceMetrics } from './node-details-modal/device-metrics'
import { EnvironmentMetrics } from './node-details-modal/environment-metrics'
import { Header } from './node-details-modal/header'
import { NameValue } from './node-details-modal/name-value'
import { Traceroutes } from './node-details-modal/traceroutes'
import { LoadedState } from './loaded-state.tsx'
import { Position } from './position.tsx'

interface Props {
  allNodes?: Record<number, NodesEntityForUI>
  node?: NodesEntityForUI
  onClose: () => void
}

export function NodeDetailsModal({ node, onClose, allNodes }: Props) {
  if (!node) {
    return null
  }

  const [loadedState, setLoadedState] = useState<LoadedState>(null)
  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetricsEntityForUI[] | null>(null)
  const [environmentMetrics, setEnvironmentMetrics] = useState<EnvironmentMetricsEntityForUI[] | null>(null)
  const [traceRoutes, setTraceRoutes] = useState<TraceroutesEntityForUI[] | null>(null)

  async function loadData() {
    setLoadedState('loading')
    const [deviceMetricsResp, environmentMetricsResp, traceRoutesResp] = await Promise.all([
      fetch(`/api/node/${node!.nodeId}/device-metrics`),
      fetch(`/api/node/${node!.nodeId}/environment-metrics`),
      fetch(`/api/node/${node!.nodeId}/trace-routes`),
    ])

    if (deviceMetricsResp.status === 200 && environmentMetricsResp.status === 200 && traceRoutesResp.status === 200) {
      setDeviceMetrics(await deviceMetricsResp.json())
      setEnvironmentMetrics(await environmentMetricsResp.json())
      setTraceRoutes(await traceRoutesResp.json())

      setLoadedState('loaded')
    } else {
      setLoadedState('error')
    }
  }

  useEffect(() => {
    if (!loadedState) {
      loadData()
    }
  })

  const image = imageForModel(node.hardwareModel) ? (
    <img
      className="mb-4 min-w-[250px] max-w-[250px] m-auto"
      src={imageForModel(node.hardwareModel)}
      alt={`Image for ${node.hardwareModel}`}
    />
  ) : null
  const hardwareModel =
    node.hardwareModel === undefined || node.hardwareModel === null ? undefined : HardwareModelIDToName[node.hardwareModel]

  const firmwareVersion = (
    <>
      {node.firmwareVersion && ' / '}
      {node.firmwareVersion && <NameValue name="Firmware" value={node.firmwareVersion} />}
    </>
  )

  return (
    <Modal onClose={onClose} isOpen={true} header={node.longName || `UNKNOWN`}>
      {image}
      <Header str="Node Info" />
      <div className="p-2 px-4 text-sm md:text-md">
        <div>
          <NameValue name="Long Name" value={node.longName} />
        </div>
        <div>
          <NameValue name="Short Name" value={node.shortName} />
        </div>
        <div>
          <NameValue name="Hex ID" value={node.nodeIdHex} /> / <NameValue name="ID" value={node.nodeId} />
        </div>
        <div>
          <NameValue name="Hardware" value={hardwareModel} /> {firmwareVersion}
        </div>
      </div>
      <Position node={node} />
      <DeviceMetrics node={node} deviceMetrics={deviceMetrics} />
      <EnvironmentMetrics node={node} environmentMetrics={environmentMetrics} />
      <Traceroutes node={node} traceRoutes={traceRoutes} allNodes={allNodes} />
    </Modal>
  )
}
