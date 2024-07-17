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
