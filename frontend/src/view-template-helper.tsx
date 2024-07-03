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

const allImages = import.meta.glob('./assets/images/devices/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, query: '?url', import: 'default' })

const hardwareModelLookup: Record<number, string> = {}
for (const path in allImages) {
  const imageNameWithoutExtension = path.split('/').at(-1)!.replace('.png', '')

  if (allImages[path]) {
    hardwareModelLookup[HardwareModelLookups[imageNameWithoutExtension] as number] = allImages[path] as string
  }
}
console.log(hardwareModelLookup)

export function imageForModel(modelId: number) {
  return hardwareModelLookup[modelId]
}
