import { channelSetFromUrl, getDeviceProfile } from '#helpers/create-device-profile'

const profile = getDeviceProfile(process.argv[2])
console.log(JSON.stringify(profile, null, 2))
console.log('channelset')
console.log(JSON.stringify(channelSetFromUrl(profile.channelUrl!), null, 2))
