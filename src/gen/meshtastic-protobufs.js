/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from 'protobufjs/minimal.js'

// Common aliases
const $Reader = $protobuf.Reader,
  $util = $protobuf.util

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

export const meshtastic = ($root.meshtastic = (() => {
  /**
   * Namespace meshtastic.
   * @exports meshtastic
   * @namespace
   */
  const meshtastic = {}

  meshtastic.ServiceEnvelope = (function () {
    /**
     * Properties of a ServiceEnvelope.
     * @memberof meshtastic
     * @interface IServiceEnvelope
     * @property {meshtastic.IMeshPacket|null} [packet] The (probably encrypted) packet
     * @property {string|null} [channelId] The global channel ID it was sent on
     * @property {string|null} [gatewayId] The sending gateway node ID. Can we use this to authenticate/prevent fake
     * nodeid impersonation for senders? - i.e. use gateway/mesh id (which is authenticated) + local node id as
     * the globally trusted nodenum
     */

    /**
     * Constructs a new ServiceEnvelope.
     * @memberof meshtastic
     * @classdesc This message wraps a MeshPacket with extra metadata about the sender and how it arrived.
     * @implements IServiceEnvelope
     * @constructor
     * @param {meshtastic.IServiceEnvelope=} [properties] Properties to set
     */
    function ServiceEnvelope(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The (probably encrypted) packet
     * @member {meshtastic.IMeshPacket|null|undefined} packet
     * @memberof meshtastic.ServiceEnvelope
     * @instance
     */
    ServiceEnvelope.prototype.packet = null

    /**
     * The global channel ID it was sent on
     * @member {string|null|undefined} channelId
     * @memberof meshtastic.ServiceEnvelope
     * @instance
     */
    ServiceEnvelope.prototype.channelId = null

    /**
     * The sending gateway node ID. Can we use this to authenticate/prevent fake
     * nodeid impersonation for senders? - i.e. use gateway/mesh id (which is authenticated) + local node id as
     * the globally trusted nodenum
     * @member {string|null|undefined} gatewayId
     * @memberof meshtastic.ServiceEnvelope
     * @instance
     */
    ServiceEnvelope.prototype.gatewayId = null

    /**
     * Decodes a ServiceEnvelope message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ServiceEnvelope
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ServiceEnvelope} ServiceEnvelope
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServiceEnvelope.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ServiceEnvelope()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.packet = $root.meshtastic.MeshPacket.decode(reader, reader.uint32())
            break
          }
          case 2: {
            message.channelId = reader.string()
            break
          }
          case 3: {
            message.gatewayId = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return ServiceEnvelope
  })()

  meshtastic.MapReport = (function () {
    /**
     * Properties of a MapReport.
     * @memberof meshtastic
     * @interface IMapReport
     * @property {string|null} [longName] A full name for this user, i.e. "Kevin Hester"
     * @property {string|null} [shortName] A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     * @property {meshtastic.Config.DeviceConfig.Role|null} [role] Role of the node that applies specific settings for a particular use-case
     * @property {meshtastic.HardwareModel|null} [hwModel] Hardware model of the node, i.e. T-Beam, Heltec V3, etc...
     * @property {string|null} [firmwareVersion] Device firmware version string
     * @property {meshtastic.Config.LoRaConfig.RegionCode|null} [region] The region code for the radio (US, CN, EU433, etc...)
     * @property {meshtastic.Config.LoRaConfig.ModemPreset|null} [modemPreset] Modem preset used by the radio (LongFast, MediumSlow, etc...)
     * @property {boolean|null} [hasDefaultChannel] Whether the node has a channel with default PSK and name (LongFast, MediumSlow, etc...)
     * and it uses the default frequency slot given the region and modem preset.
     * @property {number|null} [latitudeI] Latitude: multiply by 1e-7 to get degrees in floating point
     * @property {number|null} [longitudeI] Longitude: multiply by 1e-7 to get degrees in floating point
     * @property {number|null} [altitude] Altitude in meters above MSL
     * @property {number|null} [positionPrecision] Indicates the bits of precision for latitude and longitude set by the sending node
     * @property {number|null} [numOnlineLocalNodes] Number of online nodes (heard in the last 2 hours) this node has in its list that were received locally (not via MQTT)
     */

    /**
     * Constructs a new MapReport.
     * @memberof meshtastic
     * @classdesc Information about a node intended to be reported unencrypted to a map using MQTT.
     * @implements IMapReport
     * @constructor
     * @param {meshtastic.IMapReport=} [properties] Properties to set
     */
    function MapReport(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * A full name for this user, i.e. "Kevin Hester"
     * @member {string|null|undefined} longName
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.longName = null

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     * @member {string|null|undefined} shortName
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.shortName = null

    /**
     * Role of the node that applies specific settings for a particular use-case
     * @member {meshtastic.Config.DeviceConfig.Role|null|undefined} role
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.role = null

    /**
     * Hardware model of the node, i.e. T-Beam, Heltec V3, etc...
     * @member {meshtastic.HardwareModel|null|undefined} hwModel
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.hwModel = null

    /**
     * Device firmware version string
     * @member {string|null|undefined} firmwareVersion
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.firmwareVersion = null

    /**
     * The region code for the radio (US, CN, EU433, etc...)
     * @member {meshtastic.Config.LoRaConfig.RegionCode|null|undefined} region
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.region = null

    /**
     * Modem preset used by the radio (LongFast, MediumSlow, etc...)
     * @member {meshtastic.Config.LoRaConfig.ModemPreset|null|undefined} modemPreset
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.modemPreset = null

    /**
     * Whether the node has a channel with default PSK and name (LongFast, MediumSlow, etc...)
     * and it uses the default frequency slot given the region and modem preset.
     * @member {boolean|null|undefined} hasDefaultChannel
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.hasDefaultChannel = null

    /**
     * Latitude: multiply by 1e-7 to get degrees in floating point
     * @member {number|null|undefined} latitudeI
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.latitudeI = null

    /**
     * Longitude: multiply by 1e-7 to get degrees in floating point
     * @member {number|null|undefined} longitudeI
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.longitudeI = null

    /**
     * Altitude in meters above MSL
     * @member {number|null|undefined} altitude
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.altitude = null

    /**
     * Indicates the bits of precision for latitude and longitude set by the sending node
     * @member {number|null|undefined} positionPrecision
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.positionPrecision = null

    /**
     * Number of online nodes (heard in the last 2 hours) this node has in its list that were received locally (not via MQTT)
     * @member {number|null|undefined} numOnlineLocalNodes
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.numOnlineLocalNodes = null

    /**
     * Decodes a MapReport message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.MapReport
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.MapReport} MapReport
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MapReport.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.MapReport()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.longName = reader.string()
            break
          }
          case 2: {
            message.shortName = reader.string()
            break
          }
          case 3: {
            message.role = reader.int32()
            break
          }
          case 4: {
            message.hwModel = reader.int32()
            break
          }
          case 5: {
            message.firmwareVersion = reader.string()
            break
          }
          case 6: {
            message.region = reader.int32()
            break
          }
          case 7: {
            message.modemPreset = reader.int32()
            break
          }
          case 8: {
            message.hasDefaultChannel = reader.bool()
            break
          }
          case 9: {
            message.latitudeI = reader.sfixed32()
            break
          }
          case 10: {
            message.longitudeI = reader.sfixed32()
            break
          }
          case 11: {
            message.altitude = reader.int32()
            break
          }
          case 12: {
            message.positionPrecision = reader.uint32()
            break
          }
          case 13: {
            message.numOnlineLocalNodes = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return MapReport
  })()

  meshtastic.Config = (function () {
    /**
     * Properties of a Config.
     * @memberof meshtastic
     * @interface IConfig
     * @property {meshtastic.Config.IDeviceConfig|null} [device] Config device
     * @property {meshtastic.Config.IPositionConfig|null} [position] Config position
     * @property {meshtastic.Config.IPowerConfig|null} [power] Config power
     * @property {meshtastic.Config.INetworkConfig|null} [network] Config network
     * @property {meshtastic.Config.IDisplayConfig|null} [display] Config display
     * @property {meshtastic.Config.ILoRaConfig|null} [lora] Config lora
     * @property {meshtastic.Config.IBluetoothConfig|null} [bluetooth] Config bluetooth
     */

    /**
     * Constructs a new Config.
     * @memberof meshtastic
     * @classdesc Represents a Config.
     * @implements IConfig
     * @constructor
     * @param {meshtastic.IConfig=} [properties] Properties to set
     */
    function Config(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Config device.
     * @member {meshtastic.Config.IDeviceConfig|null|undefined} device
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.device = null

    /**
     * Config position.
     * @member {meshtastic.Config.IPositionConfig|null|undefined} position
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.position = null

    /**
     * Config power.
     * @member {meshtastic.Config.IPowerConfig|null|undefined} power
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.power = null

    /**
     * Config network.
     * @member {meshtastic.Config.INetworkConfig|null|undefined} network
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.network = null

    /**
     * Config display.
     * @member {meshtastic.Config.IDisplayConfig|null|undefined} display
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.display = null

    /**
     * Config lora.
     * @member {meshtastic.Config.ILoRaConfig|null|undefined} lora
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.lora = null

    /**
     * Config bluetooth.
     * @member {meshtastic.Config.IBluetoothConfig|null|undefined} bluetooth
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.bluetooth = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Payload Variant
     * @member {"device"|"position"|"power"|"network"|"display"|"lora"|"bluetooth"|undefined} payloadVariant
     * @memberof meshtastic.Config
     * @instance
     */
    Object.defineProperty(Config.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(($oneOfFields = ['device', 'position', 'power', 'network', 'display', 'lora', 'bluetooth'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a Config message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Config
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Config} Config
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Config.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Config()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.device = $root.meshtastic.Config.DeviceConfig.decode(reader, reader.uint32())
            break
          }
          case 2: {
            message.position = $root.meshtastic.Config.PositionConfig.decode(reader, reader.uint32())
            break
          }
          case 3: {
            message.power = $root.meshtastic.Config.PowerConfig.decode(reader, reader.uint32())
            break
          }
          case 4: {
            message.network = $root.meshtastic.Config.NetworkConfig.decode(reader, reader.uint32())
            break
          }
          case 5: {
            message.display = $root.meshtastic.Config.DisplayConfig.decode(reader, reader.uint32())
            break
          }
          case 6: {
            message.lora = $root.meshtastic.Config.LoRaConfig.decode(reader, reader.uint32())
            break
          }
          case 7: {
            message.bluetooth = $root.meshtastic.Config.BluetoothConfig.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    Config.DeviceConfig = (function () {
      /**
       * Properties of a DeviceConfig.
       * @memberof meshtastic.Config
       * @interface IDeviceConfig
       * @property {meshtastic.Config.DeviceConfig.Role|null} [role] Sets the role of node
       * @property {boolean|null} [serialEnabled] Disabling this will disable the SerialConsole by not initilizing the StreamAPI
       * @property {boolean|null} [debugLogEnabled] By default we turn off logging as soon as an API client connects (to keep shared serial link quiet).
       * Set this to true to leave the debug log outputting even when API is active.
       * @property {number|null} [buttonGpio] For boards without a hard wired button, this is the pin number that will be used
       * Boards that have more than one button can swap the function with this one. defaults to BUTTON_PIN if defined.
       * @property {number|null} [buzzerGpio] For boards without a PWM buzzer, this is the pin number that will be used
       * Defaults to PIN_BUZZER if defined.
       * @property {meshtastic.Config.DeviceConfig.RebroadcastMode|null} [rebroadcastMode] Sets the role of node
       * @property {number|null} [nodeInfoBroadcastSecs] Send our nodeinfo this often
       * Defaults to 900 Seconds (15 minutes)
       * @property {boolean|null} [doubleTapAsButtonPress] Treat double tap interrupt on supported accelerometers as a button press if set to true
       * @property {boolean|null} [isManaged] If true, device is considered to be "managed" by a mesh administrator
       * Clients should then limit available configuration and administrative options inside the user interface
       * @property {boolean|null} [disableTripleClick] Disables the triple-press of user button to enable or disable GPS
       * @property {string|null} [tzdef] POSIX Timezone definition string from https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv.
       * @property {boolean|null} [ledHeartbeatDisabled] If true, disable the default blinking LED (LED_PIN) behavior on the device
       */

      /**
       * Constructs a new DeviceConfig.
       * @memberof meshtastic.Config
       * @classdesc Configuration
       * @implements IDeviceConfig
       * @constructor
       * @param {meshtastic.Config.IDeviceConfig=} [properties] Properties to set
       */
      function DeviceConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Sets the role of node
       * @member {meshtastic.Config.DeviceConfig.Role|null|undefined} role
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.role = null

      /**
       * Disabling this will disable the SerialConsole by not initilizing the StreamAPI
       * @member {boolean|null|undefined} serialEnabled
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.serialEnabled = null

      /**
       * By default we turn off logging as soon as an API client connects (to keep shared serial link quiet).
       * Set this to true to leave the debug log outputting even when API is active.
       * @member {boolean|null|undefined} debugLogEnabled
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.debugLogEnabled = null

      /**
       * For boards without a hard wired button, this is the pin number that will be used
       * Boards that have more than one button can swap the function with this one. defaults to BUTTON_PIN if defined.
       * @member {number|null|undefined} buttonGpio
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.buttonGpio = null

      /**
       * For boards without a PWM buzzer, this is the pin number that will be used
       * Defaults to PIN_BUZZER if defined.
       * @member {number|null|undefined} buzzerGpio
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.buzzerGpio = null

      /**
       * Sets the role of node
       * @member {meshtastic.Config.DeviceConfig.RebroadcastMode|null|undefined} rebroadcastMode
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.rebroadcastMode = null

      /**
       * Send our nodeinfo this often
       * Defaults to 900 Seconds (15 minutes)
       * @member {number|null|undefined} nodeInfoBroadcastSecs
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.nodeInfoBroadcastSecs = null

      /**
       * Treat double tap interrupt on supported accelerometers as a button press if set to true
       * @member {boolean|null|undefined} doubleTapAsButtonPress
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.doubleTapAsButtonPress = null

      /**
       * If true, device is considered to be "managed" by a mesh administrator
       * Clients should then limit available configuration and administrative options inside the user interface
       * @member {boolean|null|undefined} isManaged
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.isManaged = null

      /**
       * Disables the triple-press of user button to enable or disable GPS
       * @member {boolean|null|undefined} disableTripleClick
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.disableTripleClick = null

      /**
       * POSIX Timezone definition string from https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv.
       * @member {string|null|undefined} tzdef
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.tzdef = null

      /**
       * If true, disable the default blinking LED (LED_PIN) behavior on the device
       * @member {boolean|null|undefined} ledHeartbeatDisabled
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.ledHeartbeatDisabled = null

      /**
       * Decodes a DeviceConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.DeviceConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.DeviceConfig} DeviceConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      DeviceConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.DeviceConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.role = reader.int32()
              break
            }
            case 2: {
              message.serialEnabled = reader.bool()
              break
            }
            case 3: {
              message.debugLogEnabled = reader.bool()
              break
            }
            case 4: {
              message.buttonGpio = reader.uint32()
              break
            }
            case 5: {
              message.buzzerGpio = reader.uint32()
              break
            }
            case 6: {
              message.rebroadcastMode = reader.int32()
              break
            }
            case 7: {
              message.nodeInfoBroadcastSecs = reader.uint32()
              break
            }
            case 8: {
              message.doubleTapAsButtonPress = reader.bool()
              break
            }
            case 9: {
              message.isManaged = reader.bool()
              break
            }
            case 10: {
              message.disableTripleClick = reader.bool()
              break
            }
            case 11: {
              message.tzdef = reader.string()
              break
            }
            case 12: {
              message.ledHeartbeatDisabled = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * Defines the device's role on the Mesh network
       * @name meshtastic.Config.DeviceConfig.Role
       * @enum {number}
       * @property {number} CLIENT=0 Description: App connected or stand alone messaging device.
       * Technical Details: Default Role
       * @property {number} CLIENT_MUTE=1 Description: Device that does not forward packets from other devices.
       * @property {number} ROUTER=2 Description: Infrastructure node for extending network coverage by relaying messages. Visible in Nodes list.
       * Technical Details: Mesh packets will prefer to be routed over this node. This node will not be used by client apps.
       * The wifi radio and the oled screen will be put to sleep.
       * This mode may still potentially have higher power usage due to it's preference in message rebroadcasting on the mesh.
       * @property {number} ROUTER_CLIENT=3 ROUTER_CLIENT value
       * @property {number} REPEATER=4 Description: Infrastructure node for extending network coverage by relaying messages with minimal overhead. Not visible in Nodes list.
       * Technical Details: Mesh packets will simply be rebroadcasted over this node. Nodes configured with this role will not originate NodeInfo, Position, Telemetry
       * or any other packet type. They will simply rebroadcast any mesh packets on the same frequency, channel num, spread factor, and coding rate.
       * @property {number} TRACKER=5 Description: Broadcasts GPS position packets as priority.
       * Technical Details: Position Mesh packets will be prioritized higher and sent more frequently by default.
       * When used in conjunction with power.is_power_saving = true, nodes will wake up,
       * send position, and then sleep for position.position_broadcast_secs seconds.
       * @property {number} SENSOR=6 Description: Broadcasts telemetry packets as priority.
       * Technical Details: Telemetry Mesh packets will be prioritized higher and sent more frequently by default.
       * When used in conjunction with power.is_power_saving = true, nodes will wake up,
       * send environment telemetry, and then sleep for telemetry.environment_update_interval seconds.
       * @property {number} TAK=7 Description: Optimized for ATAK system communication and reduces routine broadcasts.
       * Technical Details: Used for nodes dedicated for connection to an ATAK EUD.
       * Turns off many of the routine broadcasts to favor CoT packet stream
       * from the Meshtastic ATAK plugin -> IMeshService -> Node
       * @property {number} CLIENT_HIDDEN=8 Description: Device that only broadcasts as needed for stealth or power savings.
       * Technical Details: Used for nodes that "only speak when spoken to"
       * Turns all of the routine broadcasts but allows for ad-hoc communication
       * Still rebroadcasts, but with local only rebroadcast mode (known meshes only)
       * Can be used for clandestine operation or to dramatically reduce airtime / power consumption
       * @property {number} LOST_AND_FOUND=9 Description: Broadcasts location as message to default channel regularly for to assist with device recovery.
       * Technical Details: Used to automatically send a text message to the mesh
       * with the current position of the device on a frequent interval:
       * "I'm lost! Position: lat / long"
       * @property {number} TAK_TRACKER=10 Description: Enables automatic TAK PLI broadcasts and reduces routine broadcasts.
       * Technical Details: Turns off many of the routine broadcasts to favor ATAK CoT packet stream
       * and automatic TAK PLI (position location information) broadcasts.
       * Uses position module configuration to determine TAK PLI broadcast interval.
       */
      DeviceConfig.Role = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'CLIENT')] = 0
        values[(valuesById[1] = 'CLIENT_MUTE')] = 1
        values[(valuesById[2] = 'ROUTER')] = 2
        values[(valuesById[3] = 'ROUTER_CLIENT')] = 3
        values[(valuesById[4] = 'REPEATER')] = 4
        values[(valuesById[5] = 'TRACKER')] = 5
        values[(valuesById[6] = 'SENSOR')] = 6
        values[(valuesById[7] = 'TAK')] = 7
        values[(valuesById[8] = 'CLIENT_HIDDEN')] = 8
        values[(valuesById[9] = 'LOST_AND_FOUND')] = 9
        values[(valuesById[10] = 'TAK_TRACKER')] = 10
        return values
      })()

      /**
       * Defines the device's behavior for how messages are rebroadcast
       * @name meshtastic.Config.DeviceConfig.RebroadcastMode
       * @enum {number}
       * @property {number} ALL=0 Default behavior.
       * Rebroadcast any observed message, if it was on our private channel or from another mesh with the same lora params.
       * @property {number} ALL_SKIP_DECODING=1 Same as behavior as ALL but skips packet decoding and simply rebroadcasts them.
       * Only available in Repeater role. Setting this on any other roles will result in ALL behavior.
       * @property {number} LOCAL_ONLY=2 Ignores observed messages from foreign meshes that are open or those which it cannot decrypt.
       * Only rebroadcasts message on the nodes local primary / secondary channels.
       * @property {number} KNOWN_ONLY=3 Ignores observed messages from foreign meshes like LOCAL_ONLY,
       * but takes it step further by also ignoring messages from nodenums not in the node's known list (NodeDB)
       */
      DeviceConfig.RebroadcastMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'ALL')] = 0
        values[(valuesById[1] = 'ALL_SKIP_DECODING')] = 1
        values[(valuesById[2] = 'LOCAL_ONLY')] = 2
        values[(valuesById[3] = 'KNOWN_ONLY')] = 3
        return values
      })()

      return DeviceConfig
    })()

    Config.PositionConfig = (function () {
      /**
       * Properties of a PositionConfig.
       * @memberof meshtastic.Config
       * @interface IPositionConfig
       * @property {number|null} [positionBroadcastSecs] We should send our position this often (but only if it has changed significantly)
       * Defaults to 15 minutes
       * @property {boolean|null} [positionBroadcastSmartEnabled] Adaptive position braoadcast, which is now the default.
       * @property {boolean|null} [fixedPosition] If set, this node is at a fixed position.
       * We will generate GPS position updates at the regular interval, but use whatever the last lat/lon/alt we have for the node.
       * The lat/lon/alt can be set by an internal GPS or with the help of the app.
       * @property {boolean|null} [gpsEnabled] Is GPS enabled for this node?
       * @property {number|null} [gpsUpdateInterval] How often should we try to get GPS position (in seconds)
       * or zero for the default of once every 30 seconds
       * or a very large value (maxint) to update only once at boot.
       * @property {number|null} [gpsAttemptTime] Deprecated in favor of using smart / regular broadcast intervals as implicit attempt time
       * @property {number|null} [positionFlags] Bit field of boolean configuration options for POSITION messages
       * (bitwise OR of PositionFlags)
       * @property {number|null} [rxGpio] (Re)define GPS_RX_PIN for your board.
       * @property {number|null} [txGpio] (Re)define GPS_TX_PIN for your board.
       * @property {number|null} [broadcastSmartMinimumDistance] The minimum distance in meters traveled (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled
       * @property {number|null} [broadcastSmartMinimumIntervalSecs] The minimum number of seconds (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled
       * @property {number|null} [gpsEnGpio] (Re)define PIN_GPS_EN for your board.
       * @property {meshtastic.Config.PositionConfig.GpsMode|null} [gpsMode] Set where GPS is enabled, disabled, or not present
       */

      /**
       * Constructs a new PositionConfig.
       * @memberof meshtastic.Config
       * @classdesc Position Config
       * @implements IPositionConfig
       * @constructor
       * @param {meshtastic.Config.IPositionConfig=} [properties] Properties to set
       */
      function PositionConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * We should send our position this often (but only if it has changed significantly)
       * Defaults to 15 minutes
       * @member {number|null|undefined} positionBroadcastSecs
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.positionBroadcastSecs = null

      /**
       * Adaptive position braoadcast, which is now the default.
       * @member {boolean|null|undefined} positionBroadcastSmartEnabled
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.positionBroadcastSmartEnabled = null

      /**
       * If set, this node is at a fixed position.
       * We will generate GPS position updates at the regular interval, but use whatever the last lat/lon/alt we have for the node.
       * The lat/lon/alt can be set by an internal GPS or with the help of the app.
       * @member {boolean|null|undefined} fixedPosition
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.fixedPosition = null

      /**
       * Is GPS enabled for this node?
       * @member {boolean|null|undefined} gpsEnabled
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsEnabled = null

      /**
       * How often should we try to get GPS position (in seconds)
       * or zero for the default of once every 30 seconds
       * or a very large value (maxint) to update only once at boot.
       * @member {number|null|undefined} gpsUpdateInterval
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsUpdateInterval = null

      /**
       * Deprecated in favor of using smart / regular broadcast intervals as implicit attempt time
       * @member {number|null|undefined} gpsAttemptTime
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsAttemptTime = null

      /**
       * Bit field of boolean configuration options for POSITION messages
       * (bitwise OR of PositionFlags)
       * @member {number|null|undefined} positionFlags
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.positionFlags = null

      /**
       * (Re)define GPS_RX_PIN for your board.
       * @member {number|null|undefined} rxGpio
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.rxGpio = null

      /**
       * (Re)define GPS_TX_PIN for your board.
       * @member {number|null|undefined} txGpio
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.txGpio = null

      /**
       * The minimum distance in meters traveled (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled
       * @member {number|null|undefined} broadcastSmartMinimumDistance
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.broadcastSmartMinimumDistance = null

      /**
       * The minimum number of seconds (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled
       * @member {number|null|undefined} broadcastSmartMinimumIntervalSecs
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.broadcastSmartMinimumIntervalSecs = null

      /**
       * (Re)define PIN_GPS_EN for your board.
       * @member {number|null|undefined} gpsEnGpio
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsEnGpio = null

      /**
       * Set where GPS is enabled, disabled, or not present
       * @member {meshtastic.Config.PositionConfig.GpsMode|null|undefined} gpsMode
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsMode = null

      /**
       * Decodes a PositionConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.PositionConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.PositionConfig} PositionConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      PositionConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.PositionConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.positionBroadcastSecs = reader.uint32()
              break
            }
            case 2: {
              message.positionBroadcastSmartEnabled = reader.bool()
              break
            }
            case 3: {
              message.fixedPosition = reader.bool()
              break
            }
            case 4: {
              message.gpsEnabled = reader.bool()
              break
            }
            case 5: {
              message.gpsUpdateInterval = reader.uint32()
              break
            }
            case 6: {
              message.gpsAttemptTime = reader.uint32()
              break
            }
            case 7: {
              message.positionFlags = reader.uint32()
              break
            }
            case 8: {
              message.rxGpio = reader.uint32()
              break
            }
            case 9: {
              message.txGpio = reader.uint32()
              break
            }
            case 10: {
              message.broadcastSmartMinimumDistance = reader.uint32()
              break
            }
            case 11: {
              message.broadcastSmartMinimumIntervalSecs = reader.uint32()
              break
            }
            case 12: {
              message.gpsEnGpio = reader.uint32()
              break
            }
            case 13: {
              message.gpsMode = reader.int32()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * Bit field of boolean configuration options, indicating which optional
       * fields to include when assembling POSITION messages.
       * Longitude, latitude, altitude, speed, heading, and DOP
       * are always included (also time if GPS-synced)
       * NOTE: the more fields are included, the larger the message will be -
       * leading to longer airtime and a higher risk of packet loss
       * @name meshtastic.Config.PositionConfig.PositionFlags
       * @enum {number}
       * @property {number} UNSET=0 Required for compilation
       * @property {number} ALTITUDE=1 Include an altitude value (if available)
       * @property {number} ALTITUDE_MSL=2 Altitude value is MSL
       * @property {number} GEOIDAL_SEPARATION=4 Include geoidal separation
       * @property {number} DOP=8 Include the DOP value ; PDOP used by default, see below
       * @property {number} HVDOP=16 If POS_DOP set, send separate HDOP / VDOP values instead of PDOP
       * @property {number} SATINVIEW=32 Include number of "satellites in view"
       * @property {number} SEQ_NO=64 Include a sequence number incremented per packet
       * @property {number} TIMESTAMP=128 Include positional timestamp (from GPS solution)
       * @property {number} HEADING=256 Include positional heading
       * Intended for use with vehicle not walking speeds
       * walking speeds are likely to be error prone like the compass
       * @property {number} SPEED=512 Include positional speed
       * Intended for use with vehicle not walking speeds
       * walking speeds are likely to be error prone like the compass
       */
      PositionConfig.PositionFlags = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'UNSET')] = 0
        values[(valuesById[1] = 'ALTITUDE')] = 1
        values[(valuesById[2] = 'ALTITUDE_MSL')] = 2
        values[(valuesById[4] = 'GEOIDAL_SEPARATION')] = 4
        values[(valuesById[8] = 'DOP')] = 8
        values[(valuesById[16] = 'HVDOP')] = 16
        values[(valuesById[32] = 'SATINVIEW')] = 32
        values[(valuesById[64] = 'SEQ_NO')] = 64
        values[(valuesById[128] = 'TIMESTAMP')] = 128
        values[(valuesById[256] = 'HEADING')] = 256
        values[(valuesById[512] = 'SPEED')] = 512
        return values
      })()

      /**
       * GpsMode enum.
       * @name meshtastic.Config.PositionConfig.GpsMode
       * @enum {number}
       * @property {number} DISABLED=0 GPS is present but disabled
       * @property {number} ENABLED=1 GPS is present and enabled
       * @property {number} NOT_PRESENT=2 GPS is not present on the device
       */
      PositionConfig.GpsMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'DISABLED')] = 0
        values[(valuesById[1] = 'ENABLED')] = 1
        values[(valuesById[2] = 'NOT_PRESENT')] = 2
        return values
      })()

      return PositionConfig
    })()

    Config.PowerConfig = (function () {
      /**
       * Properties of a PowerConfig.
       * @memberof meshtastic.Config
       * @interface IPowerConfig
       * @property {boolean|null} [isPowerSaving] Description: Will sleep everything as much as possible, for the tracker and sensor role this will also include the lora radio.
       * Don't use this setting if you want to use your device with the phone apps or are using a device without a user button.
       * Technical Details: Works for ESP32 devices and NRF52 devices in the Sensor or Tracker roles
       * @property {number|null} [onBatteryShutdownAfterSecs] Description: If non-zero, the device will fully power off this many seconds after external power is removed.
       * @property {number|null} [adcMultiplierOverride] Ratio of voltage divider for battery pin eg. 3.20 (R1=100k, R2=220k)
       * Overrides the ADC_MULTIPLIER defined in variant for battery voltage calculation.
       * https://meshtastic.org/docs/configuration/radio/power/#adc-multiplier-override
       * Should be set to floating point value between 2 and 6
       * @property {number|null} [waitBluetoothSecs] Description: The number of seconds for to wait before turning off BLE in No Bluetooth states
       * Technical Details: ESP32 Only 0 for default of 1 minute
       * @property {number|null} [sdsSecs] Super Deep Sleep Seconds
       * While in Light Sleep if mesh_sds_timeout_secs is exceeded we will lower into super deep sleep
       * for this value (default 1 year) or a button press
       * 0 for default of one year
       * @property {number|null} [lsSecs] Description: In light sleep the CPU is suspended, LoRa radio is on, BLE is off an GPS is on
       * Technical Details: ESP32 Only 0 for default of 300
       * @property {number|null} [minWakeSecs] Description: While in light sleep when we receive packets on the LoRa radio we will wake and handle them and stay awake in no BLE mode for this value
       * Technical Details: ESP32 Only 0 for default of 10 seconds
       * @property {number|null} [deviceBatteryInaAddress] I2C address of INA_2XX to use for reading device battery voltage
       * @property {number|Long|null} [powermonEnables] If non-zero, we want powermon log outputs.  With the particular (bitfield) sources enabled.
       * Note: we picked an ID of 32 so that lower more efficient IDs can be used for more frequently used options.
       */

      /**
       * Constructs a new PowerConfig.
       * @memberof meshtastic.Config
       * @classdesc Power Config\
       * See [Power Config](/docs/settings/config/power) for additional power config details.
       * @implements IPowerConfig
       * @constructor
       * @param {meshtastic.Config.IPowerConfig=} [properties] Properties to set
       */
      function PowerConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Description: Will sleep everything as much as possible, for the tracker and sensor role this will also include the lora radio.
       * Don't use this setting if you want to use your device with the phone apps or are using a device without a user button.
       * Technical Details: Works for ESP32 devices and NRF52 devices in the Sensor or Tracker roles
       * @member {boolean|null|undefined} isPowerSaving
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.isPowerSaving = null

      /**
       * Description: If non-zero, the device will fully power off this many seconds after external power is removed.
       * @member {number|null|undefined} onBatteryShutdownAfterSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.onBatteryShutdownAfterSecs = null

      /**
       * Ratio of voltage divider for battery pin eg. 3.20 (R1=100k, R2=220k)
       * Overrides the ADC_MULTIPLIER defined in variant for battery voltage calculation.
       * https://meshtastic.org/docs/configuration/radio/power/#adc-multiplier-override
       * Should be set to floating point value between 2 and 6
       * @member {number|null|undefined} adcMultiplierOverride
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.adcMultiplierOverride = null

      /**
       * Description: The number of seconds for to wait before turning off BLE in No Bluetooth states
       * Technical Details: ESP32 Only 0 for default of 1 minute
       * @member {number|null|undefined} waitBluetoothSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.waitBluetoothSecs = null

      /**
       * Super Deep Sleep Seconds
       * While in Light Sleep if mesh_sds_timeout_secs is exceeded we will lower into super deep sleep
       * for this value (default 1 year) or a button press
       * 0 for default of one year
       * @member {number|null|undefined} sdsSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.sdsSecs = null

      /**
       * Description: In light sleep the CPU is suspended, LoRa radio is on, BLE is off an GPS is on
       * Technical Details: ESP32 Only 0 for default of 300
       * @member {number|null|undefined} lsSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.lsSecs = null

      /**
       * Description: While in light sleep when we receive packets on the LoRa radio we will wake and handle them and stay awake in no BLE mode for this value
       * Technical Details: ESP32 Only 0 for default of 10 seconds
       * @member {number|null|undefined} minWakeSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.minWakeSecs = null

      /**
       * I2C address of INA_2XX to use for reading device battery voltage
       * @member {number|null|undefined} deviceBatteryInaAddress
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.deviceBatteryInaAddress = null

      /**
       * If non-zero, we want powermon log outputs.  With the particular (bitfield) sources enabled.
       * Note: we picked an ID of 32 so that lower more efficient IDs can be used for more frequently used options.
       * @member {number|Long|null|undefined} powermonEnables
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.powermonEnables = null

      /**
       * Decodes a PowerConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.PowerConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.PowerConfig} PowerConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      PowerConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.PowerConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.isPowerSaving = reader.bool()
              break
            }
            case 2: {
              message.onBatteryShutdownAfterSecs = reader.uint32()
              break
            }
            case 3: {
              message.adcMultiplierOverride = reader.float()
              break
            }
            case 4: {
              message.waitBluetoothSecs = reader.uint32()
              break
            }
            case 6: {
              message.sdsSecs = reader.uint32()
              break
            }
            case 7: {
              message.lsSecs = reader.uint32()
              break
            }
            case 8: {
              message.minWakeSecs = reader.uint32()
              break
            }
            case 9: {
              message.deviceBatteryInaAddress = reader.uint32()
              break
            }
            case 32: {
              message.powermonEnables = reader.uint64()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return PowerConfig
    })()

    Config.NetworkConfig = (function () {
      /**
       * Properties of a NetworkConfig.
       * @memberof meshtastic.Config
       * @interface INetworkConfig
       * @property {boolean|null} [wifiEnabled] Enable WiFi (disables Bluetooth)
       * @property {string|null} [wifiSsid] If set, this node will try to join the specified wifi network and
       * acquire an address via DHCP
       * @property {string|null} [wifiPsk] If set, will be use to authenticate to the named wifi
       * @property {string|null} [ntpServer] NTP server to use if WiFi is conneced, defaults to `0.pool.ntp.org`
       * @property {boolean|null} [ethEnabled] Enable Ethernet
       * @property {meshtastic.Config.NetworkConfig.AddressMode|null} [addressMode] acquire an address via DHCP or assign static
       * @property {meshtastic.Config.NetworkConfig.IIpV4Config|null} [ipv4Config] struct to keep static address
       * @property {string|null} [rsyslogServer] rsyslog Server and Port
       */

      /**
       * Constructs a new NetworkConfig.
       * @memberof meshtastic.Config
       * @classdesc Network Config
       * @implements INetworkConfig
       * @constructor
       * @param {meshtastic.Config.INetworkConfig=} [properties] Properties to set
       */
      function NetworkConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Enable WiFi (disables Bluetooth)
       * @member {boolean|null|undefined} wifiEnabled
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.wifiEnabled = null

      /**
       * If set, this node will try to join the specified wifi network and
       * acquire an address via DHCP
       * @member {string|null|undefined} wifiSsid
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.wifiSsid = null

      /**
       * If set, will be use to authenticate to the named wifi
       * @member {string|null|undefined} wifiPsk
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.wifiPsk = null

      /**
       * NTP server to use if WiFi is conneced, defaults to `0.pool.ntp.org`
       * @member {string|null|undefined} ntpServer
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.ntpServer = null

      /**
       * Enable Ethernet
       * @member {boolean|null|undefined} ethEnabled
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.ethEnabled = null

      /**
       * acquire an address via DHCP or assign static
       * @member {meshtastic.Config.NetworkConfig.AddressMode|null|undefined} addressMode
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.addressMode = null

      /**
       * struct to keep static address
       * @member {meshtastic.Config.NetworkConfig.IIpV4Config|null|undefined} ipv4Config
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.ipv4Config = null

      /**
       * rsyslog Server and Port
       * @member {string|null|undefined} rsyslogServer
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.rsyslogServer = null

      /**
       * Decodes a NetworkConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.NetworkConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.NetworkConfig} NetworkConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      NetworkConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.NetworkConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.wifiEnabled = reader.bool()
              break
            }
            case 3: {
              message.wifiSsid = reader.string()
              break
            }
            case 4: {
              message.wifiPsk = reader.string()
              break
            }
            case 5: {
              message.ntpServer = reader.string()
              break
            }
            case 6: {
              message.ethEnabled = reader.bool()
              break
            }
            case 7: {
              message.addressMode = reader.int32()
              break
            }
            case 8: {
              message.ipv4Config = $root.meshtastic.Config.NetworkConfig.IpV4Config.decode(reader, reader.uint32())
              break
            }
            case 9: {
              message.rsyslogServer = reader.string()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * AddressMode enum.
       * @name meshtastic.Config.NetworkConfig.AddressMode
       * @enum {number}
       * @property {number} DHCP=0 obtain ip address via DHCP
       * @property {number} STATIC=1 use static ip address
       */
      NetworkConfig.AddressMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'DHCP')] = 0
        values[(valuesById[1] = 'STATIC')] = 1
        return values
      })()

      NetworkConfig.IpV4Config = (function () {
        /**
         * Properties of an IpV4Config.
         * @memberof meshtastic.Config.NetworkConfig
         * @interface IIpV4Config
         * @property {number|null} [ip] Static IP address
         * @property {number|null} [gateway] Static gateway address
         * @property {number|null} [subnet] Static subnet mask
         * @property {number|null} [dns] Static DNS server address
         */

        /**
         * Constructs a new IpV4Config.
         * @memberof meshtastic.Config.NetworkConfig
         * @classdesc Represents an IpV4Config.
         * @implements IIpV4Config
         * @constructor
         * @param {meshtastic.Config.NetworkConfig.IIpV4Config=} [properties] Properties to set
         */
        function IpV4Config(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
        }

        /**
         * Static IP address
         * @member {number|null|undefined} ip
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @instance
         */
        IpV4Config.prototype.ip = null

        /**
         * Static gateway address
         * @member {number|null|undefined} gateway
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @instance
         */
        IpV4Config.prototype.gateway = null

        /**
         * Static subnet mask
         * @member {number|null|undefined} subnet
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @instance
         */
        IpV4Config.prototype.subnet = null

        /**
         * Static DNS server address
         * @member {number|null|undefined} dns
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @instance
         */
        IpV4Config.prototype.dns = null

        /**
         * Decodes an IpV4Config message from the specified reader or buffer.
         * @function decode
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {meshtastic.Config.NetworkConfig.IpV4Config} IpV4Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IpV4Config.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.meshtastic.Config.NetworkConfig.IpV4Config()
          while (reader.pos < end) {
            let tag = reader.uint32()
            switch (tag >>> 3) {
              case 1: {
                message.ip = reader.fixed32()
                break
              }
              case 2: {
                message.gateway = reader.fixed32()
                break
              }
              case 3: {
                message.subnet = reader.fixed32()
                break
              }
              case 4: {
                message.dns = reader.fixed32()
                break
              }
              default:
                reader.skipType(tag & 7)
                break
            }
          }
          return message
        }

        return IpV4Config
      })()

      return NetworkConfig
    })()

    Config.DisplayConfig = (function () {
      /**
       * Properties of a DisplayConfig.
       * @memberof meshtastic.Config
       * @interface IDisplayConfig
       * @property {number|null} [screenOnSecs] Number of seconds the screen stays on after pressing the user button or receiving a message
       * 0 for default of one minute MAXUINT for always on
       * @property {meshtastic.Config.DisplayConfig.GpsCoordinateFormat|null} [gpsFormat] How the GPS coordinates are formatted on the OLED screen.
       * @property {number|null} [autoScreenCarouselSecs] Automatically toggles to the next page on the screen like a carousel, based the specified interval in seconds.
       * Potentially useful for devices without user buttons.
       * @property {boolean|null} [compassNorthTop] If this is set, the displayed compass will always point north. if unset, the old behaviour
       * (top of display is heading direction) is used.
       * @property {boolean|null} [flipScreen] Flip screen vertically, for cases that mount the screen upside down
       * @property {meshtastic.Config.DisplayConfig.DisplayUnits|null} [units] Perferred display units
       * @property {meshtastic.Config.DisplayConfig.OledType|null} [oled] Override auto-detect in screen
       * @property {meshtastic.Config.DisplayConfig.DisplayMode|null} [displaymode] Display Mode
       * @property {boolean|null} [headingBold] Print first line in pseudo-bold? FALSE is original style, TRUE is bold
       * @property {boolean|null} [wakeOnTapOrMotion] Should we wake the screen up on accelerometer detected motion or tap
       * @property {meshtastic.Config.DisplayConfig.CompassOrientation|null} [compassOrientation] Indicates how to rotate or invert the compass output to accurate display on the display.
       */

      /**
       * Constructs a new DisplayConfig.
       * @memberof meshtastic.Config
       * @classdesc Display Config
       * @implements IDisplayConfig
       * @constructor
       * @param {meshtastic.Config.IDisplayConfig=} [properties] Properties to set
       */
      function DisplayConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Number of seconds the screen stays on after pressing the user button or receiving a message
       * 0 for default of one minute MAXUINT for always on
       * @member {number|null|undefined} screenOnSecs
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.screenOnSecs = null

      /**
       * How the GPS coordinates are formatted on the OLED screen.
       * @member {meshtastic.Config.DisplayConfig.GpsCoordinateFormat|null|undefined} gpsFormat
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.gpsFormat = null

      /**
       * Automatically toggles to the next page on the screen like a carousel, based the specified interval in seconds.
       * Potentially useful for devices without user buttons.
       * @member {number|null|undefined} autoScreenCarouselSecs
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.autoScreenCarouselSecs = null

      /**
       * If this is set, the displayed compass will always point north. if unset, the old behaviour
       * (top of display is heading direction) is used.
       * @member {boolean|null|undefined} compassNorthTop
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.compassNorthTop = null

      /**
       * Flip screen vertically, for cases that mount the screen upside down
       * @member {boolean|null|undefined} flipScreen
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.flipScreen = null

      /**
       * Perferred display units
       * @member {meshtastic.Config.DisplayConfig.DisplayUnits|null|undefined} units
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.units = null

      /**
       * Override auto-detect in screen
       * @member {meshtastic.Config.DisplayConfig.OledType|null|undefined} oled
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.oled = null

      /**
       * Display Mode
       * @member {meshtastic.Config.DisplayConfig.DisplayMode|null|undefined} displaymode
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.displaymode = null

      /**
       * Print first line in pseudo-bold? FALSE is original style, TRUE is bold
       * @member {boolean|null|undefined} headingBold
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.headingBold = null

      /**
       * Should we wake the screen up on accelerometer detected motion or tap
       * @member {boolean|null|undefined} wakeOnTapOrMotion
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.wakeOnTapOrMotion = null

      /**
       * Indicates how to rotate or invert the compass output to accurate display on the display.
       * @member {meshtastic.Config.DisplayConfig.CompassOrientation|null|undefined} compassOrientation
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.compassOrientation = null

      /**
       * Decodes a DisplayConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.DisplayConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.DisplayConfig} DisplayConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      DisplayConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.DisplayConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.screenOnSecs = reader.uint32()
              break
            }
            case 2: {
              message.gpsFormat = reader.int32()
              break
            }
            case 3: {
              message.autoScreenCarouselSecs = reader.uint32()
              break
            }
            case 4: {
              message.compassNorthTop = reader.bool()
              break
            }
            case 5: {
              message.flipScreen = reader.bool()
              break
            }
            case 6: {
              message.units = reader.int32()
              break
            }
            case 7: {
              message.oled = reader.int32()
              break
            }
            case 8: {
              message.displaymode = reader.int32()
              break
            }
            case 9: {
              message.headingBold = reader.bool()
              break
            }
            case 10: {
              message.wakeOnTapOrMotion = reader.bool()
              break
            }
            case 11: {
              message.compassOrientation = reader.int32()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * How the GPS coordinates are displayed on the OLED screen.
       * @name meshtastic.Config.DisplayConfig.GpsCoordinateFormat
       * @enum {number}
       * @property {number} DEC=0 GPS coordinates are displayed in the normal decimal degrees format:
       * DD.DDDDDD DDD.DDDDDD
       * @property {number} DMS=1 GPS coordinates are displayed in the degrees minutes seconds format:
       * DD°MM'SS"C DDD°MM'SS"C, where C is the compass point representing the locations quadrant
       * @property {number} UTM=2 Universal Transverse Mercator format:
       * ZZB EEEEEE NNNNNNN, where Z is zone, B is band, E is easting, N is northing
       * @property {number} MGRS=3 Military Grid Reference System format:
       * ZZB CD EEEEE NNNNN, where Z is zone, B is band, C is the east 100k square, D is the north 100k square,
       * E is easting, N is northing
       * @property {number} OLC=4 Open Location Code (aka Plus Codes).
       * @property {number} OSGR=5 Ordnance Survey Grid Reference (the National Grid System of the UK).
       * Format: AB EEEEE NNNNN, where A is the east 100k square, B is the north 100k square,
       * E is the easting, N is the northing
       */
      DisplayConfig.GpsCoordinateFormat = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'DEC')] = 0
        values[(valuesById[1] = 'DMS')] = 1
        values[(valuesById[2] = 'UTM')] = 2
        values[(valuesById[3] = 'MGRS')] = 3
        values[(valuesById[4] = 'OLC')] = 4
        values[(valuesById[5] = 'OSGR')] = 5
        return values
      })()

      /**
       * Unit display preference
       * @name meshtastic.Config.DisplayConfig.DisplayUnits
       * @enum {number}
       * @property {number} METRIC=0 Metric (Default)
       * @property {number} IMPERIAL=1 Imperial
       */
      DisplayConfig.DisplayUnits = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'METRIC')] = 0
        values[(valuesById[1] = 'IMPERIAL')] = 1
        return values
      })()

      /**
       * Override OLED outo detect with this if it fails.
       * @name meshtastic.Config.DisplayConfig.OledType
       * @enum {number}
       * @property {number} OLED_AUTO=0 Default / Auto
       * @property {number} OLED_SSD1306=1 Default / Auto
       * @property {number} OLED_SH1106=2 Default / Auto
       * @property {number} OLED_SH1107=3 Can not be auto detected but set by proto. Used for 128x128 screens
       */
      DisplayConfig.OledType = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'OLED_AUTO')] = 0
        values[(valuesById[1] = 'OLED_SSD1306')] = 1
        values[(valuesById[2] = 'OLED_SH1106')] = 2
        values[(valuesById[3] = 'OLED_SH1107')] = 3
        return values
      })()

      /**
       * DisplayMode enum.
       * @name meshtastic.Config.DisplayConfig.DisplayMode
       * @enum {number}
       * @property {number} DEFAULT=0 Default. The old style for the 128x64 OLED screen
       * @property {number} TWOCOLOR=1 Rearrange display elements to cater for bicolor OLED displays
       * @property {number} INVERTED=2 Same as TwoColor, but with inverted top bar. Not so good for Epaper displays
       * @property {number} COLOR=3 TFT Full Color Displays (not implemented yet)
       */
      DisplayConfig.DisplayMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'DEFAULT')] = 0
        values[(valuesById[1] = 'TWOCOLOR')] = 1
        values[(valuesById[2] = 'INVERTED')] = 2
        values[(valuesById[3] = 'COLOR')] = 3
        return values
      })()

      /**
       * CompassOrientation enum.
       * @name meshtastic.Config.DisplayConfig.CompassOrientation
       * @enum {number}
       * @property {number} DEGREES_0=0 The compass and the display are in the same orientation.
       * @property {number} DEGREES_90=1 Rotate the compass by 90 degrees.
       * @property {number} DEGREES_180=2 Rotate the compass by 180 degrees.
       * @property {number} DEGREES_270=3 Rotate the compass by 270 degrees.
       * @property {number} DEGREES_0_INVERTED=4 Don't rotate the compass, but invert the result.
       * @property {number} DEGREES_90_INVERTED=5 Rotate the compass by 90 degrees and invert.
       * @property {number} DEGREES_180_INVERTED=6 Rotate the compass by 180 degrees and invert.
       * @property {number} DEGREES_270_INVERTED=7 Rotate the compass by 270 degrees and invert.
       */
      DisplayConfig.CompassOrientation = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'DEGREES_0')] = 0
        values[(valuesById[1] = 'DEGREES_90')] = 1
        values[(valuesById[2] = 'DEGREES_180')] = 2
        values[(valuesById[3] = 'DEGREES_270')] = 3
        values[(valuesById[4] = 'DEGREES_0_INVERTED')] = 4
        values[(valuesById[5] = 'DEGREES_90_INVERTED')] = 5
        values[(valuesById[6] = 'DEGREES_180_INVERTED')] = 6
        values[(valuesById[7] = 'DEGREES_270_INVERTED')] = 7
        return values
      })()

      return DisplayConfig
    })()

    Config.LoRaConfig = (function () {
      /**
       * Properties of a LoRaConfig.
       * @memberof meshtastic.Config
       * @interface ILoRaConfig
       * @property {boolean|null} [usePreset] When enabled, the `modem_preset` fields will be adhered to, else the `bandwidth`/`spread_factor`/`coding_rate`
       * will be taked from their respective manually defined fields
       * @property {meshtastic.Config.LoRaConfig.ModemPreset|null} [modemPreset] Either modem_config or bandwidth/spreading/coding will be specified - NOT BOTH.
       * As a heuristic: If bandwidth is specified, do not use modem_config.
       * Because protobufs take ZERO space when the value is zero this works out nicely.
       * This value is replaced by bandwidth/spread_factor/coding_rate.
       * If you'd like to experiment with other options add them to MeshRadio.cpp in the device code.
       * @property {number|null} [bandwidth] Bandwidth in MHz
       * Certain bandwidth numbers are 'special' and will be converted to the
       * appropriate floating point value: 31 -> 31.25MHz
       * @property {number|null} [spreadFactor] A number from 7 to 12.
       * Indicates number of chirps per symbol as 1<<spread_factor.
       * @property {number|null} [codingRate] The denominator of the coding rate.
       * ie for 4/5, the value is 5. 4/8 the value is 8.
       * @property {number|null} [frequencyOffset] This parameter is for advanced users with advanced test equipment, we do not recommend most users use it.
       * A frequency offset that is added to to the calculated band center frequency.
       * Used to correct for crystal calibration errors.
       * @property {meshtastic.Config.LoRaConfig.RegionCode|null} [region] The region code for the radio (US, CN, EU433, etc...)
       * @property {number|null} [hopLimit] Maximum number of hops. This can't be greater than 7.
       * Default of 3
       * Attempting to set a value > 7 results in the default
       * @property {boolean|null} [txEnabled] Disable TX from the LoRa radio. Useful for hot-swapping antennas and other tests.
       * Defaults to false
       * @property {number|null} [txPower] If zero, then use default max legal continuous power (ie. something that won't
       * burn out the radio hardware)
       * In most cases you should use zero here.
       * Units are in dBm.
       * @property {number|null} [channelNum] This controls the actual hardware frequency the radio transmits on.
       * Most users should never need to be exposed to this field/concept.
       * A channel number between 1 and NUM_CHANNELS (whatever the max is in the current region).
       * If ZERO then the rule is "use the old channel name hash based
       * algorithm to derive the channel number")
       * If using the hash algorithm the channel number will be: hash(channel_name) %
       * NUM_CHANNELS (Where num channels depends on the regulatory region).
       * @property {boolean|null} [overrideDutyCycle] If true, duty cycle limits will be exceeded and thus you're possibly not following
       * the local regulations if you're not a HAM.
       * Has no effect if the duty cycle of the used region is 100%.
       * @property {boolean|null} [sx126xRxBoostedGain] If true, sets RX boosted gain mode on SX126X based radios
       * @property {number|null} [overrideFrequency] This parameter is for advanced users and licensed HAM radio operators.
       * Ignore Channel Calculation and use this frequency instead. The frequency_offset
       * will still be applied. This will allow you to use out-of-band frequencies.
       * Please respect your local laws and regulations. If you are a HAM, make sure you
       * enable HAM mode and turn off encryption.
       * @property {boolean|null} [paFanDisabled] If true, disable the build-in PA FAN using pin define in RF95_FAN_EN.
       * @property {Array.<number>|null} [ignoreIncoming] For testing it is useful sometimes to force a node to never listen to
       * particular other nodes (simulating radio out of range). All nodenums listed
       * in ignore_incoming will have packets they send dropped on receive (by router.cpp)
       * @property {boolean|null} [ignoreMqtt] If true, the device will not process any packets received via LoRa that passed via MQTT anywhere on the path towards it.
       */

      /**
       * Constructs a new LoRaConfig.
       * @memberof meshtastic.Config
       * @classdesc Lora Config
       * @implements ILoRaConfig
       * @constructor
       * @param {meshtastic.Config.ILoRaConfig=} [properties] Properties to set
       */
      function LoRaConfig(properties) {
        this.ignoreIncoming = []
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * When enabled, the `modem_preset` fields will be adhered to, else the `bandwidth`/`spread_factor`/`coding_rate`
       * will be taked from their respective manually defined fields
       * @member {boolean|null|undefined} usePreset
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.usePreset = null

      /**
       * Either modem_config or bandwidth/spreading/coding will be specified - NOT BOTH.
       * As a heuristic: If bandwidth is specified, do not use modem_config.
       * Because protobufs take ZERO space when the value is zero this works out nicely.
       * This value is replaced by bandwidth/spread_factor/coding_rate.
       * If you'd like to experiment with other options add them to MeshRadio.cpp in the device code.
       * @member {meshtastic.Config.LoRaConfig.ModemPreset|null|undefined} modemPreset
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.modemPreset = null

      /**
       * Bandwidth in MHz
       * Certain bandwidth numbers are 'special' and will be converted to the
       * appropriate floating point value: 31 -> 31.25MHz
       * @member {number|null|undefined} bandwidth
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.bandwidth = null

      /**
       * A number from 7 to 12.
       * Indicates number of chirps per symbol as 1<<spread_factor.
       * @member {number|null|undefined} spreadFactor
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.spreadFactor = null

      /**
       * The denominator of the coding rate.
       * ie for 4/5, the value is 5. 4/8 the value is 8.
       * @member {number|null|undefined} codingRate
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.codingRate = null

      /**
       * This parameter is for advanced users with advanced test equipment, we do not recommend most users use it.
       * A frequency offset that is added to to the calculated band center frequency.
       * Used to correct for crystal calibration errors.
       * @member {number|null|undefined} frequencyOffset
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.frequencyOffset = null

      /**
       * The region code for the radio (US, CN, EU433, etc...)
       * @member {meshtastic.Config.LoRaConfig.RegionCode|null|undefined} region
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.region = null

      /**
       * Maximum number of hops. This can't be greater than 7.
       * Default of 3
       * Attempting to set a value > 7 results in the default
       * @member {number|null|undefined} hopLimit
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.hopLimit = null

      /**
       * Disable TX from the LoRa radio. Useful for hot-swapping antennas and other tests.
       * Defaults to false
       * @member {boolean|null|undefined} txEnabled
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.txEnabled = null

      /**
       * If zero, then use default max legal continuous power (ie. something that won't
       * burn out the radio hardware)
       * In most cases you should use zero here.
       * Units are in dBm.
       * @member {number|null|undefined} txPower
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.txPower = null

      /**
       * This controls the actual hardware frequency the radio transmits on.
       * Most users should never need to be exposed to this field/concept.
       * A channel number between 1 and NUM_CHANNELS (whatever the max is in the current region).
       * If ZERO then the rule is "use the old channel name hash based
       * algorithm to derive the channel number")
       * If using the hash algorithm the channel number will be: hash(channel_name) %
       * NUM_CHANNELS (Where num channels depends on the regulatory region).
       * @member {number|null|undefined} channelNum
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.channelNum = null

      /**
       * If true, duty cycle limits will be exceeded and thus you're possibly not following
       * the local regulations if you're not a HAM.
       * Has no effect if the duty cycle of the used region is 100%.
       * @member {boolean|null|undefined} overrideDutyCycle
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.overrideDutyCycle = null

      /**
       * If true, sets RX boosted gain mode on SX126X based radios
       * @member {boolean|null|undefined} sx126xRxBoostedGain
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.sx126xRxBoostedGain = null

      /**
       * This parameter is for advanced users and licensed HAM radio operators.
       * Ignore Channel Calculation and use this frequency instead. The frequency_offset
       * will still be applied. This will allow you to use out-of-band frequencies.
       * Please respect your local laws and regulations. If you are a HAM, make sure you
       * enable HAM mode and turn off encryption.
       * @member {number|null|undefined} overrideFrequency
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.overrideFrequency = null

      /**
       * If true, disable the build-in PA FAN using pin define in RF95_FAN_EN.
       * @member {boolean|null|undefined} paFanDisabled
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.paFanDisabled = null

      /**
       * For testing it is useful sometimes to force a node to never listen to
       * particular other nodes (simulating radio out of range). All nodenums listed
       * in ignore_incoming will have packets they send dropped on receive (by router.cpp)
       * @member {Array.<number>} ignoreIncoming
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.ignoreIncoming = $util.emptyArray

      /**
       * If true, the device will not process any packets received via LoRa that passed via MQTT anywhere on the path towards it.
       * @member {boolean|null|undefined} ignoreMqtt
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.ignoreMqtt = null

      /**
       * Decodes a LoRaConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.LoRaConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.LoRaConfig} LoRaConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      LoRaConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.LoRaConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.usePreset = reader.bool()
              break
            }
            case 2: {
              message.modemPreset = reader.int32()
              break
            }
            case 3: {
              message.bandwidth = reader.uint32()
              break
            }
            case 4: {
              message.spreadFactor = reader.uint32()
              break
            }
            case 5: {
              message.codingRate = reader.uint32()
              break
            }
            case 6: {
              message.frequencyOffset = reader.float()
              break
            }
            case 7: {
              message.region = reader.int32()
              break
            }
            case 8: {
              message.hopLimit = reader.uint32()
              break
            }
            case 9: {
              message.txEnabled = reader.bool()
              break
            }
            case 10: {
              message.txPower = reader.int32()
              break
            }
            case 11: {
              message.channelNum = reader.uint32()
              break
            }
            case 12: {
              message.overrideDutyCycle = reader.bool()
              break
            }
            case 13: {
              message.sx126xRxBoostedGain = reader.bool()
              break
            }
            case 14: {
              message.overrideFrequency = reader.float()
              break
            }
            case 15: {
              message.paFanDisabled = reader.bool()
              break
            }
            case 103: {
              if (!(message.ignoreIncoming && message.ignoreIncoming.length)) message.ignoreIncoming = []
              if ((tag & 7) === 2) {
                let end2 = reader.uint32() + reader.pos
                while (reader.pos < end2) message.ignoreIncoming.push(reader.uint32())
              } else message.ignoreIncoming.push(reader.uint32())
              break
            }
            case 104: {
              message.ignoreMqtt = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * RegionCode enum.
       * @name meshtastic.Config.LoRaConfig.RegionCode
       * @enum {number}
       * @property {number} UNSET=0 Region is not set
       * @property {number} US=1 United States
       * @property {number} EU_433=2 European Union 433mhz
       * @property {number} EU_868=3 European Union 868mhz
       * @property {number} CN=4 China
       * @property {number} JP=5 Japan
       * @property {number} ANZ=6 Australia / New Zealand
       * @property {number} KR=7 Korea
       * @property {number} TW=8 Taiwan
       * @property {number} RU=9 Russia
       * @property {number} IN=10 India
       * @property {number} NZ_865=11 New Zealand 865mhz
       * @property {number} TH=12 Thailand
       * @property {number} LORA_24=13 WLAN Band
       * @property {number} UA_433=14 Ukraine 433mhz
       * @property {number} UA_868=15 Ukraine 868mhz
       * @property {number} MY_433=16 Malaysia 433mhz
       * @property {number} MY_919=17 Malaysia 919mhz
       * @property {number} SG_923=18 Singapore 923mhz
       */
      LoRaConfig.RegionCode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'UNSET')] = 0
        values[(valuesById[1] = 'US')] = 1
        values[(valuesById[2] = 'EU_433')] = 2
        values[(valuesById[3] = 'EU_868')] = 3
        values[(valuesById[4] = 'CN')] = 4
        values[(valuesById[5] = 'JP')] = 5
        values[(valuesById[6] = 'ANZ')] = 6
        values[(valuesById[7] = 'KR')] = 7
        values[(valuesById[8] = 'TW')] = 8
        values[(valuesById[9] = 'RU')] = 9
        values[(valuesById[10] = 'IN')] = 10
        values[(valuesById[11] = 'NZ_865')] = 11
        values[(valuesById[12] = 'TH')] = 12
        values[(valuesById[13] = 'LORA_24')] = 13
        values[(valuesById[14] = 'UA_433')] = 14
        values[(valuesById[15] = 'UA_868')] = 15
        values[(valuesById[16] = 'MY_433')] = 16
        values[(valuesById[17] = 'MY_919')] = 17
        values[(valuesById[18] = 'SG_923')] = 18
        return values
      })()

      /**
       * Standard predefined channel settings
       * Note: these mappings must match ModemPreset Choice in the device code.
       * @name meshtastic.Config.LoRaConfig.ModemPreset
       * @enum {number}
       * @property {number} LONG_FAST=0 Long Range - Fast
       * @property {number} LONG_SLOW=1 Long Range - Slow
       * @property {number} VERY_LONG_SLOW=2 Very Long Range - Slow
       * @property {number} MEDIUM_SLOW=3 Medium Range - Slow
       * @property {number} MEDIUM_FAST=4 Medium Range - Fast
       * @property {number} SHORT_SLOW=5 Short Range - Slow
       * @property {number} SHORT_FAST=6 Short Range - Fast
       * @property {number} LONG_MODERATE=7 Long Range - Moderately Fast
       */
      LoRaConfig.ModemPreset = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'LONG_FAST')] = 0
        values[(valuesById[1] = 'LONG_SLOW')] = 1
        values[(valuesById[2] = 'VERY_LONG_SLOW')] = 2
        values[(valuesById[3] = 'MEDIUM_SLOW')] = 3
        values[(valuesById[4] = 'MEDIUM_FAST')] = 4
        values[(valuesById[5] = 'SHORT_SLOW')] = 5
        values[(valuesById[6] = 'SHORT_FAST')] = 6
        values[(valuesById[7] = 'LONG_MODERATE')] = 7
        return values
      })()

      return LoRaConfig
    })()

    Config.BluetoothConfig = (function () {
      /**
       * Properties of a BluetoothConfig.
       * @memberof meshtastic.Config
       * @interface IBluetoothConfig
       * @property {boolean|null} [enabled] Enable Bluetooth on the device
       * @property {meshtastic.Config.BluetoothConfig.PairingMode|null} [mode] Determines the pairing strategy for the device
       * @property {number|null} [fixedPin] Specified PIN for PairingMode.FixedPin
       * @property {boolean|null} [deviceLoggingEnabled] Enables device (serial style logs) over Bluetooth
       */

      /**
       * Constructs a new BluetoothConfig.
       * @memberof meshtastic.Config
       * @classdesc Represents a BluetoothConfig.
       * @implements IBluetoothConfig
       * @constructor
       * @param {meshtastic.Config.IBluetoothConfig=} [properties] Properties to set
       */
      function BluetoothConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Enable Bluetooth on the device
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.Config.BluetoothConfig
       * @instance
       */
      BluetoothConfig.prototype.enabled = null

      /**
       * Determines the pairing strategy for the device
       * @member {meshtastic.Config.BluetoothConfig.PairingMode|null|undefined} mode
       * @memberof meshtastic.Config.BluetoothConfig
       * @instance
       */
      BluetoothConfig.prototype.mode = null

      /**
       * Specified PIN for PairingMode.FixedPin
       * @member {number|null|undefined} fixedPin
       * @memberof meshtastic.Config.BluetoothConfig
       * @instance
       */
      BluetoothConfig.prototype.fixedPin = null

      /**
       * Enables device (serial style logs) over Bluetooth
       * @member {boolean|null|undefined} deviceLoggingEnabled
       * @memberof meshtastic.Config.BluetoothConfig
       * @instance
       */
      BluetoothConfig.prototype.deviceLoggingEnabled = null

      /**
       * Decodes a BluetoothConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.BluetoothConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.BluetoothConfig} BluetoothConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      BluetoothConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.BluetoothConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.mode = reader.int32()
              break
            }
            case 3: {
              message.fixedPin = reader.uint32()
              break
            }
            case 4: {
              message.deviceLoggingEnabled = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * PairingMode enum.
       * @name meshtastic.Config.BluetoothConfig.PairingMode
       * @enum {number}
       * @property {number} RANDOM_PIN=0 Device generates a random PIN that will be shown on the screen of the device for pairing
       * @property {number} FIXED_PIN=1 Device requires a specified fixed PIN for pairing
       * @property {number} NO_PIN=2 Device requires no PIN for pairing
       */
      BluetoothConfig.PairingMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'RANDOM_PIN')] = 0
        values[(valuesById[1] = 'FIXED_PIN')] = 1
        values[(valuesById[2] = 'NO_PIN')] = 2
        return values
      })()

      return BluetoothConfig
    })()

    return Config
  })()

  meshtastic.Position = (function () {
    /**
     * Properties of a Position.
     * @memberof meshtastic
     * @interface IPosition
     * @property {number|null} [latitudeI] The new preferred location encoding, multiply by 1e-7 to get degrees
     * in floating point
     * @property {number|null} [longitudeI] TODO: REPLACE
     * @property {number|null} [altitude] In meters above MSL (but see issue #359)
     * @property {number|null} [time] This is usually not sent over the mesh (to save space), but it is sent
     * from the phone so that the local device can set its time if it is sent over
     * the mesh (because there are devices on the mesh without GPS or RTC).
     * seconds since 1970
     * @property {meshtastic.Position.LocSource|null} [locationSource] TODO: REPLACE
     * @property {meshtastic.Position.AltSource|null} [altitudeSource] TODO: REPLACE
     * @property {number|null} [timestamp] Positional timestamp (actual timestamp of GPS solution) in integer epoch seconds
     * @property {number|null} [timestampMillisAdjust] Pos. timestamp milliseconds adjustment (rarely available or required)
     * @property {number|null} [altitudeHae] HAE altitude in meters - can be used instead of MSL altitude
     * @property {number|null} [altitudeGeoidalSeparation] Geoidal separation in meters
     * @property {number|null} [PDOP] Horizontal, Vertical and Position Dilution of Precision, in 1/100 units
     * - PDOP is sufficient for most cases
     * - for higher precision scenarios, HDOP and VDOP can be used instead,
     * in which case PDOP becomes redundant (PDOP=sqrt(HDOP^2 + VDOP^2))
     * TODO: REMOVE/INTEGRATE
     * @property {number|null} [HDOP] TODO: REPLACE
     * @property {number|null} [VDOP] TODO: REPLACE
     * @property {number|null} [gpsAccuracy] GPS accuracy (a hardware specific constant) in mm
     * multiplied with DOP to calculate positional accuracy
     * Default: "'bout three meters-ish" :)
     * @property {number|null} [groundSpeed] Ground speed in m/s and True North TRACK in 1/100 degrees
     * Clarification of terms:
     * - "track" is the direction of motion (measured in horizontal plane)
     * - "heading" is where the fuselage points (measured in horizontal plane)
     * - "yaw" indicates a relative rotation about the vertical axis
     * TODO: REMOVE/INTEGRATE
     * @property {number|null} [groundTrack] TODO: REPLACE
     * @property {number|null} [fixQuality] GPS fix quality (from NMEA GxGGA statement or similar)
     * @property {number|null} [fixType] GPS fix type 2D/3D (from NMEA GxGSA statement)
     * @property {number|null} [satsInView] GPS "Satellites in View" number
     * @property {number|null} [sensorId] Sensor ID - in case multiple positioning sensors are being used
     * @property {number|null} [nextUpdate] Estimated/expected time (in seconds) until next update:
     * - if we update at fixed intervals of X seconds, use X
     * - if we update at dynamic intervals (based on relative movement etc),
     * but "AT LEAST every Y seconds", use Y
     * @property {number|null} [seqNumber] A sequence number, incremented with each Position message to help
     * detect lost updates if needed
     * @property {number|null} [precisionBits] Indicates the bits of precision set by the sending node
     */

    /**
     * Constructs a new Position.
     * @memberof meshtastic
     * @classdesc a gps position
     * @implements IPosition
     * @constructor
     * @param {meshtastic.IPosition=} [properties] Properties to set
     */
    function Position(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The new preferred location encoding, multiply by 1e-7 to get degrees
     * in floating point
     * @member {number|null|undefined} latitudeI
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.latitudeI = null

    /**
     * TODO: REPLACE
     * @member {number|null|undefined} longitudeI
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.longitudeI = null

    /**
     * In meters above MSL (but see issue #359)
     * @member {number|null|undefined} altitude
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.altitude = null

    /**
     * This is usually not sent over the mesh (to save space), but it is sent
     * from the phone so that the local device can set its time if it is sent over
     * the mesh (because there are devices on the mesh without GPS or RTC).
     * seconds since 1970
     * @member {number|null|undefined} time
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.time = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.Position.LocSource|null|undefined} locationSource
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.locationSource = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.Position.AltSource|null|undefined} altitudeSource
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.altitudeSource = null

    /**
     * Positional timestamp (actual timestamp of GPS solution) in integer epoch seconds
     * @member {number|null|undefined} timestamp
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.timestamp = null

    /**
     * Pos. timestamp milliseconds adjustment (rarely available or required)
     * @member {number|null|undefined} timestampMillisAdjust
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.timestampMillisAdjust = null

    /**
     * HAE altitude in meters - can be used instead of MSL altitude
     * @member {number|null|undefined} altitudeHae
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.altitudeHae = null

    /**
     * Geoidal separation in meters
     * @member {number|null|undefined} altitudeGeoidalSeparation
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.altitudeGeoidalSeparation = null

    /**
     * Horizontal, Vertical and Position Dilution of Precision, in 1/100 units
     * - PDOP is sufficient for most cases
     * - for higher precision scenarios, HDOP and VDOP can be used instead,
     * in which case PDOP becomes redundant (PDOP=sqrt(HDOP^2 + VDOP^2))
     * TODO: REMOVE/INTEGRATE
     * @member {number|null|undefined} PDOP
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.PDOP = null

    /**
     * TODO: REPLACE
     * @member {number|null|undefined} HDOP
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.HDOP = null

    /**
     * TODO: REPLACE
     * @member {number|null|undefined} VDOP
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.VDOP = null

    /**
     * GPS accuracy (a hardware specific constant) in mm
     * multiplied with DOP to calculate positional accuracy
     * Default: "'bout three meters-ish" :)
     * @member {number|null|undefined} gpsAccuracy
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.gpsAccuracy = null

    /**
     * Ground speed in m/s and True North TRACK in 1/100 degrees
     * Clarification of terms:
     * - "track" is the direction of motion (measured in horizontal plane)
     * - "heading" is where the fuselage points (measured in horizontal plane)
     * - "yaw" indicates a relative rotation about the vertical axis
     * TODO: REMOVE/INTEGRATE
     * @member {number|null|undefined} groundSpeed
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.groundSpeed = null

    /**
     * TODO: REPLACE
     * @member {number|null|undefined} groundTrack
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.groundTrack = null

    /**
     * GPS fix quality (from NMEA GxGGA statement or similar)
     * @member {number|null|undefined} fixQuality
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.fixQuality = null

    /**
     * GPS fix type 2D/3D (from NMEA GxGSA statement)
     * @member {number|null|undefined} fixType
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.fixType = null

    /**
     * GPS "Satellites in View" number
     * @member {number|null|undefined} satsInView
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.satsInView = null

    /**
     * Sensor ID - in case multiple positioning sensors are being used
     * @member {number|null|undefined} sensorId
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.sensorId = null

    /**
     * Estimated/expected time (in seconds) until next update:
     * - if we update at fixed intervals of X seconds, use X
     * - if we update at dynamic intervals (based on relative movement etc),
     * but "AT LEAST every Y seconds", use Y
     * @member {number|null|undefined} nextUpdate
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.nextUpdate = null

    /**
     * A sequence number, incremented with each Position message to help
     * detect lost updates if needed
     * @member {number|null|undefined} seqNumber
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.seqNumber = null

    /**
     * Indicates the bits of precision set by the sending node
     * @member {number|null|undefined} precisionBits
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.precisionBits = null

    /**
     * Decodes a Position message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Position
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Position} Position
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Position.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Position()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.latitudeI = reader.sfixed32()
            break
          }
          case 2: {
            message.longitudeI = reader.sfixed32()
            break
          }
          case 3: {
            message.altitude = reader.int32()
            break
          }
          case 4: {
            message.time = reader.fixed32()
            break
          }
          case 5: {
            message.locationSource = reader.int32()
            break
          }
          case 6: {
            message.altitudeSource = reader.int32()
            break
          }
          case 7: {
            message.timestamp = reader.fixed32()
            break
          }
          case 8: {
            message.timestampMillisAdjust = reader.int32()
            break
          }
          case 9: {
            message.altitudeHae = reader.sint32()
            break
          }
          case 10: {
            message.altitudeGeoidalSeparation = reader.sint32()
            break
          }
          case 11: {
            message.PDOP = reader.uint32()
            break
          }
          case 12: {
            message.HDOP = reader.uint32()
            break
          }
          case 13: {
            message.VDOP = reader.uint32()
            break
          }
          case 14: {
            message.gpsAccuracy = reader.uint32()
            break
          }
          case 15: {
            message.groundSpeed = reader.uint32()
            break
          }
          case 16: {
            message.groundTrack = reader.uint32()
            break
          }
          case 17: {
            message.fixQuality = reader.uint32()
            break
          }
          case 18: {
            message.fixType = reader.uint32()
            break
          }
          case 19: {
            message.satsInView = reader.uint32()
            break
          }
          case 20: {
            message.sensorId = reader.uint32()
            break
          }
          case 21: {
            message.nextUpdate = reader.uint32()
            break
          }
          case 22: {
            message.seqNumber = reader.uint32()
            break
          }
          case 23: {
            message.precisionBits = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * How the location was acquired: manual, onboard GPS, external (EUD) GPS
     * @name meshtastic.Position.LocSource
     * @enum {number}
     * @property {number} LOC_UNSET=0 TODO: REPLACE
     * @property {number} LOC_MANUAL=1 TODO: REPLACE
     * @property {number} LOC_INTERNAL=2 TODO: REPLACE
     * @property {number} LOC_EXTERNAL=3 TODO: REPLACE
     */
    Position.LocSource = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'LOC_UNSET')] = 0
      values[(valuesById[1] = 'LOC_MANUAL')] = 1
      values[(valuesById[2] = 'LOC_INTERNAL')] = 2
      values[(valuesById[3] = 'LOC_EXTERNAL')] = 3
      return values
    })()

    /**
     * How the altitude was acquired: manual, GPS int/ext, etc
     * Default: same as location_source if present
     * @name meshtastic.Position.AltSource
     * @enum {number}
     * @property {number} ALT_UNSET=0 TODO: REPLACE
     * @property {number} ALT_MANUAL=1 TODO: REPLACE
     * @property {number} ALT_INTERNAL=2 TODO: REPLACE
     * @property {number} ALT_EXTERNAL=3 TODO: REPLACE
     * @property {number} ALT_BAROMETRIC=4 TODO: REPLACE
     */
    Position.AltSource = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'ALT_UNSET')] = 0
      values[(valuesById[1] = 'ALT_MANUAL')] = 1
      values[(valuesById[2] = 'ALT_INTERNAL')] = 2
      values[(valuesById[3] = 'ALT_EXTERNAL')] = 3
      values[(valuesById[4] = 'ALT_BAROMETRIC')] = 4
      return values
    })()

    return Position
  })()

  /**
   * Note: these enum names must EXACTLY match the string used in the device
   * bin/build-all.sh script.
   * Because they will be used to find firmware filenames in the android app for OTA updates.
   * To match the old style filenames, _ is converted to -, p is converted to .
   * @name meshtastic.HardwareModel
   * @enum {number}
   * @property {number} UNSET=0 TODO: REPLACE
   * @property {number} TLORA_V2=1 TODO: REPLACE
   * @property {number} TLORA_V1=2 TODO: REPLACE
   * @property {number} TLORA_V2_1_1P6=3 TODO: REPLACE
   * @property {number} TBEAM=4 TODO: REPLACE
   * @property {number} HELTEC_V2_0=5 The original heltec WiFi_Lora_32_V2, which had battery voltage sensing hooked to GPIO 13
   * (see HELTEC_V2 for the new version).
   * @property {number} TBEAM_V0P7=6 TODO: REPLACE
   * @property {number} T_ECHO=7 TODO: REPLACE
   * @property {number} TLORA_V1_1P3=8 TODO: REPLACE
   * @property {number} RAK4631=9 TODO: REPLACE
   * @property {number} HELTEC_V2_1=10 The new version of the heltec WiFi_Lora_32_V2 board that has battery sensing hooked to GPIO 37.
   * Sadly they did not update anything on the silkscreen to identify this board
   * @property {number} HELTEC_V1=11 Ancient heltec WiFi_Lora_32 board
   * @property {number} LILYGO_TBEAM_S3_CORE=12 New T-BEAM with ESP32-S3 CPU
   * @property {number} RAK11200=13 RAK WisBlock ESP32 core: https://docs.rakwireless.com/Product-Categories/WisBlock/RAK11200/Overview/
   * @property {number} NANO_G1=14 B&Q Consulting Nano Edition G1: https://uniteng.com/wiki/doku.php?id=meshtastic:nano
   * @property {number} TLORA_V2_1_1P8=15 TODO: REPLACE
   * @property {number} TLORA_T3_S3=16 TODO: REPLACE
   * @property {number} NANO_G1_EXPLORER=17 B&Q Consulting Nano G1 Explorer: https://wiki.uniteng.com/en/meshtastic/nano-g1-explorer
   * @property {number} NANO_G2_ULTRA=18 B&Q Consulting Nano G2 Ultra: https://wiki.uniteng.com/en/meshtastic/nano-g2-ultra
   * @property {number} LORA_TYPE=19 LoRAType device: https://loratype.org/
   * @property {number} WIPHONE=20 wiphone https://www.wiphone.io/
   * @property {number} WIO_WM1110=21 WIO Tracker WM1110 family from Seeed Studio. Includes wio-1110-tracker and wio-1110-sdk
   * @property {number} RAK2560=22 RAK2560 Solar base station based on RAK4630
   * @property {number} HELTEC_HRU_3601=23 Heltec HRU-3601: https://heltec.org/project/hru-3601/
   * @property {number} STATION_G1=25 B&Q Consulting Station Edition G1: https://uniteng.com/wiki/doku.php?id=meshtastic:station
   * @property {number} RAK11310=26 RAK11310 (RP2040 + SX1262)
   * @property {number} SENSELORA_RP2040=27 Makerfabs SenseLoRA Receiver (RP2040 + RFM96)
   * @property {number} SENSELORA_S3=28 Makerfabs SenseLoRA Industrial Monitor (ESP32-S3 + RFM96)
   * @property {number} CANARYONE=29 Canary Radio Company - CanaryOne: https://canaryradio.io/products/canaryone
   * @property {number} RP2040_LORA=30 Waveshare RP2040 LoRa - https://www.waveshare.com/rp2040-lora.htm
   * @property {number} STATION_G2=31 B&Q Consulting Station G2: https://wiki.uniteng.com/en/meshtastic/station-g2
   * @property {number} LORA_RELAY_V1=32 ---------------------------------------------------------------------------
   * Less common/prototype boards listed here (needs one more byte over the air)
   * ---------------------------------------------------------------------------
   * @property {number} NRF52840DK=33 TODO: REPLACE
   * @property {number} PPR=34 TODO: REPLACE
   * @property {number} GENIEBLOCKS=35 TODO: REPLACE
   * @property {number} NRF52_UNKNOWN=36 TODO: REPLACE
   * @property {number} PORTDUINO=37 TODO: REPLACE
   * @property {number} ANDROID_SIM=38 The simulator built into the android app
   * @property {number} DIY_V1=39 Custom DIY device based on @NanoVHF schematics: https://github.com/NanoVHF/Meshtastic-DIY/tree/main/Schematics
   * @property {number} NRF52840_PCA10059=40 nRF52840 Dongle : https://www.nordicsemi.com/Products/Development-hardware/nrf52840-dongle/
   * @property {number} DR_DEV=41 Custom Disaster Radio esp32 v3 device https://github.com/sudomesh/disaster-radio/tree/master/hardware/board_esp32_v3
   * @property {number} M5STACK=42 M5 esp32 based MCU modules with enclosure, TFT and LORA Shields. All Variants (Basic, Core, Fire, Core2, Paper) https://m5stack.com/
   * @property {number} HELTEC_V3=43 New Heltec LoRA32 with ESP32-S3 CPU
   * @property {number} HELTEC_WSL_V3=44 New Heltec Wireless Stick Lite with ESP32-S3 CPU
   * @property {number} BETAFPV_2400_TX=45 New BETAFPV ELRS Micro TX Module 2.4G with ESP32 CPU
   * @property {number} BETAFPV_900_NANO_TX=46 BetaFPV ExpressLRS "Nano" TX Module 900MHz with ESP32 CPU
   * @property {number} RPI_PICO=47 Raspberry Pi Pico (W) with Waveshare SX1262 LoRa Node Module
   * @property {number} HELTEC_WIRELESS_TRACKER=48 Heltec Wireless Tracker with ESP32-S3 CPU, built-in GPS, and TFT
   * Newer V1.1, version is written on the PCB near the display.
   * @property {number} HELTEC_WIRELESS_PAPER=49 Heltec Wireless Paper with ESP32-S3 CPU and E-Ink display
   * @property {number} T_DECK=50 LilyGo T-Deck with ESP32-S3 CPU, Keyboard and IPS display
   * @property {number} T_WATCH_S3=51 LilyGo T-Watch S3 with ESP32-S3 CPU and IPS display
   * @property {number} PICOMPUTER_S3=52 Bobricius Picomputer with ESP32-S3 CPU, Keyboard and IPS display
   * @property {number} HELTEC_HT62=53 Heltec HT-CT62 with ESP32-C3 CPU and SX1262 LoRa
   * @property {number} EBYTE_ESP32_S3=54 EBYTE SPI LoRa module and ESP32-S3
   * @property {number} ESP32_S3_PICO=55 Waveshare ESP32-S3-PICO with PICO LoRa HAT and 2.9inch e-Ink
   * @property {number} CHATTER_2=56 CircuitMess Chatter 2 LLCC68 Lora Module and ESP32 Wroom
   * Lora module can be swapped out for a Heltec RA-62 which is "almost" pin compatible
   * with one cut and one jumper Meshtastic works
   * @property {number} HELTEC_WIRELESS_PAPER_V1_0=57 Heltec Wireless Paper, With ESP32-S3 CPU and E-Ink display
   * Older "V1.0" Variant, has no "version sticker"
   * E-Ink model is DEPG0213BNS800
   * Tab on the screen protector is RED
   * Flex connector marking is FPC-7528B
   * @property {number} HELTEC_WIRELESS_TRACKER_V1_0=58 Heltec Wireless Tracker with ESP32-S3 CPU, built-in GPS, and TFT
   * Older "V1.0" Variant
   * @property {number} UNPHONE=59 unPhone with ESP32-S3, TFT touchscreen,  LSM6DS3TR-C accelerometer and gyroscope
   * @property {number} TD_LORAC=60 Teledatics TD-LORAC NRF52840 based M.2 LoRA module
   * Compatible with the TD-WRLS development board
   * @property {number} CDEBYTE_EORA_S3=61 CDEBYTE EoRa-S3 board using their own MM modules, clone of LILYGO T3S3
   * @property {number} TWC_MESH_V4=62 TWC_MESH_V4
   * Adafruit NRF52840 feather express with SX1262, SSD1306 OLED and NEO6M GPS
   * @property {number} NRF52_PROMICRO_DIY=63 NRF52_PROMICRO_DIY
   * Promicro NRF52840 with SX1262/LLCC68, SSD1306 OLED and NEO6M GPS
   * @property {number} RADIOMASTER_900_BANDIT_NANO=64 RadioMaster 900 Bandit Nano, https://www.radiomasterrc.com/products/bandit-nano-expresslrs-rf-module
   * ESP32-D0WDQ6 With SX1276/SKY66122, SSD1306 OLED and No GPS
   * @property {number} HELTEC_CAPSULE_SENSOR_V3=65 Heltec Capsule Sensor V3 with ESP32-S3 CPU, Portable LoRa device that can replace GNSS modules or sensors
   * @property {number} HELTEC_VISION_MASTER_T190=66 Heltec Vision Master T190 with ESP32-S3 CPU, and a 1.90 inch TFT display
   * @property {number} HELTEC_VISION_MASTER_E213=67 Heltec Vision Master E213 with ESP32-S3 CPU, and a 2.13 inch E-Ink display
   * @property {number} HELTEC_VISION_MASTER_E290=68 Heltec Vision Master E290 with ESP32-S3 CPU, and a 2.9 inch E-Ink display
   * @property {number} HELTEC_MESH_NODE_T114=69 Heltec Mesh Node T114 board with nRF52840 CPU, and a 1.14 inch TFT display, Ultimate low-power design,
   * specifically adapted for the Meshtatic project
   * @property {number} PRIVATE_HW=255 ------------------------------------------------------------------------------------------------------------------------------------------
   * Reserved ID For developing private Ports. These will show up in live traffic sparsely, so we can use a high number. Keep it within 8 bits.
   * ------------------------------------------------------------------------------------------------------------------------------------------
   */
  meshtastic.HardwareModel = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'UNSET')] = 0
    values[(valuesById[1] = 'TLORA_V2')] = 1
    values[(valuesById[2] = 'TLORA_V1')] = 2
    values[(valuesById[3] = 'TLORA_V2_1_1P6')] = 3
    values[(valuesById[4] = 'TBEAM')] = 4
    values[(valuesById[5] = 'HELTEC_V2_0')] = 5
    values[(valuesById[6] = 'TBEAM_V0P7')] = 6
    values[(valuesById[7] = 'T_ECHO')] = 7
    values[(valuesById[8] = 'TLORA_V1_1P3')] = 8
    values[(valuesById[9] = 'RAK4631')] = 9
    values[(valuesById[10] = 'HELTEC_V2_1')] = 10
    values[(valuesById[11] = 'HELTEC_V1')] = 11
    values[(valuesById[12] = 'LILYGO_TBEAM_S3_CORE')] = 12
    values[(valuesById[13] = 'RAK11200')] = 13
    values[(valuesById[14] = 'NANO_G1')] = 14
    values[(valuesById[15] = 'TLORA_V2_1_1P8')] = 15
    values[(valuesById[16] = 'TLORA_T3_S3')] = 16
    values[(valuesById[17] = 'NANO_G1_EXPLORER')] = 17
    values[(valuesById[18] = 'NANO_G2_ULTRA')] = 18
    values[(valuesById[19] = 'LORA_TYPE')] = 19
    values[(valuesById[20] = 'WIPHONE')] = 20
    values[(valuesById[21] = 'WIO_WM1110')] = 21
    values[(valuesById[22] = 'RAK2560')] = 22
    values[(valuesById[23] = 'HELTEC_HRU_3601')] = 23
    values[(valuesById[25] = 'STATION_G1')] = 25
    values[(valuesById[26] = 'RAK11310')] = 26
    values[(valuesById[27] = 'SENSELORA_RP2040')] = 27
    values[(valuesById[28] = 'SENSELORA_S3')] = 28
    values[(valuesById[29] = 'CANARYONE')] = 29
    values[(valuesById[30] = 'RP2040_LORA')] = 30
    values[(valuesById[31] = 'STATION_G2')] = 31
    values[(valuesById[32] = 'LORA_RELAY_V1')] = 32
    values[(valuesById[33] = 'NRF52840DK')] = 33
    values[(valuesById[34] = 'PPR')] = 34
    values[(valuesById[35] = 'GENIEBLOCKS')] = 35
    values[(valuesById[36] = 'NRF52_UNKNOWN')] = 36
    values[(valuesById[37] = 'PORTDUINO')] = 37
    values[(valuesById[38] = 'ANDROID_SIM')] = 38
    values[(valuesById[39] = 'DIY_V1')] = 39
    values[(valuesById[40] = 'NRF52840_PCA10059')] = 40
    values[(valuesById[41] = 'DR_DEV')] = 41
    values[(valuesById[42] = 'M5STACK')] = 42
    values[(valuesById[43] = 'HELTEC_V3')] = 43
    values[(valuesById[44] = 'HELTEC_WSL_V3')] = 44
    values[(valuesById[45] = 'BETAFPV_2400_TX')] = 45
    values[(valuesById[46] = 'BETAFPV_900_NANO_TX')] = 46
    values[(valuesById[47] = 'RPI_PICO')] = 47
    values[(valuesById[48] = 'HELTEC_WIRELESS_TRACKER')] = 48
    values[(valuesById[49] = 'HELTEC_WIRELESS_PAPER')] = 49
    values[(valuesById[50] = 'T_DECK')] = 50
    values[(valuesById[51] = 'T_WATCH_S3')] = 51
    values[(valuesById[52] = 'PICOMPUTER_S3')] = 52
    values[(valuesById[53] = 'HELTEC_HT62')] = 53
    values[(valuesById[54] = 'EBYTE_ESP32_S3')] = 54
    values[(valuesById[55] = 'ESP32_S3_PICO')] = 55
    values[(valuesById[56] = 'CHATTER_2')] = 56
    values[(valuesById[57] = 'HELTEC_WIRELESS_PAPER_V1_0')] = 57
    values[(valuesById[58] = 'HELTEC_WIRELESS_TRACKER_V1_0')] = 58
    values[(valuesById[59] = 'UNPHONE')] = 59
    values[(valuesById[60] = 'TD_LORAC')] = 60
    values[(valuesById[61] = 'CDEBYTE_EORA_S3')] = 61
    values[(valuesById[62] = 'TWC_MESH_V4')] = 62
    values[(valuesById[63] = 'NRF52_PROMICRO_DIY')] = 63
    values[(valuesById[64] = 'RADIOMASTER_900_BANDIT_NANO')] = 64
    values[(valuesById[65] = 'HELTEC_CAPSULE_SENSOR_V3')] = 65
    values[(valuesById[66] = 'HELTEC_VISION_MASTER_T190')] = 66
    values[(valuesById[67] = 'HELTEC_VISION_MASTER_E213')] = 67
    values[(valuesById[68] = 'HELTEC_VISION_MASTER_E290')] = 68
    values[(valuesById[69] = 'HELTEC_MESH_NODE_T114')] = 69
    values[(valuesById[255] = 'PRIVATE_HW')] = 255
    return values
  })()

  meshtastic.User = (function () {
    /**
     * Properties of a User.
     * @memberof meshtastic
     * @interface IUser
     * @property {string|null} [id] A globally unique ID string for this user.
     * In the case of Signal that would mean +16504442323, for the default macaddr derived id it would be !<8 hexidecimal bytes>.
     * Note: app developers are encouraged to also use the following standard
     * node IDs "^all" (for broadcast), "^local" (for the locally connected node)
     * @property {string|null} [longName] A full name for this user, i.e. "Kevin Hester"
     * @property {string|null} [shortName] A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     * @property {Uint8Array|null} [macaddr] Deprecated in Meshtastic 2.1.x
     * This is the addr of the radio.
     * Not populated by the phone, but added by the esp32 when broadcasting
     * @property {meshtastic.HardwareModel|null} [hwModel] TBEAM, HELTEC, etc...
     * Starting in 1.2.11 moved to hw_model enum in the NodeInfo object.
     * Apps will still need the string here for older builds
     * (so OTA update can find the right image), but if the enum is available it will be used instead.
     * @property {boolean|null} [isLicensed] In some regions Ham radio operators have different bandwidth limitations than others.
     * If this user is a licensed operator, set this flag.
     * Also, "long_name" should be their licence number.
     * @property {meshtastic.Config.DeviceConfig.Role|null} [role] Indicates that the user's role in the mesh
     */

    /**
     * Constructs a new User.
     * @memberof meshtastic
     * @classdesc Broadcast when a newly powered mesh node wants to find a node num it can use
     * Sent from the phone over bluetooth to set the user id for the owner of this node.
     * Also sent from nodes to each other when a new node signs on (so all clients can have this info)
     * The algorithm is as follows:
     * when a node starts up, it broadcasts their user and the normal flow is for all
     * other nodes to reply with their User as well (so the new node can build its nodedb)
     * If a node ever receives a User (not just the first broadcast) message where
     * the sender node number equals our node number, that indicates a collision has
     * occurred and the following steps should happen:
     * If the receiving node (that was already in the mesh)'s macaddr is LOWER than the
     * new User who just tried to sign in: it gets to keep its nodenum.
     * We send a broadcast message of OUR User (we use a broadcast so that the other node can
     * receive our message, considering we have the same id - it also serves to let
     * observers correct their nodedb) - this case is rare so it should be okay.
     * If any node receives a User where the macaddr is GTE than their local macaddr,
     * they have been vetoed and should pick a new random nodenum (filtering against
     * whatever it knows about the nodedb) and rebroadcast their User.
     * A few nodenums are reserved and will never be requested:
     * 0xff - broadcast
     * 0 through 3 - for future use
     * @implements IUser
     * @constructor
     * @param {meshtastic.IUser=} [properties] Properties to set
     */
    function User(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * A globally unique ID string for this user.
     * In the case of Signal that would mean +16504442323, for the default macaddr derived id it would be !<8 hexidecimal bytes>.
     * Note: app developers are encouraged to also use the following standard
     * node IDs "^all" (for broadcast), "^local" (for the locally connected node)
     * @member {string|null|undefined} id
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.id = null

    /**
     * A full name for this user, i.e. "Kevin Hester"
     * @member {string|null|undefined} longName
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.longName = null

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     * @member {string|null|undefined} shortName
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.shortName = null

    /**
     * Deprecated in Meshtastic 2.1.x
     * This is the addr of the radio.
     * Not populated by the phone, but added by the esp32 when broadcasting
     * @member {Uint8Array|null|undefined} macaddr
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.macaddr = null

    /**
     * TBEAM, HELTEC, etc...
     * Starting in 1.2.11 moved to hw_model enum in the NodeInfo object.
     * Apps will still need the string here for older builds
     * (so OTA update can find the right image), but if the enum is available it will be used instead.
     * @member {meshtastic.HardwareModel|null|undefined} hwModel
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.hwModel = null

    /**
     * In some regions Ham radio operators have different bandwidth limitations than others.
     * If this user is a licensed operator, set this flag.
     * Also, "long_name" should be their licence number.
     * @member {boolean|null|undefined} isLicensed
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.isLicensed = null

    /**
     * Indicates that the user's role in the mesh
     * @member {meshtastic.Config.DeviceConfig.Role|null|undefined} role
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.role = null

    /**
     * Decodes a User message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.User
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.User} User
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    User.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.User()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.id = reader.string()
            break
          }
          case 2: {
            message.longName = reader.string()
            break
          }
          case 3: {
            message.shortName = reader.string()
            break
          }
          case 4: {
            message.macaddr = reader.bytes()
            break
          }
          case 5: {
            message.hwModel = reader.int32()
            break
          }
          case 6: {
            message.isLicensed = reader.bool()
            break
          }
          case 7: {
            message.role = reader.int32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return User
  })()

  meshtastic.RouteDiscovery = (function () {
    /**
     * Properties of a RouteDiscovery.
     * @memberof meshtastic
     * @interface IRouteDiscovery
     * @property {Array.<number>|null} [route] The list of nodenums this packet has visited so far
     */

    /**
     * Constructs a new RouteDiscovery.
     * @memberof meshtastic
     * @classdesc A message used in our Dynamic Source Routing protocol (RFC 4728 based)
     * @implements IRouteDiscovery
     * @constructor
     * @param {meshtastic.IRouteDiscovery=} [properties] Properties to set
     */
    function RouteDiscovery(properties) {
      this.route = []
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The list of nodenums this packet has visited so far
     * @member {Array.<number>} route
     * @memberof meshtastic.RouteDiscovery
     * @instance
     */
    RouteDiscovery.prototype.route = $util.emptyArray

    /**
     * Decodes a RouteDiscovery message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.RouteDiscovery
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.RouteDiscovery} RouteDiscovery
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RouteDiscovery.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.RouteDiscovery()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            if (!(message.route && message.route.length)) message.route = []
            if ((tag & 7) === 2) {
              let end2 = reader.uint32() + reader.pos
              while (reader.pos < end2) message.route.push(reader.fixed32())
            } else message.route.push(reader.fixed32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return RouteDiscovery
  })()

  meshtastic.Routing = (function () {
    /**
     * Properties of a Routing.
     * @memberof meshtastic
     * @interface IRouting
     * @property {meshtastic.IRouteDiscovery|null} [routeRequest] A route request going from the requester
     * @property {meshtastic.IRouteDiscovery|null} [routeReply] A route reply
     * @property {meshtastic.Routing.Error|null} [errorReason] A failure in delivering a message (usually used for routing control messages, but might be provided
     * in addition to ack.fail_id to provide details on the type of failure).
     */

    /**
     * Constructs a new Routing.
     * @memberof meshtastic
     * @classdesc A Routing control Data packet handled by the routing module
     * @implements IRouting
     * @constructor
     * @param {meshtastic.IRouting=} [properties] Properties to set
     */
    function Routing(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * A route request going from the requester
     * @member {meshtastic.IRouteDiscovery|null|undefined} routeRequest
     * @memberof meshtastic.Routing
     * @instance
     */
    Routing.prototype.routeRequest = null

    /**
     * A route reply
     * @member {meshtastic.IRouteDiscovery|null|undefined} routeReply
     * @memberof meshtastic.Routing
     * @instance
     */
    Routing.prototype.routeReply = null

    /**
     * A failure in delivering a message (usually used for routing control messages, but might be provided
     * in addition to ack.fail_id to provide details on the type of failure).
     * @member {meshtastic.Routing.Error|null|undefined} errorReason
     * @memberof meshtastic.Routing
     * @instance
     */
    Routing.prototype.errorReason = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Routing variant.
     * @member {"routeRequest"|"routeReply"|"errorReason"|undefined} variant
     * @memberof meshtastic.Routing
     * @instance
     */
    Object.defineProperty(Routing.prototype, 'variant', {
      get: $util.oneOfGetter(($oneOfFields = ['routeRequest', 'routeReply', 'errorReason'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a Routing message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Routing
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Routing} Routing
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Routing.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Routing()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.routeRequest = $root.meshtastic.RouteDiscovery.decode(reader, reader.uint32())
            break
          }
          case 2: {
            message.routeReply = $root.meshtastic.RouteDiscovery.decode(reader, reader.uint32())
            break
          }
          case 3: {
            message.errorReason = reader.int32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * A failure in delivering a message (usually used for routing control messages, but might be provided in addition to ack.fail_id to provide
     * details on the type of failure).
     * @name meshtastic.Routing.Error
     * @enum {number}
     * @property {number} NONE=0 This message is not a failure
     * @property {number} NO_ROUTE=1 Our node doesn't have a route to the requested destination anymore.
     * @property {number} GOT_NAK=2 We received a nak while trying to forward on your behalf
     * @property {number} TIMEOUT=3 TODO: REPLACE
     * @property {number} NO_INTERFACE=4 No suitable interface could be found for delivering this packet
     * @property {number} MAX_RETRANSMIT=5 We reached the max retransmission count (typically for naive flood routing)
     * @property {number} NO_CHANNEL=6 No suitable channel was found for sending this packet (i.e. was requested channel index disabled?)
     * @property {number} TOO_LARGE=7 The packet was too big for sending (exceeds interface MTU after encoding)
     * @property {number} NO_RESPONSE=8 The request had want_response set, the request reached the destination node, but no service on that node wants to send a response
     * (possibly due to bad channel permissions)
     * @property {number} DUTY_CYCLE_LIMIT=9 Cannot send currently because duty cycle regulations will be violated.
     * @property {number} BAD_REQUEST=32 The application layer service on the remote node received your request, but considered your request somehow invalid
     * @property {number} NOT_AUTHORIZED=33 The application layer service on the remote node received your request, but considered your request not authorized
     * (i.e you did not send the request on the required bound channel)
     */
    Routing.Error = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'NONE')] = 0
      values[(valuesById[1] = 'NO_ROUTE')] = 1
      values[(valuesById[2] = 'GOT_NAK')] = 2
      values[(valuesById[3] = 'TIMEOUT')] = 3
      values[(valuesById[4] = 'NO_INTERFACE')] = 4
      values[(valuesById[5] = 'MAX_RETRANSMIT')] = 5
      values[(valuesById[6] = 'NO_CHANNEL')] = 6
      values[(valuesById[7] = 'TOO_LARGE')] = 7
      values[(valuesById[8] = 'NO_RESPONSE')] = 8
      values[(valuesById[9] = 'DUTY_CYCLE_LIMIT')] = 9
      values[(valuesById[32] = 'BAD_REQUEST')] = 32
      values[(valuesById[33] = 'NOT_AUTHORIZED')] = 33
      return values
    })()

    return Routing
  })()

  meshtastic.Data = (function () {
    /**
     * Properties of a Data.
     * @memberof meshtastic
     * @interface IData
     * @property {meshtastic.PortNum|null} [portnum] Formerly named typ and of type Type
     * @property {Uint8Array|null} [payload] TODO: REPLACE
     * @property {boolean|null} [wantResponse] Not normally used, but for testing a sender can request that recipient
     * responds in kind (i.e. if it received a position, it should unicast back it's position).
     * Note: that if you set this on a broadcast you will receive many replies.
     * @property {number|null} [dest] The address of the destination node.
     * This field is is filled in by the mesh radio device software, application
     * layer software should never need it.
     * RouteDiscovery messages _must_ populate this.
     * Other message types might need to if they are doing multihop routing.
     * @property {number|null} [source] The address of the original sender for this message.
     * This field should _only_ be populated for reliable multihop packets (to keep
     * packets small).
     * @property {number|null} [requestId] Only used in routing or response messages.
     * Indicates the original message ID that this message is reporting failure on. (formerly called original_id)
     * @property {number|null} [replyId] If set, this message is intened to be a reply to a previously sent message with the defined id.
     * @property {number|null} [emoji] Defaults to false. If true, then what is in the payload should be treated as an emoji like giving
     * a message a heart or poop emoji.
     */

    /**
     * Constructs a new Data.
     * @memberof meshtastic
     * @classdesc (Formerly called SubPacket)
     * The payload portion fo a packet, this is the actual bytes that are sent
     * inside a radio packet (because from/to are broken out by the comms library)
     * @implements IData
     * @constructor
     * @param {meshtastic.IData=} [properties] Properties to set
     */
    function Data(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Formerly named typ and of type Type
     * @member {meshtastic.PortNum|null|undefined} portnum
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.portnum = null

    /**
     * TODO: REPLACE
     * @member {Uint8Array|null|undefined} payload
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.payload = null

    /**
     * Not normally used, but for testing a sender can request that recipient
     * responds in kind (i.e. if it received a position, it should unicast back it's position).
     * Note: that if you set this on a broadcast you will receive many replies.
     * @member {boolean|null|undefined} wantResponse
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.wantResponse = null

    /**
     * The address of the destination node.
     * This field is is filled in by the mesh radio device software, application
     * layer software should never need it.
     * RouteDiscovery messages _must_ populate this.
     * Other message types might need to if they are doing multihop routing.
     * @member {number|null|undefined} dest
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.dest = null

    /**
     * The address of the original sender for this message.
     * This field should _only_ be populated for reliable multihop packets (to keep
     * packets small).
     * @member {number|null|undefined} source
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.source = null

    /**
     * Only used in routing or response messages.
     * Indicates the original message ID that this message is reporting failure on. (formerly called original_id)
     * @member {number|null|undefined} requestId
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.requestId = null

    /**
     * If set, this message is intened to be a reply to a previously sent message with the defined id.
     * @member {number|null|undefined} replyId
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.replyId = null

    /**
     * Defaults to false. If true, then what is in the payload should be treated as an emoji like giving
     * a message a heart or poop emoji.
     * @member {number|null|undefined} emoji
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.emoji = null

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Data()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.portnum = reader.int32()
            break
          }
          case 2: {
            message.payload = reader.bytes()
            break
          }
          case 3: {
            message.wantResponse = reader.bool()
            break
          }
          case 4: {
            message.dest = reader.fixed32()
            break
          }
          case 5: {
            message.source = reader.fixed32()
            break
          }
          case 6: {
            message.requestId = reader.fixed32()
            break
          }
          case 7: {
            message.replyId = reader.fixed32()
            break
          }
          case 8: {
            message.emoji = reader.fixed32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Data
  })()

  meshtastic.Waypoint = (function () {
    /**
     * Properties of a Waypoint.
     * @memberof meshtastic
     * @interface IWaypoint
     * @property {number|null} [id] Id of the waypoint
     * @property {number|null} [latitudeI] latitude_i
     * @property {number|null} [longitudeI] longitude_i
     * @property {number|null} [expire] Time the waypoint is to expire (epoch)
     * @property {number|null} [lockedTo] If greater than zero, treat the value as a nodenum only allowing them to update the waypoint.
     * If zero, the waypoint is open to be edited by any member of the mesh.
     * @property {string|null} [name] Name of the waypoint - max 30 chars
     * @property {string|null} [description] Description of the waypoint - max 100 chars
     * @property {number|null} [icon] Designator icon for the waypoint in the form of a unicode emoji
     */

    /**
     * Constructs a new Waypoint.
     * @memberof meshtastic
     * @classdesc Waypoint message, used to share arbitrary locations across the mesh
     * @implements IWaypoint
     * @constructor
     * @param {meshtastic.IWaypoint=} [properties] Properties to set
     */
    function Waypoint(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Id of the waypoint
     * @member {number|null|undefined} id
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.id = null

    /**
     * latitude_i
     * @member {number|null|undefined} latitudeI
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.latitudeI = null

    /**
     * longitude_i
     * @member {number|null|undefined} longitudeI
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.longitudeI = null

    /**
     * Time the waypoint is to expire (epoch)
     * @member {number|null|undefined} expire
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.expire = null

    /**
     * If greater than zero, treat the value as a nodenum only allowing them to update the waypoint.
     * If zero, the waypoint is open to be edited by any member of the mesh.
     * @member {number|null|undefined} lockedTo
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.lockedTo = null

    /**
     * Name of the waypoint - max 30 chars
     * @member {string|null|undefined} name
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.name = null

    /**
     * Description of the waypoint - max 100 chars
     * @member {string|null|undefined} description
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.description = null

    /**
     * Designator icon for the waypoint in the form of a unicode emoji
     * @member {number|null|undefined} icon
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.icon = null

    /**
     * Decodes a Waypoint message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Waypoint
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Waypoint} Waypoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Waypoint.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Waypoint()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.id = reader.uint32()
            break
          }
          case 2: {
            message.latitudeI = reader.sfixed32()
            break
          }
          case 3: {
            message.longitudeI = reader.sfixed32()
            break
          }
          case 4: {
            message.expire = reader.uint32()
            break
          }
          case 5: {
            message.lockedTo = reader.uint32()
            break
          }
          case 6: {
            message.name = reader.string()
            break
          }
          case 7: {
            message.description = reader.string()
            break
          }
          case 8: {
            message.icon = reader.fixed32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Waypoint
  })()

  meshtastic.MqttClientProxyMessage = (function () {
    /**
     * Properties of a MqttClientProxyMessage.
     * @memberof meshtastic
     * @interface IMqttClientProxyMessage
     * @property {string|null} [topic] The MQTT topic this message will be sent /received on
     * @property {Uint8Array|null} [data] Bytes
     * @property {string|null} [text] Text
     * @property {boolean|null} [retained] Whether the message should be retained (or not)
     */

    /**
     * Constructs a new MqttClientProxyMessage.
     * @memberof meshtastic
     * @classdesc This message will be proxied over the PhoneAPI for the client to deliver to the MQTT server
     * @implements IMqttClientProxyMessage
     * @constructor
     * @param {meshtastic.IMqttClientProxyMessage=} [properties] Properties to set
     */
    function MqttClientProxyMessage(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The MQTT topic this message will be sent /received on
     * @member {string|null|undefined} topic
     * @memberof meshtastic.MqttClientProxyMessage
     * @instance
     */
    MqttClientProxyMessage.prototype.topic = null

    /**
     * Bytes
     * @member {Uint8Array|null|undefined} data
     * @memberof meshtastic.MqttClientProxyMessage
     * @instance
     */
    MqttClientProxyMessage.prototype.data = null

    /**
     * Text
     * @member {string|null|undefined} text
     * @memberof meshtastic.MqttClientProxyMessage
     * @instance
     */
    MqttClientProxyMessage.prototype.text = null

    /**
     * Whether the message should be retained (or not)
     * @member {boolean|null|undefined} retained
     * @memberof meshtastic.MqttClientProxyMessage
     * @instance
     */
    MqttClientProxyMessage.prototype.retained = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * The actual service envelope payload or text for mqtt pub / sub
     * @member {"data"|"text"|undefined} payloadVariant
     * @memberof meshtastic.MqttClientProxyMessage
     * @instance
     */
    Object.defineProperty(MqttClientProxyMessage.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(($oneOfFields = ['data', 'text'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a MqttClientProxyMessage message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.MqttClientProxyMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.MqttClientProxyMessage} MqttClientProxyMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MqttClientProxyMessage.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.MqttClientProxyMessage()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.topic = reader.string()
            break
          }
          case 2: {
            message.data = reader.bytes()
            break
          }
          case 3: {
            message.text = reader.string()
            break
          }
          case 4: {
            message.retained = reader.bool()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return MqttClientProxyMessage
  })()

  meshtastic.MeshPacket = (function () {
    /**
     * Properties of a MeshPacket.
     * @memberof meshtastic
     * @interface IMeshPacket
     * @property {number|null} [from] The sending node number.
     * Note: Our crypto implementation uses this field as well.
     * See [crypto](/docs/overview/encryption) for details.
     * @property {number|null} [to] The (immediate) destination for this packet
     * @property {number|null} [channel] (Usually) If set, this indicates the index in the secondary_channels table that this packet was sent/received on.
     * If unset, packet was on the primary channel.
     * A particular node might know only a subset of channels in use on the mesh.
     * Therefore channel_index is inherently a local concept and meaningless to send between nodes.
     * Very briefly, while sending and receiving deep inside the device Router code, this field instead
     * contains the 'channel hash' instead of the index.
     * This 'trick' is only used while the payload_variant is an 'encrypted'.
     * @property {meshtastic.IData|null} [decoded] TODO: REPLACE
     * @property {Uint8Array|null} [encrypted] TODO: REPLACE
     * @property {number|null} [id] A unique ID for this packet.
     * Always 0 for no-ack packets or non broadcast packets (and therefore take zero bytes of space).
     * Otherwise a unique ID for this packet, useful for flooding algorithms.
     * ID only needs to be unique on a _per sender_ basis, and it only
     * needs to be unique for a few minutes (long enough to last for the length of
     * any ACK or the completion of a mesh broadcast flood).
     * Note: Our crypto implementation uses this id as well.
     * See [crypto](/docs/overview/encryption) for details.
     * @property {number|null} [rxTime] The time this message was received by the esp32 (secs since 1970).
     * Note: this field is _never_ sent on the radio link itself (to save space) Times
     * are typically not sent over the mesh, but they will be added to any Packet
     * (chain of SubPacket) sent to the phone (so the phone can know exact time of reception)
     * @property {number|null} [rxSnr] *Never* sent over the radio links.
     * Set during reception to indicate the SNR of this packet.
     * Used to collect statistics on current link quality.
     * @property {number|null} [hopLimit] If unset treated as zero (no forwarding, send to adjacent nodes only)
     * if 1, allow hopping through one node, etc...
     * For our usecase real world topologies probably have a max of about 3.
     * This field is normally placed into a few of bits in the header.
     * @property {boolean|null} [wantAck] This packet is being sent as a reliable message, we would prefer it to arrive at the destination.
     * We would like to receive a ack packet in response.
     * Broadcasts messages treat this flag specially: Since acks for broadcasts would
     * rapidly flood the channel, the normal ack behavior is suppressed.
     * Instead, the original sender listens to see if at least one node is rebroadcasting this packet (because naive flooding algorithm).
     * If it hears that the odds (given typical LoRa topologies) the odds are very high that every node should eventually receive the message.
     * So FloodingRouter.cpp generates an implicit ack which is delivered to the original sender.
     * If after some time we don't hear anyone rebroadcast our packet, we will timeout and retransmit, using the regular resend logic.
     * Note: This flag is normally sent in a flag bit in the header when sent over the wire
     * @property {meshtastic.MeshPacket.Priority|null} [priority] The priority of this message for sending.
     * See MeshPacket.Priority description for more details.
     * @property {number|null} [rxRssi] rssi of received packet. Only sent to phone for dispay purposes.
     * @property {meshtastic.MeshPacket.Delayed|null} [delayed] Describe if this message is delayed
     * @property {boolean|null} [viaMqtt] Describes whether this packet passed via MQTT somewhere along the path it currently took.
     * @property {number|null} [hopStart] Hop limit with which the original packet started. Sent via LoRa using three bits in the unencrypted header.
     * When receiving a packet, the difference between hop_start and hop_limit gives how many hops it traveled.
     */

    /**
     * Constructs a new MeshPacket.
     * @memberof meshtastic
     * @classdesc A packet envelope sent/received over the mesh
     * only payload_variant is sent in the payload portion of the LORA packet.
     * The other fields are either not sent at all, or sent in the special 16 byte LORA header.
     * @implements IMeshPacket
     * @constructor
     * @param {meshtastic.IMeshPacket=} [properties] Properties to set
     */
    function MeshPacket(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The sending node number.
     * Note: Our crypto implementation uses this field as well.
     * See [crypto](/docs/overview/encryption) for details.
     * @member {number|null|undefined} from
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.from = null

    /**
     * The (immediate) destination for this packet
     * @member {number|null|undefined} to
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.to = null

    /**
     * (Usually) If set, this indicates the index in the secondary_channels table that this packet was sent/received on.
     * If unset, packet was on the primary channel.
     * A particular node might know only a subset of channels in use on the mesh.
     * Therefore channel_index is inherently a local concept and meaningless to send between nodes.
     * Very briefly, while sending and receiving deep inside the device Router code, this field instead
     * contains the 'channel hash' instead of the index.
     * This 'trick' is only used while the payload_variant is an 'encrypted'.
     * @member {number|null|undefined} channel
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.channel = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.IData|null|undefined} decoded
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.decoded = null

    /**
     * TODO: REPLACE
     * @member {Uint8Array|null|undefined} encrypted
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.encrypted = null

    /**
     * A unique ID for this packet.
     * Always 0 for no-ack packets or non broadcast packets (and therefore take zero bytes of space).
     * Otherwise a unique ID for this packet, useful for flooding algorithms.
     * ID only needs to be unique on a _per sender_ basis, and it only
     * needs to be unique for a few minutes (long enough to last for the length of
     * any ACK or the completion of a mesh broadcast flood).
     * Note: Our crypto implementation uses this id as well.
     * See [crypto](/docs/overview/encryption) for details.
     * @member {number|null|undefined} id
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.id = null

    /**
     * The time this message was received by the esp32 (secs since 1970).
     * Note: this field is _never_ sent on the radio link itself (to save space) Times
     * are typically not sent over the mesh, but they will be added to any Packet
     * (chain of SubPacket) sent to the phone (so the phone can know exact time of reception)
     * @member {number|null|undefined} rxTime
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.rxTime = null

    /**
     * *Never* sent over the radio links.
     * Set during reception to indicate the SNR of this packet.
     * Used to collect statistics on current link quality.
     * @member {number|null|undefined} rxSnr
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.rxSnr = null

    /**
     * If unset treated as zero (no forwarding, send to adjacent nodes only)
     * if 1, allow hopping through one node, etc...
     * For our usecase real world topologies probably have a max of about 3.
     * This field is normally placed into a few of bits in the header.
     * @member {number|null|undefined} hopLimit
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.hopLimit = null

    /**
     * This packet is being sent as a reliable message, we would prefer it to arrive at the destination.
     * We would like to receive a ack packet in response.
     * Broadcasts messages treat this flag specially: Since acks for broadcasts would
     * rapidly flood the channel, the normal ack behavior is suppressed.
     * Instead, the original sender listens to see if at least one node is rebroadcasting this packet (because naive flooding algorithm).
     * If it hears that the odds (given typical LoRa topologies) the odds are very high that every node should eventually receive the message.
     * So FloodingRouter.cpp generates an implicit ack which is delivered to the original sender.
     * If after some time we don't hear anyone rebroadcast our packet, we will timeout and retransmit, using the regular resend logic.
     * Note: This flag is normally sent in a flag bit in the header when sent over the wire
     * @member {boolean|null|undefined} wantAck
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.wantAck = null

    /**
     * The priority of this message for sending.
     * See MeshPacket.Priority description for more details.
     * @member {meshtastic.MeshPacket.Priority|null|undefined} priority
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.priority = null

    /**
     * rssi of received packet. Only sent to phone for dispay purposes.
     * @member {number|null|undefined} rxRssi
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.rxRssi = null

    /**
     * Describe if this message is delayed
     * @member {meshtastic.MeshPacket.Delayed|null|undefined} delayed
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.delayed = null

    /**
     * Describes whether this packet passed via MQTT somewhere along the path it currently took.
     * @member {boolean|null|undefined} viaMqtt
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.viaMqtt = null

    /**
     * Hop limit with which the original packet started. Sent via LoRa using three bits in the unencrypted header.
     * When receiving a packet, the difference between hop_start and hop_limit gives how many hops it traveled.
     * @member {number|null|undefined} hopStart
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.hopStart = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * MeshPacket payloadVariant.
     * @member {"decoded"|"encrypted"|undefined} payloadVariant
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    Object.defineProperty(MeshPacket.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(($oneOfFields = ['decoded', 'encrypted'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a MeshPacket message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.MeshPacket
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.MeshPacket} MeshPacket
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MeshPacket.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.MeshPacket()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.from = reader.fixed32()
            break
          }
          case 2: {
            message.to = reader.fixed32()
            break
          }
          case 3: {
            message.channel = reader.uint32()
            break
          }
          case 4: {
            message.decoded = $root.meshtastic.Data.decode(reader, reader.uint32())
            break
          }
          case 5: {
            message.encrypted = reader.bytes()
            break
          }
          case 6: {
            message.id = reader.fixed32()
            break
          }
          case 7: {
            message.rxTime = reader.fixed32()
            break
          }
          case 8: {
            message.rxSnr = reader.float()
            break
          }
          case 9: {
            message.hopLimit = reader.uint32()
            break
          }
          case 10: {
            message.wantAck = reader.bool()
            break
          }
          case 11: {
            message.priority = reader.int32()
            break
          }
          case 12: {
            message.rxRssi = reader.int32()
            break
          }
          case 13: {
            message.delayed = reader.int32()
            break
          }
          case 14: {
            message.viaMqtt = reader.bool()
            break
          }
          case 15: {
            message.hopStart = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * The priority of this message for sending.
     * Higher priorities are sent first (when managing the transmit queue).
     * This field is never sent over the air, it is only used internally inside of a local device node.
     * API clients (either on the local node or connected directly to the node)
     * can set this parameter if necessary.
     * (values must be <= 127 to keep protobuf field to one byte in size.
     * Detailed background on this field:
     * I noticed a funny side effect of lora being so slow: Usually when making
     * a protocol there isn’t much need to use message priority to change the order
     * of transmission (because interfaces are fairly fast).
     * But for lora where packets can take a few seconds each, it is very important
     * to make sure that critical packets are sent ASAP.
     * In the case of meshtastic that means we want to send protocol acks as soon as possible
     * (to prevent unneeded retransmissions), we want routing messages to be sent next,
     * then messages marked as reliable and finally 'background' packets like periodic position updates.
     * So I bit the bullet and implemented a new (internal - not sent over the air)
     * field in MeshPacket called 'priority'.
     * And the transmission queue in the router object is now a priority queue.
     * @name meshtastic.MeshPacket.Priority
     * @enum {number}
     * @property {number} UNSET=0 Treated as Priority.DEFAULT
     * @property {number} MIN=1 TODO: REPLACE
     * @property {number} BACKGROUND=10 Background position updates are sent with very low priority -
     * if the link is super congested they might not go out at all
     * @property {number} DEFAULT=64 This priority is used for most messages that don't have a priority set
     * @property {number} RELIABLE=70 If priority is unset but the message is marked as want_ack,
     * assume it is important and use a slightly higher priority
     * @property {number} ACK=120 Ack/naks are sent with very high priority to ensure that retransmission
     * stops as soon as possible
     * @property {number} MAX=127 TODO: REPLACE
     */
    MeshPacket.Priority = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'UNSET')] = 0
      values[(valuesById[1] = 'MIN')] = 1
      values[(valuesById[10] = 'BACKGROUND')] = 10
      values[(valuesById[64] = 'DEFAULT')] = 64
      values[(valuesById[70] = 'RELIABLE')] = 70
      values[(valuesById[120] = 'ACK')] = 120
      values[(valuesById[127] = 'MAX')] = 127
      return values
    })()

    /**
     * Identify if this is a delayed packet
     * @name meshtastic.MeshPacket.Delayed
     * @enum {number}
     * @property {number} NO_DELAY=0 If unset, the message is being sent in real time.
     * @property {number} DELAYED_BROADCAST=1 The message is delayed and was originally a broadcast
     * @property {number} DELAYED_DIRECT=2 The message is delayed and was originally a direct message
     */
    MeshPacket.Delayed = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'NO_DELAY')] = 0
      values[(valuesById[1] = 'DELAYED_BROADCAST')] = 1
      values[(valuesById[2] = 'DELAYED_DIRECT')] = 2
      return values
    })()

    return MeshPacket
  })()

  /**
   * Shared constants between device and phone
   * @name meshtastic.Constants
   * @enum {number}
   * @property {number} ZERO=0 First enum must be zero, and we are just using this enum to
   * pass int constants between two very different environments
   * @property {number} DATA_PAYLOAD_LEN=237 From mesh.options
   * note: this payload length is ONLY the bytes that are sent inside of the Data protobuf (excluding protobuf overhead). The 16 byte header is
   * outside of this envelope
   */
  meshtastic.Constants = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'ZERO')] = 0
    values[(valuesById[237] = 'DATA_PAYLOAD_LEN')] = 237
    return values
  })()

  meshtastic.NodeInfo = (function () {
    /**
     * Properties of a NodeInfo.
     * @memberof meshtastic
     * @interface INodeInfo
     * @property {number|null} [num] The node number
     * @property {meshtastic.IUser|null} [user] The user info for this node
     * @property {meshtastic.IPosition|null} [position] This position data. Note: before 1.2.14 we would also store the last time we've heard from this node in position.time, that is no longer true.
     * Position.time now indicates the last time we received a POSITION from that node.
     * @property {number|null} [snr] Returns the Signal-to-noise ratio (SNR) of the last received message,
     * as measured by the receiver. Return SNR of the last received message in dB
     * @property {number|null} [lastHeard] Set to indicate the last time we received a packet from this node
     * @property {meshtastic.IDeviceMetrics|null} [deviceMetrics] The latest device metrics for the node.
     * @property {number|null} [channel] local channel index we heard that node on. Only populated if its not the default channel.
     * @property {boolean|null} [viaMqtt] True if we witnessed the node over MQTT instead of LoRA transport
     * @property {number|null} [hopsAway] Number of hops away from us this node is (0 if adjacent)
     * @property {boolean|null} [isFavorite] True if node is in our favorites list
     * Persists between NodeDB internal clean ups
     */

    /**
     * Constructs a new NodeInfo.
     * @memberof meshtastic
     * @classdesc The bluetooth to device link:
     * Old BTLE protocol docs from TODO, merge in above and make real docs...
     * use protocol buffers, and NanoPB
     * messages from device to phone:
     * POSITION_UPDATE (..., time)
     * TEXT_RECEIVED(from, text, time)
     * OPAQUE_RECEIVED(from, payload, time) (for signal messages or other applications)
     * messages from phone to device:
     * SET_MYID(id, human readable long, human readable short) (send down the unique ID
     * string used for this node, a human readable string shown for that id, and a very
     * short human readable string suitable for oled screen) SEND_OPAQUE(dest, payload)
     * (for signal messages or other applications) SEND_TEXT(dest, text) Get all
     * nodes() (returns list of nodes, with full info, last time seen, loc, battery
     * level etc) SET_CONFIG (switches device to a new set of radio params and
     * preshared key, drops all existing nodes, force our node to rejoin this new group)
     * Full information about a node on the mesh
     * @implements INodeInfo
     * @constructor
     * @param {meshtastic.INodeInfo=} [properties] Properties to set
     */
    function NodeInfo(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The node number
     * @member {number|null|undefined} num
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.num = null

    /**
     * The user info for this node
     * @member {meshtastic.IUser|null|undefined} user
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.user = null

    /**
     * This position data. Note: before 1.2.14 we would also store the last time we've heard from this node in position.time, that is no longer true.
     * Position.time now indicates the last time we received a POSITION from that node.
     * @member {meshtastic.IPosition|null|undefined} position
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.position = null

    /**
     * Returns the Signal-to-noise ratio (SNR) of the last received message,
     * as measured by the receiver. Return SNR of the last received message in dB
     * @member {number|null|undefined} snr
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.snr = null

    /**
     * Set to indicate the last time we received a packet from this node
     * @member {number|null|undefined} lastHeard
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.lastHeard = null

    /**
     * The latest device metrics for the node.
     * @member {meshtastic.IDeviceMetrics|null|undefined} deviceMetrics
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.deviceMetrics = null

    /**
     * local channel index we heard that node on. Only populated if its not the default channel.
     * @member {number|null|undefined} channel
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.channel = null

    /**
     * True if we witnessed the node over MQTT instead of LoRA transport
     * @member {boolean|null|undefined} viaMqtt
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.viaMqtt = null

    /**
     * Number of hops away from us this node is (0 if adjacent)
     * @member {number|null|undefined} hopsAway
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.hopsAway = null

    /**
     * True if node is in our favorites list
     * Persists between NodeDB internal clean ups
     * @member {boolean|null|undefined} isFavorite
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.isFavorite = null

    /**
     * Decodes a NodeInfo message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.NodeInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.NodeInfo} NodeInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NodeInfo.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.NodeInfo()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.num = reader.uint32()
            break
          }
          case 2: {
            message.user = $root.meshtastic.User.decode(reader, reader.uint32())
            break
          }
          case 3: {
            message.position = $root.meshtastic.Position.decode(reader, reader.uint32())
            break
          }
          case 4: {
            message.snr = reader.float()
            break
          }
          case 5: {
            message.lastHeard = reader.fixed32()
            break
          }
          case 6: {
            message.deviceMetrics = $root.meshtastic.DeviceMetrics.decode(reader, reader.uint32())
            break
          }
          case 7: {
            message.channel = reader.uint32()
            break
          }
          case 8: {
            message.viaMqtt = reader.bool()
            break
          }
          case 9: {
            message.hopsAway = reader.uint32()
            break
          }
          case 10: {
            message.isFavorite = reader.bool()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return NodeInfo
  })()

  /**
   * Error codes for critical errors
   * The device might report these fault codes on the screen.
   * If you encounter a fault code, please post on the meshtastic.discourse.group
   * and we'll try to help.
   * @name meshtastic.CriticalErrorCode
   * @enum {number}
   * @property {number} NONE=0 TODO: REPLACE
   * @property {number} TX_WATCHDOG=1 A software bug was detected while trying to send lora
   * @property {number} SLEEP_ENTER_WAIT=2 A software bug was detected on entry to sleep
   * @property {number} NO_RADIO=3 No Lora radio hardware could be found
   * @property {number} UNSPECIFIED=4 Not normally used
   * @property {number} UBLOX_UNIT_FAILED=5 We failed while configuring a UBlox GPS
   * @property {number} NO_AXP192=6 This board was expected to have a power management chip and it is missing or broken
   * @property {number} INVALID_RADIO_SETTING=7 The channel tried to set a radio setting which is not supported by this chipset,
   * radio comms settings are now undefined.
   * @property {number} TRANSMIT_FAILED=8 Radio transmit hardware failure. We sent data to the radio chip, but it didn't
   * reply with an interrupt.
   * @property {number} BROWNOUT=9 We detected that the main CPU voltage dropped below the minimum acceptable value
   * @property {number} SX1262_FAILURE=10 Selftest of SX1262 radio chip failed
   * @property {number} RADIO_SPI_BUG=11 A (likely software but possibly hardware) failure was detected while trying to send packets.
   * If this occurs on your board, please post in the forum so that we can ask you to collect some information to allow fixing this bug
   */
  meshtastic.CriticalErrorCode = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'NONE')] = 0
    values[(valuesById[1] = 'TX_WATCHDOG')] = 1
    values[(valuesById[2] = 'SLEEP_ENTER_WAIT')] = 2
    values[(valuesById[3] = 'NO_RADIO')] = 3
    values[(valuesById[4] = 'UNSPECIFIED')] = 4
    values[(valuesById[5] = 'UBLOX_UNIT_FAILED')] = 5
    values[(valuesById[6] = 'NO_AXP192')] = 6
    values[(valuesById[7] = 'INVALID_RADIO_SETTING')] = 7
    values[(valuesById[8] = 'TRANSMIT_FAILED')] = 8
    values[(valuesById[9] = 'BROWNOUT')] = 9
    values[(valuesById[10] = 'SX1262_FAILURE')] = 10
    values[(valuesById[11] = 'RADIO_SPI_BUG')] = 11
    return values
  })()

  meshtastic.MyNodeInfo = (function () {
    /**
     * Properties of a MyNodeInfo.
     * @memberof meshtastic
     * @interface IMyNodeInfo
     * @property {number|null} [myNodeNum] Tells the phone what our node number is, default starting value is
     * lowbyte of macaddr, but it will be fixed if that is already in use
     * @property {number|null} [rebootCount] The total number of reboots this node has ever encountered
     * (well - since the last time we discarded preferences)
     * @property {number|null} [minAppVersion] The minimum app version that can talk to this device.
     * Phone/PC apps should compare this to their build number and if too low tell the user they must update their app
     */

    /**
     * Constructs a new MyNodeInfo.
     * @memberof meshtastic
     * @classdesc Unique local debugging info for this node
     * Note: we don't include position or the user info, because that will come in the
     * Sent to the phone in response to WantNodes.
     * @implements IMyNodeInfo
     * @constructor
     * @param {meshtastic.IMyNodeInfo=} [properties] Properties to set
     */
    function MyNodeInfo(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Tells the phone what our node number is, default starting value is
     * lowbyte of macaddr, but it will be fixed if that is already in use
     * @member {number|null|undefined} myNodeNum
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.myNodeNum = null

    /**
     * The total number of reboots this node has ever encountered
     * (well - since the last time we discarded preferences)
     * @member {number|null|undefined} rebootCount
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.rebootCount = null

    /**
     * The minimum app version that can talk to this device.
     * Phone/PC apps should compare this to their build number and if too low tell the user they must update their app
     * @member {number|null|undefined} minAppVersion
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.minAppVersion = null

    /**
     * Decodes a MyNodeInfo message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.MyNodeInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.MyNodeInfo} MyNodeInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MyNodeInfo.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.MyNodeInfo()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.myNodeNum = reader.uint32()
            break
          }
          case 8: {
            message.rebootCount = reader.uint32()
            break
          }
          case 11: {
            message.minAppVersion = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return MyNodeInfo
  })()

  meshtastic.LogRecord = (function () {
    /**
     * Properties of a LogRecord.
     * @memberof meshtastic
     * @interface ILogRecord
     * @property {string|null} [message] Log levels, chosen to match python logging conventions.
     * @property {number|null} [time] Seconds since 1970 - or 0 for unknown/unset
     * @property {string|null} [source] Usually based on thread name - if known
     * @property {meshtastic.LogRecord.Level|null} [level] Not yet set
     */

    /**
     * Constructs a new LogRecord.
     * @memberof meshtastic
     * @classdesc Debug output from the device.
     * To minimize the size of records inside the device code, if a time/source/level is not set
     * on the message it is assumed to be a continuation of the previously sent message.
     * This allows the device code to use fixed maxlen 64 byte strings for messages,
     * and then extend as needed by emitting multiple records.
     * @implements ILogRecord
     * @constructor
     * @param {meshtastic.ILogRecord=} [properties] Properties to set
     */
    function LogRecord(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Log levels, chosen to match python logging conventions.
     * @member {string|null|undefined} message
     * @memberof meshtastic.LogRecord
     * @instance
     */
    LogRecord.prototype.message = null

    /**
     * Seconds since 1970 - or 0 for unknown/unset
     * @member {number|null|undefined} time
     * @memberof meshtastic.LogRecord
     * @instance
     */
    LogRecord.prototype.time = null

    /**
     * Usually based on thread name - if known
     * @member {string|null|undefined} source
     * @memberof meshtastic.LogRecord
     * @instance
     */
    LogRecord.prototype.source = null

    /**
     * Not yet set
     * @member {meshtastic.LogRecord.Level|null|undefined} level
     * @memberof meshtastic.LogRecord
     * @instance
     */
    LogRecord.prototype.level = null

    /**
     * Decodes a LogRecord message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.LogRecord
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.LogRecord} LogRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LogRecord.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.LogRecord()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.message = reader.string()
            break
          }
          case 2: {
            message.time = reader.fixed32()
            break
          }
          case 3: {
            message.source = reader.string()
            break
          }
          case 4: {
            message.level = reader.int32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Log levels, chosen to match python logging conventions.
     * @name meshtastic.LogRecord.Level
     * @enum {number}
     * @property {number} UNSET=0 Log levels, chosen to match python logging conventions.
     * @property {number} CRITICAL=50 Log levels, chosen to match python logging conventions.
     * @property {number} ERROR=40 Log levels, chosen to match python logging conventions.
     * @property {number} WARNING=30 Log levels, chosen to match python logging conventions.
     * @property {number} INFO=20 Log levels, chosen to match python logging conventions.
     * @property {number} DEBUG=10 Log levels, chosen to match python logging conventions.
     * @property {number} TRACE=5 Log levels, chosen to match python logging conventions.
     */
    LogRecord.Level = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'UNSET')] = 0
      values[(valuesById[50] = 'CRITICAL')] = 50
      values[(valuesById[40] = 'ERROR')] = 40
      values[(valuesById[30] = 'WARNING')] = 30
      values[(valuesById[20] = 'INFO')] = 20
      values[(valuesById[10] = 'DEBUG')] = 10
      values[(valuesById[5] = 'TRACE')] = 5
      return values
    })()

    return LogRecord
  })()

  meshtastic.QueueStatus = (function () {
    /**
     * Properties of a QueueStatus.
     * @memberof meshtastic
     * @interface IQueueStatus
     * @property {number|null} [res] Last attempt to queue status, ErrorCode
     * @property {number|null} [free] Free entries in the outgoing queue
     * @property {number|null} [maxlen] Maximum entries in the outgoing queue
     * @property {number|null} [meshPacketId] What was mesh packet id that generated this response?
     */

    /**
     * Constructs a new QueueStatus.
     * @memberof meshtastic
     * @classdesc Represents a QueueStatus.
     * @implements IQueueStatus
     * @constructor
     * @param {meshtastic.IQueueStatus=} [properties] Properties to set
     */
    function QueueStatus(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Last attempt to queue status, ErrorCode
     * @member {number|null|undefined} res
     * @memberof meshtastic.QueueStatus
     * @instance
     */
    QueueStatus.prototype.res = null

    /**
     * Free entries in the outgoing queue
     * @member {number|null|undefined} free
     * @memberof meshtastic.QueueStatus
     * @instance
     */
    QueueStatus.prototype.free = null

    /**
     * Maximum entries in the outgoing queue
     * @member {number|null|undefined} maxlen
     * @memberof meshtastic.QueueStatus
     * @instance
     */
    QueueStatus.prototype.maxlen = null

    /**
     * What was mesh packet id that generated this response?
     * @member {number|null|undefined} meshPacketId
     * @memberof meshtastic.QueueStatus
     * @instance
     */
    QueueStatus.prototype.meshPacketId = null

    /**
     * Decodes a QueueStatus message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.QueueStatus
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.QueueStatus} QueueStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    QueueStatus.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.QueueStatus()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.res = reader.int32()
            break
          }
          case 2: {
            message.free = reader.uint32()
            break
          }
          case 3: {
            message.maxlen = reader.uint32()
            break
          }
          case 4: {
            message.meshPacketId = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return QueueStatus
  })()

  meshtastic.FromRadio = (function () {
    /**
     * Properties of a FromRadio.
     * @memberof meshtastic
     * @interface IFromRadio
     * @property {number|null} [id] The packet id, used to allow the phone to request missing read packets from the FIFO,
     * see our bluetooth docs
     * @property {meshtastic.IMeshPacket|null} [packet] Log levels, chosen to match python logging conventions.
     * @property {meshtastic.IMyNodeInfo|null} [myInfo] Tells the phone what our node number is, can be -1 if we've not yet joined a mesh.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     * @property {meshtastic.INodeInfo|null} [nodeInfo] One packet is sent for each node in the on radio DB
     * starts over with the first node in our DB
     * @property {meshtastic.IConfig|null} [config] Include a part of the config (was: RadioConfig radio)
     * @property {meshtastic.ILogRecord|null} [logRecord] Set to send debug console output over our protobuf stream
     * @property {number|null} [configCompleteId] Sent as true once the device has finished sending all of the responses to want_config
     * recipient should check if this ID matches our original request nonce, if
     * not, it means your config responses haven't started yet.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     * @property {boolean|null} [rebooted] Sent to tell clients the radio has just rebooted.
     * Set to true if present.
     * Not used on all transports, currently just used for the serial console.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     * @property {meshtastic.IModuleConfig|null} [moduleConfig] Include module config
     * @property {meshtastic.IChannel|null} [channel] One packet is sent for each channel
     * @property {meshtastic.IQueueStatus|null} [queueStatus] Queue status info
     * @property {meshtastic.IXModem|null} [xmodemPacket] File Transfer Chunk
     * @property {meshtastic.IDeviceMetadata|null} [metadata] Device metadata message
     * @property {meshtastic.IMqttClientProxyMessage|null} [mqttClientProxyMessage] MQTT Client Proxy Message (device sending to client / phone for publishing to MQTT)
     * @property {meshtastic.IFileInfo|null} [fileInfo] File system manifest messages
     */

    /**
     * Constructs a new FromRadio.
     * @memberof meshtastic
     * @classdesc Packets from the radio to the phone will appear on the fromRadio characteristic.
     * It will support READ and NOTIFY. When a new packet arrives the device will BLE notify?
     * It will sit in that descriptor until consumed by the phone,
     * at which point the next item in the FIFO will be populated.
     * @implements IFromRadio
     * @constructor
     * @param {meshtastic.IFromRadio=} [properties] Properties to set
     */
    function FromRadio(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The packet id, used to allow the phone to request missing read packets from the FIFO,
     * see our bluetooth docs
     * @member {number|null|undefined} id
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.id = null

    /**
     * Log levels, chosen to match python logging conventions.
     * @member {meshtastic.IMeshPacket|null|undefined} packet
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.packet = null

    /**
     * Tells the phone what our node number is, can be -1 if we've not yet joined a mesh.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     * @member {meshtastic.IMyNodeInfo|null|undefined} myInfo
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.myInfo = null

    /**
     * One packet is sent for each node in the on radio DB
     * starts over with the first node in our DB
     * @member {meshtastic.INodeInfo|null|undefined} nodeInfo
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.nodeInfo = null

    /**
     * Include a part of the config (was: RadioConfig radio)
     * @member {meshtastic.IConfig|null|undefined} config
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.config = null

    /**
     * Set to send debug console output over our protobuf stream
     * @member {meshtastic.ILogRecord|null|undefined} logRecord
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.logRecord = null

    /**
     * Sent as true once the device has finished sending all of the responses to want_config
     * recipient should check if this ID matches our original request nonce, if
     * not, it means your config responses haven't started yet.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     * @member {number|null|undefined} configCompleteId
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.configCompleteId = null

    /**
     * Sent to tell clients the radio has just rebooted.
     * Set to true if present.
     * Not used on all transports, currently just used for the serial console.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     * @member {boolean|null|undefined} rebooted
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.rebooted = null

    /**
     * Include module config
     * @member {meshtastic.IModuleConfig|null|undefined} moduleConfig
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.moduleConfig = null

    /**
     * One packet is sent for each channel
     * @member {meshtastic.IChannel|null|undefined} channel
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.channel = null

    /**
     * Queue status info
     * @member {meshtastic.IQueueStatus|null|undefined} queueStatus
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.queueStatus = null

    /**
     * File Transfer Chunk
     * @member {meshtastic.IXModem|null|undefined} xmodemPacket
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.xmodemPacket = null

    /**
     * Device metadata message
     * @member {meshtastic.IDeviceMetadata|null|undefined} metadata
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.metadata = null

    /**
     * MQTT Client Proxy Message (device sending to client / phone for publishing to MQTT)
     * @member {meshtastic.IMqttClientProxyMessage|null|undefined} mqttClientProxyMessage
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.mqttClientProxyMessage = null

    /**
     * File system manifest messages
     * @member {meshtastic.IFileInfo|null|undefined} fileInfo
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.fileInfo = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Log levels, chosen to match python logging conventions.
     * @member {"packet"|"myInfo"|"nodeInfo"|"config"|"logRecord"|"configCompleteId"|"rebooted"|"moduleConfig"|"channel"|"queueStatus"|"xmodemPacket"|"metadata"|"mqttClientProxyMessage"|"fileInfo"|undefined} payloadVariant
     * @memberof meshtastic.FromRadio
     * @instance
     */
    Object.defineProperty(FromRadio.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(
        ($oneOfFields = [
          'packet',
          'myInfo',
          'nodeInfo',
          'config',
          'logRecord',
          'configCompleteId',
          'rebooted',
          'moduleConfig',
          'channel',
          'queueStatus',
          'xmodemPacket',
          'metadata',
          'mqttClientProxyMessage',
          'fileInfo',
        ])
      ),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a FromRadio message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.FromRadio
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.FromRadio} FromRadio
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FromRadio.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.FromRadio()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.id = reader.uint32()
            break
          }
          case 2: {
            message.packet = $root.meshtastic.MeshPacket.decode(reader, reader.uint32())
            break
          }
          case 3: {
            message.myInfo = $root.meshtastic.MyNodeInfo.decode(reader, reader.uint32())
            break
          }
          case 4: {
            message.nodeInfo = $root.meshtastic.NodeInfo.decode(reader, reader.uint32())
            break
          }
          case 5: {
            message.config = $root.meshtastic.Config.decode(reader, reader.uint32())
            break
          }
          case 6: {
            message.logRecord = $root.meshtastic.LogRecord.decode(reader, reader.uint32())
            break
          }
          case 7: {
            message.configCompleteId = reader.uint32()
            break
          }
          case 8: {
            message.rebooted = reader.bool()
            break
          }
          case 9: {
            message.moduleConfig = $root.meshtastic.ModuleConfig.decode(reader, reader.uint32())
            break
          }
          case 10: {
            message.channel = $root.meshtastic.Channel.decode(reader, reader.uint32())
            break
          }
          case 11: {
            message.queueStatus = $root.meshtastic.QueueStatus.decode(reader, reader.uint32())
            break
          }
          case 12: {
            message.xmodemPacket = $root.meshtastic.XModem.decode(reader, reader.uint32())
            break
          }
          case 13: {
            message.metadata = $root.meshtastic.DeviceMetadata.decode(reader, reader.uint32())
            break
          }
          case 14: {
            message.mqttClientProxyMessage = $root.meshtastic.MqttClientProxyMessage.decode(reader, reader.uint32())
            break
          }
          case 15: {
            message.fileInfo = $root.meshtastic.FileInfo.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return FromRadio
  })()

  meshtastic.FileInfo = (function () {
    /**
     * Properties of a FileInfo.
     * @memberof meshtastic
     * @interface IFileInfo
     * @property {string|null} [fileName] The fully qualified path of the file
     * @property {number|null} [sizeBytes] The size of the file in bytes
     */

    /**
     * Constructs a new FileInfo.
     * @memberof meshtastic
     * @classdesc Individual File info for the device
     * @implements IFileInfo
     * @constructor
     * @param {meshtastic.IFileInfo=} [properties] Properties to set
     */
    function FileInfo(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The fully qualified path of the file
     * @member {string|null|undefined} fileName
     * @memberof meshtastic.FileInfo
     * @instance
     */
    FileInfo.prototype.fileName = null

    /**
     * The size of the file in bytes
     * @member {number|null|undefined} sizeBytes
     * @memberof meshtastic.FileInfo
     * @instance
     */
    FileInfo.prototype.sizeBytes = null

    /**
     * Decodes a FileInfo message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.FileInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.FileInfo} FileInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FileInfo.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.FileInfo()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.fileName = reader.string()
            break
          }
          case 2: {
            message.sizeBytes = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return FileInfo
  })()

  meshtastic.ToRadio = (function () {
    /**
     * Properties of a ToRadio.
     * @memberof meshtastic
     * @interface IToRadio
     * @property {meshtastic.IMeshPacket|null} [packet] Send this packet on the mesh
     * @property {number|null} [wantConfigId] Phone wants radio to send full node db to the phone, This is
     * typically the first packet sent to the radio when the phone gets a
     * bluetooth connection. The radio will respond by sending back a
     * MyNodeInfo, a owner, a radio config and a series of
     * FromRadio.node_infos, and config_complete
     * the integer you write into this field will be reported back in the
     * config_complete_id response this allows clients to never be confused by
     * a stale old partially sent config.
     * @property {boolean|null} [disconnect] Tell API server we are disconnecting now.
     * This is useful for serial links where there is no hardware/protocol based notification that the client has dropped the link.
     * (Sending this message is optional for clients)
     * @property {meshtastic.IXModem|null} [xmodemPacket] ToRadio xmodemPacket
     * @property {meshtastic.IMqttClientProxyMessage|null} [mqttClientProxyMessage] MQTT Client Proxy Message (for client / phone subscribed to MQTT sending to device)
     * @property {meshtastic.IHeartbeat|null} [heartbeat] Heartbeat message (used to keep the device connection awake on serial)
     */

    /**
     * Constructs a new ToRadio.
     * @memberof meshtastic
     * @classdesc Packets/commands to the radio will be written (reliably) to the toRadio characteristic.
     * Once the write completes the phone can assume it is handled.
     * @implements IToRadio
     * @constructor
     * @param {meshtastic.IToRadio=} [properties] Properties to set
     */
    function ToRadio(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Send this packet on the mesh
     * @member {meshtastic.IMeshPacket|null|undefined} packet
     * @memberof meshtastic.ToRadio
     * @instance
     */
    ToRadio.prototype.packet = null

    /**
     * Phone wants radio to send full node db to the phone, This is
     * typically the first packet sent to the radio when the phone gets a
     * bluetooth connection. The radio will respond by sending back a
     * MyNodeInfo, a owner, a radio config and a series of
     * FromRadio.node_infos, and config_complete
     * the integer you write into this field will be reported back in the
     * config_complete_id response this allows clients to never be confused by
     * a stale old partially sent config.
     * @member {number|null|undefined} wantConfigId
     * @memberof meshtastic.ToRadio
     * @instance
     */
    ToRadio.prototype.wantConfigId = null

    /**
     * Tell API server we are disconnecting now.
     * This is useful for serial links where there is no hardware/protocol based notification that the client has dropped the link.
     * (Sending this message is optional for clients)
     * @member {boolean|null|undefined} disconnect
     * @memberof meshtastic.ToRadio
     * @instance
     */
    ToRadio.prototype.disconnect = null

    /**
     * ToRadio xmodemPacket.
     * @member {meshtastic.IXModem|null|undefined} xmodemPacket
     * @memberof meshtastic.ToRadio
     * @instance
     */
    ToRadio.prototype.xmodemPacket = null

    /**
     * MQTT Client Proxy Message (for client / phone subscribed to MQTT sending to device)
     * @member {meshtastic.IMqttClientProxyMessage|null|undefined} mqttClientProxyMessage
     * @memberof meshtastic.ToRadio
     * @instance
     */
    ToRadio.prototype.mqttClientProxyMessage = null

    /**
     * Heartbeat message (used to keep the device connection awake on serial)
     * @member {meshtastic.IHeartbeat|null|undefined} heartbeat
     * @memberof meshtastic.ToRadio
     * @instance
     */
    ToRadio.prototype.heartbeat = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Log levels, chosen to match python logging conventions.
     * @member {"packet"|"wantConfigId"|"disconnect"|"xmodemPacket"|"mqttClientProxyMessage"|"heartbeat"|undefined} payloadVariant
     * @memberof meshtastic.ToRadio
     * @instance
     */
    Object.defineProperty(ToRadio.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(
        ($oneOfFields = ['packet', 'wantConfigId', 'disconnect', 'xmodemPacket', 'mqttClientProxyMessage', 'heartbeat'])
      ),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a ToRadio message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ToRadio
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ToRadio} ToRadio
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ToRadio.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ToRadio()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.packet = $root.meshtastic.MeshPacket.decode(reader, reader.uint32())
            break
          }
          case 3: {
            message.wantConfigId = reader.uint32()
            break
          }
          case 4: {
            message.disconnect = reader.bool()
            break
          }
          case 5: {
            message.xmodemPacket = $root.meshtastic.XModem.decode(reader, reader.uint32())
            break
          }
          case 6: {
            message.mqttClientProxyMessage = $root.meshtastic.MqttClientProxyMessage.decode(reader, reader.uint32())
            break
          }
          case 7: {
            message.heartbeat = $root.meshtastic.Heartbeat.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return ToRadio
  })()

  meshtastic.Compressed = (function () {
    /**
     * Properties of a Compressed.
     * @memberof meshtastic
     * @interface ICompressed
     * @property {meshtastic.PortNum|null} [portnum] PortNum to determine the how to handle the compressed payload.
     * @property {Uint8Array|null} [data] Compressed data.
     */

    /**
     * Constructs a new Compressed.
     * @memberof meshtastic
     * @classdesc Compressed message payload
     * @implements ICompressed
     * @constructor
     * @param {meshtastic.ICompressed=} [properties] Properties to set
     */
    function Compressed(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * PortNum to determine the how to handle the compressed payload.
     * @member {meshtastic.PortNum|null|undefined} portnum
     * @memberof meshtastic.Compressed
     * @instance
     */
    Compressed.prototype.portnum = null

    /**
     * Compressed data.
     * @member {Uint8Array|null|undefined} data
     * @memberof meshtastic.Compressed
     * @instance
     */
    Compressed.prototype.data = null

    /**
     * Decodes a Compressed message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Compressed
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Compressed} Compressed
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Compressed.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Compressed()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.portnum = reader.int32()
            break
          }
          case 2: {
            message.data = reader.bytes()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Compressed
  })()

  meshtastic.NeighborInfo = (function () {
    /**
     * Properties of a NeighborInfo.
     * @memberof meshtastic
     * @interface INeighborInfo
     * @property {number|null} [nodeId] The node ID of the node sending info on its neighbors
     * @property {number|null} [lastSentById] Field to pass neighbor info for the next sending cycle
     * @property {number|null} [nodeBroadcastIntervalSecs] Broadcast interval of the represented node (in seconds)
     * @property {Array.<meshtastic.INeighbor>|null} [neighbors] The list of out edges from this node
     */

    /**
     * Constructs a new NeighborInfo.
     * @memberof meshtastic
     * @classdesc Full info on edges for a single node
     * @implements INeighborInfo
     * @constructor
     * @param {meshtastic.INeighborInfo=} [properties] Properties to set
     */
    function NeighborInfo(properties) {
      this.neighbors = []
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The node ID of the node sending info on its neighbors
     * @member {number|null|undefined} nodeId
     * @memberof meshtastic.NeighborInfo
     * @instance
     */
    NeighborInfo.prototype.nodeId = null

    /**
     * Field to pass neighbor info for the next sending cycle
     * @member {number|null|undefined} lastSentById
     * @memberof meshtastic.NeighborInfo
     * @instance
     */
    NeighborInfo.prototype.lastSentById = null

    /**
     * Broadcast interval of the represented node (in seconds)
     * @member {number|null|undefined} nodeBroadcastIntervalSecs
     * @memberof meshtastic.NeighborInfo
     * @instance
     */
    NeighborInfo.prototype.nodeBroadcastIntervalSecs = null

    /**
     * The list of out edges from this node
     * @member {Array.<meshtastic.INeighbor>} neighbors
     * @memberof meshtastic.NeighborInfo
     * @instance
     */
    NeighborInfo.prototype.neighbors = $util.emptyArray

    /**
     * Decodes a NeighborInfo message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.NeighborInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.NeighborInfo} NeighborInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NeighborInfo.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.NeighborInfo()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.nodeId = reader.uint32()
            break
          }
          case 2: {
            message.lastSentById = reader.uint32()
            break
          }
          case 3: {
            message.nodeBroadcastIntervalSecs = reader.uint32()
            break
          }
          case 4: {
            if (!(message.neighbors && message.neighbors.length)) message.neighbors = []
            message.neighbors.push($root.meshtastic.Neighbor.decode(reader, reader.uint32()))
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return NeighborInfo
  })()

  meshtastic.Neighbor = (function () {
    /**
     * Properties of a Neighbor.
     * @memberof meshtastic
     * @interface INeighbor
     * @property {number|null} [nodeId] Node ID of neighbor
     * @property {number|null} [snr] SNR of last heard message
     * @property {number|null} [lastRxTime] Reception time (in secs since 1970) of last message that was last sent by this ID.
     * Note: this is for local storage only and will not be sent out over the mesh.
     * @property {number|null} [nodeBroadcastIntervalSecs] Broadcast interval of this neighbor (in seconds).
     * Note: this is for local storage only and will not be sent out over the mesh.
     */

    /**
     * Constructs a new Neighbor.
     * @memberof meshtastic
     * @classdesc A single edge in the mesh
     * @implements INeighbor
     * @constructor
     * @param {meshtastic.INeighbor=} [properties] Properties to set
     */
    function Neighbor(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Node ID of neighbor
     * @member {number|null|undefined} nodeId
     * @memberof meshtastic.Neighbor
     * @instance
     */
    Neighbor.prototype.nodeId = null

    /**
     * SNR of last heard message
     * @member {number|null|undefined} snr
     * @memberof meshtastic.Neighbor
     * @instance
     */
    Neighbor.prototype.snr = null

    /**
     * Reception time (in secs since 1970) of last message that was last sent by this ID.
     * Note: this is for local storage only and will not be sent out over the mesh.
     * @member {number|null|undefined} lastRxTime
     * @memberof meshtastic.Neighbor
     * @instance
     */
    Neighbor.prototype.lastRxTime = null

    /**
     * Broadcast interval of this neighbor (in seconds).
     * Note: this is for local storage only and will not be sent out over the mesh.
     * @member {number|null|undefined} nodeBroadcastIntervalSecs
     * @memberof meshtastic.Neighbor
     * @instance
     */
    Neighbor.prototype.nodeBroadcastIntervalSecs = null

    /**
     * Decodes a Neighbor message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Neighbor
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Neighbor} Neighbor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Neighbor.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Neighbor()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.nodeId = reader.uint32()
            break
          }
          case 2: {
            message.snr = reader.float()
            break
          }
          case 3: {
            message.lastRxTime = reader.fixed32()
            break
          }
          case 4: {
            message.nodeBroadcastIntervalSecs = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Neighbor
  })()

  meshtastic.DeviceMetadata = (function () {
    /**
     * Properties of a DeviceMetadata.
     * @memberof meshtastic
     * @interface IDeviceMetadata
     * @property {string|null} [firmwareVersion] Device firmware version string
     * @property {number|null} [deviceStateVersion] Device state version
     * @property {boolean|null} [canShutdown] Indicates whether the device can shutdown CPU natively or via power management chip
     * @property {boolean|null} [hasWifi] Indicates that the device has native wifi capability
     * @property {boolean|null} [hasBluetooth] Indicates that the device has native bluetooth capability
     * @property {boolean|null} [hasEthernet] Indicates that the device has an ethernet peripheral
     * @property {meshtastic.Config.DeviceConfig.Role|null} [role] Indicates that the device's role in the mesh
     * @property {number|null} [positionFlags] Indicates the device's current enabled position flags
     * @property {meshtastic.HardwareModel|null} [hwModel] Device hardware model
     * @property {boolean|null} [hasRemoteHardware] Has Remote Hardware enabled
     */

    /**
     * Constructs a new DeviceMetadata.
     * @memberof meshtastic
     * @classdesc Device metadata response
     * @implements IDeviceMetadata
     * @constructor
     * @param {meshtastic.IDeviceMetadata=} [properties] Properties to set
     */
    function DeviceMetadata(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Device firmware version string
     * @member {string|null|undefined} firmwareVersion
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.firmwareVersion = null

    /**
     * Device state version
     * @member {number|null|undefined} deviceStateVersion
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.deviceStateVersion = null

    /**
     * Indicates whether the device can shutdown CPU natively or via power management chip
     * @member {boolean|null|undefined} canShutdown
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.canShutdown = null

    /**
     * Indicates that the device has native wifi capability
     * @member {boolean|null|undefined} hasWifi
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasWifi = null

    /**
     * Indicates that the device has native bluetooth capability
     * @member {boolean|null|undefined} hasBluetooth
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasBluetooth = null

    /**
     * Indicates that the device has an ethernet peripheral
     * @member {boolean|null|undefined} hasEthernet
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasEthernet = null

    /**
     * Indicates that the device's role in the mesh
     * @member {meshtastic.Config.DeviceConfig.Role|null|undefined} role
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.role = null

    /**
     * Indicates the device's current enabled position flags
     * @member {number|null|undefined} positionFlags
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.positionFlags = null

    /**
     * Device hardware model
     * @member {meshtastic.HardwareModel|null|undefined} hwModel
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hwModel = null

    /**
     * Has Remote Hardware enabled
     * @member {boolean|null|undefined} hasRemoteHardware
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasRemoteHardware = null

    /**
     * Decodes a DeviceMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.DeviceMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.DeviceMetadata} DeviceMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeviceMetadata.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.DeviceMetadata()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.firmwareVersion = reader.string()
            break
          }
          case 2: {
            message.deviceStateVersion = reader.uint32()
            break
          }
          case 3: {
            message.canShutdown = reader.bool()
            break
          }
          case 4: {
            message.hasWifi = reader.bool()
            break
          }
          case 5: {
            message.hasBluetooth = reader.bool()
            break
          }
          case 6: {
            message.hasEthernet = reader.bool()
            break
          }
          case 7: {
            message.role = reader.int32()
            break
          }
          case 8: {
            message.positionFlags = reader.uint32()
            break
          }
          case 9: {
            message.hwModel = reader.int32()
            break
          }
          case 10: {
            message.hasRemoteHardware = reader.bool()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return DeviceMetadata
  })()

  meshtastic.Heartbeat = (function () {
    /**
     * Properties of a Heartbeat.
     * @memberof meshtastic
     * @interface IHeartbeat
     */

    /**
     * Constructs a new Heartbeat.
     * @memberof meshtastic
     * @classdesc A heartbeat message is sent to the node from the client to keep the connection alive.
     * This is currently only needed to keep serial connections alive, but can be used by any PhoneAPI.
     * @implements IHeartbeat
     * @constructor
     * @param {meshtastic.IHeartbeat=} [properties] Properties to set
     */
    function Heartbeat(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Decodes a Heartbeat message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Heartbeat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Heartbeat} Heartbeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Heartbeat.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Heartbeat()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Heartbeat
  })()

  meshtastic.NodeRemoteHardwarePin = (function () {
    /**
     * Properties of a NodeRemoteHardwarePin.
     * @memberof meshtastic
     * @interface INodeRemoteHardwarePin
     * @property {number|null} [nodeNum] The node_num exposing the available gpio pin
     * @property {meshtastic.IRemoteHardwarePin|null} [pin] The the available gpio pin for usage with RemoteHardware module
     */

    /**
     * Constructs a new NodeRemoteHardwarePin.
     * @memberof meshtastic
     * @classdesc RemoteHardwarePins associated with a node
     * @implements INodeRemoteHardwarePin
     * @constructor
     * @param {meshtastic.INodeRemoteHardwarePin=} [properties] Properties to set
     */
    function NodeRemoteHardwarePin(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The node_num exposing the available gpio pin
     * @member {number|null|undefined} nodeNum
     * @memberof meshtastic.NodeRemoteHardwarePin
     * @instance
     */
    NodeRemoteHardwarePin.prototype.nodeNum = null

    /**
     * The the available gpio pin for usage with RemoteHardware module
     * @member {meshtastic.IRemoteHardwarePin|null|undefined} pin
     * @memberof meshtastic.NodeRemoteHardwarePin
     * @instance
     */
    NodeRemoteHardwarePin.prototype.pin = null

    /**
     * Decodes a NodeRemoteHardwarePin message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.NodeRemoteHardwarePin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.NodeRemoteHardwarePin} NodeRemoteHardwarePin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NodeRemoteHardwarePin.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.NodeRemoteHardwarePin()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.nodeNum = reader.uint32()
            break
          }
          case 2: {
            message.pin = $root.meshtastic.RemoteHardwarePin.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return NodeRemoteHardwarePin
  })()

  meshtastic.ChunkedPayload = (function () {
    /**
     * Properties of a ChunkedPayload.
     * @memberof meshtastic
     * @interface IChunkedPayload
     * @property {number|null} [payloadId] The ID of the entire payload
     * @property {number|null} [chunkCount] The total number of chunks in the payload
     * @property {number|null} [chunkIndex] The current chunk index in the total
     * @property {Uint8Array|null} [payloadChunk] The binary data of the current chunk
     */

    /**
     * Constructs a new ChunkedPayload.
     * @memberof meshtastic
     * @classdesc Represents a ChunkedPayload.
     * @implements IChunkedPayload
     * @constructor
     * @param {meshtastic.IChunkedPayload=} [properties] Properties to set
     */
    function ChunkedPayload(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The ID of the entire payload
     * @member {number|null|undefined} payloadId
     * @memberof meshtastic.ChunkedPayload
     * @instance
     */
    ChunkedPayload.prototype.payloadId = null

    /**
     * The total number of chunks in the payload
     * @member {number|null|undefined} chunkCount
     * @memberof meshtastic.ChunkedPayload
     * @instance
     */
    ChunkedPayload.prototype.chunkCount = null

    /**
     * The current chunk index in the total
     * @member {number|null|undefined} chunkIndex
     * @memberof meshtastic.ChunkedPayload
     * @instance
     */
    ChunkedPayload.prototype.chunkIndex = null

    /**
     * The binary data of the current chunk
     * @member {Uint8Array|null|undefined} payloadChunk
     * @memberof meshtastic.ChunkedPayload
     * @instance
     */
    ChunkedPayload.prototype.payloadChunk = null

    /**
     * Decodes a ChunkedPayload message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ChunkedPayload
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ChunkedPayload} ChunkedPayload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChunkedPayload.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ChunkedPayload()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.payloadId = reader.uint32()
            break
          }
          case 2: {
            message.chunkCount = reader.uint32()
            break
          }
          case 3: {
            message.chunkIndex = reader.uint32()
            break
          }
          case 4: {
            message.payloadChunk = reader.bytes()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return ChunkedPayload
  })()

  meshtastic.resend_chunks = (function () {
    /**
     * Properties of a resend_chunks.
     * @memberof meshtastic
     * @interface Iresend_chunks
     * @property {Array.<number>|null} [chunks] resend_chunks chunks
     */

    /**
     * Constructs a new resend_chunks.
     * @memberof meshtastic
     * @classdesc Wrapper message for broken repeated oneof support
     * @implements Iresend_chunks
     * @constructor
     * @param {meshtastic.Iresend_chunks=} [properties] Properties to set
     */
    function resend_chunks(properties) {
      this.chunks = []
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * resend_chunks chunks.
     * @member {Array.<number>} chunks
     * @memberof meshtastic.resend_chunks
     * @instance
     */
    resend_chunks.prototype.chunks = $util.emptyArray

    /**
     * Decodes a resend_chunks message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.resend_chunks
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.resend_chunks} resend_chunks
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    resend_chunks.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.resend_chunks()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            if (!(message.chunks && message.chunks.length)) message.chunks = []
            if ((tag & 7) === 2) {
              let end2 = reader.uint32() + reader.pos
              while (reader.pos < end2) message.chunks.push(reader.uint32())
            } else message.chunks.push(reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return resend_chunks
  })()

  meshtastic.ChunkedPayloadResponse = (function () {
    /**
     * Properties of a ChunkedPayloadResponse.
     * @memberof meshtastic
     * @interface IChunkedPayloadResponse
     * @property {number|null} [payloadId] The ID of the entire payload
     * @property {boolean|null} [requestTransfer] Request to transfer chunked payload
     * @property {boolean|null} [acceptTransfer] Accept the transfer chunked payload
     * @property {meshtastic.Iresend_chunks|null} [resendChunks] Request missing indexes in the chunked payload
     */

    /**
     * Constructs a new ChunkedPayloadResponse.
     * @memberof meshtastic
     * @classdesc Responses to a ChunkedPayload request
     * @implements IChunkedPayloadResponse
     * @constructor
     * @param {meshtastic.IChunkedPayloadResponse=} [properties] Properties to set
     */
    function ChunkedPayloadResponse(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The ID of the entire payload
     * @member {number|null|undefined} payloadId
     * @memberof meshtastic.ChunkedPayloadResponse
     * @instance
     */
    ChunkedPayloadResponse.prototype.payloadId = null

    /**
     * Request to transfer chunked payload
     * @member {boolean|null|undefined} requestTransfer
     * @memberof meshtastic.ChunkedPayloadResponse
     * @instance
     */
    ChunkedPayloadResponse.prototype.requestTransfer = null

    /**
     * Accept the transfer chunked payload
     * @member {boolean|null|undefined} acceptTransfer
     * @memberof meshtastic.ChunkedPayloadResponse
     * @instance
     */
    ChunkedPayloadResponse.prototype.acceptTransfer = null

    /**
     * Request missing indexes in the chunked payload
     * @member {meshtastic.Iresend_chunks|null|undefined} resendChunks
     * @memberof meshtastic.ChunkedPayloadResponse
     * @instance
     */
    ChunkedPayloadResponse.prototype.resendChunks = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * ChunkedPayloadResponse payloadVariant.
     * @member {"requestTransfer"|"acceptTransfer"|"resendChunks"|undefined} payloadVariant
     * @memberof meshtastic.ChunkedPayloadResponse
     * @instance
     */
    Object.defineProperty(ChunkedPayloadResponse.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(($oneOfFields = ['requestTransfer', 'acceptTransfer', 'resendChunks'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a ChunkedPayloadResponse message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ChunkedPayloadResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ChunkedPayloadResponse} ChunkedPayloadResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChunkedPayloadResponse.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ChunkedPayloadResponse()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.payloadId = reader.uint32()
            break
          }
          case 2: {
            message.requestTransfer = reader.bool()
            break
          }
          case 3: {
            message.acceptTransfer = reader.bool()
            break
          }
          case 4: {
            message.resendChunks = $root.meshtastic.resend_chunks.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return ChunkedPayloadResponse
  })()

  meshtastic.ChannelSettings = (function () {
    /**
     * Properties of a ChannelSettings.
     * @memberof meshtastic
     * @interface IChannelSettings
     * @property {number|null} [channelNum] Deprecated in favor of LoraConfig.channel_num
     * @property {Uint8Array|null} [psk] A simple pre-shared key for now for crypto.
     * Must be either 0 bytes (no crypto), 16 bytes (AES128), or 32 bytes (AES256).
     * A special shorthand is used for 1 byte long psks.
     * These psks should be treated as only minimally secure,
     * because they are listed in this source code.
     * Those bytes are mapped using the following scheme:
     * `0` = No crypto
     * `1` = The special "default" channel key: {0xd4, 0xf1, 0xbb, 0x3a, 0x20, 0x29, 0x07, 0x59, 0xf0, 0xbc, 0xff, 0xab, 0xcf, 0x4e, 0x69, 0x01}
     * `2` through 10 = The default channel key, except with 1 through 9 added to the last byte.
     * Shown to user as simple1 through 10
     * @property {string|null} [name] A SHORT name that will be packed into the URL.
     * Less than 12 bytes.
     * Something for end users to call the channel
     * If this is the empty string it is assumed that this channel
     * is the special (minimally secure) "Default"channel.
     * In user interfaces it should be rendered as a local language translation of "X".
     * For channel_num hashing empty string will be treated as "X".
     * Where "X" is selected based on the English words listed above for ModemPreset
     * @property {number|null} [id] Used to construct a globally unique channel ID.
     * The full globally unique ID will be: "name.id" where ID is shown as base36.
     * Assuming that the number of meshtastic users is below 20K (true for a long time)
     * the chance of this 64 bit random number colliding with anyone else is super low.
     * And the penalty for collision is low as well, it just means that anyone trying to decrypt channel messages might need to
     * try multiple candidate channels.
     * Any time a non wire compatible change is made to a channel, this field should be regenerated.
     * There are a small number of 'special' globally known (and fairly) insecure standard channels.
     * Those channels do not have a numeric id included in the settings, but instead it is pulled from
     * a table of well known IDs.
     * (see Well Known Channels FIXME)
     * @property {boolean|null} [uplinkEnabled] If true, messages on the mesh will be sent to the *public* internet by any gateway ndoe
     * @property {boolean|null} [downlinkEnabled] If true, messages seen on the internet will be forwarded to the local mesh.
     * @property {meshtastic.IModuleSettings|null} [moduleSettings] Per-channel module settings.
     */

    /**
     * Constructs a new ChannelSettings.
     * @memberof meshtastic
     * @classdesc This information can be encoded as a QRcode/url so that other users can configure
     * their radio to join the same channel.
     * A note about how channel names are shown to users: channelname-X
     * poundsymbol is a prefix used to indicate this is a channel name (idea from @professr).
     * Where X is a letter from A-Z (base 26) representing a hash of the PSK for this
     * channel - so that if the user changes anything about the channel (which does
     * force a new PSK) this letter will also change. Thus preventing user confusion if
     * two friends try to type in a channel name of "BobsChan" and then can't talk
     * because their PSKs will be different.
     * The PSK is hashed into this letter by "0x41 + [xor all bytes of the psk ] modulo 26"
     * This also allows the option of someday if people have the PSK off (zero), the
     * users COULD type in a channel name and be able to talk.
     * FIXME: Add description of multi-channel support and how primary vs secondary channels are used.
     * FIXME: explain how apps use channels for security.
     * explain how remote settings and remote gpio are managed as an example
     * @implements IChannelSettings
     * @constructor
     * @param {meshtastic.IChannelSettings=} [properties] Properties to set
     */
    function ChannelSettings(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Deprecated in favor of LoraConfig.channel_num
     * @member {number|null|undefined} channelNum
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.channelNum = null

    /**
     * A simple pre-shared key for now for crypto.
     * Must be either 0 bytes (no crypto), 16 bytes (AES128), or 32 bytes (AES256).
     * A special shorthand is used for 1 byte long psks.
     * These psks should be treated as only minimally secure,
     * because they are listed in this source code.
     * Those bytes are mapped using the following scheme:
     * `0` = No crypto
     * `1` = The special "default" channel key: {0xd4, 0xf1, 0xbb, 0x3a, 0x20, 0x29, 0x07, 0x59, 0xf0, 0xbc, 0xff, 0xab, 0xcf, 0x4e, 0x69, 0x01}
     * `2` through 10 = The default channel key, except with 1 through 9 added to the last byte.
     * Shown to user as simple1 through 10
     * @member {Uint8Array|null|undefined} psk
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.psk = null

    /**
     * A SHORT name that will be packed into the URL.
     * Less than 12 bytes.
     * Something for end users to call the channel
     * If this is the empty string it is assumed that this channel
     * is the special (minimally secure) "Default"channel.
     * In user interfaces it should be rendered as a local language translation of "X".
     * For channel_num hashing empty string will be treated as "X".
     * Where "X" is selected based on the English words listed above for ModemPreset
     * @member {string|null|undefined} name
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.name = null

    /**
     * Used to construct a globally unique channel ID.
     * The full globally unique ID will be: "name.id" where ID is shown as base36.
     * Assuming that the number of meshtastic users is below 20K (true for a long time)
     * the chance of this 64 bit random number colliding with anyone else is super low.
     * And the penalty for collision is low as well, it just means that anyone trying to decrypt channel messages might need to
     * try multiple candidate channels.
     * Any time a non wire compatible change is made to a channel, this field should be regenerated.
     * There are a small number of 'special' globally known (and fairly) insecure standard channels.
     * Those channels do not have a numeric id included in the settings, but instead it is pulled from
     * a table of well known IDs.
     * (see Well Known Channels FIXME)
     * @member {number|null|undefined} id
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.id = null

    /**
     * If true, messages on the mesh will be sent to the *public* internet by any gateway ndoe
     * @member {boolean|null|undefined} uplinkEnabled
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.uplinkEnabled = null

    /**
     * If true, messages seen on the internet will be forwarded to the local mesh.
     * @member {boolean|null|undefined} downlinkEnabled
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.downlinkEnabled = null

    /**
     * Per-channel module settings.
     * @member {meshtastic.IModuleSettings|null|undefined} moduleSettings
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.moduleSettings = null

    /**
     * Decodes a ChannelSettings message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ChannelSettings
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ChannelSettings} ChannelSettings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelSettings.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ChannelSettings()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.channelNum = reader.uint32()
            break
          }
          case 2: {
            message.psk = reader.bytes()
            break
          }
          case 3: {
            message.name = reader.string()
            break
          }
          case 4: {
            message.id = reader.fixed32()
            break
          }
          case 5: {
            message.uplinkEnabled = reader.bool()
            break
          }
          case 6: {
            message.downlinkEnabled = reader.bool()
            break
          }
          case 7: {
            message.moduleSettings = $root.meshtastic.ModuleSettings.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return ChannelSettings
  })()

  meshtastic.ModuleSettings = (function () {
    /**
     * Properties of a ModuleSettings.
     * @memberof meshtastic
     * @interface IModuleSettings
     * @property {number|null} [positionPrecision] Bits of precision for the location sent in position packets.
     * @property {boolean|null} [isClientMuted] Controls whether or not the phone / clients should mute the current channel
     * Useful for noisy public channels you don't necessarily want to disable
     */

    /**
     * Constructs a new ModuleSettings.
     * @memberof meshtastic
     * @classdesc This message is specifically for modules to store per-channel configuration data.
     * @implements IModuleSettings
     * @constructor
     * @param {meshtastic.IModuleSettings=} [properties] Properties to set
     */
    function ModuleSettings(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Bits of precision for the location sent in position packets.
     * @member {number|null|undefined} positionPrecision
     * @memberof meshtastic.ModuleSettings
     * @instance
     */
    ModuleSettings.prototype.positionPrecision = null

    /**
     * Controls whether or not the phone / clients should mute the current channel
     * Useful for noisy public channels you don't necessarily want to disable
     * @member {boolean|null|undefined} isClientMuted
     * @memberof meshtastic.ModuleSettings
     * @instance
     */
    ModuleSettings.prototype.isClientMuted = null

    /**
     * Decodes a ModuleSettings message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ModuleSettings
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ModuleSettings} ModuleSettings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ModuleSettings.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ModuleSettings()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.positionPrecision = reader.uint32()
            break
          }
          case 2: {
            message.isClientMuted = reader.bool()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return ModuleSettings
  })()

  meshtastic.Channel = (function () {
    /**
     * Properties of a Channel.
     * @memberof meshtastic
     * @interface IChannel
     * @property {number|null} [index] The index of this channel in the channel table (from 0 to MAX_NUM_CHANNELS-1)
     * (Someday - not currently implemented) An index of -1 could be used to mean "set by name",
     * in which case the target node will find and set the channel by settings.name.
     * @property {meshtastic.IChannelSettings|null} [settings] The new settings, or NULL to disable that channel
     * @property {meshtastic.Channel.Role|null} [role] TODO: REPLACE
     */

    /**
     * Constructs a new Channel.
     * @memberof meshtastic
     * @classdesc A pair of a channel number, mode and the (sharable) settings for that channel
     * @implements IChannel
     * @constructor
     * @param {meshtastic.IChannel=} [properties] Properties to set
     */
    function Channel(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The index of this channel in the channel table (from 0 to MAX_NUM_CHANNELS-1)
     * (Someday - not currently implemented) An index of -1 could be used to mean "set by name",
     * in which case the target node will find and set the channel by settings.name.
     * @member {number|null|undefined} index
     * @memberof meshtastic.Channel
     * @instance
     */
    Channel.prototype.index = null

    /**
     * The new settings, or NULL to disable that channel
     * @member {meshtastic.IChannelSettings|null|undefined} settings
     * @memberof meshtastic.Channel
     * @instance
     */
    Channel.prototype.settings = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.Channel.Role|null|undefined} role
     * @memberof meshtastic.Channel
     * @instance
     */
    Channel.prototype.role = null

    /**
     * Decodes a Channel message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Channel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Channel} Channel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Channel.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Channel()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.index = reader.int32()
            break
          }
          case 2: {
            message.settings = $root.meshtastic.ChannelSettings.decode(reader, reader.uint32())
            break
          }
          case 3: {
            message.role = reader.int32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * How this channel is being used (or not).
     * Note: this field is an enum to give us options for the future.
     * In particular, someday we might make a 'SCANNING' option.
     * SCANNING channels could have different frequencies and the radio would
     * occasionally check that freq to see if anything is being transmitted.
     * For devices that have multiple physical radios attached, we could keep multiple PRIMARY/SCANNING channels active at once to allow
     * cross band routing as needed.
     * If a device has only a single radio (the common case) only one channel can be PRIMARY at a time
     * (but any number of SECONDARY channels can't be sent received on that common frequency)
     * @name meshtastic.Channel.Role
     * @enum {number}
     * @property {number} DISABLED=0 This channel is not in use right now
     * @property {number} PRIMARY=1 This channel is used to set the frequency for the radio - all other enabled channels must be SECONDARY
     * @property {number} SECONDARY=2 Secondary channels are only used for encryption/decryption/authentication purposes.
     * Their radio settings (freq etc) are ignored, only psk is used.
     */
    Channel.Role = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'DISABLED')] = 0
      values[(valuesById[1] = 'PRIMARY')] = 1
      values[(valuesById[2] = 'SECONDARY')] = 2
      return values
    })()

    return Channel
  })()

  meshtastic.ModuleConfig = (function () {
    /**
     * Properties of a ModuleConfig.
     * @memberof meshtastic
     * @interface IModuleConfig
     * @property {meshtastic.ModuleConfig.IMQTTConfig|null} [mqtt] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.ISerialConfig|null} [serial] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.IExternalNotificationConfig|null} [externalNotification] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.IStoreForwardConfig|null} [storeForward] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.IRangeTestConfig|null} [rangeTest] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.ITelemetryConfig|null} [telemetry] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.ICannedMessageConfig|null} [cannedMessage] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.IAudioConfig|null} [audio] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.IRemoteHardwareConfig|null} [remoteHardware] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.INeighborInfoConfig|null} [neighborInfo] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.IAmbientLightingConfig|null} [ambientLighting] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.IDetectionSensorConfig|null} [detectionSensor] TODO: REPLACE
     * @property {meshtastic.ModuleConfig.IPaxcounterConfig|null} [paxcounter] TODO: REPLACE
     */

    /**
     * Constructs a new ModuleConfig.
     * @memberof meshtastic
     * @classdesc Module Config
     * @implements IModuleConfig
     * @constructor
     * @param {meshtastic.IModuleConfig=} [properties] Properties to set
     */
    function ModuleConfig(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IMQTTConfig|null|undefined} mqtt
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.mqtt = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.ISerialConfig|null|undefined} serial
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.serial = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IExternalNotificationConfig|null|undefined} externalNotification
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.externalNotification = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IStoreForwardConfig|null|undefined} storeForward
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.storeForward = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IRangeTestConfig|null|undefined} rangeTest
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.rangeTest = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.ITelemetryConfig|null|undefined} telemetry
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.telemetry = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.ICannedMessageConfig|null|undefined} cannedMessage
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.cannedMessage = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IAudioConfig|null|undefined} audio
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.audio = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IRemoteHardwareConfig|null|undefined} remoteHardware
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.remoteHardware = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.INeighborInfoConfig|null|undefined} neighborInfo
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.neighborInfo = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IAmbientLightingConfig|null|undefined} ambientLighting
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.ambientLighting = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IDetectionSensorConfig|null|undefined} detectionSensor
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.detectionSensor = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.ModuleConfig.IPaxcounterConfig|null|undefined} paxcounter
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    ModuleConfig.prototype.paxcounter = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * TODO: REPLACE
     * @member {"mqtt"|"serial"|"externalNotification"|"storeForward"|"rangeTest"|"telemetry"|"cannedMessage"|"audio"|"remoteHardware"|"neighborInfo"|"ambientLighting"|"detectionSensor"|"paxcounter"|undefined} payloadVariant
     * @memberof meshtastic.ModuleConfig
     * @instance
     */
    Object.defineProperty(ModuleConfig.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(
        ($oneOfFields = [
          'mqtt',
          'serial',
          'externalNotification',
          'storeForward',
          'rangeTest',
          'telemetry',
          'cannedMessage',
          'audio',
          'remoteHardware',
          'neighborInfo',
          'ambientLighting',
          'detectionSensor',
          'paxcounter',
        ])
      ),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a ModuleConfig message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ModuleConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ModuleConfig} ModuleConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ModuleConfig.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ModuleConfig()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.mqtt = $root.meshtastic.ModuleConfig.MQTTConfig.decode(reader, reader.uint32())
            break
          }
          case 2: {
            message.serial = $root.meshtastic.ModuleConfig.SerialConfig.decode(reader, reader.uint32())
            break
          }
          case 3: {
            message.externalNotification = $root.meshtastic.ModuleConfig.ExternalNotificationConfig.decode(reader, reader.uint32())
            break
          }
          case 4: {
            message.storeForward = $root.meshtastic.ModuleConfig.StoreForwardConfig.decode(reader, reader.uint32())
            break
          }
          case 5: {
            message.rangeTest = $root.meshtastic.ModuleConfig.RangeTestConfig.decode(reader, reader.uint32())
            break
          }
          case 6: {
            message.telemetry = $root.meshtastic.ModuleConfig.TelemetryConfig.decode(reader, reader.uint32())
            break
          }
          case 7: {
            message.cannedMessage = $root.meshtastic.ModuleConfig.CannedMessageConfig.decode(reader, reader.uint32())
            break
          }
          case 8: {
            message.audio = $root.meshtastic.ModuleConfig.AudioConfig.decode(reader, reader.uint32())
            break
          }
          case 9: {
            message.remoteHardware = $root.meshtastic.ModuleConfig.RemoteHardwareConfig.decode(reader, reader.uint32())
            break
          }
          case 10: {
            message.neighborInfo = $root.meshtastic.ModuleConfig.NeighborInfoConfig.decode(reader, reader.uint32())
            break
          }
          case 11: {
            message.ambientLighting = $root.meshtastic.ModuleConfig.AmbientLightingConfig.decode(reader, reader.uint32())
            break
          }
          case 12: {
            message.detectionSensor = $root.meshtastic.ModuleConfig.DetectionSensorConfig.decode(reader, reader.uint32())
            break
          }
          case 13: {
            message.paxcounter = $root.meshtastic.ModuleConfig.PaxcounterConfig.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    ModuleConfig.MQTTConfig = (function () {
      /**
       * Properties of a MQTTConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IMQTTConfig
       * @property {boolean|null} [enabled] If a meshtastic node is able to reach the internet it will normally attempt to gateway any channels that are marked as
       * is_uplink_enabled or is_downlink_enabled.
       * @property {string|null} [address] The server to use for our MQTT global message gateway feature.
       * If not set, the default server will be used
       * @property {string|null} [username] MQTT username to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default username
       * @property {string|null} [password] MQTT password to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default password
       * @property {boolean|null} [encryptionEnabled] Whether to send encrypted or decrypted packets to MQTT.
       * This parameter is only honoured if you also set server
       * (the default official mqtt.meshtastic.org server can handle encrypted packets)
       * Decrypted packets may be useful for external systems that want to consume meshtastic packets
       * @property {boolean|null} [jsonEnabled] Whether to send / consume json packets on MQTT
       * @property {boolean|null} [tlsEnabled] If true, we attempt to establish a secure connection using TLS
       * @property {string|null} [root] The root topic to use for MQTT messages. Default is "msh".
       * This is useful if you want to use a single MQTT server for multiple meshtastic networks and separate them via ACLs
       * @property {boolean|null} [proxyToClientEnabled] If true, we can use the connected phone / client to proxy messages to MQTT instead of a direct connection
       * @property {boolean|null} [mapReportingEnabled] If true, we will periodically report unencrypted information about our node to a map via MQTT
       * @property {meshtastic.ModuleConfig.IMapReportSettings|null} [mapReportSettings] Settings for reporting information about our node to a map via MQTT
       */

      /**
       * Constructs a new MQTTConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc MQTT Client Config
       * @implements IMQTTConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IMQTTConfig=} [properties] Properties to set
       */
      function MQTTConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * If a meshtastic node is able to reach the internet it will normally attempt to gateway any channels that are marked as
       * is_uplink_enabled or is_downlink_enabled.
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.enabled = null

      /**
       * The server to use for our MQTT global message gateway feature.
       * If not set, the default server will be used
       * @member {string|null|undefined} address
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.address = null

      /**
       * MQTT username to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default username
       * @member {string|null|undefined} username
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.username = null

      /**
       * MQTT password to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default password
       * @member {string|null|undefined} password
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.password = null

      /**
       * Whether to send encrypted or decrypted packets to MQTT.
       * This parameter is only honoured if you also set server
       * (the default official mqtt.meshtastic.org server can handle encrypted packets)
       * Decrypted packets may be useful for external systems that want to consume meshtastic packets
       * @member {boolean|null|undefined} encryptionEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.encryptionEnabled = null

      /**
       * Whether to send / consume json packets on MQTT
       * @member {boolean|null|undefined} jsonEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.jsonEnabled = null

      /**
       * If true, we attempt to establish a secure connection using TLS
       * @member {boolean|null|undefined} tlsEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.tlsEnabled = null

      /**
       * The root topic to use for MQTT messages. Default is "msh".
       * This is useful if you want to use a single MQTT server for multiple meshtastic networks and separate them via ACLs
       * @member {string|null|undefined} root
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.root = null

      /**
       * If true, we can use the connected phone / client to proxy messages to MQTT instead of a direct connection
       * @member {boolean|null|undefined} proxyToClientEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.proxyToClientEnabled = null

      /**
       * If true, we will periodically report unencrypted information about our node to a map via MQTT
       * @member {boolean|null|undefined} mapReportingEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.mapReportingEnabled = null

      /**
       * Settings for reporting information about our node to a map via MQTT
       * @member {meshtastic.ModuleConfig.IMapReportSettings|null|undefined} mapReportSettings
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.mapReportSettings = null

      /**
       * Decodes a MQTTConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.MQTTConfig} MQTTConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      MQTTConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.MQTTConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.address = reader.string()
              break
            }
            case 3: {
              message.username = reader.string()
              break
            }
            case 4: {
              message.password = reader.string()
              break
            }
            case 5: {
              message.encryptionEnabled = reader.bool()
              break
            }
            case 6: {
              message.jsonEnabled = reader.bool()
              break
            }
            case 7: {
              message.tlsEnabled = reader.bool()
              break
            }
            case 8: {
              message.root = reader.string()
              break
            }
            case 9: {
              message.proxyToClientEnabled = reader.bool()
              break
            }
            case 10: {
              message.mapReportingEnabled = reader.bool()
              break
            }
            case 11: {
              message.mapReportSettings = $root.meshtastic.ModuleConfig.MapReportSettings.decode(reader, reader.uint32())
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return MQTTConfig
    })()

    ModuleConfig.MapReportSettings = (function () {
      /**
       * Properties of a MapReportSettings.
       * @memberof meshtastic.ModuleConfig
       * @interface IMapReportSettings
       * @property {number|null} [publishIntervalSecs] How often we should report our info to the map (in seconds)
       * @property {number|null} [positionPrecision] Bits of precision for the location sent (default of 32 is full precision).
       */

      /**
       * Constructs a new MapReportSettings.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Settings for reporting unencrypted information about our node to a map via MQTT
       * @implements IMapReportSettings
       * @constructor
       * @param {meshtastic.ModuleConfig.IMapReportSettings=} [properties] Properties to set
       */
      function MapReportSettings(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * How often we should report our info to the map (in seconds)
       * @member {number|null|undefined} publishIntervalSecs
       * @memberof meshtastic.ModuleConfig.MapReportSettings
       * @instance
       */
      MapReportSettings.prototype.publishIntervalSecs = null

      /**
       * Bits of precision for the location sent (default of 32 is full precision).
       * @member {number|null|undefined} positionPrecision
       * @memberof meshtastic.ModuleConfig.MapReportSettings
       * @instance
       */
      MapReportSettings.prototype.positionPrecision = null

      /**
       * Decodes a MapReportSettings message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.MapReportSettings
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.MapReportSettings} MapReportSettings
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      MapReportSettings.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.MapReportSettings()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.publishIntervalSecs = reader.uint32()
              break
            }
            case 2: {
              message.positionPrecision = reader.uint32()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return MapReportSettings
    })()

    ModuleConfig.RemoteHardwareConfig = (function () {
      /**
       * Properties of a RemoteHardwareConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IRemoteHardwareConfig
       * @property {boolean|null} [enabled] Whether the Module is enabled
       * @property {boolean|null} [allowUndefinedPinAccess] Whether the Module allows consumers to read / write to pins not defined in available_pins
       * @property {Array.<meshtastic.IRemoteHardwarePin>|null} [availablePins] Exposes the available pins to the mesh for reading and writing
       */

      /**
       * Constructs a new RemoteHardwareConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc RemoteHardwareModule Config
       * @implements IRemoteHardwareConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IRemoteHardwareConfig=} [properties] Properties to set
       */
      function RemoteHardwareConfig(properties) {
        this.availablePins = []
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Whether the Module is enabled
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.RemoteHardwareConfig
       * @instance
       */
      RemoteHardwareConfig.prototype.enabled = null

      /**
       * Whether the Module allows consumers to read / write to pins not defined in available_pins
       * @member {boolean|null|undefined} allowUndefinedPinAccess
       * @memberof meshtastic.ModuleConfig.RemoteHardwareConfig
       * @instance
       */
      RemoteHardwareConfig.prototype.allowUndefinedPinAccess = null

      /**
       * Exposes the available pins to the mesh for reading and writing
       * @member {Array.<meshtastic.IRemoteHardwarePin>} availablePins
       * @memberof meshtastic.ModuleConfig.RemoteHardwareConfig
       * @instance
       */
      RemoteHardwareConfig.prototype.availablePins = $util.emptyArray

      /**
       * Decodes a RemoteHardwareConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.RemoteHardwareConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.RemoteHardwareConfig} RemoteHardwareConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      RemoteHardwareConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.RemoteHardwareConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.allowUndefinedPinAccess = reader.bool()
              break
            }
            case 3: {
              if (!(message.availablePins && message.availablePins.length)) message.availablePins = []
              message.availablePins.push($root.meshtastic.RemoteHardwarePin.decode(reader, reader.uint32()))
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return RemoteHardwareConfig
    })()

    ModuleConfig.NeighborInfoConfig = (function () {
      /**
       * Properties of a NeighborInfoConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface INeighborInfoConfig
       * @property {boolean|null} [enabled] Whether the Module is enabled
       * @property {number|null} [updateInterval] Interval in seconds of how often we should try to send our
       * Neighbor Info to the mesh
       */

      /**
       * Constructs a new NeighborInfoConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc NeighborInfoModule Config
       * @implements INeighborInfoConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.INeighborInfoConfig=} [properties] Properties to set
       */
      function NeighborInfoConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Whether the Module is enabled
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.NeighborInfoConfig
       * @instance
       */
      NeighborInfoConfig.prototype.enabled = null

      /**
       * Interval in seconds of how often we should try to send our
       * Neighbor Info to the mesh
       * @member {number|null|undefined} updateInterval
       * @memberof meshtastic.ModuleConfig.NeighborInfoConfig
       * @instance
       */
      NeighborInfoConfig.prototype.updateInterval = null

      /**
       * Decodes a NeighborInfoConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.NeighborInfoConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.NeighborInfoConfig} NeighborInfoConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      NeighborInfoConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.NeighborInfoConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.updateInterval = reader.uint32()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return NeighborInfoConfig
    })()

    ModuleConfig.DetectionSensorConfig = (function () {
      /**
       * Properties of a DetectionSensorConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IDetectionSensorConfig
       * @property {boolean|null} [enabled] Whether the Module is enabled
       * @property {number|null} [minimumBroadcastSecs] Interval in seconds of how often we can send a message to the mesh when a state change is detected
       * @property {number|null} [stateBroadcastSecs] Interval in seconds of how often we should send a message to the mesh with the current state regardless of changes
       * When set to 0, only state changes will be broadcasted
       * Works as a sort of status heartbeat for peace of mind
       * @property {boolean|null} [sendBell] Send ASCII bell with alert message
       * Useful for triggering ext. notification on bell
       * @property {string|null} [name] Friendly name used to format message sent to mesh
       * Example: A name "Motion" would result in a message "Motion detected"
       * Maximum length of 20 characters
       * @property {number|null} [monitorPin] GPIO pin to monitor for state changes
       * @property {boolean|null} [detectionTriggeredHigh] Whether or not the GPIO pin state detection is triggered on HIGH (1)
       * Otherwise LOW (0)
       * @property {boolean|null} [usePullup] Whether or not use INPUT_PULLUP mode for GPIO pin
       * Only applicable if the board uses pull-up resistors on the pin
       */

      /**
       * Constructs a new DetectionSensorConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Detection Sensor Module Config
       * @implements IDetectionSensorConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IDetectionSensorConfig=} [properties] Properties to set
       */
      function DetectionSensorConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Whether the Module is enabled
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.enabled = null

      /**
       * Interval in seconds of how often we can send a message to the mesh when a state change is detected
       * @member {number|null|undefined} minimumBroadcastSecs
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.minimumBroadcastSecs = null

      /**
       * Interval in seconds of how often we should send a message to the mesh with the current state regardless of changes
       * When set to 0, only state changes will be broadcasted
       * Works as a sort of status heartbeat for peace of mind
       * @member {number|null|undefined} stateBroadcastSecs
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.stateBroadcastSecs = null

      /**
       * Send ASCII bell with alert message
       * Useful for triggering ext. notification on bell
       * @member {boolean|null|undefined} sendBell
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.sendBell = null

      /**
       * Friendly name used to format message sent to mesh
       * Example: A name "Motion" would result in a message "Motion detected"
       * Maximum length of 20 characters
       * @member {string|null|undefined} name
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.name = null

      /**
       * GPIO pin to monitor for state changes
       * @member {number|null|undefined} monitorPin
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.monitorPin = null

      /**
       * Whether or not the GPIO pin state detection is triggered on HIGH (1)
       * Otherwise LOW (0)
       * @member {boolean|null|undefined} detectionTriggeredHigh
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.detectionTriggeredHigh = null

      /**
       * Whether or not use INPUT_PULLUP mode for GPIO pin
       * Only applicable if the board uses pull-up resistors on the pin
       * @member {boolean|null|undefined} usePullup
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.usePullup = null

      /**
       * Decodes a DetectionSensorConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.DetectionSensorConfig} DetectionSensorConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      DetectionSensorConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.DetectionSensorConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.minimumBroadcastSecs = reader.uint32()
              break
            }
            case 3: {
              message.stateBroadcastSecs = reader.uint32()
              break
            }
            case 4: {
              message.sendBell = reader.bool()
              break
            }
            case 5: {
              message.name = reader.string()
              break
            }
            case 6: {
              message.monitorPin = reader.uint32()
              break
            }
            case 7: {
              message.detectionTriggeredHigh = reader.bool()
              break
            }
            case 8: {
              message.usePullup = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return DetectionSensorConfig
    })()

    ModuleConfig.AudioConfig = (function () {
      /**
       * Properties of an AudioConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IAudioConfig
       * @property {boolean|null} [codec2Enabled] Whether Audio is enabled
       * @property {number|null} [pttPin] PTT Pin
       * @property {meshtastic.ModuleConfig.AudioConfig.Audio_Baud|null} [bitrate] The audio sample rate to use for codec2
       * @property {number|null} [i2sWs] I2S Word Select
       * @property {number|null} [i2sSd] I2S Data IN
       * @property {number|null} [i2sDin] I2S Data OUT
       * @property {number|null} [i2sSck] I2S Clock
       */

      /**
       * Constructs a new AudioConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Audio Config for codec2 voice
       * @implements IAudioConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IAudioConfig=} [properties] Properties to set
       */
      function AudioConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Whether Audio is enabled
       * @member {boolean|null|undefined} codec2Enabled
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.codec2Enabled = null

      /**
       * PTT Pin
       * @member {number|null|undefined} pttPin
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.pttPin = null

      /**
       * The audio sample rate to use for codec2
       * @member {meshtastic.ModuleConfig.AudioConfig.Audio_Baud|null|undefined} bitrate
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.bitrate = null

      /**
       * I2S Word Select
       * @member {number|null|undefined} i2sWs
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.i2sWs = null

      /**
       * I2S Data IN
       * @member {number|null|undefined} i2sSd
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.i2sSd = null

      /**
       * I2S Data OUT
       * @member {number|null|undefined} i2sDin
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.i2sDin = null

      /**
       * I2S Clock
       * @member {number|null|undefined} i2sSck
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.i2sSck = null

      /**
       * Decodes an AudioConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.AudioConfig} AudioConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      AudioConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.AudioConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.codec2Enabled = reader.bool()
              break
            }
            case 2: {
              message.pttPin = reader.uint32()
              break
            }
            case 3: {
              message.bitrate = reader.int32()
              break
            }
            case 4: {
              message.i2sWs = reader.uint32()
              break
            }
            case 5: {
              message.i2sSd = reader.uint32()
              break
            }
            case 6: {
              message.i2sDin = reader.uint32()
              break
            }
            case 7: {
              message.i2sSck = reader.uint32()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * Baudrate for codec2 voice
       * @name meshtastic.ModuleConfig.AudioConfig.Audio_Baud
       * @enum {number}
       * @property {number} CODEC2_DEFAULT=0 CODEC2_DEFAULT value
       * @property {number} CODEC2_3200=1 CODEC2_3200 value
       * @property {number} CODEC2_2400=2 CODEC2_2400 value
       * @property {number} CODEC2_1600=3 CODEC2_1600 value
       * @property {number} CODEC2_1400=4 CODEC2_1400 value
       * @property {number} CODEC2_1300=5 CODEC2_1300 value
       * @property {number} CODEC2_1200=6 CODEC2_1200 value
       * @property {number} CODEC2_700=7 CODEC2_700 value
       * @property {number} CODEC2_700B=8 CODEC2_700B value
       */
      AudioConfig.Audio_Baud = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'CODEC2_DEFAULT')] = 0
        values[(valuesById[1] = 'CODEC2_3200')] = 1
        values[(valuesById[2] = 'CODEC2_2400')] = 2
        values[(valuesById[3] = 'CODEC2_1600')] = 3
        values[(valuesById[4] = 'CODEC2_1400')] = 4
        values[(valuesById[5] = 'CODEC2_1300')] = 5
        values[(valuesById[6] = 'CODEC2_1200')] = 6
        values[(valuesById[7] = 'CODEC2_700')] = 7
        values[(valuesById[8] = 'CODEC2_700B')] = 8
        return values
      })()

      return AudioConfig
    })()

    ModuleConfig.PaxcounterConfig = (function () {
      /**
       * Properties of a PaxcounterConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IPaxcounterConfig
       * @property {boolean|null} [enabled] Enable the Paxcounter Module
       * @property {number|null} [paxcounterUpdateInterval] PaxcounterConfig paxcounterUpdateInterval
       * @property {number|null} [wifiThreshold] WiFi RSSI threshold. Defaults to -80
       * @property {number|null} [bleThreshold] BLE RSSI threshold. Defaults to -80
       */

      /**
       * Constructs a new PaxcounterConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Config for the Paxcounter Module
       * @implements IPaxcounterConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IPaxcounterConfig=} [properties] Properties to set
       */
      function PaxcounterConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Enable the Paxcounter Module
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @instance
       */
      PaxcounterConfig.prototype.enabled = null

      /**
       * PaxcounterConfig paxcounterUpdateInterval.
       * @member {number|null|undefined} paxcounterUpdateInterval
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @instance
       */
      PaxcounterConfig.prototype.paxcounterUpdateInterval = null

      /**
       * WiFi RSSI threshold. Defaults to -80
       * @member {number|null|undefined} wifiThreshold
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @instance
       */
      PaxcounterConfig.prototype.wifiThreshold = null

      /**
       * BLE RSSI threshold. Defaults to -80
       * @member {number|null|undefined} bleThreshold
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @instance
       */
      PaxcounterConfig.prototype.bleThreshold = null

      /**
       * Decodes a PaxcounterConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.PaxcounterConfig} PaxcounterConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      PaxcounterConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.PaxcounterConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.paxcounterUpdateInterval = reader.uint32()
              break
            }
            case 3: {
              message.wifiThreshold = reader.int32()
              break
            }
            case 4: {
              message.bleThreshold = reader.int32()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return PaxcounterConfig
    })()

    ModuleConfig.SerialConfig = (function () {
      /**
       * Properties of a SerialConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface ISerialConfig
       * @property {boolean|null} [enabled] Preferences for the SerialModule
       * @property {boolean|null} [echo] TODO: REPLACE
       * @property {number|null} [rxd] RX pin (should match Arduino gpio pin number)
       * @property {number|null} [txd] TX pin (should match Arduino gpio pin number)
       * @property {meshtastic.ModuleConfig.SerialConfig.Serial_Baud|null} [baud] Serial baud rate
       * @property {number|null} [timeout] TODO: REPLACE
       * @property {meshtastic.ModuleConfig.SerialConfig.Serial_Mode|null} [mode] Mode for serial module operation
       * @property {boolean|null} [overrideConsoleSerialPort] Overrides the platform's defacto Serial port instance to use with Serial module config settings
       * This is currently only usable in output modes like NMEA / CalTopo and may behave strangely or not work at all in other modes
       * Existing logging over the Serial Console will still be present
       */

      /**
       * Constructs a new SerialConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Serial Config
       * @implements ISerialConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.ISerialConfig=} [properties] Properties to set
       */
      function SerialConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Preferences for the SerialModule
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.enabled = null

      /**
       * TODO: REPLACE
       * @member {boolean|null|undefined} echo
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.echo = null

      /**
       * RX pin (should match Arduino gpio pin number)
       * @member {number|null|undefined} rxd
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.rxd = null

      /**
       * TX pin (should match Arduino gpio pin number)
       * @member {number|null|undefined} txd
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.txd = null

      /**
       * Serial baud rate
       * @member {meshtastic.ModuleConfig.SerialConfig.Serial_Baud|null|undefined} baud
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.baud = null

      /**
       * TODO: REPLACE
       * @member {number|null|undefined} timeout
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.timeout = null

      /**
       * Mode for serial module operation
       * @member {meshtastic.ModuleConfig.SerialConfig.Serial_Mode|null|undefined} mode
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.mode = null

      /**
       * Overrides the platform's defacto Serial port instance to use with Serial module config settings
       * This is currently only usable in output modes like NMEA / CalTopo and may behave strangely or not work at all in other modes
       * Existing logging over the Serial Console will still be present
       * @member {boolean|null|undefined} overrideConsoleSerialPort
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.overrideConsoleSerialPort = null

      /**
       * Decodes a SerialConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.SerialConfig} SerialConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      SerialConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.SerialConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.echo = reader.bool()
              break
            }
            case 3: {
              message.rxd = reader.uint32()
              break
            }
            case 4: {
              message.txd = reader.uint32()
              break
            }
            case 5: {
              message.baud = reader.int32()
              break
            }
            case 6: {
              message.timeout = reader.uint32()
              break
            }
            case 7: {
              message.mode = reader.int32()
              break
            }
            case 8: {
              message.overrideConsoleSerialPort = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * TODO: REPLACE
       * @name meshtastic.ModuleConfig.SerialConfig.Serial_Baud
       * @enum {number}
       * @property {number} BAUD_DEFAULT=0 BAUD_DEFAULT value
       * @property {number} BAUD_110=1 BAUD_110 value
       * @property {number} BAUD_300=2 BAUD_300 value
       * @property {number} BAUD_600=3 BAUD_600 value
       * @property {number} BAUD_1200=4 BAUD_1200 value
       * @property {number} BAUD_2400=5 BAUD_2400 value
       * @property {number} BAUD_4800=6 BAUD_4800 value
       * @property {number} BAUD_9600=7 BAUD_9600 value
       * @property {number} BAUD_19200=8 BAUD_19200 value
       * @property {number} BAUD_38400=9 BAUD_38400 value
       * @property {number} BAUD_57600=10 BAUD_57600 value
       * @property {number} BAUD_115200=11 BAUD_115200 value
       * @property {number} BAUD_230400=12 BAUD_230400 value
       * @property {number} BAUD_460800=13 BAUD_460800 value
       * @property {number} BAUD_576000=14 BAUD_576000 value
       * @property {number} BAUD_921600=15 BAUD_921600 value
       */
      SerialConfig.Serial_Baud = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'BAUD_DEFAULT')] = 0
        values[(valuesById[1] = 'BAUD_110')] = 1
        values[(valuesById[2] = 'BAUD_300')] = 2
        values[(valuesById[3] = 'BAUD_600')] = 3
        values[(valuesById[4] = 'BAUD_1200')] = 4
        values[(valuesById[5] = 'BAUD_2400')] = 5
        values[(valuesById[6] = 'BAUD_4800')] = 6
        values[(valuesById[7] = 'BAUD_9600')] = 7
        values[(valuesById[8] = 'BAUD_19200')] = 8
        values[(valuesById[9] = 'BAUD_38400')] = 9
        values[(valuesById[10] = 'BAUD_57600')] = 10
        values[(valuesById[11] = 'BAUD_115200')] = 11
        values[(valuesById[12] = 'BAUD_230400')] = 12
        values[(valuesById[13] = 'BAUD_460800')] = 13
        values[(valuesById[14] = 'BAUD_576000')] = 14
        values[(valuesById[15] = 'BAUD_921600')] = 15
        return values
      })()

      /**
       * TODO: REPLACE
       * @name meshtastic.ModuleConfig.SerialConfig.Serial_Mode
       * @enum {number}
       * @property {number} DEFAULT=0 DEFAULT value
       * @property {number} SIMPLE=1 SIMPLE value
       * @property {number} PROTO=2 PROTO value
       * @property {number} TEXTMSG=3 TEXTMSG value
       * @property {number} NMEA=4 NMEA value
       * @property {number} CALTOPO=5 NMEA messages specifically tailored for CalTopo
       * @property {number} WS85=6 Ecowitt WS85 weather station
       */
      SerialConfig.Serial_Mode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'DEFAULT')] = 0
        values[(valuesById[1] = 'SIMPLE')] = 1
        values[(valuesById[2] = 'PROTO')] = 2
        values[(valuesById[3] = 'TEXTMSG')] = 3
        values[(valuesById[4] = 'NMEA')] = 4
        values[(valuesById[5] = 'CALTOPO')] = 5
        values[(valuesById[6] = 'WS85')] = 6
        return values
      })()

      return SerialConfig
    })()

    ModuleConfig.ExternalNotificationConfig = (function () {
      /**
       * Properties of an ExternalNotificationConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IExternalNotificationConfig
       * @property {boolean|null} [enabled] Enable the ExternalNotificationModule
       * @property {number|null} [outputMs] When using in On/Off mode, keep the output on for this many
       * milliseconds. Default 1000ms (1 second).
       * @property {number|null} [output] Define the output pin GPIO setting Defaults to
       * EXT_NOTIFY_OUT if set for the board.
       * In standalone devices this pin should drive the LED to match the UI.
       * @property {number|null} [outputVibra] Optional: Define a secondary output pin for a vibra motor
       * This is used in standalone devices to match the UI.
       * @property {number|null} [outputBuzzer] Optional: Define a tertiary output pin for an active buzzer
       * This is used in standalone devices to to match the UI.
       * @property {boolean|null} [active] IF this is true, the 'output' Pin will be pulled active high, false
       * means active low.
       * @property {boolean|null} [alertMessage] True: Alert when a text message arrives (output)
       * @property {boolean|null} [alertMessageVibra] True: Alert when a text message arrives (output_vibra)
       * @property {boolean|null} [alertMessageBuzzer] True: Alert when a text message arrives (output_buzzer)
       * @property {boolean|null} [alertBell] True: Alert when the bell character is received (output)
       * @property {boolean|null} [alertBellVibra] True: Alert when the bell character is received (output_vibra)
       * @property {boolean|null} [alertBellBuzzer] True: Alert when the bell character is received (output_buzzer)
       * @property {boolean|null} [usePwm] use a PWM output instead of a simple on/off output. This will ignore
       * the 'output', 'output_ms' and 'active' settings and use the
       * device.buzzer_gpio instead.
       * @property {number|null} [nagTimeout] The notification will toggle with 'output_ms' for this time of seconds.
       * Default is 0 which means don't repeat at all. 60 would mean blink
       * and/or beep for 60 seconds
       * @property {boolean|null} [useI2sAsBuzzer] When true, enables devices with native I2S audio output to use the RTTTL over speaker like a buzzer
       * T-Watch S3 and T-Deck for example have this capability
       */

      /**
       * Constructs a new ExternalNotificationConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc External Notifications Config
       * @implements IExternalNotificationConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IExternalNotificationConfig=} [properties] Properties to set
       */
      function ExternalNotificationConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Enable the ExternalNotificationModule
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.enabled = null

      /**
       * When using in On/Off mode, keep the output on for this many
       * milliseconds. Default 1000ms (1 second).
       * @member {number|null|undefined} outputMs
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.outputMs = null

      /**
       * Define the output pin GPIO setting Defaults to
       * EXT_NOTIFY_OUT if set for the board.
       * In standalone devices this pin should drive the LED to match the UI.
       * @member {number|null|undefined} output
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.output = null

      /**
       * Optional: Define a secondary output pin for a vibra motor
       * This is used in standalone devices to match the UI.
       * @member {number|null|undefined} outputVibra
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.outputVibra = null

      /**
       * Optional: Define a tertiary output pin for an active buzzer
       * This is used in standalone devices to to match the UI.
       * @member {number|null|undefined} outputBuzzer
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.outputBuzzer = null

      /**
       * IF this is true, the 'output' Pin will be pulled active high, false
       * means active low.
       * @member {boolean|null|undefined} active
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.active = null

      /**
       * True: Alert when a text message arrives (output)
       * @member {boolean|null|undefined} alertMessage
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertMessage = null

      /**
       * True: Alert when a text message arrives (output_vibra)
       * @member {boolean|null|undefined} alertMessageVibra
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertMessageVibra = null

      /**
       * True: Alert when a text message arrives (output_buzzer)
       * @member {boolean|null|undefined} alertMessageBuzzer
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertMessageBuzzer = null

      /**
       * True: Alert when the bell character is received (output)
       * @member {boolean|null|undefined} alertBell
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertBell = null

      /**
       * True: Alert when the bell character is received (output_vibra)
       * @member {boolean|null|undefined} alertBellVibra
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertBellVibra = null

      /**
       * True: Alert when the bell character is received (output_buzzer)
       * @member {boolean|null|undefined} alertBellBuzzer
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertBellBuzzer = null

      /**
       * use a PWM output instead of a simple on/off output. This will ignore
       * the 'output', 'output_ms' and 'active' settings and use the
       * device.buzzer_gpio instead.
       * @member {boolean|null|undefined} usePwm
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.usePwm = null

      /**
       * The notification will toggle with 'output_ms' for this time of seconds.
       * Default is 0 which means don't repeat at all. 60 would mean blink
       * and/or beep for 60 seconds
       * @member {number|null|undefined} nagTimeout
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.nagTimeout = null

      /**
       * When true, enables devices with native I2S audio output to use the RTTTL over speaker like a buzzer
       * T-Watch S3 and T-Deck for example have this capability
       * @member {boolean|null|undefined} useI2sAsBuzzer
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.useI2sAsBuzzer = null

      /**
       * Decodes an ExternalNotificationConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.ExternalNotificationConfig} ExternalNotificationConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      ExternalNotificationConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.ExternalNotificationConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.outputMs = reader.uint32()
              break
            }
            case 3: {
              message.output = reader.uint32()
              break
            }
            case 8: {
              message.outputVibra = reader.uint32()
              break
            }
            case 9: {
              message.outputBuzzer = reader.uint32()
              break
            }
            case 4: {
              message.active = reader.bool()
              break
            }
            case 5: {
              message.alertMessage = reader.bool()
              break
            }
            case 10: {
              message.alertMessageVibra = reader.bool()
              break
            }
            case 11: {
              message.alertMessageBuzzer = reader.bool()
              break
            }
            case 6: {
              message.alertBell = reader.bool()
              break
            }
            case 12: {
              message.alertBellVibra = reader.bool()
              break
            }
            case 13: {
              message.alertBellBuzzer = reader.bool()
              break
            }
            case 7: {
              message.usePwm = reader.bool()
              break
            }
            case 14: {
              message.nagTimeout = reader.uint32()
              break
            }
            case 15: {
              message.useI2sAsBuzzer = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return ExternalNotificationConfig
    })()

    ModuleConfig.StoreForwardConfig = (function () {
      /**
       * Properties of a StoreForwardConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IStoreForwardConfig
       * @property {boolean|null} [enabled] Enable the Store and Forward Module
       * @property {boolean|null} [heartbeat] TODO: REPLACE
       * @property {number|null} [records] TODO: REPLACE
       * @property {number|null} [historyReturnMax] TODO: REPLACE
       * @property {number|null} [historyReturnWindow] TODO: REPLACE
       * @property {boolean|null} [isServer] Set to true to let this node act as a server that stores received messages and resends them upon request.
       */

      /**
       * Constructs a new StoreForwardConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Store and Forward Module Config
       * @implements IStoreForwardConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IStoreForwardConfig=} [properties] Properties to set
       */
      function StoreForwardConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Enable the Store and Forward Module
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.enabled = null

      /**
       * TODO: REPLACE
       * @member {boolean|null|undefined} heartbeat
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.heartbeat = null

      /**
       * TODO: REPLACE
       * @member {number|null|undefined} records
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.records = null

      /**
       * TODO: REPLACE
       * @member {number|null|undefined} historyReturnMax
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.historyReturnMax = null

      /**
       * TODO: REPLACE
       * @member {number|null|undefined} historyReturnWindow
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.historyReturnWindow = null

      /**
       * Set to true to let this node act as a server that stores received messages and resends them upon request.
       * @member {boolean|null|undefined} isServer
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.isServer = null

      /**
       * Decodes a StoreForwardConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.StoreForwardConfig} StoreForwardConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      StoreForwardConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.StoreForwardConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.heartbeat = reader.bool()
              break
            }
            case 3: {
              message.records = reader.uint32()
              break
            }
            case 4: {
              message.historyReturnMax = reader.uint32()
              break
            }
            case 5: {
              message.historyReturnWindow = reader.uint32()
              break
            }
            case 6: {
              message.isServer = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return StoreForwardConfig
    })()

    ModuleConfig.RangeTestConfig = (function () {
      /**
       * Properties of a RangeTestConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IRangeTestConfig
       * @property {boolean|null} [enabled] Enable the Range Test Module
       * @property {number|null} [sender] Send out range test messages from this node
       * @property {boolean|null} [save] Bool value indicating that this node should save a RangeTest.csv file.
       * ESP32 Only
       */

      /**
       * Constructs a new RangeTestConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Preferences for the RangeTestModule
       * @implements IRangeTestConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IRangeTestConfig=} [properties] Properties to set
       */
      function RangeTestConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Enable the Range Test Module
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @instance
       */
      RangeTestConfig.prototype.enabled = null

      /**
       * Send out range test messages from this node
       * @member {number|null|undefined} sender
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @instance
       */
      RangeTestConfig.prototype.sender = null

      /**
       * Bool value indicating that this node should save a RangeTest.csv file.
       * ESP32 Only
       * @member {boolean|null|undefined} save
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @instance
       */
      RangeTestConfig.prototype.save = null

      /**
       * Decodes a RangeTestConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.RangeTestConfig} RangeTestConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      RangeTestConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.RangeTestConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.sender = reader.uint32()
              break
            }
            case 3: {
              message.save = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return RangeTestConfig
    })()

    ModuleConfig.TelemetryConfig = (function () {
      /**
       * Properties of a TelemetryConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface ITelemetryConfig
       * @property {number|null} [deviceUpdateInterval] Interval in seconds of how often we should try to send our
       * device metrics to the mesh
       * @property {number|null} [environmentUpdateInterval] TelemetryConfig environmentUpdateInterval
       * @property {boolean|null} [environmentMeasurementEnabled] Preferences for the Telemetry Module (Environment)
       * Enable/Disable the telemetry measurement module measurement collection
       * @property {boolean|null} [environmentScreenEnabled] Enable/Disable the telemetry measurement module on-device display
       * @property {boolean|null} [environmentDisplayFahrenheit] We'll always read the sensor in Celsius, but sometimes we might want to
       * display the results in Fahrenheit as a "user preference".
       * @property {boolean|null} [airQualityEnabled] Enable/Disable the air quality metrics
       * @property {number|null} [airQualityInterval] Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       * @property {boolean|null} [powerMeasurementEnabled] Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       * @property {number|null} [powerUpdateInterval] Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       * @property {boolean|null} [powerScreenEnabled] Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */

      /**
       * Constructs a new TelemetryConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Configuration for both device and environment metrics
       * @implements ITelemetryConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.ITelemetryConfig=} [properties] Properties to set
       */
      function TelemetryConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Interval in seconds of how often we should try to send our
       * device metrics to the mesh
       * @member {number|null|undefined} deviceUpdateInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.deviceUpdateInterval = null

      /**
       * TelemetryConfig environmentUpdateInterval.
       * @member {number|null|undefined} environmentUpdateInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.environmentUpdateInterval = null

      /**
       * Preferences for the Telemetry Module (Environment)
       * Enable/Disable the telemetry measurement module measurement collection
       * @member {boolean|null|undefined} environmentMeasurementEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.environmentMeasurementEnabled = null

      /**
       * Enable/Disable the telemetry measurement module on-device display
       * @member {boolean|null|undefined} environmentScreenEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.environmentScreenEnabled = null

      /**
       * We'll always read the sensor in Celsius, but sometimes we might want to
       * display the results in Fahrenheit as a "user preference".
       * @member {boolean|null|undefined} environmentDisplayFahrenheit
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.environmentDisplayFahrenheit = null

      /**
       * Enable/Disable the air quality metrics
       * @member {boolean|null|undefined} airQualityEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.airQualityEnabled = null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       * @member {number|null|undefined} airQualityInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.airQualityInterval = null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       * @member {boolean|null|undefined} powerMeasurementEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.powerMeasurementEnabled = null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       * @member {number|null|undefined} powerUpdateInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.powerUpdateInterval = null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       * @member {boolean|null|undefined} powerScreenEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.powerScreenEnabled = null

      /**
       * Decodes a TelemetryConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.TelemetryConfig} TelemetryConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      TelemetryConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.TelemetryConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.deviceUpdateInterval = reader.uint32()
              break
            }
            case 2: {
              message.environmentUpdateInterval = reader.uint32()
              break
            }
            case 3: {
              message.environmentMeasurementEnabled = reader.bool()
              break
            }
            case 4: {
              message.environmentScreenEnabled = reader.bool()
              break
            }
            case 5: {
              message.environmentDisplayFahrenheit = reader.bool()
              break
            }
            case 6: {
              message.airQualityEnabled = reader.bool()
              break
            }
            case 7: {
              message.airQualityInterval = reader.uint32()
              break
            }
            case 8: {
              message.powerMeasurementEnabled = reader.bool()
              break
            }
            case 9: {
              message.powerUpdateInterval = reader.uint32()
              break
            }
            case 10: {
              message.powerScreenEnabled = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return TelemetryConfig
    })()

    ModuleConfig.CannedMessageConfig = (function () {
      /**
       * Properties of a CannedMessageConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface ICannedMessageConfig
       * @property {boolean|null} [rotary1Enabled] Enable the rotary encoder #1. This is a 'dumb' encoder sending pulses on both A and B pins while rotating.
       * @property {number|null} [inputbrokerPinA] GPIO pin for rotary encoder A port.
       * @property {number|null} [inputbrokerPinB] GPIO pin for rotary encoder B port.
       * @property {number|null} [inputbrokerPinPress] GPIO pin for rotary encoder Press port.
       * @property {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar|null} [inputbrokerEventCw] Generate input event on CW of this kind.
       * @property {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar|null} [inputbrokerEventCcw] Generate input event on CCW of this kind.
       * @property {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar|null} [inputbrokerEventPress] Generate input event on Press of this kind.
       * @property {boolean|null} [updown1Enabled] Enable the Up/Down/Select input device. Can be RAK rotary encoder or 3 buttons. Uses the a/b/press definitions from inputbroker.
       * @property {boolean|null} [enabled] Enable/disable CannedMessageModule.
       * @property {string|null} [allowInputSource] Input event origin accepted by the canned message module.
       * Can be e.g. "rotEnc1", "upDownEnc1" or keyword "_any"
       * @property {boolean|null} [sendBell] CannedMessageModule also sends a bell character with the messages.
       * ExternalNotificationModule can benefit from this feature.
       */

      /**
       * Constructs a new CannedMessageConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc TODO: REPLACE
       * @implements ICannedMessageConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.ICannedMessageConfig=} [properties] Properties to set
       */
      function CannedMessageConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Enable the rotary encoder #1. This is a 'dumb' encoder sending pulses on both A and B pins while rotating.
       * @member {boolean|null|undefined} rotary1Enabled
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.rotary1Enabled = null

      /**
       * GPIO pin for rotary encoder A port.
       * @member {number|null|undefined} inputbrokerPinA
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerPinA = null

      /**
       * GPIO pin for rotary encoder B port.
       * @member {number|null|undefined} inputbrokerPinB
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerPinB = null

      /**
       * GPIO pin for rotary encoder Press port.
       * @member {number|null|undefined} inputbrokerPinPress
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerPinPress = null

      /**
       * Generate input event on CW of this kind.
       * @member {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar|null|undefined} inputbrokerEventCw
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerEventCw = null

      /**
       * Generate input event on CCW of this kind.
       * @member {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar|null|undefined} inputbrokerEventCcw
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerEventCcw = null

      /**
       * Generate input event on Press of this kind.
       * @member {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar|null|undefined} inputbrokerEventPress
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerEventPress = null

      /**
       * Enable the Up/Down/Select input device. Can be RAK rotary encoder or 3 buttons. Uses the a/b/press definitions from inputbroker.
       * @member {boolean|null|undefined} updown1Enabled
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.updown1Enabled = null

      /**
       * Enable/disable CannedMessageModule.
       * @member {boolean|null|undefined} enabled
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.enabled = null

      /**
       * Input event origin accepted by the canned message module.
       * Can be e.g. "rotEnc1", "upDownEnc1" or keyword "_any"
       * @member {string|null|undefined} allowInputSource
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.allowInputSource = null

      /**
       * CannedMessageModule also sends a bell character with the messages.
       * ExternalNotificationModule can benefit from this feature.
       * @member {boolean|null|undefined} sendBell
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.sendBell = null

      /**
       * Decodes a CannedMessageConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.CannedMessageConfig} CannedMessageConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      CannedMessageConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.CannedMessageConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.rotary1Enabled = reader.bool()
              break
            }
            case 2: {
              message.inputbrokerPinA = reader.uint32()
              break
            }
            case 3: {
              message.inputbrokerPinB = reader.uint32()
              break
            }
            case 4: {
              message.inputbrokerPinPress = reader.uint32()
              break
            }
            case 5: {
              message.inputbrokerEventCw = reader.int32()
              break
            }
            case 6: {
              message.inputbrokerEventCcw = reader.int32()
              break
            }
            case 7: {
              message.inputbrokerEventPress = reader.int32()
              break
            }
            case 8: {
              message.updown1Enabled = reader.bool()
              break
            }
            case 9: {
              message.enabled = reader.bool()
              break
            }
            case 10: {
              message.allowInputSource = reader.string()
              break
            }
            case 11: {
              message.sendBell = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      /**
       * TODO: REPLACE
       * @name meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar
       * @enum {number}
       * @property {number} NONE=0 TODO: REPLACE
       * @property {number} UP=17 TODO: REPLACE
       * @property {number} DOWN=18 TODO: REPLACE
       * @property {number} LEFT=19 TODO: REPLACE
       * @property {number} RIGHT=20 TODO: REPLACE
       * @property {number} SELECT=10 '\n'
       * @property {number} BACK=27 TODO: REPLACE
       * @property {number} CANCEL=24 TODO: REPLACE
       */
      CannedMessageConfig.InputEventChar = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'NONE')] = 0
        values[(valuesById[17] = 'UP')] = 17
        values[(valuesById[18] = 'DOWN')] = 18
        values[(valuesById[19] = 'LEFT')] = 19
        values[(valuesById[20] = 'RIGHT')] = 20
        values[(valuesById[10] = 'SELECT')] = 10
        values[(valuesById[27] = 'BACK')] = 27
        values[(valuesById[24] = 'CANCEL')] = 24
        return values
      })()

      return CannedMessageConfig
    })()

    ModuleConfig.AmbientLightingConfig = (function () {
      /**
       * Properties of an AmbientLightingConfig.
       * @memberof meshtastic.ModuleConfig
       * @interface IAmbientLightingConfig
       * @property {boolean|null} [ledState] Sets LED to on or off.
       * @property {number|null} [current] Sets the current for the LED output. Default is 10.
       * @property {number|null} [red] Sets the red LED level. Values are 0-255.
       * @property {number|null} [green] Sets the green LED level. Values are 0-255.
       * @property {number|null} [blue] Sets the blue LED level. Values are 0-255.
       */

      /**
       * Constructs a new AmbientLightingConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Ambient Lighting Module - Settings for control of onboard LEDs to allow users to adjust the brightness levels and respective color levels.
       * Initially created for the RAK14001 RGB LED module.
       * @implements IAmbientLightingConfig
       * @constructor
       * @param {meshtastic.ModuleConfig.IAmbientLightingConfig=} [properties] Properties to set
       */
      function AmbientLightingConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Sets LED to on or off.
       * @member {boolean|null|undefined} ledState
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.ledState = null

      /**
       * Sets the current for the LED output. Default is 10.
       * @member {number|null|undefined} current
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.current = null

      /**
       * Sets the red LED level. Values are 0-255.
       * @member {number|null|undefined} red
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.red = null

      /**
       * Sets the green LED level. Values are 0-255.
       * @member {number|null|undefined} green
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.green = null

      /**
       * Sets the blue LED level. Values are 0-255.
       * @member {number|null|undefined} blue
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.blue = null

      /**
       * Decodes an AmbientLightingConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.ModuleConfig.AmbientLightingConfig} AmbientLightingConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      AmbientLightingConfig.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.AmbientLightingConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          switch (tag >>> 3) {
            case 1: {
              message.ledState = reader.bool()
              break
            }
            case 2: {
              message.current = reader.uint32()
              break
            }
            case 3: {
              message.red = reader.uint32()
              break
            }
            case 4: {
              message.green = reader.uint32()
              break
            }
            case 5: {
              message.blue = reader.uint32()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return AmbientLightingConfig
    })()

    return ModuleConfig
  })()

  meshtastic.RemoteHardwarePin = (function () {
    /**
     * Properties of a RemoteHardwarePin.
     * @memberof meshtastic
     * @interface IRemoteHardwarePin
     * @property {number|null} [gpioPin] GPIO Pin number (must match Arduino)
     * @property {string|null} [name] Name for the GPIO pin (i.e. Front gate, mailbox, etc)
     * @property {meshtastic.RemoteHardwarePinType|null} [type] Type of GPIO access available to consumers on the mesh
     */

    /**
     * Constructs a new RemoteHardwarePin.
     * @memberof meshtastic
     * @classdesc A GPIO pin definition for remote hardware module
     * @implements IRemoteHardwarePin
     * @constructor
     * @param {meshtastic.IRemoteHardwarePin=} [properties] Properties to set
     */
    function RemoteHardwarePin(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * GPIO Pin number (must match Arduino)
     * @member {number|null|undefined} gpioPin
     * @memberof meshtastic.RemoteHardwarePin
     * @instance
     */
    RemoteHardwarePin.prototype.gpioPin = null

    /**
     * Name for the GPIO pin (i.e. Front gate, mailbox, etc)
     * @member {string|null|undefined} name
     * @memberof meshtastic.RemoteHardwarePin
     * @instance
     */
    RemoteHardwarePin.prototype.name = null

    /**
     * Type of GPIO access available to consumers on the mesh
     * @member {meshtastic.RemoteHardwarePinType|null|undefined} type
     * @memberof meshtastic.RemoteHardwarePin
     * @instance
     */
    RemoteHardwarePin.prototype.type = null

    /**
     * Decodes a RemoteHardwarePin message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.RemoteHardwarePin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.RemoteHardwarePin} RemoteHardwarePin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RemoteHardwarePin.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.RemoteHardwarePin()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.gpioPin = reader.uint32()
            break
          }
          case 2: {
            message.name = reader.string()
            break
          }
          case 3: {
            message.type = reader.int32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return RemoteHardwarePin
  })()

  /**
   * RemoteHardwarePinType enum.
   * @name meshtastic.RemoteHardwarePinType
   * @enum {number}
   * @property {number} UNKNOWN=0 Unset/unused
   * @property {number} DIGITAL_READ=1 GPIO pin can be read (if it is high / low)
   * @property {number} DIGITAL_WRITE=2 GPIO pin can be written to (high / low)
   */
  meshtastic.RemoteHardwarePinType = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'UNKNOWN')] = 0
    values[(valuesById[1] = 'DIGITAL_READ')] = 1
    values[(valuesById[2] = 'DIGITAL_WRITE')] = 2
    return values
  })()

  /**
   * For any new 'apps' that run on the device or via sister apps on phones/PCs they should pick and use a
   * unique 'portnum' for their application.
   * If you are making a new app using meshtastic, please send in a pull request to add your 'portnum' to this
   * master table.
   * PortNums should be assigned in the following range:
   * 0-63   Core Meshtastic use, do not use for third party apps
   * 64-127 Registered 3rd party apps, send in a pull request that adds a new entry to portnums.proto to  register your application
   * 256-511 Use one of these portnums for your private applications that you don't want to register publically
   * All other values are reserved.
   * Note: This was formerly a Type enum named 'typ' with the same id #
   * We have change to this 'portnum' based scheme for specifying app handlers for particular payloads.
   * This change is backwards compatible by treating the legacy OPAQUE/CLEAR_TEXT values identically.
   * @name meshtastic.PortNum
   * @enum {number}
   * @property {number} UNKNOWN_APP=0 Deprecated: do not use in new code (formerly called OPAQUE)
   * A message sent from a device outside of the mesh, in a form the mesh does not understand
   * NOTE: This must be 0, because it is documented in IMeshService.aidl to be so
   * ENCODING: binary undefined
   * @property {number} TEXT_MESSAGE_APP=1 A simple UTF-8 text message, which even the little micros in the mesh
   * can understand and show on their screen eventually in some circumstances
   * even signal might send messages in this form (see below)
   * ENCODING: UTF-8 Plaintext (?)
   * @property {number} REMOTE_HARDWARE_APP=2 Reserved for built-in GPIO/example app.
   * See remote_hardware.proto/HardwareMessage for details on the message sent/received to this port number
   * ENCODING: Protobuf
   * @property {number} POSITION_APP=3 The built-in position messaging app.
   * Payload is a Position message.
   * ENCODING: Protobuf
   * @property {number} NODEINFO_APP=4 The built-in user info app.
   * Payload is a User message.
   * ENCODING: Protobuf
   * @property {number} ROUTING_APP=5 Protocol control packets for mesh protocol use.
   * Payload is a Routing message.
   * ENCODING: Protobuf
   * @property {number} ADMIN_APP=6 Admin control packets.
   * Payload is a AdminMessage message.
   * ENCODING: Protobuf
   * @property {number} TEXT_MESSAGE_COMPRESSED_APP=7 Compressed TEXT_MESSAGE payloads.
   * ENCODING: UTF-8 Plaintext (?) with Unishox2 Compression
   * NOTE: The Device Firmware converts a TEXT_MESSAGE_APP to TEXT_MESSAGE_COMPRESSED_APP if the compressed
   * payload is shorter. There's no need for app developers to do this themselves. Also the firmware will decompress
   * any incoming TEXT_MESSAGE_COMPRESSED_APP payload and convert to TEXT_MESSAGE_APP.
   * @property {number} WAYPOINT_APP=8 Waypoint payloads.
   * Payload is a Waypoint message.
   * ENCODING: Protobuf
   * @property {number} AUDIO_APP=9 Audio Payloads.
   * Encapsulated codec2 packets. On 2.4 GHZ Bandwidths only for now
   * ENCODING: codec2 audio frames
   * NOTE: audio frames contain a 3 byte header (0xc0 0xde 0xc2) and a one byte marker for the decompressed bitrate.
   * This marker comes from the 'moduleConfig.audio.bitrate' enum minus one.
   * @property {number} DETECTION_SENSOR_APP=10 Same as Text Message but originating from Detection Sensor Module.
   * NOTE: This portnum traffic is not sent to the public MQTT starting at firmware version 2.2.9
   * @property {number} REPLY_APP=32 Provides a 'ping' service that replies to any packet it receives.
   * Also serves as a small example module.
   * ENCODING: ASCII Plaintext
   * @property {number} IP_TUNNEL_APP=33 Used for the python IP tunnel feature
   * ENCODING: IP Packet. Handled by the python API, firmware ignores this one and pases on.
   * @property {number} PAXCOUNTER_APP=34 Paxcounter lib included in the firmware
   * ENCODING: protobuf
   * @property {number} SERIAL_APP=64 Provides a hardware serial interface to send and receive from the Meshtastic network.
   * Connect to the RX/TX pins of a device with 38400 8N1. Packets received from the Meshtastic
   * network is forwarded to the RX pin while sending a packet to TX will go out to the Mesh network.
   * Maximum packet size of 240 bytes.
   * Module is disabled by default can be turned on by setting SERIAL_MODULE_ENABLED = 1 in SerialPlugh.cpp.
   * ENCODING: binary undefined
   * @property {number} STORE_FORWARD_APP=65 STORE_FORWARD_APP (Work in Progress)
   * Maintained by Jm Casler (MC Hamster) : jm@casler.org
   * ENCODING: Protobuf
   * @property {number} RANGE_TEST_APP=66 Optional port for messages for the range test module.
   * ENCODING: ASCII Plaintext
   * NOTE: This portnum traffic is not sent to the public MQTT starting at firmware version 2.2.9
   * @property {number} TELEMETRY_APP=67 Provides a format to send and receive telemetry data from the Meshtastic network.
   * Maintained by Charles Crossan (crossan007) : crossan007@gmail.com
   * ENCODING: Protobuf
   * @property {number} ZPS_APP=68 Experimental tools for estimating node position without a GPS
   * Maintained by Github user a-f-G-U-C (a Meshtastic contributor)
   * Project files at https://github.com/a-f-G-U-C/Meshtastic-ZPS
   * ENCODING: arrays of int64 fields
   * @property {number} SIMULATOR_APP=69 Used to let multiple instances of Linux native applications communicate
   * as if they did using their LoRa chip.
   * Maintained by GitHub user GUVWAF.
   * Project files at https://github.com/GUVWAF/Meshtasticator
   * ENCODING: Protobuf (?)
   * @property {number} TRACEROUTE_APP=70 Provides a traceroute functionality to show the route a packet towards
   * a certain destination would take on the mesh.
   * ENCODING: Protobuf
   * @property {number} NEIGHBORINFO_APP=71 Aggregates edge info for the network by sending out a list of each node's neighbors
   * ENCODING: Protobuf
   * @property {number} ATAK_PLUGIN=72 ATAK Plugin
   * Portnum for payloads from the official Meshtastic ATAK plugin
   * @property {number} MAP_REPORT_APP=73 Provides unencrypted information about a node for consumption by a map via MQTT
   * @property {number} POWERSTRESS_APP=74 PowerStress based monitoring support (for automated power consumption testing)
   * @property {number} PRIVATE_APP=256 Private applications should use portnums >= 256.
   * To simplify initial development and testing you can use "PRIVATE_APP"
   * in your code without needing to rebuild protobuf files (via [regen-protos.sh](https://github.com/meshtastic/firmware/blob/master/bin/regen-protos.sh))
   * @property {number} ATAK_FORWARDER=257 ATAK Forwarder Module https://github.com/paulmandal/atak-forwarder
   * ENCODING: libcotshrink
   * @property {number} MAX=511 Currently we limit port nums to no higher than this value
   */
  meshtastic.PortNum = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'UNKNOWN_APP')] = 0
    values[(valuesById[1] = 'TEXT_MESSAGE_APP')] = 1
    values[(valuesById[2] = 'REMOTE_HARDWARE_APP')] = 2
    values[(valuesById[3] = 'POSITION_APP')] = 3
    values[(valuesById[4] = 'NODEINFO_APP')] = 4
    values[(valuesById[5] = 'ROUTING_APP')] = 5
    values[(valuesById[6] = 'ADMIN_APP')] = 6
    values[(valuesById[7] = 'TEXT_MESSAGE_COMPRESSED_APP')] = 7
    values[(valuesById[8] = 'WAYPOINT_APP')] = 8
    values[(valuesById[9] = 'AUDIO_APP')] = 9
    values[(valuesById[10] = 'DETECTION_SENSOR_APP')] = 10
    values[(valuesById[32] = 'REPLY_APP')] = 32
    values[(valuesById[33] = 'IP_TUNNEL_APP')] = 33
    values[(valuesById[34] = 'PAXCOUNTER_APP')] = 34
    values[(valuesById[64] = 'SERIAL_APP')] = 64
    values[(valuesById[65] = 'STORE_FORWARD_APP')] = 65
    values[(valuesById[66] = 'RANGE_TEST_APP')] = 66
    values[(valuesById[67] = 'TELEMETRY_APP')] = 67
    values[(valuesById[68] = 'ZPS_APP')] = 68
    values[(valuesById[69] = 'SIMULATOR_APP')] = 69
    values[(valuesById[70] = 'TRACEROUTE_APP')] = 70
    values[(valuesById[71] = 'NEIGHBORINFO_APP')] = 71
    values[(valuesById[72] = 'ATAK_PLUGIN')] = 72
    values[(valuesById[73] = 'MAP_REPORT_APP')] = 73
    values[(valuesById[74] = 'POWERSTRESS_APP')] = 74
    values[(valuesById[256] = 'PRIVATE_APP')] = 256
    values[(valuesById[257] = 'ATAK_FORWARDER')] = 257
    values[(valuesById[511] = 'MAX')] = 511
    return values
  })()

  meshtastic.DeviceMetrics = (function () {
    /**
     * Properties of a DeviceMetrics.
     * @memberof meshtastic
     * @interface IDeviceMetrics
     * @property {number|null} [batteryLevel] 0-100 (>100 means powered)
     * @property {number|null} [voltage] Voltage measured
     * @property {number|null} [channelUtilization] Utilization for the current channel, including well formed TX, RX and malformed RX (aka noise).
     * @property {number|null} [airUtilTx] Percent of airtime for transmission used within the last hour.
     * @property {number|null} [uptimeSeconds] How long the device has been running since the last reboot (in seconds)
     */

    /**
     * Constructs a new DeviceMetrics.
     * @memberof meshtastic
     * @classdesc Key native device metrics such as battery level
     * @implements IDeviceMetrics
     * @constructor
     * @param {meshtastic.IDeviceMetrics=} [properties] Properties to set
     */
    function DeviceMetrics(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * 0-100 (>100 means powered)
     * @member {number|null|undefined} batteryLevel
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    DeviceMetrics.prototype.batteryLevel = null

    /**
     * Voltage measured
     * @member {number|null|undefined} voltage
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    DeviceMetrics.prototype.voltage = null

    /**
     * Utilization for the current channel, including well formed TX, RX and malformed RX (aka noise).
     * @member {number|null|undefined} channelUtilization
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    DeviceMetrics.prototype.channelUtilization = null

    /**
     * Percent of airtime for transmission used within the last hour.
     * @member {number|null|undefined} airUtilTx
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    DeviceMetrics.prototype.airUtilTx = null

    /**
     * How long the device has been running since the last reboot (in seconds)
     * @member {number|null|undefined} uptimeSeconds
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    DeviceMetrics.prototype.uptimeSeconds = null

    /**
     * Decodes a DeviceMetrics message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.DeviceMetrics
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.DeviceMetrics} DeviceMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeviceMetrics.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.DeviceMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.batteryLevel = reader.uint32()
            break
          }
          case 2: {
            message.voltage = reader.float()
            break
          }
          case 3: {
            message.channelUtilization = reader.float()
            break
          }
          case 4: {
            message.airUtilTx = reader.float()
            break
          }
          case 5: {
            message.uptimeSeconds = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return DeviceMetrics
  })()

  meshtastic.EnvironmentMetrics = (function () {
    /**
     * Properties of an EnvironmentMetrics.
     * @memberof meshtastic
     * @interface IEnvironmentMetrics
     * @property {number|null} [temperature] Temperature measured
     * @property {number|null} [relativeHumidity] Relative humidity percent measured
     * @property {number|null} [barometricPressure] Barometric pressure in hPA measured
     * @property {number|null} [gasResistance] Gas resistance in MOhm measured
     * @property {number|null} [voltage] Voltage measured (To be depreciated in favor of PowerMetrics in Meshtastic 3.x)
     * @property {number|null} [current] Current measured (To be depreciated in favor of PowerMetrics in Meshtastic 3.x)
     * @property {number|null} [iaq] relative scale IAQ value as measured by Bosch BME680 . value 0-500.
     * Belongs to Air Quality but is not particle but VOC measurement. Other VOC values can also be put in here.
     * @property {number|null} [distance] RCWL9620 Doppler Radar Distance Sensor, used for water level detection. Float value in mm.
     * @property {number|null} [lux] VEML7700 high accuracy ambient light(Lux) digital 16-bit resolution sensor.
     * @property {number|null} [whiteLux] VEML7700 high accuracy white light(irradiance) not calibrated digital 16-bit resolution sensor.
     * @property {number|null} [irLux] Infrared lux
     * @property {number|null} [uvLux] Ultraviolet lux
     * @property {number|null} [windDirection] Wind direction in degrees
     * 0 degrees = North, 90 = East, etc...
     * @property {number|null} [windSpeed] Wind speed in m/s
     * @property {number|null} [weight] Weight in KG
     * @property {number|null} [windGust] Wind gust in m/s
     * @property {number|null} [windLull] Wind lull in m/s
     */

    /**
     * Constructs a new EnvironmentMetrics.
     * @memberof meshtastic
     * @classdesc Weather station or other environmental metrics
     * @implements IEnvironmentMetrics
     * @constructor
     * @param {meshtastic.IEnvironmentMetrics=} [properties] Properties to set
     */
    function EnvironmentMetrics(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Temperature measured
     * @member {number|null|undefined} temperature
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.temperature = null

    /**
     * Relative humidity percent measured
     * @member {number|null|undefined} relativeHumidity
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.relativeHumidity = null

    /**
     * Barometric pressure in hPA measured
     * @member {number|null|undefined} barometricPressure
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.barometricPressure = null

    /**
     * Gas resistance in MOhm measured
     * @member {number|null|undefined} gasResistance
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.gasResistance = null

    /**
     * Voltage measured (To be depreciated in favor of PowerMetrics in Meshtastic 3.x)
     * @member {number|null|undefined} voltage
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.voltage = null

    /**
     * Current measured (To be depreciated in favor of PowerMetrics in Meshtastic 3.x)
     * @member {number|null|undefined} current
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.current = null

    /**
     * relative scale IAQ value as measured by Bosch BME680 . value 0-500.
     * Belongs to Air Quality but is not particle but VOC measurement. Other VOC values can also be put in here.
     * @member {number|null|undefined} iaq
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.iaq = null

    /**
     * RCWL9620 Doppler Radar Distance Sensor, used for water level detection. Float value in mm.
     * @member {number|null|undefined} distance
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.distance = null

    /**
     * VEML7700 high accuracy ambient light(Lux) digital 16-bit resolution sensor.
     * @member {number|null|undefined} lux
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.lux = null

    /**
     * VEML7700 high accuracy white light(irradiance) not calibrated digital 16-bit resolution sensor.
     * @member {number|null|undefined} whiteLux
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.whiteLux = null

    /**
     * Infrared lux
     * @member {number|null|undefined} irLux
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.irLux = null

    /**
     * Ultraviolet lux
     * @member {number|null|undefined} uvLux
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.uvLux = null

    /**
     * Wind direction in degrees
     * 0 degrees = North, 90 = East, etc...
     * @member {number|null|undefined} windDirection
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.windDirection = null

    /**
     * Wind speed in m/s
     * @member {number|null|undefined} windSpeed
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.windSpeed = null

    /**
     * Weight in KG
     * @member {number|null|undefined} weight
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.weight = null

    /**
     * Wind gust in m/s
     * @member {number|null|undefined} windGust
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.windGust = null

    /**
     * Wind lull in m/s
     * @member {number|null|undefined} windLull
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.windLull = null

    /**
     * Decodes an EnvironmentMetrics message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.EnvironmentMetrics
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.EnvironmentMetrics} EnvironmentMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EnvironmentMetrics.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.EnvironmentMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.temperature = reader.float()
            break
          }
          case 2: {
            message.relativeHumidity = reader.float()
            break
          }
          case 3: {
            message.barometricPressure = reader.float()
            break
          }
          case 4: {
            message.gasResistance = reader.float()
            break
          }
          case 5: {
            message.voltage = reader.float()
            break
          }
          case 6: {
            message.current = reader.float()
            break
          }
          case 7: {
            message.iaq = reader.uint32()
            break
          }
          case 8: {
            message.distance = reader.float()
            break
          }
          case 9: {
            message.lux = reader.float()
            break
          }
          case 10: {
            message.whiteLux = reader.float()
            break
          }
          case 11: {
            message.irLux = reader.float()
            break
          }
          case 12: {
            message.uvLux = reader.float()
            break
          }
          case 13: {
            message.windDirection = reader.uint32()
            break
          }
          case 14: {
            message.windSpeed = reader.float()
            break
          }
          case 15: {
            message.weight = reader.float()
            break
          }
          case 16: {
            message.windGust = reader.float()
            break
          }
          case 17: {
            message.windLull = reader.float()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return EnvironmentMetrics
  })()

  meshtastic.PowerMetrics = (function () {
    /**
     * Properties of a PowerMetrics.
     * @memberof meshtastic
     * @interface IPowerMetrics
     * @property {number|null} [ch1Voltage] Voltage (Ch1)
     * @property {number|null} [ch1Current] Current (Ch1)
     * @property {number|null} [ch2Voltage] Voltage (Ch2)
     * @property {number|null} [ch2Current] Current (Ch2)
     * @property {number|null} [ch3Voltage] Voltage (Ch3)
     * @property {number|null} [ch3Current] Current (Ch3)
     */

    /**
     * Constructs a new PowerMetrics.
     * @memberof meshtastic
     * @classdesc Power Metrics (voltage / current / etc)
     * @implements IPowerMetrics
     * @constructor
     * @param {meshtastic.IPowerMetrics=} [properties] Properties to set
     */
    function PowerMetrics(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Voltage (Ch1)
     * @member {number|null|undefined} ch1Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch1Voltage = null

    /**
     * Current (Ch1)
     * @member {number|null|undefined} ch1Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch1Current = null

    /**
     * Voltage (Ch2)
     * @member {number|null|undefined} ch2Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch2Voltage = null

    /**
     * Current (Ch2)
     * @member {number|null|undefined} ch2Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch2Current = null

    /**
     * Voltage (Ch3)
     * @member {number|null|undefined} ch3Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch3Voltage = null

    /**
     * Current (Ch3)
     * @member {number|null|undefined} ch3Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch3Current = null

    /**
     * Decodes a PowerMetrics message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.PowerMetrics
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.PowerMetrics} PowerMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PowerMetrics.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.PowerMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.ch1Voltage = reader.float()
            break
          }
          case 2: {
            message.ch1Current = reader.float()
            break
          }
          case 3: {
            message.ch2Voltage = reader.float()
            break
          }
          case 4: {
            message.ch2Current = reader.float()
            break
          }
          case 5: {
            message.ch3Voltage = reader.float()
            break
          }
          case 6: {
            message.ch3Current = reader.float()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return PowerMetrics
  })()

  meshtastic.AirQualityMetrics = (function () {
    /**
     * Properties of an AirQualityMetrics.
     * @memberof meshtastic
     * @interface IAirQualityMetrics
     * @property {number|null} [pm10Standard] Concentration Units Standard PM1.0
     * @property {number|null} [pm25Standard] Concentration Units Standard PM2.5
     * @property {number|null} [pm100Standard] Concentration Units Standard PM10.0
     * @property {number|null} [pm10Environmental] Concentration Units Environmental PM1.0
     * @property {number|null} [pm25Environmental] Concentration Units Environmental PM2.5
     * @property {number|null} [pm100Environmental] Concentration Units Environmental PM10.0
     * @property {number|null} [particles_03um] 0.3um Particle Count
     * @property {number|null} [particles_05um] 0.5um Particle Count
     * @property {number|null} [particles_10um] 1.0um Particle Count
     * @property {number|null} [particles_25um] 2.5um Particle Count
     * @property {number|null} [particles_50um] 5.0um Particle Count
     * @property {number|null} [particles_100um] 10.0um Particle Count
     */

    /**
     * Constructs a new AirQualityMetrics.
     * @memberof meshtastic
     * @classdesc Air quality metrics
     * @implements IAirQualityMetrics
     * @constructor
     * @param {meshtastic.IAirQualityMetrics=} [properties] Properties to set
     */
    function AirQualityMetrics(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Concentration Units Standard PM1.0
     * @member {number|null|undefined} pm10Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm10Standard = null

    /**
     * Concentration Units Standard PM2.5
     * @member {number|null|undefined} pm25Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm25Standard = null

    /**
     * Concentration Units Standard PM10.0
     * @member {number|null|undefined} pm100Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm100Standard = null

    /**
     * Concentration Units Environmental PM1.0
     * @member {number|null|undefined} pm10Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm10Environmental = null

    /**
     * Concentration Units Environmental PM2.5
     * @member {number|null|undefined} pm25Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm25Environmental = null

    /**
     * Concentration Units Environmental PM10.0
     * @member {number|null|undefined} pm100Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm100Environmental = null

    /**
     * 0.3um Particle Count
     * @member {number|null|undefined} particles_03um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_03um = null

    /**
     * 0.5um Particle Count
     * @member {number|null|undefined} particles_05um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_05um = null

    /**
     * 1.0um Particle Count
     * @member {number|null|undefined} particles_10um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_10um = null

    /**
     * 2.5um Particle Count
     * @member {number|null|undefined} particles_25um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_25um = null

    /**
     * 5.0um Particle Count
     * @member {number|null|undefined} particles_50um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_50um = null

    /**
     * 10.0um Particle Count
     * @member {number|null|undefined} particles_100um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_100um = null

    /**
     * Decodes an AirQualityMetrics message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.AirQualityMetrics
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.AirQualityMetrics} AirQualityMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AirQualityMetrics.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.AirQualityMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.pm10Standard = reader.uint32()
            break
          }
          case 2: {
            message.pm25Standard = reader.uint32()
            break
          }
          case 3: {
            message.pm100Standard = reader.uint32()
            break
          }
          case 4: {
            message.pm10Environmental = reader.uint32()
            break
          }
          case 5: {
            message.pm25Environmental = reader.uint32()
            break
          }
          case 6: {
            message.pm100Environmental = reader.uint32()
            break
          }
          case 7: {
            message.particles_03um = reader.uint32()
            break
          }
          case 8: {
            message.particles_05um = reader.uint32()
            break
          }
          case 9: {
            message.particles_10um = reader.uint32()
            break
          }
          case 10: {
            message.particles_25um = reader.uint32()
            break
          }
          case 11: {
            message.particles_50um = reader.uint32()
            break
          }
          case 12: {
            message.particles_100um = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return AirQualityMetrics
  })()

  meshtastic.Telemetry = (function () {
    /**
     * Properties of a Telemetry.
     * @memberof meshtastic
     * @interface ITelemetry
     * @property {number|null} [time] Seconds since 1970 - or 0 for unknown/unset
     * @property {meshtastic.IDeviceMetrics|null} [deviceMetrics] Key native device metrics such as battery level
     * @property {meshtastic.IEnvironmentMetrics|null} [environmentMetrics] Weather station or other environmental metrics
     * @property {meshtastic.IAirQualityMetrics|null} [airQualityMetrics] Air quality metrics
     * @property {meshtastic.IPowerMetrics|null} [powerMetrics] Power Metrics
     */

    /**
     * Constructs a new Telemetry.
     * @memberof meshtastic
     * @classdesc Types of Measurements the telemetry module is equipped to handle
     * @implements ITelemetry
     * @constructor
     * @param {meshtastic.ITelemetry=} [properties] Properties to set
     */
    function Telemetry(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Seconds since 1970 - or 0 for unknown/unset
     * @member {number|null|undefined} time
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.time = null

    /**
     * Key native device metrics such as battery level
     * @member {meshtastic.IDeviceMetrics|null|undefined} deviceMetrics
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.deviceMetrics = null

    /**
     * Weather station or other environmental metrics
     * @member {meshtastic.IEnvironmentMetrics|null|undefined} environmentMetrics
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.environmentMetrics = null

    /**
     * Air quality metrics
     * @member {meshtastic.IAirQualityMetrics|null|undefined} airQualityMetrics
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.airQualityMetrics = null

    /**
     * Power Metrics
     * @member {meshtastic.IPowerMetrics|null|undefined} powerMetrics
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.powerMetrics = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Telemetry variant.
     * @member {"deviceMetrics"|"environmentMetrics"|"airQualityMetrics"|"powerMetrics"|undefined} variant
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Object.defineProperty(Telemetry.prototype, 'variant', {
      get: $util.oneOfGetter(($oneOfFields = ['deviceMetrics', 'environmentMetrics', 'airQualityMetrics', 'powerMetrics'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Decodes a Telemetry message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Telemetry
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Telemetry} Telemetry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Telemetry.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Telemetry()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.time = reader.fixed32()
            break
          }
          case 2: {
            message.deviceMetrics = $root.meshtastic.DeviceMetrics.decode(reader, reader.uint32())
            break
          }
          case 3: {
            message.environmentMetrics = $root.meshtastic.EnvironmentMetrics.decode(reader, reader.uint32())
            break
          }
          case 4: {
            message.airQualityMetrics = $root.meshtastic.AirQualityMetrics.decode(reader, reader.uint32())
            break
          }
          case 5: {
            message.powerMetrics = $root.meshtastic.PowerMetrics.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Telemetry
  })()

  /**
   * Supported I2C Sensors for telemetry in Meshtastic
   * @name meshtastic.TelemetrySensorType
   * @enum {number}
   * @property {number} SENSOR_UNSET=0 No external telemetry sensor explicitly set
   * @property {number} BME280=1 High accuracy temperature, pressure, humidity
   * @property {number} BME680=2 High accuracy temperature, pressure, humidity, and air resistance
   * @property {number} MCP9808=3 Very high accuracy temperature
   * @property {number} INA260=4 Moderate accuracy current and voltage
   * @property {number} INA219=5 Moderate accuracy current and voltage
   * @property {number} BMP280=6 High accuracy temperature and pressure
   * @property {number} SHTC3=7 High accuracy temperature and humidity
   * @property {number} LPS22=8 High accuracy pressure
   * @property {number} QMC6310=9 3-Axis magnetic sensor
   * @property {number} QMI8658=10 6-Axis inertial measurement sensor
   * @property {number} QMC5883L=11 3-Axis magnetic sensor
   * @property {number} SHT31=12 High accuracy temperature and humidity
   * @property {number} PMSA003I=13 PM2.5 air quality sensor
   * @property {number} INA3221=14 INA3221 3 Channel Voltage / Current Sensor
   * @property {number} BMP085=15 BMP085/BMP180 High accuracy temperature and pressure (older Version of BMP280)
   * @property {number} RCWL9620=16 RCWL-9620 Doppler Radar Distance Sensor, used for water level detection
   * @property {number} SHT4X=17 Sensirion High accuracy temperature and humidity
   * @property {number} VEML7700=18 VEML7700 high accuracy ambient light(Lux) digital 16-bit resolution sensor.
   * @property {number} MLX90632=19 MLX90632 non-contact IR temperature sensor.
   * @property {number} OPT3001=20 TI OPT3001 Ambient Light Sensor
   * @property {number} LTR390UV=21 Lite On LTR-390UV-01 UV Light Sensor
   * @property {number} TSL25911FN=22 AMS TSL25911FN RGB Light Sensor
   * @property {number} AHT10=23 AHT10 Integrated temperature and humidity sensor
   * @property {number} DFROBOT_LARK=24 DFRobot Lark Weather station (temperature, humidity, pressure, wind speed and direction)
   * @property {number} NAU7802=25 NAU7802 Scale Chip or compatible
   */
  meshtastic.TelemetrySensorType = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'SENSOR_UNSET')] = 0
    values[(valuesById[1] = 'BME280')] = 1
    values[(valuesById[2] = 'BME680')] = 2
    values[(valuesById[3] = 'MCP9808')] = 3
    values[(valuesById[4] = 'INA260')] = 4
    values[(valuesById[5] = 'INA219')] = 5
    values[(valuesById[6] = 'BMP280')] = 6
    values[(valuesById[7] = 'SHTC3')] = 7
    values[(valuesById[8] = 'LPS22')] = 8
    values[(valuesById[9] = 'QMC6310')] = 9
    values[(valuesById[10] = 'QMI8658')] = 10
    values[(valuesById[11] = 'QMC5883L')] = 11
    values[(valuesById[12] = 'SHT31')] = 12
    values[(valuesById[13] = 'PMSA003I')] = 13
    values[(valuesById[14] = 'INA3221')] = 14
    values[(valuesById[15] = 'BMP085')] = 15
    values[(valuesById[16] = 'RCWL9620')] = 16
    values[(valuesById[17] = 'SHT4X')] = 17
    values[(valuesById[18] = 'VEML7700')] = 18
    values[(valuesById[19] = 'MLX90632')] = 19
    values[(valuesById[20] = 'OPT3001')] = 20
    values[(valuesById[21] = 'LTR390UV')] = 21
    values[(valuesById[22] = 'TSL25911FN')] = 22
    values[(valuesById[23] = 'AHT10')] = 23
    values[(valuesById[24] = 'DFROBOT_LARK')] = 24
    values[(valuesById[25] = 'NAU7802')] = 25
    return values
  })()

  meshtastic.Nau7802Config = (function () {
    /**
     * Properties of a Nau7802Config.
     * @memberof meshtastic
     * @interface INau7802Config
     * @property {number|null} [zeroOffset] The offset setting for the NAU7802
     * @property {number|null} [calibrationFactor] The calibration factor for the NAU7802
     */

    /**
     * Constructs a new Nau7802Config.
     * @memberof meshtastic
     * @classdesc NAU7802 Telemetry configuration, for saving to flash
     * @implements INau7802Config
     * @constructor
     * @param {meshtastic.INau7802Config=} [properties] Properties to set
     */
    function Nau7802Config(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The offset setting for the NAU7802
     * @member {number|null|undefined} zeroOffset
     * @memberof meshtastic.Nau7802Config
     * @instance
     */
    Nau7802Config.prototype.zeroOffset = null

    /**
     * The calibration factor for the NAU7802
     * @member {number|null|undefined} calibrationFactor
     * @memberof meshtastic.Nau7802Config
     * @instance
     */
    Nau7802Config.prototype.calibrationFactor = null

    /**
     * Decodes a Nau7802Config message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Nau7802Config
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Nau7802Config} Nau7802Config
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Nau7802Config.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Nau7802Config()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.zeroOffset = reader.int32()
            break
          }
          case 2: {
            message.calibrationFactor = reader.float()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Nau7802Config
  })()

  meshtastic.XModem = (function () {
    /**
     * Properties of a XModem.
     * @memberof meshtastic
     * @interface IXModem
     * @property {meshtastic.XModem.Control|null} [control] XModem control
     * @property {number|null} [seq] XModem seq
     * @property {number|null} [crc16] XModem crc16
     * @property {Uint8Array|null} [buffer] XModem buffer
     */

    /**
     * Constructs a new XModem.
     * @memberof meshtastic
     * @classdesc Represents a XModem.
     * @implements IXModem
     * @constructor
     * @param {meshtastic.IXModem=} [properties] Properties to set
     */
    function XModem(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * XModem control.
     * @member {meshtastic.XModem.Control|null|undefined} control
     * @memberof meshtastic.XModem
     * @instance
     */
    XModem.prototype.control = null

    /**
     * XModem seq.
     * @member {number|null|undefined} seq
     * @memberof meshtastic.XModem
     * @instance
     */
    XModem.prototype.seq = null

    /**
     * XModem crc16.
     * @member {number|null|undefined} crc16
     * @memberof meshtastic.XModem
     * @instance
     */
    XModem.prototype.crc16 = null

    /**
     * XModem buffer.
     * @member {Uint8Array|null|undefined} buffer
     * @memberof meshtastic.XModem
     * @instance
     */
    XModem.prototype.buffer = null

    /**
     * Decodes a XModem message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.XModem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.XModem} XModem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    XModem.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.XModem()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.control = reader.int32()
            break
          }
          case 2: {
            message.seq = reader.uint32()
            break
          }
          case 3: {
            message.crc16 = reader.uint32()
            break
          }
          case 4: {
            message.buffer = reader.bytes()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Control enum.
     * @name meshtastic.XModem.Control
     * @enum {number}
     * @property {number} NUL=0 NUL value
     * @property {number} SOH=1 SOH value
     * @property {number} STX=2 STX value
     * @property {number} EOT=4 EOT value
     * @property {number} ACK=6 ACK value
     * @property {number} NAK=21 NAK value
     * @property {number} CAN=24 CAN value
     * @property {number} CTRLZ=26 CTRLZ value
     */
    XModem.Control = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'NUL')] = 0
      values[(valuesById[1] = 'SOH')] = 1
      values[(valuesById[2] = 'STX')] = 2
      values[(valuesById[4] = 'EOT')] = 4
      values[(valuesById[6] = 'ACK')] = 6
      values[(valuesById[21] = 'NAK')] = 21
      values[(valuesById[24] = 'CAN')] = 24
      values[(valuesById[26] = 'CTRLZ')] = 26
      return values
    })()

    return XModem
  })()

  return meshtastic
})())

export { $root as default }
