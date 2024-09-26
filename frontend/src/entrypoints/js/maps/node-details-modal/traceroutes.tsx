import { NodesEntityForUI, TraceroutesEntityForUI } from '../../../../nodes-entity'
import { nodeUrl } from '../../utils/link-utils'
import { timeAgo } from '../../utils/ui-util'
import { Header } from './header'
import { DurationSelect } from '../../components/duration-select.tsx'

export function Traceroutes({
  allNodes,
  node,
  traceRoutes,
  updateDuration,
  duration,
}: {
  allNodes?: Record<number, NodesEntityForUI>
  node: NodesEntityForUI
  traceRoutes?: TraceroutesEntityForUI[] | null
  updateDuration: (value: string) => void
  duration: string
}) {
  if (!traceRoutes || traceRoutes.length === 0) {
    return
  }

  const fromNode = node
  return (
    <>
      <Header str="Traceroutes">
        <DurationSelect duration={duration} updateDuration={updateDuration} />
      </Header>
      <div className="p-2 px-4 text-sm md:text-md">
        <div>
          {traceRoutes
            .reverse()
            .splice(0, 5)
            .map((traceRoute, index) => {
              const targetNode = (allNodes || [])[traceRoute.to]

              return (
                <div key={index} className="border-b py-4">
                  <div className="">
                    <span className="font-semibold text-sm">
                      <a href={nodeUrl(fromNode)}>
                        {fromNode.shortName} ({fromNode.longName})
                      </a>{' '}
                      →{' '}
                      <a href={nodeUrl(targetNode)}>
                        {targetNode.shortName} ({targetNode.longName})
                      </a>
                    </span>
                  </div>
                  {hops(traceRoute.route, allNodes)} {timeAgo(traceRoute.createdAt)}
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

function hops(route: number[] | undefined, allNodes: Record<number, NodesEntityForUI> | undefined) {
  if (!route || route.length === 0) {
    return null
  }

  return (
    <>
      {route.length} {route.length > 1 ? 'hops' : 'hop'} via{' '}
      {route.flatMap((hop, index, array) => {
        const targetNode = (allNodes || [])[hop]

        const value = (
          <span key={index} className="mr-1">
            <a href={nodeUrl(hop)}>
              {targetNode?.shortName} ({targetNode?.longName})
            </a>
          </span>
        )

        if (array.length - 1 !== index) {
          return [value, ` → `]
        } else {
          return value
        }
      })}
    </>
  )
}
