import { AbortError } from 'p-retry'

export function toBigInt(str: number | string | undefined | null): number | undefined {
  if (typeof str === 'number') {
    return str
  }

  if (str === undefined || str === null || (typeof str === 'string' && str.trim().length === 0)) {
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
    return f()
  } catch (e) {
    throw new AbortError(e)
  }
}
