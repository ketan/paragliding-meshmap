import { hgtLog } from '#helpers/logger'
import Hgt from 'node-hgt'
import path from 'path'
import fs from 'fs'

/* The default directory to load HGT files from, can be overriden by tests */
let directory = path.join(import.meta.dirname, '..', '..', 'hgt')

export function setDirectory(dir: string) {
  directory = dir
}

function loadHgt(latitude: number, longitude: number) {
  const degreesLat = Math.floor(latitude)
  const degreesLon = Math.floor(longitude)
  const prefix = (latitude >= 0 ? 'N' : 'S') + degreesLat.toString().padStart(2, '0')
  const suffix = (longitude >= 0 ? 'E' : 'W') + degreesLon.toString().padStart(3, '0')
  const filename = path.join(directory, prefix + suffix + '.HGT')
  if (!fs.existsSync(filename)) {
    return null
  }
  return new Hgt.Hgt(path.join(directory, prefix + suffix + '.HGT'), [degreesLat, degreesLon])
}

/*
 * Lookup the ground level for the latitude and longitude
 * as represented in (floating point) degrees.
 */
export function lookupHgt(latitude: number, longitude: number): number | null {
  const hgt = loadHgt(latitude, longitude)

  if (!hgt) {
    hgtLog('no HGT data available for these coordinates', latitude, longitude)
    return null
  }

  // Return elevation in meters above sea level.
  // By default, elevation is interpolated bilinearly.
  return hgt.getElevation([latitude, longitude])
}

/*
 * Lookup the ground level for the latitude and longitude
 * as represented in integers. Each integer is multiplied
 * by 1-e7 to get the degrees.
 */
export function lookupAglI(
  altitude: number | null | undefined,
  latitude: number | null | undefined,
  longitude: number | null | undefined
): number | null {
  if (typeof altitude != 'number' || typeof latitude != 'number' || typeof longitude != 'number') {
    return null
  }
  const groundLevel = lookupHgt(latitude / 10000000, longitude / 10000000)
  if (groundLevel === null) {
    return null
  }
  return Math.max(0, altitude - Math.round(groundLevel))
}
