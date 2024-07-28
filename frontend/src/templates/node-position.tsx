import { renderToString } from 'react-dom/server'
import { NodeNameAttributes } from '../nodes-entity'
import { nodeName } from '../ui-util'

export function nodePositionView(node: Partial<NodeNameAttributes>) {
  const view = (
    <p className="text-base font-semibold font-sans align-middle text-center node-position -mt-[3px]">
      <span className="inline-block align-middle" style={{ whiteSpaceCollapse: 'preserve' }} data-test-id="node-position--name">
        {nodeName(node)}
      </span>
    </p>
  )

  return renderToString(view)
}
