import { useEffect, useState } from 'react'

import { HardwareModelIDToName } from '../../../hardware-modules'
import { imageForModel } from '../../../image-for-model'
import { DeviceMetricsEntityForUI, EnvironmentMetricsEntityForUI, NodesEntityForUI, TraceroutesEntityForUI } from '../../../nodes-entity'
import { Modal } from '../components/modal'
import { googleMapsLink, timeAgo } from '../utils/ui-util'
import { DeviceMetrics } from './node-details-modal/device-metrics'
import { EnvironmentMetrics } from './node-details-modal/environment-metrics'
import { Header } from './node-details-modal/header'
import { NameValue } from './node-details-modal/name-value'
import { Traceroutes } from './node-details-modal/traceroutes'

interface Props {
  allNodes?: Record<number, NodesEntityForUI>
  node?: NodesEntityForUI
  onClose: () => void
}

type LoadedState = 'loaded' | 'loading' | 'error' | null

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

  return (
    <Modal showModal={true} setShowModal={() => onClose()}>
      <div className="p-2 px-4 text-sm md:text-md border-b shadow-md">
        <h1 className="font-bold">NodeInfo</h1>
        <h2 className="font-bold">{node.longName || `UNKNOWN`}</h2>
      </div>
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
          <NameValue name="ID" value={node.nodeIdHex} />
        </div>
        <div>
          <NameValue name="Hardware" value={hardwareModel} />
        </div>
        <div>
          <NameValue name="Firmware" value={node.firmwareVersion} />
        </div>
      </div>
      {position()}
      <DeviceMetrics node={node} deviceMetrics={deviceMetrics} />
      <EnvironmentMetrics node={node} environmentMetrics={environmentMetrics} />
      <Traceroutes node={node} traceRoutes={traceRoutes} allNodes={allNodes} />
    </Modal>
  )

  function position() {
    if (!node?.positionUpdatedAt) {
      return
    }
    return (
      <>
        <Header str="Position" />
        <div className="p-2 px-4 text-sm md:text-md">
          <div>
            <NameValue
              name={`Location`}
              renderer={() => {
                if (!node.latLng) {
                  return
                }
                return (
                  <>
                    <a target="_blank" rel="noreferrer" href={googleMapsLink(node.latLng)}>
                      {node.latLng.join(', ')}
                    </a>{' '}
                    {timeAgo(node.positionUpdatedAt, true)}
                  </>
                )
              }}
            />
          </div>
          <div>
            <NameValue name="Altitude" value={node.altitude} unit="m" />
          </div>
          <div>
            <NameValue name="Position updated" value={node.positionUpdatedAt} renderer={timeAgo} />
          </div>
        </div>
      </>
    )
  }
}
