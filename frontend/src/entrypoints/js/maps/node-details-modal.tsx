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
import { Position } from './position.tsx'
import { DateTime, Duration } from 'luxon'
import _ from 'lodash'
import { ArrowUpRightFromSquareIcon, CopyIcon } from '../utils/icon-constants.ts'
import { Tooltip } from '../components/tooltip.tsx'
import { TRACKER_API_BASE_URL } from '../utils/ui-util.tsx'

interface Props {
  allNodes?: Record<number, NodesEntityForUI>
  node?: NodesEntityForUI
  onClose: () => void
}

function toParams(start: Duration, duration: Duration) {
  return `since=${start.plus(duration).rescale().toISO()}&duration=${duration.rescale().toISO()}`
}

export function NodeDetailsModal({ node, onClose, allNodes }: Props) {
  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetricsEntityForUI[] | null>(null)
  const [environmentMetrics, setEnvironmentMetrics] = useState<EnvironmentMetricsEntityForUI[] | null>(null)
  const [traceRoutes, setTraceRoutes] = useState<TraceroutesEntityForUI[] | null>(null)

  const [deviceMetricsSelectedDuration, setDeviceMetricsSelectedDuration] = useState(Duration.fromObject({ days: 1 }))
  const [deviceMetricsDurationSinceNow, setDeviceMetricsDurationSinceNow] = useState(Duration.fromObject({ days: 0 }))

  const [environmentMetricsSelectedDuration, setEnvironmentMetricsSelectedDuration] = useState(Duration.fromObject({ days: 1 }))
  const [environmentMetricsDurationSinceNow, setEnvironmentMetricsDurationSinceNow] = useState(Duration.fromObject({ days: 0 }))

  const [traceRoutesSelectedDuration, setTraceRoutesSelectedDuration] = useState(Duration.fromObject({ days: 1 }))
  const [traceRoutesDurationSinceNow, setTraceRoutesDurationSinceNow] = useState(Duration.fromObject({ days: 0 }))

  useEffect(() => {
    async function loadData() {
      if (!node) {
        return
      }

      const params = toParams(deviceMetricsDurationSinceNow, deviceMetricsSelectedDuration)

      const deviceMetricsResp = await fetch(`${TRACKER_API_BASE_URL}/api/node/${node.nodeId}/device-metrics?${params}`)

      if (deviceMetricsResp.status === 200) {
        setDeviceMetrics(await deviceMetricsResp.json())
      }
    }

    loadData()
  }, [deviceMetricsDurationSinceNow, deviceMetricsSelectedDuration, node])

  useEffect(() => {
    async function loadData() {
      if (!node) {
        return
      }

      const params = toParams(environmentMetricsDurationSinceNow, environmentMetricsSelectedDuration)

      const environmentMetricsResp = await fetch(`${TRACKER_API_BASE_URL}/api/node/${node.nodeId}/environment-metrics?${params}`)

      if (environmentMetricsResp.status === 200) {
        setEnvironmentMetrics(await environmentMetricsResp.json())
      }
    }

    loadData()
  }, [environmentMetricsDurationSinceNow, environmentMetricsSelectedDuration, node])

  useEffect(() => {
    async function loadData() {
      if (!node) {
        return
      }

      const params = toParams(traceRoutesDurationSinceNow, traceRoutesSelectedDuration)

      const traceRoutesResp = await fetch(`${TRACKER_API_BASE_URL}/api/node/${node.nodeId}/trace-routes?${params}`)

      if (traceRoutesResp.status === 200) {
        setTraceRoutes(await traceRoutesResp.json())
      }
    }

    loadData()
  }, [node, traceRoutesDurationSinceNow, traceRoutesSelectedDuration])

  if (!node) {
    return null
  }

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

  const earliestTime = _([node.positionTimestamp, node.positionUpdatedAt])
    .compact()
    .map((t) => DateTime.fromISO(t))
    .min()!

  function flyXCToken(node: NodesEntityForUI) {
    const flyXCToken = node.flyXCToken

    if (!flyXCToken) {
      return
    }
    return (
      <div>
        <NameValue name="Fly XC ID" value={flyXCToken} />

        <Tooltip tooltipText="Copy link to clipboard" className="border-sm inline-block rounded border ml-3">
          <CopyIcon
            className="w-5 h-5 inline-block p-0.5"
            onClick={() => {
              navigator.clipboard.writeText(flyXCToken)
            }}
          />
        </Tooltip>

        <Tooltip tooltipText="Configure your device in Fly XC" className="border-sm inline-block rounded border ml-3">
          <a href="https://flyxc.app/devices" target="_blank" rel="noreferrer">
            <ArrowUpRightFromSquareIcon className="w-5 h-5 inline-block p-0.5" />
          </a>
        </Tooltip>
      </div>
    )
  }

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
        {flyXCToken(node)}
        <div>
          <NameValue name="Hardware" value={hardwareModel} /> {firmwareVersion}
        </div>
      </div>
      <Position
        positionAttrs={{
          ...node,
          time: earliestTime,
        }}
      />
      <DeviceMetrics
        node={node}
        deviceMetrics={deviceMetrics}
        selectedDuration={deviceMetricsSelectedDuration}
        setSelectedDuration={setDeviceMetricsSelectedDuration}
        durationSinceNow={deviceMetricsDurationSinceNow}
        setDurationSinceNow={setDeviceMetricsDurationSinceNow}
      />
      <EnvironmentMetrics
        node={node}
        environmentMetrics={environmentMetrics}
        selectedDuration={environmentMetricsSelectedDuration}
        setSelectedDuration={setEnvironmentMetricsSelectedDuration}
        durationSinceNow={environmentMetricsDurationSinceNow}
        setDurationSinceNow={setEnvironmentMetricsDurationSinceNow}
      />
      <Traceroutes
        node={node}
        traceRoutes={traceRoutes}
        allNodes={allNodes}
        selectedDuration={traceRoutesSelectedDuration}
        setSelectedDuration={setTraceRoutesSelectedDuration}
        durationSinceNow={traceRoutesDurationSinceNow}
        setDurationSinceNow={setTraceRoutesDurationSinceNow}
      />
    </Modal>
  )
}
