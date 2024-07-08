import { renderToString } from 'react-dom/server'
import { NodesEntity } from '../database'
import { nodeName } from '../ui-util'

export function nodePositionView(node: NodesEntity) {
  const view = (
    <p className="text-base font-semibold font-sans align-middle text-center -mt-[6px]">
      <span className="inline-block align-middle" data-test-id="node-position--name">
        {nodeName(node)}
      </span>
    </p>
  )

  return renderToString(view)
}
