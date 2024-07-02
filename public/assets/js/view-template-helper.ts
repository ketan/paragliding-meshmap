import ejs from 'ejs'
import * as luxon from 'luxon'
import { NodesEntity } from './database'
import { HardwareModelLookups, NodeRoleTypes } from './hardware-modules'
import nodePositionTemplate from './templates/node-position.ejs?raw'
import nodeTooltipTemplate from './templates/node-tooltip.ejs?raw'
import { nodeName } from './ui-util'

let _positionViewTemplate: ejs.TemplateFunction
export function nodePositionView(node: Partial<NodesEntity>): string {
  if (!_positionViewTemplate) {
    _positionViewTemplate = ejs.compile(nodePositionTemplate)
  }

  return _positionViewTemplate({ node: node, nodeName: nodeName }).toString()
}

let _tooltipTemplate: ejs.TemplateFunction
export function createTooltipTemplate(node: NodesEntity): string {
  if (!_tooltipTemplate) {
    _tooltipTemplate = ejs.compile(nodeTooltipTemplate)
  }

  return _tooltipTemplate({
    node: node,
    nodeName: nodeName,
    HardwareModelLookups: HardwareModelLookups,
    NodeRoleTypes: NodeRoleTypes,
    imageForModel: imageForModel,
    luxon: luxon,
  }).toString()
}

function importAll(r: any) {
  return r.keys().map(r)
}

// const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/))

const allImages = importAll(require.context('../images/devices', false, /\.(png|jpe?g|svg)$/))
console.log(require.context('../images/devices', false, /\.(png|jpe?g|svg)$/))
console.log(allImages);
const hardwareModelLookup: Record<number, string> = {}
for (const path in allImages) {
  const imageNameWithoutExtension = path.split('/').at(-1)!.replace('.png', '')

  hardwareModelLookup[HardwareModelLookups[imageNameWithoutExtension] as number] = allImages(path).default
}

export function imageForModel(modelId: number) {
  return hardwareModelLookup[modelId]
}
