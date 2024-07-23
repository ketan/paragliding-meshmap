/* eslint-disable @typescript-eslint/no-namespace */
// declare global {
// namespace PrismaJson {

// }
// }
declare global {
  namespace PrismaJson {
    export type Route = bigint | number
    export type Neighbours = {
      nodeId: number
      snr: number
    }

    export type Message = {
      text: string
      time: string
    }

    export type MessageIn = {
      text: string
      time: string
      from: bigint | number
    }

    export type MessageOut = {
      text: string
      time: string
      to: bigint | number
    }
  }
}

// export default {}
