export function toBigInt(str: bigint | number | string | undefined | null): number | undefined {
  if (typeof str === 'number') {
    return str
  }

  if (str === undefined || str === null || (typeof str === 'string' && str.trim().length === 0)) {
    return
  }

  const hexVal = (str as string).replace('!', '').replaceAll('\0', '')
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

export function ignorableProtobufError(e: Error) {
  if (e instanceof RangeError) {
    return true
  }
  if (e instanceof Error && (e.message.startsWith('illegal tag: field no ') || e.message.startsWith('cant skip wire type'))) {
    return true
  }
  return false
}
