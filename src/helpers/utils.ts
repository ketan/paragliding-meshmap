import { AbortError } from 'p-retry'
import { protobufDecode } from '#helpers/logger'

export const BROADCAST_ADDR = Number('0xffffffff')

export function toBigInt(str: number | string | undefined | null): number | undefined {
  if (typeof str === 'number') {
    return str
  }

  if (str === undefined || str === null || str.trim().length === 0) {
    return
  }

  const hexVal = str.replace('!', '').replaceAll('\0', '')
  let returnValue
  if (hexVal.startsWith('0x')) {
    returnValue = Number(hexVal)
  } else {
    returnValue = Number('0x' + hexVal)
  }

  if (isNaN(returnValue)) {
    return
  } else {
    return returnValue
  }
}

export function secondsAgo(secs: number) {
  return new Date(Date.now() - secs * 1000)
}

export function parseProtobuf<T>(f: () => T): T {
  try {
    const protobuf = f()
    protobufDecode(protobuf)
    return protobuf
  } catch (e: unknown) {
    if (typeof e === 'string' || e instanceof Error) {
      throw new AbortError(e)
    } else if (e) {
      throw new AbortError((e as object).toString())
    } else {
      throw new AbortError(`Unknown error parsing protobuf`)
    }
  }
}

export function mandatoryEnv(key: string) {
  const value = process.env[key]
  if (value === null || value === undefined) {
    throw `Environment variable ${key} is not defined`
  }
  return value
}
