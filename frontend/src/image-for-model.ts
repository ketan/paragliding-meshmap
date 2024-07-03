import { HardwareModelNameToID } from './hardware-modules'

const allImages = import.meta.glob('./assets/images/devices/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, query: '?url', import: 'default' })
const hardwareModelLookup: Record<number, string> = {}

for (const path in allImages) {
  const imageNameWithoutExtension = path.split('/').at(-1)!.replace('.png', '')

  if (allImages[path]) {
    const modelId = HardwareModelNameToID[imageNameWithoutExtension]
    if (modelId) {
      hardwareModelLookup[modelId] = allImages[path] as string
    }
  }
}

export function imageForModel(modelId?: number) {
  if (modelId) {
    return hardwareModelLookup[modelId]
  }
}
