export interface Neighbors {
  nodeId: number
  snr: number
}

export interface MessageIn {
  from: bigint
}
export interface MessageOut {
  to: bigint
}
