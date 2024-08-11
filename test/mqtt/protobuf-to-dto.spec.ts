import { parseProtobuf } from '#helpers/utils'
import { meshtastic } from '../../src/gen/meshtastic-protobufs.js'
import { toMapReport, toNeighborInfo, toNode, toPosition, toTextMessage } from '#mqtt/protobuf-to-dto'
import { expect } from 'chai'

describe('protobuf-to-dto', () => {
  it('should create text message', () => {
    /*
    protobuf 0a3a0da4eacb75156207aac422100801120c54657374206d657373616765352d95515f3df4bab86645000018c1500160f9feffffffffffffff01780312084c6f6e67466173741a09216334613631393538
    portnum TEXT_MESSAGE_APP
    ServiceEnvelope {
      packet: MeshPacket {
        from: 1976298148,
        to: 3299477346,
        decoded: Data {
          portnum: 1,
          payload: <Buffer 54 65 73 74 20 6d 65 73 73 61 67 65>
        },
        id: 1599182125,
        rxTime: 1723382516,
        rxSnr: -9.5,
        wantAck: true,
        rxRssi: -135,
        hopStart: 3
      },
      channelId: 'LongFast',
      gatewayId: '!c4a61958'
    }
    */

    const rawData =
      '0a3a0da4eacb75156207aac422100801120c54657374206d657373616765352d95515f3df4bab86645000018c1500160f9feffffffffffffff01780312084c6f6e67466173741a09216334613631393538'
    const envelope = parseProtobuf(() => meshtastic.ServiceEnvelope.decode(new Buffer(rawData, 'hex')))

    const tm = toTextMessage(envelope)
    expect(tm).to.deep.eq({
      channelId: 'LongFast',
      channel: 0,
      from: 1976298148,
      to: 3299477346,
      packetId: 1599182125,
      text: 'Test message',
      wantResponse: true,
      gatewayId: Number('0xc4a61958'),
      hopLimit: 0,
      rxRssi: -135,
      rxSnr: -9.5,
      rxTime: 1723382516,

      createdAt: undefined,
      updatedAt: undefined,
      id: undefined,
    })
  })

  it('should create position', () => {
    /*
      protobuf 0a3b0d08a7594315ffffffff22130803120f0db3d0f115158bd4a5b71873b80120353422e83d3dd9bbb866450000204060b3ffffffffffffffff01780512084c6f6e67466173741a09216132306131316238
      portnum POSITION_APP
      ServiceEnvelope {
        packet: MeshPacket {
          from: 1129948936,
          to: 4294967295,
          decoded: Data {
            portnum: 3,
            payload: <Buffer 0d b3 d0 f1 15 15 8b d4 a5 b7 18 73 b8 01 20>
          },
          id: 1038623284,
          rxTime: 1723382745,
          rxSnr: 2.5,
          rxRssi: -77,
          hopStart: 5
        },
        channelId: 'LongFast',
        gatewayId: '!a20a11b8'
      }
    */

    const rawData =
      '0a3b0d08a7594315ffffffff22130803120f0db3d0f115158bd4a5b71873b80120353422e83d3dd9bbb866450000204060b3ffffffffffffffff01780512084c6f6e67466173741a09216132306131316238'

    const position = toPosition(parseProtobuf(() => meshtastic.ServiceEnvelope.decode(new Buffer(rawData, 'hex'))))

    expect(position).to.deep.eq({
      altitude: 115,
      channel: 0,
      channelId: 'LongFast',
      from: 1129948936,
      gatewayId: Number('0xa20a11b8'),
      latitude: 368169139,
      longitude: -1213868917,
      nodeId: 1129948936,
      packetId: 1038623284,
      to: 4294967295,
      //
      createdAt: undefined,
      updatedAt: undefined,
      id: undefined,
    })
  })

  it('should create node', () => {
    /*
      protobuf 0a5d0df8f375fa1548de56da22430804123a0a09216661373566336638121d32333934202d2048617a657273776f756465207264f09f97bcf09f8c901a04487a64772206f412fa75f3f8282c354f79226635dbb577413d76bdb8665846780212084c6f6e67466173741a09216661373566336638
      portnum NODEINFO_APP
      ServiceEnvelope {
        packet: MeshPacket {
          from: 4202034168,
          to: 3663126088,
          decoded: Data {
            portnum: 4,
            payload: <Buffer 0a 09 21 66 61 37 35 66 33 66 38 12 1d 32 33 39 34 20 2d 20 48 61 7a 65 72 73 77 6f 75 64 65 20 72 64 f0 9f 97 bc f0 9f 8c 90 1a 04 48 7a 64 77 22 06 ... 8 more bytes>,
            requestId: 1713535311
          },
          id: 1098364379,
          rxTime: 1723383158,
          priority: 70,
          hopStart: 2
        },
        channelId: 'LongFast',
        gatewayId: '!fa75f3f8'
      }
    */
    const rawData =
      '0a5d0df8f375fa1548de56da22430804123a0a09216661373566336638121d32333934202d2048617a657273776f756465207264f09f97bcf09f8c901a04487a64772206f412fa75f3f8282c354f79226635dbb577413d76bdb8665846780212084c6f6e67466173741a09216661373566336638'

    const node = toNode(parseProtobuf(() => meshtastic.ServiceEnvelope.decode(new Buffer(rawData, 'hex'))))

    expect(node).to.deep.eq({
      longName: '2394 - Hazerswoude rd🗼🌐',
      nodeId: 4202034168,
      role: 0,
      shortName: 'Hzdw',
      hardwareModel: 44,
      isLicensed: false,

      airUtilTx: undefined,
      altitude: undefined,
      barometricPressure: undefined,
      batteryLevel: undefined,
      channelUtilization: undefined,
      createdAt: undefined,
      firmwareVersion: undefined,
      hasDefaultChannel: undefined,
      inbox: undefined,
      latitude: undefined,
      longitude: undefined,
      modemPreset: undefined,
      mqttConnectionState: undefined,
      mqttConnectionStateUpdatedAt: undefined,
      neighbourBroadcastIntervalSecs: undefined,
      neighbours: undefined,
      neighboursUpdatedAt: undefined,
      numOnlineLocalNodes: undefined,
      outbox: undefined,
      positionPrecision: undefined,
      positionUpdatedAt: undefined,
      region: undefined,
      relativeHumidity: undefined,
      temperature: undefined,
      updatedAt: undefined,
      uptimeSeconds: undefined,
      voltage: undefined,
    })
  })

  xit('should create waypoint', () => {})

  it('should create neighbour info', () => {
    /*
      protobuf 0a550d245e63da15ffffffff222d0847122908a4bc8dd30d1084fe90d10e188407220b08a8af83eb011500004cc1220b08d4ad95d30d15000092c135a91709433d7eabb86645000088c1480160f1feffffffffffffff0112084c6f6e67466173741a09216561323433663034
      portnum NEIGHBORINFO_APP
      ServiceEnvelope {
        packet: MeshPacket {
          from: 3663945252,
          to: 4294967295,
          decoded: Data {
            portnum: 71,
            payload: <Buffer 08 a4 bc 8d d3 0d 10 84 fe 90 d1 0e 18 84 07 22 0b 08 a8 af 83 eb 01 15 00 00 4c c1 22 0b 08 d4 ad 95 d3 0d 15 00 00 92 c1>
          },
          id: 1124669353,
          rxTime: 1723378558,
          rxSnr: -17,
          hopLimit: 1,
          rxRssi: -143
        },
        channelId: 'LongFast',
        gatewayId: '!ea243f04'
      }
     */

    const rawData =
      '0a550d245e63da15ffffffff222d0847122908a4bc8dd30d1084fe90d10e188407220b08a8af83eb011500004cc1220b08d4ad95d30d15000092c135a91709433d7eabb86645000088c1480160f1feffffffffffffff0112084c6f6e67466173741a09216561323433663034'

    const envelope = parseProtobuf(() => meshtastic.ServiceEnvelope.decode(new Buffer(rawData, 'hex')))
    const neighbourInfo = toNeighborInfo(envelope)

    expect(neighbourInfo).to.deep.eq({
      nodeId: 3663945252,
      nodeBroadcastIntervalSecs: 900,
      neighbours: [
        { nodeId: 492885928, snr: -12.75 },
        { nodeId: 3664074452, snr: -18.25 },
      ],
      //
      updatedAt: undefined,
      createdAt: undefined,
      id: undefined,
    })
  })

  xit('should create power metric', () => {})
  xit('should create environment metric', () => {})
  xit('should create device metric', () => {})
  xit('should create traceroute', () => {})
  it('should create map report', () => {
    /*
      protobuf 0a630d6405564315ffffffff2257084912530a234d616e617761747520526f757465722026204d515454204761746577617920f09f8c901204325652311803202b2a0d322e332e362e37613335373061300640014d303f29e8556425bd6858d1046020683e12084c6f6e67466173741a09213433353630353634
      portnum MAP_REPORT_APP
      ServiceEnvelope {
        packet: MeshPacket {
          from: 1129710948,
          to: 4294967295,
          decoded: Data {
            portnum: 73,
            payload: <Buffer 0a 23 4d 61 6e 61 77 61 74 75 20 52 6f 75 74 65 72 20 26 20 4d 51 54 54 20 47 61 74 65 77 61 79 20 f0 9f 8c 90 12 04 32 56 52 31 18 03 20 2b 2a 0d 32 ... 33 more bytes>
          }
        },
        channelId: 'LongFast',
        gatewayId: '!43560564'
      }
     */

    const rawData =
      '0a630d6405564315ffffffff2257084912530a234d616e617761747520526f757465722026204d515454204761746577617920f09f8c901204325652311803202b2a0d322e332e362e37613335373061300640014d303f29e8556425bd6858d1046020683e12084c6f6e67466173741a09213433353630353634'

    const envelope = parseProtobuf(() => meshtastic.ServiceEnvelope.decode(new Buffer(rawData, 'hex')))
    const mapReport = toMapReport(envelope)

    expect(mapReport).to.deep.eq({
      updatedAt: undefined,
      createdAt: undefined,
      id: undefined,

      nodeId: 1129710948,
      longName: 'Manawatu Router & MQTT Gateway 🌐',
      shortName: '2VR1',
      role: 3,
      hardwareModel: 43,
      firmwareVersion: '2.3.6.7a3570a',
      region: 6,
      modemPreset: 0,
      hasDefaultChannel: true,
      latitude: -399950032,
      longitude: 1757226340,
      altitude: 593,
      positionPrecision: 32,
      numOnlineLocalNodes: 62,
    })
  })
})
