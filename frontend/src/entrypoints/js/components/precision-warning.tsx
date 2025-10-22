import { IconAlertTriangle } from '@tabler/icons-react'
import { NodesEntity } from '../../../db-entities'
import { useCurrentUrl } from '../hooks/use-current-url'

export function PrecisionWarning({ node }: { node: NodesEntity }) {
  const { buildHref } = useCurrentUrl()

  if (!node) {
    return null
  }

  const paramsObj = { shortName: node.shortName, longName: node.longName, configure: 1 }

  return (
    <div className="bg-red-50 border-s-4 border-red-600 p-2" role="alert" aria-labelledby="hs-bordered-red-style-label">
      <div className="flex">
        <div className="shrink-0">
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800">
            <IconAlertTriangle className={'w-8 h-8'} />
          </span>
        </div>
        <div className="ms-3">
          <h3 id="hs-bordered-red-style-label" className="text-gray-800">
            <span className="font-semibold">Warning:</span> Location accuracy is low. The device&#39;s location settings appear to be
            misconfigured.{' '}
            <a href={buildHref(paramsObj)} className="underline text-blue-600">
              Click here
            </a>{' '}
            to configure the device properly.
          </h3>
        </div>
      </div>
    </div>
  )
}
