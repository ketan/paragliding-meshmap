import { NodesEntity } from '../database'
import { nodeName } from '../ui-util'

export default (node: NodesEntity) => (
  <p className="text-base font-semibold font-sans align-middle text-center -mt-[6px]">
    <span className="inline-block align-middle" data-test-id="node-position--name">
      {nodeName(node)}
    </span>
  </p>
)
