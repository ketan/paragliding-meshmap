export interface Neighbour {
  nodeId: number
  snr: number
}

export interface HardwareModel {
  count: number
  hardwareModel: number
}

export interface Neighbors {
  nodeId: number
  snr: number
}

interface Message {
  text: string
  time: string
}

export interface MessageIn extends Message {
  from: number
}

export interface MessageOut extends Message {
  to: number
}

export type All = `all`

export type NodeActivity = 'fly' | 'concern' | 'hike' | undefined
