// import ejs from 'ejs'
import { NodesEntity } from './database'
import { HardwareModelLookups } from './hardware-modules'
// import nodePositionTemplate from './templates/node-position.ejs?raw'
// import nodeTooltipTemplate from './templates/node-tooltip.ejs?raw'
import { nodeName } from './ui-util'

export function nodePositionView(node: Partial<NodesEntity>): string {
  const positionViewTemplate = (
    <p class="text-base font-semibold font-sans align-middle text-center -mt-[6px]">
      <span class="inline-block align-middle" data-test-id="node-position--name">
        {nodeName(node)}
      </span>
    </p>
  )

  console.log(positionViewTemplate)
  debugger

  return ''
  // return _positionViewTemplate({ node: node, nodeName: nodeName }).toString()
}

export function createTooltipTemplate(node: NodesEntity): string {
  // if (!_tooltipTemplate) {
  //   _tooltipTemplate = ejs.compile(nodeTooltipTemplate)
  // }

  // return _tooltipTemplate({
  //   node: node,
  //   nodeName: nodeName,
  //   HardwareModelLookups: HardwareModelLookups,
  //   NodeRoleTypes: NodeRoleTypes,
  //   imageForModel: imageForModel,
  //   luxon: luxon,
  // }).toString()
  node.toString()
  return ''
}

function importAll(r: any) {
  return r.keys().map(r)
}

// const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/))

const allImages = importAll(require.context('../images/devices', false, /\.(png|jpe?g|svg)$/))
console.log(require.context('../images/devices', false, /\.(png|jpe?g|svg)$/))
console.log(allImages)
const hardwareModelLookup: Record<number, string> = {}
for (const path in allImages) {
  const imageNameWithoutExtension = path.split('/').at(-1)!.replace('.png', '')

  hardwareModelLookup[HardwareModelLookups[imageNameWithoutExtension] as number] = allImages(path).default
}

export function imageForModel(modelId: number) {
  return hardwareModelLookup[modelId]
}
