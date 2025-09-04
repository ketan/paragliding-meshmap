/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from 'protobufjs/minimal.js'

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
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
     * @member {string} channelId
     * @memberof meshtastic.ServiceEnvelope
     * @instance
     */
    ServiceEnvelope.prototype.channelId = ''

    /**
     * The sending gateway node ID. Can we use this to authenticate/prevent fake
     * nodeid impersonation for senders? - i.e. use gateway/mesh id (which is authenticated) + local node id as
     * the globally trusted nodenum
     * @member {string} gatewayId
     * @memberof meshtastic.ServiceEnvelope
     * @instance
     */
    ServiceEnvelope.prototype.gatewayId = ''

    /**
     * Encodes the specified ServiceEnvelope message. Does not implicitly {@link meshtastic.ServiceEnvelope.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ServiceEnvelope
     * @static
     * @param {meshtastic.IServiceEnvelope} message ServiceEnvelope message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServiceEnvelope.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.packet != null && Object.hasOwnProperty.call(message, 'packet'))
        $root.meshtastic.MeshPacket.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.channelId != null && Object.hasOwnProperty.call(message, 'channelId'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.channelId)
      if (message.gatewayId != null && Object.hasOwnProperty.call(message, 'gatewayId'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.gatewayId)
      return writer
    }

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
    ServiceEnvelope.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ServiceEnvelope()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @property {boolean|null} [hasOptedReportLocation] User has opted in to share their location (map report) with the mqtt server
     * Controlled by map_report.should_report_location
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
     * @member {string} longName
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.longName = ''

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     * @member {string} shortName
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.shortName = ''

    /**
     * Role of the node that applies specific settings for a particular use-case
     * @member {meshtastic.Config.DeviceConfig.Role} role
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.role = 0

    /**
     * Hardware model of the node, i.e. T-Beam, Heltec V3, etc...
     * @member {meshtastic.HardwareModel} hwModel
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.hwModel = 0

    /**
     * Device firmware version string
     * @member {string} firmwareVersion
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.firmwareVersion = ''

    /**
     * The region code for the radio (US, CN, EU433, etc...)
     * @member {meshtastic.Config.LoRaConfig.RegionCode} region
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.region = 0

    /**
     * Modem preset used by the radio (LongFast, MediumSlow, etc...)
     * @member {meshtastic.Config.LoRaConfig.ModemPreset} modemPreset
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.modemPreset = 0

    /**
     * Whether the node has a channel with default PSK and name (LongFast, MediumSlow, etc...)
     * and it uses the default frequency slot given the region and modem preset.
     * @member {boolean} hasDefaultChannel
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.hasDefaultChannel = false

    /**
     * Latitude: multiply by 1e-7 to get degrees in floating point
     * @member {number} latitudeI
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.latitudeI = 0

    /**
     * Longitude: multiply by 1e-7 to get degrees in floating point
     * @member {number} longitudeI
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.longitudeI = 0

    /**
     * Altitude in meters above MSL
     * @member {number} altitude
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.altitude = 0

    /**
     * Indicates the bits of precision for latitude and longitude set by the sending node
     * @member {number} positionPrecision
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.positionPrecision = 0

    /**
     * Number of online nodes (heard in the last 2 hours) this node has in its list that were received locally (not via MQTT)
     * @member {number} numOnlineLocalNodes
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.numOnlineLocalNodes = 0

    /**
     * User has opted in to share their location (map report) with the mqtt server
     * Controlled by map_report.should_report_location
     * @member {boolean} hasOptedReportLocation
     * @memberof meshtastic.MapReport
     * @instance
     */
    MapReport.prototype.hasOptedReportLocation = false

    /**
     * Encodes the specified MapReport message. Does not implicitly {@link meshtastic.MapReport.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.MapReport
     * @static
     * @param {meshtastic.IMapReport} message MapReport message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MapReport.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.longName != null && Object.hasOwnProperty.call(message, 'longName'))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.longName)
      if (message.shortName != null && Object.hasOwnProperty.call(message, 'shortName'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.shortName)
      if (message.role != null && Object.hasOwnProperty.call(message, 'role')) writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.role)
      if (message.hwModel != null && Object.hasOwnProperty.call(message, 'hwModel'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.hwModel)
      if (message.firmwareVersion != null && Object.hasOwnProperty.call(message, 'firmwareVersion'))
        writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.firmwareVersion)
      if (message.region != null && Object.hasOwnProperty.call(message, 'region'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).int32(message.region)
      if (message.modemPreset != null && Object.hasOwnProperty.call(message, 'modemPreset'))
        writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.modemPreset)
      if (message.hasDefaultChannel != null && Object.hasOwnProperty.call(message, 'hasDefaultChannel'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.hasDefaultChannel)
      if (message.latitudeI != null && Object.hasOwnProperty.call(message, 'latitudeI'))
        writer.uint32(/* id 9, wireType 5 =*/ 77).sfixed32(message.latitudeI)
      if (message.longitudeI != null && Object.hasOwnProperty.call(message, 'longitudeI'))
        writer.uint32(/* id 10, wireType 5 =*/ 85).sfixed32(message.longitudeI)
      if (message.altitude != null && Object.hasOwnProperty.call(message, 'altitude'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).int32(message.altitude)
      if (message.positionPrecision != null && Object.hasOwnProperty.call(message, 'positionPrecision'))
        writer.uint32(/* id 12, wireType 0 =*/ 96).uint32(message.positionPrecision)
      if (message.numOnlineLocalNodes != null && Object.hasOwnProperty.call(message, 'numOnlineLocalNodes'))
        writer.uint32(/* id 13, wireType 0 =*/ 104).uint32(message.numOnlineLocalNodes)
      if (message.hasOptedReportLocation != null && Object.hasOwnProperty.call(message, 'hasOptedReportLocation'))
        writer.uint32(/* id 14, wireType 0 =*/ 112).bool(message.hasOptedReportLocation)
      return writer
    }

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
    MapReport.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.MapReport()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 14: {
            message.hasOptedReportLocation = reader.bool()
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
     * @property {meshtastic.Config.ISecurityConfig|null} [security] Config security
     * @property {meshtastic.Config.ISessionkeyConfig|null} [sessionkey] Config sessionkey
     * @property {meshtastic.IDeviceUIConfig|null} [deviceUi] Config deviceUi
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

    /**
     * Config security.
     * @member {meshtastic.Config.ISecurityConfig|null|undefined} security
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.security = null

    /**
     * Config sessionkey.
     * @member {meshtastic.Config.ISessionkeyConfig|null|undefined} sessionkey
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.sessionkey = null

    /**
     * Config deviceUi.
     * @member {meshtastic.IDeviceUIConfig|null|undefined} deviceUi
     * @memberof meshtastic.Config
     * @instance
     */
    Config.prototype.deviceUi = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Payload Variant
     * @member {"device"|"position"|"power"|"network"|"display"|"lora"|"bluetooth"|"security"|"sessionkey"|"deviceUi"|undefined} payloadVariant
     * @memberof meshtastic.Config
     * @instance
     */
    Object.defineProperty(Config.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(
        ($oneOfFields = ['device', 'position', 'power', 'network', 'display', 'lora', 'bluetooth', 'security', 'sessionkey', 'deviceUi'])
      ),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified Config message. Does not implicitly {@link meshtastic.Config.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Config
     * @static
     * @param {meshtastic.IConfig} message Config message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Config.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.device != null && Object.hasOwnProperty.call(message, 'device'))
        $root.meshtastic.Config.DeviceConfig.encode(message.device, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.position != null && Object.hasOwnProperty.call(message, 'position'))
        $root.meshtastic.Config.PositionConfig.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.power != null && Object.hasOwnProperty.call(message, 'power'))
        $root.meshtastic.Config.PowerConfig.encode(message.power, writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim()
      if (message.network != null && Object.hasOwnProperty.call(message, 'network'))
        $root.meshtastic.Config.NetworkConfig.encode(message.network, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
      if (message.display != null && Object.hasOwnProperty.call(message, 'display'))
        $root.meshtastic.Config.DisplayConfig.encode(message.display, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim()
      if (message.lora != null && Object.hasOwnProperty.call(message, 'lora'))
        $root.meshtastic.Config.LoRaConfig.encode(message.lora, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim()
      if (message.bluetooth != null && Object.hasOwnProperty.call(message, 'bluetooth'))
        $root.meshtastic.Config.BluetoothConfig.encode(message.bluetooth, writer.uint32(/* id 7, wireType 2 =*/ 58).fork()).ldelim()
      if (message.security != null && Object.hasOwnProperty.call(message, 'security'))
        $root.meshtastic.Config.SecurityConfig.encode(message.security, writer.uint32(/* id 8, wireType 2 =*/ 66).fork()).ldelim()
      if (message.sessionkey != null && Object.hasOwnProperty.call(message, 'sessionkey'))
        $root.meshtastic.Config.SessionkeyConfig.encode(message.sessionkey, writer.uint32(/* id 9, wireType 2 =*/ 74).fork()).ldelim()
      if (message.deviceUi != null && Object.hasOwnProperty.call(message, 'deviceUi'))
        $root.meshtastic.DeviceUIConfig.encode(message.deviceUi, writer.uint32(/* id 10, wireType 2 =*/ 82).fork()).ldelim()
      return writer
    }

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
    Config.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Config()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 8: {
            message.security = $root.meshtastic.Config.SecurityConfig.decode(reader, reader.uint32())
            break
          }
          case 9: {
            message.sessionkey = $root.meshtastic.Config.SessionkeyConfig.decode(reader, reader.uint32())
            break
          }
          case 10: {
            message.deviceUi = $root.meshtastic.DeviceUIConfig.decode(reader, reader.uint32())
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
       * Moved to SecurityConfig
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
       * Moved to SecurityConfig
       * @property {boolean|null} [disableTripleClick] Disables the triple-press of user button to enable or disable GPS
       * @property {string|null} [tzdef] POSIX Timezone definition string from https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv.
       * @property {boolean|null} [ledHeartbeatDisabled] If true, disable the default blinking LED (LED_PIN) behavior on the device
       * @property {meshtastic.Config.DeviceConfig.BuzzerMode|null} [buzzerMode] Controls buzzer behavior for audio feedback
       * Defaults to ENABLED
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
       * @member {meshtastic.Config.DeviceConfig.Role} role
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.role = 0

      /**
       * Disabling this will disable the SerialConsole by not initilizing the StreamAPI
       * Moved to SecurityConfig
       * @member {boolean} serialEnabled
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.serialEnabled = false

      /**
       * For boards without a hard wired button, this is the pin number that will be used
       * Boards that have more than one button can swap the function with this one. defaults to BUTTON_PIN if defined.
       * @member {number} buttonGpio
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.buttonGpio = 0

      /**
       * For boards without a PWM buzzer, this is the pin number that will be used
       * Defaults to PIN_BUZZER if defined.
       * @member {number} buzzerGpio
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.buzzerGpio = 0

      /**
       * Sets the role of node
       * @member {meshtastic.Config.DeviceConfig.RebroadcastMode} rebroadcastMode
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.rebroadcastMode = 0

      /**
       * Send our nodeinfo this often
       * Defaults to 900 Seconds (15 minutes)
       * @member {number} nodeInfoBroadcastSecs
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.nodeInfoBroadcastSecs = 0

      /**
       * Treat double tap interrupt on supported accelerometers as a button press if set to true
       * @member {boolean} doubleTapAsButtonPress
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.doubleTapAsButtonPress = false

      /**
       * If true, device is considered to be "managed" by a mesh administrator
       * Clients should then limit available configuration and administrative options inside the user interface
       * Moved to SecurityConfig
       * @member {boolean} isManaged
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.isManaged = false

      /**
       * Disables the triple-press of user button to enable or disable GPS
       * @member {boolean} disableTripleClick
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.disableTripleClick = false

      /**
       * POSIX Timezone definition string from https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv.
       * @member {string} tzdef
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.tzdef = ''

      /**
       * If true, disable the default blinking LED (LED_PIN) behavior on the device
       * @member {boolean} ledHeartbeatDisabled
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.ledHeartbeatDisabled = false

      /**
       * Controls buzzer behavior for audio feedback
       * Defaults to ENABLED
       * @member {meshtastic.Config.DeviceConfig.BuzzerMode} buzzerMode
       * @memberof meshtastic.Config.DeviceConfig
       * @instance
       */
      DeviceConfig.prototype.buzzerMode = 0

      /**
       * Encodes the specified DeviceConfig message. Does not implicitly {@link meshtastic.Config.DeviceConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.DeviceConfig
       * @static
       * @param {meshtastic.Config.IDeviceConfig} message DeviceConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      DeviceConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.role != null && Object.hasOwnProperty.call(message, 'role'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.role)
        if (message.serialEnabled != null && Object.hasOwnProperty.call(message, 'serialEnabled'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.serialEnabled)
        if (message.buttonGpio != null && Object.hasOwnProperty.call(message, 'buttonGpio'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.buttonGpio)
        if (message.buzzerGpio != null && Object.hasOwnProperty.call(message, 'buzzerGpio'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.buzzerGpio)
        if (message.rebroadcastMode != null && Object.hasOwnProperty.call(message, 'rebroadcastMode'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).int32(message.rebroadcastMode)
        if (message.nodeInfoBroadcastSecs != null && Object.hasOwnProperty.call(message, 'nodeInfoBroadcastSecs'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.nodeInfoBroadcastSecs)
        if (message.doubleTapAsButtonPress != null && Object.hasOwnProperty.call(message, 'doubleTapAsButtonPress'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.doubleTapAsButtonPress)
        if (message.isManaged != null && Object.hasOwnProperty.call(message, 'isManaged'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.isManaged)
        if (message.disableTripleClick != null && Object.hasOwnProperty.call(message, 'disableTripleClick'))
          writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.disableTripleClick)
        if (message.tzdef != null && Object.hasOwnProperty.call(message, 'tzdef'))
          writer.uint32(/* id 11, wireType 2 =*/ 90).string(message.tzdef)
        if (message.ledHeartbeatDisabled != null && Object.hasOwnProperty.call(message, 'ledHeartbeatDisabled'))
          writer.uint32(/* id 12, wireType 0 =*/ 96).bool(message.ledHeartbeatDisabled)
        if (message.buzzerMode != null && Object.hasOwnProperty.call(message, 'buzzerMode'))
          writer.uint32(/* id 13, wireType 0 =*/ 104).int32(message.buzzerMode)
        return writer
      }

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
      DeviceConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.DeviceConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
          switch (tag >>> 3) {
            case 1: {
              message.role = reader.int32()
              break
            }
            case 2: {
              message.serialEnabled = reader.bool()
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
            case 13: {
              message.buzzerMode = reader.int32()
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
       * @property {number} ROUTER_LATE=11 Description: Will always rebroadcast packets, but will do so after all other modes.
       * Technical Details: Used for router nodes that are intended to provide additional coverage
       * in areas not already covered by other routers, or to bridge around problematic terrain,
       * but should not be given priority over other routers in order to avoid unnecessaraily
       * consuming hops.
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
        values[(valuesById[11] = 'ROUTER_LATE')] = 11
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
       * @property {number} NONE=4 Only permitted for SENSOR, TRACKER and TAK_TRACKER roles, this will inhibit all rebroadcasts, not unlike CLIENT_MUTE role.
       * @property {number} CORE_PORTNUMS_ONLY=5 Ignores packets from non-standard portnums such as: TAK, RangeTest, PaxCounter, etc.
       * Only rebroadcasts packets with standard portnums: NodeInfo, Text, Position, Telemetry, and Routing.
       */
      DeviceConfig.RebroadcastMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'ALL')] = 0
        values[(valuesById[1] = 'ALL_SKIP_DECODING')] = 1
        values[(valuesById[2] = 'LOCAL_ONLY')] = 2
        values[(valuesById[3] = 'KNOWN_ONLY')] = 3
        values[(valuesById[4] = 'NONE')] = 4
        values[(valuesById[5] = 'CORE_PORTNUMS_ONLY')] = 5
        return values
      })()

      /**
       * Defines buzzer behavior for audio feedback
       * @name meshtastic.Config.DeviceConfig.BuzzerMode
       * @enum {number}
       * @property {number} ALL_ENABLED=0 Default behavior.
       * Buzzer is enabled for all audio feedback including button presses and alerts.
       * @property {number} DISABLED=1 Disabled.
       * All buzzer audio feedback is disabled.
       * @property {number} NOTIFICATIONS_ONLY=2 Notifications Only.
       * Buzzer is enabled only for notifications and alerts, but not for button presses.
       * External notification config determines the specifics of the notification behavior.
       * @property {number} SYSTEM_ONLY=3 Non-notification system buzzer tones only.
       * Buzzer is enabled only for non-notification tones such as button presses, startup, shutdown, but not for alerts.
       * @property {number} DIRECT_MSG_ONLY=4 Direct Message notifications only.
       * Buzzer is enabled only for direct messages and alerts, but not for button presses.
       * External notification config determines the specifics of the notification behavior.
       */
      DeviceConfig.BuzzerMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'ALL_ENABLED')] = 0
        values[(valuesById[1] = 'DISABLED')] = 1
        values[(valuesById[2] = 'NOTIFICATIONS_ONLY')] = 2
        values[(valuesById[3] = 'SYSTEM_ONLY')] = 3
        values[(valuesById[4] = 'DIRECT_MSG_ONLY')] = 4
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
       * @member {number} positionBroadcastSecs
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.positionBroadcastSecs = 0

      /**
       * Adaptive position braoadcast, which is now the default.
       * @member {boolean} positionBroadcastSmartEnabled
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.positionBroadcastSmartEnabled = false

      /**
       * If set, this node is at a fixed position.
       * We will generate GPS position updates at the regular interval, but use whatever the last lat/lon/alt we have for the node.
       * The lat/lon/alt can be set by an internal GPS or with the help of the app.
       * @member {boolean} fixedPosition
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.fixedPosition = false

      /**
       * Is GPS enabled for this node?
       * @member {boolean} gpsEnabled
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsEnabled = false

      /**
       * How often should we try to get GPS position (in seconds)
       * or zero for the default of once every 30 seconds
       * or a very large value (maxint) to update only once at boot.
       * @member {number} gpsUpdateInterval
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsUpdateInterval = 0

      /**
       * Deprecated in favor of using smart / regular broadcast intervals as implicit attempt time
       * @member {number} gpsAttemptTime
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsAttemptTime = 0

      /**
       * Bit field of boolean configuration options for POSITION messages
       * (bitwise OR of PositionFlags)
       * @member {number} positionFlags
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.positionFlags = 0

      /**
       * (Re)define GPS_RX_PIN for your board.
       * @member {number} rxGpio
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.rxGpio = 0

      /**
       * (Re)define GPS_TX_PIN for your board.
       * @member {number} txGpio
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.txGpio = 0

      /**
       * The minimum distance in meters traveled (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled
       * @member {number} broadcastSmartMinimumDistance
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.broadcastSmartMinimumDistance = 0

      /**
       * The minimum number of seconds (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled
       * @member {number} broadcastSmartMinimumIntervalSecs
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.broadcastSmartMinimumIntervalSecs = 0

      /**
       * (Re)define PIN_GPS_EN for your board.
       * @member {number} gpsEnGpio
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsEnGpio = 0

      /**
       * Set where GPS is enabled, disabled, or not present
       * @member {meshtastic.Config.PositionConfig.GpsMode} gpsMode
       * @memberof meshtastic.Config.PositionConfig
       * @instance
       */
      PositionConfig.prototype.gpsMode = 0

      /**
       * Encodes the specified PositionConfig message. Does not implicitly {@link meshtastic.Config.PositionConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.PositionConfig
       * @static
       * @param {meshtastic.Config.IPositionConfig} message PositionConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      PositionConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.positionBroadcastSecs != null && Object.hasOwnProperty.call(message, 'positionBroadcastSecs'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.positionBroadcastSecs)
        if (message.positionBroadcastSmartEnabled != null && Object.hasOwnProperty.call(message, 'positionBroadcastSmartEnabled'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.positionBroadcastSmartEnabled)
        if (message.fixedPosition != null && Object.hasOwnProperty.call(message, 'fixedPosition'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.fixedPosition)
        if (message.gpsEnabled != null && Object.hasOwnProperty.call(message, 'gpsEnabled'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.gpsEnabled)
        if (message.gpsUpdateInterval != null && Object.hasOwnProperty.call(message, 'gpsUpdateInterval'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.gpsUpdateInterval)
        if (message.gpsAttemptTime != null && Object.hasOwnProperty.call(message, 'gpsAttemptTime'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.gpsAttemptTime)
        if (message.positionFlags != null && Object.hasOwnProperty.call(message, 'positionFlags'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.positionFlags)
        if (message.rxGpio != null && Object.hasOwnProperty.call(message, 'rxGpio'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.rxGpio)
        if (message.txGpio != null && Object.hasOwnProperty.call(message, 'txGpio'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.txGpio)
        if (message.broadcastSmartMinimumDistance != null && Object.hasOwnProperty.call(message, 'broadcastSmartMinimumDistance'))
          writer.uint32(/* id 10, wireType 0 =*/ 80).uint32(message.broadcastSmartMinimumDistance)
        if (message.broadcastSmartMinimumIntervalSecs != null && Object.hasOwnProperty.call(message, 'broadcastSmartMinimumIntervalSecs'))
          writer.uint32(/* id 11, wireType 0 =*/ 88).uint32(message.broadcastSmartMinimumIntervalSecs)
        if (message.gpsEnGpio != null && Object.hasOwnProperty.call(message, 'gpsEnGpio'))
          writer.uint32(/* id 12, wireType 0 =*/ 96).uint32(message.gpsEnGpio)
        if (message.gpsMode != null && Object.hasOwnProperty.call(message, 'gpsMode'))
          writer.uint32(/* id 13, wireType 0 =*/ 104).int32(message.gpsMode)
        return writer
      }

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
      PositionConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.PositionConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @member {boolean} isPowerSaving
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.isPowerSaving = false

      /**
       * Description: If non-zero, the device will fully power off this many seconds after external power is removed.
       * @member {number} onBatteryShutdownAfterSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.onBatteryShutdownAfterSecs = 0

      /**
       * Ratio of voltage divider for battery pin eg. 3.20 (R1=100k, R2=220k)
       * Overrides the ADC_MULTIPLIER defined in variant for battery voltage calculation.
       * https://meshtastic.org/docs/configuration/radio/power/#adc-multiplier-override
       * Should be set to floating point value between 2 and 6
       * @member {number} adcMultiplierOverride
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.adcMultiplierOverride = 0

      /**
       * Description: The number of seconds for to wait before turning off BLE in No Bluetooth states
       * Technical Details: ESP32 Only 0 for default of 1 minute
       * @member {number} waitBluetoothSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.waitBluetoothSecs = 0

      /**
       * Super Deep Sleep Seconds
       * While in Light Sleep if mesh_sds_timeout_secs is exceeded we will lower into super deep sleep
       * for this value (default 1 year) or a button press
       * 0 for default of one year
       * @member {number} sdsSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.sdsSecs = 0

      /**
       * Description: In light sleep the CPU is suspended, LoRa radio is on, BLE is off an GPS is on
       * Technical Details: ESP32 Only 0 for default of 300
       * @member {number} lsSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.lsSecs = 0

      /**
       * Description: While in light sleep when we receive packets on the LoRa radio we will wake and handle them and stay awake in no BLE mode for this value
       * Technical Details: ESP32 Only 0 for default of 10 seconds
       * @member {number} minWakeSecs
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.minWakeSecs = 0

      /**
       * I2C address of INA_2XX to use for reading device battery voltage
       * @member {number} deviceBatteryInaAddress
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.deviceBatteryInaAddress = 0

      /**
       * If non-zero, we want powermon log outputs.  With the particular (bitfield) sources enabled.
       * Note: we picked an ID of 32 so that lower more efficient IDs can be used for more frequently used options.
       * @member {number|Long} powermonEnables
       * @memberof meshtastic.Config.PowerConfig
       * @instance
       */
      PowerConfig.prototype.powermonEnables = $util.Long ? $util.Long.fromBits(0, 0, true) : 0

      /**
       * Encodes the specified PowerConfig message. Does not implicitly {@link meshtastic.Config.PowerConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.PowerConfig
       * @static
       * @param {meshtastic.Config.IPowerConfig} message PowerConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      PowerConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.isPowerSaving != null && Object.hasOwnProperty.call(message, 'isPowerSaving'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.isPowerSaving)
        if (message.onBatteryShutdownAfterSecs != null && Object.hasOwnProperty.call(message, 'onBatteryShutdownAfterSecs'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.onBatteryShutdownAfterSecs)
        if (message.adcMultiplierOverride != null && Object.hasOwnProperty.call(message, 'adcMultiplierOverride'))
          writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.adcMultiplierOverride)
        if (message.waitBluetoothSecs != null && Object.hasOwnProperty.call(message, 'waitBluetoothSecs'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.waitBluetoothSecs)
        if (message.sdsSecs != null && Object.hasOwnProperty.call(message, 'sdsSecs'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.sdsSecs)
        if (message.lsSecs != null && Object.hasOwnProperty.call(message, 'lsSecs'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.lsSecs)
        if (message.minWakeSecs != null && Object.hasOwnProperty.call(message, 'minWakeSecs'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.minWakeSecs)
        if (message.deviceBatteryInaAddress != null && Object.hasOwnProperty.call(message, 'deviceBatteryInaAddress'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.deviceBatteryInaAddress)
        if (message.powermonEnables != null && Object.hasOwnProperty.call(message, 'powermonEnables'))
          writer.uint32(/* id 32, wireType 0 =*/ 256).uint64(message.powermonEnables)
        return writer
      }

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
      PowerConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.PowerConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @property {string|null} [ntpServer] NTP server to use if WiFi is conneced, defaults to `meshtastic.pool.ntp.org`
       * @property {boolean|null} [ethEnabled] Enable Ethernet
       * @property {meshtastic.Config.NetworkConfig.AddressMode|null} [addressMode] acquire an address via DHCP or assign static
       * @property {meshtastic.Config.NetworkConfig.IIpV4Config|null} [ipv4Config] struct to keep static address
       * @property {string|null} [rsyslogServer] rsyslog Server and Port
       * @property {number|null} [enabledProtocols] Flags for enabling/disabling network protocols
       * @property {boolean|null} [ipv6Enabled] Enable/Disable ipv6 support
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
       * @member {boolean} wifiEnabled
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.wifiEnabled = false

      /**
       * If set, this node will try to join the specified wifi network and
       * acquire an address via DHCP
       * @member {string} wifiSsid
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.wifiSsid = ''

      /**
       * If set, will be use to authenticate to the named wifi
       * @member {string} wifiPsk
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.wifiPsk = ''

      /**
       * NTP server to use if WiFi is conneced, defaults to `meshtastic.pool.ntp.org`
       * @member {string} ntpServer
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.ntpServer = ''

      /**
       * Enable Ethernet
       * @member {boolean} ethEnabled
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.ethEnabled = false

      /**
       * acquire an address via DHCP or assign static
       * @member {meshtastic.Config.NetworkConfig.AddressMode} addressMode
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.addressMode = 0

      /**
       * struct to keep static address
       * @member {meshtastic.Config.NetworkConfig.IIpV4Config|null|undefined} ipv4Config
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.ipv4Config = null

      /**
       * rsyslog Server and Port
       * @member {string} rsyslogServer
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.rsyslogServer = ''

      /**
       * Flags for enabling/disabling network protocols
       * @member {number} enabledProtocols
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.enabledProtocols = 0

      /**
       * Enable/Disable ipv6 support
       * @member {boolean} ipv6Enabled
       * @memberof meshtastic.Config.NetworkConfig
       * @instance
       */
      NetworkConfig.prototype.ipv6Enabled = false

      /**
       * Encodes the specified NetworkConfig message. Does not implicitly {@link meshtastic.Config.NetworkConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.NetworkConfig
       * @static
       * @param {meshtastic.Config.INetworkConfig} message NetworkConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      NetworkConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.wifiEnabled != null && Object.hasOwnProperty.call(message, 'wifiEnabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.wifiEnabled)
        if (message.wifiSsid != null && Object.hasOwnProperty.call(message, 'wifiSsid'))
          writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.wifiSsid)
        if (message.wifiPsk != null && Object.hasOwnProperty.call(message, 'wifiPsk'))
          writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.wifiPsk)
        if (message.ntpServer != null && Object.hasOwnProperty.call(message, 'ntpServer'))
          writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.ntpServer)
        if (message.ethEnabled != null && Object.hasOwnProperty.call(message, 'ethEnabled'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.ethEnabled)
        if (message.addressMode != null && Object.hasOwnProperty.call(message, 'addressMode'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.addressMode)
        if (message.ipv4Config != null && Object.hasOwnProperty.call(message, 'ipv4Config'))
          $root.meshtastic.Config.NetworkConfig.IpV4Config.encode(
            message.ipv4Config,
            writer.uint32(/* id 8, wireType 2 =*/ 66).fork()
          ).ldelim()
        if (message.rsyslogServer != null && Object.hasOwnProperty.call(message, 'rsyslogServer'))
          writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.rsyslogServer)
        if (message.enabledProtocols != null && Object.hasOwnProperty.call(message, 'enabledProtocols'))
          writer.uint32(/* id 10, wireType 0 =*/ 80).uint32(message.enabledProtocols)
        if (message.ipv6Enabled != null && Object.hasOwnProperty.call(message, 'ipv6Enabled'))
          writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.ipv6Enabled)
        return writer
      }

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
      NetworkConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.NetworkConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
            case 10: {
              message.enabledProtocols = reader.uint32()
              break
            }
            case 11: {
              message.ipv6Enabled = reader.bool()
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
         * @member {number} ip
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @instance
         */
        IpV4Config.prototype.ip = 0

        /**
         * Static gateway address
         * @member {number} gateway
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @instance
         */
        IpV4Config.prototype.gateway = 0

        /**
         * Static subnet mask
         * @member {number} subnet
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @instance
         */
        IpV4Config.prototype.subnet = 0

        /**
         * Static DNS server address
         * @member {number} dns
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @instance
         */
        IpV4Config.prototype.dns = 0

        /**
         * Encodes the specified IpV4Config message. Does not implicitly {@link meshtastic.Config.NetworkConfig.IpV4Config.verify|verify} messages.
         * @function encode
         * @memberof meshtastic.Config.NetworkConfig.IpV4Config
         * @static
         * @param {meshtastic.Config.NetworkConfig.IIpV4Config} message IpV4Config message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IpV4Config.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create()
          if (message.ip != null && Object.hasOwnProperty.call(message, 'ip')) writer.uint32(/* id 1, wireType 5 =*/ 13).fixed32(message.ip)
          if (message.gateway != null && Object.hasOwnProperty.call(message, 'gateway'))
            writer.uint32(/* id 2, wireType 5 =*/ 21).fixed32(message.gateway)
          if (message.subnet != null && Object.hasOwnProperty.call(message, 'subnet'))
            writer.uint32(/* id 3, wireType 5 =*/ 29).fixed32(message.subnet)
          if (message.dns != null && Object.hasOwnProperty.call(message, 'dns'))
            writer.uint32(/* id 4, wireType 5 =*/ 37).fixed32(message.dns)
          return writer
        }

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
        IpV4Config.decode = function decode(reader, length, error) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.meshtastic.Config.NetworkConfig.IpV4Config()
          while (reader.pos < end) {
            let tag = reader.uint32()
            if (tag === error) break
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

      /**
       * Available flags auxiliary network protocols
       * @name meshtastic.Config.NetworkConfig.ProtocolFlags
       * @enum {number}
       * @property {number} NO_BROADCAST=0 Do not broadcast packets over any network protocol
       * @property {number} UDP_BROADCAST=1 Enable broadcasting packets via UDP over the local network
       */
      NetworkConfig.ProtocolFlags = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'NO_BROADCAST')] = 0
        values[(valuesById[1] = 'UDP_BROADCAST')] = 1
        return values
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
       * @property {meshtastic.Config.DisplayConfig.GpsCoordinateFormat|null} [gpsFormat] Deprecated in 2.7.4: Unused
       * How the GPS coordinates are formatted on the OLED screen.
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
       * @property {boolean|null} [use_12hClock] If false (default), the device will display the time in 24-hour format on screen.
       * If true, the device will display the time in 12-hour format on screen.
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
       * @member {number} screenOnSecs
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.screenOnSecs = 0

      /**
       * Deprecated in 2.7.4: Unused
       * How the GPS coordinates are formatted on the OLED screen.
       * @member {meshtastic.Config.DisplayConfig.GpsCoordinateFormat} gpsFormat
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.gpsFormat = 0

      /**
       * Automatically toggles to the next page on the screen like a carousel, based the specified interval in seconds.
       * Potentially useful for devices without user buttons.
       * @member {number} autoScreenCarouselSecs
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.autoScreenCarouselSecs = 0

      /**
       * If this is set, the displayed compass will always point north. if unset, the old behaviour
       * (top of display is heading direction) is used.
       * @member {boolean} compassNorthTop
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.compassNorthTop = false

      /**
       * Flip screen vertically, for cases that mount the screen upside down
       * @member {boolean} flipScreen
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.flipScreen = false

      /**
       * Perferred display units
       * @member {meshtastic.Config.DisplayConfig.DisplayUnits} units
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.units = 0

      /**
       * Override auto-detect in screen
       * @member {meshtastic.Config.DisplayConfig.OledType} oled
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.oled = 0

      /**
       * Display Mode
       * @member {meshtastic.Config.DisplayConfig.DisplayMode} displaymode
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.displaymode = 0

      /**
       * Print first line in pseudo-bold? FALSE is original style, TRUE is bold
       * @member {boolean} headingBold
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.headingBold = false

      /**
       * Should we wake the screen up on accelerometer detected motion or tap
       * @member {boolean} wakeOnTapOrMotion
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.wakeOnTapOrMotion = false

      /**
       * Indicates how to rotate or invert the compass output to accurate display on the display.
       * @member {meshtastic.Config.DisplayConfig.CompassOrientation} compassOrientation
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.compassOrientation = 0

      /**
       * If false (default), the device will display the time in 24-hour format on screen.
       * If true, the device will display the time in 12-hour format on screen.
       * @member {boolean} use_12hClock
       * @memberof meshtastic.Config.DisplayConfig
       * @instance
       */
      DisplayConfig.prototype.use_12hClock = false

      /**
       * Encodes the specified DisplayConfig message. Does not implicitly {@link meshtastic.Config.DisplayConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.DisplayConfig
       * @static
       * @param {meshtastic.Config.IDisplayConfig} message DisplayConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      DisplayConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.screenOnSecs != null && Object.hasOwnProperty.call(message, 'screenOnSecs'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.screenOnSecs)
        if (message.gpsFormat != null && Object.hasOwnProperty.call(message, 'gpsFormat'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.gpsFormat)
        if (message.autoScreenCarouselSecs != null && Object.hasOwnProperty.call(message, 'autoScreenCarouselSecs'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.autoScreenCarouselSecs)
        if (message.compassNorthTop != null && Object.hasOwnProperty.call(message, 'compassNorthTop'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.compassNorthTop)
        if (message.flipScreen != null && Object.hasOwnProperty.call(message, 'flipScreen'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.flipScreen)
        if (message.units != null && Object.hasOwnProperty.call(message, 'units'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).int32(message.units)
        if (message.oled != null && Object.hasOwnProperty.call(message, 'oled'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.oled)
        if (message.displaymode != null && Object.hasOwnProperty.call(message, 'displaymode'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).int32(message.displaymode)
        if (message.headingBold != null && Object.hasOwnProperty.call(message, 'headingBold'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.headingBold)
        if (message.wakeOnTapOrMotion != null && Object.hasOwnProperty.call(message, 'wakeOnTapOrMotion'))
          writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.wakeOnTapOrMotion)
        if (message.compassOrientation != null && Object.hasOwnProperty.call(message, 'compassOrientation'))
          writer.uint32(/* id 11, wireType 0 =*/ 88).int32(message.compassOrientation)
        if (message.use_12hClock != null && Object.hasOwnProperty.call(message, 'use_12hClock'))
          writer.uint32(/* id 12, wireType 0 =*/ 96).bool(message.use_12hClock)
        return writer
      }

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
      DisplayConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.DisplayConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
            case 12: {
              message.use_12hClock = reader.bool()
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
       * @property {number} OLED_AUTO=0 Default / Autodetect
       * @property {number} OLED_SSD1306=1 Default / Autodetect
       * @property {number} OLED_SH1106=2 Default / Autodetect
       * @property {number} OLED_SH1107=3 Can not be auto detected but set by proto. Used for 128x64 screens
       * @property {number} OLED_SH1107_128_128=4 Can not be auto detected but set by proto. Used for 128x128 screens
       */
      DisplayConfig.OledType = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'OLED_AUTO')] = 0
        values[(valuesById[1] = 'OLED_SSD1306')] = 1
        values[(valuesById[2] = 'OLED_SH1106')] = 2
        values[(valuesById[3] = 'OLED_SH1107')] = 3
        values[(valuesById[4] = 'OLED_SH1107_128_128')] = 4
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
       * @property {boolean|null} [configOkToMqtt] Sets the ok_to_mqtt bit on outgoing packets
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
       * @member {boolean} usePreset
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.usePreset = false

      /**
       * Either modem_config or bandwidth/spreading/coding will be specified - NOT BOTH.
       * As a heuristic: If bandwidth is specified, do not use modem_config.
       * Because protobufs take ZERO space when the value is zero this works out nicely.
       * This value is replaced by bandwidth/spread_factor/coding_rate.
       * If you'd like to experiment with other options add them to MeshRadio.cpp in the device code.
       * @member {meshtastic.Config.LoRaConfig.ModemPreset} modemPreset
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.modemPreset = 0

      /**
       * Bandwidth in MHz
       * Certain bandwidth numbers are 'special' and will be converted to the
       * appropriate floating point value: 31 -> 31.25MHz
       * @member {number} bandwidth
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.bandwidth = 0

      /**
       * A number from 7 to 12.
       * Indicates number of chirps per symbol as 1<<spread_factor.
       * @member {number} spreadFactor
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.spreadFactor = 0

      /**
       * The denominator of the coding rate.
       * ie for 4/5, the value is 5. 4/8 the value is 8.
       * @member {number} codingRate
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.codingRate = 0

      /**
       * This parameter is for advanced users with advanced test equipment, we do not recommend most users use it.
       * A frequency offset that is added to to the calculated band center frequency.
       * Used to correct for crystal calibration errors.
       * @member {number} frequencyOffset
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.frequencyOffset = 0

      /**
       * The region code for the radio (US, CN, EU433, etc...)
       * @member {meshtastic.Config.LoRaConfig.RegionCode} region
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.region = 0

      /**
       * Maximum number of hops. This can't be greater than 7.
       * Default of 3
       * Attempting to set a value > 7 results in the default
       * @member {number} hopLimit
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.hopLimit = 0

      /**
       * Disable TX from the LoRa radio. Useful for hot-swapping antennas and other tests.
       * Defaults to false
       * @member {boolean} txEnabled
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.txEnabled = false

      /**
       * If zero, then use default max legal continuous power (ie. something that won't
       * burn out the radio hardware)
       * In most cases you should use zero here.
       * Units are in dBm.
       * @member {number} txPower
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.txPower = 0

      /**
       * This controls the actual hardware frequency the radio transmits on.
       * Most users should never need to be exposed to this field/concept.
       * A channel number between 1 and NUM_CHANNELS (whatever the max is in the current region).
       * If ZERO then the rule is "use the old channel name hash based
       * algorithm to derive the channel number")
       * If using the hash algorithm the channel number will be: hash(channel_name) %
       * NUM_CHANNELS (Where num channels depends on the regulatory region).
       * @member {number} channelNum
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.channelNum = 0

      /**
       * If true, duty cycle limits will be exceeded and thus you're possibly not following
       * the local regulations if you're not a HAM.
       * Has no effect if the duty cycle of the used region is 100%.
       * @member {boolean} overrideDutyCycle
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.overrideDutyCycle = false

      /**
       * If true, sets RX boosted gain mode on SX126X based radios
       * @member {boolean} sx126xRxBoostedGain
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.sx126xRxBoostedGain = false

      /**
       * This parameter is for advanced users and licensed HAM radio operators.
       * Ignore Channel Calculation and use this frequency instead. The frequency_offset
       * will still be applied. This will allow you to use out-of-band frequencies.
       * Please respect your local laws and regulations. If you are a HAM, make sure you
       * enable HAM mode and turn off encryption.
       * @member {number} overrideFrequency
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.overrideFrequency = 0

      /**
       * If true, disable the build-in PA FAN using pin define in RF95_FAN_EN.
       * @member {boolean} paFanDisabled
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.paFanDisabled = false

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
       * @member {boolean} ignoreMqtt
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.ignoreMqtt = false

      /**
       * Sets the ok_to_mqtt bit on outgoing packets
       * @member {boolean} configOkToMqtt
       * @memberof meshtastic.Config.LoRaConfig
       * @instance
       */
      LoRaConfig.prototype.configOkToMqtt = false

      /**
       * Encodes the specified LoRaConfig message. Does not implicitly {@link meshtastic.Config.LoRaConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.LoRaConfig
       * @static
       * @param {meshtastic.Config.ILoRaConfig} message LoRaConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      LoRaConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.usePreset != null && Object.hasOwnProperty.call(message, 'usePreset'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.usePreset)
        if (message.modemPreset != null && Object.hasOwnProperty.call(message, 'modemPreset'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.modemPreset)
        if (message.bandwidth != null && Object.hasOwnProperty.call(message, 'bandwidth'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.bandwidth)
        if (message.spreadFactor != null && Object.hasOwnProperty.call(message, 'spreadFactor'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.spreadFactor)
        if (message.codingRate != null && Object.hasOwnProperty.call(message, 'codingRate'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.codingRate)
        if (message.frequencyOffset != null && Object.hasOwnProperty.call(message, 'frequencyOffset'))
          writer.uint32(/* id 6, wireType 5 =*/ 53).float(message.frequencyOffset)
        if (message.region != null && Object.hasOwnProperty.call(message, 'region'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.region)
        if (message.hopLimit != null && Object.hasOwnProperty.call(message, 'hopLimit'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.hopLimit)
        if (message.txEnabled != null && Object.hasOwnProperty.call(message, 'txEnabled'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.txEnabled)
        if (message.txPower != null && Object.hasOwnProperty.call(message, 'txPower'))
          writer.uint32(/* id 10, wireType 0 =*/ 80).int32(message.txPower)
        if (message.channelNum != null && Object.hasOwnProperty.call(message, 'channelNum'))
          writer.uint32(/* id 11, wireType 0 =*/ 88).uint32(message.channelNum)
        if (message.overrideDutyCycle != null && Object.hasOwnProperty.call(message, 'overrideDutyCycle'))
          writer.uint32(/* id 12, wireType 0 =*/ 96).bool(message.overrideDutyCycle)
        if (message.sx126xRxBoostedGain != null && Object.hasOwnProperty.call(message, 'sx126xRxBoostedGain'))
          writer.uint32(/* id 13, wireType 0 =*/ 104).bool(message.sx126xRxBoostedGain)
        if (message.overrideFrequency != null && Object.hasOwnProperty.call(message, 'overrideFrequency'))
          writer.uint32(/* id 14, wireType 5 =*/ 117).float(message.overrideFrequency)
        if (message.paFanDisabled != null && Object.hasOwnProperty.call(message, 'paFanDisabled'))
          writer.uint32(/* id 15, wireType 0 =*/ 120).bool(message.paFanDisabled)
        if (message.ignoreIncoming != null && message.ignoreIncoming.length) {
          writer.uint32(/* id 103, wireType 2 =*/ 826).fork()
          for (let i = 0; i < message.ignoreIncoming.length; ++i) writer.uint32(message.ignoreIncoming[i])
          writer.ldelim()
        }
        if (message.ignoreMqtt != null && Object.hasOwnProperty.call(message, 'ignoreMqtt'))
          writer.uint32(/* id 104, wireType 0 =*/ 832).bool(message.ignoreMqtt)
        if (message.configOkToMqtt != null && Object.hasOwnProperty.call(message, 'configOkToMqtt'))
          writer.uint32(/* id 105, wireType 0 =*/ 840).bool(message.configOkToMqtt)
        return writer
      }

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
      LoRaConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.LoRaConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
            case 105: {
              message.configOkToMqtt = reader.bool()
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
       * @property {number} PH_433=19 Philippines 433mhz
       * @property {number} PH_868=20 Philippines 868mhz
       * @property {number} PH_915=21 Philippines 915mhz
       * @property {number} ANZ_433=22 Australia / New Zealand 433MHz
       * @property {number} KZ_433=23 Kazakhstan 433MHz
       * @property {number} KZ_863=24 Kazakhstan 863MHz
       * @property {number} NP_865=25 Nepal 865MHz
       * @property {number} BR_902=26 Brazil 902MHz
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
        values[(valuesById[19] = 'PH_433')] = 19
        values[(valuesById[20] = 'PH_868')] = 20
        values[(valuesById[21] = 'PH_915')] = 21
        values[(valuesById[22] = 'ANZ_433')] = 22
        values[(valuesById[23] = 'KZ_433')] = 23
        values[(valuesById[24] = 'KZ_863')] = 24
        values[(valuesById[25] = 'NP_865')] = 25
        values[(valuesById[26] = 'BR_902')] = 26
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
       * Deprecated in 2.5: Works only with txco and is unusably slow
       * @property {number} MEDIUM_SLOW=3 Medium Range - Slow
       * @property {number} MEDIUM_FAST=4 Medium Range - Fast
       * @property {number} SHORT_SLOW=5 Short Range - Slow
       * @property {number} SHORT_FAST=6 Short Range - Fast
       * @property {number} LONG_MODERATE=7 Long Range - Moderately Fast
       * @property {number} SHORT_TURBO=8 Short Range - Turbo
       * This is the fastest preset and the only one with 500kHz bandwidth.
       * It is not legal to use in all regions due to this wider bandwidth.
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
        values[(valuesById[8] = 'SHORT_TURBO')] = 8
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
       * @member {boolean} enabled
       * @memberof meshtastic.Config.BluetoothConfig
       * @instance
       */
      BluetoothConfig.prototype.enabled = false

      /**
       * Determines the pairing strategy for the device
       * @member {meshtastic.Config.BluetoothConfig.PairingMode} mode
       * @memberof meshtastic.Config.BluetoothConfig
       * @instance
       */
      BluetoothConfig.prototype.mode = 0

      /**
       * Specified PIN for PairingMode.FixedPin
       * @member {number} fixedPin
       * @memberof meshtastic.Config.BluetoothConfig
       * @instance
       */
      BluetoothConfig.prototype.fixedPin = 0

      /**
       * Encodes the specified BluetoothConfig message. Does not implicitly {@link meshtastic.Config.BluetoothConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.BluetoothConfig
       * @static
       * @param {meshtastic.Config.IBluetoothConfig} message BluetoothConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      BluetoothConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.mode != null && Object.hasOwnProperty.call(message, 'mode'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.mode)
        if (message.fixedPin != null && Object.hasOwnProperty.call(message, 'fixedPin'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.fixedPin)
        return writer
      }

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
      BluetoothConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.BluetoothConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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

    Config.SecurityConfig = (function () {
      /**
       * Properties of a SecurityConfig.
       * @memberof meshtastic.Config
       * @interface ISecurityConfig
       * @property {Uint8Array|null} [publicKey] The public key of the user's device.
       * Sent out to other nodes on the mesh to allow them to compute a shared secret key.
       * @property {Uint8Array|null} [privateKey] The private key of the device.
       * Used to create a shared key with a remote device.
       * @property {Array.<Uint8Array>|null} [adminKey] The public key authorized to send admin messages to this node.
       * @property {boolean|null} [isManaged] If true, device is considered to be "managed" by a mesh administrator via admin messages
       * Device is managed by a mesh administrator.
       * @property {boolean|null} [serialEnabled] Serial Console over the Stream API."
       * @property {boolean|null} [debugLogApiEnabled] By default we turn off logging as soon as an API client connects (to keep shared serial link quiet).
       * Output live debug logging over serial or bluetooth is set to true.
       * @property {boolean|null} [adminChannelEnabled] Allow incoming device control over the insecure legacy admin channel.
       */

      /**
       * Constructs a new SecurityConfig.
       * @memberof meshtastic.Config
       * @classdesc Represents a SecurityConfig.
       * @implements ISecurityConfig
       * @constructor
       * @param {meshtastic.Config.ISecurityConfig=} [properties] Properties to set
       */
      function SecurityConfig(properties) {
        this.adminKey = []
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * The public key of the user's device.
       * Sent out to other nodes on the mesh to allow them to compute a shared secret key.
       * @member {Uint8Array} publicKey
       * @memberof meshtastic.Config.SecurityConfig
       * @instance
       */
      SecurityConfig.prototype.publicKey = $util.newBuffer([])

      /**
       * The private key of the device.
       * Used to create a shared key with a remote device.
       * @member {Uint8Array} privateKey
       * @memberof meshtastic.Config.SecurityConfig
       * @instance
       */
      SecurityConfig.prototype.privateKey = $util.newBuffer([])

      /**
       * The public key authorized to send admin messages to this node.
       * @member {Array.<Uint8Array>} adminKey
       * @memberof meshtastic.Config.SecurityConfig
       * @instance
       */
      SecurityConfig.prototype.adminKey = $util.emptyArray

      /**
       * If true, device is considered to be "managed" by a mesh administrator via admin messages
       * Device is managed by a mesh administrator.
       * @member {boolean} isManaged
       * @memberof meshtastic.Config.SecurityConfig
       * @instance
       */
      SecurityConfig.prototype.isManaged = false

      /**
       * Serial Console over the Stream API."
       * @member {boolean} serialEnabled
       * @memberof meshtastic.Config.SecurityConfig
       * @instance
       */
      SecurityConfig.prototype.serialEnabled = false

      /**
       * By default we turn off logging as soon as an API client connects (to keep shared serial link quiet).
       * Output live debug logging over serial or bluetooth is set to true.
       * @member {boolean} debugLogApiEnabled
       * @memberof meshtastic.Config.SecurityConfig
       * @instance
       */
      SecurityConfig.prototype.debugLogApiEnabled = false

      /**
       * Allow incoming device control over the insecure legacy admin channel.
       * @member {boolean} adminChannelEnabled
       * @memberof meshtastic.Config.SecurityConfig
       * @instance
       */
      SecurityConfig.prototype.adminChannelEnabled = false

      /**
       * Encodes the specified SecurityConfig message. Does not implicitly {@link meshtastic.Config.SecurityConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.SecurityConfig
       * @static
       * @param {meshtastic.Config.ISecurityConfig} message SecurityConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      SecurityConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.publicKey != null && Object.hasOwnProperty.call(message, 'publicKey'))
          writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.publicKey)
        if (message.privateKey != null && Object.hasOwnProperty.call(message, 'privateKey'))
          writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.privateKey)
        if (message.adminKey != null && message.adminKey.length)
          for (let i = 0; i < message.adminKey.length; ++i) writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.adminKey[i])
        if (message.isManaged != null && Object.hasOwnProperty.call(message, 'isManaged'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.isManaged)
        if (message.serialEnabled != null && Object.hasOwnProperty.call(message, 'serialEnabled'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.serialEnabled)
        if (message.debugLogApiEnabled != null && Object.hasOwnProperty.call(message, 'debugLogApiEnabled'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.debugLogApiEnabled)
        if (message.adminChannelEnabled != null && Object.hasOwnProperty.call(message, 'adminChannelEnabled'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.adminChannelEnabled)
        return writer
      }

      /**
       * Decodes a SecurityConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.SecurityConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.SecurityConfig} SecurityConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      SecurityConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.SecurityConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
          switch (tag >>> 3) {
            case 1: {
              message.publicKey = reader.bytes()
              break
            }
            case 2: {
              message.privateKey = reader.bytes()
              break
            }
            case 3: {
              if (!(message.adminKey && message.adminKey.length)) message.adminKey = []
              message.adminKey.push(reader.bytes())
              break
            }
            case 4: {
              message.isManaged = reader.bool()
              break
            }
            case 5: {
              message.serialEnabled = reader.bool()
              break
            }
            case 6: {
              message.debugLogApiEnabled = reader.bool()
              break
            }
            case 8: {
              message.adminChannelEnabled = reader.bool()
              break
            }
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return SecurityConfig
    })()

    Config.SessionkeyConfig = (function () {
      /**
       * Properties of a SessionkeyConfig.
       * @memberof meshtastic.Config
       * @interface ISessionkeyConfig
       */

      /**
       * Constructs a new SessionkeyConfig.
       * @memberof meshtastic.Config
       * @classdesc Blank config request, strictly for getting the session key
       * @implements ISessionkeyConfig
       * @constructor
       * @param {meshtastic.Config.ISessionkeyConfig=} [properties] Properties to set
       */
      function SessionkeyConfig(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Encodes the specified SessionkeyConfig message. Does not implicitly {@link meshtastic.Config.SessionkeyConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.Config.SessionkeyConfig
       * @static
       * @param {meshtastic.Config.ISessionkeyConfig} message SessionkeyConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      SessionkeyConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        return writer
      }

      /**
       * Decodes a SessionkeyConfig message from the specified reader or buffer.
       * @function decode
       * @memberof meshtastic.Config.SessionkeyConfig
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {meshtastic.Config.SessionkeyConfig} SessionkeyConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      SessionkeyConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.Config.SessionkeyConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
          switch (tag >>> 3) {
            default:
              reader.skipType(tag & 7)
              break
          }
        }
        return message
      }

      return SessionkeyConfig
    })()

    return Config
  })()

  meshtastic.DeviceUIConfig = (function () {
    /**
     * Properties of a DeviceUIConfig.
     * @memberof meshtastic
     * @interface IDeviceUIConfig
     * @property {number|null} [version] A version integer used to invalidate saved files when we make incompatible changes.
     * @property {number|null} [screenBrightness] TFT display brightness 1..255
     * @property {number|null} [screenTimeout] Screen timeout 0..900
     * @property {boolean|null} [screenLock] Screen/Settings lock enabled
     * @property {boolean|null} [settingsLock] DeviceUIConfig settingsLock
     * @property {number|null} [pinCode] DeviceUIConfig pinCode
     * @property {meshtastic.Theme|null} [theme] Color theme
     * @property {boolean|null} [alertEnabled] Audible message, banner and ring tone
     * @property {boolean|null} [bannerEnabled] DeviceUIConfig bannerEnabled
     * @property {number|null} [ringToneId] DeviceUIConfig ringToneId
     * @property {meshtastic.Language|null} [language] Localization
     * @property {meshtastic.INodeFilter|null} [nodeFilter] Node list filter
     * @property {meshtastic.INodeHighlight|null} [nodeHighlight] Node list highlightening
     * @property {Uint8Array|null} [calibrationData] 8 integers for screen calibration data
     * @property {meshtastic.IMap|null} [mapData] Map related data
     * @property {meshtastic.CompassMode|null} [compassMode] Compass mode
     * @property {number|null} [screenRgbColor] RGB color for BaseUI
     * 0xRRGGBB format, e.g. 0xFF0000 for red
     * @property {boolean|null} [isClockfaceAnalog] Clockface analog style
     * true for analog clockface, false for digital clockface
     */

    /**
     * Constructs a new DeviceUIConfig.
     * @memberof meshtastic
     * @classdesc Represents a DeviceUIConfig.
     * @implements IDeviceUIConfig
     * @constructor
     * @param {meshtastic.IDeviceUIConfig=} [properties] Properties to set
     */
    function DeviceUIConfig(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * A version integer used to invalidate saved files when we make incompatible changes.
     * @member {number} version
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.version = 0

    /**
     * TFT display brightness 1..255
     * @member {number} screenBrightness
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.screenBrightness = 0

    /**
     * Screen timeout 0..900
     * @member {number} screenTimeout
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.screenTimeout = 0

    /**
     * Screen/Settings lock enabled
     * @member {boolean} screenLock
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.screenLock = false

    /**
     * DeviceUIConfig settingsLock.
     * @member {boolean} settingsLock
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.settingsLock = false

    /**
     * DeviceUIConfig pinCode.
     * @member {number} pinCode
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.pinCode = 0

    /**
     * Color theme
     * @member {meshtastic.Theme} theme
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.theme = 0

    /**
     * Audible message, banner and ring tone
     * @member {boolean} alertEnabled
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.alertEnabled = false

    /**
     * DeviceUIConfig bannerEnabled.
     * @member {boolean} bannerEnabled
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.bannerEnabled = false

    /**
     * DeviceUIConfig ringToneId.
     * @member {number} ringToneId
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.ringToneId = 0

    /**
     * Localization
     * @member {meshtastic.Language} language
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.language = 0

    /**
     * Node list filter
     * @member {meshtastic.INodeFilter|null|undefined} nodeFilter
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.nodeFilter = null

    /**
     * Node list highlightening
     * @member {meshtastic.INodeHighlight|null|undefined} nodeHighlight
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.nodeHighlight = null

    /**
     * 8 integers for screen calibration data
     * @member {Uint8Array} calibrationData
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.calibrationData = $util.newBuffer([])

    /**
     * Map related data
     * @member {meshtastic.IMap|null|undefined} mapData
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.mapData = null

    /**
     * Compass mode
     * @member {meshtastic.CompassMode} compassMode
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.compassMode = 0

    /**
     * RGB color for BaseUI
     * 0xRRGGBB format, e.g. 0xFF0000 for red
     * @member {number} screenRgbColor
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.screenRgbColor = 0

    /**
     * Clockface analog style
     * true for analog clockface, false for digital clockface
     * @member {boolean} isClockfaceAnalog
     * @memberof meshtastic.DeviceUIConfig
     * @instance
     */
    DeviceUIConfig.prototype.isClockfaceAnalog = false

    /**
     * Encodes the specified DeviceUIConfig message. Does not implicitly {@link meshtastic.DeviceUIConfig.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.DeviceUIConfig
     * @static
     * @param {meshtastic.IDeviceUIConfig} message DeviceUIConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeviceUIConfig.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.version != null && Object.hasOwnProperty.call(message, 'version'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.version)
      if (message.screenBrightness != null && Object.hasOwnProperty.call(message, 'screenBrightness'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.screenBrightness)
      if (message.screenTimeout != null && Object.hasOwnProperty.call(message, 'screenTimeout'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.screenTimeout)
      if (message.screenLock != null && Object.hasOwnProperty.call(message, 'screenLock'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.screenLock)
      if (message.settingsLock != null && Object.hasOwnProperty.call(message, 'settingsLock'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.settingsLock)
      if (message.pinCode != null && Object.hasOwnProperty.call(message, 'pinCode'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.pinCode)
      if (message.theme != null && Object.hasOwnProperty.call(message, 'theme'))
        writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.theme)
      if (message.alertEnabled != null && Object.hasOwnProperty.call(message, 'alertEnabled'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.alertEnabled)
      if (message.bannerEnabled != null && Object.hasOwnProperty.call(message, 'bannerEnabled'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.bannerEnabled)
      if (message.ringToneId != null && Object.hasOwnProperty.call(message, 'ringToneId'))
        writer.uint32(/* id 10, wireType 0 =*/ 80).uint32(message.ringToneId)
      if (message.language != null && Object.hasOwnProperty.call(message, 'language'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).int32(message.language)
      if (message.nodeFilter != null && Object.hasOwnProperty.call(message, 'nodeFilter'))
        $root.meshtastic.NodeFilter.encode(message.nodeFilter, writer.uint32(/* id 12, wireType 2 =*/ 98).fork()).ldelim()
      if (message.nodeHighlight != null && Object.hasOwnProperty.call(message, 'nodeHighlight'))
        $root.meshtastic.NodeHighlight.encode(message.nodeHighlight, writer.uint32(/* id 13, wireType 2 =*/ 106).fork()).ldelim()
      if (message.calibrationData != null && Object.hasOwnProperty.call(message, 'calibrationData'))
        writer.uint32(/* id 14, wireType 2 =*/ 114).bytes(message.calibrationData)
      if (message.mapData != null && Object.hasOwnProperty.call(message, 'mapData'))
        $root.meshtastic.Map.encode(message.mapData, writer.uint32(/* id 15, wireType 2 =*/ 122).fork()).ldelim()
      if (message.compassMode != null && Object.hasOwnProperty.call(message, 'compassMode'))
        writer.uint32(/* id 16, wireType 0 =*/ 128).int32(message.compassMode)
      if (message.screenRgbColor != null && Object.hasOwnProperty.call(message, 'screenRgbColor'))
        writer.uint32(/* id 17, wireType 0 =*/ 136).uint32(message.screenRgbColor)
      if (message.isClockfaceAnalog != null && Object.hasOwnProperty.call(message, 'isClockfaceAnalog'))
        writer.uint32(/* id 18, wireType 0 =*/ 144).bool(message.isClockfaceAnalog)
      return writer
    }

    /**
     * Decodes a DeviceUIConfig message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.DeviceUIConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.DeviceUIConfig} DeviceUIConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeviceUIConfig.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.DeviceUIConfig()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.version = reader.uint32()
            break
          }
          case 2: {
            message.screenBrightness = reader.uint32()
            break
          }
          case 3: {
            message.screenTimeout = reader.uint32()
            break
          }
          case 4: {
            message.screenLock = reader.bool()
            break
          }
          case 5: {
            message.settingsLock = reader.bool()
            break
          }
          case 6: {
            message.pinCode = reader.uint32()
            break
          }
          case 7: {
            message.theme = reader.int32()
            break
          }
          case 8: {
            message.alertEnabled = reader.bool()
            break
          }
          case 9: {
            message.bannerEnabled = reader.bool()
            break
          }
          case 10: {
            message.ringToneId = reader.uint32()
            break
          }
          case 11: {
            message.language = reader.int32()
            break
          }
          case 12: {
            message.nodeFilter = $root.meshtastic.NodeFilter.decode(reader, reader.uint32())
            break
          }
          case 13: {
            message.nodeHighlight = $root.meshtastic.NodeHighlight.decode(reader, reader.uint32())
            break
          }
          case 14: {
            message.calibrationData = reader.bytes()
            break
          }
          case 15: {
            message.mapData = $root.meshtastic.Map.decode(reader, reader.uint32())
            break
          }
          case 16: {
            message.compassMode = reader.int32()
            break
          }
          case 17: {
            message.screenRgbColor = reader.uint32()
            break
          }
          case 18: {
            message.isClockfaceAnalog = reader.bool()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return DeviceUIConfig
  })()

  meshtastic.NodeFilter = (function () {
    /**
     * Properties of a NodeFilter.
     * @memberof meshtastic
     * @interface INodeFilter
     * @property {boolean|null} [unknownSwitch] Filter unknown nodes
     * @property {boolean|null} [offlineSwitch] Filter offline nodes
     * @property {boolean|null} [publicKeySwitch] Filter nodes w/o public key
     * @property {number|null} [hopsAway] Filter based on hops away
     * @property {boolean|null} [positionSwitch] Filter nodes w/o position
     * @property {string|null} [nodeName] Filter nodes by matching name string
     * @property {number|null} [channel] Filter based on channel
     */

    /**
     * Constructs a new NodeFilter.
     * @memberof meshtastic
     * @classdesc Represents a NodeFilter.
     * @implements INodeFilter
     * @constructor
     * @param {meshtastic.INodeFilter=} [properties] Properties to set
     */
    function NodeFilter(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Filter unknown nodes
     * @member {boolean} unknownSwitch
     * @memberof meshtastic.NodeFilter
     * @instance
     */
    NodeFilter.prototype.unknownSwitch = false

    /**
     * Filter offline nodes
     * @member {boolean} offlineSwitch
     * @memberof meshtastic.NodeFilter
     * @instance
     */
    NodeFilter.prototype.offlineSwitch = false

    /**
     * Filter nodes w/o public key
     * @member {boolean} publicKeySwitch
     * @memberof meshtastic.NodeFilter
     * @instance
     */
    NodeFilter.prototype.publicKeySwitch = false

    /**
     * Filter based on hops away
     * @member {number} hopsAway
     * @memberof meshtastic.NodeFilter
     * @instance
     */
    NodeFilter.prototype.hopsAway = 0

    /**
     * Filter nodes w/o position
     * @member {boolean} positionSwitch
     * @memberof meshtastic.NodeFilter
     * @instance
     */
    NodeFilter.prototype.positionSwitch = false

    /**
     * Filter nodes by matching name string
     * @member {string} nodeName
     * @memberof meshtastic.NodeFilter
     * @instance
     */
    NodeFilter.prototype.nodeName = ''

    /**
     * Filter based on channel
     * @member {number} channel
     * @memberof meshtastic.NodeFilter
     * @instance
     */
    NodeFilter.prototype.channel = 0

    /**
     * Encodes the specified NodeFilter message. Does not implicitly {@link meshtastic.NodeFilter.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.NodeFilter
     * @static
     * @param {meshtastic.INodeFilter} message NodeFilter message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NodeFilter.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.unknownSwitch != null && Object.hasOwnProperty.call(message, 'unknownSwitch'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.unknownSwitch)
      if (message.offlineSwitch != null && Object.hasOwnProperty.call(message, 'offlineSwitch'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.offlineSwitch)
      if (message.publicKeySwitch != null && Object.hasOwnProperty.call(message, 'publicKeySwitch'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.publicKeySwitch)
      if (message.hopsAway != null && Object.hasOwnProperty.call(message, 'hopsAway'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.hopsAway)
      if (message.positionSwitch != null && Object.hasOwnProperty.call(message, 'positionSwitch'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.positionSwitch)
      if (message.nodeName != null && Object.hasOwnProperty.call(message, 'nodeName'))
        writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.nodeName)
      if (message.channel != null && Object.hasOwnProperty.call(message, 'channel'))
        writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.channel)
      return writer
    }

    /**
     * Decodes a NodeFilter message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.NodeFilter
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.NodeFilter} NodeFilter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NodeFilter.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.NodeFilter()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.unknownSwitch = reader.bool()
            break
          }
          case 2: {
            message.offlineSwitch = reader.bool()
            break
          }
          case 3: {
            message.publicKeySwitch = reader.bool()
            break
          }
          case 4: {
            message.hopsAway = reader.int32()
            break
          }
          case 5: {
            message.positionSwitch = reader.bool()
            break
          }
          case 6: {
            message.nodeName = reader.string()
            break
          }
          case 7: {
            message.channel = reader.int32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return NodeFilter
  })()

  meshtastic.NodeHighlight = (function () {
    /**
     * Properties of a NodeHighlight.
     * @memberof meshtastic
     * @interface INodeHighlight
     * @property {boolean|null} [chatSwitch] Hightlight nodes w/ active chat
     * @property {boolean|null} [positionSwitch] Highlight nodes w/ position
     * @property {boolean|null} [telemetrySwitch] Highlight nodes w/ telemetry data
     * @property {boolean|null} [iaqSwitch] Highlight nodes w/ iaq data
     * @property {string|null} [nodeName] Highlight nodes by matching name string
     */

    /**
     * Constructs a new NodeHighlight.
     * @memberof meshtastic
     * @classdesc Represents a NodeHighlight.
     * @implements INodeHighlight
     * @constructor
     * @param {meshtastic.INodeHighlight=} [properties] Properties to set
     */
    function NodeHighlight(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Hightlight nodes w/ active chat
     * @member {boolean} chatSwitch
     * @memberof meshtastic.NodeHighlight
     * @instance
     */
    NodeHighlight.prototype.chatSwitch = false

    /**
     * Highlight nodes w/ position
     * @member {boolean} positionSwitch
     * @memberof meshtastic.NodeHighlight
     * @instance
     */
    NodeHighlight.prototype.positionSwitch = false

    /**
     * Highlight nodes w/ telemetry data
     * @member {boolean} telemetrySwitch
     * @memberof meshtastic.NodeHighlight
     * @instance
     */
    NodeHighlight.prototype.telemetrySwitch = false

    /**
     * Highlight nodes w/ iaq data
     * @member {boolean} iaqSwitch
     * @memberof meshtastic.NodeHighlight
     * @instance
     */
    NodeHighlight.prototype.iaqSwitch = false

    /**
     * Highlight nodes by matching name string
     * @member {string} nodeName
     * @memberof meshtastic.NodeHighlight
     * @instance
     */
    NodeHighlight.prototype.nodeName = ''

    /**
     * Encodes the specified NodeHighlight message. Does not implicitly {@link meshtastic.NodeHighlight.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.NodeHighlight
     * @static
     * @param {meshtastic.INodeHighlight} message NodeHighlight message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NodeHighlight.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.chatSwitch != null && Object.hasOwnProperty.call(message, 'chatSwitch'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.chatSwitch)
      if (message.positionSwitch != null && Object.hasOwnProperty.call(message, 'positionSwitch'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.positionSwitch)
      if (message.telemetrySwitch != null && Object.hasOwnProperty.call(message, 'telemetrySwitch'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.telemetrySwitch)
      if (message.iaqSwitch != null && Object.hasOwnProperty.call(message, 'iaqSwitch'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.iaqSwitch)
      if (message.nodeName != null && Object.hasOwnProperty.call(message, 'nodeName'))
        writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.nodeName)
      return writer
    }

    /**
     * Decodes a NodeHighlight message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.NodeHighlight
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.NodeHighlight} NodeHighlight
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NodeHighlight.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.NodeHighlight()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.chatSwitch = reader.bool()
            break
          }
          case 2: {
            message.positionSwitch = reader.bool()
            break
          }
          case 3: {
            message.telemetrySwitch = reader.bool()
            break
          }
          case 4: {
            message.iaqSwitch = reader.bool()
            break
          }
          case 5: {
            message.nodeName = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return NodeHighlight
  })()

  meshtastic.GeoPoint = (function () {
    /**
     * Properties of a GeoPoint.
     * @memberof meshtastic
     * @interface IGeoPoint
     * @property {number|null} [zoom] Zoom level
     * @property {number|null} [latitude] Coordinate: latitude
     * @property {number|null} [longitude] Coordinate: longitude
     */

    /**
     * Constructs a new GeoPoint.
     * @memberof meshtastic
     * @classdesc Represents a GeoPoint.
     * @implements IGeoPoint
     * @constructor
     * @param {meshtastic.IGeoPoint=} [properties] Properties to set
     */
    function GeoPoint(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Zoom level
     * @member {number} zoom
     * @memberof meshtastic.GeoPoint
     * @instance
     */
    GeoPoint.prototype.zoom = 0

    /**
     * Coordinate: latitude
     * @member {number} latitude
     * @memberof meshtastic.GeoPoint
     * @instance
     */
    GeoPoint.prototype.latitude = 0

    /**
     * Coordinate: longitude
     * @member {number} longitude
     * @memberof meshtastic.GeoPoint
     * @instance
     */
    GeoPoint.prototype.longitude = 0

    /**
     * Encodes the specified GeoPoint message. Does not implicitly {@link meshtastic.GeoPoint.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.GeoPoint
     * @static
     * @param {meshtastic.IGeoPoint} message GeoPoint message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GeoPoint.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.zoom != null && Object.hasOwnProperty.call(message, 'zoom')) writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.zoom)
      if (message.latitude != null && Object.hasOwnProperty.call(message, 'latitude'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.latitude)
      if (message.longitude != null && Object.hasOwnProperty.call(message, 'longitude'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.longitude)
      return writer
    }

    /**
     * Decodes a GeoPoint message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.GeoPoint
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.GeoPoint} GeoPoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GeoPoint.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.GeoPoint()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.zoom = reader.int32()
            break
          }
          case 2: {
            message.latitude = reader.int32()
            break
          }
          case 3: {
            message.longitude = reader.int32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return GeoPoint
  })()

  meshtastic.Map = (function () {
    /**
     * Properties of a Map.
     * @memberof meshtastic
     * @interface IMap
     * @property {meshtastic.IGeoPoint|null} [home] Home coordinates
     * @property {string|null} [style] Map tile style
     * @property {boolean|null} [followGps] Map scroll follows GPS
     */

    /**
     * Constructs a new Map.
     * @memberof meshtastic
     * @classdesc Represents a Map.
     * @implements IMap
     * @constructor
     * @param {meshtastic.IMap=} [properties] Properties to set
     */
    function Map(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Home coordinates
     * @member {meshtastic.IGeoPoint|null|undefined} home
     * @memberof meshtastic.Map
     * @instance
     */
    Map.prototype.home = null

    /**
     * Map tile style
     * @member {string} style
     * @memberof meshtastic.Map
     * @instance
     */
    Map.prototype.style = ''

    /**
     * Map scroll follows GPS
     * @member {boolean} followGps
     * @memberof meshtastic.Map
     * @instance
     */
    Map.prototype.followGps = false

    /**
     * Encodes the specified Map message. Does not implicitly {@link meshtastic.Map.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Map
     * @static
     * @param {meshtastic.IMap} message Map message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Map.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.home != null && Object.hasOwnProperty.call(message, 'home'))
        $root.meshtastic.GeoPoint.encode(message.home, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.style != null && Object.hasOwnProperty.call(message, 'style'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.style)
      if (message.followGps != null && Object.hasOwnProperty.call(message, 'followGps'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.followGps)
      return writer
    }

    /**
     * Decodes a Map message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.Map
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.Map} Map
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Map.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Map()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.home = $root.meshtastic.GeoPoint.decode(reader, reader.uint32())
            break
          }
          case 2: {
            message.style = reader.string()
            break
          }
          case 3: {
            message.followGps = reader.bool()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Map
  })()

  /**
   * CompassMode enum.
   * @name meshtastic.CompassMode
   * @enum {number}
   * @property {number} DYNAMIC=0 Compass with dynamic ring and heading
   * @property {number} FIXED_RING=1 Compass with fixed ring and heading
   * @property {number} FREEZE_HEADING=2 Compass with heading and freeze option
   */
  meshtastic.CompassMode = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'DYNAMIC')] = 0
    values[(valuesById[1] = 'FIXED_RING')] = 1
    values[(valuesById[2] = 'FREEZE_HEADING')] = 2
    return values
  })()

  /**
   * Theme enum.
   * @name meshtastic.Theme
   * @enum {number}
   * @property {number} DARK=0 Dark
   * @property {number} LIGHT=1 Light
   * @property {number} RED=2 Red
   */
  meshtastic.Theme = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'DARK')] = 0
    values[(valuesById[1] = 'LIGHT')] = 1
    values[(valuesById[2] = 'RED')] = 2
    return values
  })()

  /**
   * Localization
   * @name meshtastic.Language
   * @enum {number}
   * @property {number} ENGLISH=0 English
   * @property {number} FRENCH=1 French
   * @property {number} GERMAN=2 German
   * @property {number} ITALIAN=3 Italian
   * @property {number} PORTUGUESE=4 Portuguese
   * @property {number} SPANISH=5 Spanish
   * @property {number} SWEDISH=6 Swedish
   * @property {number} FINNISH=7 Finnish
   * @property {number} POLISH=8 Polish
   * @property {number} TURKISH=9 Turkish
   * @property {number} SERBIAN=10 Serbian
   * @property {number} RUSSIAN=11 Russian
   * @property {number} DUTCH=12 Dutch
   * @property {number} GREEK=13 Greek
   * @property {number} NORWEGIAN=14 Norwegian
   * @property {number} SLOVENIAN=15 Slovenian
   * @property {number} UKRAINIAN=16 Ukrainian
   * @property {number} BULGARIAN=17 Bulgarian
   * @property {number} SIMPLIFIED_CHINESE=30 Simplified Chinese (experimental)
   * @property {number} TRADITIONAL_CHINESE=31 Traditional Chinese (experimental)
   */
  meshtastic.Language = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'ENGLISH')] = 0
    values[(valuesById[1] = 'FRENCH')] = 1
    values[(valuesById[2] = 'GERMAN')] = 2
    values[(valuesById[3] = 'ITALIAN')] = 3
    values[(valuesById[4] = 'PORTUGUESE')] = 4
    values[(valuesById[5] = 'SPANISH')] = 5
    values[(valuesById[6] = 'SWEDISH')] = 6
    values[(valuesById[7] = 'FINNISH')] = 7
    values[(valuesById[8] = 'POLISH')] = 8
    values[(valuesById[9] = 'TURKISH')] = 9
    values[(valuesById[10] = 'SERBIAN')] = 10
    values[(valuesById[11] = 'RUSSIAN')] = 11
    values[(valuesById[12] = 'DUTCH')] = 12
    values[(valuesById[13] = 'GREEK')] = 13
    values[(valuesById[14] = 'NORWEGIAN')] = 14
    values[(valuesById[15] = 'SLOVENIAN')] = 15
    values[(valuesById[16] = 'UKRAINIAN')] = 16
    values[(valuesById[17] = 'BULGARIAN')] = 17
    values[(valuesById[30] = 'SIMPLIFIED_CHINESE')] = 30
    values[(valuesById[31] = 'TRADITIONAL_CHINESE')] = 31
    return values
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
     * @classdesc A GPS Position
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
     * @member {number} time
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.time = 0

    /**
     * TODO: REPLACE
     * @member {meshtastic.Position.LocSource} locationSource
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.locationSource = 0

    /**
     * TODO: REPLACE
     * @member {meshtastic.Position.AltSource} altitudeSource
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.altitudeSource = 0

    /**
     * Positional timestamp (actual timestamp of GPS solution) in integer epoch seconds
     * @member {number} timestamp
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.timestamp = 0

    /**
     * Pos. timestamp milliseconds adjustment (rarely available or required)
     * @member {number} timestampMillisAdjust
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.timestampMillisAdjust = 0

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
     * @member {number} PDOP
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.PDOP = 0

    /**
     * TODO: REPLACE
     * @member {number} HDOP
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.HDOP = 0

    /**
     * TODO: REPLACE
     * @member {number} VDOP
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.VDOP = 0

    /**
     * GPS accuracy (a hardware specific constant) in mm
     * multiplied with DOP to calculate positional accuracy
     * Default: "'bout three meters-ish" :)
     * @member {number} gpsAccuracy
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.gpsAccuracy = 0

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
     * @member {number} fixQuality
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.fixQuality = 0

    /**
     * GPS fix type 2D/3D (from NMEA GxGSA statement)
     * @member {number} fixType
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.fixType = 0

    /**
     * GPS "Satellites in View" number
     * @member {number} satsInView
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.satsInView = 0

    /**
     * Sensor ID - in case multiple positioning sensors are being used
     * @member {number} sensorId
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.sensorId = 0

    /**
     * Estimated/expected time (in seconds) until next update:
     * - if we update at fixed intervals of X seconds, use X
     * - if we update at dynamic intervals (based on relative movement etc),
     * but "AT LEAST every Y seconds", use Y
     * @member {number} nextUpdate
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.nextUpdate = 0

    /**
     * A sequence number, incremented with each Position message to help
     * detect lost updates if needed
     * @member {number} seqNumber
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.seqNumber = 0

    /**
     * Indicates the bits of precision set by the sending node
     * @member {number} precisionBits
     * @memberof meshtastic.Position
     * @instance
     */
    Position.prototype.precisionBits = 0

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Position _latitudeI.
     * @member {"latitudeI"|undefined} _latitudeI
     * @memberof meshtastic.Position
     * @instance
     */
    Object.defineProperty(Position.prototype, '_latitudeI', {
      get: $util.oneOfGetter(($oneOfFields = ['latitudeI'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Position _longitudeI.
     * @member {"longitudeI"|undefined} _longitudeI
     * @memberof meshtastic.Position
     * @instance
     */
    Object.defineProperty(Position.prototype, '_longitudeI', {
      get: $util.oneOfGetter(($oneOfFields = ['longitudeI'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Position _altitude.
     * @member {"altitude"|undefined} _altitude
     * @memberof meshtastic.Position
     * @instance
     */
    Object.defineProperty(Position.prototype, '_altitude', {
      get: $util.oneOfGetter(($oneOfFields = ['altitude'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Position _altitudeHae.
     * @member {"altitudeHae"|undefined} _altitudeHae
     * @memberof meshtastic.Position
     * @instance
     */
    Object.defineProperty(Position.prototype, '_altitudeHae', {
      get: $util.oneOfGetter(($oneOfFields = ['altitudeHae'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Position _altitudeGeoidalSeparation.
     * @member {"altitudeGeoidalSeparation"|undefined} _altitudeGeoidalSeparation
     * @memberof meshtastic.Position
     * @instance
     */
    Object.defineProperty(Position.prototype, '_altitudeGeoidalSeparation', {
      get: $util.oneOfGetter(($oneOfFields = ['altitudeGeoidalSeparation'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Position _groundSpeed.
     * @member {"groundSpeed"|undefined} _groundSpeed
     * @memberof meshtastic.Position
     * @instance
     */
    Object.defineProperty(Position.prototype, '_groundSpeed', {
      get: $util.oneOfGetter(($oneOfFields = ['groundSpeed'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Position _groundTrack.
     * @member {"groundTrack"|undefined} _groundTrack
     * @memberof meshtastic.Position
     * @instance
     */
    Object.defineProperty(Position.prototype, '_groundTrack', {
      get: $util.oneOfGetter(($oneOfFields = ['groundTrack'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified Position message. Does not implicitly {@link meshtastic.Position.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Position
     * @static
     * @param {meshtastic.IPosition} message Position message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Position.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.latitudeI != null && Object.hasOwnProperty.call(message, 'latitudeI'))
        writer.uint32(/* id 1, wireType 5 =*/ 13).sfixed32(message.latitudeI)
      if (message.longitudeI != null && Object.hasOwnProperty.call(message, 'longitudeI'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).sfixed32(message.longitudeI)
      if (message.altitude != null && Object.hasOwnProperty.call(message, 'altitude'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.altitude)
      if (message.time != null && Object.hasOwnProperty.call(message, 'time'))
        writer.uint32(/* id 4, wireType 5 =*/ 37).fixed32(message.time)
      if (message.locationSource != null && Object.hasOwnProperty.call(message, 'locationSource'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.locationSource)
      if (message.altitudeSource != null && Object.hasOwnProperty.call(message, 'altitudeSource'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).int32(message.altitudeSource)
      if (message.timestamp != null && Object.hasOwnProperty.call(message, 'timestamp'))
        writer.uint32(/* id 7, wireType 5 =*/ 61).fixed32(message.timestamp)
      if (message.timestampMillisAdjust != null && Object.hasOwnProperty.call(message, 'timestampMillisAdjust'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).int32(message.timestampMillisAdjust)
      if (message.altitudeHae != null && Object.hasOwnProperty.call(message, 'altitudeHae'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).sint32(message.altitudeHae)
      if (message.altitudeGeoidalSeparation != null && Object.hasOwnProperty.call(message, 'altitudeGeoidalSeparation'))
        writer.uint32(/* id 10, wireType 0 =*/ 80).sint32(message.altitudeGeoidalSeparation)
      if (message.PDOP != null && Object.hasOwnProperty.call(message, 'PDOP'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).uint32(message.PDOP)
      if (message.HDOP != null && Object.hasOwnProperty.call(message, 'HDOP'))
        writer.uint32(/* id 12, wireType 0 =*/ 96).uint32(message.HDOP)
      if (message.VDOP != null && Object.hasOwnProperty.call(message, 'VDOP'))
        writer.uint32(/* id 13, wireType 0 =*/ 104).uint32(message.VDOP)
      if (message.gpsAccuracy != null && Object.hasOwnProperty.call(message, 'gpsAccuracy'))
        writer.uint32(/* id 14, wireType 0 =*/ 112).uint32(message.gpsAccuracy)
      if (message.groundSpeed != null && Object.hasOwnProperty.call(message, 'groundSpeed'))
        writer.uint32(/* id 15, wireType 0 =*/ 120).uint32(message.groundSpeed)
      if (message.groundTrack != null && Object.hasOwnProperty.call(message, 'groundTrack'))
        writer.uint32(/* id 16, wireType 0 =*/ 128).uint32(message.groundTrack)
      if (message.fixQuality != null && Object.hasOwnProperty.call(message, 'fixQuality'))
        writer.uint32(/* id 17, wireType 0 =*/ 136).uint32(message.fixQuality)
      if (message.fixType != null && Object.hasOwnProperty.call(message, 'fixType'))
        writer.uint32(/* id 18, wireType 0 =*/ 144).uint32(message.fixType)
      if (message.satsInView != null && Object.hasOwnProperty.call(message, 'satsInView'))
        writer.uint32(/* id 19, wireType 0 =*/ 152).uint32(message.satsInView)
      if (message.sensorId != null && Object.hasOwnProperty.call(message, 'sensorId'))
        writer.uint32(/* id 20, wireType 0 =*/ 160).uint32(message.sensorId)
      if (message.nextUpdate != null && Object.hasOwnProperty.call(message, 'nextUpdate'))
        writer.uint32(/* id 21, wireType 0 =*/ 168).uint32(message.nextUpdate)
      if (message.seqNumber != null && Object.hasOwnProperty.call(message, 'seqNumber'))
        writer.uint32(/* id 22, wireType 0 =*/ 176).uint32(message.seqNumber)
      if (message.precisionBits != null && Object.hasOwnProperty.call(message, 'precisionBits'))
        writer.uint32(/* id 23, wireType 0 =*/ 184).uint32(message.precisionBits)
      return writer
    }

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
    Position.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Position()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
   * @property {number} HELTEC_WIRELESS_BRIDGE=24 Heltec Wireless Bridge
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
   * @property {number} M5STACK=42 M5 esp32 based MCU modules with enclosure, TFT and LORA Shields. All Variants (Basic, Core, Fire, Core2, CoreS3, Paper) https://m5stack.com/
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
   * @property {number} SENSECAP_INDICATOR=70 Sensecap Indicator from Seeed Studio. ESP32-S3 device with TFT and RP2040 coprocessor
   * @property {number} TRACKER_T1000_E=71 Seeed studio T1000-E tracker card. NRF52840 w/ LR1110 radio, GPS, button, buzzer, and sensors.
   * @property {number} RAK3172=72 RAK3172 STM32WLE5 Module (https://store.rakwireless.com/products/wisduo-lpwan-module-rak3172)
   * @property {number} WIO_E5=73 Seeed Studio Wio-E5 (either mini or Dev kit) using STM32WL chip.
   * @property {number} RADIOMASTER_900_BANDIT=74 RadioMaster 900 Bandit, https://www.radiomasterrc.com/products/bandit-expresslrs-rf-module
   * SSD1306 OLED and No GPS
   * @property {number} ME25LS01_4Y10TD=75 Minewsemi ME25LS01 (ME25LE01_V1.0). NRF52840 w/ LR1110 radio, buttons and leds and pins.
   * @property {number} RP2040_FEATHER_RFM95=76 RP2040_FEATHER_RFM95
   * Adafruit Feather RP2040 with RFM95 LoRa Radio RFM95 with SX1272, SSD1306 OLED
   * https://www.adafruit.com/product/5714
   * https://www.adafruit.com/product/326
   * https://www.adafruit.com/product/938
   * ^^^ short A0 to switch to I2C address 0x3C
   * @property {number} M5STACK_COREBASIC=77 M5 esp32 based MCU modules with enclosure, TFT and LORA Shields. All Variants (Basic, Core, Fire, Core2, CoreS3, Paper) https://m5stack.com/
   * @property {number} M5STACK_CORE2=78 M5STACK_CORE2 value
   * @property {number} RPI_PICO2=79 Pico2 with Waveshare Hat, same as Pico
   * @property {number} M5STACK_CORES3=80 M5 esp32 based MCU modules with enclosure, TFT and LORA Shields. All Variants (Basic, Core, Fire, Core2, CoreS3, Paper) https://m5stack.com/
   * @property {number} SEEED_XIAO_S3=81 Seeed XIAO S3 DK
   * @property {number} MS24SF1=82 Nordic nRF52840+Semtech SX1262 LoRa BLE Combo Module. nRF52840+SX1262 MS24SF1
   * @property {number} TLORA_C6=83 Lilygo TLora-C6 with the new ESP32-C6 MCU
   * @property {number} WISMESH_TAP=84 WisMesh Tap
   * RAK-4631 w/ TFT in injection modled case
   * @property {number} ROUTASTIC=85 Similar to PORTDUINO but used by Routastic devices, this is not any
   * particular device and does not run Meshtastic's code but supports
   * the same frame format.
   * Runs on linux, see https://github.com/Jorropo/routastic
   * @property {number} MESH_TAB=86 Mesh-Tab, esp32 based
   * https://github.com/valzzu/Mesh-Tab
   * @property {number} MESHLINK=87 MeshLink board developed by LoraItalia. NRF52840, eByte E22900M22S (Will also come with other frequencies), 25w MPPT solar charger (5v,12v,18v selectable), support for gps, buzzer, oled or e-ink display, 10 gpios, hardware watchdog
   * https://www.loraitalia.it
   * @property {number} XIAO_NRF52_KIT=88 Seeed XIAO nRF52840 + Wio SX1262 kit
   * @property {number} THINKNODE_M1=89 Elecrow ThinkNode M1 & M2
   * https://www.elecrow.com/wiki/ThinkNode-M1_Transceiver_Device(Meshtastic)_Power_By_nRF52840.html
   * https://www.elecrow.com/wiki/ThinkNode-M2_Transceiver_Device(Meshtastic)_Power_By_NRF52840.html (this actually uses ESP32-S3)
   * @property {number} THINKNODE_M2=90 THINKNODE_M2 value
   * @property {number} T_ETH_ELITE=91 Lilygo T-ETH-Elite
   * @property {number} HELTEC_SENSOR_HUB=92 Heltec HRI-3621 industrial probe
   * @property {number} RESERVED_FRIED_CHICKEN=93 Reserved Fried Chicken ID for future use
   * @property {number} HELTEC_MESH_POCKET=94 Heltec Magnetic Power Bank with Meshtastic compatible
   * @property {number} SEEED_SOLAR_NODE=95 Seeed Solar Node
   * @property {number} NOMADSTAR_METEOR_PRO=96 NomadStar Meteor Pro https://nomadstar.ch/
   * @property {number} CROWPANEL=97 Elecrow CrowPanel Advance models, ESP32-S3 and TFT with SX1262 radio plugin
   * @property {number} LINK_32=98 Lilygo LINK32 board with sensors
   * @property {number} SEEED_WIO_TRACKER_L1=99 Seeed Tracker L1
   * @property {number} SEEED_WIO_TRACKER_L1_EINK=100 Seeed Tracker L1 EINK driver
   * @property {number} QWANTZ_TINY_ARMS=101 Reserved ID for future and past use
   * @property {number} T_DECK_PRO=102 Lilygo T-Deck Pro
   * @property {number} T_LORA_PAGER=103 Lilygo TLora Pager
   * @property {number} GAT562_MESH_TRIAL_TRACKER=104 GAT562 Mesh Trial Tracker
   * @property {number} WISMESH_TAG=105 RAKwireless WisMesh Tag
   * @property {number} RAK3312=106 RAKwireless WisBlock Core RAK3312 https://docs.rakwireless.com/product-categories/wisduo/rak3112-module/overview/
   * @property {number} THINKNODE_M5=107 Elecrow ThinkNode M5 https://www.elecrow.com/wiki/ThinkNode_M5_Meshtastic_LoRa_Signal_Transceiver_ESP32-S3.html
   * @property {number} HELTEC_MESH_SOLAR=108 MeshSolar is an integrated power management and communication solution designed for outdoor low-power devices.
   * https://heltec.org/project/meshsolar/
   * @property {number} T_ECHO_LITE=109 Lilygo T-Echo Lite
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
    values[(valuesById[24] = 'HELTEC_WIRELESS_BRIDGE')] = 24
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
    values[(valuesById[70] = 'SENSECAP_INDICATOR')] = 70
    values[(valuesById[71] = 'TRACKER_T1000_E')] = 71
    values[(valuesById[72] = 'RAK3172')] = 72
    values[(valuesById[73] = 'WIO_E5')] = 73
    values[(valuesById[74] = 'RADIOMASTER_900_BANDIT')] = 74
    values[(valuesById[75] = 'ME25LS01_4Y10TD')] = 75
    values[(valuesById[76] = 'RP2040_FEATHER_RFM95')] = 76
    values[(valuesById[77] = 'M5STACK_COREBASIC')] = 77
    values[(valuesById[78] = 'M5STACK_CORE2')] = 78
    values[(valuesById[79] = 'RPI_PICO2')] = 79
    values[(valuesById[80] = 'M5STACK_CORES3')] = 80
    values[(valuesById[81] = 'SEEED_XIAO_S3')] = 81
    values[(valuesById[82] = 'MS24SF1')] = 82
    values[(valuesById[83] = 'TLORA_C6')] = 83
    values[(valuesById[84] = 'WISMESH_TAP')] = 84
    values[(valuesById[85] = 'ROUTASTIC')] = 85
    values[(valuesById[86] = 'MESH_TAB')] = 86
    values[(valuesById[87] = 'MESHLINK')] = 87
    values[(valuesById[88] = 'XIAO_NRF52_KIT')] = 88
    values[(valuesById[89] = 'THINKNODE_M1')] = 89
    values[(valuesById[90] = 'THINKNODE_M2')] = 90
    values[(valuesById[91] = 'T_ETH_ELITE')] = 91
    values[(valuesById[92] = 'HELTEC_SENSOR_HUB')] = 92
    values[(valuesById[93] = 'RESERVED_FRIED_CHICKEN')] = 93
    values[(valuesById[94] = 'HELTEC_MESH_POCKET')] = 94
    values[(valuesById[95] = 'SEEED_SOLAR_NODE')] = 95
    values[(valuesById[96] = 'NOMADSTAR_METEOR_PRO')] = 96
    values[(valuesById[97] = 'CROWPANEL')] = 97
    values[(valuesById[98] = 'LINK_32')] = 98
    values[(valuesById[99] = 'SEEED_WIO_TRACKER_L1')] = 99
    values[(valuesById[100] = 'SEEED_WIO_TRACKER_L1_EINK')] = 100
    values[(valuesById[101] = 'QWANTZ_TINY_ARMS')] = 101
    values[(valuesById[102] = 'T_DECK_PRO')] = 102
    values[(valuesById[103] = 'T_LORA_PAGER')] = 103
    values[(valuesById[104] = 'GAT562_MESH_TRIAL_TRACKER')] = 104
    values[(valuesById[105] = 'WISMESH_TAG')] = 105
    values[(valuesById[106] = 'RAK3312')] = 106
    values[(valuesById[107] = 'THINKNODE_M5')] = 107
    values[(valuesById[108] = 'HELTEC_MESH_SOLAR')] = 108
    values[(valuesById[109] = 'T_ECHO_LITE')] = 109
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
     * @property {Uint8Array|null} [publicKey] The public key of the user's device.
     * This is sent out to other nodes on the mesh to allow them to compute a shared secret key.
     * @property {boolean|null} [isUnmessagable] Whether or not the node can be messaged
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
     * @member {string} id
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.id = ''

    /**
     * A full name for this user, i.e. "Kevin Hester"
     * @member {string} longName
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.longName = ''

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     * @member {string} shortName
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.shortName = ''

    /**
     * Deprecated in Meshtastic 2.1.x
     * This is the addr of the radio.
     * Not populated by the phone, but added by the esp32 when broadcasting
     * @member {Uint8Array} macaddr
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.macaddr = $util.newBuffer([])

    /**
     * TBEAM, HELTEC, etc...
     * Starting in 1.2.11 moved to hw_model enum in the NodeInfo object.
     * Apps will still need the string here for older builds
     * (so OTA update can find the right image), but if the enum is available it will be used instead.
     * @member {meshtastic.HardwareModel} hwModel
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.hwModel = 0

    /**
     * In some regions Ham radio operators have different bandwidth limitations than others.
     * If this user is a licensed operator, set this flag.
     * Also, "long_name" should be their licence number.
     * @member {boolean} isLicensed
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.isLicensed = false

    /**
     * Indicates that the user's role in the mesh
     * @member {meshtastic.Config.DeviceConfig.Role} role
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.role = 0

    /**
     * The public key of the user's device.
     * This is sent out to other nodes on the mesh to allow them to compute a shared secret key.
     * @member {Uint8Array} publicKey
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.publicKey = $util.newBuffer([])

    /**
     * Whether or not the node can be messaged
     * @member {boolean|null|undefined} isUnmessagable
     * @memberof meshtastic.User
     * @instance
     */
    User.prototype.isUnmessagable = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * User _isUnmessagable.
     * @member {"isUnmessagable"|undefined} _isUnmessagable
     * @memberof meshtastic.User
     * @instance
     */
    Object.defineProperty(User.prototype, '_isUnmessagable', {
      get: $util.oneOfGetter(($oneOfFields = ['isUnmessagable'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified User message. Does not implicitly {@link meshtastic.User.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.User
     * @static
     * @param {meshtastic.IUser} message User message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    User.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.id != null && Object.hasOwnProperty.call(message, 'id')) writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id)
      if (message.longName != null && Object.hasOwnProperty.call(message, 'longName'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.longName)
      if (message.shortName != null && Object.hasOwnProperty.call(message, 'shortName'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.shortName)
      if (message.macaddr != null && Object.hasOwnProperty.call(message, 'macaddr'))
        writer.uint32(/* id 4, wireType 2 =*/ 34).bytes(message.macaddr)
      if (message.hwModel != null && Object.hasOwnProperty.call(message, 'hwModel'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.hwModel)
      if (message.isLicensed != null && Object.hasOwnProperty.call(message, 'isLicensed'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.isLicensed)
      if (message.role != null && Object.hasOwnProperty.call(message, 'role')) writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.role)
      if (message.publicKey != null && Object.hasOwnProperty.call(message, 'publicKey'))
        writer.uint32(/* id 8, wireType 2 =*/ 66).bytes(message.publicKey)
      if (message.isUnmessagable != null && Object.hasOwnProperty.call(message, 'isUnmessagable'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.isUnmessagable)
      return writer
    }

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
    User.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.User()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 8: {
            message.publicKey = reader.bytes()
            break
          }
          case 9: {
            message.isUnmessagable = reader.bool()
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
     * @property {Array.<number>|null} [route] The list of nodenums this packet has visited so far to the destination.
     * @property {Array.<number>|null} [snrTowards] The list of SNRs (in dB, scaled by 4) in the route towards the destination.
     * @property {Array.<number>|null} [routeBack] The list of nodenums the packet has visited on the way back from the destination.
     * @property {Array.<number>|null} [snrBack] The list of SNRs (in dB, scaled by 4) in the route back from the destination.
     */

    /**
     * Constructs a new RouteDiscovery.
     * @memberof meshtastic
     * @classdesc A message used in a traceroute
     * @implements IRouteDiscovery
     * @constructor
     * @param {meshtastic.IRouteDiscovery=} [properties] Properties to set
     */
    function RouteDiscovery(properties) {
      this.route = []
      this.snrTowards = []
      this.routeBack = []
      this.snrBack = []
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The list of nodenums this packet has visited so far to the destination.
     * @member {Array.<number>} route
     * @memberof meshtastic.RouteDiscovery
     * @instance
     */
    RouteDiscovery.prototype.route = $util.emptyArray

    /**
     * The list of SNRs (in dB, scaled by 4) in the route towards the destination.
     * @member {Array.<number>} snrTowards
     * @memberof meshtastic.RouteDiscovery
     * @instance
     */
    RouteDiscovery.prototype.snrTowards = $util.emptyArray

    /**
     * The list of nodenums the packet has visited on the way back from the destination.
     * @member {Array.<number>} routeBack
     * @memberof meshtastic.RouteDiscovery
     * @instance
     */
    RouteDiscovery.prototype.routeBack = $util.emptyArray

    /**
     * The list of SNRs (in dB, scaled by 4) in the route back from the destination.
     * @member {Array.<number>} snrBack
     * @memberof meshtastic.RouteDiscovery
     * @instance
     */
    RouteDiscovery.prototype.snrBack = $util.emptyArray

    /**
     * Encodes the specified RouteDiscovery message. Does not implicitly {@link meshtastic.RouteDiscovery.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.RouteDiscovery
     * @static
     * @param {meshtastic.IRouteDiscovery} message RouteDiscovery message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RouteDiscovery.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.route != null && message.route.length) {
        writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        for (let i = 0; i < message.route.length; ++i) writer.fixed32(message.route[i])
        writer.ldelim()
      }
      if (message.snrTowards != null && message.snrTowards.length) {
        writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
        for (let i = 0; i < message.snrTowards.length; ++i) writer.int32(message.snrTowards[i])
        writer.ldelim()
      }
      if (message.routeBack != null && message.routeBack.length) {
        writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
        for (let i = 0; i < message.routeBack.length; ++i) writer.fixed32(message.routeBack[i])
        writer.ldelim()
      }
      if (message.snrBack != null && message.snrBack.length) {
        writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
        for (let i = 0; i < message.snrBack.length; ++i) writer.int32(message.snrBack[i])
        writer.ldelim()
      }
      return writer
    }

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
    RouteDiscovery.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.RouteDiscovery()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            if (!(message.route && message.route.length)) message.route = []
            if ((tag & 7) === 2) {
              let end2 = reader.uint32() + reader.pos
              while (reader.pos < end2) message.route.push(reader.fixed32())
            } else message.route.push(reader.fixed32())
            break
          }
          case 2: {
            if (!(message.snrTowards && message.snrTowards.length)) message.snrTowards = []
            if ((tag & 7) === 2) {
              let end2 = reader.uint32() + reader.pos
              while (reader.pos < end2) message.snrTowards.push(reader.int32())
            } else message.snrTowards.push(reader.int32())
            break
          }
          case 3: {
            if (!(message.routeBack && message.routeBack.length)) message.routeBack = []
            if ((tag & 7) === 2) {
              let end2 = reader.uint32() + reader.pos
              while (reader.pos < end2) message.routeBack.push(reader.fixed32())
            } else message.routeBack.push(reader.fixed32())
            break
          }
          case 4: {
            if (!(message.snrBack && message.snrBack.length)) message.snrBack = []
            if ((tag & 7) === 2) {
              let end2 = reader.uint32() + reader.pos
              while (reader.pos < end2) message.snrBack.push(reader.int32())
            } else message.snrBack.push(reader.int32())
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
     * Encodes the specified Routing message. Does not implicitly {@link meshtastic.Routing.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Routing
     * @static
     * @param {meshtastic.IRouting} message Routing message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Routing.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.routeRequest != null && Object.hasOwnProperty.call(message, 'routeRequest'))
        $root.meshtastic.RouteDiscovery.encode(message.routeRequest, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.routeReply != null && Object.hasOwnProperty.call(message, 'routeReply'))
        $root.meshtastic.RouteDiscovery.encode(message.routeReply, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.errorReason != null && Object.hasOwnProperty.call(message, 'errorReason'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.errorReason)
      return writer
    }

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
    Routing.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Routing()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @property {number} PKI_FAILED=34 The client specified a PKI transport, but the node was unable to send the packet using PKI (and did not send the message at all)
     * @property {number} PKI_UNKNOWN_PUBKEY=35 The receiving node does not have a Public Key to decode with
     * @property {number} ADMIN_BAD_SESSION_KEY=36 Admin packet otherwise checks out, but uses a bogus or expired session key
     * @property {number} ADMIN_PUBLIC_KEY_UNAUTHORIZED=37 Admin packet sent using PKC, but not from a public key on the admin key list
     * @property {number} RATE_LIMIT_EXCEEDED=38 Airtime fairness rate limit exceeded for a packet
     * This typically enforced per portnum and is used to prevent a single node from monopolizing airtime
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
      values[(valuesById[34] = 'PKI_FAILED')] = 34
      values[(valuesById[35] = 'PKI_UNKNOWN_PUBKEY')] = 35
      values[(valuesById[36] = 'ADMIN_BAD_SESSION_KEY')] = 36
      values[(valuesById[37] = 'ADMIN_PUBLIC_KEY_UNAUTHORIZED')] = 37
      values[(valuesById[38] = 'RATE_LIMIT_EXCEEDED')] = 38
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
     * @property {number|null} [bitfield] Bitfield for extra flags. First use is to indicate that user approves the packet being uploaded to MQTT.
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
     * @member {meshtastic.PortNum} portnum
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.portnum = 0

    /**
     * TODO: REPLACE
     * @member {Uint8Array} payload
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.payload = $util.newBuffer([])

    /**
     * Not normally used, but for testing a sender can request that recipient
     * responds in kind (i.e. if it received a position, it should unicast back it's position).
     * Note: that if you set this on a broadcast you will receive many replies.
     * @member {boolean} wantResponse
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.wantResponse = false

    /**
     * The address of the destination node.
     * This field is is filled in by the mesh radio device software, application
     * layer software should never need it.
     * RouteDiscovery messages _must_ populate this.
     * Other message types might need to if they are doing multihop routing.
     * @member {number} dest
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.dest = 0

    /**
     * The address of the original sender for this message.
     * This field should _only_ be populated for reliable multihop packets (to keep
     * packets small).
     * @member {number} source
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.source = 0

    /**
     * Only used in routing or response messages.
     * Indicates the original message ID that this message is reporting failure on. (formerly called original_id)
     * @member {number} requestId
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.requestId = 0

    /**
     * If set, this message is intened to be a reply to a previously sent message with the defined id.
     * @member {number} replyId
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.replyId = 0

    /**
     * Defaults to false. If true, then what is in the payload should be treated as an emoji like giving
     * a message a heart or poop emoji.
     * @member {number} emoji
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.emoji = 0

    /**
     * Bitfield for extra flags. First use is to indicate that user approves the packet being uploaded to MQTT.
     * @member {number|null|undefined} bitfield
     * @memberof meshtastic.Data
     * @instance
     */
    Data.prototype.bitfield = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Data _bitfield.
     * @member {"bitfield"|undefined} _bitfield
     * @memberof meshtastic.Data
     * @instance
     */
    Object.defineProperty(Data.prototype, '_bitfield', {
      get: $util.oneOfGetter(($oneOfFields = ['bitfield'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified Data message. Does not implicitly {@link meshtastic.Data.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Data
     * @static
     * @param {meshtastic.IData} message Data message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.portnum != null && Object.hasOwnProperty.call(message, 'portnum'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.portnum)
      if (message.payload != null && Object.hasOwnProperty.call(message, 'payload'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.payload)
      if (message.wantResponse != null && Object.hasOwnProperty.call(message, 'wantResponse'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.wantResponse)
      if (message.dest != null && Object.hasOwnProperty.call(message, 'dest'))
        writer.uint32(/* id 4, wireType 5 =*/ 37).fixed32(message.dest)
      if (message.source != null && Object.hasOwnProperty.call(message, 'source'))
        writer.uint32(/* id 5, wireType 5 =*/ 45).fixed32(message.source)
      if (message.requestId != null && Object.hasOwnProperty.call(message, 'requestId'))
        writer.uint32(/* id 6, wireType 5 =*/ 53).fixed32(message.requestId)
      if (message.replyId != null && Object.hasOwnProperty.call(message, 'replyId'))
        writer.uint32(/* id 7, wireType 5 =*/ 61).fixed32(message.replyId)
      if (message.emoji != null && Object.hasOwnProperty.call(message, 'emoji'))
        writer.uint32(/* id 8, wireType 5 =*/ 69).fixed32(message.emoji)
      if (message.bitfield != null && Object.hasOwnProperty.call(message, 'bitfield'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.bitfield)
      return writer
    }

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
    Data.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Data()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 9: {
            message.bitfield = reader.uint32()
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

  meshtastic.KeyVerification = (function () {
    /**
     * Properties of a KeyVerification.
     * @memberof meshtastic
     * @interface IKeyVerification
     * @property {number|Long|null} [nonce] random value Selected by the requesting node
     * @property {Uint8Array|null} [hash1] The final authoritative hash, only to be sent by NodeA at the end of the handshake
     * @property {Uint8Array|null} [hash2] The intermediary hash (actually derived from hash1),
     * sent from NodeB to NodeA in response to the initial message.
     */

    /**
     * Constructs a new KeyVerification.
     * @memberof meshtastic
     * @classdesc The actual over-the-mesh message doing KeyVerification
     * @implements IKeyVerification
     * @constructor
     * @param {meshtastic.IKeyVerification=} [properties] Properties to set
     */
    function KeyVerification(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * random value Selected by the requesting node
     * @member {number|Long} nonce
     * @memberof meshtastic.KeyVerification
     * @instance
     */
    KeyVerification.prototype.nonce = $util.Long ? $util.Long.fromBits(0, 0, true) : 0

    /**
     * The final authoritative hash, only to be sent by NodeA at the end of the handshake
     * @member {Uint8Array} hash1
     * @memberof meshtastic.KeyVerification
     * @instance
     */
    KeyVerification.prototype.hash1 = $util.newBuffer([])

    /**
     * The intermediary hash (actually derived from hash1),
     * sent from NodeB to NodeA in response to the initial message.
     * @member {Uint8Array} hash2
     * @memberof meshtastic.KeyVerification
     * @instance
     */
    KeyVerification.prototype.hash2 = $util.newBuffer([])

    /**
     * Encodes the specified KeyVerification message. Does not implicitly {@link meshtastic.KeyVerification.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.KeyVerification
     * @static
     * @param {meshtastic.IKeyVerification} message KeyVerification message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KeyVerification.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.nonce != null && Object.hasOwnProperty.call(message, 'nonce'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.nonce)
      if (message.hash1 != null && Object.hasOwnProperty.call(message, 'hash1'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.hash1)
      if (message.hash2 != null && Object.hasOwnProperty.call(message, 'hash2'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.hash2)
      return writer
    }

    /**
     * Decodes a KeyVerification message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.KeyVerification
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.KeyVerification} KeyVerification
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KeyVerification.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.KeyVerification()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.nonce = reader.uint64()
            break
          }
          case 2: {
            message.hash1 = reader.bytes()
            break
          }
          case 3: {
            message.hash2 = reader.bytes()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return KeyVerification
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
     * @member {number} id
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.id = 0

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
     * @member {number} expire
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.expire = 0

    /**
     * If greater than zero, treat the value as a nodenum only allowing them to update the waypoint.
     * If zero, the waypoint is open to be edited by any member of the mesh.
     * @member {number} lockedTo
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.lockedTo = 0

    /**
     * Name of the waypoint - max 30 chars
     * @member {string} name
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.name = ''

    /**
     * Description of the waypoint - max 100 chars
     * @member {string} description
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.description = ''

    /**
     * Designator icon for the waypoint in the form of a unicode emoji
     * @member {number} icon
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Waypoint.prototype.icon = 0

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Waypoint _latitudeI.
     * @member {"latitudeI"|undefined} _latitudeI
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Object.defineProperty(Waypoint.prototype, '_latitudeI', {
      get: $util.oneOfGetter(($oneOfFields = ['latitudeI'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Waypoint _longitudeI.
     * @member {"longitudeI"|undefined} _longitudeI
     * @memberof meshtastic.Waypoint
     * @instance
     */
    Object.defineProperty(Waypoint.prototype, '_longitudeI', {
      get: $util.oneOfGetter(($oneOfFields = ['longitudeI'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified Waypoint message. Does not implicitly {@link meshtastic.Waypoint.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Waypoint
     * @static
     * @param {meshtastic.IWaypoint} message Waypoint message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Waypoint.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.id != null && Object.hasOwnProperty.call(message, 'id')) writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.id)
      if (message.latitudeI != null && Object.hasOwnProperty.call(message, 'latitudeI'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).sfixed32(message.latitudeI)
      if (message.longitudeI != null && Object.hasOwnProperty.call(message, 'longitudeI'))
        writer.uint32(/* id 3, wireType 5 =*/ 29).sfixed32(message.longitudeI)
      if (message.expire != null && Object.hasOwnProperty.call(message, 'expire'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.expire)
      if (message.lockedTo != null && Object.hasOwnProperty.call(message, 'lockedTo'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.lockedTo)
      if (message.name != null && Object.hasOwnProperty.call(message, 'name'))
        writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.name)
      if (message.description != null && Object.hasOwnProperty.call(message, 'description'))
        writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.description)
      if (message.icon != null && Object.hasOwnProperty.call(message, 'icon'))
        writer.uint32(/* id 8, wireType 5 =*/ 69).fixed32(message.icon)
      return writer
    }

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
    Waypoint.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Waypoint()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {string} topic
     * @memberof meshtastic.MqttClientProxyMessage
     * @instance
     */
    MqttClientProxyMessage.prototype.topic = ''

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
     * @member {boolean} retained
     * @memberof meshtastic.MqttClientProxyMessage
     * @instance
     */
    MqttClientProxyMessage.prototype.retained = false

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
     * Encodes the specified MqttClientProxyMessage message. Does not implicitly {@link meshtastic.MqttClientProxyMessage.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.MqttClientProxyMessage
     * @static
     * @param {meshtastic.IMqttClientProxyMessage} message MqttClientProxyMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MqttClientProxyMessage.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.topic != null && Object.hasOwnProperty.call(message, 'topic'))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.topic)
      if (message.data != null && Object.hasOwnProperty.call(message, 'data')) writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.data)
      if (message.text != null && Object.hasOwnProperty.call(message, 'text'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.text)
      if (message.retained != null && Object.hasOwnProperty.call(message, 'retained'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.retained)
      return writer
    }

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
    MqttClientProxyMessage.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.MqttClientProxyMessage()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @property {number|null} [hopLimit] If unset treated as zero (no forwarding, send to direct neighbor nodes only)
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
     * @property {Uint8Array|null} [publicKey] Records the public key the packet was encrypted with, if applicable.
     * @property {boolean|null} [pkiEncrypted] Indicates whether the packet was en/decrypted using PKI
     * @property {number|null} [nextHop] Last byte of the node number of the node that should be used as the next hop in routing.
     * Set by the firmware internally, clients are not supposed to set this.
     * @property {number|null} [relayNode] Last byte of the node number of the node that will relay/relayed this packet.
     * Set by the firmware internally, clients are not supposed to set this.
     * @property {number|null} [txAfter] *Never* sent over the radio links.
     * Timestamp after which this packet may be sent.
     * Set by the firmware internally, clients are not supposed to set this.
     * @property {meshtastic.MeshPacket.TransportMechanism|null} [transportMechanism] Indicates which transport mechanism this packet arrived over
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
     * @member {number} from
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.from = 0

    /**
     * The (immediate) destination for this packet
     * @member {number} to
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.to = 0

    /**
     * (Usually) If set, this indicates the index in the secondary_channels table that this packet was sent/received on.
     * If unset, packet was on the primary channel.
     * A particular node might know only a subset of channels in use on the mesh.
     * Therefore channel_index is inherently a local concept and meaningless to send between nodes.
     * Very briefly, while sending and receiving deep inside the device Router code, this field instead
     * contains the 'channel hash' instead of the index.
     * This 'trick' is only used while the payload_variant is an 'encrypted'.
     * @member {number} channel
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.channel = 0

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
     * @member {number} id
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.id = 0

    /**
     * The time this message was received by the esp32 (secs since 1970).
     * Note: this field is _never_ sent on the radio link itself (to save space) Times
     * are typically not sent over the mesh, but they will be added to any Packet
     * (chain of SubPacket) sent to the phone (so the phone can know exact time of reception)
     * @member {number} rxTime
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.rxTime = 0

    /**
     * *Never* sent over the radio links.
     * Set during reception to indicate the SNR of this packet.
     * Used to collect statistics on current link quality.
     * @member {number} rxSnr
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.rxSnr = 0

    /**
     * If unset treated as zero (no forwarding, send to direct neighbor nodes only)
     * if 1, allow hopping through one node, etc...
     * For our usecase real world topologies probably have a max of about 3.
     * This field is normally placed into a few of bits in the header.
     * @member {number} hopLimit
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.hopLimit = 0

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
     * @member {boolean} wantAck
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.wantAck = false

    /**
     * The priority of this message for sending.
     * See MeshPacket.Priority description for more details.
     * @member {meshtastic.MeshPacket.Priority} priority
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.priority = 0

    /**
     * rssi of received packet. Only sent to phone for dispay purposes.
     * @member {number} rxRssi
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.rxRssi = 0

    /**
     * Describe if this message is delayed
     * @member {meshtastic.MeshPacket.Delayed} delayed
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.delayed = 0

    /**
     * Describes whether this packet passed via MQTT somewhere along the path it currently took.
     * @member {boolean} viaMqtt
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.viaMqtt = false

    /**
     * Hop limit with which the original packet started. Sent via LoRa using three bits in the unencrypted header.
     * When receiving a packet, the difference between hop_start and hop_limit gives how many hops it traveled.
     * @member {number} hopStart
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.hopStart = 0

    /**
     * Records the public key the packet was encrypted with, if applicable.
     * @member {Uint8Array} publicKey
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.publicKey = $util.newBuffer([])

    /**
     * Indicates whether the packet was en/decrypted using PKI
     * @member {boolean} pkiEncrypted
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.pkiEncrypted = false

    /**
     * Last byte of the node number of the node that should be used as the next hop in routing.
     * Set by the firmware internally, clients are not supposed to set this.
     * @member {number} nextHop
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.nextHop = 0

    /**
     * Last byte of the node number of the node that will relay/relayed this packet.
     * Set by the firmware internally, clients are not supposed to set this.
     * @member {number} relayNode
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.relayNode = 0

    /**
     * *Never* sent over the radio links.
     * Timestamp after which this packet may be sent.
     * Set by the firmware internally, clients are not supposed to set this.
     * @member {number} txAfter
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.txAfter = 0

    /**
     * Indicates which transport mechanism this packet arrived over
     * @member {meshtastic.MeshPacket.TransportMechanism} transportMechanism
     * @memberof meshtastic.MeshPacket
     * @instance
     */
    MeshPacket.prototype.transportMechanism = 0

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
     * Encodes the specified MeshPacket message. Does not implicitly {@link meshtastic.MeshPacket.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.MeshPacket
     * @static
     * @param {meshtastic.IMeshPacket} message MeshPacket message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MeshPacket.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.from != null && Object.hasOwnProperty.call(message, 'from'))
        writer.uint32(/* id 1, wireType 5 =*/ 13).fixed32(message.from)
      if (message.to != null && Object.hasOwnProperty.call(message, 'to')) writer.uint32(/* id 2, wireType 5 =*/ 21).fixed32(message.to)
      if (message.channel != null && Object.hasOwnProperty.call(message, 'channel'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.channel)
      if (message.decoded != null && Object.hasOwnProperty.call(message, 'decoded'))
        $root.meshtastic.Data.encode(message.decoded, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
      if (message.encrypted != null && Object.hasOwnProperty.call(message, 'encrypted'))
        writer.uint32(/* id 5, wireType 2 =*/ 42).bytes(message.encrypted)
      if (message.id != null && Object.hasOwnProperty.call(message, 'id')) writer.uint32(/* id 6, wireType 5 =*/ 53).fixed32(message.id)
      if (message.rxTime != null && Object.hasOwnProperty.call(message, 'rxTime'))
        writer.uint32(/* id 7, wireType 5 =*/ 61).fixed32(message.rxTime)
      if (message.rxSnr != null && Object.hasOwnProperty.call(message, 'rxSnr'))
        writer.uint32(/* id 8, wireType 5 =*/ 69).float(message.rxSnr)
      if (message.hopLimit != null && Object.hasOwnProperty.call(message, 'hopLimit'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.hopLimit)
      if (message.wantAck != null && Object.hasOwnProperty.call(message, 'wantAck'))
        writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.wantAck)
      if (message.priority != null && Object.hasOwnProperty.call(message, 'priority'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).int32(message.priority)
      if (message.rxRssi != null && Object.hasOwnProperty.call(message, 'rxRssi'))
        writer.uint32(/* id 12, wireType 0 =*/ 96).int32(message.rxRssi)
      if (message.delayed != null && Object.hasOwnProperty.call(message, 'delayed'))
        writer.uint32(/* id 13, wireType 0 =*/ 104).int32(message.delayed)
      if (message.viaMqtt != null && Object.hasOwnProperty.call(message, 'viaMqtt'))
        writer.uint32(/* id 14, wireType 0 =*/ 112).bool(message.viaMqtt)
      if (message.hopStart != null && Object.hasOwnProperty.call(message, 'hopStart'))
        writer.uint32(/* id 15, wireType 0 =*/ 120).uint32(message.hopStart)
      if (message.publicKey != null && Object.hasOwnProperty.call(message, 'publicKey'))
        writer.uint32(/* id 16, wireType 2 =*/ 130).bytes(message.publicKey)
      if (message.pkiEncrypted != null && Object.hasOwnProperty.call(message, 'pkiEncrypted'))
        writer.uint32(/* id 17, wireType 0 =*/ 136).bool(message.pkiEncrypted)
      if (message.nextHop != null && Object.hasOwnProperty.call(message, 'nextHop'))
        writer.uint32(/* id 18, wireType 0 =*/ 144).uint32(message.nextHop)
      if (message.relayNode != null && Object.hasOwnProperty.call(message, 'relayNode'))
        writer.uint32(/* id 19, wireType 0 =*/ 152).uint32(message.relayNode)
      if (message.txAfter != null && Object.hasOwnProperty.call(message, 'txAfter'))
        writer.uint32(/* id 20, wireType 0 =*/ 160).uint32(message.txAfter)
      if (message.transportMechanism != null && Object.hasOwnProperty.call(message, 'transportMechanism'))
        writer.uint32(/* id 21, wireType 0 =*/ 168).int32(message.transportMechanism)
      return writer
    }

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
    MeshPacket.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.MeshPacket()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 16: {
            message.publicKey = reader.bytes()
            break
          }
          case 17: {
            message.pkiEncrypted = reader.bool()
            break
          }
          case 18: {
            message.nextHop = reader.uint32()
            break
          }
          case 19: {
            message.relayNode = reader.uint32()
            break
          }
          case 20: {
            message.txAfter = reader.uint32()
            break
          }
          case 21: {
            message.transportMechanism = reader.int32()
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
     * @property {number} RESPONSE=80 If priority is unset but the packet is a response to a request, we want it to get there relatively quickly.
     * Furthermore, responses stop relaying packets directed to a node early.
     * @property {number} HIGH=100 Higher priority for specific message types (portnums) to distinguish between other reliable packets.
     * @property {number} ALERT=110 Higher priority alert message used for critical alerts which take priority over other reliable packets.
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
      values[(valuesById[80] = 'RESPONSE')] = 80
      values[(valuesById[100] = 'HIGH')] = 100
      values[(valuesById[110] = 'ALERT')] = 110
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

    /**
     * Enum to identify which transport mechanism this packet arrived over
     * @name meshtastic.MeshPacket.TransportMechanism
     * @enum {number}
     * @property {number} TRANSPORT_INTERNAL=0 The default case is that the node generated a packet itself
     * @property {number} TRANSPORT_LORA=1 Arrived via the primary LoRa radio
     * @property {number} TRANSPORT_LORA_ALT1=2 Arrived via a secondary LoRa radio
     * @property {number} TRANSPORT_LORA_ALT2=3 Arrived via a tertiary LoRa radio
     * @property {number} TRANSPORT_LORA_ALT3=4 Arrived via a quaternary LoRa radio
     * @property {number} TRANSPORT_MQTT=5 Arrived via an MQTT connection
     * @property {number} TRANSPORT_MULTICAST_UDP=6 Arrived via Multicast UDP
     * @property {number} TRANSPORT_API=7 Arrived via API connection
     */
    MeshPacket.TransportMechanism = (function () {
      const valuesById = {},
        values = Object.create(valuesById)
      values[(valuesById[0] = 'TRANSPORT_INTERNAL')] = 0
      values[(valuesById[1] = 'TRANSPORT_LORA')] = 1
      values[(valuesById[2] = 'TRANSPORT_LORA_ALT1')] = 2
      values[(valuesById[3] = 'TRANSPORT_LORA_ALT2')] = 3
      values[(valuesById[4] = 'TRANSPORT_LORA_ALT3')] = 4
      values[(valuesById[5] = 'TRANSPORT_MQTT')] = 5
      values[(valuesById[6] = 'TRANSPORT_MULTICAST_UDP')] = 6
      values[(valuesById[7] = 'TRANSPORT_API')] = 7
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
   * @property {number} DATA_PAYLOAD_LEN=233 From mesh.options
   * note: this payload length is ONLY the bytes that are sent inside of the Data protobuf (excluding protobuf overhead). The 16 byte header is
   * outside of this envelope
   */
  meshtastic.Constants = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'ZERO')] = 0
    values[(valuesById[233] = 'DATA_PAYLOAD_LEN')] = 233
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
     * @property {number|null} [hopsAway] Number of hops away from us this node is (0 if direct neighbor)
     * @property {boolean|null} [isFavorite] True if node is in our favorites list
     * Persists between NodeDB internal clean ups
     * @property {boolean|null} [isIgnored] True if node is in our ignored list
     * Persists between NodeDB internal clean ups
     * @property {boolean|null} [isKeyManuallyVerified] True if node public key has been verified.
     * Persists between NodeDB internal clean ups
     * LSB 0 of the bitfield
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
     * @member {number} num
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.num = 0

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
     * @member {number} snr
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.snr = 0

    /**
     * Set to indicate the last time we received a packet from this node
     * @member {number} lastHeard
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.lastHeard = 0

    /**
     * The latest device metrics for the node.
     * @member {meshtastic.IDeviceMetrics|null|undefined} deviceMetrics
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.deviceMetrics = null

    /**
     * local channel index we heard that node on. Only populated if its not the default channel.
     * @member {number} channel
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.channel = 0

    /**
     * True if we witnessed the node over MQTT instead of LoRA transport
     * @member {boolean} viaMqtt
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.viaMqtt = false

    /**
     * Number of hops away from us this node is (0 if direct neighbor)
     * @member {number|null|undefined} hopsAway
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.hopsAway = null

    /**
     * True if node is in our favorites list
     * Persists between NodeDB internal clean ups
     * @member {boolean} isFavorite
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.isFavorite = false

    /**
     * True if node is in our ignored list
     * Persists between NodeDB internal clean ups
     * @member {boolean} isIgnored
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.isIgnored = false

    /**
     * True if node public key has been verified.
     * Persists between NodeDB internal clean ups
     * LSB 0 of the bitfield
     * @member {boolean} isKeyManuallyVerified
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    NodeInfo.prototype.isKeyManuallyVerified = false

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * NodeInfo _hopsAway.
     * @member {"hopsAway"|undefined} _hopsAway
     * @memberof meshtastic.NodeInfo
     * @instance
     */
    Object.defineProperty(NodeInfo.prototype, '_hopsAway', {
      get: $util.oneOfGetter(($oneOfFields = ['hopsAway'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified NodeInfo message. Does not implicitly {@link meshtastic.NodeInfo.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.NodeInfo
     * @static
     * @param {meshtastic.INodeInfo} message NodeInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NodeInfo.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.num != null && Object.hasOwnProperty.call(message, 'num')) writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.num)
      if (message.user != null && Object.hasOwnProperty.call(message, 'user'))
        $root.meshtastic.User.encode(message.user, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.position != null && Object.hasOwnProperty.call(message, 'position'))
        $root.meshtastic.Position.encode(message.position, writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim()
      if (message.snr != null && Object.hasOwnProperty.call(message, 'snr')) writer.uint32(/* id 4, wireType 5 =*/ 37).float(message.snr)
      if (message.lastHeard != null && Object.hasOwnProperty.call(message, 'lastHeard'))
        writer.uint32(/* id 5, wireType 5 =*/ 45).fixed32(message.lastHeard)
      if (message.deviceMetrics != null && Object.hasOwnProperty.call(message, 'deviceMetrics'))
        $root.meshtastic.DeviceMetrics.encode(message.deviceMetrics, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim()
      if (message.channel != null && Object.hasOwnProperty.call(message, 'channel'))
        writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.channel)
      if (message.viaMqtt != null && Object.hasOwnProperty.call(message, 'viaMqtt'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.viaMqtt)
      if (message.hopsAway != null && Object.hasOwnProperty.call(message, 'hopsAway'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.hopsAway)
      if (message.isFavorite != null && Object.hasOwnProperty.call(message, 'isFavorite'))
        writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.isFavorite)
      if (message.isIgnored != null && Object.hasOwnProperty.call(message, 'isIgnored'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.isIgnored)
      if (message.isKeyManuallyVerified != null && Object.hasOwnProperty.call(message, 'isKeyManuallyVerified'))
        writer.uint32(/* id 12, wireType 0 =*/ 96).bool(message.isKeyManuallyVerified)
      return writer
    }

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
    NodeInfo.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.NodeInfo()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 11: {
            message.isIgnored = reader.bool()
            break
          }
          case 12: {
            message.isKeyManuallyVerified = reader.bool()
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
   * @property {number} FLASH_CORRUPTION_RECOVERABLE=12 Corruption was detected on the flash filesystem but we were able to repair things.
   * If you see this failure in the field please post in the forum because we are interested in seeing if this is occurring in the field.
   * @property {number} FLASH_CORRUPTION_UNRECOVERABLE=13 Corruption was detected on the flash filesystem but we were unable to repair things.
   * NOTE: Your node will probably need to be reconfigured the next time it reboots (it will lose the region code etc...)
   * If you see this failure in the field please post in the forum because we are interested in seeing if this is occurring in the field.
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
    values[(valuesById[12] = 'FLASH_CORRUPTION_RECOVERABLE')] = 12
    values[(valuesById[13] = 'FLASH_CORRUPTION_UNRECOVERABLE')] = 13
    return values
  })()

  /**
   * Enum to indicate to clients whether this firmware is a special firmware build, like an event.
   * The first 16 values are reserved for non-event special firmwares, like the Smart Citizen use case.
   * @name meshtastic.FirmwareEdition
   * @enum {number}
   * @property {number} VANILLA=0 Vanilla firmware
   * @property {number} SMART_CITIZEN=1 Firmware for use in the Smart Citizen environmental monitoring network
   * @property {number} OPEN_SAUCE=16 Open Sauce, the maker conference held yearly in CA
   * @property {number} DEFCON=17 DEFCON, the yearly hacker conference
   * @property {number} BURNING_MAN=18 Burning Man, the yearly hippie gathering in the desert
   * @property {number} HAMVENTION=19 Hamvention, the Dayton amateur radio convention
   * @property {number} DIY_EDITION=127 Placeholder for DIY and unofficial events
   */
  meshtastic.FirmwareEdition = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'VANILLA')] = 0
    values[(valuesById[1] = 'SMART_CITIZEN')] = 1
    values[(valuesById[16] = 'OPEN_SAUCE')] = 16
    values[(valuesById[17] = 'DEFCON')] = 17
    values[(valuesById[18] = 'BURNING_MAN')] = 18
    values[(valuesById[19] = 'HAMVENTION')] = 19
    values[(valuesById[127] = 'DIY_EDITION')] = 127
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
     * @property {Uint8Array|null} [deviceId] Unique hardware identifier for this device
     * @property {string|null} [pioEnv] The PlatformIO environment used to build this firmware
     * @property {meshtastic.FirmwareEdition|null} [firmwareEdition] The indicator for whether this device is running event firmware and which
     * @property {number|null} [nodedbCount] The number of nodes in the nodedb.
     * This is used by the phone to know how many NodeInfo packets to expect on want_config
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
     * @member {number} myNodeNum
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.myNodeNum = 0

    /**
     * The total number of reboots this node has ever encountered
     * (well - since the last time we discarded preferences)
     * @member {number} rebootCount
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.rebootCount = 0

    /**
     * The minimum app version that can talk to this device.
     * Phone/PC apps should compare this to their build number and if too low tell the user they must update their app
     * @member {number} minAppVersion
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.minAppVersion = 0

    /**
     * Unique hardware identifier for this device
     * @member {Uint8Array} deviceId
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.deviceId = $util.newBuffer([])

    /**
     * The PlatformIO environment used to build this firmware
     * @member {string} pioEnv
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.pioEnv = ''

    /**
     * The indicator for whether this device is running event firmware and which
     * @member {meshtastic.FirmwareEdition} firmwareEdition
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.firmwareEdition = 0

    /**
     * The number of nodes in the nodedb.
     * This is used by the phone to know how many NodeInfo packets to expect on want_config
     * @member {number} nodedbCount
     * @memberof meshtastic.MyNodeInfo
     * @instance
     */
    MyNodeInfo.prototype.nodedbCount = 0

    /**
     * Encodes the specified MyNodeInfo message. Does not implicitly {@link meshtastic.MyNodeInfo.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.MyNodeInfo
     * @static
     * @param {meshtastic.IMyNodeInfo} message MyNodeInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyNodeInfo.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.myNodeNum != null && Object.hasOwnProperty.call(message, 'myNodeNum'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.myNodeNum)
      if (message.rebootCount != null && Object.hasOwnProperty.call(message, 'rebootCount'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.rebootCount)
      if (message.minAppVersion != null && Object.hasOwnProperty.call(message, 'minAppVersion'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).uint32(message.minAppVersion)
      if (message.deviceId != null && Object.hasOwnProperty.call(message, 'deviceId'))
        writer.uint32(/* id 12, wireType 2 =*/ 98).bytes(message.deviceId)
      if (message.pioEnv != null && Object.hasOwnProperty.call(message, 'pioEnv'))
        writer.uint32(/* id 13, wireType 2 =*/ 106).string(message.pioEnv)
      if (message.firmwareEdition != null && Object.hasOwnProperty.call(message, 'firmwareEdition'))
        writer.uint32(/* id 14, wireType 0 =*/ 112).int32(message.firmwareEdition)
      if (message.nodedbCount != null && Object.hasOwnProperty.call(message, 'nodedbCount'))
        writer.uint32(/* id 15, wireType 0 =*/ 120).uint32(message.nodedbCount)
      return writer
    }

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
    MyNodeInfo.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.MyNodeInfo()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 12: {
            message.deviceId = reader.bytes()
            break
          }
          case 13: {
            message.pioEnv = reader.string()
            break
          }
          case 14: {
            message.firmwareEdition = reader.int32()
            break
          }
          case 15: {
            message.nodedbCount = reader.uint32()
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
     * @member {string} message
     * @memberof meshtastic.LogRecord
     * @instance
     */
    LogRecord.prototype.message = ''

    /**
     * Seconds since 1970 - or 0 for unknown/unset
     * @member {number} time
     * @memberof meshtastic.LogRecord
     * @instance
     */
    LogRecord.prototype.time = 0

    /**
     * Usually based on thread name - if known
     * @member {string} source
     * @memberof meshtastic.LogRecord
     * @instance
     */
    LogRecord.prototype.source = ''

    /**
     * Not yet set
     * @member {meshtastic.LogRecord.Level} level
     * @memberof meshtastic.LogRecord
     * @instance
     */
    LogRecord.prototype.level = 0

    /**
     * Encodes the specified LogRecord message. Does not implicitly {@link meshtastic.LogRecord.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.LogRecord
     * @static
     * @param {meshtastic.ILogRecord} message LogRecord message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LogRecord.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.message != null && Object.hasOwnProperty.call(message, 'message'))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.message)
      if (message.time != null && Object.hasOwnProperty.call(message, 'time'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).fixed32(message.time)
      if (message.source != null && Object.hasOwnProperty.call(message, 'source'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.source)
      if (message.level != null && Object.hasOwnProperty.call(message, 'level'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.level)
      return writer
    }

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
    LogRecord.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.LogRecord()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {number} res
     * @memberof meshtastic.QueueStatus
     * @instance
     */
    QueueStatus.prototype.res = 0

    /**
     * Free entries in the outgoing queue
     * @member {number} free
     * @memberof meshtastic.QueueStatus
     * @instance
     */
    QueueStatus.prototype.free = 0

    /**
     * Maximum entries in the outgoing queue
     * @member {number} maxlen
     * @memberof meshtastic.QueueStatus
     * @instance
     */
    QueueStatus.prototype.maxlen = 0

    /**
     * What was mesh packet id that generated this response?
     * @member {number} meshPacketId
     * @memberof meshtastic.QueueStatus
     * @instance
     */
    QueueStatus.prototype.meshPacketId = 0

    /**
     * Encodes the specified QueueStatus message. Does not implicitly {@link meshtastic.QueueStatus.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.QueueStatus
     * @static
     * @param {meshtastic.IQueueStatus} message QueueStatus message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    QueueStatus.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.res != null && Object.hasOwnProperty.call(message, 'res')) writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.res)
      if (message.free != null && Object.hasOwnProperty.call(message, 'free'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.free)
      if (message.maxlen != null && Object.hasOwnProperty.call(message, 'maxlen'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.maxlen)
      if (message.meshPacketId != null && Object.hasOwnProperty.call(message, 'meshPacketId'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.meshPacketId)
      return writer
    }

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
    QueueStatus.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.QueueStatus()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @property {meshtastic.IClientNotification|null} [clientNotification] Notification message to the client
     * @property {meshtastic.IDeviceUIConfig|null} [deviceuiConfig] Persistent data for device-ui
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
     * @member {number} id
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.id = 0

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

    /**
     * Notification message to the client
     * @member {meshtastic.IClientNotification|null|undefined} clientNotification
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.clientNotification = null

    /**
     * Persistent data for device-ui
     * @member {meshtastic.IDeviceUIConfig|null|undefined} deviceuiConfig
     * @memberof meshtastic.FromRadio
     * @instance
     */
    FromRadio.prototype.deviceuiConfig = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Log levels, chosen to match python logging conventions.
     * @member {"packet"|"myInfo"|"nodeInfo"|"config"|"logRecord"|"configCompleteId"|"rebooted"|"moduleConfig"|"channel"|"queueStatus"|"xmodemPacket"|"metadata"|"mqttClientProxyMessage"|"fileInfo"|"clientNotification"|"deviceuiConfig"|undefined} payloadVariant
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
          'clientNotification',
          'deviceuiConfig',
        ])
      ),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified FromRadio message. Does not implicitly {@link meshtastic.FromRadio.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.FromRadio
     * @static
     * @param {meshtastic.IFromRadio} message FromRadio message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FromRadio.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.id != null && Object.hasOwnProperty.call(message, 'id')) writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.id)
      if (message.packet != null && Object.hasOwnProperty.call(message, 'packet'))
        $root.meshtastic.MeshPacket.encode(message.packet, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.myInfo != null && Object.hasOwnProperty.call(message, 'myInfo'))
        $root.meshtastic.MyNodeInfo.encode(message.myInfo, writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim()
      if (message.nodeInfo != null && Object.hasOwnProperty.call(message, 'nodeInfo'))
        $root.meshtastic.NodeInfo.encode(message.nodeInfo, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
      if (message.config != null && Object.hasOwnProperty.call(message, 'config'))
        $root.meshtastic.Config.encode(message.config, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim()
      if (message.logRecord != null && Object.hasOwnProperty.call(message, 'logRecord'))
        $root.meshtastic.LogRecord.encode(message.logRecord, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim()
      if (message.configCompleteId != null && Object.hasOwnProperty.call(message, 'configCompleteId'))
        writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.configCompleteId)
      if (message.rebooted != null && Object.hasOwnProperty.call(message, 'rebooted'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.rebooted)
      if (message.moduleConfig != null && Object.hasOwnProperty.call(message, 'moduleConfig'))
        $root.meshtastic.ModuleConfig.encode(message.moduleConfig, writer.uint32(/* id 9, wireType 2 =*/ 74).fork()).ldelim()
      if (message.channel != null && Object.hasOwnProperty.call(message, 'channel'))
        $root.meshtastic.Channel.encode(message.channel, writer.uint32(/* id 10, wireType 2 =*/ 82).fork()).ldelim()
      if (message.queueStatus != null && Object.hasOwnProperty.call(message, 'queueStatus'))
        $root.meshtastic.QueueStatus.encode(message.queueStatus, writer.uint32(/* id 11, wireType 2 =*/ 90).fork()).ldelim()
      if (message.xmodemPacket != null && Object.hasOwnProperty.call(message, 'xmodemPacket'))
        $root.meshtastic.XModem.encode(message.xmodemPacket, writer.uint32(/* id 12, wireType 2 =*/ 98).fork()).ldelim()
      if (message.metadata != null && Object.hasOwnProperty.call(message, 'metadata'))
        $root.meshtastic.DeviceMetadata.encode(message.metadata, writer.uint32(/* id 13, wireType 2 =*/ 106).fork()).ldelim()
      if (message.mqttClientProxyMessage != null && Object.hasOwnProperty.call(message, 'mqttClientProxyMessage'))
        $root.meshtastic.MqttClientProxyMessage.encode(
          message.mqttClientProxyMessage,
          writer.uint32(/* id 14, wireType 2 =*/ 114).fork()
        ).ldelim()
      if (message.fileInfo != null && Object.hasOwnProperty.call(message, 'fileInfo'))
        $root.meshtastic.FileInfo.encode(message.fileInfo, writer.uint32(/* id 15, wireType 2 =*/ 122).fork()).ldelim()
      if (message.clientNotification != null && Object.hasOwnProperty.call(message, 'clientNotification'))
        $root.meshtastic.ClientNotification.encode(message.clientNotification, writer.uint32(/* id 16, wireType 2 =*/ 130).fork()).ldelim()
      if (message.deviceuiConfig != null && Object.hasOwnProperty.call(message, 'deviceuiConfig'))
        $root.meshtastic.DeviceUIConfig.encode(message.deviceuiConfig, writer.uint32(/* id 17, wireType 2 =*/ 138).fork()).ldelim()
      return writer
    }

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
    FromRadio.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.FromRadio()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 16: {
            message.clientNotification = $root.meshtastic.ClientNotification.decode(reader, reader.uint32())
            break
          }
          case 17: {
            message.deviceuiConfig = $root.meshtastic.DeviceUIConfig.decode(reader, reader.uint32())
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

  meshtastic.ClientNotification = (function () {
    /**
     * Properties of a ClientNotification.
     * @memberof meshtastic
     * @interface IClientNotification
     * @property {number|null} [replyId] The id of the packet we're notifying in response to
     * @property {number|null} [time] Seconds since 1970 - or 0 for unknown/unset
     * @property {meshtastic.LogRecord.Level|null} [level] The level type of notification
     * @property {string|null} [message] The message body of the notification
     * @property {meshtastic.IKeyVerificationNumberInform|null} [keyVerificationNumberInform] ClientNotification keyVerificationNumberInform
     * @property {meshtastic.IKeyVerificationNumberRequest|null} [keyVerificationNumberRequest] ClientNotification keyVerificationNumberRequest
     * @property {meshtastic.IKeyVerificationFinal|null} [keyVerificationFinal] ClientNotification keyVerificationFinal
     * @property {meshtastic.IDuplicatedPublicKey|null} [duplicatedPublicKey] ClientNotification duplicatedPublicKey
     * @property {meshtastic.ILowEntropyKey|null} [lowEntropyKey] ClientNotification lowEntropyKey
     */

    /**
     * Constructs a new ClientNotification.
     * @memberof meshtastic
     * @classdesc A notification message from the device to the client
     * To be used for important messages that should to be displayed to the user
     * in the form of push notifications or validation messages when saving
     * invalid configuration.
     * @implements IClientNotification
     * @constructor
     * @param {meshtastic.IClientNotification=} [properties] Properties to set
     */
    function ClientNotification(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The id of the packet we're notifying in response to
     * @member {number|null|undefined} replyId
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.replyId = null

    /**
     * Seconds since 1970 - or 0 for unknown/unset
     * @member {number} time
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.time = 0

    /**
     * The level type of notification
     * @member {meshtastic.LogRecord.Level} level
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.level = 0

    /**
     * The message body of the notification
     * @member {string} message
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.message = ''

    /**
     * ClientNotification keyVerificationNumberInform.
     * @member {meshtastic.IKeyVerificationNumberInform|null|undefined} keyVerificationNumberInform
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.keyVerificationNumberInform = null

    /**
     * ClientNotification keyVerificationNumberRequest.
     * @member {meshtastic.IKeyVerificationNumberRequest|null|undefined} keyVerificationNumberRequest
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.keyVerificationNumberRequest = null

    /**
     * ClientNotification keyVerificationFinal.
     * @member {meshtastic.IKeyVerificationFinal|null|undefined} keyVerificationFinal
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.keyVerificationFinal = null

    /**
     * ClientNotification duplicatedPublicKey.
     * @member {meshtastic.IDuplicatedPublicKey|null|undefined} duplicatedPublicKey
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.duplicatedPublicKey = null

    /**
     * ClientNotification lowEntropyKey.
     * @member {meshtastic.ILowEntropyKey|null|undefined} lowEntropyKey
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    ClientNotification.prototype.lowEntropyKey = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * ClientNotification _replyId.
     * @member {"replyId"|undefined} _replyId
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    Object.defineProperty(ClientNotification.prototype, '_replyId', {
      get: $util.oneOfGetter(($oneOfFields = ['replyId'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * ClientNotification payloadVariant.
     * @member {"keyVerificationNumberInform"|"keyVerificationNumberRequest"|"keyVerificationFinal"|"duplicatedPublicKey"|"lowEntropyKey"|undefined} payloadVariant
     * @memberof meshtastic.ClientNotification
     * @instance
     */
    Object.defineProperty(ClientNotification.prototype, 'payloadVariant', {
      get: $util.oneOfGetter(
        ($oneOfFields = [
          'keyVerificationNumberInform',
          'keyVerificationNumberRequest',
          'keyVerificationFinal',
          'duplicatedPublicKey',
          'lowEntropyKey',
        ])
      ),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified ClientNotification message. Does not implicitly {@link meshtastic.ClientNotification.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ClientNotification
     * @static
     * @param {meshtastic.IClientNotification} message ClientNotification message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientNotification.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.replyId != null && Object.hasOwnProperty.call(message, 'replyId'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.replyId)
      if (message.time != null && Object.hasOwnProperty.call(message, 'time'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).fixed32(message.time)
      if (message.level != null && Object.hasOwnProperty.call(message, 'level'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.level)
      if (message.message != null && Object.hasOwnProperty.call(message, 'message'))
        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.message)
      if (message.keyVerificationNumberInform != null && Object.hasOwnProperty.call(message, 'keyVerificationNumberInform'))
        $root.meshtastic.KeyVerificationNumberInform.encode(
          message.keyVerificationNumberInform,
          writer.uint32(/* id 11, wireType 2 =*/ 90).fork()
        ).ldelim()
      if (message.keyVerificationNumberRequest != null && Object.hasOwnProperty.call(message, 'keyVerificationNumberRequest'))
        $root.meshtastic.KeyVerificationNumberRequest.encode(
          message.keyVerificationNumberRequest,
          writer.uint32(/* id 12, wireType 2 =*/ 98).fork()
        ).ldelim()
      if (message.keyVerificationFinal != null && Object.hasOwnProperty.call(message, 'keyVerificationFinal'))
        $root.meshtastic.KeyVerificationFinal.encode(
          message.keyVerificationFinal,
          writer.uint32(/* id 13, wireType 2 =*/ 106).fork()
        ).ldelim()
      if (message.duplicatedPublicKey != null && Object.hasOwnProperty.call(message, 'duplicatedPublicKey'))
        $root.meshtastic.DuplicatedPublicKey.encode(
          message.duplicatedPublicKey,
          writer.uint32(/* id 14, wireType 2 =*/ 114).fork()
        ).ldelim()
      if (message.lowEntropyKey != null && Object.hasOwnProperty.call(message, 'lowEntropyKey'))
        $root.meshtastic.LowEntropyKey.encode(message.lowEntropyKey, writer.uint32(/* id 15, wireType 2 =*/ 122).fork()).ldelim()
      return writer
    }

    /**
     * Decodes a ClientNotification message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ClientNotification
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ClientNotification} ClientNotification
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientNotification.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ClientNotification()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.replyId = reader.uint32()
            break
          }
          case 2: {
            message.time = reader.fixed32()
            break
          }
          case 3: {
            message.level = reader.int32()
            break
          }
          case 4: {
            message.message = reader.string()
            break
          }
          case 11: {
            message.keyVerificationNumberInform = $root.meshtastic.KeyVerificationNumberInform.decode(reader, reader.uint32())
            break
          }
          case 12: {
            message.keyVerificationNumberRequest = $root.meshtastic.KeyVerificationNumberRequest.decode(reader, reader.uint32())
            break
          }
          case 13: {
            message.keyVerificationFinal = $root.meshtastic.KeyVerificationFinal.decode(reader, reader.uint32())
            break
          }
          case 14: {
            message.duplicatedPublicKey = $root.meshtastic.DuplicatedPublicKey.decode(reader, reader.uint32())
            break
          }
          case 15: {
            message.lowEntropyKey = $root.meshtastic.LowEntropyKey.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return ClientNotification
  })()

  meshtastic.KeyVerificationNumberInform = (function () {
    /**
     * Properties of a KeyVerificationNumberInform.
     * @memberof meshtastic
     * @interface IKeyVerificationNumberInform
     * @property {number|Long|null} [nonce] KeyVerificationNumberInform nonce
     * @property {string|null} [remoteLongname] KeyVerificationNumberInform remoteLongname
     * @property {number|null} [securityNumber] KeyVerificationNumberInform securityNumber
     */

    /**
     * Constructs a new KeyVerificationNumberInform.
     * @memberof meshtastic
     * @classdesc Represents a KeyVerificationNumberInform.
     * @implements IKeyVerificationNumberInform
     * @constructor
     * @param {meshtastic.IKeyVerificationNumberInform=} [properties] Properties to set
     */
    function KeyVerificationNumberInform(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * KeyVerificationNumberInform nonce.
     * @member {number|Long} nonce
     * @memberof meshtastic.KeyVerificationNumberInform
     * @instance
     */
    KeyVerificationNumberInform.prototype.nonce = $util.Long ? $util.Long.fromBits(0, 0, true) : 0

    /**
     * KeyVerificationNumberInform remoteLongname.
     * @member {string} remoteLongname
     * @memberof meshtastic.KeyVerificationNumberInform
     * @instance
     */
    KeyVerificationNumberInform.prototype.remoteLongname = ''

    /**
     * KeyVerificationNumberInform securityNumber.
     * @member {number} securityNumber
     * @memberof meshtastic.KeyVerificationNumberInform
     * @instance
     */
    KeyVerificationNumberInform.prototype.securityNumber = 0

    /**
     * Encodes the specified KeyVerificationNumberInform message. Does not implicitly {@link meshtastic.KeyVerificationNumberInform.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.KeyVerificationNumberInform
     * @static
     * @param {meshtastic.IKeyVerificationNumberInform} message KeyVerificationNumberInform message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KeyVerificationNumberInform.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.nonce != null && Object.hasOwnProperty.call(message, 'nonce'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.nonce)
      if (message.remoteLongname != null && Object.hasOwnProperty.call(message, 'remoteLongname'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.remoteLongname)
      if (message.securityNumber != null && Object.hasOwnProperty.call(message, 'securityNumber'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.securityNumber)
      return writer
    }

    /**
     * Decodes a KeyVerificationNumberInform message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.KeyVerificationNumberInform
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.KeyVerificationNumberInform} KeyVerificationNumberInform
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KeyVerificationNumberInform.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.KeyVerificationNumberInform()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.nonce = reader.uint64()
            break
          }
          case 2: {
            message.remoteLongname = reader.string()
            break
          }
          case 3: {
            message.securityNumber = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return KeyVerificationNumberInform
  })()

  meshtastic.KeyVerificationNumberRequest = (function () {
    /**
     * Properties of a KeyVerificationNumberRequest.
     * @memberof meshtastic
     * @interface IKeyVerificationNumberRequest
     * @property {number|Long|null} [nonce] KeyVerificationNumberRequest nonce
     * @property {string|null} [remoteLongname] KeyVerificationNumberRequest remoteLongname
     */

    /**
     * Constructs a new KeyVerificationNumberRequest.
     * @memberof meshtastic
     * @classdesc Represents a KeyVerificationNumberRequest.
     * @implements IKeyVerificationNumberRequest
     * @constructor
     * @param {meshtastic.IKeyVerificationNumberRequest=} [properties] Properties to set
     */
    function KeyVerificationNumberRequest(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * KeyVerificationNumberRequest nonce.
     * @member {number|Long} nonce
     * @memberof meshtastic.KeyVerificationNumberRequest
     * @instance
     */
    KeyVerificationNumberRequest.prototype.nonce = $util.Long ? $util.Long.fromBits(0, 0, true) : 0

    /**
     * KeyVerificationNumberRequest remoteLongname.
     * @member {string} remoteLongname
     * @memberof meshtastic.KeyVerificationNumberRequest
     * @instance
     */
    KeyVerificationNumberRequest.prototype.remoteLongname = ''

    /**
     * Encodes the specified KeyVerificationNumberRequest message. Does not implicitly {@link meshtastic.KeyVerificationNumberRequest.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.KeyVerificationNumberRequest
     * @static
     * @param {meshtastic.IKeyVerificationNumberRequest} message KeyVerificationNumberRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KeyVerificationNumberRequest.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.nonce != null && Object.hasOwnProperty.call(message, 'nonce'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.nonce)
      if (message.remoteLongname != null && Object.hasOwnProperty.call(message, 'remoteLongname'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.remoteLongname)
      return writer
    }

    /**
     * Decodes a KeyVerificationNumberRequest message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.KeyVerificationNumberRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.KeyVerificationNumberRequest} KeyVerificationNumberRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KeyVerificationNumberRequest.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.KeyVerificationNumberRequest()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.nonce = reader.uint64()
            break
          }
          case 2: {
            message.remoteLongname = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return KeyVerificationNumberRequest
  })()

  meshtastic.KeyVerificationFinal = (function () {
    /**
     * Properties of a KeyVerificationFinal.
     * @memberof meshtastic
     * @interface IKeyVerificationFinal
     * @property {number|Long|null} [nonce] KeyVerificationFinal nonce
     * @property {string|null} [remoteLongname] KeyVerificationFinal remoteLongname
     * @property {boolean|null} [isSender] KeyVerificationFinal isSender
     * @property {string|null} [verificationCharacters] KeyVerificationFinal verificationCharacters
     */

    /**
     * Constructs a new KeyVerificationFinal.
     * @memberof meshtastic
     * @classdesc Represents a KeyVerificationFinal.
     * @implements IKeyVerificationFinal
     * @constructor
     * @param {meshtastic.IKeyVerificationFinal=} [properties] Properties to set
     */
    function KeyVerificationFinal(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * KeyVerificationFinal nonce.
     * @member {number|Long} nonce
     * @memberof meshtastic.KeyVerificationFinal
     * @instance
     */
    KeyVerificationFinal.prototype.nonce = $util.Long ? $util.Long.fromBits(0, 0, true) : 0

    /**
     * KeyVerificationFinal remoteLongname.
     * @member {string} remoteLongname
     * @memberof meshtastic.KeyVerificationFinal
     * @instance
     */
    KeyVerificationFinal.prototype.remoteLongname = ''

    /**
     * KeyVerificationFinal isSender.
     * @member {boolean} isSender
     * @memberof meshtastic.KeyVerificationFinal
     * @instance
     */
    KeyVerificationFinal.prototype.isSender = false

    /**
     * KeyVerificationFinal verificationCharacters.
     * @member {string} verificationCharacters
     * @memberof meshtastic.KeyVerificationFinal
     * @instance
     */
    KeyVerificationFinal.prototype.verificationCharacters = ''

    /**
     * Encodes the specified KeyVerificationFinal message. Does not implicitly {@link meshtastic.KeyVerificationFinal.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.KeyVerificationFinal
     * @static
     * @param {meshtastic.IKeyVerificationFinal} message KeyVerificationFinal message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KeyVerificationFinal.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.nonce != null && Object.hasOwnProperty.call(message, 'nonce'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint64(message.nonce)
      if (message.remoteLongname != null && Object.hasOwnProperty.call(message, 'remoteLongname'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.remoteLongname)
      if (message.isSender != null && Object.hasOwnProperty.call(message, 'isSender'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.isSender)
      if (message.verificationCharacters != null && Object.hasOwnProperty.call(message, 'verificationCharacters'))
        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.verificationCharacters)
      return writer
    }

    /**
     * Decodes a KeyVerificationFinal message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.KeyVerificationFinal
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.KeyVerificationFinal} KeyVerificationFinal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KeyVerificationFinal.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.KeyVerificationFinal()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.nonce = reader.uint64()
            break
          }
          case 2: {
            message.remoteLongname = reader.string()
            break
          }
          case 3: {
            message.isSender = reader.bool()
            break
          }
          case 4: {
            message.verificationCharacters = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return KeyVerificationFinal
  })()

  meshtastic.DuplicatedPublicKey = (function () {
    /**
     * Properties of a DuplicatedPublicKey.
     * @memberof meshtastic
     * @interface IDuplicatedPublicKey
     */

    /**
     * Constructs a new DuplicatedPublicKey.
     * @memberof meshtastic
     * @classdesc Represents a DuplicatedPublicKey.
     * @implements IDuplicatedPublicKey
     * @constructor
     * @param {meshtastic.IDuplicatedPublicKey=} [properties] Properties to set
     */
    function DuplicatedPublicKey(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Encodes the specified DuplicatedPublicKey message. Does not implicitly {@link meshtastic.DuplicatedPublicKey.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.DuplicatedPublicKey
     * @static
     * @param {meshtastic.IDuplicatedPublicKey} message DuplicatedPublicKey message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DuplicatedPublicKey.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      return writer
    }

    /**
     * Decodes a DuplicatedPublicKey message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.DuplicatedPublicKey
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.DuplicatedPublicKey} DuplicatedPublicKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DuplicatedPublicKey.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.DuplicatedPublicKey()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return DuplicatedPublicKey
  })()

  meshtastic.LowEntropyKey = (function () {
    /**
     * Properties of a LowEntropyKey.
     * @memberof meshtastic
     * @interface ILowEntropyKey
     */

    /**
     * Constructs a new LowEntropyKey.
     * @memberof meshtastic
     * @classdesc Represents a LowEntropyKey.
     * @implements ILowEntropyKey
     * @constructor
     * @param {meshtastic.ILowEntropyKey=} [properties] Properties to set
     */
    function LowEntropyKey(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Encodes the specified LowEntropyKey message. Does not implicitly {@link meshtastic.LowEntropyKey.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.LowEntropyKey
     * @static
     * @param {meshtastic.ILowEntropyKey} message LowEntropyKey message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LowEntropyKey.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      return writer
    }

    /**
     * Decodes a LowEntropyKey message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.LowEntropyKey
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.LowEntropyKey} LowEntropyKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LowEntropyKey.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.LowEntropyKey()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return LowEntropyKey
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
     * @member {string} fileName
     * @memberof meshtastic.FileInfo
     * @instance
     */
    FileInfo.prototype.fileName = ''

    /**
     * The size of the file in bytes
     * @member {number} sizeBytes
     * @memberof meshtastic.FileInfo
     * @instance
     */
    FileInfo.prototype.sizeBytes = 0

    /**
     * Encodes the specified FileInfo message. Does not implicitly {@link meshtastic.FileInfo.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.FileInfo
     * @static
     * @param {meshtastic.IFileInfo} message FileInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FileInfo.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.fileName != null && Object.hasOwnProperty.call(message, 'fileName'))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.fileName)
      if (message.sizeBytes != null && Object.hasOwnProperty.call(message, 'sizeBytes'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.sizeBytes)
      return writer
    }

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
    FileInfo.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.FileInfo()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * Encodes the specified ToRadio message. Does not implicitly {@link meshtastic.ToRadio.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ToRadio
     * @static
     * @param {meshtastic.IToRadio} message ToRadio message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ToRadio.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.packet != null && Object.hasOwnProperty.call(message, 'packet'))
        $root.meshtastic.MeshPacket.encode(message.packet, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.wantConfigId != null && Object.hasOwnProperty.call(message, 'wantConfigId'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.wantConfigId)
      if (message.disconnect != null && Object.hasOwnProperty.call(message, 'disconnect'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.disconnect)
      if (message.xmodemPacket != null && Object.hasOwnProperty.call(message, 'xmodemPacket'))
        $root.meshtastic.XModem.encode(message.xmodemPacket, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim()
      if (message.mqttClientProxyMessage != null && Object.hasOwnProperty.call(message, 'mqttClientProxyMessage'))
        $root.meshtastic.MqttClientProxyMessage.encode(
          message.mqttClientProxyMessage,
          writer.uint32(/* id 6, wireType 2 =*/ 50).fork()
        ).ldelim()
      if (message.heartbeat != null && Object.hasOwnProperty.call(message, 'heartbeat'))
        $root.meshtastic.Heartbeat.encode(message.heartbeat, writer.uint32(/* id 7, wireType 2 =*/ 58).fork()).ldelim()
      return writer
    }

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
    ToRadio.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ToRadio()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {meshtastic.PortNum} portnum
     * @memberof meshtastic.Compressed
     * @instance
     */
    Compressed.prototype.portnum = 0

    /**
     * Compressed data.
     * @member {Uint8Array} data
     * @memberof meshtastic.Compressed
     * @instance
     */
    Compressed.prototype.data = $util.newBuffer([])

    /**
     * Encodes the specified Compressed message. Does not implicitly {@link meshtastic.Compressed.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Compressed
     * @static
     * @param {meshtastic.ICompressed} message Compressed message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Compressed.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.portnum != null && Object.hasOwnProperty.call(message, 'portnum'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.portnum)
      if (message.data != null && Object.hasOwnProperty.call(message, 'data')) writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.data)
      return writer
    }

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
    Compressed.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Compressed()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {number} nodeId
     * @memberof meshtastic.NeighborInfo
     * @instance
     */
    NeighborInfo.prototype.nodeId = 0

    /**
     * Field to pass neighbor info for the next sending cycle
     * @member {number} lastSentById
     * @memberof meshtastic.NeighborInfo
     * @instance
     */
    NeighborInfo.prototype.lastSentById = 0

    /**
     * Broadcast interval of the represented node (in seconds)
     * @member {number} nodeBroadcastIntervalSecs
     * @memberof meshtastic.NeighborInfo
     * @instance
     */
    NeighborInfo.prototype.nodeBroadcastIntervalSecs = 0

    /**
     * The list of out edges from this node
     * @member {Array.<meshtastic.INeighbor>} neighbors
     * @memberof meshtastic.NeighborInfo
     * @instance
     */
    NeighborInfo.prototype.neighbors = $util.emptyArray

    /**
     * Encodes the specified NeighborInfo message. Does not implicitly {@link meshtastic.NeighborInfo.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.NeighborInfo
     * @static
     * @param {meshtastic.INeighborInfo} message NeighborInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NeighborInfo.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.nodeId != null && Object.hasOwnProperty.call(message, 'nodeId'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.nodeId)
      if (message.lastSentById != null && Object.hasOwnProperty.call(message, 'lastSentById'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.lastSentById)
      if (message.nodeBroadcastIntervalSecs != null && Object.hasOwnProperty.call(message, 'nodeBroadcastIntervalSecs'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.nodeBroadcastIntervalSecs)
      if (message.neighbors != null && message.neighbors.length)
        for (let i = 0; i < message.neighbors.length; ++i)
          $root.meshtastic.Neighbor.encode(message.neighbors[i], writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
      return writer
    }

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
    NeighborInfo.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.NeighborInfo()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {number} nodeId
     * @memberof meshtastic.Neighbor
     * @instance
     */
    Neighbor.prototype.nodeId = 0

    /**
     * SNR of last heard message
     * @member {number} snr
     * @memberof meshtastic.Neighbor
     * @instance
     */
    Neighbor.prototype.snr = 0

    /**
     * Reception time (in secs since 1970) of last message that was last sent by this ID.
     * Note: this is for local storage only and will not be sent out over the mesh.
     * @member {number} lastRxTime
     * @memberof meshtastic.Neighbor
     * @instance
     */
    Neighbor.prototype.lastRxTime = 0

    /**
     * Broadcast interval of this neighbor (in seconds).
     * Note: this is for local storage only and will not be sent out over the mesh.
     * @member {number} nodeBroadcastIntervalSecs
     * @memberof meshtastic.Neighbor
     * @instance
     */
    Neighbor.prototype.nodeBroadcastIntervalSecs = 0

    /**
     * Encodes the specified Neighbor message. Does not implicitly {@link meshtastic.Neighbor.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Neighbor
     * @static
     * @param {meshtastic.INeighbor} message Neighbor message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Neighbor.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.nodeId != null && Object.hasOwnProperty.call(message, 'nodeId'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.nodeId)
      if (message.snr != null && Object.hasOwnProperty.call(message, 'snr')) writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.snr)
      if (message.lastRxTime != null && Object.hasOwnProperty.call(message, 'lastRxTime'))
        writer.uint32(/* id 3, wireType 5 =*/ 29).fixed32(message.lastRxTime)
      if (message.nodeBroadcastIntervalSecs != null && Object.hasOwnProperty.call(message, 'nodeBroadcastIntervalSecs'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.nodeBroadcastIntervalSecs)
      return writer
    }

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
    Neighbor.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Neighbor()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @property {boolean|null} [hasPKC] Has PKC capabilities
     * @property {number|null} [excludedModules] Bit field of boolean for excluded modules
     * (bitwise OR of ExcludedModules)
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
     * @member {string} firmwareVersion
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.firmwareVersion = ''

    /**
     * Device state version
     * @member {number} deviceStateVersion
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.deviceStateVersion = 0

    /**
     * Indicates whether the device can shutdown CPU natively or via power management chip
     * @member {boolean} canShutdown
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.canShutdown = false

    /**
     * Indicates that the device has native wifi capability
     * @member {boolean} hasWifi
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasWifi = false

    /**
     * Indicates that the device has native bluetooth capability
     * @member {boolean} hasBluetooth
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasBluetooth = false

    /**
     * Indicates that the device has an ethernet peripheral
     * @member {boolean} hasEthernet
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasEthernet = false

    /**
     * Indicates that the device's role in the mesh
     * @member {meshtastic.Config.DeviceConfig.Role} role
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.role = 0

    /**
     * Indicates the device's current enabled position flags
     * @member {number} positionFlags
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.positionFlags = 0

    /**
     * Device hardware model
     * @member {meshtastic.HardwareModel} hwModel
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hwModel = 0

    /**
     * Has Remote Hardware enabled
     * @member {boolean} hasRemoteHardware
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasRemoteHardware = false

    /**
     * Has PKC capabilities
     * @member {boolean} hasPKC
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.hasPKC = false

    /**
     * Bit field of boolean for excluded modules
     * (bitwise OR of ExcludedModules)
     * @member {number} excludedModules
     * @memberof meshtastic.DeviceMetadata
     * @instance
     */
    DeviceMetadata.prototype.excludedModules = 0

    /**
     * Encodes the specified DeviceMetadata message. Does not implicitly {@link meshtastic.DeviceMetadata.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.DeviceMetadata
     * @static
     * @param {meshtastic.IDeviceMetadata} message DeviceMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeviceMetadata.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.firmwareVersion != null && Object.hasOwnProperty.call(message, 'firmwareVersion'))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.firmwareVersion)
      if (message.deviceStateVersion != null && Object.hasOwnProperty.call(message, 'deviceStateVersion'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.deviceStateVersion)
      if (message.canShutdown != null && Object.hasOwnProperty.call(message, 'canShutdown'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.canShutdown)
      if (message.hasWifi != null && Object.hasOwnProperty.call(message, 'hasWifi'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.hasWifi)
      if (message.hasBluetooth != null && Object.hasOwnProperty.call(message, 'hasBluetooth'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.hasBluetooth)
      if (message.hasEthernet != null && Object.hasOwnProperty.call(message, 'hasEthernet'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.hasEthernet)
      if (message.role != null && Object.hasOwnProperty.call(message, 'role')) writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.role)
      if (message.positionFlags != null && Object.hasOwnProperty.call(message, 'positionFlags'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.positionFlags)
      if (message.hwModel != null && Object.hasOwnProperty.call(message, 'hwModel'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).int32(message.hwModel)
      if (message.hasRemoteHardware != null && Object.hasOwnProperty.call(message, 'hasRemoteHardware'))
        writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.hasRemoteHardware)
      if (message.hasPKC != null && Object.hasOwnProperty.call(message, 'hasPKC'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.hasPKC)
      if (message.excludedModules != null && Object.hasOwnProperty.call(message, 'excludedModules'))
        writer.uint32(/* id 12, wireType 0 =*/ 96).uint32(message.excludedModules)
      return writer
    }

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
    DeviceMetadata.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.DeviceMetadata()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 11: {
            message.hasPKC = reader.bool()
            break
          }
          case 12: {
            message.excludedModules = reader.uint32()
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

  /**
   * Enum for modules excluded from a device's configuration.
   * Each value represents a ModuleConfigType that can be toggled as excluded
   * by setting its corresponding bit in the `excluded_modules` bitmask field.
   * @name meshtastic.ExcludedModules
   * @enum {number}
   * @property {number} EXCLUDED_NONE=0 Default value of 0 indicates no modules are excluded.
   * @property {number} MQTT_CONFIG=1 MQTT module
   * @property {number} SERIAL_CONFIG=2 Serial module
   * @property {number} EXTNOTIF_CONFIG=4 External Notification module
   * @property {number} STOREFORWARD_CONFIG=8 Store and Forward module
   * @property {number} RANGETEST_CONFIG=16 Range Test module
   * @property {number} TELEMETRY_CONFIG=32 Telemetry module
   * @property {number} CANNEDMSG_CONFIG=64 Canned Message module
   * @property {number} AUDIO_CONFIG=128 Audio module
   * @property {number} REMOTEHARDWARE_CONFIG=256 Remote Hardware module
   * @property {number} NEIGHBORINFO_CONFIG=512 Neighbor Info module
   * @property {number} AMBIENTLIGHTING_CONFIG=1024 Ambient Lighting module
   * @property {number} DETECTIONSENSOR_CONFIG=2048 Detection Sensor module
   * @property {number} PAXCOUNTER_CONFIG=4096 Paxcounter module
   * @property {number} BLUETOOTH_CONFIG=8192 Bluetooth config (not technically a module, but used to indicate bluetooth capabilities)
   * @property {number} NETWORK_CONFIG=16384 Network config (not technically a module, but used to indicate network capabilities)
   */
  meshtastic.ExcludedModules = (function () {
    const valuesById = {},
      values = Object.create(valuesById)
    values[(valuesById[0] = 'EXCLUDED_NONE')] = 0
    values[(valuesById[1] = 'MQTT_CONFIG')] = 1
    values[(valuesById[2] = 'SERIAL_CONFIG')] = 2
    values[(valuesById[4] = 'EXTNOTIF_CONFIG')] = 4
    values[(valuesById[8] = 'STOREFORWARD_CONFIG')] = 8
    values[(valuesById[16] = 'RANGETEST_CONFIG')] = 16
    values[(valuesById[32] = 'TELEMETRY_CONFIG')] = 32
    values[(valuesById[64] = 'CANNEDMSG_CONFIG')] = 64
    values[(valuesById[128] = 'AUDIO_CONFIG')] = 128
    values[(valuesById[256] = 'REMOTEHARDWARE_CONFIG')] = 256
    values[(valuesById[512] = 'NEIGHBORINFO_CONFIG')] = 512
    values[(valuesById[1024] = 'AMBIENTLIGHTING_CONFIG')] = 1024
    values[(valuesById[2048] = 'DETECTIONSENSOR_CONFIG')] = 2048
    values[(valuesById[4096] = 'PAXCOUNTER_CONFIG')] = 4096
    values[(valuesById[8192] = 'BLUETOOTH_CONFIG')] = 8192
    values[(valuesById[16384] = 'NETWORK_CONFIG')] = 16384
    return values
  })()

  meshtastic.Heartbeat = (function () {
    /**
     * Properties of a Heartbeat.
     * @memberof meshtastic
     * @interface IHeartbeat
     * @property {number|null} [nonce] The nonce of the heartbeat message
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
     * The nonce of the heartbeat message
     * @member {number} nonce
     * @memberof meshtastic.Heartbeat
     * @instance
     */
    Heartbeat.prototype.nonce = 0

    /**
     * Encodes the specified Heartbeat message. Does not implicitly {@link meshtastic.Heartbeat.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Heartbeat
     * @static
     * @param {meshtastic.IHeartbeat} message Heartbeat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Heartbeat.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.nonce != null && Object.hasOwnProperty.call(message, 'nonce'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.nonce)
      return writer
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
    Heartbeat.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Heartbeat()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.nonce = reader.uint32()
            break
          }
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
     * @member {number} nodeNum
     * @memberof meshtastic.NodeRemoteHardwarePin
     * @instance
     */
    NodeRemoteHardwarePin.prototype.nodeNum = 0

    /**
     * The the available gpio pin for usage with RemoteHardware module
     * @member {meshtastic.IRemoteHardwarePin|null|undefined} pin
     * @memberof meshtastic.NodeRemoteHardwarePin
     * @instance
     */
    NodeRemoteHardwarePin.prototype.pin = null

    /**
     * Encodes the specified NodeRemoteHardwarePin message. Does not implicitly {@link meshtastic.NodeRemoteHardwarePin.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.NodeRemoteHardwarePin
     * @static
     * @param {meshtastic.INodeRemoteHardwarePin} message NodeRemoteHardwarePin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NodeRemoteHardwarePin.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.nodeNum != null && Object.hasOwnProperty.call(message, 'nodeNum'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.nodeNum)
      if (message.pin != null && Object.hasOwnProperty.call(message, 'pin'))
        $root.meshtastic.RemoteHardwarePin.encode(message.pin, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      return writer
    }

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
    NodeRemoteHardwarePin.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.NodeRemoteHardwarePin()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {number} payloadId
     * @memberof meshtastic.ChunkedPayload
     * @instance
     */
    ChunkedPayload.prototype.payloadId = 0

    /**
     * The total number of chunks in the payload
     * @member {number} chunkCount
     * @memberof meshtastic.ChunkedPayload
     * @instance
     */
    ChunkedPayload.prototype.chunkCount = 0

    /**
     * The current chunk index in the total
     * @member {number} chunkIndex
     * @memberof meshtastic.ChunkedPayload
     * @instance
     */
    ChunkedPayload.prototype.chunkIndex = 0

    /**
     * The binary data of the current chunk
     * @member {Uint8Array} payloadChunk
     * @memberof meshtastic.ChunkedPayload
     * @instance
     */
    ChunkedPayload.prototype.payloadChunk = $util.newBuffer([])

    /**
     * Encodes the specified ChunkedPayload message. Does not implicitly {@link meshtastic.ChunkedPayload.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ChunkedPayload
     * @static
     * @param {meshtastic.IChunkedPayload} message ChunkedPayload message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChunkedPayload.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.payloadId != null && Object.hasOwnProperty.call(message, 'payloadId'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.payloadId)
      if (message.chunkCount != null && Object.hasOwnProperty.call(message, 'chunkCount'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.chunkCount)
      if (message.chunkIndex != null && Object.hasOwnProperty.call(message, 'chunkIndex'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.chunkIndex)
      if (message.payloadChunk != null && Object.hasOwnProperty.call(message, 'payloadChunk'))
        writer.uint32(/* id 4, wireType 2 =*/ 34).bytes(message.payloadChunk)
      return writer
    }

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
    ChunkedPayload.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ChunkedPayload()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * Encodes the specified resend_chunks message. Does not implicitly {@link meshtastic.resend_chunks.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.resend_chunks
     * @static
     * @param {meshtastic.Iresend_chunks} message resend_chunks message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    resend_chunks.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.chunks != null && message.chunks.length) {
        writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
        for (let i = 0; i < message.chunks.length; ++i) writer.uint32(message.chunks[i])
        writer.ldelim()
      }
      return writer
    }

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
    resend_chunks.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.resend_chunks()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {number} payloadId
     * @memberof meshtastic.ChunkedPayloadResponse
     * @instance
     */
    ChunkedPayloadResponse.prototype.payloadId = 0

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
     * Encodes the specified ChunkedPayloadResponse message. Does not implicitly {@link meshtastic.ChunkedPayloadResponse.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ChunkedPayloadResponse
     * @static
     * @param {meshtastic.IChunkedPayloadResponse} message ChunkedPayloadResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChunkedPayloadResponse.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.payloadId != null && Object.hasOwnProperty.call(message, 'payloadId'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.payloadId)
      if (message.requestTransfer != null && Object.hasOwnProperty.call(message, 'requestTransfer'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.requestTransfer)
      if (message.acceptTransfer != null && Object.hasOwnProperty.call(message, 'acceptTransfer'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.acceptTransfer)
      if (message.resendChunks != null && Object.hasOwnProperty.call(message, 'resendChunks'))
        $root.meshtastic.resend_chunks.encode(message.resendChunks, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
      return writer
    }

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
    ChunkedPayloadResponse.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ChunkedPayloadResponse()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {number} channelNum
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.channelNum = 0

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
     * @member {Uint8Array} psk
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.psk = $util.newBuffer([])

    /**
     * A SHORT name that will be packed into the URL.
     * Less than 12 bytes.
     * Something for end users to call the channel
     * If this is the empty string it is assumed that this channel
     * is the special (minimally secure) "Default"channel.
     * In user interfaces it should be rendered as a local language translation of "X".
     * For channel_num hashing empty string will be treated as "X".
     * Where "X" is selected based on the English words listed above for ModemPreset
     * @member {string} name
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.name = ''

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
     * @member {number} id
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.id = 0

    /**
     * If true, messages on the mesh will be sent to the *public* internet by any gateway ndoe
     * @member {boolean} uplinkEnabled
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.uplinkEnabled = false

    /**
     * If true, messages seen on the internet will be forwarded to the local mesh.
     * @member {boolean} downlinkEnabled
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.downlinkEnabled = false

    /**
     * Per-channel module settings.
     * @member {meshtastic.IModuleSettings|null|undefined} moduleSettings
     * @memberof meshtastic.ChannelSettings
     * @instance
     */
    ChannelSettings.prototype.moduleSettings = null

    /**
     * Encodes the specified ChannelSettings message. Does not implicitly {@link meshtastic.ChannelSettings.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ChannelSettings
     * @static
     * @param {meshtastic.IChannelSettings} message ChannelSettings message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelSettings.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.channelNum != null && Object.hasOwnProperty.call(message, 'channelNum'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.channelNum)
      if (message.psk != null && Object.hasOwnProperty.call(message, 'psk')) writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.psk)
      if (message.name != null && Object.hasOwnProperty.call(message, 'name'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.name)
      if (message.id != null && Object.hasOwnProperty.call(message, 'id')) writer.uint32(/* id 4, wireType 5 =*/ 37).fixed32(message.id)
      if (message.uplinkEnabled != null && Object.hasOwnProperty.call(message, 'uplinkEnabled'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.uplinkEnabled)
      if (message.downlinkEnabled != null && Object.hasOwnProperty.call(message, 'downlinkEnabled'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.downlinkEnabled)
      if (message.moduleSettings != null && Object.hasOwnProperty.call(message, 'moduleSettings'))
        $root.meshtastic.ModuleSettings.encode(message.moduleSettings, writer.uint32(/* id 7, wireType 2 =*/ 58).fork()).ldelim()
      return writer
    }

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
    ChannelSettings.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ChannelSettings()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {number} positionPrecision
     * @memberof meshtastic.ModuleSettings
     * @instance
     */
    ModuleSettings.prototype.positionPrecision = 0

    /**
     * Controls whether or not the phone / clients should mute the current channel
     * Useful for noisy public channels you don't necessarily want to disable
     * @member {boolean} isClientMuted
     * @memberof meshtastic.ModuleSettings
     * @instance
     */
    ModuleSettings.prototype.isClientMuted = false

    /**
     * Encodes the specified ModuleSettings message. Does not implicitly {@link meshtastic.ModuleSettings.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ModuleSettings
     * @static
     * @param {meshtastic.IModuleSettings} message ModuleSettings message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ModuleSettings.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.positionPrecision != null && Object.hasOwnProperty.call(message, 'positionPrecision'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.positionPrecision)
      if (message.isClientMuted != null && Object.hasOwnProperty.call(message, 'isClientMuted'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.isClientMuted)
      return writer
    }

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
    ModuleSettings.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ModuleSettings()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {number} index
     * @memberof meshtastic.Channel
     * @instance
     */
    Channel.prototype.index = 0

    /**
     * The new settings, or NULL to disable that channel
     * @member {meshtastic.IChannelSettings|null|undefined} settings
     * @memberof meshtastic.Channel
     * @instance
     */
    Channel.prototype.settings = null

    /**
     * TODO: REPLACE
     * @member {meshtastic.Channel.Role} role
     * @memberof meshtastic.Channel
     * @instance
     */
    Channel.prototype.role = 0

    /**
     * Encodes the specified Channel message. Does not implicitly {@link meshtastic.Channel.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Channel
     * @static
     * @param {meshtastic.IChannel} message Channel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Channel.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.index != null && Object.hasOwnProperty.call(message, 'index'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.index)
      if (message.settings != null && Object.hasOwnProperty.call(message, 'settings'))
        $root.meshtastic.ChannelSettings.encode(message.settings, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.role != null && Object.hasOwnProperty.call(message, 'role')) writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.role)
      return writer
    }

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
    Channel.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Channel()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * Encodes the specified ModuleConfig message. Does not implicitly {@link meshtastic.ModuleConfig.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ModuleConfig
     * @static
     * @param {meshtastic.IModuleConfig} message ModuleConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ModuleConfig.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.mqtt != null && Object.hasOwnProperty.call(message, 'mqtt'))
        $root.meshtastic.ModuleConfig.MQTTConfig.encode(message.mqtt, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.serial != null && Object.hasOwnProperty.call(message, 'serial'))
        $root.meshtastic.ModuleConfig.SerialConfig.encode(message.serial, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.externalNotification != null && Object.hasOwnProperty.call(message, 'externalNotification'))
        $root.meshtastic.ModuleConfig.ExternalNotificationConfig.encode(
          message.externalNotification,
          writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
        ).ldelim()
      if (message.storeForward != null && Object.hasOwnProperty.call(message, 'storeForward'))
        $root.meshtastic.ModuleConfig.StoreForwardConfig.encode(
          message.storeForward,
          writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
        ).ldelim()
      if (message.rangeTest != null && Object.hasOwnProperty.call(message, 'rangeTest'))
        $root.meshtastic.ModuleConfig.RangeTestConfig.encode(message.rangeTest, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim()
      if (message.telemetry != null && Object.hasOwnProperty.call(message, 'telemetry'))
        $root.meshtastic.ModuleConfig.TelemetryConfig.encode(message.telemetry, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim()
      if (message.cannedMessage != null && Object.hasOwnProperty.call(message, 'cannedMessage'))
        $root.meshtastic.ModuleConfig.CannedMessageConfig.encode(
          message.cannedMessage,
          writer.uint32(/* id 7, wireType 2 =*/ 58).fork()
        ).ldelim()
      if (message.audio != null && Object.hasOwnProperty.call(message, 'audio'))
        $root.meshtastic.ModuleConfig.AudioConfig.encode(message.audio, writer.uint32(/* id 8, wireType 2 =*/ 66).fork()).ldelim()
      if (message.remoteHardware != null && Object.hasOwnProperty.call(message, 'remoteHardware'))
        $root.meshtastic.ModuleConfig.RemoteHardwareConfig.encode(
          message.remoteHardware,
          writer.uint32(/* id 9, wireType 2 =*/ 74).fork()
        ).ldelim()
      if (message.neighborInfo != null && Object.hasOwnProperty.call(message, 'neighborInfo'))
        $root.meshtastic.ModuleConfig.NeighborInfoConfig.encode(
          message.neighborInfo,
          writer.uint32(/* id 10, wireType 2 =*/ 82).fork()
        ).ldelim()
      if (message.ambientLighting != null && Object.hasOwnProperty.call(message, 'ambientLighting'))
        $root.meshtastic.ModuleConfig.AmbientLightingConfig.encode(
          message.ambientLighting,
          writer.uint32(/* id 11, wireType 2 =*/ 90).fork()
        ).ldelim()
      if (message.detectionSensor != null && Object.hasOwnProperty.call(message, 'detectionSensor'))
        $root.meshtastic.ModuleConfig.DetectionSensorConfig.encode(
          message.detectionSensor,
          writer.uint32(/* id 12, wireType 2 =*/ 98).fork()
        ).ldelim()
      if (message.paxcounter != null && Object.hasOwnProperty.call(message, 'paxcounter'))
        $root.meshtastic.ModuleConfig.PaxcounterConfig.encode(
          message.paxcounter,
          writer.uint32(/* id 13, wireType 2 =*/ 106).fork()
        ).ldelim()
      return writer
    }

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
    ModuleConfig.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ModuleConfig()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.enabled = false

      /**
       * The server to use for our MQTT global message gateway feature.
       * If not set, the default server will be used
       * @member {string} address
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.address = ''

      /**
       * MQTT username to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default username
       * @member {string} username
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.username = ''

      /**
       * MQTT password to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default password
       * @member {string} password
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.password = ''

      /**
       * Whether to send encrypted or decrypted packets to MQTT.
       * This parameter is only honoured if you also set server
       * (the default official mqtt.meshtastic.org server can handle encrypted packets)
       * Decrypted packets may be useful for external systems that want to consume meshtastic packets
       * @member {boolean} encryptionEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.encryptionEnabled = false

      /**
       * Whether to send / consume json packets on MQTT
       * @member {boolean} jsonEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.jsonEnabled = false

      /**
       * If true, we attempt to establish a secure connection using TLS
       * @member {boolean} tlsEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.tlsEnabled = false

      /**
       * The root topic to use for MQTT messages. Default is "msh".
       * This is useful if you want to use a single MQTT server for multiple meshtastic networks and separate them via ACLs
       * @member {string} root
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.root = ''

      /**
       * If true, we can use the connected phone / client to proxy messages to MQTT instead of a direct connection
       * @member {boolean} proxyToClientEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.proxyToClientEnabled = false

      /**
       * If true, we will periodically report unencrypted information about our node to a map via MQTT
       * @member {boolean} mapReportingEnabled
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.mapReportingEnabled = false

      /**
       * Settings for reporting information about our node to a map via MQTT
       * @member {meshtastic.ModuleConfig.IMapReportSettings|null|undefined} mapReportSettings
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @instance
       */
      MQTTConfig.prototype.mapReportSettings = null

      /**
       * Encodes the specified MQTTConfig message. Does not implicitly {@link meshtastic.ModuleConfig.MQTTConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.MQTTConfig
       * @static
       * @param {meshtastic.ModuleConfig.IMQTTConfig} message MQTTConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      MQTTConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.address != null && Object.hasOwnProperty.call(message, 'address'))
          writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.address)
        if (message.username != null && Object.hasOwnProperty.call(message, 'username'))
          writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.username)
        if (message.password != null && Object.hasOwnProperty.call(message, 'password'))
          writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.password)
        if (message.encryptionEnabled != null && Object.hasOwnProperty.call(message, 'encryptionEnabled'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.encryptionEnabled)
        if (message.jsonEnabled != null && Object.hasOwnProperty.call(message, 'jsonEnabled'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.jsonEnabled)
        if (message.tlsEnabled != null && Object.hasOwnProperty.call(message, 'tlsEnabled'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).bool(message.tlsEnabled)
        if (message.root != null && Object.hasOwnProperty.call(message, 'root'))
          writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.root)
        if (message.proxyToClientEnabled != null && Object.hasOwnProperty.call(message, 'proxyToClientEnabled'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.proxyToClientEnabled)
        if (message.mapReportingEnabled != null && Object.hasOwnProperty.call(message, 'mapReportingEnabled'))
          writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.mapReportingEnabled)
        if (message.mapReportSettings != null && Object.hasOwnProperty.call(message, 'mapReportSettings'))
          $root.meshtastic.ModuleConfig.MapReportSettings.encode(
            message.mapReportSettings,
            writer.uint32(/* id 11, wireType 2 =*/ 90).fork()
          ).ldelim()
        return writer
      }

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
      MQTTConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.MQTTConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @property {boolean|null} [shouldReportLocation] Whether we have opted-in to report our location to the map
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
       * @member {number} publishIntervalSecs
       * @memberof meshtastic.ModuleConfig.MapReportSettings
       * @instance
       */
      MapReportSettings.prototype.publishIntervalSecs = 0

      /**
       * Bits of precision for the location sent (default of 32 is full precision).
       * @member {number} positionPrecision
       * @memberof meshtastic.ModuleConfig.MapReportSettings
       * @instance
       */
      MapReportSettings.prototype.positionPrecision = 0

      /**
       * Whether we have opted-in to report our location to the map
       * @member {boolean} shouldReportLocation
       * @memberof meshtastic.ModuleConfig.MapReportSettings
       * @instance
       */
      MapReportSettings.prototype.shouldReportLocation = false

      /**
       * Encodes the specified MapReportSettings message. Does not implicitly {@link meshtastic.ModuleConfig.MapReportSettings.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.MapReportSettings
       * @static
       * @param {meshtastic.ModuleConfig.IMapReportSettings} message MapReportSettings message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      MapReportSettings.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.publishIntervalSecs != null && Object.hasOwnProperty.call(message, 'publishIntervalSecs'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.publishIntervalSecs)
        if (message.positionPrecision != null && Object.hasOwnProperty.call(message, 'positionPrecision'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.positionPrecision)
        if (message.shouldReportLocation != null && Object.hasOwnProperty.call(message, 'shouldReportLocation'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.shouldReportLocation)
        return writer
      }

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
      MapReportSettings.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.MapReportSettings()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
          switch (tag >>> 3) {
            case 1: {
              message.publishIntervalSecs = reader.uint32()
              break
            }
            case 2: {
              message.positionPrecision = reader.uint32()
              break
            }
            case 3: {
              message.shouldReportLocation = reader.bool()
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.RemoteHardwareConfig
       * @instance
       */
      RemoteHardwareConfig.prototype.enabled = false

      /**
       * Whether the Module allows consumers to read / write to pins not defined in available_pins
       * @member {boolean} allowUndefinedPinAccess
       * @memberof meshtastic.ModuleConfig.RemoteHardwareConfig
       * @instance
       */
      RemoteHardwareConfig.prototype.allowUndefinedPinAccess = false

      /**
       * Exposes the available pins to the mesh for reading and writing
       * @member {Array.<meshtastic.IRemoteHardwarePin>} availablePins
       * @memberof meshtastic.ModuleConfig.RemoteHardwareConfig
       * @instance
       */
      RemoteHardwareConfig.prototype.availablePins = $util.emptyArray

      /**
       * Encodes the specified RemoteHardwareConfig message. Does not implicitly {@link meshtastic.ModuleConfig.RemoteHardwareConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.RemoteHardwareConfig
       * @static
       * @param {meshtastic.ModuleConfig.IRemoteHardwareConfig} message RemoteHardwareConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      RemoteHardwareConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.allowUndefinedPinAccess != null && Object.hasOwnProperty.call(message, 'allowUndefinedPinAccess'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.allowUndefinedPinAccess)
        if (message.availablePins != null && message.availablePins.length)
          for (let i = 0; i < message.availablePins.length; ++i)
            $root.meshtastic.RemoteHardwarePin.encode(message.availablePins[i], writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim()
        return writer
      }

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
      RemoteHardwareConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.RemoteHardwareConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * Neighbor Info (minimum is 14400, i.e., 4 hours)
       * @property {boolean|null} [transmitOverLora] Whether in addition to sending it to MQTT and the PhoneAPI, our NeighborInfo should be transmitted over LoRa.
       * Note that this is not available on a channel with default key and name.
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.NeighborInfoConfig
       * @instance
       */
      NeighborInfoConfig.prototype.enabled = false

      /**
       * Interval in seconds of how often we should try to send our
       * Neighbor Info (minimum is 14400, i.e., 4 hours)
       * @member {number} updateInterval
       * @memberof meshtastic.ModuleConfig.NeighborInfoConfig
       * @instance
       */
      NeighborInfoConfig.prototype.updateInterval = 0

      /**
       * Whether in addition to sending it to MQTT and the PhoneAPI, our NeighborInfo should be transmitted over LoRa.
       * Note that this is not available on a channel with default key and name.
       * @member {boolean} transmitOverLora
       * @memberof meshtastic.ModuleConfig.NeighborInfoConfig
       * @instance
       */
      NeighborInfoConfig.prototype.transmitOverLora = false

      /**
       * Encodes the specified NeighborInfoConfig message. Does not implicitly {@link meshtastic.ModuleConfig.NeighborInfoConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.NeighborInfoConfig
       * @static
       * @param {meshtastic.ModuleConfig.INeighborInfoConfig} message NeighborInfoConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      NeighborInfoConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.updateInterval != null && Object.hasOwnProperty.call(message, 'updateInterval'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.updateInterval)
        if (message.transmitOverLora != null && Object.hasOwnProperty.call(message, 'transmitOverLora'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.transmitOverLora)
        return writer
      }

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
      NeighborInfoConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.NeighborInfoConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
          switch (tag >>> 3) {
            case 1: {
              message.enabled = reader.bool()
              break
            }
            case 2: {
              message.updateInterval = reader.uint32()
              break
            }
            case 3: {
              message.transmitOverLora = reader.bool()
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
       * @property {number|null} [minimumBroadcastSecs] Interval in seconds of how often we can send a message to the mesh when a
       * trigger event is detected
       * @property {number|null} [stateBroadcastSecs] Interval in seconds of how often we should send a message to the mesh
       * with the current state regardless of trigger events When set to 0, only
       * trigger events will be broadcasted Works as a sort of status heartbeat
       * for peace of mind
       * @property {boolean|null} [sendBell] Send ASCII bell with alert message
       * Useful for triggering ext. notification on bell
       * @property {string|null} [name] Friendly name used to format message sent to mesh
       * Example: A name "Motion" would result in a message "Motion detected"
       * Maximum length of 20 characters
       * @property {number|null} [monitorPin] GPIO pin to monitor for state changes
       * @property {meshtastic.ModuleConfig.DetectionSensorConfig.TriggerType|null} [detectionTriggerType] The type of trigger event to be used
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.enabled = false

      /**
       * Interval in seconds of how often we can send a message to the mesh when a
       * trigger event is detected
       * @member {number} minimumBroadcastSecs
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.minimumBroadcastSecs = 0

      /**
       * Interval in seconds of how often we should send a message to the mesh
       * with the current state regardless of trigger events When set to 0, only
       * trigger events will be broadcasted Works as a sort of status heartbeat
       * for peace of mind
       * @member {number} stateBroadcastSecs
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.stateBroadcastSecs = 0

      /**
       * Send ASCII bell with alert message
       * Useful for triggering ext. notification on bell
       * @member {boolean} sendBell
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.sendBell = false

      /**
       * Friendly name used to format message sent to mesh
       * Example: A name "Motion" would result in a message "Motion detected"
       * Maximum length of 20 characters
       * @member {string} name
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.name = ''

      /**
       * GPIO pin to monitor for state changes
       * @member {number} monitorPin
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.monitorPin = 0

      /**
       * The type of trigger event to be used
       * @member {meshtastic.ModuleConfig.DetectionSensorConfig.TriggerType} detectionTriggerType
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.detectionTriggerType = 0

      /**
       * Whether or not use INPUT_PULLUP mode for GPIO pin
       * Only applicable if the board uses pull-up resistors on the pin
       * @member {boolean} usePullup
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @instance
       */
      DetectionSensorConfig.prototype.usePullup = false

      /**
       * Encodes the specified DetectionSensorConfig message. Does not implicitly {@link meshtastic.ModuleConfig.DetectionSensorConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.DetectionSensorConfig
       * @static
       * @param {meshtastic.ModuleConfig.IDetectionSensorConfig} message DetectionSensorConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      DetectionSensorConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.minimumBroadcastSecs != null && Object.hasOwnProperty.call(message, 'minimumBroadcastSecs'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.minimumBroadcastSecs)
        if (message.stateBroadcastSecs != null && Object.hasOwnProperty.call(message, 'stateBroadcastSecs'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.stateBroadcastSecs)
        if (message.sendBell != null && Object.hasOwnProperty.call(message, 'sendBell'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.sendBell)
        if (message.name != null && Object.hasOwnProperty.call(message, 'name'))
          writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.name)
        if (message.monitorPin != null && Object.hasOwnProperty.call(message, 'monitorPin'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.monitorPin)
        if (message.detectionTriggerType != null && Object.hasOwnProperty.call(message, 'detectionTriggerType'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.detectionTriggerType)
        if (message.usePullup != null && Object.hasOwnProperty.call(message, 'usePullup'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.usePullup)
        return writer
      }

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
      DetectionSensorConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.DetectionSensorConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
              message.detectionTriggerType = reader.int32()
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

      /**
       * TriggerType enum.
       * @name meshtastic.ModuleConfig.DetectionSensorConfig.TriggerType
       * @enum {number}
       * @property {number} LOGIC_LOW=0 Event is triggered if pin is low
       * @property {number} LOGIC_HIGH=1 Event is triggered if pin is high
       * @property {number} FALLING_EDGE=2 Event is triggered when pin goes high to low
       * @property {number} RISING_EDGE=3 Event is triggered when pin goes low to high
       * @property {number} EITHER_EDGE_ACTIVE_LOW=4 Event is triggered on every pin state change, low is considered to be
       * "active"
       * @property {number} EITHER_EDGE_ACTIVE_HIGH=5 Event is triggered on every pin state change, high is considered to be
       * "active"
       */
      DetectionSensorConfig.TriggerType = (function () {
        const valuesById = {},
          values = Object.create(valuesById)
        values[(valuesById[0] = 'LOGIC_LOW')] = 0
        values[(valuesById[1] = 'LOGIC_HIGH')] = 1
        values[(valuesById[2] = 'FALLING_EDGE')] = 2
        values[(valuesById[3] = 'RISING_EDGE')] = 3
        values[(valuesById[4] = 'EITHER_EDGE_ACTIVE_LOW')] = 4
        values[(valuesById[5] = 'EITHER_EDGE_ACTIVE_HIGH')] = 5
        return values
      })()

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
       * @member {boolean} codec2Enabled
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.codec2Enabled = false

      /**
       * PTT Pin
       * @member {number} pttPin
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.pttPin = 0

      /**
       * The audio sample rate to use for codec2
       * @member {meshtastic.ModuleConfig.AudioConfig.Audio_Baud} bitrate
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.bitrate = 0

      /**
       * I2S Word Select
       * @member {number} i2sWs
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.i2sWs = 0

      /**
       * I2S Data IN
       * @member {number} i2sSd
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.i2sSd = 0

      /**
       * I2S Data OUT
       * @member {number} i2sDin
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.i2sDin = 0

      /**
       * I2S Clock
       * @member {number} i2sSck
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @instance
       */
      AudioConfig.prototype.i2sSck = 0

      /**
       * Encodes the specified AudioConfig message. Does not implicitly {@link meshtastic.ModuleConfig.AudioConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.AudioConfig
       * @static
       * @param {meshtastic.ModuleConfig.IAudioConfig} message AudioConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      AudioConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.codec2Enabled != null && Object.hasOwnProperty.call(message, 'codec2Enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.codec2Enabled)
        if (message.pttPin != null && Object.hasOwnProperty.call(message, 'pttPin'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.pttPin)
        if (message.bitrate != null && Object.hasOwnProperty.call(message, 'bitrate'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.bitrate)
        if (message.i2sWs != null && Object.hasOwnProperty.call(message, 'i2sWs'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.i2sWs)
        if (message.i2sSd != null && Object.hasOwnProperty.call(message, 'i2sSd'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.i2sSd)
        if (message.i2sDin != null && Object.hasOwnProperty.call(message, 'i2sDin'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.i2sDin)
        if (message.i2sSck != null && Object.hasOwnProperty.call(message, 'i2sSck'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.i2sSck)
        return writer
      }

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
      AudioConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.AudioConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @instance
       */
      PaxcounterConfig.prototype.enabled = false

      /**
       * PaxcounterConfig paxcounterUpdateInterval.
       * @member {number} paxcounterUpdateInterval
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @instance
       */
      PaxcounterConfig.prototype.paxcounterUpdateInterval = 0

      /**
       * WiFi RSSI threshold. Defaults to -80
       * @member {number} wifiThreshold
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @instance
       */
      PaxcounterConfig.prototype.wifiThreshold = 0

      /**
       * BLE RSSI threshold. Defaults to -80
       * @member {number} bleThreshold
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @instance
       */
      PaxcounterConfig.prototype.bleThreshold = 0

      /**
       * Encodes the specified PaxcounterConfig message. Does not implicitly {@link meshtastic.ModuleConfig.PaxcounterConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.PaxcounterConfig
       * @static
       * @param {meshtastic.ModuleConfig.IPaxcounterConfig} message PaxcounterConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      PaxcounterConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.paxcounterUpdateInterval != null && Object.hasOwnProperty.call(message, 'paxcounterUpdateInterval'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.paxcounterUpdateInterval)
        if (message.wifiThreshold != null && Object.hasOwnProperty.call(message, 'wifiThreshold'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.wifiThreshold)
        if (message.bleThreshold != null && Object.hasOwnProperty.call(message, 'bleThreshold'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.bleThreshold)
        return writer
      }

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
      PaxcounterConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.PaxcounterConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.enabled = false

      /**
       * TODO: REPLACE
       * @member {boolean} echo
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.echo = false

      /**
       * RX pin (should match Arduino gpio pin number)
       * @member {number} rxd
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.rxd = 0

      /**
       * TX pin (should match Arduino gpio pin number)
       * @member {number} txd
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.txd = 0

      /**
       * Serial baud rate
       * @member {meshtastic.ModuleConfig.SerialConfig.Serial_Baud} baud
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.baud = 0

      /**
       * TODO: REPLACE
       * @member {number} timeout
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.timeout = 0

      /**
       * Mode for serial module operation
       * @member {meshtastic.ModuleConfig.SerialConfig.Serial_Mode} mode
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.mode = 0

      /**
       * Overrides the platform's defacto Serial port instance to use with Serial module config settings
       * This is currently only usable in output modes like NMEA / CalTopo and may behave strangely or not work at all in other modes
       * Existing logging over the Serial Console will still be present
       * @member {boolean} overrideConsoleSerialPort
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @instance
       */
      SerialConfig.prototype.overrideConsoleSerialPort = false

      /**
       * Encodes the specified SerialConfig message. Does not implicitly {@link meshtastic.ModuleConfig.SerialConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.SerialConfig
       * @static
       * @param {meshtastic.ModuleConfig.ISerialConfig} message SerialConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      SerialConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.echo != null && Object.hasOwnProperty.call(message, 'echo'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.echo)
        if (message.rxd != null && Object.hasOwnProperty.call(message, 'rxd')) writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.rxd)
        if (message.txd != null && Object.hasOwnProperty.call(message, 'txd')) writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.txd)
        if (message.baud != null && Object.hasOwnProperty.call(message, 'baud'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.baud)
        if (message.timeout != null && Object.hasOwnProperty.call(message, 'timeout'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.timeout)
        if (message.mode != null && Object.hasOwnProperty.call(message, 'mode'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.mode)
        if (message.overrideConsoleSerialPort != null && Object.hasOwnProperty.call(message, 'overrideConsoleSerialPort'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.overrideConsoleSerialPort)
        return writer
      }

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
      SerialConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.SerialConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @property {number} VE_DIRECT=7 VE.Direct is a serial protocol used by Victron Energy products
       * https://beta.ivc.no/wiki/index.php/Victron_VE_Direct_DIY_Cable
       * @property {number} MS_CONFIG=8 Used to configure and view some parameters of MeshSolar.
       * https://heltec.org/project/meshsolar/
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
        values[(valuesById[7] = 'VE_DIRECT')] = 7
        values[(valuesById[8] = 'MS_CONFIG')] = 8
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.enabled = false

      /**
       * When using in On/Off mode, keep the output on for this many
       * milliseconds. Default 1000ms (1 second).
       * @member {number} outputMs
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.outputMs = 0

      /**
       * Define the output pin GPIO setting Defaults to
       * EXT_NOTIFY_OUT if set for the board.
       * In standalone devices this pin should drive the LED to match the UI.
       * @member {number} output
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.output = 0

      /**
       * Optional: Define a secondary output pin for a vibra motor
       * This is used in standalone devices to match the UI.
       * @member {number} outputVibra
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.outputVibra = 0

      /**
       * Optional: Define a tertiary output pin for an active buzzer
       * This is used in standalone devices to to match the UI.
       * @member {number} outputBuzzer
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.outputBuzzer = 0

      /**
       * IF this is true, the 'output' Pin will be pulled active high, false
       * means active low.
       * @member {boolean} active
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.active = false

      /**
       * True: Alert when a text message arrives (output)
       * @member {boolean} alertMessage
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertMessage = false

      /**
       * True: Alert when a text message arrives (output_vibra)
       * @member {boolean} alertMessageVibra
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertMessageVibra = false

      /**
       * True: Alert when a text message arrives (output_buzzer)
       * @member {boolean} alertMessageBuzzer
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertMessageBuzzer = false

      /**
       * True: Alert when the bell character is received (output)
       * @member {boolean} alertBell
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertBell = false

      /**
       * True: Alert when the bell character is received (output_vibra)
       * @member {boolean} alertBellVibra
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertBellVibra = false

      /**
       * True: Alert when the bell character is received (output_buzzer)
       * @member {boolean} alertBellBuzzer
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.alertBellBuzzer = false

      /**
       * use a PWM output instead of a simple on/off output. This will ignore
       * the 'output', 'output_ms' and 'active' settings and use the
       * device.buzzer_gpio instead.
       * @member {boolean} usePwm
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.usePwm = false

      /**
       * The notification will toggle with 'output_ms' for this time of seconds.
       * Default is 0 which means don't repeat at all. 60 would mean blink
       * and/or beep for 60 seconds
       * @member {number} nagTimeout
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.nagTimeout = 0

      /**
       * When true, enables devices with native I2S audio output to use the RTTTL over speaker like a buzzer
       * T-Watch S3 and T-Deck for example have this capability
       * @member {boolean} useI2sAsBuzzer
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @instance
       */
      ExternalNotificationConfig.prototype.useI2sAsBuzzer = false

      /**
       * Encodes the specified ExternalNotificationConfig message. Does not implicitly {@link meshtastic.ModuleConfig.ExternalNotificationConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.ExternalNotificationConfig
       * @static
       * @param {meshtastic.ModuleConfig.IExternalNotificationConfig} message ExternalNotificationConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      ExternalNotificationConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.outputMs != null && Object.hasOwnProperty.call(message, 'outputMs'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.outputMs)
        if (message.output != null && Object.hasOwnProperty.call(message, 'output'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.output)
        if (message.active != null && Object.hasOwnProperty.call(message, 'active'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.active)
        if (message.alertMessage != null && Object.hasOwnProperty.call(message, 'alertMessage'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.alertMessage)
        if (message.alertBell != null && Object.hasOwnProperty.call(message, 'alertBell'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.alertBell)
        if (message.usePwm != null && Object.hasOwnProperty.call(message, 'usePwm'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).bool(message.usePwm)
        if (message.outputVibra != null && Object.hasOwnProperty.call(message, 'outputVibra'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.outputVibra)
        if (message.outputBuzzer != null && Object.hasOwnProperty.call(message, 'outputBuzzer'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.outputBuzzer)
        if (message.alertMessageVibra != null && Object.hasOwnProperty.call(message, 'alertMessageVibra'))
          writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.alertMessageVibra)
        if (message.alertMessageBuzzer != null && Object.hasOwnProperty.call(message, 'alertMessageBuzzer'))
          writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.alertMessageBuzzer)
        if (message.alertBellVibra != null && Object.hasOwnProperty.call(message, 'alertBellVibra'))
          writer.uint32(/* id 12, wireType 0 =*/ 96).bool(message.alertBellVibra)
        if (message.alertBellBuzzer != null && Object.hasOwnProperty.call(message, 'alertBellBuzzer'))
          writer.uint32(/* id 13, wireType 0 =*/ 104).bool(message.alertBellBuzzer)
        if (message.nagTimeout != null && Object.hasOwnProperty.call(message, 'nagTimeout'))
          writer.uint32(/* id 14, wireType 0 =*/ 112).uint32(message.nagTimeout)
        if (message.useI2sAsBuzzer != null && Object.hasOwnProperty.call(message, 'useI2sAsBuzzer'))
          writer.uint32(/* id 15, wireType 0 =*/ 120).bool(message.useI2sAsBuzzer)
        return writer
      }

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
      ExternalNotificationConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.ExternalNotificationConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.enabled = false

      /**
       * TODO: REPLACE
       * @member {boolean} heartbeat
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.heartbeat = false

      /**
       * TODO: REPLACE
       * @member {number} records
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.records = 0

      /**
       * TODO: REPLACE
       * @member {number} historyReturnMax
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.historyReturnMax = 0

      /**
       * TODO: REPLACE
       * @member {number} historyReturnWindow
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.historyReturnWindow = 0

      /**
       * Set to true to let this node act as a server that stores received messages and resends them upon request.
       * @member {boolean} isServer
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @instance
       */
      StoreForwardConfig.prototype.isServer = false

      /**
       * Encodes the specified StoreForwardConfig message. Does not implicitly {@link meshtastic.ModuleConfig.StoreForwardConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.StoreForwardConfig
       * @static
       * @param {meshtastic.ModuleConfig.IStoreForwardConfig} message StoreForwardConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      StoreForwardConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.heartbeat != null && Object.hasOwnProperty.call(message, 'heartbeat'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.heartbeat)
        if (message.records != null && Object.hasOwnProperty.call(message, 'records'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.records)
        if (message.historyReturnMax != null && Object.hasOwnProperty.call(message, 'historyReturnMax'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.historyReturnMax)
        if (message.historyReturnWindow != null && Object.hasOwnProperty.call(message, 'historyReturnWindow'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.historyReturnWindow)
        if (message.isServer != null && Object.hasOwnProperty.call(message, 'isServer'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.isServer)
        return writer
      }

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
      StoreForwardConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.StoreForwardConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @property {boolean|null} [clearOnReboot] Bool indicating that the node should cleanup / destroy it's RangeTest.csv file.
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
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @instance
       */
      RangeTestConfig.prototype.enabled = false

      /**
       * Send out range test messages from this node
       * @member {number} sender
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @instance
       */
      RangeTestConfig.prototype.sender = 0

      /**
       * Bool value indicating that this node should save a RangeTest.csv file.
       * ESP32 Only
       * @member {boolean} save
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @instance
       */
      RangeTestConfig.prototype.save = false

      /**
       * Bool indicating that the node should cleanup / destroy it's RangeTest.csv file.
       * ESP32 Only
       * @member {boolean} clearOnReboot
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @instance
       */
      RangeTestConfig.prototype.clearOnReboot = false

      /**
       * Encodes the specified RangeTestConfig message. Does not implicitly {@link meshtastic.ModuleConfig.RangeTestConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.RangeTestConfig
       * @static
       * @param {meshtastic.ModuleConfig.IRangeTestConfig} message RangeTestConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      RangeTestConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enabled)
        if (message.sender != null && Object.hasOwnProperty.call(message, 'sender'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.sender)
        if (message.save != null && Object.hasOwnProperty.call(message, 'save'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.save)
        if (message.clearOnReboot != null && Object.hasOwnProperty.call(message, 'clearOnReboot'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.clearOnReboot)
        return writer
      }

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
      RangeTestConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.RangeTestConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
            case 4: {
              message.clearOnReboot = reader.bool()
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
       * @property {boolean|null} [powerMeasurementEnabled] Enable/disable Power metrics
       * @property {number|null} [powerUpdateInterval] Interval in seconds of how often we should try to send our
       * power metrics to the mesh
       * @property {boolean|null} [powerScreenEnabled] Enable/Disable the power measurement module on-device display
       * @property {boolean|null} [healthMeasurementEnabled] Preferences for the (Health) Telemetry Module
       * Enable/Disable the telemetry measurement module measurement collection
       * @property {number|null} [healthUpdateInterval] Interval in seconds of how often we should try to send our
       * health metrics to the mesh
       * @property {boolean|null} [healthScreenEnabled] Enable/Disable the health telemetry module on-device display
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
       * @member {number} deviceUpdateInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.deviceUpdateInterval = 0

      /**
       * TelemetryConfig environmentUpdateInterval.
       * @member {number} environmentUpdateInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.environmentUpdateInterval = 0

      /**
       * Preferences for the Telemetry Module (Environment)
       * Enable/Disable the telemetry measurement module measurement collection
       * @member {boolean} environmentMeasurementEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.environmentMeasurementEnabled = false

      /**
       * Enable/Disable the telemetry measurement module on-device display
       * @member {boolean} environmentScreenEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.environmentScreenEnabled = false

      /**
       * We'll always read the sensor in Celsius, but sometimes we might want to
       * display the results in Fahrenheit as a "user preference".
       * @member {boolean} environmentDisplayFahrenheit
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.environmentDisplayFahrenheit = false

      /**
       * Enable/Disable the air quality metrics
       * @member {boolean} airQualityEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.airQualityEnabled = false

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       * @member {number} airQualityInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.airQualityInterval = 0

      /**
       * Enable/disable Power metrics
       * @member {boolean} powerMeasurementEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.powerMeasurementEnabled = false

      /**
       * Interval in seconds of how often we should try to send our
       * power metrics to the mesh
       * @member {number} powerUpdateInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.powerUpdateInterval = 0

      /**
       * Enable/Disable the power measurement module on-device display
       * @member {boolean} powerScreenEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.powerScreenEnabled = false

      /**
       * Preferences for the (Health) Telemetry Module
       * Enable/Disable the telemetry measurement module measurement collection
       * @member {boolean} healthMeasurementEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.healthMeasurementEnabled = false

      /**
       * Interval in seconds of how often we should try to send our
       * health metrics to the mesh
       * @member {number} healthUpdateInterval
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.healthUpdateInterval = 0

      /**
       * Enable/Disable the health telemetry module on-device display
       * @member {boolean} healthScreenEnabled
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @instance
       */
      TelemetryConfig.prototype.healthScreenEnabled = false

      /**
       * Encodes the specified TelemetryConfig message. Does not implicitly {@link meshtastic.ModuleConfig.TelemetryConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.TelemetryConfig
       * @static
       * @param {meshtastic.ModuleConfig.ITelemetryConfig} message TelemetryConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      TelemetryConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.deviceUpdateInterval != null && Object.hasOwnProperty.call(message, 'deviceUpdateInterval'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.deviceUpdateInterval)
        if (message.environmentUpdateInterval != null && Object.hasOwnProperty.call(message, 'environmentUpdateInterval'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.environmentUpdateInterval)
        if (message.environmentMeasurementEnabled != null && Object.hasOwnProperty.call(message, 'environmentMeasurementEnabled'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.environmentMeasurementEnabled)
        if (message.environmentScreenEnabled != null && Object.hasOwnProperty.call(message, 'environmentScreenEnabled'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.environmentScreenEnabled)
        if (message.environmentDisplayFahrenheit != null && Object.hasOwnProperty.call(message, 'environmentDisplayFahrenheit'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.environmentDisplayFahrenheit)
        if (message.airQualityEnabled != null && Object.hasOwnProperty.call(message, 'airQualityEnabled'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.airQualityEnabled)
        if (message.airQualityInterval != null && Object.hasOwnProperty.call(message, 'airQualityInterval'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.airQualityInterval)
        if (message.powerMeasurementEnabled != null && Object.hasOwnProperty.call(message, 'powerMeasurementEnabled'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.powerMeasurementEnabled)
        if (message.powerUpdateInterval != null && Object.hasOwnProperty.call(message, 'powerUpdateInterval'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.powerUpdateInterval)
        if (message.powerScreenEnabled != null && Object.hasOwnProperty.call(message, 'powerScreenEnabled'))
          writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.powerScreenEnabled)
        if (message.healthMeasurementEnabled != null && Object.hasOwnProperty.call(message, 'healthMeasurementEnabled'))
          writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.healthMeasurementEnabled)
        if (message.healthUpdateInterval != null && Object.hasOwnProperty.call(message, 'healthUpdateInterval'))
          writer.uint32(/* id 12, wireType 0 =*/ 96).uint32(message.healthUpdateInterval)
        if (message.healthScreenEnabled != null && Object.hasOwnProperty.call(message, 'healthScreenEnabled'))
          writer.uint32(/* id 13, wireType 0 =*/ 104).bool(message.healthScreenEnabled)
        return writer
      }

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
      TelemetryConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.TelemetryConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
            case 11: {
              message.healthMeasurementEnabled = reader.bool()
              break
            }
            case 12: {
              message.healthUpdateInterval = reader.uint32()
              break
            }
            case 13: {
              message.healthScreenEnabled = reader.bool()
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
       * Can be e.g. "rotEnc1", "upDownEnc1", "scanAndSelect", "cardkb", "serialkb", or keyword "_any"
       * @property {boolean|null} [sendBell] CannedMessageModule also sends a bell character with the messages.
       * ExternalNotificationModule can benefit from this feature.
       */

      /**
       * Constructs a new CannedMessageConfig.
       * @memberof meshtastic.ModuleConfig
       * @classdesc Canned Messages Module Config
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
       * @member {boolean} rotary1Enabled
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.rotary1Enabled = false

      /**
       * GPIO pin for rotary encoder A port.
       * @member {number} inputbrokerPinA
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerPinA = 0

      /**
       * GPIO pin for rotary encoder B port.
       * @member {number} inputbrokerPinB
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerPinB = 0

      /**
       * GPIO pin for rotary encoder Press port.
       * @member {number} inputbrokerPinPress
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerPinPress = 0

      /**
       * Generate input event on CW of this kind.
       * @member {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar} inputbrokerEventCw
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerEventCw = 0

      /**
       * Generate input event on CCW of this kind.
       * @member {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar} inputbrokerEventCcw
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerEventCcw = 0

      /**
       * Generate input event on Press of this kind.
       * @member {meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar} inputbrokerEventPress
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.inputbrokerEventPress = 0

      /**
       * Enable the Up/Down/Select input device. Can be RAK rotary encoder or 3 buttons. Uses the a/b/press definitions from inputbroker.
       * @member {boolean} updown1Enabled
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.updown1Enabled = false

      /**
       * Enable/disable CannedMessageModule.
       * @member {boolean} enabled
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.enabled = false

      /**
       * Input event origin accepted by the canned message module.
       * Can be e.g. "rotEnc1", "upDownEnc1", "scanAndSelect", "cardkb", "serialkb", or keyword "_any"
       * @member {string} allowInputSource
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.allowInputSource = ''

      /**
       * CannedMessageModule also sends a bell character with the messages.
       * ExternalNotificationModule can benefit from this feature.
       * @member {boolean} sendBell
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @instance
       */
      CannedMessageConfig.prototype.sendBell = false

      /**
       * Encodes the specified CannedMessageConfig message. Does not implicitly {@link meshtastic.ModuleConfig.CannedMessageConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.CannedMessageConfig
       * @static
       * @param {meshtastic.ModuleConfig.ICannedMessageConfig} message CannedMessageConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      CannedMessageConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.rotary1Enabled != null && Object.hasOwnProperty.call(message, 'rotary1Enabled'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.rotary1Enabled)
        if (message.inputbrokerPinA != null && Object.hasOwnProperty.call(message, 'inputbrokerPinA'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.inputbrokerPinA)
        if (message.inputbrokerPinB != null && Object.hasOwnProperty.call(message, 'inputbrokerPinB'))
          writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.inputbrokerPinB)
        if (message.inputbrokerPinPress != null && Object.hasOwnProperty.call(message, 'inputbrokerPinPress'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.inputbrokerPinPress)
        if (message.inputbrokerEventCw != null && Object.hasOwnProperty.call(message, 'inputbrokerEventCw'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.inputbrokerEventCw)
        if (message.inputbrokerEventCcw != null && Object.hasOwnProperty.call(message, 'inputbrokerEventCcw'))
          writer.uint32(/* id 6, wireType 0 =*/ 48).int32(message.inputbrokerEventCcw)
        if (message.inputbrokerEventPress != null && Object.hasOwnProperty.call(message, 'inputbrokerEventPress'))
          writer.uint32(/* id 7, wireType 0 =*/ 56).int32(message.inputbrokerEventPress)
        if (message.updown1Enabled != null && Object.hasOwnProperty.call(message, 'updown1Enabled'))
          writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.updown1Enabled)
        if (message.enabled != null && Object.hasOwnProperty.call(message, 'enabled'))
          writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.enabled)
        if (message.allowInputSource != null && Object.hasOwnProperty.call(message, 'allowInputSource'))
          writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.allowInputSource)
        if (message.sendBell != null && Object.hasOwnProperty.call(message, 'sendBell'))
          writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.sendBell)
        return writer
      }

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
      CannedMessageConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.CannedMessageConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
       * @member {boolean} ledState
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.ledState = false

      /**
       * Sets the current for the LED output. Default is 10.
       * @member {number} current
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.current = 0

      /**
       * Sets the red LED level. Values are 0-255.
       * @member {number} red
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.red = 0

      /**
       * Sets the green LED level. Values are 0-255.
       * @member {number} green
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.green = 0

      /**
       * Sets the blue LED level. Values are 0-255.
       * @member {number} blue
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @instance
       */
      AmbientLightingConfig.prototype.blue = 0

      /**
       * Encodes the specified AmbientLightingConfig message. Does not implicitly {@link meshtastic.ModuleConfig.AmbientLightingConfig.verify|verify} messages.
       * @function encode
       * @memberof meshtastic.ModuleConfig.AmbientLightingConfig
       * @static
       * @param {meshtastic.ModuleConfig.IAmbientLightingConfig} message AmbientLightingConfig message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      AmbientLightingConfig.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (message.ledState != null && Object.hasOwnProperty.call(message, 'ledState'))
          writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.ledState)
        if (message.current != null && Object.hasOwnProperty.call(message, 'current'))
          writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.current)
        if (message.red != null && Object.hasOwnProperty.call(message, 'red')) writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.red)
        if (message.green != null && Object.hasOwnProperty.call(message, 'green'))
          writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.green)
        if (message.blue != null && Object.hasOwnProperty.call(message, 'blue'))
          writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.blue)
        return writer
      }

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
      AmbientLightingConfig.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.meshtastic.ModuleConfig.AmbientLightingConfig()
        while (reader.pos < end) {
          let tag = reader.uint32()
          if (tag === error) break
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
     * @member {number} gpioPin
     * @memberof meshtastic.RemoteHardwarePin
     * @instance
     */
    RemoteHardwarePin.prototype.gpioPin = 0

    /**
     * Name for the GPIO pin (i.e. Front gate, mailbox, etc)
     * @member {string} name
     * @memberof meshtastic.RemoteHardwarePin
     * @instance
     */
    RemoteHardwarePin.prototype.name = ''

    /**
     * Type of GPIO access available to consumers on the mesh
     * @member {meshtastic.RemoteHardwarePinType} type
     * @memberof meshtastic.RemoteHardwarePin
     * @instance
     */
    RemoteHardwarePin.prototype.type = 0

    /**
     * Encodes the specified RemoteHardwarePin message. Does not implicitly {@link meshtastic.RemoteHardwarePin.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.RemoteHardwarePin
     * @static
     * @param {meshtastic.IRemoteHardwarePin} message RemoteHardwarePin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RemoteHardwarePin.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.gpioPin != null && Object.hasOwnProperty.call(message, 'gpioPin'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.gpioPin)
      if (message.name != null && Object.hasOwnProperty.call(message, 'name'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name)
      if (message.type != null && Object.hasOwnProperty.call(message, 'type')) writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.type)
      return writer
    }

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
    RemoteHardwarePin.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.RemoteHardwarePin()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
   * @property {number} ALERT_APP=11 Same as Text Message but used for critical alerts.
   * @property {number} KEY_VERIFICATION_APP=12 Module/port for handling key verification requests.
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
   * a certain destination would take on the mesh. Contains a RouteDiscovery message as payload.
   * ENCODING: Protobuf
   * @property {number} NEIGHBORINFO_APP=71 Aggregates edge info for the network by sending out a list of each node's neighbors
   * ENCODING: Protobuf
   * @property {number} ATAK_PLUGIN=72 ATAK Plugin
   * Portnum for payloads from the official Meshtastic ATAK plugin
   * @property {number} MAP_REPORT_APP=73 Provides unencrypted information about a node for consumption by a map via MQTT
   * @property {number} POWERSTRESS_APP=74 PowerStress based monitoring support (for automated power consumption testing)
   * @property {number} RETICULUM_TUNNEL_APP=76 Reticulum Network Stack Tunnel App
   * ENCODING: Fragmented RNS Packet. Handled by Meshtastic RNS interface
   * @property {number} CAYENNE_APP=77 App for transporting Cayenne Low Power Payload, popular for LoRaWAN sensor nodes. Offers ability to send
   * arbitrary telemetry over meshtastic that is not covered by telemetry.proto
   * ENCODING: CayenneLLP
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
    values[(valuesById[11] = 'ALERT_APP')] = 11
    values[(valuesById[12] = 'KEY_VERIFICATION_APP')] = 12
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
    values[(valuesById[76] = 'RETICULUM_TUNNEL_APP')] = 76
    values[(valuesById[77] = 'CAYENNE_APP')] = 77
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

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * DeviceMetrics _batteryLevel.
     * @member {"batteryLevel"|undefined} _batteryLevel
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    Object.defineProperty(DeviceMetrics.prototype, '_batteryLevel', {
      get: $util.oneOfGetter(($oneOfFields = ['batteryLevel'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceMetrics _voltage.
     * @member {"voltage"|undefined} _voltage
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    Object.defineProperty(DeviceMetrics.prototype, '_voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceMetrics _channelUtilization.
     * @member {"channelUtilization"|undefined} _channelUtilization
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    Object.defineProperty(DeviceMetrics.prototype, '_channelUtilization', {
      get: $util.oneOfGetter(($oneOfFields = ['channelUtilization'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceMetrics _airUtilTx.
     * @member {"airUtilTx"|undefined} _airUtilTx
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    Object.defineProperty(DeviceMetrics.prototype, '_airUtilTx', {
      get: $util.oneOfGetter(($oneOfFields = ['airUtilTx'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceMetrics _uptimeSeconds.
     * @member {"uptimeSeconds"|undefined} _uptimeSeconds
     * @memberof meshtastic.DeviceMetrics
     * @instance
     */
    Object.defineProperty(DeviceMetrics.prototype, '_uptimeSeconds', {
      get: $util.oneOfGetter(($oneOfFields = ['uptimeSeconds'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified DeviceMetrics message. Does not implicitly {@link meshtastic.DeviceMetrics.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.DeviceMetrics
     * @static
     * @param {meshtastic.IDeviceMetrics} message DeviceMetrics message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeviceMetrics.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.batteryLevel != null && Object.hasOwnProperty.call(message, 'batteryLevel'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.batteryLevel)
      if (message.voltage != null && Object.hasOwnProperty.call(message, 'voltage'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.voltage)
      if (message.channelUtilization != null && Object.hasOwnProperty.call(message, 'channelUtilization'))
        writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.channelUtilization)
      if (message.airUtilTx != null && Object.hasOwnProperty.call(message, 'airUtilTx'))
        writer.uint32(/* id 4, wireType 5 =*/ 37).float(message.airUtilTx)
      if (message.uptimeSeconds != null && Object.hasOwnProperty.call(message, 'uptimeSeconds'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.uptimeSeconds)
      return writer
    }

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
    DeviceMetrics.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.DeviceMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @property {number|null} [radiation] Radiation in µR/h
     * @property {number|null} [rainfall_1h] Rainfall in the last hour in mm
     * @property {number|null} [rainfall_24h] Rainfall in the last 24 hours in mm
     * @property {number|null} [soilMoisture] Soil moisture measured (% 1-100)
     * @property {number|null} [soilTemperature] Soil temperature measured (*C)
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
     * Radiation in µR/h
     * @member {number|null|undefined} radiation
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.radiation = null

    /**
     * Rainfall in the last hour in mm
     * @member {number|null|undefined} rainfall_1h
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.rainfall_1h = null

    /**
     * Rainfall in the last 24 hours in mm
     * @member {number|null|undefined} rainfall_24h
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.rainfall_24h = null

    /**
     * Soil moisture measured (% 1-100)
     * @member {number|null|undefined} soilMoisture
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.soilMoisture = null

    /**
     * Soil temperature measured (*C)
     * @member {number|null|undefined} soilTemperature
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    EnvironmentMetrics.prototype.soilTemperature = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * EnvironmentMetrics _temperature.
     * @member {"temperature"|undefined} _temperature
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_temperature', {
      get: $util.oneOfGetter(($oneOfFields = ['temperature'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _relativeHumidity.
     * @member {"relativeHumidity"|undefined} _relativeHumidity
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_relativeHumidity', {
      get: $util.oneOfGetter(($oneOfFields = ['relativeHumidity'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _barometricPressure.
     * @member {"barometricPressure"|undefined} _barometricPressure
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_barometricPressure', {
      get: $util.oneOfGetter(($oneOfFields = ['barometricPressure'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _gasResistance.
     * @member {"gasResistance"|undefined} _gasResistance
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_gasResistance', {
      get: $util.oneOfGetter(($oneOfFields = ['gasResistance'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _voltage.
     * @member {"voltage"|undefined} _voltage
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _current.
     * @member {"current"|undefined} _current
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_current', {
      get: $util.oneOfGetter(($oneOfFields = ['current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _iaq.
     * @member {"iaq"|undefined} _iaq
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_iaq', {
      get: $util.oneOfGetter(($oneOfFields = ['iaq'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _distance.
     * @member {"distance"|undefined} _distance
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_distance', {
      get: $util.oneOfGetter(($oneOfFields = ['distance'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _lux.
     * @member {"lux"|undefined} _lux
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_lux', {
      get: $util.oneOfGetter(($oneOfFields = ['lux'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _whiteLux.
     * @member {"whiteLux"|undefined} _whiteLux
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_whiteLux', {
      get: $util.oneOfGetter(($oneOfFields = ['whiteLux'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _irLux.
     * @member {"irLux"|undefined} _irLux
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_irLux', {
      get: $util.oneOfGetter(($oneOfFields = ['irLux'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _uvLux.
     * @member {"uvLux"|undefined} _uvLux
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_uvLux', {
      get: $util.oneOfGetter(($oneOfFields = ['uvLux'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _windDirection.
     * @member {"windDirection"|undefined} _windDirection
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_windDirection', {
      get: $util.oneOfGetter(($oneOfFields = ['windDirection'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _windSpeed.
     * @member {"windSpeed"|undefined} _windSpeed
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_windSpeed', {
      get: $util.oneOfGetter(($oneOfFields = ['windSpeed'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _weight.
     * @member {"weight"|undefined} _weight
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_weight', {
      get: $util.oneOfGetter(($oneOfFields = ['weight'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _windGust.
     * @member {"windGust"|undefined} _windGust
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_windGust', {
      get: $util.oneOfGetter(($oneOfFields = ['windGust'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _windLull.
     * @member {"windLull"|undefined} _windLull
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_windLull', {
      get: $util.oneOfGetter(($oneOfFields = ['windLull'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _radiation.
     * @member {"radiation"|undefined} _radiation
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_radiation', {
      get: $util.oneOfGetter(($oneOfFields = ['radiation'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _rainfall_1h.
     * @member {"rainfall_1h"|undefined} _rainfall_1h
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_rainfall_1h', {
      get: $util.oneOfGetter(($oneOfFields = ['rainfall_1h'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _rainfall_24h.
     * @member {"rainfall_24h"|undefined} _rainfall_24h
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_rainfall_24h', {
      get: $util.oneOfGetter(($oneOfFields = ['rainfall_24h'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _soilMoisture.
     * @member {"soilMoisture"|undefined} _soilMoisture
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_soilMoisture', {
      get: $util.oneOfGetter(($oneOfFields = ['soilMoisture'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * EnvironmentMetrics _soilTemperature.
     * @member {"soilTemperature"|undefined} _soilTemperature
     * @memberof meshtastic.EnvironmentMetrics
     * @instance
     */
    Object.defineProperty(EnvironmentMetrics.prototype, '_soilTemperature', {
      get: $util.oneOfGetter(($oneOfFields = ['soilTemperature'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified EnvironmentMetrics message. Does not implicitly {@link meshtastic.EnvironmentMetrics.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.EnvironmentMetrics
     * @static
     * @param {meshtastic.IEnvironmentMetrics} message EnvironmentMetrics message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EnvironmentMetrics.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.temperature != null && Object.hasOwnProperty.call(message, 'temperature'))
        writer.uint32(/* id 1, wireType 5 =*/ 13).float(message.temperature)
      if (message.relativeHumidity != null && Object.hasOwnProperty.call(message, 'relativeHumidity'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.relativeHumidity)
      if (message.barometricPressure != null && Object.hasOwnProperty.call(message, 'barometricPressure'))
        writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.barometricPressure)
      if (message.gasResistance != null && Object.hasOwnProperty.call(message, 'gasResistance'))
        writer.uint32(/* id 4, wireType 5 =*/ 37).float(message.gasResistance)
      if (message.voltage != null && Object.hasOwnProperty.call(message, 'voltage'))
        writer.uint32(/* id 5, wireType 5 =*/ 45).float(message.voltage)
      if (message.current != null && Object.hasOwnProperty.call(message, 'current'))
        writer.uint32(/* id 6, wireType 5 =*/ 53).float(message.current)
      if (message.iaq != null && Object.hasOwnProperty.call(message, 'iaq')) writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.iaq)
      if (message.distance != null && Object.hasOwnProperty.call(message, 'distance'))
        writer.uint32(/* id 8, wireType 5 =*/ 69).float(message.distance)
      if (message.lux != null && Object.hasOwnProperty.call(message, 'lux')) writer.uint32(/* id 9, wireType 5 =*/ 77).float(message.lux)
      if (message.whiteLux != null && Object.hasOwnProperty.call(message, 'whiteLux'))
        writer.uint32(/* id 10, wireType 5 =*/ 85).float(message.whiteLux)
      if (message.irLux != null && Object.hasOwnProperty.call(message, 'irLux'))
        writer.uint32(/* id 11, wireType 5 =*/ 93).float(message.irLux)
      if (message.uvLux != null && Object.hasOwnProperty.call(message, 'uvLux'))
        writer.uint32(/* id 12, wireType 5 =*/ 101).float(message.uvLux)
      if (message.windDirection != null && Object.hasOwnProperty.call(message, 'windDirection'))
        writer.uint32(/* id 13, wireType 0 =*/ 104).uint32(message.windDirection)
      if (message.windSpeed != null && Object.hasOwnProperty.call(message, 'windSpeed'))
        writer.uint32(/* id 14, wireType 5 =*/ 117).float(message.windSpeed)
      if (message.weight != null && Object.hasOwnProperty.call(message, 'weight'))
        writer.uint32(/* id 15, wireType 5 =*/ 125).float(message.weight)
      if (message.windGust != null && Object.hasOwnProperty.call(message, 'windGust'))
        writer.uint32(/* id 16, wireType 5 =*/ 133).float(message.windGust)
      if (message.windLull != null && Object.hasOwnProperty.call(message, 'windLull'))
        writer.uint32(/* id 17, wireType 5 =*/ 141).float(message.windLull)
      if (message.radiation != null && Object.hasOwnProperty.call(message, 'radiation'))
        writer.uint32(/* id 18, wireType 5 =*/ 149).float(message.radiation)
      if (message.rainfall_1h != null && Object.hasOwnProperty.call(message, 'rainfall_1h'))
        writer.uint32(/* id 19, wireType 5 =*/ 157).float(message.rainfall_1h)
      if (message.rainfall_24h != null && Object.hasOwnProperty.call(message, 'rainfall_24h'))
        writer.uint32(/* id 20, wireType 5 =*/ 165).float(message.rainfall_24h)
      if (message.soilMoisture != null && Object.hasOwnProperty.call(message, 'soilMoisture'))
        writer.uint32(/* id 21, wireType 0 =*/ 168).uint32(message.soilMoisture)
      if (message.soilTemperature != null && Object.hasOwnProperty.call(message, 'soilTemperature'))
        writer.uint32(/* id 22, wireType 5 =*/ 181).float(message.soilTemperature)
      return writer
    }

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
    EnvironmentMetrics.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.EnvironmentMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 18: {
            message.radiation = reader.float()
            break
          }
          case 19: {
            message.rainfall_1h = reader.float()
            break
          }
          case 20: {
            message.rainfall_24h = reader.float()
            break
          }
          case 21: {
            message.soilMoisture = reader.uint32()
            break
          }
          case 22: {
            message.soilTemperature = reader.float()
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
     * @property {number|null} [ch4Voltage] Voltage (Ch4)
     * @property {number|null} [ch4Current] Current (Ch4)
     * @property {number|null} [ch5Voltage] Voltage (Ch5)
     * @property {number|null} [ch5Current] Current (Ch5)
     * @property {number|null} [ch6Voltage] Voltage (Ch6)
     * @property {number|null} [ch6Current] Current (Ch6)
     * @property {number|null} [ch7Voltage] Voltage (Ch7)
     * @property {number|null} [ch7Current] Current (Ch7)
     * @property {number|null} [ch8Voltage] Voltage (Ch8)
     * @property {number|null} [ch8Current] Current (Ch8)
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
     * Voltage (Ch4)
     * @member {number|null|undefined} ch4Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch4Voltage = null

    /**
     * Current (Ch4)
     * @member {number|null|undefined} ch4Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch4Current = null

    /**
     * Voltage (Ch5)
     * @member {number|null|undefined} ch5Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch5Voltage = null

    /**
     * Current (Ch5)
     * @member {number|null|undefined} ch5Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch5Current = null

    /**
     * Voltage (Ch6)
     * @member {number|null|undefined} ch6Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch6Voltage = null

    /**
     * Current (Ch6)
     * @member {number|null|undefined} ch6Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch6Current = null

    /**
     * Voltage (Ch7)
     * @member {number|null|undefined} ch7Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch7Voltage = null

    /**
     * Current (Ch7)
     * @member {number|null|undefined} ch7Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch7Current = null

    /**
     * Voltage (Ch8)
     * @member {number|null|undefined} ch8Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch8Voltage = null

    /**
     * Current (Ch8)
     * @member {number|null|undefined} ch8Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    PowerMetrics.prototype.ch8Current = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * PowerMetrics _ch1Voltage.
     * @member {"ch1Voltage"|undefined} _ch1Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch1Voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['ch1Voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch1Current.
     * @member {"ch1Current"|undefined} _ch1Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch1Current', {
      get: $util.oneOfGetter(($oneOfFields = ['ch1Current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch2Voltage.
     * @member {"ch2Voltage"|undefined} _ch2Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch2Voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['ch2Voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch2Current.
     * @member {"ch2Current"|undefined} _ch2Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch2Current', {
      get: $util.oneOfGetter(($oneOfFields = ['ch2Current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch3Voltage.
     * @member {"ch3Voltage"|undefined} _ch3Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch3Voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['ch3Voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch3Current.
     * @member {"ch3Current"|undefined} _ch3Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch3Current', {
      get: $util.oneOfGetter(($oneOfFields = ['ch3Current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch4Voltage.
     * @member {"ch4Voltage"|undefined} _ch4Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch4Voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['ch4Voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch4Current.
     * @member {"ch4Current"|undefined} _ch4Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch4Current', {
      get: $util.oneOfGetter(($oneOfFields = ['ch4Current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch5Voltage.
     * @member {"ch5Voltage"|undefined} _ch5Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch5Voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['ch5Voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch5Current.
     * @member {"ch5Current"|undefined} _ch5Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch5Current', {
      get: $util.oneOfGetter(($oneOfFields = ['ch5Current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch6Voltage.
     * @member {"ch6Voltage"|undefined} _ch6Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch6Voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['ch6Voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch6Current.
     * @member {"ch6Current"|undefined} _ch6Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch6Current', {
      get: $util.oneOfGetter(($oneOfFields = ['ch6Current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch7Voltage.
     * @member {"ch7Voltage"|undefined} _ch7Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch7Voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['ch7Voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch7Current.
     * @member {"ch7Current"|undefined} _ch7Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch7Current', {
      get: $util.oneOfGetter(($oneOfFields = ['ch7Current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch8Voltage.
     * @member {"ch8Voltage"|undefined} _ch8Voltage
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch8Voltage', {
      get: $util.oneOfGetter(($oneOfFields = ['ch8Voltage'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * PowerMetrics _ch8Current.
     * @member {"ch8Current"|undefined} _ch8Current
     * @memberof meshtastic.PowerMetrics
     * @instance
     */
    Object.defineProperty(PowerMetrics.prototype, '_ch8Current', {
      get: $util.oneOfGetter(($oneOfFields = ['ch8Current'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified PowerMetrics message. Does not implicitly {@link meshtastic.PowerMetrics.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.PowerMetrics
     * @static
     * @param {meshtastic.IPowerMetrics} message PowerMetrics message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PowerMetrics.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.ch1Voltage != null && Object.hasOwnProperty.call(message, 'ch1Voltage'))
        writer.uint32(/* id 1, wireType 5 =*/ 13).float(message.ch1Voltage)
      if (message.ch1Current != null && Object.hasOwnProperty.call(message, 'ch1Current'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.ch1Current)
      if (message.ch2Voltage != null && Object.hasOwnProperty.call(message, 'ch2Voltage'))
        writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.ch2Voltage)
      if (message.ch2Current != null && Object.hasOwnProperty.call(message, 'ch2Current'))
        writer.uint32(/* id 4, wireType 5 =*/ 37).float(message.ch2Current)
      if (message.ch3Voltage != null && Object.hasOwnProperty.call(message, 'ch3Voltage'))
        writer.uint32(/* id 5, wireType 5 =*/ 45).float(message.ch3Voltage)
      if (message.ch3Current != null && Object.hasOwnProperty.call(message, 'ch3Current'))
        writer.uint32(/* id 6, wireType 5 =*/ 53).float(message.ch3Current)
      if (message.ch4Voltage != null && Object.hasOwnProperty.call(message, 'ch4Voltage'))
        writer.uint32(/* id 7, wireType 5 =*/ 61).float(message.ch4Voltage)
      if (message.ch4Current != null && Object.hasOwnProperty.call(message, 'ch4Current'))
        writer.uint32(/* id 8, wireType 5 =*/ 69).float(message.ch4Current)
      if (message.ch5Voltage != null && Object.hasOwnProperty.call(message, 'ch5Voltage'))
        writer.uint32(/* id 9, wireType 5 =*/ 77).float(message.ch5Voltage)
      if (message.ch5Current != null && Object.hasOwnProperty.call(message, 'ch5Current'))
        writer.uint32(/* id 10, wireType 5 =*/ 85).float(message.ch5Current)
      if (message.ch6Voltage != null && Object.hasOwnProperty.call(message, 'ch6Voltage'))
        writer.uint32(/* id 11, wireType 5 =*/ 93).float(message.ch6Voltage)
      if (message.ch6Current != null && Object.hasOwnProperty.call(message, 'ch6Current'))
        writer.uint32(/* id 12, wireType 5 =*/ 101).float(message.ch6Current)
      if (message.ch7Voltage != null && Object.hasOwnProperty.call(message, 'ch7Voltage'))
        writer.uint32(/* id 13, wireType 5 =*/ 109).float(message.ch7Voltage)
      if (message.ch7Current != null && Object.hasOwnProperty.call(message, 'ch7Current'))
        writer.uint32(/* id 14, wireType 5 =*/ 117).float(message.ch7Current)
      if (message.ch8Voltage != null && Object.hasOwnProperty.call(message, 'ch8Voltage'))
        writer.uint32(/* id 15, wireType 5 =*/ 125).float(message.ch8Voltage)
      if (message.ch8Current != null && Object.hasOwnProperty.call(message, 'ch8Current'))
        writer.uint32(/* id 16, wireType 5 =*/ 133).float(message.ch8Current)
      return writer
    }

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
    PowerMetrics.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.PowerMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 7: {
            message.ch4Voltage = reader.float()
            break
          }
          case 8: {
            message.ch4Current = reader.float()
            break
          }
          case 9: {
            message.ch5Voltage = reader.float()
            break
          }
          case 10: {
            message.ch5Current = reader.float()
            break
          }
          case 11: {
            message.ch6Voltage = reader.float()
            break
          }
          case 12: {
            message.ch6Current = reader.float()
            break
          }
          case 13: {
            message.ch7Voltage = reader.float()
            break
          }
          case 14: {
            message.ch7Current = reader.float()
            break
          }
          case 15: {
            message.ch8Voltage = reader.float()
            break
          }
          case 16: {
            message.ch8Current = reader.float()
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
     * @property {number|null} [pm10Standard] Concentration Units Standard PM1.0 in ug/m3
     * @property {number|null} [pm25Standard] Concentration Units Standard PM2.5 in ug/m3
     * @property {number|null} [pm100Standard] Concentration Units Standard PM10.0 in ug/m3
     * @property {number|null} [pm10Environmental] Concentration Units Environmental PM1.0 in ug/m3
     * @property {number|null} [pm25Environmental] Concentration Units Environmental PM2.5 in ug/m3
     * @property {number|null} [pm100Environmental] Concentration Units Environmental PM10.0 in ug/m3
     * @property {number|null} [particles_03um] 0.3um Particle Count in #/0.1l
     * @property {number|null} [particles_05um] 0.5um Particle Count in #/0.1l
     * @property {number|null} [particles_10um] 1.0um Particle Count in #/0.1l
     * @property {number|null} [particles_25um] 2.5um Particle Count in #/0.1l
     * @property {number|null} [particles_50um] 5.0um Particle Count in #/0.1l
     * @property {number|null} [particles_100um] 10.0um Particle Count in #/0.1l
     * @property {number|null} [co2] CO2 concentration in ppm
     * @property {number|null} [co2Temperature] CO2 sensor temperature in degC
     * @property {number|null} [co2Humidity] CO2 sensor relative humidity in %
     * @property {number|null} [formFormaldehyde] Formaldehyde sensor formaldehyde concentration in ppb
     * @property {number|null} [formHumidity] Formaldehyde sensor relative humidity in %RH
     * @property {number|null} [formTemperature] Formaldehyde sensor temperature in degrees Celsius
     * @property {number|null} [pm40Standard] Concentration Units Standard PM4.0 in ug/m3
     * @property {number|null} [particles_40um] 4.0um Particle Count in #/0.1l
     * @property {number|null} [pmTemperature] PM Sensor Temperature
     * @property {number|null} [pmHumidity] PM Sensor humidity
     * @property {number|null} [pmVocIdx] PM Sensor VOC Index
     * @property {number|null} [pmNoxIdx] PM Sensor NOx Index
     * @property {number|null} [particlesTps] Typical Particle Size in um
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
     * Concentration Units Standard PM1.0 in ug/m3
     * @member {number|null|undefined} pm10Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm10Standard = null

    /**
     * Concentration Units Standard PM2.5 in ug/m3
     * @member {number|null|undefined} pm25Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm25Standard = null

    /**
     * Concentration Units Standard PM10.0 in ug/m3
     * @member {number|null|undefined} pm100Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm100Standard = null

    /**
     * Concentration Units Environmental PM1.0 in ug/m3
     * @member {number|null|undefined} pm10Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm10Environmental = null

    /**
     * Concentration Units Environmental PM2.5 in ug/m3
     * @member {number|null|undefined} pm25Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm25Environmental = null

    /**
     * Concentration Units Environmental PM10.0 in ug/m3
     * @member {number|null|undefined} pm100Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm100Environmental = null

    /**
     * 0.3um Particle Count in #/0.1l
     * @member {number|null|undefined} particles_03um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_03um = null

    /**
     * 0.5um Particle Count in #/0.1l
     * @member {number|null|undefined} particles_05um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_05um = null

    /**
     * 1.0um Particle Count in #/0.1l
     * @member {number|null|undefined} particles_10um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_10um = null

    /**
     * 2.5um Particle Count in #/0.1l
     * @member {number|null|undefined} particles_25um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_25um = null

    /**
     * 5.0um Particle Count in #/0.1l
     * @member {number|null|undefined} particles_50um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_50um = null

    /**
     * 10.0um Particle Count in #/0.1l
     * @member {number|null|undefined} particles_100um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_100um = null

    /**
     * CO2 concentration in ppm
     * @member {number|null|undefined} co2
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.co2 = null

    /**
     * CO2 sensor temperature in degC
     * @member {number|null|undefined} co2Temperature
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.co2Temperature = null

    /**
     * CO2 sensor relative humidity in %
     * @member {number|null|undefined} co2Humidity
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.co2Humidity = null

    /**
     * Formaldehyde sensor formaldehyde concentration in ppb
     * @member {number|null|undefined} formFormaldehyde
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.formFormaldehyde = null

    /**
     * Formaldehyde sensor relative humidity in %RH
     * @member {number|null|undefined} formHumidity
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.formHumidity = null

    /**
     * Formaldehyde sensor temperature in degrees Celsius
     * @member {number|null|undefined} formTemperature
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.formTemperature = null

    /**
     * Concentration Units Standard PM4.0 in ug/m3
     * @member {number|null|undefined} pm40Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pm40Standard = null

    /**
     * 4.0um Particle Count in #/0.1l
     * @member {number|null|undefined} particles_40um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particles_40um = null

    /**
     * PM Sensor Temperature
     * @member {number|null|undefined} pmTemperature
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pmTemperature = null

    /**
     * PM Sensor humidity
     * @member {number|null|undefined} pmHumidity
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pmHumidity = null

    /**
     * PM Sensor VOC Index
     * @member {number|null|undefined} pmVocIdx
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pmVocIdx = null

    /**
     * PM Sensor NOx Index
     * @member {number|null|undefined} pmNoxIdx
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.pmNoxIdx = null

    /**
     * Typical Particle Size in um
     * @member {number|null|undefined} particlesTps
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    AirQualityMetrics.prototype.particlesTps = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * AirQualityMetrics _pm10Standard.
     * @member {"pm10Standard"|undefined} _pm10Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pm10Standard', {
      get: $util.oneOfGetter(($oneOfFields = ['pm10Standard'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pm25Standard.
     * @member {"pm25Standard"|undefined} _pm25Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pm25Standard', {
      get: $util.oneOfGetter(($oneOfFields = ['pm25Standard'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pm100Standard.
     * @member {"pm100Standard"|undefined} _pm100Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pm100Standard', {
      get: $util.oneOfGetter(($oneOfFields = ['pm100Standard'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pm10Environmental.
     * @member {"pm10Environmental"|undefined} _pm10Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pm10Environmental', {
      get: $util.oneOfGetter(($oneOfFields = ['pm10Environmental'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pm25Environmental.
     * @member {"pm25Environmental"|undefined} _pm25Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pm25Environmental', {
      get: $util.oneOfGetter(($oneOfFields = ['pm25Environmental'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pm100Environmental.
     * @member {"pm100Environmental"|undefined} _pm100Environmental
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pm100Environmental', {
      get: $util.oneOfGetter(($oneOfFields = ['pm100Environmental'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _particles_03um.
     * @member {"particles_03um"|undefined} _particles_03um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_particles_03um', {
      get: $util.oneOfGetter(($oneOfFields = ['particles_03um'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _particles_05um.
     * @member {"particles_05um"|undefined} _particles_05um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_particles_05um', {
      get: $util.oneOfGetter(($oneOfFields = ['particles_05um'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _particles_10um.
     * @member {"particles_10um"|undefined} _particles_10um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_particles_10um', {
      get: $util.oneOfGetter(($oneOfFields = ['particles_10um'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _particles_25um.
     * @member {"particles_25um"|undefined} _particles_25um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_particles_25um', {
      get: $util.oneOfGetter(($oneOfFields = ['particles_25um'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _particles_50um.
     * @member {"particles_50um"|undefined} _particles_50um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_particles_50um', {
      get: $util.oneOfGetter(($oneOfFields = ['particles_50um'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _particles_100um.
     * @member {"particles_100um"|undefined} _particles_100um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_particles_100um', {
      get: $util.oneOfGetter(($oneOfFields = ['particles_100um'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _co2.
     * @member {"co2"|undefined} _co2
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_co2', {
      get: $util.oneOfGetter(($oneOfFields = ['co2'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _co2Temperature.
     * @member {"co2Temperature"|undefined} _co2Temperature
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_co2Temperature', {
      get: $util.oneOfGetter(($oneOfFields = ['co2Temperature'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _co2Humidity.
     * @member {"co2Humidity"|undefined} _co2Humidity
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_co2Humidity', {
      get: $util.oneOfGetter(($oneOfFields = ['co2Humidity'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _formFormaldehyde.
     * @member {"formFormaldehyde"|undefined} _formFormaldehyde
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_formFormaldehyde', {
      get: $util.oneOfGetter(($oneOfFields = ['formFormaldehyde'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _formHumidity.
     * @member {"formHumidity"|undefined} _formHumidity
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_formHumidity', {
      get: $util.oneOfGetter(($oneOfFields = ['formHumidity'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _formTemperature.
     * @member {"formTemperature"|undefined} _formTemperature
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_formTemperature', {
      get: $util.oneOfGetter(($oneOfFields = ['formTemperature'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pm40Standard.
     * @member {"pm40Standard"|undefined} _pm40Standard
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pm40Standard', {
      get: $util.oneOfGetter(($oneOfFields = ['pm40Standard'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _particles_40um.
     * @member {"particles_40um"|undefined} _particles_40um
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_particles_40um', {
      get: $util.oneOfGetter(($oneOfFields = ['particles_40um'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pmTemperature.
     * @member {"pmTemperature"|undefined} _pmTemperature
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pmTemperature', {
      get: $util.oneOfGetter(($oneOfFields = ['pmTemperature'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pmHumidity.
     * @member {"pmHumidity"|undefined} _pmHumidity
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pmHumidity', {
      get: $util.oneOfGetter(($oneOfFields = ['pmHumidity'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pmVocIdx.
     * @member {"pmVocIdx"|undefined} _pmVocIdx
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pmVocIdx', {
      get: $util.oneOfGetter(($oneOfFields = ['pmVocIdx'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _pmNoxIdx.
     * @member {"pmNoxIdx"|undefined} _pmNoxIdx
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_pmNoxIdx', {
      get: $util.oneOfGetter(($oneOfFields = ['pmNoxIdx'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * AirQualityMetrics _particlesTps.
     * @member {"particlesTps"|undefined} _particlesTps
     * @memberof meshtastic.AirQualityMetrics
     * @instance
     */
    Object.defineProperty(AirQualityMetrics.prototype, '_particlesTps', {
      get: $util.oneOfGetter(($oneOfFields = ['particlesTps'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified AirQualityMetrics message. Does not implicitly {@link meshtastic.AirQualityMetrics.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.AirQualityMetrics
     * @static
     * @param {meshtastic.IAirQualityMetrics} message AirQualityMetrics message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AirQualityMetrics.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.pm10Standard != null && Object.hasOwnProperty.call(message, 'pm10Standard'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.pm10Standard)
      if (message.pm25Standard != null && Object.hasOwnProperty.call(message, 'pm25Standard'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.pm25Standard)
      if (message.pm100Standard != null && Object.hasOwnProperty.call(message, 'pm100Standard'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.pm100Standard)
      if (message.pm10Environmental != null && Object.hasOwnProperty.call(message, 'pm10Environmental'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.pm10Environmental)
      if (message.pm25Environmental != null && Object.hasOwnProperty.call(message, 'pm25Environmental'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.pm25Environmental)
      if (message.pm100Environmental != null && Object.hasOwnProperty.call(message, 'pm100Environmental'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.pm100Environmental)
      if (message.particles_03um != null && Object.hasOwnProperty.call(message, 'particles_03um'))
        writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.particles_03um)
      if (message.particles_05um != null && Object.hasOwnProperty.call(message, 'particles_05um'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.particles_05um)
      if (message.particles_10um != null && Object.hasOwnProperty.call(message, 'particles_10um'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.particles_10um)
      if (message.particles_25um != null && Object.hasOwnProperty.call(message, 'particles_25um'))
        writer.uint32(/* id 10, wireType 0 =*/ 80).uint32(message.particles_25um)
      if (message.particles_50um != null && Object.hasOwnProperty.call(message, 'particles_50um'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).uint32(message.particles_50um)
      if (message.particles_100um != null && Object.hasOwnProperty.call(message, 'particles_100um'))
        writer.uint32(/* id 12, wireType 0 =*/ 96).uint32(message.particles_100um)
      if (message.co2 != null && Object.hasOwnProperty.call(message, 'co2')) writer.uint32(/* id 13, wireType 0 =*/ 104).uint32(message.co2)
      if (message.co2Temperature != null && Object.hasOwnProperty.call(message, 'co2Temperature'))
        writer.uint32(/* id 14, wireType 5 =*/ 117).float(message.co2Temperature)
      if (message.co2Humidity != null && Object.hasOwnProperty.call(message, 'co2Humidity'))
        writer.uint32(/* id 15, wireType 5 =*/ 125).float(message.co2Humidity)
      if (message.formFormaldehyde != null && Object.hasOwnProperty.call(message, 'formFormaldehyde'))
        writer.uint32(/* id 16, wireType 5 =*/ 133).float(message.formFormaldehyde)
      if (message.formHumidity != null && Object.hasOwnProperty.call(message, 'formHumidity'))
        writer.uint32(/* id 17, wireType 5 =*/ 141).float(message.formHumidity)
      if (message.formTemperature != null && Object.hasOwnProperty.call(message, 'formTemperature'))
        writer.uint32(/* id 18, wireType 5 =*/ 149).float(message.formTemperature)
      if (message.pm40Standard != null && Object.hasOwnProperty.call(message, 'pm40Standard'))
        writer.uint32(/* id 19, wireType 0 =*/ 152).uint32(message.pm40Standard)
      if (message.particles_40um != null && Object.hasOwnProperty.call(message, 'particles_40um'))
        writer.uint32(/* id 20, wireType 0 =*/ 160).uint32(message.particles_40um)
      if (message.pmTemperature != null && Object.hasOwnProperty.call(message, 'pmTemperature'))
        writer.uint32(/* id 21, wireType 5 =*/ 173).float(message.pmTemperature)
      if (message.pmHumidity != null && Object.hasOwnProperty.call(message, 'pmHumidity'))
        writer.uint32(/* id 22, wireType 5 =*/ 181).float(message.pmHumidity)
      if (message.pmVocIdx != null && Object.hasOwnProperty.call(message, 'pmVocIdx'))
        writer.uint32(/* id 23, wireType 5 =*/ 189).float(message.pmVocIdx)
      if (message.pmNoxIdx != null && Object.hasOwnProperty.call(message, 'pmNoxIdx'))
        writer.uint32(/* id 24, wireType 5 =*/ 197).float(message.pmNoxIdx)
      if (message.particlesTps != null && Object.hasOwnProperty.call(message, 'particlesTps'))
        writer.uint32(/* id 25, wireType 5 =*/ 205).float(message.particlesTps)
      return writer
    }

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
    AirQualityMetrics.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.AirQualityMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 13: {
            message.co2 = reader.uint32()
            break
          }
          case 14: {
            message.co2Temperature = reader.float()
            break
          }
          case 15: {
            message.co2Humidity = reader.float()
            break
          }
          case 16: {
            message.formFormaldehyde = reader.float()
            break
          }
          case 17: {
            message.formHumidity = reader.float()
            break
          }
          case 18: {
            message.formTemperature = reader.float()
            break
          }
          case 19: {
            message.pm40Standard = reader.uint32()
            break
          }
          case 20: {
            message.particles_40um = reader.uint32()
            break
          }
          case 21: {
            message.pmTemperature = reader.float()
            break
          }
          case 22: {
            message.pmHumidity = reader.float()
            break
          }
          case 23: {
            message.pmVocIdx = reader.float()
            break
          }
          case 24: {
            message.pmNoxIdx = reader.float()
            break
          }
          case 25: {
            message.particlesTps = reader.float()
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

  meshtastic.LocalStats = (function () {
    /**
     * Properties of a LocalStats.
     * @memberof meshtastic
     * @interface ILocalStats
     * @property {number|null} [uptimeSeconds] How long the device has been running since the last reboot (in seconds)
     * @property {number|null} [channelUtilization] Utilization for the current channel, including well formed TX, RX and malformed RX (aka noise).
     * @property {number|null} [airUtilTx] Percent of airtime for transmission used within the last hour.
     * @property {number|null} [numPacketsTx] Number of packets sent
     * @property {number|null} [numPacketsRx] Number of packets received (both good and bad)
     * @property {number|null} [numPacketsRxBad] Number of packets received that are malformed or violate the protocol
     * @property {number|null} [numOnlineNodes] Number of nodes online (in the past 2 hours)
     * @property {number|null} [numTotalNodes] Number of nodes total
     * @property {number|null} [numRxDupe] Number of received packets that were duplicates (due to multiple nodes relaying).
     * If this number is high, there are nodes in the mesh relaying packets when it's unnecessary, for example due to the ROUTER/REPEATER role.
     * @property {number|null} [numTxRelay] Number of packets we transmitted that were a relay for others (not originating from ourselves).
     * @property {number|null} [numTxRelayCanceled] Number of times we canceled a packet to be relayed, because someone else did it before us.
     * This will always be zero for ROUTERs/REPEATERs. If this number is high, some other node(s) is/are relaying faster than you.
     * @property {number|null} [heapTotalBytes] Number of bytes used in the heap
     * @property {number|null} [heapFreeBytes] Number of bytes free in the heap
     */

    /**
     * Constructs a new LocalStats.
     * @memberof meshtastic
     * @classdesc Local device mesh statistics
     * @implements ILocalStats
     * @constructor
     * @param {meshtastic.ILocalStats=} [properties] Properties to set
     */
    function LocalStats(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * How long the device has been running since the last reboot (in seconds)
     * @member {number} uptimeSeconds
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.uptimeSeconds = 0

    /**
     * Utilization for the current channel, including well formed TX, RX and malformed RX (aka noise).
     * @member {number} channelUtilization
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.channelUtilization = 0

    /**
     * Percent of airtime for transmission used within the last hour.
     * @member {number} airUtilTx
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.airUtilTx = 0

    /**
     * Number of packets sent
     * @member {number} numPacketsTx
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.numPacketsTx = 0

    /**
     * Number of packets received (both good and bad)
     * @member {number} numPacketsRx
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.numPacketsRx = 0

    /**
     * Number of packets received that are malformed or violate the protocol
     * @member {number} numPacketsRxBad
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.numPacketsRxBad = 0

    /**
     * Number of nodes online (in the past 2 hours)
     * @member {number} numOnlineNodes
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.numOnlineNodes = 0

    /**
     * Number of nodes total
     * @member {number} numTotalNodes
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.numTotalNodes = 0

    /**
     * Number of received packets that were duplicates (due to multiple nodes relaying).
     * If this number is high, there are nodes in the mesh relaying packets when it's unnecessary, for example due to the ROUTER/REPEATER role.
     * @member {number} numRxDupe
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.numRxDupe = 0

    /**
     * Number of packets we transmitted that were a relay for others (not originating from ourselves).
     * @member {number} numTxRelay
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.numTxRelay = 0

    /**
     * Number of times we canceled a packet to be relayed, because someone else did it before us.
     * This will always be zero for ROUTERs/REPEATERs. If this number is high, some other node(s) is/are relaying faster than you.
     * @member {number} numTxRelayCanceled
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.numTxRelayCanceled = 0

    /**
     * Number of bytes used in the heap
     * @member {number} heapTotalBytes
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.heapTotalBytes = 0

    /**
     * Number of bytes free in the heap
     * @member {number} heapFreeBytes
     * @memberof meshtastic.LocalStats
     * @instance
     */
    LocalStats.prototype.heapFreeBytes = 0

    /**
     * Encodes the specified LocalStats message. Does not implicitly {@link meshtastic.LocalStats.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.LocalStats
     * @static
     * @param {meshtastic.ILocalStats} message LocalStats message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LocalStats.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.uptimeSeconds != null && Object.hasOwnProperty.call(message, 'uptimeSeconds'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.uptimeSeconds)
      if (message.channelUtilization != null && Object.hasOwnProperty.call(message, 'channelUtilization'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.channelUtilization)
      if (message.airUtilTx != null && Object.hasOwnProperty.call(message, 'airUtilTx'))
        writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.airUtilTx)
      if (message.numPacketsTx != null && Object.hasOwnProperty.call(message, 'numPacketsTx'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.numPacketsTx)
      if (message.numPacketsRx != null && Object.hasOwnProperty.call(message, 'numPacketsRx'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.numPacketsRx)
      if (message.numPacketsRxBad != null && Object.hasOwnProperty.call(message, 'numPacketsRxBad'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.numPacketsRxBad)
      if (message.numOnlineNodes != null && Object.hasOwnProperty.call(message, 'numOnlineNodes'))
        writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.numOnlineNodes)
      if (message.numTotalNodes != null && Object.hasOwnProperty.call(message, 'numTotalNodes'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.numTotalNodes)
      if (message.numRxDupe != null && Object.hasOwnProperty.call(message, 'numRxDupe'))
        writer.uint32(/* id 9, wireType 0 =*/ 72).uint32(message.numRxDupe)
      if (message.numTxRelay != null && Object.hasOwnProperty.call(message, 'numTxRelay'))
        writer.uint32(/* id 10, wireType 0 =*/ 80).uint32(message.numTxRelay)
      if (message.numTxRelayCanceled != null && Object.hasOwnProperty.call(message, 'numTxRelayCanceled'))
        writer.uint32(/* id 11, wireType 0 =*/ 88).uint32(message.numTxRelayCanceled)
      if (message.heapTotalBytes != null && Object.hasOwnProperty.call(message, 'heapTotalBytes'))
        writer.uint32(/* id 12, wireType 0 =*/ 96).uint32(message.heapTotalBytes)
      if (message.heapFreeBytes != null && Object.hasOwnProperty.call(message, 'heapFreeBytes'))
        writer.uint32(/* id 13, wireType 0 =*/ 104).uint32(message.heapFreeBytes)
      return writer
    }

    /**
     * Decodes a LocalStats message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.LocalStats
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.LocalStats} LocalStats
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LocalStats.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.LocalStats()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.uptimeSeconds = reader.uint32()
            break
          }
          case 2: {
            message.channelUtilization = reader.float()
            break
          }
          case 3: {
            message.airUtilTx = reader.float()
            break
          }
          case 4: {
            message.numPacketsTx = reader.uint32()
            break
          }
          case 5: {
            message.numPacketsRx = reader.uint32()
            break
          }
          case 6: {
            message.numPacketsRxBad = reader.uint32()
            break
          }
          case 7: {
            message.numOnlineNodes = reader.uint32()
            break
          }
          case 8: {
            message.numTotalNodes = reader.uint32()
            break
          }
          case 9: {
            message.numRxDupe = reader.uint32()
            break
          }
          case 10: {
            message.numTxRelay = reader.uint32()
            break
          }
          case 11: {
            message.numTxRelayCanceled = reader.uint32()
            break
          }
          case 12: {
            message.heapTotalBytes = reader.uint32()
            break
          }
          case 13: {
            message.heapFreeBytes = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return LocalStats
  })()

  meshtastic.HealthMetrics = (function () {
    /**
     * Properties of a HealthMetrics.
     * @memberof meshtastic
     * @interface IHealthMetrics
     * @property {number|null} [heartBpm] Heart rate (beats per minute)
     * @property {number|null} [spO2] SpO2 (blood oxygen saturation) level
     * @property {number|null} [temperature] Body temperature in degrees Celsius
     */

    /**
     * Constructs a new HealthMetrics.
     * @memberof meshtastic
     * @classdesc Health telemetry metrics
     * @implements IHealthMetrics
     * @constructor
     * @param {meshtastic.IHealthMetrics=} [properties] Properties to set
     */
    function HealthMetrics(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Heart rate (beats per minute)
     * @member {number|null|undefined} heartBpm
     * @memberof meshtastic.HealthMetrics
     * @instance
     */
    HealthMetrics.prototype.heartBpm = null

    /**
     * SpO2 (blood oxygen saturation) level
     * @member {number|null|undefined} spO2
     * @memberof meshtastic.HealthMetrics
     * @instance
     */
    HealthMetrics.prototype.spO2 = null

    /**
     * Body temperature in degrees Celsius
     * @member {number|null|undefined} temperature
     * @memberof meshtastic.HealthMetrics
     * @instance
     */
    HealthMetrics.prototype.temperature = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * HealthMetrics _heartBpm.
     * @member {"heartBpm"|undefined} _heartBpm
     * @memberof meshtastic.HealthMetrics
     * @instance
     */
    Object.defineProperty(HealthMetrics.prototype, '_heartBpm', {
      get: $util.oneOfGetter(($oneOfFields = ['heartBpm'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * HealthMetrics _spO2.
     * @member {"spO2"|undefined} _spO2
     * @memberof meshtastic.HealthMetrics
     * @instance
     */
    Object.defineProperty(HealthMetrics.prototype, '_spO2', {
      get: $util.oneOfGetter(($oneOfFields = ['spO2'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * HealthMetrics _temperature.
     * @member {"temperature"|undefined} _temperature
     * @memberof meshtastic.HealthMetrics
     * @instance
     */
    Object.defineProperty(HealthMetrics.prototype, '_temperature', {
      get: $util.oneOfGetter(($oneOfFields = ['temperature'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified HealthMetrics message. Does not implicitly {@link meshtastic.HealthMetrics.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.HealthMetrics
     * @static
     * @param {meshtastic.IHealthMetrics} message HealthMetrics message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HealthMetrics.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.heartBpm != null && Object.hasOwnProperty.call(message, 'heartBpm'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.heartBpm)
      if (message.spO2 != null && Object.hasOwnProperty.call(message, 'spO2'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.spO2)
      if (message.temperature != null && Object.hasOwnProperty.call(message, 'temperature'))
        writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.temperature)
      return writer
    }

    /**
     * Decodes a HealthMetrics message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.HealthMetrics
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.HealthMetrics} HealthMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HealthMetrics.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.HealthMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.heartBpm = reader.uint32()
            break
          }
          case 2: {
            message.spO2 = reader.uint32()
            break
          }
          case 3: {
            message.temperature = reader.float()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return HealthMetrics
  })()

  meshtastic.HostMetrics = (function () {
    /**
     * Properties of a HostMetrics.
     * @memberof meshtastic
     * @interface IHostMetrics
     * @property {number|null} [uptimeSeconds] Host system uptime
     * @property {number|Long|null} [freememBytes] Host system free memory
     * @property {number|Long|null} [diskfree1Bytes] Host system disk space free for /
     * @property {number|Long|null} [diskfree2Bytes] Secondary system disk space free
     * @property {number|Long|null} [diskfree3Bytes] Tertiary disk space free
     * @property {number|null} [load1] Host system one minute load in 1/100ths
     * @property {number|null} [load5] Host system five minute load  in 1/100ths
     * @property {number|null} [load15] Host system fifteen minute load  in 1/100ths
     * @property {string|null} [userString] Optional User-provided string for arbitrary host system information
     * that doesn't make sense as a dedicated entry.
     */

    /**
     * Constructs a new HostMetrics.
     * @memberof meshtastic
     * @classdesc Linux host metrics
     * @implements IHostMetrics
     * @constructor
     * @param {meshtastic.IHostMetrics=} [properties] Properties to set
     */
    function HostMetrics(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Host system uptime
     * @member {number} uptimeSeconds
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.uptimeSeconds = 0

    /**
     * Host system free memory
     * @member {number|Long} freememBytes
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.freememBytes = $util.Long ? $util.Long.fromBits(0, 0, true) : 0

    /**
     * Host system disk space free for /
     * @member {number|Long} diskfree1Bytes
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.diskfree1Bytes = $util.Long ? $util.Long.fromBits(0, 0, true) : 0

    /**
     * Secondary system disk space free
     * @member {number|Long|null|undefined} diskfree2Bytes
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.diskfree2Bytes = null

    /**
     * Tertiary disk space free
     * @member {number|Long|null|undefined} diskfree3Bytes
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.diskfree3Bytes = null

    /**
     * Host system one minute load in 1/100ths
     * @member {number} load1
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.load1 = 0

    /**
     * Host system five minute load  in 1/100ths
     * @member {number} load5
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.load5 = 0

    /**
     * Host system fifteen minute load  in 1/100ths
     * @member {number} load15
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.load15 = 0

    /**
     * Optional User-provided string for arbitrary host system information
     * that doesn't make sense as a dedicated entry.
     * @member {string|null|undefined} userString
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    HostMetrics.prototype.userString = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * HostMetrics _diskfree2Bytes.
     * @member {"diskfree2Bytes"|undefined} _diskfree2Bytes
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    Object.defineProperty(HostMetrics.prototype, '_diskfree2Bytes', {
      get: $util.oneOfGetter(($oneOfFields = ['diskfree2Bytes'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * HostMetrics _diskfree3Bytes.
     * @member {"diskfree3Bytes"|undefined} _diskfree3Bytes
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    Object.defineProperty(HostMetrics.prototype, '_diskfree3Bytes', {
      get: $util.oneOfGetter(($oneOfFields = ['diskfree3Bytes'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * HostMetrics _userString.
     * @member {"userString"|undefined} _userString
     * @memberof meshtastic.HostMetrics
     * @instance
     */
    Object.defineProperty(HostMetrics.prototype, '_userString', {
      get: $util.oneOfGetter(($oneOfFields = ['userString'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified HostMetrics message. Does not implicitly {@link meshtastic.HostMetrics.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.HostMetrics
     * @static
     * @param {meshtastic.IHostMetrics} message HostMetrics message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HostMetrics.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.uptimeSeconds != null && Object.hasOwnProperty.call(message, 'uptimeSeconds'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.uptimeSeconds)
      if (message.freememBytes != null && Object.hasOwnProperty.call(message, 'freememBytes'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).uint64(message.freememBytes)
      if (message.diskfree1Bytes != null && Object.hasOwnProperty.call(message, 'diskfree1Bytes'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint64(message.diskfree1Bytes)
      if (message.diskfree2Bytes != null && Object.hasOwnProperty.call(message, 'diskfree2Bytes'))
        writer.uint32(/* id 4, wireType 0 =*/ 32).uint64(message.diskfree2Bytes)
      if (message.diskfree3Bytes != null && Object.hasOwnProperty.call(message, 'diskfree3Bytes'))
        writer.uint32(/* id 5, wireType 0 =*/ 40).uint64(message.diskfree3Bytes)
      if (message.load1 != null && Object.hasOwnProperty.call(message, 'load1'))
        writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.load1)
      if (message.load5 != null && Object.hasOwnProperty.call(message, 'load5'))
        writer.uint32(/* id 7, wireType 0 =*/ 56).uint32(message.load5)
      if (message.load15 != null && Object.hasOwnProperty.call(message, 'load15'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.load15)
      if (message.userString != null && Object.hasOwnProperty.call(message, 'userString'))
        writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.userString)
      return writer
    }

    /**
     * Decodes a HostMetrics message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.HostMetrics
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.HostMetrics} HostMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HostMetrics.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.HostMetrics()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            message.uptimeSeconds = reader.uint32()
            break
          }
          case 2: {
            message.freememBytes = reader.uint64()
            break
          }
          case 3: {
            message.diskfree1Bytes = reader.uint64()
            break
          }
          case 4: {
            message.diskfree2Bytes = reader.uint64()
            break
          }
          case 5: {
            message.diskfree3Bytes = reader.uint64()
            break
          }
          case 6: {
            message.load1 = reader.uint32()
            break
          }
          case 7: {
            message.load5 = reader.uint32()
            break
          }
          case 8: {
            message.load15 = reader.uint32()
            break
          }
          case 9: {
            message.userString = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return HostMetrics
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
     * @property {meshtastic.ILocalStats|null} [localStats] Local device mesh statistics
     * @property {meshtastic.IHealthMetrics|null} [healthMetrics] Health telemetry metrics
     * @property {meshtastic.IHostMetrics|null} [hostMetrics] Linux host metrics
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
     * @member {number} time
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.time = 0

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

    /**
     * Local device mesh statistics
     * @member {meshtastic.ILocalStats|null|undefined} localStats
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.localStats = null

    /**
     * Health telemetry metrics
     * @member {meshtastic.IHealthMetrics|null|undefined} healthMetrics
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.healthMetrics = null

    /**
     * Linux host metrics
     * @member {meshtastic.IHostMetrics|null|undefined} hostMetrics
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Telemetry.prototype.hostMetrics = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * Telemetry variant.
     * @member {"deviceMetrics"|"environmentMetrics"|"airQualityMetrics"|"powerMetrics"|"localStats"|"healthMetrics"|"hostMetrics"|undefined} variant
     * @memberof meshtastic.Telemetry
     * @instance
     */
    Object.defineProperty(Telemetry.prototype, 'variant', {
      get: $util.oneOfGetter(
        ($oneOfFields = [
          'deviceMetrics',
          'environmentMetrics',
          'airQualityMetrics',
          'powerMetrics',
          'localStats',
          'healthMetrics',
          'hostMetrics',
        ])
      ),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified Telemetry message. Does not implicitly {@link meshtastic.Telemetry.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Telemetry
     * @static
     * @param {meshtastic.ITelemetry} message Telemetry message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Telemetry.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.time != null && Object.hasOwnProperty.call(message, 'time'))
        writer.uint32(/* id 1, wireType 5 =*/ 13).fixed32(message.time)
      if (message.deviceMetrics != null && Object.hasOwnProperty.call(message, 'deviceMetrics'))
        $root.meshtastic.DeviceMetrics.encode(message.deviceMetrics, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.environmentMetrics != null && Object.hasOwnProperty.call(message, 'environmentMetrics'))
        $root.meshtastic.EnvironmentMetrics.encode(message.environmentMetrics, writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim()
      if (message.airQualityMetrics != null && Object.hasOwnProperty.call(message, 'airQualityMetrics'))
        $root.meshtastic.AirQualityMetrics.encode(message.airQualityMetrics, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
      if (message.powerMetrics != null && Object.hasOwnProperty.call(message, 'powerMetrics'))
        $root.meshtastic.PowerMetrics.encode(message.powerMetrics, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim()
      if (message.localStats != null && Object.hasOwnProperty.call(message, 'localStats'))
        $root.meshtastic.LocalStats.encode(message.localStats, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim()
      if (message.healthMetrics != null && Object.hasOwnProperty.call(message, 'healthMetrics'))
        $root.meshtastic.HealthMetrics.encode(message.healthMetrics, writer.uint32(/* id 7, wireType 2 =*/ 58).fork()).ldelim()
      if (message.hostMetrics != null && Object.hasOwnProperty.call(message, 'hostMetrics'))
        $root.meshtastic.HostMetrics.encode(message.hostMetrics, writer.uint32(/* id 8, wireType 2 =*/ 66).fork()).ldelim()
      return writer
    }

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
    Telemetry.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Telemetry()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 6: {
            message.localStats = $root.meshtastic.LocalStats.decode(reader, reader.uint32())
            break
          }
          case 7: {
            message.healthMetrics = $root.meshtastic.HealthMetrics.decode(reader, reader.uint32())
            break
          }
          case 8: {
            message.hostMetrics = $root.meshtastic.HostMetrics.decode(reader, reader.uint32())
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
   * @property {number} BMP3XX=26 BMP3XX High accuracy temperature and pressure
   * @property {number} ICM20948=27 ICM-20948 9-Axis digital motion processor
   * @property {number} MAX17048=28 MAX17048 1S lipo battery sensor (voltage, state of charge, time to go)
   * @property {number} CUSTOM_SENSOR=29 Custom I2C sensor implementation based on https://github.com/meshtastic/i2c-sensor
   * @property {number} MAX30102=30 MAX30102 Pulse Oximeter and Heart-Rate Sensor
   * @property {number} MLX90614=31 MLX90614 non-contact IR temperature sensor
   * @property {number} SCD4X=32 SCD40/SCD41 CO2, humidity, temperature sensor
   * @property {number} RADSENS=33 ClimateGuard RadSens, radiation, Geiger-Muller Tube
   * @property {number} INA226=34 High accuracy current and voltage
   * @property {number} DFROBOT_RAIN=35 DFRobot Gravity tipping bucket rain gauge
   * @property {number} DPS310=36 Infineon DPS310 High accuracy pressure and temperature
   * @property {number} RAK12035=37 RAKWireless RAK12035 Soil Moisture Sensor Module
   * @property {number} MAX17261=38 MAX17261 lipo battery gauge
   * @property {number} PCT2075=39 PCT2075 Temperature Sensor
   * @property {number} ADS1X15=40 ADS1X15 ADC
   * @property {number} ADS1X15_ALT=41 ADS1X15 ADC_ALT
   * @property {number} SFA30=42 Sensirion SFA30 Formaldehyde sensor
   * @property {number} SEN5X=43 SEN5X PM SENSORS
   * @property {number} TSL2561=44 TSL2561 light sensor
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
    values[(valuesById[26] = 'BMP3XX')] = 26
    values[(valuesById[27] = 'ICM20948')] = 27
    values[(valuesById[28] = 'MAX17048')] = 28
    values[(valuesById[29] = 'CUSTOM_SENSOR')] = 29
    values[(valuesById[30] = 'MAX30102')] = 30
    values[(valuesById[31] = 'MLX90614')] = 31
    values[(valuesById[32] = 'SCD4X')] = 32
    values[(valuesById[33] = 'RADSENS')] = 33
    values[(valuesById[34] = 'INA226')] = 34
    values[(valuesById[35] = 'DFROBOT_RAIN')] = 35
    values[(valuesById[36] = 'DPS310')] = 36
    values[(valuesById[37] = 'RAK12035')] = 37
    values[(valuesById[38] = 'MAX17261')] = 38
    values[(valuesById[39] = 'PCT2075')] = 39
    values[(valuesById[40] = 'ADS1X15')] = 40
    values[(valuesById[41] = 'ADS1X15_ALT')] = 41
    values[(valuesById[42] = 'SFA30')] = 42
    values[(valuesById[43] = 'SEN5X')] = 43
    values[(valuesById[44] = 'TSL2561')] = 44
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
     * @member {number} zeroOffset
     * @memberof meshtastic.Nau7802Config
     * @instance
     */
    Nau7802Config.prototype.zeroOffset = 0

    /**
     * The calibration factor for the NAU7802
     * @member {number} calibrationFactor
     * @memberof meshtastic.Nau7802Config
     * @instance
     */
    Nau7802Config.prototype.calibrationFactor = 0

    /**
     * Encodes the specified Nau7802Config message. Does not implicitly {@link meshtastic.Nau7802Config.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.Nau7802Config
     * @static
     * @param {meshtastic.INau7802Config} message Nau7802Config message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Nau7802Config.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.zeroOffset != null && Object.hasOwnProperty.call(message, 'zeroOffset'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.zeroOffset)
      if (message.calibrationFactor != null && Object.hasOwnProperty.call(message, 'calibrationFactor'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.calibrationFactor)
      return writer
    }

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
    Nau7802Config.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.Nau7802Config()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
     * @member {meshtastic.XModem.Control} control
     * @memberof meshtastic.XModem
     * @instance
     */
    XModem.prototype.control = 0

    /**
     * XModem seq.
     * @member {number} seq
     * @memberof meshtastic.XModem
     * @instance
     */
    XModem.prototype.seq = 0

    /**
     * XModem crc16.
     * @member {number} crc16
     * @memberof meshtastic.XModem
     * @instance
     */
    XModem.prototype.crc16 = 0

    /**
     * XModem buffer.
     * @member {Uint8Array} buffer
     * @memberof meshtastic.XModem
     * @instance
     */
    XModem.prototype.buffer = $util.newBuffer([])

    /**
     * Encodes the specified XModem message. Does not implicitly {@link meshtastic.XModem.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.XModem
     * @static
     * @param {meshtastic.IXModem} message XModem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    XModem.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.control != null && Object.hasOwnProperty.call(message, 'control'))
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.control)
      if (message.seq != null && Object.hasOwnProperty.call(message, 'seq')) writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.seq)
      if (message.crc16 != null && Object.hasOwnProperty.call(message, 'crc16'))
        writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.crc16)
      if (message.buffer != null && Object.hasOwnProperty.call(message, 'buffer'))
        writer.uint32(/* id 4, wireType 2 =*/ 34).bytes(message.buffer)
      return writer
    }

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
    XModem.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.XModem()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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

  meshtastic.DeviceProfile = (function () {
    /**
     * Properties of a DeviceProfile.
     * @memberof meshtastic
     * @interface IDeviceProfile
     * @property {string|null} [longName] Long name for the node
     * @property {string|null} [shortName] Short name of the node
     * @property {string|null} [channelUrl] The url of the channels from our node
     * @property {meshtastic.ILocalConfig|null} [config] The Config of the node
     * @property {meshtastic.ILocalModuleConfig|null} [moduleConfig] The ModuleConfig of the node
     * @property {meshtastic.IPosition|null} [fixedPosition] Fixed position data
     * @property {string|null} [ringtone] Ringtone for ExternalNotification
     * @property {string|null} [cannedMessages] Predefined messages for CannedMessage
     */

    /**
     * Constructs a new DeviceProfile.
     * @memberof meshtastic
     * @classdesc This abstraction is used to contain any configuration for provisioning a node on any client.
     * It is useful for importing and exporting configurations.
     * @implements IDeviceProfile
     * @constructor
     * @param {meshtastic.IDeviceProfile=} [properties] Properties to set
     */
    function DeviceProfile(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Long name for the node
     * @member {string|null|undefined} longName
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    DeviceProfile.prototype.longName = null

    /**
     * Short name of the node
     * @member {string|null|undefined} shortName
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    DeviceProfile.prototype.shortName = null

    /**
     * The url of the channels from our node
     * @member {string|null|undefined} channelUrl
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    DeviceProfile.prototype.channelUrl = null

    /**
     * The Config of the node
     * @member {meshtastic.ILocalConfig|null|undefined} config
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    DeviceProfile.prototype.config = null

    /**
     * The ModuleConfig of the node
     * @member {meshtastic.ILocalModuleConfig|null|undefined} moduleConfig
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    DeviceProfile.prototype.moduleConfig = null

    /**
     * Fixed position data
     * @member {meshtastic.IPosition|null|undefined} fixedPosition
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    DeviceProfile.prototype.fixedPosition = null

    /**
     * Ringtone for ExternalNotification
     * @member {string|null|undefined} ringtone
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    DeviceProfile.prototype.ringtone = null

    /**
     * Predefined messages for CannedMessage
     * @member {string|null|undefined} cannedMessages
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    DeviceProfile.prototype.cannedMessages = null

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields

    /**
     * DeviceProfile _longName.
     * @member {"longName"|undefined} _longName
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    Object.defineProperty(DeviceProfile.prototype, '_longName', {
      get: $util.oneOfGetter(($oneOfFields = ['longName'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceProfile _shortName.
     * @member {"shortName"|undefined} _shortName
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    Object.defineProperty(DeviceProfile.prototype, '_shortName', {
      get: $util.oneOfGetter(($oneOfFields = ['shortName'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceProfile _channelUrl.
     * @member {"channelUrl"|undefined} _channelUrl
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    Object.defineProperty(DeviceProfile.prototype, '_channelUrl', {
      get: $util.oneOfGetter(($oneOfFields = ['channelUrl'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceProfile _config.
     * @member {"config"|undefined} _config
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    Object.defineProperty(DeviceProfile.prototype, '_config', {
      get: $util.oneOfGetter(($oneOfFields = ['config'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceProfile _moduleConfig.
     * @member {"moduleConfig"|undefined} _moduleConfig
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    Object.defineProperty(DeviceProfile.prototype, '_moduleConfig', {
      get: $util.oneOfGetter(($oneOfFields = ['moduleConfig'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceProfile _fixedPosition.
     * @member {"fixedPosition"|undefined} _fixedPosition
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    Object.defineProperty(DeviceProfile.prototype, '_fixedPosition', {
      get: $util.oneOfGetter(($oneOfFields = ['fixedPosition'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceProfile _ringtone.
     * @member {"ringtone"|undefined} _ringtone
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    Object.defineProperty(DeviceProfile.prototype, '_ringtone', {
      get: $util.oneOfGetter(($oneOfFields = ['ringtone'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * DeviceProfile _cannedMessages.
     * @member {"cannedMessages"|undefined} _cannedMessages
     * @memberof meshtastic.DeviceProfile
     * @instance
     */
    Object.defineProperty(DeviceProfile.prototype, '_cannedMessages', {
      get: $util.oneOfGetter(($oneOfFields = ['cannedMessages'])),
      set: $util.oneOfSetter($oneOfFields),
    })

    /**
     * Encodes the specified DeviceProfile message. Does not implicitly {@link meshtastic.DeviceProfile.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.DeviceProfile
     * @static
     * @param {meshtastic.IDeviceProfile} message DeviceProfile message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeviceProfile.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.longName != null && Object.hasOwnProperty.call(message, 'longName'))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.longName)
      if (message.shortName != null && Object.hasOwnProperty.call(message, 'shortName'))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.shortName)
      if (message.channelUrl != null && Object.hasOwnProperty.call(message, 'channelUrl'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.channelUrl)
      if (message.config != null && Object.hasOwnProperty.call(message, 'config'))
        $root.meshtastic.LocalConfig.encode(message.config, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
      if (message.moduleConfig != null && Object.hasOwnProperty.call(message, 'moduleConfig'))
        $root.meshtastic.LocalModuleConfig.encode(message.moduleConfig, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim()
      if (message.fixedPosition != null && Object.hasOwnProperty.call(message, 'fixedPosition'))
        $root.meshtastic.Position.encode(message.fixedPosition, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim()
      if (message.ringtone != null && Object.hasOwnProperty.call(message, 'ringtone'))
        writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.ringtone)
      if (message.cannedMessages != null && Object.hasOwnProperty.call(message, 'cannedMessages'))
        writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.cannedMessages)
      return writer
    }

    /**
     * Decodes a DeviceProfile message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.DeviceProfile
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.DeviceProfile} DeviceProfile
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeviceProfile.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.DeviceProfile()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
            message.channelUrl = reader.string()
            break
          }
          case 4: {
            message.config = $root.meshtastic.LocalConfig.decode(reader, reader.uint32())
            break
          }
          case 5: {
            message.moduleConfig = $root.meshtastic.LocalModuleConfig.decode(reader, reader.uint32())
            break
          }
          case 6: {
            message.fixedPosition = $root.meshtastic.Position.decode(reader, reader.uint32())
            break
          }
          case 7: {
            message.ringtone = reader.string()
            break
          }
          case 8: {
            message.cannedMessages = reader.string()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return DeviceProfile
  })()

  meshtastic.LocalConfig = (function () {
    /**
     * Properties of a LocalConfig.
     * @memberof meshtastic
     * @interface ILocalConfig
     * @property {meshtastic.Config.IDeviceConfig|null} [device] The part of the config that is specific to the Device
     * @property {meshtastic.Config.IPositionConfig|null} [position] The part of the config that is specific to the GPS Position
     * @property {meshtastic.Config.IPowerConfig|null} [power] The part of the config that is specific to the Power settings
     * @property {meshtastic.Config.INetworkConfig|null} [network] The part of the config that is specific to the Wifi Settings
     * @property {meshtastic.Config.IDisplayConfig|null} [display] The part of the config that is specific to the Display
     * @property {meshtastic.Config.ILoRaConfig|null} [lora] The part of the config that is specific to the Lora Radio
     * @property {meshtastic.Config.IBluetoothConfig|null} [bluetooth] The part of the config that is specific to the Bluetooth settings
     * @property {number|null} [version] A version integer used to invalidate old save files when we make
     * incompatible changes This integer is set at build time and is private to
     * NodeDB.cpp in the device code.
     * @property {meshtastic.Config.ISecurityConfig|null} [security] The part of the config that is specific to Security settings
     */

    /**
     * Constructs a new LocalConfig.
     * @memberof meshtastic
     * @classdesc Represents a LocalConfig.
     * @implements ILocalConfig
     * @constructor
     * @param {meshtastic.ILocalConfig=} [properties] Properties to set
     */
    function LocalConfig(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The part of the config that is specific to the Device
     * @member {meshtastic.Config.IDeviceConfig|null|undefined} device
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.device = null

    /**
     * The part of the config that is specific to the GPS Position
     * @member {meshtastic.Config.IPositionConfig|null|undefined} position
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.position = null

    /**
     * The part of the config that is specific to the Power settings
     * @member {meshtastic.Config.IPowerConfig|null|undefined} power
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.power = null

    /**
     * The part of the config that is specific to the Wifi Settings
     * @member {meshtastic.Config.INetworkConfig|null|undefined} network
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.network = null

    /**
     * The part of the config that is specific to the Display
     * @member {meshtastic.Config.IDisplayConfig|null|undefined} display
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.display = null

    /**
     * The part of the config that is specific to the Lora Radio
     * @member {meshtastic.Config.ILoRaConfig|null|undefined} lora
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.lora = null

    /**
     * The part of the config that is specific to the Bluetooth settings
     * @member {meshtastic.Config.IBluetoothConfig|null|undefined} bluetooth
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.bluetooth = null

    /**
     * A version integer used to invalidate old save files when we make
     * incompatible changes This integer is set at build time and is private to
     * NodeDB.cpp in the device code.
     * @member {number} version
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.version = 0

    /**
     * The part of the config that is specific to Security settings
     * @member {meshtastic.Config.ISecurityConfig|null|undefined} security
     * @memberof meshtastic.LocalConfig
     * @instance
     */
    LocalConfig.prototype.security = null

    /**
     * Encodes the specified LocalConfig message. Does not implicitly {@link meshtastic.LocalConfig.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.LocalConfig
     * @static
     * @param {meshtastic.ILocalConfig} message LocalConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LocalConfig.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.device != null && Object.hasOwnProperty.call(message, 'device'))
        $root.meshtastic.Config.DeviceConfig.encode(message.device, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.position != null && Object.hasOwnProperty.call(message, 'position'))
        $root.meshtastic.Config.PositionConfig.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.power != null && Object.hasOwnProperty.call(message, 'power'))
        $root.meshtastic.Config.PowerConfig.encode(message.power, writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim()
      if (message.network != null && Object.hasOwnProperty.call(message, 'network'))
        $root.meshtastic.Config.NetworkConfig.encode(message.network, writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim()
      if (message.display != null && Object.hasOwnProperty.call(message, 'display'))
        $root.meshtastic.Config.DisplayConfig.encode(message.display, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim()
      if (message.lora != null && Object.hasOwnProperty.call(message, 'lora'))
        $root.meshtastic.Config.LoRaConfig.encode(message.lora, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim()
      if (message.bluetooth != null && Object.hasOwnProperty.call(message, 'bluetooth'))
        $root.meshtastic.Config.BluetoothConfig.encode(message.bluetooth, writer.uint32(/* id 7, wireType 2 =*/ 58).fork()).ldelim()
      if (message.version != null && Object.hasOwnProperty.call(message, 'version'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.version)
      if (message.security != null && Object.hasOwnProperty.call(message, 'security'))
        $root.meshtastic.Config.SecurityConfig.encode(message.security, writer.uint32(/* id 9, wireType 2 =*/ 74).fork()).ldelim()
      return writer
    }

    /**
     * Decodes a LocalConfig message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.LocalConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.LocalConfig} LocalConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LocalConfig.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.LocalConfig()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 8: {
            message.version = reader.uint32()
            break
          }
          case 9: {
            message.security = $root.meshtastic.Config.SecurityConfig.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return LocalConfig
  })()

  meshtastic.LocalModuleConfig = (function () {
    /**
     * Properties of a LocalModuleConfig.
     * @memberof meshtastic
     * @interface ILocalModuleConfig
     * @property {meshtastic.ModuleConfig.IMQTTConfig|null} [mqtt] The part of the config that is specific to the MQTT module
     * @property {meshtastic.ModuleConfig.ISerialConfig|null} [serial] The part of the config that is specific to the Serial module
     * @property {meshtastic.ModuleConfig.IExternalNotificationConfig|null} [externalNotification] The part of the config that is specific to the ExternalNotification module
     * @property {meshtastic.ModuleConfig.IStoreForwardConfig|null} [storeForward] The part of the config that is specific to the Store & Forward module
     * @property {meshtastic.ModuleConfig.IRangeTestConfig|null} [rangeTest] The part of the config that is specific to the RangeTest module
     * @property {meshtastic.ModuleConfig.ITelemetryConfig|null} [telemetry] The part of the config that is specific to the Telemetry module
     * @property {meshtastic.ModuleConfig.ICannedMessageConfig|null} [cannedMessage] The part of the config that is specific to the Canned Message module
     * @property {meshtastic.ModuleConfig.IAudioConfig|null} [audio] The part of the config that is specific to the Audio module
     * @property {meshtastic.ModuleConfig.IRemoteHardwareConfig|null} [remoteHardware] The part of the config that is specific to the Remote Hardware module
     * @property {meshtastic.ModuleConfig.INeighborInfoConfig|null} [neighborInfo] The part of the config that is specific to the Neighbor Info module
     * @property {meshtastic.ModuleConfig.IAmbientLightingConfig|null} [ambientLighting] The part of the config that is specific to the Ambient Lighting module
     * @property {meshtastic.ModuleConfig.IDetectionSensorConfig|null} [detectionSensor] The part of the config that is specific to the Detection Sensor module
     * @property {meshtastic.ModuleConfig.IPaxcounterConfig|null} [paxcounter] Paxcounter Config
     * @property {number|null} [version] A version integer used to invalidate old save files when we make
     * incompatible changes This integer is set at build time and is private to
     * NodeDB.cpp in the device code.
     */

    /**
     * Constructs a new LocalModuleConfig.
     * @memberof meshtastic
     * @classdesc Represents a LocalModuleConfig.
     * @implements ILocalModuleConfig
     * @constructor
     * @param {meshtastic.ILocalModuleConfig=} [properties] Properties to set
     */
    function LocalModuleConfig(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * The part of the config that is specific to the MQTT module
     * @member {meshtastic.ModuleConfig.IMQTTConfig|null|undefined} mqtt
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.mqtt = null

    /**
     * The part of the config that is specific to the Serial module
     * @member {meshtastic.ModuleConfig.ISerialConfig|null|undefined} serial
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.serial = null

    /**
     * The part of the config that is specific to the ExternalNotification module
     * @member {meshtastic.ModuleConfig.IExternalNotificationConfig|null|undefined} externalNotification
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.externalNotification = null

    /**
     * The part of the config that is specific to the Store & Forward module
     * @member {meshtastic.ModuleConfig.IStoreForwardConfig|null|undefined} storeForward
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.storeForward = null

    /**
     * The part of the config that is specific to the RangeTest module
     * @member {meshtastic.ModuleConfig.IRangeTestConfig|null|undefined} rangeTest
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.rangeTest = null

    /**
     * The part of the config that is specific to the Telemetry module
     * @member {meshtastic.ModuleConfig.ITelemetryConfig|null|undefined} telemetry
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.telemetry = null

    /**
     * The part of the config that is specific to the Canned Message module
     * @member {meshtastic.ModuleConfig.ICannedMessageConfig|null|undefined} cannedMessage
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.cannedMessage = null

    /**
     * The part of the config that is specific to the Audio module
     * @member {meshtastic.ModuleConfig.IAudioConfig|null|undefined} audio
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.audio = null

    /**
     * The part of the config that is specific to the Remote Hardware module
     * @member {meshtastic.ModuleConfig.IRemoteHardwareConfig|null|undefined} remoteHardware
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.remoteHardware = null

    /**
     * The part of the config that is specific to the Neighbor Info module
     * @member {meshtastic.ModuleConfig.INeighborInfoConfig|null|undefined} neighborInfo
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.neighborInfo = null

    /**
     * The part of the config that is specific to the Ambient Lighting module
     * @member {meshtastic.ModuleConfig.IAmbientLightingConfig|null|undefined} ambientLighting
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.ambientLighting = null

    /**
     * The part of the config that is specific to the Detection Sensor module
     * @member {meshtastic.ModuleConfig.IDetectionSensorConfig|null|undefined} detectionSensor
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.detectionSensor = null

    /**
     * Paxcounter Config
     * @member {meshtastic.ModuleConfig.IPaxcounterConfig|null|undefined} paxcounter
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.paxcounter = null

    /**
     * A version integer used to invalidate old save files when we make
     * incompatible changes This integer is set at build time and is private to
     * NodeDB.cpp in the device code.
     * @member {number} version
     * @memberof meshtastic.LocalModuleConfig
     * @instance
     */
    LocalModuleConfig.prototype.version = 0

    /**
     * Encodes the specified LocalModuleConfig message. Does not implicitly {@link meshtastic.LocalModuleConfig.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.LocalModuleConfig
     * @static
     * @param {meshtastic.ILocalModuleConfig} message LocalModuleConfig message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LocalModuleConfig.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.mqtt != null && Object.hasOwnProperty.call(message, 'mqtt'))
        $root.meshtastic.ModuleConfig.MQTTConfig.encode(message.mqtt, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.serial != null && Object.hasOwnProperty.call(message, 'serial'))
        $root.meshtastic.ModuleConfig.SerialConfig.encode(message.serial, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      if (message.externalNotification != null && Object.hasOwnProperty.call(message, 'externalNotification'))
        $root.meshtastic.ModuleConfig.ExternalNotificationConfig.encode(
          message.externalNotification,
          writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
        ).ldelim()
      if (message.storeForward != null && Object.hasOwnProperty.call(message, 'storeForward'))
        $root.meshtastic.ModuleConfig.StoreForwardConfig.encode(
          message.storeForward,
          writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
        ).ldelim()
      if (message.rangeTest != null && Object.hasOwnProperty.call(message, 'rangeTest'))
        $root.meshtastic.ModuleConfig.RangeTestConfig.encode(message.rangeTest, writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim()
      if (message.telemetry != null && Object.hasOwnProperty.call(message, 'telemetry'))
        $root.meshtastic.ModuleConfig.TelemetryConfig.encode(message.telemetry, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim()
      if (message.cannedMessage != null && Object.hasOwnProperty.call(message, 'cannedMessage'))
        $root.meshtastic.ModuleConfig.CannedMessageConfig.encode(
          message.cannedMessage,
          writer.uint32(/* id 7, wireType 2 =*/ 58).fork()
        ).ldelim()
      if (message.version != null && Object.hasOwnProperty.call(message, 'version'))
        writer.uint32(/* id 8, wireType 0 =*/ 64).uint32(message.version)
      if (message.audio != null && Object.hasOwnProperty.call(message, 'audio'))
        $root.meshtastic.ModuleConfig.AudioConfig.encode(message.audio, writer.uint32(/* id 9, wireType 2 =*/ 74).fork()).ldelim()
      if (message.remoteHardware != null && Object.hasOwnProperty.call(message, 'remoteHardware'))
        $root.meshtastic.ModuleConfig.RemoteHardwareConfig.encode(
          message.remoteHardware,
          writer.uint32(/* id 10, wireType 2 =*/ 82).fork()
        ).ldelim()
      if (message.neighborInfo != null && Object.hasOwnProperty.call(message, 'neighborInfo'))
        $root.meshtastic.ModuleConfig.NeighborInfoConfig.encode(
          message.neighborInfo,
          writer.uint32(/* id 11, wireType 2 =*/ 90).fork()
        ).ldelim()
      if (message.ambientLighting != null && Object.hasOwnProperty.call(message, 'ambientLighting'))
        $root.meshtastic.ModuleConfig.AmbientLightingConfig.encode(
          message.ambientLighting,
          writer.uint32(/* id 12, wireType 2 =*/ 98).fork()
        ).ldelim()
      if (message.detectionSensor != null && Object.hasOwnProperty.call(message, 'detectionSensor'))
        $root.meshtastic.ModuleConfig.DetectionSensorConfig.encode(
          message.detectionSensor,
          writer.uint32(/* id 13, wireType 2 =*/ 106).fork()
        ).ldelim()
      if (message.paxcounter != null && Object.hasOwnProperty.call(message, 'paxcounter'))
        $root.meshtastic.ModuleConfig.PaxcounterConfig.encode(
          message.paxcounter,
          writer.uint32(/* id 14, wireType 2 =*/ 114).fork()
        ).ldelim()
      return writer
    }

    /**
     * Decodes a LocalModuleConfig message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.LocalModuleConfig
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.LocalModuleConfig} LocalModuleConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LocalModuleConfig.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.LocalModuleConfig()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
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
          case 9: {
            message.audio = $root.meshtastic.ModuleConfig.AudioConfig.decode(reader, reader.uint32())
            break
          }
          case 10: {
            message.remoteHardware = $root.meshtastic.ModuleConfig.RemoteHardwareConfig.decode(reader, reader.uint32())
            break
          }
          case 11: {
            message.neighborInfo = $root.meshtastic.ModuleConfig.NeighborInfoConfig.decode(reader, reader.uint32())
            break
          }
          case 12: {
            message.ambientLighting = $root.meshtastic.ModuleConfig.AmbientLightingConfig.decode(reader, reader.uint32())
            break
          }
          case 13: {
            message.detectionSensor = $root.meshtastic.ModuleConfig.DetectionSensorConfig.decode(reader, reader.uint32())
            break
          }
          case 14: {
            message.paxcounter = $root.meshtastic.ModuleConfig.PaxcounterConfig.decode(reader, reader.uint32())
            break
          }
          case 8: {
            message.version = reader.uint32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return LocalModuleConfig
  })()

  meshtastic.ChannelSet = (function () {
    /**
     * Properties of a ChannelSet.
     * @memberof meshtastic
     * @interface IChannelSet
     * @property {Array.<meshtastic.IChannelSettings>|null} [settings] Channel list with settings
     * @property {meshtastic.Config.ILoRaConfig|null} [loraConfig] LoRa config
     */

    /**
     * Constructs a new ChannelSet.
     * @memberof meshtastic
     * @classdesc This is the most compact possible representation for a set of channels.
     * It includes only one PRIMARY channel (which must be first) and
     * any SECONDARY channels.
     * No DISABLED channels are included.
     * This abstraction is used only on the the 'app side' of the world (ie python, javascript and android etc) to show a group of Channels as a (long) URL
     * @implements IChannelSet
     * @constructor
     * @param {meshtastic.IChannelSet=} [properties] Properties to set
     */
    function ChannelSet(properties) {
      this.settings = []
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Channel list with settings
     * @member {Array.<meshtastic.IChannelSettings>} settings
     * @memberof meshtastic.ChannelSet
     * @instance
     */
    ChannelSet.prototype.settings = $util.emptyArray

    /**
     * LoRa config
     * @member {meshtastic.Config.ILoRaConfig|null|undefined} loraConfig
     * @memberof meshtastic.ChannelSet
     * @instance
     */
    ChannelSet.prototype.loraConfig = null

    /**
     * Encodes the specified ChannelSet message. Does not implicitly {@link meshtastic.ChannelSet.verify|verify} messages.
     * @function encode
     * @memberof meshtastic.ChannelSet
     * @static
     * @param {meshtastic.IChannelSet} message ChannelSet message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelSet.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.settings != null && message.settings.length)
        for (let i = 0; i < message.settings.length; ++i)
          $root.meshtastic.ChannelSettings.encode(message.settings[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      if (message.loraConfig != null && Object.hasOwnProperty.call(message, 'loraConfig'))
        $root.meshtastic.Config.LoRaConfig.encode(message.loraConfig, writer.uint32(/* id 2, wireType 2 =*/ 18).fork()).ldelim()
      return writer
    }

    /**
     * Decodes a ChannelSet message from the specified reader or buffer.
     * @function decode
     * @memberof meshtastic.ChannelSet
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {meshtastic.ChannelSet} ChannelSet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelSet.decode = function decode(reader, length, error) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.meshtastic.ChannelSet()
      while (reader.pos < end) {
        let tag = reader.uint32()
        if (tag === error) break
        switch (tag >>> 3) {
          case 1: {
            if (!(message.settings && message.settings.length)) message.settings = []
            message.settings.push($root.meshtastic.ChannelSettings.decode(reader, reader.uint32()))
            break
          }
          case 2: {
            message.loraConfig = $root.meshtastic.Config.LoRaConfig.decode(reader, reader.uint32())
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return ChannelSet
  })()

  return meshtastic
})())

export { $root as default }
