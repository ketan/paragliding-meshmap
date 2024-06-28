import { Data, MeshPacket } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import crypto from 'crypto'

function createNonce(packetId: number, fromNode: number) {
  // Expand packetId to 64 bits
  const packetId64 = BigInt(packetId)

  // Initialize block counter (32-bit, starts at zero)
  const blockCounter = 0

  // Create a buffer for the nonce
  const buf = Buffer.alloc(16)

  // Write packetId, fromNode, and block counter to the buffer
  buf.writeBigUInt64LE(packetId64, 0)
  buf.writeUInt32LE(fromNode, 8)
  buf.writeUInt32LE(blockCounter, 12)

  return buf
}

function algorithmForKey(key: Buffer) {
  if (key.length === 16) {
    return 'aes-128-ctr'
  } else if (key.length === 32) {
    return 'aes-256-ctr'
  } else {
    // skip this key, try the next one...
    // logger.warn(`Skipping decryption key with invalid length: ${key.length}`)
  }
}

export function decrypt(packet: MeshPacket, decryptionKeys: string[]): { value: Data; case: 'decoded' } | null {
  if (packet.payloadVariant.case == 'decoded') {
    return packet.payloadVariant
  }

  if (packet.payloadVariant.case === 'encrypted') {
    for (const eachKey in decryptionKeys) {
      try {
        const key = Buffer.from(eachKey, 'base64')

        const nonceBuffer = createNonce(packet.id, packet.from)

        const algorithm = algorithmForKey(key)

        if (!algorithm) {
          continue // next key
        }

        // create decipher
        const decipher = crypto.createDecipheriv(algorithm, key, nonceBuffer)

        // decrypt encrypted packet
        const decryptedBuffer = Buffer.concat([decipher.update(packet.payloadVariant.value), decipher.final()])

        // parse as data message
        return { case: 'decoded', value: Data.fromBinary(decryptedBuffer) }
      } catch (ignore) {
        // ignore
      }
    }
  }
  return null
}
