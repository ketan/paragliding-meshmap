import { createDeviceProfile } from '#helpers/create-device-profile'
import { errLog } from '#helpers/logger'
import { meshtastic } from './gen/meshtastic-protobufs.js'

createDeviceProfile('foo', 'bar', 'baz', 'xxx')

// const loraConfig = deviceProfile.config?.lora

// const chset = new meshtastic.ChannelSet({
//   settings: [
//     new meshtastic.ChannelSettings({
//       id: 1,
//     }),
//   ],
//   loraConfig: loraConfig,
// })

// Primary channel URL:yy                https://meshtastic.org/e/#CgkSAQEoAToCCCASDwgBOApAA0gBUB5oAcAGAQ
// Complete URL (includes all channels): https://meshtastic.org/e/#CgkSAQEoAToCCCAKDhIBPBoFYWRtaW4oATABEg8IATgKQANIAVAeaAHABgE

// console.log(new Buffer(meshtastic.ChannelSet.encode(chset).finish()).toString('base64url'))

// Primary channel URL:yy https://meshtastic.org/e/#CigSIHD-MoVY5IeWN-6xd9_m2JYt9rj3Xa4-kbPQC9AFIjxzKAE6AgggEg8IATgKQANIAVAeaAHABgE
// Complete URL (includes all channels): https://meshtastic.org/e/#CigSIHD-MoVY5IeWN-6xd9_m2JYt9rj3Xa4-kbPQC9AFIjxzKAE6AgggCi0SIDRwbLozT88dR58QGGz-sTzg6QQ_7dCYZ2xbI0_KsYeAGgVhZG1pbigBMAESDwgBOApAA0gBUB5oAcAGAQ

// Lf
// cP4yhVjkh5Y37rF33+bYli32uPddrj6Rs9AL0AUiPHM=
// Admin NHBsujNPzx1HnxAYbP6xPODpBD/t0JhnbFsjT8qxh4A=
// https://meshtastic.org/e/#CigSIHD-MoVY5IeWN-6xd9_m2JYt9rj3Xa4-kbPQC9AFIjxzKAE6AgggCi0SIDRwbLozT88dR58QGGz-sTzg6QQ_7dCYZ2xbI0_KsYeAGgVhZG1pbigBMAESDwgBOApAA0gBUB5oAcAGAQ

const buf = Buffer.from(
  'CgkSAQEoAToCCCAKDhIBPBoFYWRtaW4oATABEg8IATgKQANIAVAeaAHABgE'
    .replace('_', '/')
    .replace('-', '+'),
  'base64url'
)
errLog(meshtastic.ChannelSet.decode(buf))

// CigSIHD-MoVY5IeWN-6xd9_m2JYt9rj3Xa4-kbPQC9AFIjxzKAE6AgggCg0SABoFYWRtaW4oATABEg8IATgKQANIAVAAaAHABgE
