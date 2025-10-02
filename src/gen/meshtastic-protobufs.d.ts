import * as $protobuf from 'protobufjs'
import Long = require('long')
/** Namespace meshtastic. */
export namespace meshtastic {
  /** Properties of a ServiceEnvelope. */
  interface IServiceEnvelope {
    /** The (probably encrypted) packet */
    packet?: meshtastic.IMeshPacket | null

    /** The global channel ID it was sent on */
    channelId?: string | null

    /**
     * The sending gateway node ID. Can we use this to authenticate/prevent fake
     * nodeid impersonation for senders? - i.e. use gateway/mesh id (which is authenticated) + local node id as
     * the globally trusted nodenum
     */
    gatewayId?: string | null
  }

  /** This message wraps a MeshPacket with extra metadata about the sender and how it arrived. */
  class ServiceEnvelope implements IServiceEnvelope {
    /**
     * Constructs a new ServiceEnvelope.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IServiceEnvelope)

    /** The (probably encrypted) packet */
    public packet?: meshtastic.IMeshPacket | null

    /** The global channel ID it was sent on */
    public channelId: string

    /**
     * The sending gateway node ID. Can we use this to authenticate/prevent fake
     * nodeid impersonation for senders? - i.e. use gateway/mesh id (which is authenticated) + local node id as
     * the globally trusted nodenum
     */
    public gatewayId: string

    /**
     * Encodes the specified ServiceEnvelope message. Does not implicitly {@link meshtastic.ServiceEnvelope.verify|verify} messages.
     * @param message ServiceEnvelope message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IServiceEnvelope, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ServiceEnvelope message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServiceEnvelope
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ServiceEnvelope
  }

  /** Properties of a MapReport. */
  interface IMapReport {
    /** A full name for this user, i.e. "Kevin Hester" */
    longName?: string | null

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     */
    shortName?: string | null

    /** Role of the node that applies specific settings for a particular use-case */
    role?: meshtastic.Config.DeviceConfig.Role | null

    /** Hardware model of the node, i.e. T-Beam, Heltec V3, etc... */
    hwModel?: meshtastic.HardwareModel | null

    /** Device firmware version string */
    firmwareVersion?: string | null

    /** The region code for the radio (US, CN, EU433, etc...) */
    region?: meshtastic.Config.LoRaConfig.RegionCode | null

    /** Modem preset used by the radio (LongFast, MediumSlow, etc...) */
    modemPreset?: meshtastic.Config.LoRaConfig.ModemPreset | null

    /**
     * Whether the node has a channel with default PSK and name (LongFast, MediumSlow, etc...)
     * and it uses the default frequency slot given the region and modem preset.
     */
    hasDefaultChannel?: boolean | null

    /** Latitude: multiply by 1e-7 to get degrees in floating point */
    latitudeI?: number | null

    /** Longitude: multiply by 1e-7 to get degrees in floating point */
    longitudeI?: number | null

    /** Altitude in meters above MSL */
    altitude?: number | null

    /** Indicates the bits of precision for latitude and longitude set by the sending node */
    positionPrecision?: number | null

    /** Number of online nodes (heard in the last 2 hours) this node has in its list that were received locally (not via MQTT) */
    numOnlineLocalNodes?: number | null

    /**
     * User has opted in to share their location (map report) with the mqtt server
     * Controlled by map_report.should_report_location
     */
    hasOptedReportLocation?: boolean | null
  }

  /** Information about a node intended to be reported unencrypted to a map using MQTT. */
  class MapReport implements IMapReport {
    /**
     * Constructs a new MapReport.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IMapReport)

    /** A full name for this user, i.e. "Kevin Hester" */
    public longName: string

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     */
    public shortName: string

    /** Role of the node that applies specific settings for a particular use-case */
    public role: meshtastic.Config.DeviceConfig.Role

    /** Hardware model of the node, i.e. T-Beam, Heltec V3, etc... */
    public hwModel: meshtastic.HardwareModel

    /** Device firmware version string */
    public firmwareVersion: string

    /** The region code for the radio (US, CN, EU433, etc...) */
    public region: meshtastic.Config.LoRaConfig.RegionCode

    /** Modem preset used by the radio (LongFast, MediumSlow, etc...) */
    public modemPreset: meshtastic.Config.LoRaConfig.ModemPreset

    /**
     * Whether the node has a channel with default PSK and name (LongFast, MediumSlow, etc...)
     * and it uses the default frequency slot given the region and modem preset.
     */
    public hasDefaultChannel: boolean

    /** Latitude: multiply by 1e-7 to get degrees in floating point */
    public latitudeI: number

    /** Longitude: multiply by 1e-7 to get degrees in floating point */
    public longitudeI: number

    /** Altitude in meters above MSL */
    public altitude: number

    /** Indicates the bits of precision for latitude and longitude set by the sending node */
    public positionPrecision: number

    /** Number of online nodes (heard in the last 2 hours) this node has in its list that were received locally (not via MQTT) */
    public numOnlineLocalNodes: number

    /**
     * User has opted in to share their location (map report) with the mqtt server
     * Controlled by map_report.should_report_location
     */
    public hasOptedReportLocation: boolean

    /**
     * Encodes the specified MapReport message. Does not implicitly {@link meshtastic.MapReport.verify|verify} messages.
     * @param message MapReport message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IMapReport, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a MapReport message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MapReport
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.MapReport
  }

  /** Properties of a Config. */
  interface IConfig {
    /** Config device */
    device?: meshtastic.Config.IDeviceConfig | null

    /** Config position */
    position?: meshtastic.Config.IPositionConfig | null

    /** Config power */
    power?: meshtastic.Config.IPowerConfig | null

    /** Config network */
    network?: meshtastic.Config.INetworkConfig | null

    /** Config display */
    display?: meshtastic.Config.IDisplayConfig | null

    /** Config lora */
    lora?: meshtastic.Config.ILoRaConfig | null

    /** Config bluetooth */
    bluetooth?: meshtastic.Config.IBluetoothConfig | null

    /** Config security */
    security?: meshtastic.Config.ISecurityConfig | null

    /** Config sessionkey */
    sessionkey?: meshtastic.Config.ISessionkeyConfig | null

    /** Config deviceUi */
    deviceUi?: meshtastic.IDeviceUIConfig | null
  }

  /** Represents a Config. */
  class Config implements IConfig {
    /**
     * Constructs a new Config.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IConfig)

    /** Config device. */
    public device?: meshtastic.Config.IDeviceConfig | null

    /** Config position. */
    public position?: meshtastic.Config.IPositionConfig | null

    /** Config power. */
    public power?: meshtastic.Config.IPowerConfig | null

    /** Config network. */
    public network?: meshtastic.Config.INetworkConfig | null

    /** Config display. */
    public display?: meshtastic.Config.IDisplayConfig | null

    /** Config lora. */
    public lora?: meshtastic.Config.ILoRaConfig | null

    /** Config bluetooth. */
    public bluetooth?: meshtastic.Config.IBluetoothConfig | null

    /** Config security. */
    public security?: meshtastic.Config.ISecurityConfig | null

    /** Config sessionkey. */
    public sessionkey?: meshtastic.Config.ISessionkeyConfig | null

    /** Config deviceUi. */
    public deviceUi?: meshtastic.IDeviceUIConfig | null

    /** Payload Variant */
    public payloadVariant?:
      | 'device'
      | 'position'
      | 'power'
      | 'network'
      | 'display'
      | 'lora'
      | 'bluetooth'
      | 'security'
      | 'sessionkey'
      | 'deviceUi'

    /**
     * Encodes the specified Config message. Does not implicitly {@link meshtastic.Config.verify|verify} messages.
     * @param message Config message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IConfig, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Config message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Config
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config
  }

  namespace Config {
    /** Properties of a DeviceConfig. */
    interface IDeviceConfig {
      /** Sets the role of node */
      role?: meshtastic.Config.DeviceConfig.Role | null

      /**
       * Disabling this will disable the SerialConsole by not initilizing the StreamAPI
       * Moved to SecurityConfig
       */
      serialEnabled?: boolean | null

      /**
       * For boards without a hard wired button, this is the pin number that will be used
       * Boards that have more than one button can swap the function with this one. defaults to BUTTON_PIN if defined.
       */
      buttonGpio?: number | null

      /**
       * For boards without a PWM buzzer, this is the pin number that will be used
       * Defaults to PIN_BUZZER if defined.
       */
      buzzerGpio?: number | null

      /** Sets the role of node */
      rebroadcastMode?: meshtastic.Config.DeviceConfig.RebroadcastMode | null

      /**
       * Send our nodeinfo this often
       * Defaults to 900 Seconds (15 minutes)
       */
      nodeInfoBroadcastSecs?: number | null

      /** Treat double tap interrupt on supported accelerometers as a button press if set to true */
      doubleTapAsButtonPress?: boolean | null

      /**
       * If true, device is considered to be "managed" by a mesh administrator
       * Clients should then limit available configuration and administrative options inside the user interface
       * Moved to SecurityConfig
       */
      isManaged?: boolean | null

      /** Disables the triple-press of user button to enable or disable GPS */
      disableTripleClick?: boolean | null

      /** POSIX Timezone definition string from https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv. */
      tzdef?: string | null

      /** If true, disable the default blinking LED (LED_PIN) behavior on the device */
      ledHeartbeatDisabled?: boolean | null

      /**
       * Controls buzzer behavior for audio feedback
       * Defaults to ENABLED
       */
      buzzerMode?: meshtastic.Config.DeviceConfig.BuzzerMode | null
    }

    /** Configuration */
    class DeviceConfig implements IDeviceConfig {
      /**
       * Constructs a new DeviceConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.IDeviceConfig)

      /** Sets the role of node */
      public role: meshtastic.Config.DeviceConfig.Role

      /**
       * Disabling this will disable the SerialConsole by not initilizing the StreamAPI
       * Moved to SecurityConfig
       */
      public serialEnabled: boolean

      /**
       * For boards without a hard wired button, this is the pin number that will be used
       * Boards that have more than one button can swap the function with this one. defaults to BUTTON_PIN if defined.
       */
      public buttonGpio: number

      /**
       * For boards without a PWM buzzer, this is the pin number that will be used
       * Defaults to PIN_BUZZER if defined.
       */
      public buzzerGpio: number

      /** Sets the role of node */
      public rebroadcastMode: meshtastic.Config.DeviceConfig.RebroadcastMode

      /**
       * Send our nodeinfo this often
       * Defaults to 900 Seconds (15 minutes)
       */
      public nodeInfoBroadcastSecs: number

      /** Treat double tap interrupt on supported accelerometers as a button press if set to true */
      public doubleTapAsButtonPress: boolean

      /**
       * If true, device is considered to be "managed" by a mesh administrator
       * Clients should then limit available configuration and administrative options inside the user interface
       * Moved to SecurityConfig
       */
      public isManaged: boolean

      /** Disables the triple-press of user button to enable or disable GPS */
      public disableTripleClick: boolean

      /** POSIX Timezone definition string from https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv. */
      public tzdef: string

      /** If true, disable the default blinking LED (LED_PIN) behavior on the device */
      public ledHeartbeatDisabled: boolean

      /**
       * Controls buzzer behavior for audio feedback
       * Defaults to ENABLED
       */
      public buzzerMode: meshtastic.Config.DeviceConfig.BuzzerMode

      /**
       * Encodes the specified DeviceConfig message. Does not implicitly {@link meshtastic.Config.DeviceConfig.verify|verify} messages.
       * @param message DeviceConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.IDeviceConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a DeviceConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns DeviceConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.DeviceConfig
    }

    namespace DeviceConfig {
      /** Defines the device's role on the Mesh network */
      enum Role {
        CLIENT = 0,
        CLIENT_MUTE = 1,
        ROUTER = 2,
        ROUTER_CLIENT = 3,
        REPEATER = 4,
        TRACKER = 5,
        SENSOR = 6,
        TAK = 7,
        CLIENT_HIDDEN = 8,
        LOST_AND_FOUND = 9,
        TAK_TRACKER = 10,
        ROUTER_LATE = 11,
        CLIENT_BASE = 12,
      }

      /** Defines the device's behavior for how messages are rebroadcast */
      enum RebroadcastMode {
        ALL = 0,
        ALL_SKIP_DECODING = 1,
        LOCAL_ONLY = 2,
        KNOWN_ONLY = 3,
        NONE = 4,
        CORE_PORTNUMS_ONLY = 5,
      }

      /** Defines buzzer behavior for audio feedback */
      enum BuzzerMode {
        ALL_ENABLED = 0,
        DISABLED = 1,
        NOTIFICATIONS_ONLY = 2,
        SYSTEM_ONLY = 3,
        DIRECT_MSG_ONLY = 4,
      }
    }

    /** Properties of a PositionConfig. */
    interface IPositionConfig {
      /**
       * We should send our position this often (but only if it has changed significantly)
       * Defaults to 15 minutes
       */
      positionBroadcastSecs?: number | null

      /** Adaptive position braoadcast, which is now the default. */
      positionBroadcastSmartEnabled?: boolean | null

      /**
       * If set, this node is at a fixed position.
       * We will generate GPS position updates at the regular interval, but use whatever the last lat/lon/alt we have for the node.
       * The lat/lon/alt can be set by an internal GPS or with the help of the app.
       */
      fixedPosition?: boolean | null

      /** Is GPS enabled for this node? */
      gpsEnabled?: boolean | null

      /**
       * How often should we try to get GPS position (in seconds)
       * or zero for the default of once every 30 seconds
       * or a very large value (maxint) to update only once at boot.
       */
      gpsUpdateInterval?: number | null

      /** Deprecated in favor of using smart / regular broadcast intervals as implicit attempt time */
      gpsAttemptTime?: number | null

      /**
       * Bit field of boolean configuration options for POSITION messages
       * (bitwise OR of PositionFlags)
       */
      positionFlags?: number | null

      /** (Re)define GPS_RX_PIN for your board. */
      rxGpio?: number | null

      /** (Re)define GPS_TX_PIN for your board. */
      txGpio?: number | null

      /** The minimum distance in meters traveled (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled */
      broadcastSmartMinimumDistance?: number | null

      /** The minimum number of seconds (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled */
      broadcastSmartMinimumIntervalSecs?: number | null

      /** (Re)define PIN_GPS_EN for your board. */
      gpsEnGpio?: number | null

      /** Set where GPS is enabled, disabled, or not present */
      gpsMode?: meshtastic.Config.PositionConfig.GpsMode | null
    }

    /** Position Config */
    class PositionConfig implements IPositionConfig {
      /**
       * Constructs a new PositionConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.IPositionConfig)

      /**
       * We should send our position this often (but only if it has changed significantly)
       * Defaults to 15 minutes
       */
      public positionBroadcastSecs: number

      /** Adaptive position braoadcast, which is now the default. */
      public positionBroadcastSmartEnabled: boolean

      /**
       * If set, this node is at a fixed position.
       * We will generate GPS position updates at the regular interval, but use whatever the last lat/lon/alt we have for the node.
       * The lat/lon/alt can be set by an internal GPS or with the help of the app.
       */
      public fixedPosition: boolean

      /** Is GPS enabled for this node? */
      public gpsEnabled: boolean

      /**
       * How often should we try to get GPS position (in seconds)
       * or zero for the default of once every 30 seconds
       * or a very large value (maxint) to update only once at boot.
       */
      public gpsUpdateInterval: number

      /** Deprecated in favor of using smart / regular broadcast intervals as implicit attempt time */
      public gpsAttemptTime: number

      /**
       * Bit field of boolean configuration options for POSITION messages
       * (bitwise OR of PositionFlags)
       */
      public positionFlags: number

      /** (Re)define GPS_RX_PIN for your board. */
      public rxGpio: number

      /** (Re)define GPS_TX_PIN for your board. */
      public txGpio: number

      /** The minimum distance in meters traveled (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled */
      public broadcastSmartMinimumDistance: number

      /** The minimum number of seconds (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled */
      public broadcastSmartMinimumIntervalSecs: number

      /** (Re)define PIN_GPS_EN for your board. */
      public gpsEnGpio: number

      /** Set where GPS is enabled, disabled, or not present */
      public gpsMode: meshtastic.Config.PositionConfig.GpsMode

      /**
       * Encodes the specified PositionConfig message. Does not implicitly {@link meshtastic.Config.PositionConfig.verify|verify} messages.
       * @param message PositionConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.IPositionConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a PositionConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns PositionConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.PositionConfig
    }

    namespace PositionConfig {
      /**
       * Bit field of boolean configuration options, indicating which optional
       * fields to include when assembling POSITION messages.
       * Longitude, latitude, altitude, speed, heading, and DOP
       * are always included (also time if GPS-synced)
       * NOTE: the more fields are included, the larger the message will be -
       * leading to longer airtime and a higher risk of packet loss
       */
      enum PositionFlags {
        UNSET = 0,
        ALTITUDE = 1,
        ALTITUDE_MSL = 2,
        GEOIDAL_SEPARATION = 4,
        DOP = 8,
        HVDOP = 16,
        SATINVIEW = 32,
        SEQ_NO = 64,
        TIMESTAMP = 128,
        HEADING = 256,
        SPEED = 512,
      }

      /** GpsMode enum. */
      enum GpsMode {
        DISABLED = 0,
        ENABLED = 1,
        NOT_PRESENT = 2,
      }
    }

    /** Properties of a PowerConfig. */
    interface IPowerConfig {
      /**
       * Description: Will sleep everything as much as possible, for the tracker and sensor role this will also include the lora radio.
       * Don't use this setting if you want to use your device with the phone apps or are using a device without a user button.
       * Technical Details: Works for ESP32 devices and NRF52 devices in the Sensor or Tracker roles
       */
      isPowerSaving?: boolean | null

      /** Description: If non-zero, the device will fully power off this many seconds after external power is removed. */
      onBatteryShutdownAfterSecs?: number | null

      /**
       * Ratio of voltage divider for battery pin eg. 3.20 (R1=100k, R2=220k)
       * Overrides the ADC_MULTIPLIER defined in variant for battery voltage calculation.
       * https://meshtastic.org/docs/configuration/radio/power/#adc-multiplier-override
       * Should be set to floating point value between 2 and 6
       */
      adcMultiplierOverride?: number | null

      /**
       * Description: The number of seconds for to wait before turning off BLE in No Bluetooth states
       * Technical Details: ESP32 Only 0 for default of 1 minute
       */
      waitBluetoothSecs?: number | null

      /**
       * Super Deep Sleep Seconds
       * While in Light Sleep if mesh_sds_timeout_secs is exceeded we will lower into super deep sleep
       * for this value (default 1 year) or a button press
       * 0 for default of one year
       */
      sdsSecs?: number | null

      /**
       * Description: In light sleep the CPU is suspended, LoRa radio is on, BLE is off an GPS is on
       * Technical Details: ESP32 Only 0 for default of 300
       */
      lsSecs?: number | null

      /**
       * Description: While in light sleep when we receive packets on the LoRa radio we will wake and handle them and stay awake in no BLE mode for this value
       * Technical Details: ESP32 Only 0 for default of 10 seconds
       */
      minWakeSecs?: number | null

      /** I2C address of INA_2XX to use for reading device battery voltage */
      deviceBatteryInaAddress?: number | null

      /**
       * If non-zero, we want powermon log outputs.  With the particular (bitfield) sources enabled.
       * Note: we picked an ID of 32 so that lower more efficient IDs can be used for more frequently used options.
       */
      powermonEnables?: number | Long | null
    }

    /**
     * Power Config\
     * See [Power Config](/docs/settings/config/power) for additional power config details.
     */
    class PowerConfig implements IPowerConfig {
      /**
       * Constructs a new PowerConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.IPowerConfig)

      /**
       * Description: Will sleep everything as much as possible, for the tracker and sensor role this will also include the lora radio.
       * Don't use this setting if you want to use your device with the phone apps or are using a device without a user button.
       * Technical Details: Works for ESP32 devices and NRF52 devices in the Sensor or Tracker roles
       */
      public isPowerSaving: boolean

      /** Description: If non-zero, the device will fully power off this many seconds after external power is removed. */
      public onBatteryShutdownAfterSecs: number

      /**
       * Ratio of voltage divider for battery pin eg. 3.20 (R1=100k, R2=220k)
       * Overrides the ADC_MULTIPLIER defined in variant for battery voltage calculation.
       * https://meshtastic.org/docs/configuration/radio/power/#adc-multiplier-override
       * Should be set to floating point value between 2 and 6
       */
      public adcMultiplierOverride: number

      /**
       * Description: The number of seconds for to wait before turning off BLE in No Bluetooth states
       * Technical Details: ESP32 Only 0 for default of 1 minute
       */
      public waitBluetoothSecs: number

      /**
       * Super Deep Sleep Seconds
       * While in Light Sleep if mesh_sds_timeout_secs is exceeded we will lower into super deep sleep
       * for this value (default 1 year) or a button press
       * 0 for default of one year
       */
      public sdsSecs: number

      /**
       * Description: In light sleep the CPU is suspended, LoRa radio is on, BLE is off an GPS is on
       * Technical Details: ESP32 Only 0 for default of 300
       */
      public lsSecs: number

      /**
       * Description: While in light sleep when we receive packets on the LoRa radio we will wake and handle them and stay awake in no BLE mode for this value
       * Technical Details: ESP32 Only 0 for default of 10 seconds
       */
      public minWakeSecs: number

      /** I2C address of INA_2XX to use for reading device battery voltage */
      public deviceBatteryInaAddress: number

      /**
       * If non-zero, we want powermon log outputs.  With the particular (bitfield) sources enabled.
       * Note: we picked an ID of 32 so that lower more efficient IDs can be used for more frequently used options.
       */
      public powermonEnables: number | Long

      /**
       * Encodes the specified PowerConfig message. Does not implicitly {@link meshtastic.Config.PowerConfig.verify|verify} messages.
       * @param message PowerConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.IPowerConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a PowerConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns PowerConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.PowerConfig
    }

    /** Properties of a NetworkConfig. */
    interface INetworkConfig {
      /** Enable WiFi (disables Bluetooth) */
      wifiEnabled?: boolean | null

      /**
       * If set, this node will try to join the specified wifi network and
       * acquire an address via DHCP
       */
      wifiSsid?: string | null

      /** If set, will be use to authenticate to the named wifi */
      wifiPsk?: string | null

      /** NTP server to use if WiFi is conneced, defaults to `meshtastic.pool.ntp.org` */
      ntpServer?: string | null

      /** Enable Ethernet */
      ethEnabled?: boolean | null

      /** acquire an address via DHCP or assign static */
      addressMode?: meshtastic.Config.NetworkConfig.AddressMode | null

      /** struct to keep static address */
      ipv4Config?: meshtastic.Config.NetworkConfig.IIpV4Config | null

      /** rsyslog Server and Port */
      rsyslogServer?: string | null

      /** Flags for enabling/disabling network protocols */
      enabledProtocols?: number | null

      /** Enable/Disable ipv6 support */
      ipv6Enabled?: boolean | null
    }

    /** Network Config */
    class NetworkConfig implements INetworkConfig {
      /**
       * Constructs a new NetworkConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.INetworkConfig)

      /** Enable WiFi (disables Bluetooth) */
      public wifiEnabled: boolean

      /**
       * If set, this node will try to join the specified wifi network and
       * acquire an address via DHCP
       */
      public wifiSsid: string

      /** If set, will be use to authenticate to the named wifi */
      public wifiPsk: string

      /** NTP server to use if WiFi is conneced, defaults to `meshtastic.pool.ntp.org` */
      public ntpServer: string

      /** Enable Ethernet */
      public ethEnabled: boolean

      /** acquire an address via DHCP or assign static */
      public addressMode: meshtastic.Config.NetworkConfig.AddressMode

      /** struct to keep static address */
      public ipv4Config?: meshtastic.Config.NetworkConfig.IIpV4Config | null

      /** rsyslog Server and Port */
      public rsyslogServer: string

      /** Flags for enabling/disabling network protocols */
      public enabledProtocols: number

      /** Enable/Disable ipv6 support */
      public ipv6Enabled: boolean

      /**
       * Encodes the specified NetworkConfig message. Does not implicitly {@link meshtastic.Config.NetworkConfig.verify|verify} messages.
       * @param message NetworkConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.INetworkConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a NetworkConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns NetworkConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.NetworkConfig
    }

    namespace NetworkConfig {
      /** AddressMode enum. */
      enum AddressMode {
        DHCP = 0,
        STATIC = 1,
      }

      /** Properties of an IpV4Config. */
      interface IIpV4Config {
        /** Static IP address */
        ip?: number | null

        /** Static gateway address */
        gateway?: number | null

        /** Static subnet mask */
        subnet?: number | null

        /** Static DNS server address */
        dns?: number | null
      }

      /** Represents an IpV4Config. */
      class IpV4Config implements IIpV4Config {
        /**
         * Constructs a new IpV4Config.
         * @param [properties] Properties to set
         */
        constructor(properties?: meshtastic.Config.NetworkConfig.IIpV4Config)

        /** Static IP address */
        public ip: number

        /** Static gateway address */
        public gateway: number

        /** Static subnet mask */
        public subnet: number

        /** Static DNS server address */
        public dns: number

        /**
         * Encodes the specified IpV4Config message. Does not implicitly {@link meshtastic.Config.NetworkConfig.IpV4Config.verify|verify} messages.
         * @param message IpV4Config message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: meshtastic.Config.NetworkConfig.IIpV4Config, writer?: $protobuf.Writer): $protobuf.Writer

        /**
         * Decodes an IpV4Config message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IpV4Config
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.NetworkConfig.IpV4Config
      }

      /** Available flags auxiliary network protocols */
      enum ProtocolFlags {
        NO_BROADCAST = 0,
        UDP_BROADCAST = 1,
      }
    }

    /** Properties of a DisplayConfig. */
    interface IDisplayConfig {
      /**
       * Number of seconds the screen stays on after pressing the user button or receiving a message
       * 0 for default of one minute MAXUINT for always on
       */
      screenOnSecs?: number | null

      /**
       * Deprecated in 2.7.4: Unused
       * How the GPS coordinates are formatted on the OLED screen.
       */
      gpsFormat?: meshtastic.Config.DisplayConfig.DeprecatedGpsCoordinateFormat | null

      /**
       * Automatically toggles to the next page on the screen like a carousel, based the specified interval in seconds.
       * Potentially useful for devices without user buttons.
       */
      autoScreenCarouselSecs?: number | null

      /**
       * If this is set, the displayed compass will always point north. if unset, the old behaviour
       * (top of display is heading direction) is used.
       */
      compassNorthTop?: boolean | null

      /** Flip screen vertically, for cases that mount the screen upside down */
      flipScreen?: boolean | null

      /** Perferred display units */
      units?: meshtastic.Config.DisplayConfig.DisplayUnits | null

      /** Override auto-detect in screen */
      oled?: meshtastic.Config.DisplayConfig.OledType | null

      /** Display Mode */
      displaymode?: meshtastic.Config.DisplayConfig.DisplayMode | null

      /** Print first line in pseudo-bold? FALSE is original style, TRUE is bold */
      headingBold?: boolean | null

      /** Should we wake the screen up on accelerometer detected motion or tap */
      wakeOnTapOrMotion?: boolean | null

      /** Indicates how to rotate or invert the compass output to accurate display on the display. */
      compassOrientation?: meshtastic.Config.DisplayConfig.CompassOrientation | null

      /**
       * If false (default), the device will display the time in 24-hour format on screen.
       * If true, the device will display the time in 12-hour format on screen.
       */
      use_12hClock?: boolean | null

      /**
       * If false (default), the device will use short names for various display screens.
       * If true, node names will show in long format
       */
      useLongNodeName?: boolean | null
    }

    /** Display Config */
    class DisplayConfig implements IDisplayConfig {
      /**
       * Constructs a new DisplayConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.IDisplayConfig)

      /**
       * Number of seconds the screen stays on after pressing the user button or receiving a message
       * 0 for default of one minute MAXUINT for always on
       */
      public screenOnSecs: number

      /**
       * Deprecated in 2.7.4: Unused
       * How the GPS coordinates are formatted on the OLED screen.
       */
      public gpsFormat: meshtastic.Config.DisplayConfig.DeprecatedGpsCoordinateFormat

      /**
       * Automatically toggles to the next page on the screen like a carousel, based the specified interval in seconds.
       * Potentially useful for devices without user buttons.
       */
      public autoScreenCarouselSecs: number

      /**
       * If this is set, the displayed compass will always point north. if unset, the old behaviour
       * (top of display is heading direction) is used.
       */
      public compassNorthTop: boolean

      /** Flip screen vertically, for cases that mount the screen upside down */
      public flipScreen: boolean

      /** Perferred display units */
      public units: meshtastic.Config.DisplayConfig.DisplayUnits

      /** Override auto-detect in screen */
      public oled: meshtastic.Config.DisplayConfig.OledType

      /** Display Mode */
      public displaymode: meshtastic.Config.DisplayConfig.DisplayMode

      /** Print first line in pseudo-bold? FALSE is original style, TRUE is bold */
      public headingBold: boolean

      /** Should we wake the screen up on accelerometer detected motion or tap */
      public wakeOnTapOrMotion: boolean

      /** Indicates how to rotate or invert the compass output to accurate display on the display. */
      public compassOrientation: meshtastic.Config.DisplayConfig.CompassOrientation

      /**
       * If false (default), the device will display the time in 24-hour format on screen.
       * If true, the device will display the time in 12-hour format on screen.
       */
      public use_12hClock: boolean

      /**
       * If false (default), the device will use short names for various display screens.
       * If true, node names will show in long format
       */
      public useLongNodeName: boolean

      /**
       * Encodes the specified DisplayConfig message. Does not implicitly {@link meshtastic.Config.DisplayConfig.verify|verify} messages.
       * @param message DisplayConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.IDisplayConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a DisplayConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns DisplayConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.DisplayConfig
    }

    namespace DisplayConfig {
      /** Deprecated in 2.7.4: Unused */
      enum DeprecatedGpsCoordinateFormat {
        UNUSED = 0,
      }

      /** Unit display preference */
      enum DisplayUnits {
        METRIC = 0,
        IMPERIAL = 1,
      }

      /** Override OLED outo detect with this if it fails. */
      enum OledType {
        OLED_AUTO = 0,
        OLED_SSD1306 = 1,
        OLED_SH1106 = 2,
        OLED_SH1107 = 3,
        OLED_SH1107_128_128 = 4,
      }

      /** DisplayMode enum. */
      enum DisplayMode {
        DEFAULT = 0,
        TWOCOLOR = 1,
        INVERTED = 2,
        COLOR = 3,
      }

      /** CompassOrientation enum. */
      enum CompassOrientation {
        DEGREES_0 = 0,
        DEGREES_90 = 1,
        DEGREES_180 = 2,
        DEGREES_270 = 3,
        DEGREES_0_INVERTED = 4,
        DEGREES_90_INVERTED = 5,
        DEGREES_180_INVERTED = 6,
        DEGREES_270_INVERTED = 7,
      }
    }

    /** Properties of a LoRaConfig. */
    interface ILoRaConfig {
      /**
       * When enabled, the `modem_preset` fields will be adhered to, else the `bandwidth`/`spread_factor`/`coding_rate`
       * will be taked from their respective manually defined fields
       */
      usePreset?: boolean | null

      /**
       * Either modem_config or bandwidth/spreading/coding will be specified - NOT BOTH.
       * As a heuristic: If bandwidth is specified, do not use modem_config.
       * Because protobufs take ZERO space when the value is zero this works out nicely.
       * This value is replaced by bandwidth/spread_factor/coding_rate.
       * If you'd like to experiment with other options add them to MeshRadio.cpp in the device code.
       */
      modemPreset?: meshtastic.Config.LoRaConfig.ModemPreset | null

      /**
       * Bandwidth in MHz
       * Certain bandwidth numbers are 'special' and will be converted to the
       * appropriate floating point value: 31 -> 31.25MHz
       */
      bandwidth?: number | null

      /**
       * A number from 7 to 12.
       * Indicates number of chirps per symbol as 1<<spread_factor.
       */
      spreadFactor?: number | null

      /**
       * The denominator of the coding rate.
       * ie for 4/5, the value is 5. 4/8 the value is 8.
       */
      codingRate?: number | null

      /**
       * This parameter is for advanced users with advanced test equipment, we do not recommend most users use it.
       * A frequency offset that is added to to the calculated band center frequency.
       * Used to correct for crystal calibration errors.
       */
      frequencyOffset?: number | null

      /** The region code for the radio (US, CN, EU433, etc...) */
      region?: meshtastic.Config.LoRaConfig.RegionCode | null

      /**
       * Maximum number of hops. This can't be greater than 7.
       * Default of 3
       * Attempting to set a value > 7 results in the default
       */
      hopLimit?: number | null

      /**
       * Disable TX from the LoRa radio. Useful for hot-swapping antennas and other tests.
       * Defaults to false
       */
      txEnabled?: boolean | null

      /**
       * If zero, then use default max legal continuous power (ie. something that won't
       * burn out the radio hardware)
       * In most cases you should use zero here.
       * Units are in dBm.
       */
      txPower?: number | null

      /**
       * This controls the actual hardware frequency the radio transmits on.
       * Most users should never need to be exposed to this field/concept.
       * A channel number between 1 and NUM_CHANNELS (whatever the max is in the current region).
       * If ZERO then the rule is "use the old channel name hash based
       * algorithm to derive the channel number")
       * If using the hash algorithm the channel number will be: hash(channel_name) %
       * NUM_CHANNELS (Where num channels depends on the regulatory region).
       */
      channelNum?: number | null

      /**
       * If true, duty cycle limits will be exceeded and thus you're possibly not following
       * the local regulations if you're not a HAM.
       * Has no effect if the duty cycle of the used region is 100%.
       */
      overrideDutyCycle?: boolean | null

      /** If true, sets RX boosted gain mode on SX126X based radios */
      sx126xRxBoostedGain?: boolean | null

      /**
       * This parameter is for advanced users and licensed HAM radio operators.
       * Ignore Channel Calculation and use this frequency instead. The frequency_offset
       * will still be applied. This will allow you to use out-of-band frequencies.
       * Please respect your local laws and regulations. If you are a HAM, make sure you
       * enable HAM mode and turn off encryption.
       */
      overrideFrequency?: number | null

      /** If true, disable the build-in PA FAN using pin define in RF95_FAN_EN. */
      paFanDisabled?: boolean | null

      /**
       * For testing it is useful sometimes to force a node to never listen to
       * particular other nodes (simulating radio out of range). All nodenums listed
       * in ignore_incoming will have packets they send dropped on receive (by router.cpp)
       */
      ignoreIncoming?: number[] | null

      /** If true, the device will not process any packets received via LoRa that passed via MQTT anywhere on the path towards it. */
      ignoreMqtt?: boolean | null

      /** Sets the ok_to_mqtt bit on outgoing packets */
      configOkToMqtt?: boolean | null
    }

    /** Lora Config */
    class LoRaConfig implements ILoRaConfig {
      /**
       * Constructs a new LoRaConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.ILoRaConfig)

      /**
       * When enabled, the `modem_preset` fields will be adhered to, else the `bandwidth`/`spread_factor`/`coding_rate`
       * will be taked from their respective manually defined fields
       */
      public usePreset: boolean

      /**
       * Either modem_config or bandwidth/spreading/coding will be specified - NOT BOTH.
       * As a heuristic: If bandwidth is specified, do not use modem_config.
       * Because protobufs take ZERO space when the value is zero this works out nicely.
       * This value is replaced by bandwidth/spread_factor/coding_rate.
       * If you'd like to experiment with other options add them to MeshRadio.cpp in the device code.
       */
      public modemPreset: meshtastic.Config.LoRaConfig.ModemPreset

      /**
       * Bandwidth in MHz
       * Certain bandwidth numbers are 'special' and will be converted to the
       * appropriate floating point value: 31 -> 31.25MHz
       */
      public bandwidth: number

      /**
       * A number from 7 to 12.
       * Indicates number of chirps per symbol as 1<<spread_factor.
       */
      public spreadFactor: number

      /**
       * The denominator of the coding rate.
       * ie for 4/5, the value is 5. 4/8 the value is 8.
       */
      public codingRate: number

      /**
       * This parameter is for advanced users with advanced test equipment, we do not recommend most users use it.
       * A frequency offset that is added to to the calculated band center frequency.
       * Used to correct for crystal calibration errors.
       */
      public frequencyOffset: number

      /** The region code for the radio (US, CN, EU433, etc...) */
      public region: meshtastic.Config.LoRaConfig.RegionCode

      /**
       * Maximum number of hops. This can't be greater than 7.
       * Default of 3
       * Attempting to set a value > 7 results in the default
       */
      public hopLimit: number

      /**
       * Disable TX from the LoRa radio. Useful for hot-swapping antennas and other tests.
       * Defaults to false
       */
      public txEnabled: boolean

      /**
       * If zero, then use default max legal continuous power (ie. something that won't
       * burn out the radio hardware)
       * In most cases you should use zero here.
       * Units are in dBm.
       */
      public txPower: number

      /**
       * This controls the actual hardware frequency the radio transmits on.
       * Most users should never need to be exposed to this field/concept.
       * A channel number between 1 and NUM_CHANNELS (whatever the max is in the current region).
       * If ZERO then the rule is "use the old channel name hash based
       * algorithm to derive the channel number")
       * If using the hash algorithm the channel number will be: hash(channel_name) %
       * NUM_CHANNELS (Where num channels depends on the regulatory region).
       */
      public channelNum: number

      /**
       * If true, duty cycle limits will be exceeded and thus you're possibly not following
       * the local regulations if you're not a HAM.
       * Has no effect if the duty cycle of the used region is 100%.
       */
      public overrideDutyCycle: boolean

      /** If true, sets RX boosted gain mode on SX126X based radios */
      public sx126xRxBoostedGain: boolean

      /**
       * This parameter is for advanced users and licensed HAM radio operators.
       * Ignore Channel Calculation and use this frequency instead. The frequency_offset
       * will still be applied. This will allow you to use out-of-band frequencies.
       * Please respect your local laws and regulations. If you are a HAM, make sure you
       * enable HAM mode and turn off encryption.
       */
      public overrideFrequency: number

      /** If true, disable the build-in PA FAN using pin define in RF95_FAN_EN. */
      public paFanDisabled: boolean

      /**
       * For testing it is useful sometimes to force a node to never listen to
       * particular other nodes (simulating radio out of range). All nodenums listed
       * in ignore_incoming will have packets they send dropped on receive (by router.cpp)
       */
      public ignoreIncoming: number[]

      /** If true, the device will not process any packets received via LoRa that passed via MQTT anywhere on the path towards it. */
      public ignoreMqtt: boolean

      /** Sets the ok_to_mqtt bit on outgoing packets */
      public configOkToMqtt: boolean

      /**
       * Encodes the specified LoRaConfig message. Does not implicitly {@link meshtastic.Config.LoRaConfig.verify|verify} messages.
       * @param message LoRaConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.ILoRaConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a LoRaConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns LoRaConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.LoRaConfig
    }

    namespace LoRaConfig {
      /** RegionCode enum. */
      enum RegionCode {
        UNSET = 0,
        US = 1,
        EU_433 = 2,
        EU_868 = 3,
        CN = 4,
        JP = 5,
        ANZ = 6,
        KR = 7,
        TW = 8,
        RU = 9,
        IN = 10,
        NZ_865 = 11,
        TH = 12,
        LORA_24 = 13,
        UA_433 = 14,
        UA_868 = 15,
        MY_433 = 16,
        MY_919 = 17,
        SG_923 = 18,
        PH_433 = 19,
        PH_868 = 20,
        PH_915 = 21,
        ANZ_433 = 22,
        KZ_433 = 23,
        KZ_863 = 24,
        NP_865 = 25,
        BR_902 = 26,
      }

      /**
       * Standard predefined channel settings
       * Note: these mappings must match ModemPreset Choice in the device code.
       */
      enum ModemPreset {
        LONG_FAST = 0,
        LONG_SLOW = 1,
        VERY_LONG_SLOW = 2,
        MEDIUM_SLOW = 3,
        MEDIUM_FAST = 4,
        SHORT_SLOW = 5,
        SHORT_FAST = 6,
        LONG_MODERATE = 7,
        SHORT_TURBO = 8,
      }
    }

    /** Properties of a BluetoothConfig. */
    interface IBluetoothConfig {
      /** Enable Bluetooth on the device */
      enabled?: boolean | null

      /** Determines the pairing strategy for the device */
      mode?: meshtastic.Config.BluetoothConfig.PairingMode | null

      /** Specified PIN for PairingMode.FixedPin */
      fixedPin?: number | null
    }

    /** Represents a BluetoothConfig. */
    class BluetoothConfig implements IBluetoothConfig {
      /**
       * Constructs a new BluetoothConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.IBluetoothConfig)

      /** Enable Bluetooth on the device */
      public enabled: boolean

      /** Determines the pairing strategy for the device */
      public mode: meshtastic.Config.BluetoothConfig.PairingMode

      /** Specified PIN for PairingMode.FixedPin */
      public fixedPin: number

      /**
       * Encodes the specified BluetoothConfig message. Does not implicitly {@link meshtastic.Config.BluetoothConfig.verify|verify} messages.
       * @param message BluetoothConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.IBluetoothConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a BluetoothConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns BluetoothConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.BluetoothConfig
    }

    namespace BluetoothConfig {
      /** PairingMode enum. */
      enum PairingMode {
        RANDOM_PIN = 0,
        FIXED_PIN = 1,
        NO_PIN = 2,
      }
    }

    /** Properties of a SecurityConfig. */
    interface ISecurityConfig {
      /**
       * The public key of the user's device.
       * Sent out to other nodes on the mesh to allow them to compute a shared secret key.
       */
      publicKey?: Uint8Array | null

      /**
       * The private key of the device.
       * Used to create a shared key with a remote device.
       */
      privateKey?: Uint8Array | null

      /** The public key authorized to send admin messages to this node. */
      adminKey?: Uint8Array[] | null

      /**
       * If true, device is considered to be "managed" by a mesh administrator via admin messages
       * Device is managed by a mesh administrator.
       */
      isManaged?: boolean | null

      /** Serial Console over the Stream API." */
      serialEnabled?: boolean | null

      /**
       * By default we turn off logging as soon as an API client connects (to keep shared serial link quiet).
       * Output live debug logging over serial or bluetooth is set to true.
       */
      debugLogApiEnabled?: boolean | null

      /** Allow incoming device control over the insecure legacy admin channel. */
      adminChannelEnabled?: boolean | null
    }

    /** Represents a SecurityConfig. */
    class SecurityConfig implements ISecurityConfig {
      /**
       * Constructs a new SecurityConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.ISecurityConfig)

      /**
       * The public key of the user's device.
       * Sent out to other nodes on the mesh to allow them to compute a shared secret key.
       */
      public publicKey: Uint8Array

      /**
       * The private key of the device.
       * Used to create a shared key with a remote device.
       */
      public privateKey: Uint8Array

      /** The public key authorized to send admin messages to this node. */
      public adminKey: Uint8Array[]

      /**
       * If true, device is considered to be "managed" by a mesh administrator via admin messages
       * Device is managed by a mesh administrator.
       */
      public isManaged: boolean

      /** Serial Console over the Stream API." */
      public serialEnabled: boolean

      /**
       * By default we turn off logging as soon as an API client connects (to keep shared serial link quiet).
       * Output live debug logging over serial or bluetooth is set to true.
       */
      public debugLogApiEnabled: boolean

      /** Allow incoming device control over the insecure legacy admin channel. */
      public adminChannelEnabled: boolean

      /**
       * Encodes the specified SecurityConfig message. Does not implicitly {@link meshtastic.Config.SecurityConfig.verify|verify} messages.
       * @param message SecurityConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.ISecurityConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a SecurityConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns SecurityConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.SecurityConfig
    }

    /** Properties of a SessionkeyConfig. */
    interface ISessionkeyConfig {}

    /** Blank config request, strictly for getting the session key */
    class SessionkeyConfig implements ISessionkeyConfig {
      /**
       * Constructs a new SessionkeyConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.ISessionkeyConfig)

      /**
       * Encodes the specified SessionkeyConfig message. Does not implicitly {@link meshtastic.Config.SessionkeyConfig.verify|verify} messages.
       * @param message SessionkeyConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.Config.ISessionkeyConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a SessionkeyConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns SessionkeyConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Config.SessionkeyConfig
    }
  }

  /** Properties of a DeviceUIConfig. */
  interface IDeviceUIConfig {
    /** A version integer used to invalidate saved files when we make incompatible changes. */
    version?: number | null

    /** TFT display brightness 1..255 */
    screenBrightness?: number | null

    /** Screen timeout 0..900 */
    screenTimeout?: number | null

    /** Screen/Settings lock enabled */
    screenLock?: boolean | null

    /** DeviceUIConfig settingsLock */
    settingsLock?: boolean | null

    /** DeviceUIConfig pinCode */
    pinCode?: number | null

    /** Color theme */
    theme?: meshtastic.Theme | null

    /** Audible message, banner and ring tone */
    alertEnabled?: boolean | null

    /** DeviceUIConfig bannerEnabled */
    bannerEnabled?: boolean | null

    /** DeviceUIConfig ringToneId */
    ringToneId?: number | null

    /** Localization */
    language?: meshtastic.Language | null

    /** Node list filter */
    nodeFilter?: meshtastic.INodeFilter | null

    /** Node list highlightening */
    nodeHighlight?: meshtastic.INodeHighlight | null

    /** 8 integers for screen calibration data */
    calibrationData?: Uint8Array | null

    /** Map related data */
    mapData?: meshtastic.IMap | null

    /** Compass mode */
    compassMode?: meshtastic.CompassMode | null

    /**
     * RGB color for BaseUI
     * 0xRRGGBB format, e.g. 0xFF0000 for red
     */
    screenRgbColor?: number | null

    /**
     * Clockface analog style
     * true for analog clockface, false for digital clockface
     */
    isClockfaceAnalog?: boolean | null

    /** How the GPS coordinates are formatted on the OLED screen. */
    gpsFormat?: meshtastic.DeviceUIConfig.GpsCoordinateFormat | null
  }

  /** Represents a DeviceUIConfig. */
  class DeviceUIConfig implements IDeviceUIConfig {
    /**
     * Constructs a new DeviceUIConfig.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IDeviceUIConfig)

    /** A version integer used to invalidate saved files when we make incompatible changes. */
    public version: number

    /** TFT display brightness 1..255 */
    public screenBrightness: number

    /** Screen timeout 0..900 */
    public screenTimeout: number

    /** Screen/Settings lock enabled */
    public screenLock: boolean

    /** DeviceUIConfig settingsLock. */
    public settingsLock: boolean

    /** DeviceUIConfig pinCode. */
    public pinCode: number

    /** Color theme */
    public theme: meshtastic.Theme

    /** Audible message, banner and ring tone */
    public alertEnabled: boolean

    /** DeviceUIConfig bannerEnabled. */
    public bannerEnabled: boolean

    /** DeviceUIConfig ringToneId. */
    public ringToneId: number

    /** Localization */
    public language: meshtastic.Language

    /** Node list filter */
    public nodeFilter?: meshtastic.INodeFilter | null

    /** Node list highlightening */
    public nodeHighlight?: meshtastic.INodeHighlight | null

    /** 8 integers for screen calibration data */
    public calibrationData: Uint8Array

    /** Map related data */
    public mapData?: meshtastic.IMap | null

    /** Compass mode */
    public compassMode: meshtastic.CompassMode

    /**
     * RGB color for BaseUI
     * 0xRRGGBB format, e.g. 0xFF0000 for red
     */
    public screenRgbColor: number

    /**
     * Clockface analog style
     * true for analog clockface, false for digital clockface
     */
    public isClockfaceAnalog: boolean

    /** How the GPS coordinates are formatted on the OLED screen. */
    public gpsFormat: meshtastic.DeviceUIConfig.GpsCoordinateFormat

    /**
     * Encodes the specified DeviceUIConfig message. Does not implicitly {@link meshtastic.DeviceUIConfig.verify|verify} messages.
     * @param message DeviceUIConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IDeviceUIConfig, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a DeviceUIConfig message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeviceUIConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.DeviceUIConfig
  }

  namespace DeviceUIConfig {
    /** How the GPS coordinates are displayed on the OLED screen. */
    enum GpsCoordinateFormat {
      DEC = 0,
      DMS = 1,
      UTM = 2,
      MGRS = 3,
      OLC = 4,
      OSGR = 5,
      MLS = 6,
    }
  }

  /** Properties of a NodeFilter. */
  interface INodeFilter {
    /** Filter unknown nodes */
    unknownSwitch?: boolean | null

    /** Filter offline nodes */
    offlineSwitch?: boolean | null

    /** Filter nodes w/o public key */
    publicKeySwitch?: boolean | null

    /** Filter based on hops away */
    hopsAway?: number | null

    /** Filter nodes w/o position */
    positionSwitch?: boolean | null

    /** Filter nodes by matching name string */
    nodeName?: string | null

    /** Filter based on channel */
    channel?: number | null
  }

  /** Represents a NodeFilter. */
  class NodeFilter implements INodeFilter {
    /**
     * Constructs a new NodeFilter.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.INodeFilter)

    /** Filter unknown nodes */
    public unknownSwitch: boolean

    /** Filter offline nodes */
    public offlineSwitch: boolean

    /** Filter nodes w/o public key */
    public publicKeySwitch: boolean

    /** Filter based on hops away */
    public hopsAway: number

    /** Filter nodes w/o position */
    public positionSwitch: boolean

    /** Filter nodes by matching name string */
    public nodeName: string

    /** Filter based on channel */
    public channel: number

    /**
     * Encodes the specified NodeFilter message. Does not implicitly {@link meshtastic.NodeFilter.verify|verify} messages.
     * @param message NodeFilter message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.INodeFilter, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a NodeFilter message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NodeFilter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.NodeFilter
  }

  /** Properties of a NodeHighlight. */
  interface INodeHighlight {
    /** Hightlight nodes w/ active chat */
    chatSwitch?: boolean | null

    /** Highlight nodes w/ position */
    positionSwitch?: boolean | null

    /** Highlight nodes w/ telemetry data */
    telemetrySwitch?: boolean | null

    /** Highlight nodes w/ iaq data */
    iaqSwitch?: boolean | null

    /** Highlight nodes by matching name string */
    nodeName?: string | null
  }

  /** Represents a NodeHighlight. */
  class NodeHighlight implements INodeHighlight {
    /**
     * Constructs a new NodeHighlight.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.INodeHighlight)

    /** Hightlight nodes w/ active chat */
    public chatSwitch: boolean

    /** Highlight nodes w/ position */
    public positionSwitch: boolean

    /** Highlight nodes w/ telemetry data */
    public telemetrySwitch: boolean

    /** Highlight nodes w/ iaq data */
    public iaqSwitch: boolean

    /** Highlight nodes by matching name string */
    public nodeName: string

    /**
     * Encodes the specified NodeHighlight message. Does not implicitly {@link meshtastic.NodeHighlight.verify|verify} messages.
     * @param message NodeHighlight message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.INodeHighlight, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a NodeHighlight message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NodeHighlight
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.NodeHighlight
  }

  /** Properties of a GeoPoint. */
  interface IGeoPoint {
    /** Zoom level */
    zoom?: number | null

    /** Coordinate: latitude */
    latitude?: number | null

    /** Coordinate: longitude */
    longitude?: number | null
  }

  /** Represents a GeoPoint. */
  class GeoPoint implements IGeoPoint {
    /**
     * Constructs a new GeoPoint.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IGeoPoint)

    /** Zoom level */
    public zoom: number

    /** Coordinate: latitude */
    public latitude: number

    /** Coordinate: longitude */
    public longitude: number

    /**
     * Encodes the specified GeoPoint message. Does not implicitly {@link meshtastic.GeoPoint.verify|verify} messages.
     * @param message GeoPoint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IGeoPoint, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a GeoPoint message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GeoPoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.GeoPoint
  }

  /** Properties of a Map. */
  interface IMap {
    /** Home coordinates */
    home?: meshtastic.IGeoPoint | null

    /** Map tile style */
    style?: string | null

    /** Map scroll follows GPS */
    followGps?: boolean | null
  }

  /** Represents a Map. */
  class Map implements IMap {
    /**
     * Constructs a new Map.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IMap)

    /** Home coordinates */
    public home?: meshtastic.IGeoPoint | null

    /** Map tile style */
    public style: string

    /** Map scroll follows GPS */
    public followGps: boolean

    /**
     * Encodes the specified Map message. Does not implicitly {@link meshtastic.Map.verify|verify} messages.
     * @param message Map message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IMap, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Map message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Map
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Map
  }

  /** CompassMode enum. */
  enum CompassMode {
    DYNAMIC = 0,
    FIXED_RING = 1,
    FREEZE_HEADING = 2,
  }

  /** Theme enum. */
  enum Theme {
    DARK = 0,
    LIGHT = 1,
    RED = 2,
  }

  /** Localization */
  enum Language {
    ENGLISH = 0,
    FRENCH = 1,
    GERMAN = 2,
    ITALIAN = 3,
    PORTUGUESE = 4,
    SPANISH = 5,
    SWEDISH = 6,
    FINNISH = 7,
    POLISH = 8,
    TURKISH = 9,
    SERBIAN = 10,
    RUSSIAN = 11,
    DUTCH = 12,
    GREEK = 13,
    NORWEGIAN = 14,
    SLOVENIAN = 15,
    UKRAINIAN = 16,
    BULGARIAN = 17,
    CZECH = 18,
    SIMPLIFIED_CHINESE = 30,
    TRADITIONAL_CHINESE = 31,
  }

  /** Properties of a Position. */
  interface IPosition {
    /**
     * The new preferred location encoding, multiply by 1e-7 to get degrees
     * in floating point
     */
    latitudeI?: number | null

    /** TODO: REPLACE */
    longitudeI?: number | null

    /** In meters above MSL (but see issue #359) */
    altitude?: number | null

    /**
     * This is usually not sent over the mesh (to save space), but it is sent
     * from the phone so that the local device can set its time if it is sent over
     * the mesh (because there are devices on the mesh without GPS or RTC).
     * seconds since 1970
     */
    time?: number | null

    /** TODO: REPLACE */
    locationSource?: meshtastic.Position.LocSource | null

    /** TODO: REPLACE */
    altitudeSource?: meshtastic.Position.AltSource | null

    /** Positional timestamp (actual timestamp of GPS solution) in integer epoch seconds */
    timestamp?: number | null

    /** Pos. timestamp milliseconds adjustment (rarely available or required) */
    timestampMillisAdjust?: number | null

    /** HAE altitude in meters - can be used instead of MSL altitude */
    altitudeHae?: number | null

    /** Geoidal separation in meters */
    altitudeGeoidalSeparation?: number | null

    /**
     * Horizontal, Vertical and Position Dilution of Precision, in 1/100 units
     * - PDOP is sufficient for most cases
     * - for higher precision scenarios, HDOP and VDOP can be used instead,
     * in which case PDOP becomes redundant (PDOP=sqrt(HDOP^2 + VDOP^2))
     * TODO: REMOVE/INTEGRATE
     */
    PDOP?: number | null

    /** TODO: REPLACE */
    HDOP?: number | null

    /** TODO: REPLACE */
    VDOP?: number | null

    /**
     * GPS accuracy (a hardware specific constant) in mm
     * multiplied with DOP to calculate positional accuracy
     * Default: "'bout three meters-ish" :)
     */
    gpsAccuracy?: number | null

    /**
     * Ground speed in m/s and True North TRACK in 1/100 degrees
     * Clarification of terms:
     * - "track" is the direction of motion (measured in horizontal plane)
     * - "heading" is where the fuselage points (measured in horizontal plane)
     * - "yaw" indicates a relative rotation about the vertical axis
     * TODO: REMOVE/INTEGRATE
     */
    groundSpeed?: number | null

    /** TODO: REPLACE */
    groundTrack?: number | null

    /** GPS fix quality (from NMEA GxGGA statement or similar) */
    fixQuality?: number | null

    /** GPS fix type 2D/3D (from NMEA GxGSA statement) */
    fixType?: number | null

    /** GPS "Satellites in View" number */
    satsInView?: number | null

    /** Sensor ID - in case multiple positioning sensors are being used */
    sensorId?: number | null

    /**
     * Estimated/expected time (in seconds) until next update:
     * - if we update at fixed intervals of X seconds, use X
     * - if we update at dynamic intervals (based on relative movement etc),
     * but "AT LEAST every Y seconds", use Y
     */
    nextUpdate?: number | null

    /**
     * A sequence number, incremented with each Position message to help
     * detect lost updates if needed
     */
    seqNumber?: number | null

    /** Indicates the bits of precision set by the sending node */
    precisionBits?: number | null
  }

  /** A GPS Position */
  class Position implements IPosition {
    /**
     * Constructs a new Position.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IPosition)

    /**
     * The new preferred location encoding, multiply by 1e-7 to get degrees
     * in floating point
     */
    public latitudeI?: number | null

    /** TODO: REPLACE */
    public longitudeI?: number | null

    /** In meters above MSL (but see issue #359) */
    public altitude?: number | null

    /**
     * This is usually not sent over the mesh (to save space), but it is sent
     * from the phone so that the local device can set its time if it is sent over
     * the mesh (because there are devices on the mesh without GPS or RTC).
     * seconds since 1970
     */
    public time: number

    /** TODO: REPLACE */
    public locationSource: meshtastic.Position.LocSource

    /** TODO: REPLACE */
    public altitudeSource: meshtastic.Position.AltSource

    /** Positional timestamp (actual timestamp of GPS solution) in integer epoch seconds */
    public timestamp: number

    /** Pos. timestamp milliseconds adjustment (rarely available or required) */
    public timestampMillisAdjust: number

    /** HAE altitude in meters - can be used instead of MSL altitude */
    public altitudeHae?: number | null

    /** Geoidal separation in meters */
    public altitudeGeoidalSeparation?: number | null

    /**
     * Horizontal, Vertical and Position Dilution of Precision, in 1/100 units
     * - PDOP is sufficient for most cases
     * - for higher precision scenarios, HDOP and VDOP can be used instead,
     * in which case PDOP becomes redundant (PDOP=sqrt(HDOP^2 + VDOP^2))
     * TODO: REMOVE/INTEGRATE
     */
    public PDOP: number

    /** TODO: REPLACE */
    public HDOP: number

    /** TODO: REPLACE */
    public VDOP: number

    /**
     * GPS accuracy (a hardware specific constant) in mm
     * multiplied with DOP to calculate positional accuracy
     * Default: "'bout three meters-ish" :)
     */
    public gpsAccuracy: number

    /**
     * Ground speed in m/s and True North TRACK in 1/100 degrees
     * Clarification of terms:
     * - "track" is the direction of motion (measured in horizontal plane)
     * - "heading" is where the fuselage points (measured in horizontal plane)
     * - "yaw" indicates a relative rotation about the vertical axis
     * TODO: REMOVE/INTEGRATE
     */
    public groundSpeed?: number | null

    /** TODO: REPLACE */
    public groundTrack?: number | null

    /** GPS fix quality (from NMEA GxGGA statement or similar) */
    public fixQuality: number

    /** GPS fix type 2D/3D (from NMEA GxGSA statement) */
    public fixType: number

    /** GPS "Satellites in View" number */
    public satsInView: number

    /** Sensor ID - in case multiple positioning sensors are being used */
    public sensorId: number

    /**
     * Estimated/expected time (in seconds) until next update:
     * - if we update at fixed intervals of X seconds, use X
     * - if we update at dynamic intervals (based on relative movement etc),
     * but "AT LEAST every Y seconds", use Y
     */
    public nextUpdate: number

    /**
     * A sequence number, incremented with each Position message to help
     * detect lost updates if needed
     */
    public seqNumber: number

    /** Indicates the bits of precision set by the sending node */
    public precisionBits: number

    /** Position _latitudeI. */
    public _latitudeI?: 'latitudeI'

    /** Position _longitudeI. */
    public _longitudeI?: 'longitudeI'

    /** Position _altitude. */
    public _altitude?: 'altitude'

    /** Position _altitudeHae. */
    public _altitudeHae?: 'altitudeHae'

    /** Position _altitudeGeoidalSeparation. */
    public _altitudeGeoidalSeparation?: 'altitudeGeoidalSeparation'

    /** Position _groundSpeed. */
    public _groundSpeed?: 'groundSpeed'

    /** Position _groundTrack. */
    public _groundTrack?: 'groundTrack'

    /**
     * Encodes the specified Position message. Does not implicitly {@link meshtastic.Position.verify|verify} messages.
     * @param message Position message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IPosition, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Position message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Position
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Position
  }

  namespace Position {
    /** How the location was acquired: manual, onboard GPS, external (EUD) GPS */
    enum LocSource {
      LOC_UNSET = 0,
      LOC_MANUAL = 1,
      LOC_INTERNAL = 2,
      LOC_EXTERNAL = 3,
    }

    /**
     * How the altitude was acquired: manual, GPS int/ext, etc
     * Default: same as location_source if present
     */
    enum AltSource {
      ALT_UNSET = 0,
      ALT_MANUAL = 1,
      ALT_INTERNAL = 2,
      ALT_EXTERNAL = 3,
      ALT_BAROMETRIC = 4,
    }
  }

  /**
   * Note: these enum names must EXACTLY match the string used in the device
   * bin/build-all.sh script.
   * Because they will be used to find firmware filenames in the android app for OTA updates.
   * To match the old style filenames, _ is converted to -, p is converted to .
   */
  enum HardwareModel {
    UNSET = 0,
    TLORA_V2 = 1,
    TLORA_V1 = 2,
    TLORA_V2_1_1P6 = 3,
    TBEAM = 4,
    HELTEC_V2_0 = 5,
    TBEAM_V0P7 = 6,
    T_ECHO = 7,
    TLORA_V1_1P3 = 8,
    RAK4631 = 9,
    HELTEC_V2_1 = 10,
    HELTEC_V1 = 11,
    LILYGO_TBEAM_S3_CORE = 12,
    RAK11200 = 13,
    NANO_G1 = 14,
    TLORA_V2_1_1P8 = 15,
    TLORA_T3_S3 = 16,
    NANO_G1_EXPLORER = 17,
    NANO_G2_ULTRA = 18,
    LORA_TYPE = 19,
    WIPHONE = 20,
    WIO_WM1110 = 21,
    RAK2560 = 22,
    HELTEC_HRU_3601 = 23,
    HELTEC_WIRELESS_BRIDGE = 24,
    STATION_G1 = 25,
    RAK11310 = 26,
    SENSELORA_RP2040 = 27,
    SENSELORA_S3 = 28,
    CANARYONE = 29,
    RP2040_LORA = 30,
    STATION_G2 = 31,
    LORA_RELAY_V1 = 32,
    NRF52840DK = 33,
    PPR = 34,
    GENIEBLOCKS = 35,
    NRF52_UNKNOWN = 36,
    PORTDUINO = 37,
    ANDROID_SIM = 38,
    DIY_V1 = 39,
    NRF52840_PCA10059 = 40,
    DR_DEV = 41,
    M5STACK = 42,
    HELTEC_V3 = 43,
    HELTEC_WSL_V3 = 44,
    BETAFPV_2400_TX = 45,
    BETAFPV_900_NANO_TX = 46,
    RPI_PICO = 47,
    HELTEC_WIRELESS_TRACKER = 48,
    HELTEC_WIRELESS_PAPER = 49,
    T_DECK = 50,
    T_WATCH_S3 = 51,
    PICOMPUTER_S3 = 52,
    HELTEC_HT62 = 53,
    EBYTE_ESP32_S3 = 54,
    ESP32_S3_PICO = 55,
    CHATTER_2 = 56,
    HELTEC_WIRELESS_PAPER_V1_0 = 57,
    HELTEC_WIRELESS_TRACKER_V1_0 = 58,
    UNPHONE = 59,
    TD_LORAC = 60,
    CDEBYTE_EORA_S3 = 61,
    TWC_MESH_V4 = 62,
    NRF52_PROMICRO_DIY = 63,
    RADIOMASTER_900_BANDIT_NANO = 64,
    HELTEC_CAPSULE_SENSOR_V3 = 65,
    HELTEC_VISION_MASTER_T190 = 66,
    HELTEC_VISION_MASTER_E213 = 67,
    HELTEC_VISION_MASTER_E290 = 68,
    HELTEC_MESH_NODE_T114 = 69,
    SENSECAP_INDICATOR = 70,
    TRACKER_T1000_E = 71,
    RAK3172 = 72,
    WIO_E5 = 73,
    RADIOMASTER_900_BANDIT = 74,
    ME25LS01_4Y10TD = 75,
    RP2040_FEATHER_RFM95 = 76,
    M5STACK_COREBASIC = 77,
    M5STACK_CORE2 = 78,
    RPI_PICO2 = 79,
    M5STACK_CORES3 = 80,
    SEEED_XIAO_S3 = 81,
    MS24SF1 = 82,
    TLORA_C6 = 83,
    WISMESH_TAP = 84,
    ROUTASTIC = 85,
    MESH_TAB = 86,
    MESHLINK = 87,
    XIAO_NRF52_KIT = 88,
    THINKNODE_M1 = 89,
    THINKNODE_M2 = 90,
    T_ETH_ELITE = 91,
    HELTEC_SENSOR_HUB = 92,
    RESERVED_FRIED_CHICKEN = 93,
    HELTEC_MESH_POCKET = 94,
    SEEED_SOLAR_NODE = 95,
    NOMADSTAR_METEOR_PRO = 96,
    CROWPANEL = 97,
    LINK_32 = 98,
    SEEED_WIO_TRACKER_L1 = 99,
    SEEED_WIO_TRACKER_L1_EINK = 100,
    MUZI_R1_NEO = 101,
    T_DECK_PRO = 102,
    T_LORA_PAGER = 103,
    M5STACK_RESERVED = 104,
    WISMESH_TAG = 105,
    RAK3312 = 106,
    THINKNODE_M5 = 107,
    HELTEC_MESH_SOLAR = 108,
    T_ECHO_LITE = 109,
    HELTEC_V4 = 110,
    M5STACK_C6L = 111,
    M5STACK_CARDPUTER_ADV = 112,
    HELTEC_WIRELESS_TRACKER_V2 = 113,
    T_WATCH_ULTRA = 114,
    PRIVATE_HW = 255,
  }

  /** Properties of a User. */
  interface IUser {
    /**
     * A globally unique ID string for this user.
     * In the case of Signal that would mean +16504442323, for the default macaddr derived id it would be !<8 hexidecimal bytes>.
     * Note: app developers are encouraged to also use the following standard
     * node IDs "^all" (for broadcast), "^local" (for the locally connected node)
     */
    id?: string | null

    /** A full name for this user, i.e. "Kevin Hester" */
    longName?: string | null

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     */
    shortName?: string | null

    /**
     * Deprecated in Meshtastic 2.1.x
     * This is the addr of the radio.
     * Not populated by the phone, but added by the esp32 when broadcasting
     */
    macaddr?: Uint8Array | null

    /**
     * TBEAM, HELTEC, etc...
     * Starting in 1.2.11 moved to hw_model enum in the NodeInfo object.
     * Apps will still need the string here for older builds
     * (so OTA update can find the right image), but if the enum is available it will be used instead.
     */
    hwModel?: meshtastic.HardwareModel | null

    /**
     * In some regions Ham radio operators have different bandwidth limitations than others.
     * If this user is a licensed operator, set this flag.
     * Also, "long_name" should be their licence number.
     */
    isLicensed?: boolean | null

    /** Indicates that the user's role in the mesh */
    role?: meshtastic.Config.DeviceConfig.Role | null

    /**
     * The public key of the user's device.
     * This is sent out to other nodes on the mesh to allow them to compute a shared secret key.
     */
    publicKey?: Uint8Array | null

    /** Whether or not the node can be messaged */
    isUnmessagable?: boolean | null
  }

  /**
   * Broadcast when a newly powered mesh node wants to find a node num it can use
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
   */
  class User implements IUser {
    /**
     * Constructs a new User.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IUser)

    /**
     * A globally unique ID string for this user.
     * In the case of Signal that would mean +16504442323, for the default macaddr derived id it would be !<8 hexidecimal bytes>.
     * Note: app developers are encouraged to also use the following standard
     * node IDs "^all" (for broadcast), "^local" (for the locally connected node)
     */
    public id: string

    /** A full name for this user, i.e. "Kevin Hester" */
    public longName: string

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     */
    public shortName: string

    /**
     * Deprecated in Meshtastic 2.1.x
     * This is the addr of the radio.
     * Not populated by the phone, but added by the esp32 when broadcasting
     */
    public macaddr: Uint8Array

    /**
     * TBEAM, HELTEC, etc...
     * Starting in 1.2.11 moved to hw_model enum in the NodeInfo object.
     * Apps will still need the string here for older builds
     * (so OTA update can find the right image), but if the enum is available it will be used instead.
     */
    public hwModel: meshtastic.HardwareModel

    /**
     * In some regions Ham radio operators have different bandwidth limitations than others.
     * If this user is a licensed operator, set this flag.
     * Also, "long_name" should be their licence number.
     */
    public isLicensed: boolean

    /** Indicates that the user's role in the mesh */
    public role: meshtastic.Config.DeviceConfig.Role

    /**
     * The public key of the user's device.
     * This is sent out to other nodes on the mesh to allow them to compute a shared secret key.
     */
    public publicKey: Uint8Array

    /** Whether or not the node can be messaged */
    public isUnmessagable?: boolean | null

    /** User _isUnmessagable. */
    public _isUnmessagable?: 'isUnmessagable'

    /**
     * Encodes the specified User message. Does not implicitly {@link meshtastic.User.verify|verify} messages.
     * @param message User message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IUser, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a User message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns User
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.User
  }

  /** Properties of a RouteDiscovery. */
  interface IRouteDiscovery {
    /** The list of nodenums this packet has visited so far to the destination. */
    route?: number[] | null

    /** The list of SNRs (in dB, scaled by 4) in the route towards the destination. */
    snrTowards?: number[] | null

    /** The list of nodenums the packet has visited on the way back from the destination. */
    routeBack?: number[] | null

    /** The list of SNRs (in dB, scaled by 4) in the route back from the destination. */
    snrBack?: number[] | null
  }

  /** A message used in a traceroute */
  class RouteDiscovery implements IRouteDiscovery {
    /**
     * Constructs a new RouteDiscovery.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IRouteDiscovery)

    /** The list of nodenums this packet has visited so far to the destination. */
    public route: number[]

    /** The list of SNRs (in dB, scaled by 4) in the route towards the destination. */
    public snrTowards: number[]

    /** The list of nodenums the packet has visited on the way back from the destination. */
    public routeBack: number[]

    /** The list of SNRs (in dB, scaled by 4) in the route back from the destination. */
    public snrBack: number[]

    /**
     * Encodes the specified RouteDiscovery message. Does not implicitly {@link meshtastic.RouteDiscovery.verify|verify} messages.
     * @param message RouteDiscovery message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IRouteDiscovery, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a RouteDiscovery message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RouteDiscovery
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.RouteDiscovery
  }

  /** Properties of a Routing. */
  interface IRouting {
    /** A route request going from the requester */
    routeRequest?: meshtastic.IRouteDiscovery | null

    /** A route reply */
    routeReply?: meshtastic.IRouteDiscovery | null

    /**
     * A failure in delivering a message (usually used for routing control messages, but might be provided
     * in addition to ack.fail_id to provide details on the type of failure).
     */
    errorReason?: meshtastic.Routing.Error | null
  }

  /** A Routing control Data packet handled by the routing module */
  class Routing implements IRouting {
    /**
     * Constructs a new Routing.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IRouting)

    /** A route request going from the requester */
    public routeRequest?: meshtastic.IRouteDiscovery | null

    /** A route reply */
    public routeReply?: meshtastic.IRouteDiscovery | null

    /**
     * A failure in delivering a message (usually used for routing control messages, but might be provided
     * in addition to ack.fail_id to provide details on the type of failure).
     */
    public errorReason?: meshtastic.Routing.Error | null

    /** Routing variant. */
    public variant?: 'routeRequest' | 'routeReply' | 'errorReason'

    /**
     * Encodes the specified Routing message. Does not implicitly {@link meshtastic.Routing.verify|verify} messages.
     * @param message Routing message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IRouting, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Routing message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Routing
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Routing
  }

  namespace Routing {
    /**
     * A failure in delivering a message (usually used for routing control messages, but might be provided in addition to ack.fail_id to provide
     * details on the type of failure).
     */
    enum Error {
      NONE = 0,
      NO_ROUTE = 1,
      GOT_NAK = 2,
      TIMEOUT = 3,
      NO_INTERFACE = 4,
      MAX_RETRANSMIT = 5,
      NO_CHANNEL = 6,
      TOO_LARGE = 7,
      NO_RESPONSE = 8,
      DUTY_CYCLE_LIMIT = 9,
      BAD_REQUEST = 32,
      NOT_AUTHORIZED = 33,
      PKI_FAILED = 34,
      PKI_UNKNOWN_PUBKEY = 35,
      ADMIN_BAD_SESSION_KEY = 36,
      ADMIN_PUBLIC_KEY_UNAUTHORIZED = 37,
      RATE_LIMIT_EXCEEDED = 38,
    }
  }

  /** Properties of a Data. */
  interface IData {
    /** Formerly named typ and of type Type */
    portnum?: meshtastic.PortNum | null

    /** TODO: REPLACE */
    payload?: Uint8Array | null

    /**
     * Not normally used, but for testing a sender can request that recipient
     * responds in kind (i.e. if it received a position, it should unicast back it's position).
     * Note: that if you set this on a broadcast you will receive many replies.
     */
    wantResponse?: boolean | null

    /**
     * The address of the destination node.
     * This field is is filled in by the mesh radio device software, application
     * layer software should never need it.
     * RouteDiscovery messages _must_ populate this.
     * Other message types might need to if they are doing multihop routing.
     */
    dest?: number | null

    /**
     * The address of the original sender for this message.
     * This field should _only_ be populated for reliable multihop packets (to keep
     * packets small).
     */
    source?: number | null

    /**
     * Only used in routing or response messages.
     * Indicates the original message ID that this message is reporting failure on. (formerly called original_id)
     */
    requestId?: number | null

    /** If set, this message is intened to be a reply to a previously sent message with the defined id. */
    replyId?: number | null

    /**
     * Defaults to false. If true, then what is in the payload should be treated as an emoji like giving
     * a message a heart or poop emoji.
     */
    emoji?: number | null

    /** Bitfield for extra flags. First use is to indicate that user approves the packet being uploaded to MQTT. */
    bitfield?: number | null
  }

  /**
   * (Formerly called SubPacket)
   * The payload portion fo a packet, this is the actual bytes that are sent
   * inside a radio packet (because from/to are broken out by the comms library)
   */
  class Data implements IData {
    /**
     * Constructs a new Data.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IData)

    /** Formerly named typ and of type Type */
    public portnum: meshtastic.PortNum

    /** TODO: REPLACE */
    public payload: Uint8Array

    /**
     * Not normally used, but for testing a sender can request that recipient
     * responds in kind (i.e. if it received a position, it should unicast back it's position).
     * Note: that if you set this on a broadcast you will receive many replies.
     */
    public wantResponse: boolean

    /**
     * The address of the destination node.
     * This field is is filled in by the mesh radio device software, application
     * layer software should never need it.
     * RouteDiscovery messages _must_ populate this.
     * Other message types might need to if they are doing multihop routing.
     */
    public dest: number

    /**
     * The address of the original sender for this message.
     * This field should _only_ be populated for reliable multihop packets (to keep
     * packets small).
     */
    public source: number

    /**
     * Only used in routing or response messages.
     * Indicates the original message ID that this message is reporting failure on. (formerly called original_id)
     */
    public requestId: number

    /** If set, this message is intened to be a reply to a previously sent message with the defined id. */
    public replyId: number

    /**
     * Defaults to false. If true, then what is in the payload should be treated as an emoji like giving
     * a message a heart or poop emoji.
     */
    public emoji: number

    /** Bitfield for extra flags. First use is to indicate that user approves the packet being uploaded to MQTT. */
    public bitfield?: number | null

    /** Data _bitfield. */
    public _bitfield?: 'bitfield'

    /**
     * Encodes the specified Data message. Does not implicitly {@link meshtastic.Data.verify|verify} messages.
     * @param message Data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IData, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Data
  }

  /** Properties of a KeyVerification. */
  interface IKeyVerification {
    /** random value Selected by the requesting node */
    nonce?: number | Long | null

    /** The final authoritative hash, only to be sent by NodeA at the end of the handshake */
    hash1?: Uint8Array | null

    /**
     * The intermediary hash (actually derived from hash1),
     * sent from NodeB to NodeA in response to the initial message.
     */
    hash2?: Uint8Array | null
  }

  /** The actual over-the-mesh message doing KeyVerification */
  class KeyVerification implements IKeyVerification {
    /**
     * Constructs a new KeyVerification.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IKeyVerification)

    /** random value Selected by the requesting node */
    public nonce: number | Long

    /** The final authoritative hash, only to be sent by NodeA at the end of the handshake */
    public hash1: Uint8Array

    /**
     * The intermediary hash (actually derived from hash1),
     * sent from NodeB to NodeA in response to the initial message.
     */
    public hash2: Uint8Array

    /**
     * Encodes the specified KeyVerification message. Does not implicitly {@link meshtastic.KeyVerification.verify|verify} messages.
     * @param message KeyVerification message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IKeyVerification, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a KeyVerification message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KeyVerification
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.KeyVerification
  }

  /** Properties of a Waypoint. */
  interface IWaypoint {
    /** Id of the waypoint */
    id?: number | null

    /** latitude_i */
    latitudeI?: number | null

    /** longitude_i */
    longitudeI?: number | null

    /** Time the waypoint is to expire (epoch) */
    expire?: number | null

    /**
     * If greater than zero, treat the value as a nodenum only allowing them to update the waypoint.
     * If zero, the waypoint is open to be edited by any member of the mesh.
     */
    lockedTo?: number | null

    /** Name of the waypoint - max 30 chars */
    name?: string | null

    /** Description of the waypoint - max 100 chars */
    description?: string | null

    /** Designator icon for the waypoint in the form of a unicode emoji */
    icon?: number | null
  }

  /** Waypoint message, used to share arbitrary locations across the mesh */
  class Waypoint implements IWaypoint {
    /**
     * Constructs a new Waypoint.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IWaypoint)

    /** Id of the waypoint */
    public id: number

    /** latitude_i */
    public latitudeI?: number | null

    /** longitude_i */
    public longitudeI?: number | null

    /** Time the waypoint is to expire (epoch) */
    public expire: number

    /**
     * If greater than zero, treat the value as a nodenum only allowing them to update the waypoint.
     * If zero, the waypoint is open to be edited by any member of the mesh.
     */
    public lockedTo: number

    /** Name of the waypoint - max 30 chars */
    public name: string

    /** Description of the waypoint - max 100 chars */
    public description: string

    /** Designator icon for the waypoint in the form of a unicode emoji */
    public icon: number

    /** Waypoint _latitudeI. */
    public _latitudeI?: 'latitudeI'

    /** Waypoint _longitudeI. */
    public _longitudeI?: 'longitudeI'

    /**
     * Encodes the specified Waypoint message. Does not implicitly {@link meshtastic.Waypoint.verify|verify} messages.
     * @param message Waypoint message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IWaypoint, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Waypoint message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Waypoint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Waypoint
  }

  /** Properties of a MqttClientProxyMessage. */
  interface IMqttClientProxyMessage {
    /** The MQTT topic this message will be sent /received on */
    topic?: string | null

    /** Bytes */
    data?: Uint8Array | null

    /** Text */
    text?: string | null

    /** Whether the message should be retained (or not) */
    retained?: boolean | null
  }

  /** This message will be proxied over the PhoneAPI for the client to deliver to the MQTT server */
  class MqttClientProxyMessage implements IMqttClientProxyMessage {
    /**
     * Constructs a new MqttClientProxyMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IMqttClientProxyMessage)

    /** The MQTT topic this message will be sent /received on */
    public topic: string

    /** Bytes */
    public data?: Uint8Array | null

    /** Text */
    public text?: string | null

    /** Whether the message should be retained (or not) */
    public retained: boolean

    /** The actual service envelope payload or text for mqtt pub / sub */
    public payloadVariant?: 'data' | 'text'

    /**
     * Encodes the specified MqttClientProxyMessage message. Does not implicitly {@link meshtastic.MqttClientProxyMessage.verify|verify} messages.
     * @param message MqttClientProxyMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IMqttClientProxyMessage, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a MqttClientProxyMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MqttClientProxyMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.MqttClientProxyMessage
  }

  /** Properties of a MeshPacket. */
  interface IMeshPacket {
    /**
     * The sending node number.
     * Note: Our crypto implementation uses this field as well.
     * See [crypto](/docs/overview/encryption) for details.
     */
    from?: number | null

    /** The (immediate) destination for this packet */
    to?: number | null

    /**
     * (Usually) If set, this indicates the index in the secondary_channels table that this packet was sent/received on.
     * If unset, packet was on the primary channel.
     * A particular node might know only a subset of channels in use on the mesh.
     * Therefore channel_index is inherently a local concept and meaningless to send between nodes.
     * Very briefly, while sending and receiving deep inside the device Router code, this field instead
     * contains the 'channel hash' instead of the index.
     * This 'trick' is only used while the payload_variant is an 'encrypted'.
     */
    channel?: number | null

    /** TODO: REPLACE */
    decoded?: meshtastic.IData | null

    /** TODO: REPLACE */
    encrypted?: Uint8Array | null

    /**
     * A unique ID for this packet.
     * Always 0 for no-ack packets or non broadcast packets (and therefore take zero bytes of space).
     * Otherwise a unique ID for this packet, useful for flooding algorithms.
     * ID only needs to be unique on a _per sender_ basis, and it only
     * needs to be unique for a few minutes (long enough to last for the length of
     * any ACK or the completion of a mesh broadcast flood).
     * Note: Our crypto implementation uses this id as well.
     * See [crypto](/docs/overview/encryption) for details.
     */
    id?: number | null

    /**
     * The time this message was received by the esp32 (secs since 1970).
     * Note: this field is _never_ sent on the radio link itself (to save space) Times
     * are typically not sent over the mesh, but they will be added to any Packet
     * (chain of SubPacket) sent to the phone (so the phone can know exact time of reception)
     */
    rxTime?: number | null

    /**
     * Never* sent over the radio links.
     * Set during reception to indicate the SNR of this packet.
     * Used to collect statistics on current link quality.
     */
    rxSnr?: number | null

    /**
     * If unset treated as zero (no forwarding, send to direct neighbor nodes only)
     * if 1, allow hopping through one node, etc...
     * For our usecase real world topologies probably have a max of about 3.
     * This field is normally placed into a few of bits in the header.
     */
    hopLimit?: number | null

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
     */
    wantAck?: boolean | null

    /**
     * The priority of this message for sending.
     * See MeshPacket.Priority description for more details.
     */
    priority?: meshtastic.MeshPacket.Priority | null

    /** rssi of received packet. Only sent to phone for dispay purposes. */
    rxRssi?: number | null

    /** Describe if this message is delayed */
    delayed?: meshtastic.MeshPacket.Delayed | null

    /** Describes whether this packet passed via MQTT somewhere along the path it currently took. */
    viaMqtt?: boolean | null

    /**
     * Hop limit with which the original packet started. Sent via LoRa using three bits in the unencrypted header.
     * When receiving a packet, the difference between hop_start and hop_limit gives how many hops it traveled.
     */
    hopStart?: number | null

    /** Records the public key the packet was encrypted with, if applicable. */
    publicKey?: Uint8Array | null

    /** Indicates whether the packet was en/decrypted using PKI */
    pkiEncrypted?: boolean | null

    /**
     * Last byte of the node number of the node that should be used as the next hop in routing.
     * Set by the firmware internally, clients are not supposed to set this.
     */
    nextHop?: number | null

    /**
     * Last byte of the node number of the node that will relay/relayed this packet.
     * Set by the firmware internally, clients are not supposed to set this.
     */
    relayNode?: number | null

    /**
     * Never* sent over the radio links.
     * Timestamp after which this packet may be sent.
     * Set by the firmware internally, clients are not supposed to set this.
     */
    txAfter?: number | null

    /** Indicates which transport mechanism this packet arrived over */
    transportMechanism?: meshtastic.MeshPacket.TransportMechanism | null
  }

  /**
   * A packet envelope sent/received over the mesh
   * only payload_variant is sent in the payload portion of the LORA packet.
   * The other fields are either not sent at all, or sent in the special 16 byte LORA header.
   */
  class MeshPacket implements IMeshPacket {
    /**
     * Constructs a new MeshPacket.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IMeshPacket)

    /**
     * The sending node number.
     * Note: Our crypto implementation uses this field as well.
     * See [crypto](/docs/overview/encryption) for details.
     */
    public from: number

    /** The (immediate) destination for this packet */
    public to: number

    /**
     * (Usually) If set, this indicates the index in the secondary_channels table that this packet was sent/received on.
     * If unset, packet was on the primary channel.
     * A particular node might know only a subset of channels in use on the mesh.
     * Therefore channel_index is inherently a local concept and meaningless to send between nodes.
     * Very briefly, while sending and receiving deep inside the device Router code, this field instead
     * contains the 'channel hash' instead of the index.
     * This 'trick' is only used while the payload_variant is an 'encrypted'.
     */
    public channel: number

    /** TODO: REPLACE */
    public decoded?: meshtastic.IData | null

    /** TODO: REPLACE */
    public encrypted?: Uint8Array | null

    /**
     * A unique ID for this packet.
     * Always 0 for no-ack packets or non broadcast packets (and therefore take zero bytes of space).
     * Otherwise a unique ID for this packet, useful for flooding algorithms.
     * ID only needs to be unique on a _per sender_ basis, and it only
     * needs to be unique for a few minutes (long enough to last for the length of
     * any ACK or the completion of a mesh broadcast flood).
     * Note: Our crypto implementation uses this id as well.
     * See [crypto](/docs/overview/encryption) for details.
     */
    public id: number

    /**
     * The time this message was received by the esp32 (secs since 1970).
     * Note: this field is _never_ sent on the radio link itself (to save space) Times
     * are typically not sent over the mesh, but they will be added to any Packet
     * (chain of SubPacket) sent to the phone (so the phone can know exact time of reception)
     */
    public rxTime: number

    /**
     * *Never* sent over the radio links.
     * Set during reception to indicate the SNR of this packet.
     * Used to collect statistics on current link quality.
     */
    public rxSnr: number

    /**
     * If unset treated as zero (no forwarding, send to direct neighbor nodes only)
     * if 1, allow hopping through one node, etc...
     * For our usecase real world topologies probably have a max of about 3.
     * This field is normally placed into a few of bits in the header.
     */
    public hopLimit: number

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
     */
    public wantAck: boolean

    /**
     * The priority of this message for sending.
     * See MeshPacket.Priority description for more details.
     */
    public priority: meshtastic.MeshPacket.Priority

    /** rssi of received packet. Only sent to phone for dispay purposes. */
    public rxRssi: number

    /** Describe if this message is delayed */
    public delayed: meshtastic.MeshPacket.Delayed

    /** Describes whether this packet passed via MQTT somewhere along the path it currently took. */
    public viaMqtt: boolean

    /**
     * Hop limit with which the original packet started. Sent via LoRa using three bits in the unencrypted header.
     * When receiving a packet, the difference between hop_start and hop_limit gives how many hops it traveled.
     */
    public hopStart: number

    /** Records the public key the packet was encrypted with, if applicable. */
    public publicKey: Uint8Array

    /** Indicates whether the packet was en/decrypted using PKI */
    public pkiEncrypted: boolean

    /**
     * Last byte of the node number of the node that should be used as the next hop in routing.
     * Set by the firmware internally, clients are not supposed to set this.
     */
    public nextHop: number

    /**
     * Last byte of the node number of the node that will relay/relayed this packet.
     * Set by the firmware internally, clients are not supposed to set this.
     */
    public relayNode: number

    /**
     * *Never* sent over the radio links.
     * Timestamp after which this packet may be sent.
     * Set by the firmware internally, clients are not supposed to set this.
     */
    public txAfter: number

    /** Indicates which transport mechanism this packet arrived over */
    public transportMechanism: meshtastic.MeshPacket.TransportMechanism

    /** MeshPacket payloadVariant. */
    public payloadVariant?: 'decoded' | 'encrypted'

    /**
     * Encodes the specified MeshPacket message. Does not implicitly {@link meshtastic.MeshPacket.verify|verify} messages.
     * @param message MeshPacket message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IMeshPacket, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a MeshPacket message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MeshPacket
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.MeshPacket
  }

  namespace MeshPacket {
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
     */
    enum Priority {
      UNSET = 0,
      MIN = 1,
      BACKGROUND = 10,
      DEFAULT = 64,
      RELIABLE = 70,
      RESPONSE = 80,
      HIGH = 100,
      ALERT = 110,
      ACK = 120,
      MAX = 127,
    }

    /** Identify if this is a delayed packet */
    enum Delayed {
      NO_DELAY = 0,
      DELAYED_BROADCAST = 1,
      DELAYED_DIRECT = 2,
    }

    /** Enum to identify which transport mechanism this packet arrived over */
    enum TransportMechanism {
      TRANSPORT_INTERNAL = 0,
      TRANSPORT_LORA = 1,
      TRANSPORT_LORA_ALT1 = 2,
      TRANSPORT_LORA_ALT2 = 3,
      TRANSPORT_LORA_ALT3 = 4,
      TRANSPORT_MQTT = 5,
      TRANSPORT_MULTICAST_UDP = 6,
      TRANSPORT_API = 7,
    }
  }

  /** Shared constants between device and phone */
  enum Constants {
    ZERO = 0,
    DATA_PAYLOAD_LEN = 233,
  }

  /** Properties of a NodeInfo. */
  interface INodeInfo {
    /** The node number */
    num?: number | null

    /** The user info for this node */
    user?: meshtastic.IUser | null

    /**
     * This position data. Note: before 1.2.14 we would also store the last time we've heard from this node in position.time, that is no longer true.
     * Position.time now indicates the last time we received a POSITION from that node.
     */
    position?: meshtastic.IPosition | null

    /**
     * Returns the Signal-to-noise ratio (SNR) of the last received message,
     * as measured by the receiver. Return SNR of the last received message in dB
     */
    snr?: number | null

    /** Set to indicate the last time we received a packet from this node */
    lastHeard?: number | null

    /** The latest device metrics for the node. */
    deviceMetrics?: meshtastic.IDeviceMetrics | null

    /** local channel index we heard that node on. Only populated if its not the default channel. */
    channel?: number | null

    /** True if we witnessed the node over MQTT instead of LoRA transport */
    viaMqtt?: boolean | null

    /** Number of hops away from us this node is (0 if direct neighbor) */
    hopsAway?: number | null

    /**
     * True if node is in our favorites list
     * Persists between NodeDB internal clean ups
     */
    isFavorite?: boolean | null

    /**
     * True if node is in our ignored list
     * Persists between NodeDB internal clean ups
     */
    isIgnored?: boolean | null

    /**
     * True if node public key has been verified.
     * Persists between NodeDB internal clean ups
     * LSB 0 of the bitfield
     */
    isKeyManuallyVerified?: boolean | null
  }

  /**
   * The bluetooth to device link:
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
   */
  class NodeInfo implements INodeInfo {
    /**
     * Constructs a new NodeInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.INodeInfo)

    /** The node number */
    public num: number

    /** The user info for this node */
    public user?: meshtastic.IUser | null

    /**
     * This position data. Note: before 1.2.14 we would also store the last time we've heard from this node in position.time, that is no longer true.
     * Position.time now indicates the last time we received a POSITION from that node.
     */
    public position?: meshtastic.IPosition | null

    /**
     * Returns the Signal-to-noise ratio (SNR) of the last received message,
     * as measured by the receiver. Return SNR of the last received message in dB
     */
    public snr: number

    /** Set to indicate the last time we received a packet from this node */
    public lastHeard: number

    /** The latest device metrics for the node. */
    public deviceMetrics?: meshtastic.IDeviceMetrics | null

    /** local channel index we heard that node on. Only populated if its not the default channel. */
    public channel: number

    /** True if we witnessed the node over MQTT instead of LoRA transport */
    public viaMqtt: boolean

    /** Number of hops away from us this node is (0 if direct neighbor) */
    public hopsAway?: number | null

    /**
     * True if node is in our favorites list
     * Persists between NodeDB internal clean ups
     */
    public isFavorite: boolean

    /**
     * True if node is in our ignored list
     * Persists between NodeDB internal clean ups
     */
    public isIgnored: boolean

    /**
     * True if node public key has been verified.
     * Persists between NodeDB internal clean ups
     * LSB 0 of the bitfield
     */
    public isKeyManuallyVerified: boolean

    /** NodeInfo _hopsAway. */
    public _hopsAway?: 'hopsAway'

    /**
     * Encodes the specified NodeInfo message. Does not implicitly {@link meshtastic.NodeInfo.verify|verify} messages.
     * @param message NodeInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.INodeInfo, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a NodeInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NodeInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.NodeInfo
  }

  /**
   * Error codes for critical errors
   * The device might report these fault codes on the screen.
   * If you encounter a fault code, please post on the meshtastic.discourse.group
   * and we'll try to help.
   */
  enum CriticalErrorCode {
    NONE = 0,
    TX_WATCHDOG = 1,
    SLEEP_ENTER_WAIT = 2,
    NO_RADIO = 3,
    UNSPECIFIED = 4,
    UBLOX_UNIT_FAILED = 5,
    NO_AXP192 = 6,
    INVALID_RADIO_SETTING = 7,
    TRANSMIT_FAILED = 8,
    BROWNOUT = 9,
    SX1262_FAILURE = 10,
    RADIO_SPI_BUG = 11,
    FLASH_CORRUPTION_RECOVERABLE = 12,
    FLASH_CORRUPTION_UNRECOVERABLE = 13,
  }

  /**
   * Enum to indicate to clients whether this firmware is a special firmware build, like an event.
   * The first 16 values are reserved for non-event special firmwares, like the Smart Citizen use case.
   */
  enum FirmwareEdition {
    VANILLA = 0,
    SMART_CITIZEN = 1,
    OPEN_SAUCE = 16,
    DEFCON = 17,
    BURNING_MAN = 18,
    HAMVENTION = 19,
    DIY_EDITION = 127,
  }

  /** Properties of a MyNodeInfo. */
  interface IMyNodeInfo {
    /**
     * Tells the phone what our node number is, default starting value is
     * lowbyte of macaddr, but it will be fixed if that is already in use
     */
    myNodeNum?: number | null

    /**
     * The total number of reboots this node has ever encountered
     * (well - since the last time we discarded preferences)
     */
    rebootCount?: number | null

    /**
     * The minimum app version that can talk to this device.
     * Phone/PC apps should compare this to their build number and if too low tell the user they must update their app
     */
    minAppVersion?: number | null

    /** Unique hardware identifier for this device */
    deviceId?: Uint8Array | null

    /** The PlatformIO environment used to build this firmware */
    pioEnv?: string | null

    /** The indicator for whether this device is running event firmware and which */
    firmwareEdition?: meshtastic.FirmwareEdition | null

    /**
     * The number of nodes in the nodedb.
     * This is used by the phone to know how many NodeInfo packets to expect on want_config
     */
    nodedbCount?: number | null
  }

  /**
   * Unique local debugging info for this node
   * Note: we don't include position or the user info, because that will come in the
   * Sent to the phone in response to WantNodes.
   */
  class MyNodeInfo implements IMyNodeInfo {
    /**
     * Constructs a new MyNodeInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IMyNodeInfo)

    /**
     * Tells the phone what our node number is, default starting value is
     * lowbyte of macaddr, but it will be fixed if that is already in use
     */
    public myNodeNum: number

    /**
     * The total number of reboots this node has ever encountered
     * (well - since the last time we discarded preferences)
     */
    public rebootCount: number

    /**
     * The minimum app version that can talk to this device.
     * Phone/PC apps should compare this to their build number and if too low tell the user they must update their app
     */
    public minAppVersion: number

    /** Unique hardware identifier for this device */
    public deviceId: Uint8Array

    /** The PlatformIO environment used to build this firmware */
    public pioEnv: string

    /** The indicator for whether this device is running event firmware and which */
    public firmwareEdition: meshtastic.FirmwareEdition

    /**
     * The number of nodes in the nodedb.
     * This is used by the phone to know how many NodeInfo packets to expect on want_config
     */
    public nodedbCount: number

    /**
     * Encodes the specified MyNodeInfo message. Does not implicitly {@link meshtastic.MyNodeInfo.verify|verify} messages.
     * @param message MyNodeInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IMyNodeInfo, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a MyNodeInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MyNodeInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.MyNodeInfo
  }

  /** Properties of a LogRecord. */
  interface ILogRecord {
    /** Log levels, chosen to match python logging conventions. */
    message?: string | null

    /** Seconds since 1970 - or 0 for unknown/unset */
    time?: number | null

    /** Usually based on thread name - if known */
    source?: string | null

    /** Not yet set */
    level?: meshtastic.LogRecord.Level | null
  }

  /**
   * Debug output from the device.
   * To minimize the size of records inside the device code, if a time/source/level is not set
   * on the message it is assumed to be a continuation of the previously sent message.
   * This allows the device code to use fixed maxlen 64 byte strings for messages,
   * and then extend as needed by emitting multiple records.
   */
  class LogRecord implements ILogRecord {
    /**
     * Constructs a new LogRecord.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.ILogRecord)

    /** Log levels, chosen to match python logging conventions. */
    public message: string

    /** Seconds since 1970 - or 0 for unknown/unset */
    public time: number

    /** Usually based on thread name - if known */
    public source: string

    /** Not yet set */
    public level: meshtastic.LogRecord.Level

    /**
     * Encodes the specified LogRecord message. Does not implicitly {@link meshtastic.LogRecord.verify|verify} messages.
     * @param message LogRecord message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.ILogRecord, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a LogRecord message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LogRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.LogRecord
  }

  namespace LogRecord {
    /** Log levels, chosen to match python logging conventions. */
    enum Level {
      UNSET = 0,
      CRITICAL = 50,
      ERROR = 40,
      WARNING = 30,
      INFO = 20,
      DEBUG = 10,
      TRACE = 5,
    }
  }

  /** Properties of a QueueStatus. */
  interface IQueueStatus {
    /** Last attempt to queue status, ErrorCode */
    res?: number | null

    /** Free entries in the outgoing queue */
    free?: number | null

    /** Maximum entries in the outgoing queue */
    maxlen?: number | null

    /** What was mesh packet id that generated this response? */
    meshPacketId?: number | null
  }

  /** Represents a QueueStatus. */
  class QueueStatus implements IQueueStatus {
    /**
     * Constructs a new QueueStatus.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IQueueStatus)

    /** Last attempt to queue status, ErrorCode */
    public res: number

    /** Free entries in the outgoing queue */
    public free: number

    /** Maximum entries in the outgoing queue */
    public maxlen: number

    /** What was mesh packet id that generated this response? */
    public meshPacketId: number

    /**
     * Encodes the specified QueueStatus message. Does not implicitly {@link meshtastic.QueueStatus.verify|verify} messages.
     * @param message QueueStatus message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IQueueStatus, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a QueueStatus message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns QueueStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.QueueStatus
  }

  /** Properties of a FromRadio. */
  interface IFromRadio {
    /**
     * The packet id, used to allow the phone to request missing read packets from the FIFO,
     * see our bluetooth docs
     */
    id?: number | null

    /** Log levels, chosen to match python logging conventions. */
    packet?: meshtastic.IMeshPacket | null

    /**
     * Tells the phone what our node number is, can be -1 if we've not yet joined a mesh.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     */
    myInfo?: meshtastic.IMyNodeInfo | null

    /**
     * One packet is sent for each node in the on radio DB
     * starts over with the first node in our DB
     */
    nodeInfo?: meshtastic.INodeInfo | null

    /** Include a part of the config (was: RadioConfig radio) */
    config?: meshtastic.IConfig | null

    /** Set to send debug console output over our protobuf stream */
    logRecord?: meshtastic.ILogRecord | null

    /**
     * Sent as true once the device has finished sending all of the responses to want_config
     * recipient should check if this ID matches our original request nonce, if
     * not, it means your config responses haven't started yet.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     */
    configCompleteId?: number | null

    /**
     * Sent to tell clients the radio has just rebooted.
     * Set to true if present.
     * Not used on all transports, currently just used for the serial console.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     */
    rebooted?: boolean | null

    /** Include module config */
    moduleConfig?: meshtastic.IModuleConfig | null

    /** One packet is sent for each channel */
    channel?: meshtastic.IChannel | null

    /** Queue status info */
    queueStatus?: meshtastic.IQueueStatus | null

    /** File Transfer Chunk */
    xmodemPacket?: meshtastic.IXModem | null

    /** Device metadata message */
    metadata?: meshtastic.IDeviceMetadata | null

    /** MQTT Client Proxy Message (device sending to client / phone for publishing to MQTT) */
    mqttClientProxyMessage?: meshtastic.IMqttClientProxyMessage | null

    /** File system manifest messages */
    fileInfo?: meshtastic.IFileInfo | null

    /** Notification message to the client */
    clientNotification?: meshtastic.IClientNotification | null

    /** Persistent data for device-ui */
    deviceuiConfig?: meshtastic.IDeviceUIConfig | null
  }

  /**
   * Packets from the radio to the phone will appear on the fromRadio characteristic.
   * It will support READ and NOTIFY. When a new packet arrives the device will BLE notify?
   * It will sit in that descriptor until consumed by the phone,
   * at which point the next item in the FIFO will be populated.
   */
  class FromRadio implements IFromRadio {
    /**
     * Constructs a new FromRadio.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IFromRadio)

    /**
     * The packet id, used to allow the phone to request missing read packets from the FIFO,
     * see our bluetooth docs
     */
    public id: number

    /** Log levels, chosen to match python logging conventions. */
    public packet?: meshtastic.IMeshPacket | null

    /**
     * Tells the phone what our node number is, can be -1 if we've not yet joined a mesh.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     */
    public myInfo?: meshtastic.IMyNodeInfo | null

    /**
     * One packet is sent for each node in the on radio DB
     * starts over with the first node in our DB
     */
    public nodeInfo?: meshtastic.INodeInfo | null

    /** Include a part of the config (was: RadioConfig radio) */
    public config?: meshtastic.IConfig | null

    /** Set to send debug console output over our protobuf stream */
    public logRecord?: meshtastic.ILogRecord | null

    /**
     * Sent as true once the device has finished sending all of the responses to want_config
     * recipient should check if this ID matches our original request nonce, if
     * not, it means your config responses haven't started yet.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     */
    public configCompleteId?: number | null

    /**
     * Sent to tell clients the radio has just rebooted.
     * Set to true if present.
     * Not used on all transports, currently just used for the serial console.
     * NOTE: This ID must not change - to keep (minimal) compatibility with <1.2 version of android apps.
     */
    public rebooted?: boolean | null

    /** Include module config */
    public moduleConfig?: meshtastic.IModuleConfig | null

    /** One packet is sent for each channel */
    public channel?: meshtastic.IChannel | null

    /** Queue status info */
    public queueStatus?: meshtastic.IQueueStatus | null

    /** File Transfer Chunk */
    public xmodemPacket?: meshtastic.IXModem | null

    /** Device metadata message */
    public metadata?: meshtastic.IDeviceMetadata | null

    /** MQTT Client Proxy Message (device sending to client / phone for publishing to MQTT) */
    public mqttClientProxyMessage?: meshtastic.IMqttClientProxyMessage | null

    /** File system manifest messages */
    public fileInfo?: meshtastic.IFileInfo | null

    /** Notification message to the client */
    public clientNotification?: meshtastic.IClientNotification | null

    /** Persistent data for device-ui */
    public deviceuiConfig?: meshtastic.IDeviceUIConfig | null

    /** Log levels, chosen to match python logging conventions. */
    public payloadVariant?:
      | 'packet'
      | 'myInfo'
      | 'nodeInfo'
      | 'config'
      | 'logRecord'
      | 'configCompleteId'
      | 'rebooted'
      | 'moduleConfig'
      | 'channel'
      | 'queueStatus'
      | 'xmodemPacket'
      | 'metadata'
      | 'mqttClientProxyMessage'
      | 'fileInfo'
      | 'clientNotification'
      | 'deviceuiConfig'

    /**
     * Encodes the specified FromRadio message. Does not implicitly {@link meshtastic.FromRadio.verify|verify} messages.
     * @param message FromRadio message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IFromRadio, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a FromRadio message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FromRadio
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.FromRadio
  }

  /** Properties of a ClientNotification. */
  interface IClientNotification {
    /** The id of the packet we're notifying in response to */
    replyId?: number | null

    /** Seconds since 1970 - or 0 for unknown/unset */
    time?: number | null

    /** The level type of notification */
    level?: meshtastic.LogRecord.Level | null

    /** The message body of the notification */
    message?: string | null

    /** ClientNotification keyVerificationNumberInform */
    keyVerificationNumberInform?: meshtastic.IKeyVerificationNumberInform | null

    /** ClientNotification keyVerificationNumberRequest */
    keyVerificationNumberRequest?: meshtastic.IKeyVerificationNumberRequest | null

    /** ClientNotification keyVerificationFinal */
    keyVerificationFinal?: meshtastic.IKeyVerificationFinal | null

    /** ClientNotification duplicatedPublicKey */
    duplicatedPublicKey?: meshtastic.IDuplicatedPublicKey | null

    /** ClientNotification lowEntropyKey */
    lowEntropyKey?: meshtastic.ILowEntropyKey | null
  }

  /**
   * A notification message from the device to the client
   * To be used for important messages that should to be displayed to the user
   * in the form of push notifications or validation messages when saving
   * invalid configuration.
   */
  class ClientNotification implements IClientNotification {
    /**
     * Constructs a new ClientNotification.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IClientNotification)

    /** The id of the packet we're notifying in response to */
    public replyId?: number | null

    /** Seconds since 1970 - or 0 for unknown/unset */
    public time: number

    /** The level type of notification */
    public level: meshtastic.LogRecord.Level

    /** The message body of the notification */
    public message: string

    /** ClientNotification keyVerificationNumberInform. */
    public keyVerificationNumberInform?: meshtastic.IKeyVerificationNumberInform | null

    /** ClientNotification keyVerificationNumberRequest. */
    public keyVerificationNumberRequest?: meshtastic.IKeyVerificationNumberRequest | null

    /** ClientNotification keyVerificationFinal. */
    public keyVerificationFinal?: meshtastic.IKeyVerificationFinal | null

    /** ClientNotification duplicatedPublicKey. */
    public duplicatedPublicKey?: meshtastic.IDuplicatedPublicKey | null

    /** ClientNotification lowEntropyKey. */
    public lowEntropyKey?: meshtastic.ILowEntropyKey | null

    /** ClientNotification _replyId. */
    public _replyId?: 'replyId'

    /** ClientNotification payloadVariant. */
    public payloadVariant?:
      | 'keyVerificationNumberInform'
      | 'keyVerificationNumberRequest'
      | 'keyVerificationFinal'
      | 'duplicatedPublicKey'
      | 'lowEntropyKey'

    /**
     * Encodes the specified ClientNotification message. Does not implicitly {@link meshtastic.ClientNotification.verify|verify} messages.
     * @param message ClientNotification message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IClientNotification, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ClientNotification message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClientNotification
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ClientNotification
  }

  /** Properties of a KeyVerificationNumberInform. */
  interface IKeyVerificationNumberInform {
    /** KeyVerificationNumberInform nonce */
    nonce?: number | Long | null

    /** KeyVerificationNumberInform remoteLongname */
    remoteLongname?: string | null

    /** KeyVerificationNumberInform securityNumber */
    securityNumber?: number | null
  }

  /** Represents a KeyVerificationNumberInform. */
  class KeyVerificationNumberInform implements IKeyVerificationNumberInform {
    /**
     * Constructs a new KeyVerificationNumberInform.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IKeyVerificationNumberInform)

    /** KeyVerificationNumberInform nonce. */
    public nonce: number | Long

    /** KeyVerificationNumberInform remoteLongname. */
    public remoteLongname: string

    /** KeyVerificationNumberInform securityNumber. */
    public securityNumber: number

    /**
     * Encodes the specified KeyVerificationNumberInform message. Does not implicitly {@link meshtastic.KeyVerificationNumberInform.verify|verify} messages.
     * @param message KeyVerificationNumberInform message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IKeyVerificationNumberInform, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a KeyVerificationNumberInform message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KeyVerificationNumberInform
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.KeyVerificationNumberInform
  }

  /** Properties of a KeyVerificationNumberRequest. */
  interface IKeyVerificationNumberRequest {
    /** KeyVerificationNumberRequest nonce */
    nonce?: number | Long | null

    /** KeyVerificationNumberRequest remoteLongname */
    remoteLongname?: string | null
  }

  /** Represents a KeyVerificationNumberRequest. */
  class KeyVerificationNumberRequest implements IKeyVerificationNumberRequest {
    /**
     * Constructs a new KeyVerificationNumberRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IKeyVerificationNumberRequest)

    /** KeyVerificationNumberRequest nonce. */
    public nonce: number | Long

    /** KeyVerificationNumberRequest remoteLongname. */
    public remoteLongname: string

    /**
     * Encodes the specified KeyVerificationNumberRequest message. Does not implicitly {@link meshtastic.KeyVerificationNumberRequest.verify|verify} messages.
     * @param message KeyVerificationNumberRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IKeyVerificationNumberRequest, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a KeyVerificationNumberRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KeyVerificationNumberRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.KeyVerificationNumberRequest
  }

  /** Properties of a KeyVerificationFinal. */
  interface IKeyVerificationFinal {
    /** KeyVerificationFinal nonce */
    nonce?: number | Long | null

    /** KeyVerificationFinal remoteLongname */
    remoteLongname?: string | null

    /** KeyVerificationFinal isSender */
    isSender?: boolean | null

    /** KeyVerificationFinal verificationCharacters */
    verificationCharacters?: string | null
  }

  /** Represents a KeyVerificationFinal. */
  class KeyVerificationFinal implements IKeyVerificationFinal {
    /**
     * Constructs a new KeyVerificationFinal.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IKeyVerificationFinal)

    /** KeyVerificationFinal nonce. */
    public nonce: number | Long

    /** KeyVerificationFinal remoteLongname. */
    public remoteLongname: string

    /** KeyVerificationFinal isSender. */
    public isSender: boolean

    /** KeyVerificationFinal verificationCharacters. */
    public verificationCharacters: string

    /**
     * Encodes the specified KeyVerificationFinal message. Does not implicitly {@link meshtastic.KeyVerificationFinal.verify|verify} messages.
     * @param message KeyVerificationFinal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IKeyVerificationFinal, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a KeyVerificationFinal message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KeyVerificationFinal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.KeyVerificationFinal
  }

  /** Properties of a DuplicatedPublicKey. */
  interface IDuplicatedPublicKey {}

  /** Represents a DuplicatedPublicKey. */
  class DuplicatedPublicKey implements IDuplicatedPublicKey {
    /**
     * Constructs a new DuplicatedPublicKey.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IDuplicatedPublicKey)

    /**
     * Encodes the specified DuplicatedPublicKey message. Does not implicitly {@link meshtastic.DuplicatedPublicKey.verify|verify} messages.
     * @param message DuplicatedPublicKey message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IDuplicatedPublicKey, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a DuplicatedPublicKey message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DuplicatedPublicKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.DuplicatedPublicKey
  }

  /** Properties of a LowEntropyKey. */
  interface ILowEntropyKey {}

  /** Represents a LowEntropyKey. */
  class LowEntropyKey implements ILowEntropyKey {
    /**
     * Constructs a new LowEntropyKey.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.ILowEntropyKey)

    /**
     * Encodes the specified LowEntropyKey message. Does not implicitly {@link meshtastic.LowEntropyKey.verify|verify} messages.
     * @param message LowEntropyKey message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.ILowEntropyKey, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a LowEntropyKey message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LowEntropyKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.LowEntropyKey
  }

  /** Properties of a FileInfo. */
  interface IFileInfo {
    /** The fully qualified path of the file */
    fileName?: string | null

    /** The size of the file in bytes */
    sizeBytes?: number | null
  }

  /** Individual File info for the device */
  class FileInfo implements IFileInfo {
    /**
     * Constructs a new FileInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IFileInfo)

    /** The fully qualified path of the file */
    public fileName: string

    /** The size of the file in bytes */
    public sizeBytes: number

    /**
     * Encodes the specified FileInfo message. Does not implicitly {@link meshtastic.FileInfo.verify|verify} messages.
     * @param message FileInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IFileInfo, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a FileInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FileInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.FileInfo
  }

  /** Properties of a ToRadio. */
  interface IToRadio {
    /** Send this packet on the mesh */
    packet?: meshtastic.IMeshPacket | null

    /**
     * Phone wants radio to send full node db to the phone, This is
     * typically the first packet sent to the radio when the phone gets a
     * bluetooth connection. The radio will respond by sending back a
     * MyNodeInfo, a owner, a radio config and a series of
     * FromRadio.node_infos, and config_complete
     * the integer you write into this field will be reported back in the
     * config_complete_id response this allows clients to never be confused by
     * a stale old partially sent config.
     */
    wantConfigId?: number | null

    /**
     * Tell API server we are disconnecting now.
     * This is useful for serial links where there is no hardware/protocol based notification that the client has dropped the link.
     * (Sending this message is optional for clients)
     */
    disconnect?: boolean | null

    /** ToRadio xmodemPacket */
    xmodemPacket?: meshtastic.IXModem | null

    /** MQTT Client Proxy Message (for client / phone subscribed to MQTT sending to device) */
    mqttClientProxyMessage?: meshtastic.IMqttClientProxyMessage | null

    /** Heartbeat message (used to keep the device connection awake on serial) */
    heartbeat?: meshtastic.IHeartbeat | null
  }

  /**
   * Packets/commands to the radio will be written (reliably) to the toRadio characteristic.
   * Once the write completes the phone can assume it is handled.
   */
  class ToRadio implements IToRadio {
    /**
     * Constructs a new ToRadio.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IToRadio)

    /** Send this packet on the mesh */
    public packet?: meshtastic.IMeshPacket | null

    /**
     * Phone wants radio to send full node db to the phone, This is
     * typically the first packet sent to the radio when the phone gets a
     * bluetooth connection. The radio will respond by sending back a
     * MyNodeInfo, a owner, a radio config and a series of
     * FromRadio.node_infos, and config_complete
     * the integer you write into this field will be reported back in the
     * config_complete_id response this allows clients to never be confused by
     * a stale old partially sent config.
     */
    public wantConfigId?: number | null

    /**
     * Tell API server we are disconnecting now.
     * This is useful for serial links where there is no hardware/protocol based notification that the client has dropped the link.
     * (Sending this message is optional for clients)
     */
    public disconnect?: boolean | null

    /** ToRadio xmodemPacket. */
    public xmodemPacket?: meshtastic.IXModem | null

    /** MQTT Client Proxy Message (for client / phone subscribed to MQTT sending to device) */
    public mqttClientProxyMessage?: meshtastic.IMqttClientProxyMessage | null

    /** Heartbeat message (used to keep the device connection awake on serial) */
    public heartbeat?: meshtastic.IHeartbeat | null

    /** Log levels, chosen to match python logging conventions. */
    public payloadVariant?: 'packet' | 'wantConfigId' | 'disconnect' | 'xmodemPacket' | 'mqttClientProxyMessage' | 'heartbeat'

    /**
     * Encodes the specified ToRadio message. Does not implicitly {@link meshtastic.ToRadio.verify|verify} messages.
     * @param message ToRadio message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IToRadio, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ToRadio message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ToRadio
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ToRadio
  }

  /** Properties of a Compressed. */
  interface ICompressed {
    /** PortNum to determine the how to handle the compressed payload. */
    portnum?: meshtastic.PortNum | null

    /** Compressed data. */
    data?: Uint8Array | null
  }

  /** Compressed message payload */
  class Compressed implements ICompressed {
    /**
     * Constructs a new Compressed.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.ICompressed)

    /** PortNum to determine the how to handle the compressed payload. */
    public portnum: meshtastic.PortNum

    /** Compressed data. */
    public data: Uint8Array

    /**
     * Encodes the specified Compressed message. Does not implicitly {@link meshtastic.Compressed.verify|verify} messages.
     * @param message Compressed message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.ICompressed, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Compressed message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Compressed
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Compressed
  }

  /** Properties of a NeighborInfo. */
  interface INeighborInfo {
    /** The node ID of the node sending info on its neighbors */
    nodeId?: number | null

    /** Field to pass neighbor info for the next sending cycle */
    lastSentById?: number | null

    /** Broadcast interval of the represented node (in seconds) */
    nodeBroadcastIntervalSecs?: number | null

    /** The list of out edges from this node */
    neighbors?: meshtastic.INeighbor[] | null
  }

  /** Full info on edges for a single node */
  class NeighborInfo implements INeighborInfo {
    /**
     * Constructs a new NeighborInfo.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.INeighborInfo)

    /** The node ID of the node sending info on its neighbors */
    public nodeId: number

    /** Field to pass neighbor info for the next sending cycle */
    public lastSentById: number

    /** Broadcast interval of the represented node (in seconds) */
    public nodeBroadcastIntervalSecs: number

    /** The list of out edges from this node */
    public neighbors: meshtastic.INeighbor[]

    /**
     * Encodes the specified NeighborInfo message. Does not implicitly {@link meshtastic.NeighborInfo.verify|verify} messages.
     * @param message NeighborInfo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.INeighborInfo, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a NeighborInfo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NeighborInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.NeighborInfo
  }

  /** Properties of a Neighbor. */
  interface INeighbor {
    /** Node ID of neighbor */
    nodeId?: number | null

    /** SNR of last heard message */
    snr?: number | null

    /**
     * Reception time (in secs since 1970) of last message that was last sent by this ID.
     * Note: this is for local storage only and will not be sent out over the mesh.
     */
    lastRxTime?: number | null

    /**
     * Broadcast interval of this neighbor (in seconds).
     * Note: this is for local storage only and will not be sent out over the mesh.
     */
    nodeBroadcastIntervalSecs?: number | null
  }

  /** A single edge in the mesh */
  class Neighbor implements INeighbor {
    /**
     * Constructs a new Neighbor.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.INeighbor)

    /** Node ID of neighbor */
    public nodeId: number

    /** SNR of last heard message */
    public snr: number

    /**
     * Reception time (in secs since 1970) of last message that was last sent by this ID.
     * Note: this is for local storage only and will not be sent out over the mesh.
     */
    public lastRxTime: number

    /**
     * Broadcast interval of this neighbor (in seconds).
     * Note: this is for local storage only and will not be sent out over the mesh.
     */
    public nodeBroadcastIntervalSecs: number

    /**
     * Encodes the specified Neighbor message. Does not implicitly {@link meshtastic.Neighbor.verify|verify} messages.
     * @param message Neighbor message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.INeighbor, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Neighbor message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Neighbor
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Neighbor
  }

  /** Properties of a DeviceMetadata. */
  interface IDeviceMetadata {
    /** Device firmware version string */
    firmwareVersion?: string | null

    /** Device state version */
    deviceStateVersion?: number | null

    /** Indicates whether the device can shutdown CPU natively or via power management chip */
    canShutdown?: boolean | null

    /** Indicates that the device has native wifi capability */
    hasWifi?: boolean | null

    /** Indicates that the device has native bluetooth capability */
    hasBluetooth?: boolean | null

    /** Indicates that the device has an ethernet peripheral */
    hasEthernet?: boolean | null

    /** Indicates that the device's role in the mesh */
    role?: meshtastic.Config.DeviceConfig.Role | null

    /** Indicates the device's current enabled position flags */
    positionFlags?: number | null

    /** Device hardware model */
    hwModel?: meshtastic.HardwareModel | null

    /** Has Remote Hardware enabled */
    hasRemoteHardware?: boolean | null

    /** Has PKC capabilities */
    hasPKC?: boolean | null

    /**
     * Bit field of boolean for excluded modules
     * (bitwise OR of ExcludedModules)
     */
    excludedModules?: number | null
  }

  /** Device metadata response */
  class DeviceMetadata implements IDeviceMetadata {
    /**
     * Constructs a new DeviceMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IDeviceMetadata)

    /** Device firmware version string */
    public firmwareVersion: string

    /** Device state version */
    public deviceStateVersion: number

    /** Indicates whether the device can shutdown CPU natively or via power management chip */
    public canShutdown: boolean

    /** Indicates that the device has native wifi capability */
    public hasWifi: boolean

    /** Indicates that the device has native bluetooth capability */
    public hasBluetooth: boolean

    /** Indicates that the device has an ethernet peripheral */
    public hasEthernet: boolean

    /** Indicates that the device's role in the mesh */
    public role: meshtastic.Config.DeviceConfig.Role

    /** Indicates the device's current enabled position flags */
    public positionFlags: number

    /** Device hardware model */
    public hwModel: meshtastic.HardwareModel

    /** Has Remote Hardware enabled */
    public hasRemoteHardware: boolean

    /** Has PKC capabilities */
    public hasPKC: boolean

    /**
     * Bit field of boolean for excluded modules
     * (bitwise OR of ExcludedModules)
     */
    public excludedModules: number

    /**
     * Encodes the specified DeviceMetadata message. Does not implicitly {@link meshtastic.DeviceMetadata.verify|verify} messages.
     * @param message DeviceMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IDeviceMetadata, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a DeviceMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeviceMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.DeviceMetadata
  }

  /**
   * Enum for modules excluded from a device's configuration.
   * Each value represents a ModuleConfigType that can be toggled as excluded
   * by setting its corresponding bit in the `excluded_modules` bitmask field.
   */
  enum ExcludedModules {
    EXCLUDED_NONE = 0,
    MQTT_CONFIG = 1,
    SERIAL_CONFIG = 2,
    EXTNOTIF_CONFIG = 4,
    STOREFORWARD_CONFIG = 8,
    RANGETEST_CONFIG = 16,
    TELEMETRY_CONFIG = 32,
    CANNEDMSG_CONFIG = 64,
    AUDIO_CONFIG = 128,
    REMOTEHARDWARE_CONFIG = 256,
    NEIGHBORINFO_CONFIG = 512,
    AMBIENTLIGHTING_CONFIG = 1024,
    DETECTIONSENSOR_CONFIG = 2048,
    PAXCOUNTER_CONFIG = 4096,
    BLUETOOTH_CONFIG = 8192,
    NETWORK_CONFIG = 16384,
  }

  /** Properties of a Heartbeat. */
  interface IHeartbeat {
    /** The nonce of the heartbeat message */
    nonce?: number | null
  }

  /**
   * A heartbeat message is sent to the node from the client to keep the connection alive.
   * This is currently only needed to keep serial connections alive, but can be used by any PhoneAPI.
   */
  class Heartbeat implements IHeartbeat {
    /**
     * Constructs a new Heartbeat.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IHeartbeat)

    /** The nonce of the heartbeat message */
    public nonce: number

    /**
     * Encodes the specified Heartbeat message. Does not implicitly {@link meshtastic.Heartbeat.verify|verify} messages.
     * @param message Heartbeat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Heartbeat message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Heartbeat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Heartbeat
  }

  /** Properties of a NodeRemoteHardwarePin. */
  interface INodeRemoteHardwarePin {
    /** The node_num exposing the available gpio pin */
    nodeNum?: number | null

    /** The the available gpio pin for usage with RemoteHardware module */
    pin?: meshtastic.IRemoteHardwarePin | null
  }

  /** RemoteHardwarePins associated with a node */
  class NodeRemoteHardwarePin implements INodeRemoteHardwarePin {
    /**
     * Constructs a new NodeRemoteHardwarePin.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.INodeRemoteHardwarePin)

    /** The node_num exposing the available gpio pin */
    public nodeNum: number

    /** The the available gpio pin for usage with RemoteHardware module */
    public pin?: meshtastic.IRemoteHardwarePin | null

    /**
     * Encodes the specified NodeRemoteHardwarePin message. Does not implicitly {@link meshtastic.NodeRemoteHardwarePin.verify|verify} messages.
     * @param message NodeRemoteHardwarePin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.INodeRemoteHardwarePin, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a NodeRemoteHardwarePin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NodeRemoteHardwarePin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.NodeRemoteHardwarePin
  }

  /** Properties of a ChunkedPayload. */
  interface IChunkedPayload {
    /** The ID of the entire payload */
    payloadId?: number | null

    /** The total number of chunks in the payload */
    chunkCount?: number | null

    /** The current chunk index in the total */
    chunkIndex?: number | null

    /** The binary data of the current chunk */
    payloadChunk?: Uint8Array | null
  }

  /** Represents a ChunkedPayload. */
  class ChunkedPayload implements IChunkedPayload {
    /**
     * Constructs a new ChunkedPayload.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IChunkedPayload)

    /** The ID of the entire payload */
    public payloadId: number

    /** The total number of chunks in the payload */
    public chunkCount: number

    /** The current chunk index in the total */
    public chunkIndex: number

    /** The binary data of the current chunk */
    public payloadChunk: Uint8Array

    /**
     * Encodes the specified ChunkedPayload message. Does not implicitly {@link meshtastic.ChunkedPayload.verify|verify} messages.
     * @param message ChunkedPayload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IChunkedPayload, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ChunkedPayload message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChunkedPayload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ChunkedPayload
  }

  /** Properties of a resend_chunks. */
  interface Iresend_chunks {
    /** resend_chunks chunks */
    chunks?: number[] | null
  }

  /** Wrapper message for broken repeated oneof support */
  class resend_chunks implements Iresend_chunks {
    /**
     * Constructs a new resend_chunks.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.Iresend_chunks)

    /** resend_chunks chunks. */
    public chunks: number[]

    /**
     * Encodes the specified resend_chunks message. Does not implicitly {@link meshtastic.resend_chunks.verify|verify} messages.
     * @param message resend_chunks message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.Iresend_chunks, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a resend_chunks message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns resend_chunks
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.resend_chunks
  }

  /** Properties of a ChunkedPayloadResponse. */
  interface IChunkedPayloadResponse {
    /** The ID of the entire payload */
    payloadId?: number | null

    /** Request to transfer chunked payload */
    requestTransfer?: boolean | null

    /** Accept the transfer chunked payload */
    acceptTransfer?: boolean | null

    /** Request missing indexes in the chunked payload */
    resendChunks?: meshtastic.Iresend_chunks | null
  }

  /** Responses to a ChunkedPayload request */
  class ChunkedPayloadResponse implements IChunkedPayloadResponse {
    /**
     * Constructs a new ChunkedPayloadResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IChunkedPayloadResponse)

    /** The ID of the entire payload */
    public payloadId: number

    /** Request to transfer chunked payload */
    public requestTransfer?: boolean | null

    /** Accept the transfer chunked payload */
    public acceptTransfer?: boolean | null

    /** Request missing indexes in the chunked payload */
    public resendChunks?: meshtastic.Iresend_chunks | null

    /** ChunkedPayloadResponse payloadVariant. */
    public payloadVariant?: 'requestTransfer' | 'acceptTransfer' | 'resendChunks'

    /**
     * Encodes the specified ChunkedPayloadResponse message. Does not implicitly {@link meshtastic.ChunkedPayloadResponse.verify|verify} messages.
     * @param message ChunkedPayloadResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IChunkedPayloadResponse, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ChunkedPayloadResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChunkedPayloadResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ChunkedPayloadResponse
  }

  /** Properties of a ChannelSettings. */
  interface IChannelSettings {
    /** Deprecated in favor of LoraConfig.channel_num */
    channelNum?: number | null

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
     */
    psk?: Uint8Array | null

    /**
     * A SHORT name that will be packed into the URL.
     * Less than 12 bytes.
     * Something for end users to call the channel
     * If this is the empty string it is assumed that this channel
     * is the special (minimally secure) "Default"channel.
     * In user interfaces it should be rendered as a local language translation of "X".
     * For channel_num hashing empty string will be treated as "X".
     * Where "X" is selected based on the English words listed above for ModemPreset
     */
    name?: string | null

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
     */
    id?: number | null

    /** If true, messages on the mesh will be sent to the *public* internet by any gateway ndoe */
    uplinkEnabled?: boolean | null

    /** If true, messages seen on the internet will be forwarded to the local mesh. */
    downlinkEnabled?: boolean | null

    /** Per-channel module settings. */
    moduleSettings?: meshtastic.IModuleSettings | null

    /** Whether or not we should receive notifactions / alerts through this channel */
    mute?: boolean | null
  }

  /**
   * This information can be encoded as a QRcode/url so that other users can configure
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
   */
  class ChannelSettings implements IChannelSettings {
    /**
     * Constructs a new ChannelSettings.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IChannelSettings)

    /** Deprecated in favor of LoraConfig.channel_num */
    public channelNum: number

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
     */
    public psk: Uint8Array

    /**
     * A SHORT name that will be packed into the URL.
     * Less than 12 bytes.
     * Something for end users to call the channel
     * If this is the empty string it is assumed that this channel
     * is the special (minimally secure) "Default"channel.
     * In user interfaces it should be rendered as a local language translation of "X".
     * For channel_num hashing empty string will be treated as "X".
     * Where "X" is selected based on the English words listed above for ModemPreset
     */
    public name: string

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
     */
    public id: number

    /** If true, messages on the mesh will be sent to the *public* internet by any gateway ndoe */
    public uplinkEnabled: boolean

    /** If true, messages seen on the internet will be forwarded to the local mesh. */
    public downlinkEnabled: boolean

    /** Per-channel module settings. */
    public moduleSettings?: meshtastic.IModuleSettings | null

    /** Whether or not we should receive notifactions / alerts through this channel */
    public mute: boolean

    /**
     * Encodes the specified ChannelSettings message. Does not implicitly {@link meshtastic.ChannelSettings.verify|verify} messages.
     * @param message ChannelSettings message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IChannelSettings, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ChannelSettings message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChannelSettings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ChannelSettings
  }

  /** Properties of a ModuleSettings. */
  interface IModuleSettings {
    /** Bits of precision for the location sent in position packets. */
    positionPrecision?: number | null

    /**
     * Controls whether or not the phone / clients should mute the current channel
     * Useful for noisy public channels you don't necessarily want to disable
     */
    isClientMuted?: boolean | null
  }

  /** This message is specifically for modules to store per-channel configuration data. */
  class ModuleSettings implements IModuleSettings {
    /**
     * Constructs a new ModuleSettings.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IModuleSettings)

    /** Bits of precision for the location sent in position packets. */
    public positionPrecision: number

    /**
     * Controls whether or not the phone / clients should mute the current channel
     * Useful for noisy public channels you don't necessarily want to disable
     */
    public isClientMuted: boolean

    /**
     * Encodes the specified ModuleSettings message. Does not implicitly {@link meshtastic.ModuleSettings.verify|verify} messages.
     * @param message ModuleSettings message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IModuleSettings, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ModuleSettings message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ModuleSettings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleSettings
  }

  /** Properties of a Channel. */
  interface IChannel {
    /**
     * The index of this channel in the channel table (from 0 to MAX_NUM_CHANNELS-1)
     * (Someday - not currently implemented) An index of -1 could be used to mean "set by name",
     * in which case the target node will find and set the channel by settings.name.
     */
    index?: number | null

    /** The new settings, or NULL to disable that channel */
    settings?: meshtastic.IChannelSettings | null

    /** TODO: REPLACE */
    role?: meshtastic.Channel.Role | null
  }

  /** A pair of a channel number, mode and the (sharable) settings for that channel */
  class Channel implements IChannel {
    /**
     * Constructs a new Channel.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IChannel)

    /**
     * The index of this channel in the channel table (from 0 to MAX_NUM_CHANNELS-1)
     * (Someday - not currently implemented) An index of -1 could be used to mean "set by name",
     * in which case the target node will find and set the channel by settings.name.
     */
    public index: number

    /** The new settings, or NULL to disable that channel */
    public settings?: meshtastic.IChannelSettings | null

    /** TODO: REPLACE */
    public role: meshtastic.Channel.Role

    /**
     * Encodes the specified Channel message. Does not implicitly {@link meshtastic.Channel.verify|verify} messages.
     * @param message Channel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IChannel, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Channel message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Channel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Channel
  }

  namespace Channel {
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
     */
    enum Role {
      DISABLED = 0,
      PRIMARY = 1,
      SECONDARY = 2,
    }
  }

  /** Properties of a ModuleConfig. */
  interface IModuleConfig {
    /** TODO: REPLACE */
    mqtt?: meshtastic.ModuleConfig.IMQTTConfig | null

    /** TODO: REPLACE */
    serial?: meshtastic.ModuleConfig.ISerialConfig | null

    /** TODO: REPLACE */
    externalNotification?: meshtastic.ModuleConfig.IExternalNotificationConfig | null

    /** TODO: REPLACE */
    storeForward?: meshtastic.ModuleConfig.IStoreForwardConfig | null

    /** TODO: REPLACE */
    rangeTest?: meshtastic.ModuleConfig.IRangeTestConfig | null

    /** TODO: REPLACE */
    telemetry?: meshtastic.ModuleConfig.ITelemetryConfig | null

    /** TODO: REPLACE */
    cannedMessage?: meshtastic.ModuleConfig.ICannedMessageConfig | null

    /** TODO: REPLACE */
    audio?: meshtastic.ModuleConfig.IAudioConfig | null

    /** TODO: REPLACE */
    remoteHardware?: meshtastic.ModuleConfig.IRemoteHardwareConfig | null

    /** TODO: REPLACE */
    neighborInfo?: meshtastic.ModuleConfig.INeighborInfoConfig | null

    /** TODO: REPLACE */
    ambientLighting?: meshtastic.ModuleConfig.IAmbientLightingConfig | null

    /** TODO: REPLACE */
    detectionSensor?: meshtastic.ModuleConfig.IDetectionSensorConfig | null

    /** TODO: REPLACE */
    paxcounter?: meshtastic.ModuleConfig.IPaxcounterConfig | null
  }

  /** Module Config */
  class ModuleConfig implements IModuleConfig {
    /**
     * Constructs a new ModuleConfig.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IModuleConfig)

    /** TODO: REPLACE */
    public mqtt?: meshtastic.ModuleConfig.IMQTTConfig | null

    /** TODO: REPLACE */
    public serial?: meshtastic.ModuleConfig.ISerialConfig | null

    /** TODO: REPLACE */
    public externalNotification?: meshtastic.ModuleConfig.IExternalNotificationConfig | null

    /** TODO: REPLACE */
    public storeForward?: meshtastic.ModuleConfig.IStoreForwardConfig | null

    /** TODO: REPLACE */
    public rangeTest?: meshtastic.ModuleConfig.IRangeTestConfig | null

    /** TODO: REPLACE */
    public telemetry?: meshtastic.ModuleConfig.ITelemetryConfig | null

    /** TODO: REPLACE */
    public cannedMessage?: meshtastic.ModuleConfig.ICannedMessageConfig | null

    /** TODO: REPLACE */
    public audio?: meshtastic.ModuleConfig.IAudioConfig | null

    /** TODO: REPLACE */
    public remoteHardware?: meshtastic.ModuleConfig.IRemoteHardwareConfig | null

    /** TODO: REPLACE */
    public neighborInfo?: meshtastic.ModuleConfig.INeighborInfoConfig | null

    /** TODO: REPLACE */
    public ambientLighting?: meshtastic.ModuleConfig.IAmbientLightingConfig | null

    /** TODO: REPLACE */
    public detectionSensor?: meshtastic.ModuleConfig.IDetectionSensorConfig | null

    /** TODO: REPLACE */
    public paxcounter?: meshtastic.ModuleConfig.IPaxcounterConfig | null

    /** TODO: REPLACE */
    public payloadVariant?:
      | 'mqtt'
      | 'serial'
      | 'externalNotification'
      | 'storeForward'
      | 'rangeTest'
      | 'telemetry'
      | 'cannedMessage'
      | 'audio'
      | 'remoteHardware'
      | 'neighborInfo'
      | 'ambientLighting'
      | 'detectionSensor'
      | 'paxcounter'

    /**
     * Encodes the specified ModuleConfig message. Does not implicitly {@link meshtastic.ModuleConfig.verify|verify} messages.
     * @param message ModuleConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IModuleConfig, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ModuleConfig message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ModuleConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig
  }

  namespace ModuleConfig {
    /** Properties of a MQTTConfig. */
    interface IMQTTConfig {
      /**
       * If a meshtastic node is able to reach the internet it will normally attempt to gateway any channels that are marked as
       * is_uplink_enabled or is_downlink_enabled.
       */
      enabled?: boolean | null

      /**
       * The server to use for our MQTT global message gateway feature.
       * If not set, the default server will be used
       */
      address?: string | null

      /**
       * MQTT username to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default username
       */
      username?: string | null

      /**
       * MQTT password to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default password
       */
      password?: string | null

      /**
       * Whether to send encrypted or decrypted packets to MQTT.
       * This parameter is only honoured if you also set server
       * (the default official mqtt.meshtastic.org server can handle encrypted packets)
       * Decrypted packets may be useful for external systems that want to consume meshtastic packets
       */
      encryptionEnabled?: boolean | null

      /** Whether to send / consume json packets on MQTT */
      jsonEnabled?: boolean | null

      /** If true, we attempt to establish a secure connection using TLS */
      tlsEnabled?: boolean | null

      /**
       * The root topic to use for MQTT messages. Default is "msh".
       * This is useful if you want to use a single MQTT server for multiple meshtastic networks and separate them via ACLs
       */
      root?: string | null

      /** If true, we can use the connected phone / client to proxy messages to MQTT instead of a direct connection */
      proxyToClientEnabled?: boolean | null

      /** If true, we will periodically report unencrypted information about our node to a map via MQTT */
      mapReportingEnabled?: boolean | null

      /** Settings for reporting information about our node to a map via MQTT */
      mapReportSettings?: meshtastic.ModuleConfig.IMapReportSettings | null
    }

    /** MQTT Client Config */
    class MQTTConfig implements IMQTTConfig {
      /**
       * Constructs a new MQTTConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IMQTTConfig)

      /**
       * If a meshtastic node is able to reach the internet it will normally attempt to gateway any channels that are marked as
       * is_uplink_enabled or is_downlink_enabled.
       */
      public enabled: boolean

      /**
       * The server to use for our MQTT global message gateway feature.
       * If not set, the default server will be used
       */
      public address: string

      /**
       * MQTT username to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default username
       */
      public username: string

      /**
       * MQTT password to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default password
       */
      public password: string

      /**
       * Whether to send encrypted or decrypted packets to MQTT.
       * This parameter is only honoured if you also set server
       * (the default official mqtt.meshtastic.org server can handle encrypted packets)
       * Decrypted packets may be useful for external systems that want to consume meshtastic packets
       */
      public encryptionEnabled: boolean

      /** Whether to send / consume json packets on MQTT */
      public jsonEnabled: boolean

      /** If true, we attempt to establish a secure connection using TLS */
      public tlsEnabled: boolean

      /**
       * The root topic to use for MQTT messages. Default is "msh".
       * This is useful if you want to use a single MQTT server for multiple meshtastic networks and separate them via ACLs
       */
      public root: string

      /** If true, we can use the connected phone / client to proxy messages to MQTT instead of a direct connection */
      public proxyToClientEnabled: boolean

      /** If true, we will periodically report unencrypted information about our node to a map via MQTT */
      public mapReportingEnabled: boolean

      /** Settings for reporting information about our node to a map via MQTT */
      public mapReportSettings?: meshtastic.ModuleConfig.IMapReportSettings | null

      /**
       * Encodes the specified MQTTConfig message. Does not implicitly {@link meshtastic.ModuleConfig.MQTTConfig.verify|verify} messages.
       * @param message MQTTConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IMQTTConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a MQTTConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns MQTTConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.MQTTConfig
    }

    /** Properties of a MapReportSettings. */
    interface IMapReportSettings {
      /** How often we should report our info to the map (in seconds) */
      publishIntervalSecs?: number | null

      /** Bits of precision for the location sent (default of 32 is full precision). */
      positionPrecision?: number | null

      /** Whether we have opted-in to report our location to the map */
      shouldReportLocation?: boolean | null
    }

    /** Settings for reporting unencrypted information about our node to a map via MQTT */
    class MapReportSettings implements IMapReportSettings {
      /**
       * Constructs a new MapReportSettings.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IMapReportSettings)

      /** How often we should report our info to the map (in seconds) */
      public publishIntervalSecs: number

      /** Bits of precision for the location sent (default of 32 is full precision). */
      public positionPrecision: number

      /** Whether we have opted-in to report our location to the map */
      public shouldReportLocation: boolean

      /**
       * Encodes the specified MapReportSettings message. Does not implicitly {@link meshtastic.ModuleConfig.MapReportSettings.verify|verify} messages.
       * @param message MapReportSettings message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IMapReportSettings, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a MapReportSettings message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns MapReportSettings
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.MapReportSettings
    }

    /** Properties of a RemoteHardwareConfig. */
    interface IRemoteHardwareConfig {
      /** Whether the Module is enabled */
      enabled?: boolean | null

      /** Whether the Module allows consumers to read / write to pins not defined in available_pins */
      allowUndefinedPinAccess?: boolean | null

      /** Exposes the available pins to the mesh for reading and writing */
      availablePins?: meshtastic.IRemoteHardwarePin[] | null
    }

    /** RemoteHardwareModule Config */
    class RemoteHardwareConfig implements IRemoteHardwareConfig {
      /**
       * Constructs a new RemoteHardwareConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IRemoteHardwareConfig)

      /** Whether the Module is enabled */
      public enabled: boolean

      /** Whether the Module allows consumers to read / write to pins not defined in available_pins */
      public allowUndefinedPinAccess: boolean

      /** Exposes the available pins to the mesh for reading and writing */
      public availablePins: meshtastic.IRemoteHardwarePin[]

      /**
       * Encodes the specified RemoteHardwareConfig message. Does not implicitly {@link meshtastic.ModuleConfig.RemoteHardwareConfig.verify|verify} messages.
       * @param message RemoteHardwareConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IRemoteHardwareConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a RemoteHardwareConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns RemoteHardwareConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.RemoteHardwareConfig
    }

    /** Properties of a NeighborInfoConfig. */
    interface INeighborInfoConfig {
      /** Whether the Module is enabled */
      enabled?: boolean | null

      /**
       * Interval in seconds of how often we should try to send our
       * Neighbor Info (minimum is 14400, i.e., 4 hours)
       */
      updateInterval?: number | null

      /**
       * Whether in addition to sending it to MQTT and the PhoneAPI, our NeighborInfo should be transmitted over LoRa.
       * Note that this is not available on a channel with default key and name.
       */
      transmitOverLora?: boolean | null
    }

    /** NeighborInfoModule Config */
    class NeighborInfoConfig implements INeighborInfoConfig {
      /**
       * Constructs a new NeighborInfoConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.INeighborInfoConfig)

      /** Whether the Module is enabled */
      public enabled: boolean

      /**
       * Interval in seconds of how often we should try to send our
       * Neighbor Info (minimum is 14400, i.e., 4 hours)
       */
      public updateInterval: number

      /**
       * Whether in addition to sending it to MQTT and the PhoneAPI, our NeighborInfo should be transmitted over LoRa.
       * Note that this is not available on a channel with default key and name.
       */
      public transmitOverLora: boolean

      /**
       * Encodes the specified NeighborInfoConfig message. Does not implicitly {@link meshtastic.ModuleConfig.NeighborInfoConfig.verify|verify} messages.
       * @param message NeighborInfoConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.INeighborInfoConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a NeighborInfoConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns NeighborInfoConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.NeighborInfoConfig
    }

    /** Properties of a DetectionSensorConfig. */
    interface IDetectionSensorConfig {
      /** Whether the Module is enabled */
      enabled?: boolean | null

      /**
       * Interval in seconds of how often we can send a message to the mesh when a
       * trigger event is detected
       */
      minimumBroadcastSecs?: number | null

      /**
       * Interval in seconds of how often we should send a message to the mesh
       * with the current state regardless of trigger events When set to 0, only
       * trigger events will be broadcasted Works as a sort of status heartbeat
       * for peace of mind
       */
      stateBroadcastSecs?: number | null

      /**
       * Send ASCII bell with alert message
       * Useful for triggering ext. notification on bell
       */
      sendBell?: boolean | null

      /**
       * Friendly name used to format message sent to mesh
       * Example: A name "Motion" would result in a message "Motion detected"
       * Maximum length of 20 characters
       */
      name?: string | null

      /** GPIO pin to monitor for state changes */
      monitorPin?: number | null

      /** The type of trigger event to be used */
      detectionTriggerType?: meshtastic.ModuleConfig.DetectionSensorConfig.TriggerType | null

      /**
       * Whether or not use INPUT_PULLUP mode for GPIO pin
       * Only applicable if the board uses pull-up resistors on the pin
       */
      usePullup?: boolean | null
    }

    /** Detection Sensor Module Config */
    class DetectionSensorConfig implements IDetectionSensorConfig {
      /**
       * Constructs a new DetectionSensorConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IDetectionSensorConfig)

      /** Whether the Module is enabled */
      public enabled: boolean

      /**
       * Interval in seconds of how often we can send a message to the mesh when a
       * trigger event is detected
       */
      public minimumBroadcastSecs: number

      /**
       * Interval in seconds of how often we should send a message to the mesh
       * with the current state regardless of trigger events When set to 0, only
       * trigger events will be broadcasted Works as a sort of status heartbeat
       * for peace of mind
       */
      public stateBroadcastSecs: number

      /**
       * Send ASCII bell with alert message
       * Useful for triggering ext. notification on bell
       */
      public sendBell: boolean

      /**
       * Friendly name used to format message sent to mesh
       * Example: A name "Motion" would result in a message "Motion detected"
       * Maximum length of 20 characters
       */
      public name: string

      /** GPIO pin to monitor for state changes */
      public monitorPin: number

      /** The type of trigger event to be used */
      public detectionTriggerType: meshtastic.ModuleConfig.DetectionSensorConfig.TriggerType

      /**
       * Whether or not use INPUT_PULLUP mode for GPIO pin
       * Only applicable if the board uses pull-up resistors on the pin
       */
      public usePullup: boolean

      /**
       * Encodes the specified DetectionSensorConfig message. Does not implicitly {@link meshtastic.ModuleConfig.DetectionSensorConfig.verify|verify} messages.
       * @param message DetectionSensorConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IDetectionSensorConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a DetectionSensorConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns DetectionSensorConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.DetectionSensorConfig
    }

    namespace DetectionSensorConfig {
      /** TriggerType enum. */
      enum TriggerType {
        LOGIC_LOW = 0,
        LOGIC_HIGH = 1,
        FALLING_EDGE = 2,
        RISING_EDGE = 3,
        EITHER_EDGE_ACTIVE_LOW = 4,
        EITHER_EDGE_ACTIVE_HIGH = 5,
      }
    }

    /** Properties of an AudioConfig. */
    interface IAudioConfig {
      /** Whether Audio is enabled */
      codec2Enabled?: boolean | null

      /** PTT Pin */
      pttPin?: number | null

      /** The audio sample rate to use for codec2 */
      bitrate?: meshtastic.ModuleConfig.AudioConfig.Audio_Baud | null

      /** I2S Word Select */
      i2sWs?: number | null

      /** I2S Data IN */
      i2sSd?: number | null

      /** I2S Data OUT */
      i2sDin?: number | null

      /** I2S Clock */
      i2sSck?: number | null
    }

    /** Audio Config for codec2 voice */
    class AudioConfig implements IAudioConfig {
      /**
       * Constructs a new AudioConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IAudioConfig)

      /** Whether Audio is enabled */
      public codec2Enabled: boolean

      /** PTT Pin */
      public pttPin: number

      /** The audio sample rate to use for codec2 */
      public bitrate: meshtastic.ModuleConfig.AudioConfig.Audio_Baud

      /** I2S Word Select */
      public i2sWs: number

      /** I2S Data IN */
      public i2sSd: number

      /** I2S Data OUT */
      public i2sDin: number

      /** I2S Clock */
      public i2sSck: number

      /**
       * Encodes the specified AudioConfig message. Does not implicitly {@link meshtastic.ModuleConfig.AudioConfig.verify|verify} messages.
       * @param message AudioConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IAudioConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes an AudioConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns AudioConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.AudioConfig
    }

    namespace AudioConfig {
      /** Baudrate for codec2 voice */
      enum Audio_Baud {
        CODEC2_DEFAULT = 0,
        CODEC2_3200 = 1,
        CODEC2_2400 = 2,
        CODEC2_1600 = 3,
        CODEC2_1400 = 4,
        CODEC2_1300 = 5,
        CODEC2_1200 = 6,
        CODEC2_700 = 7,
        CODEC2_700B = 8,
      }
    }

    /** Properties of a PaxcounterConfig. */
    interface IPaxcounterConfig {
      /** Enable the Paxcounter Module */
      enabled?: boolean | null

      /** PaxcounterConfig paxcounterUpdateInterval */
      paxcounterUpdateInterval?: number | null

      /** WiFi RSSI threshold. Defaults to -80 */
      wifiThreshold?: number | null

      /** BLE RSSI threshold. Defaults to -80 */
      bleThreshold?: number | null
    }

    /** Config for the Paxcounter Module */
    class PaxcounterConfig implements IPaxcounterConfig {
      /**
       * Constructs a new PaxcounterConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IPaxcounterConfig)

      /** Enable the Paxcounter Module */
      public enabled: boolean

      /** PaxcounterConfig paxcounterUpdateInterval. */
      public paxcounterUpdateInterval: number

      /** WiFi RSSI threshold. Defaults to -80 */
      public wifiThreshold: number

      /** BLE RSSI threshold. Defaults to -80 */
      public bleThreshold: number

      /**
       * Encodes the specified PaxcounterConfig message. Does not implicitly {@link meshtastic.ModuleConfig.PaxcounterConfig.verify|verify} messages.
       * @param message PaxcounterConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IPaxcounterConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a PaxcounterConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns PaxcounterConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.PaxcounterConfig
    }

    /** Properties of a SerialConfig. */
    interface ISerialConfig {
      /** Preferences for the SerialModule */
      enabled?: boolean | null

      /** TODO: REPLACE */
      echo?: boolean | null

      /** RX pin (should match Arduino gpio pin number) */
      rxd?: number | null

      /** TX pin (should match Arduino gpio pin number) */
      txd?: number | null

      /** Serial baud rate */
      baud?: meshtastic.ModuleConfig.SerialConfig.Serial_Baud | null

      /** TODO: REPLACE */
      timeout?: number | null

      /** Mode for serial module operation */
      mode?: meshtastic.ModuleConfig.SerialConfig.Serial_Mode | null

      /**
       * Overrides the platform's defacto Serial port instance to use with Serial module config settings
       * This is currently only usable in output modes like NMEA / CalTopo and may behave strangely or not work at all in other modes
       * Existing logging over the Serial Console will still be present
       */
      overrideConsoleSerialPort?: boolean | null
    }

    /** Serial Config */
    class SerialConfig implements ISerialConfig {
      /**
       * Constructs a new SerialConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.ISerialConfig)

      /** Preferences for the SerialModule */
      public enabled: boolean

      /** TODO: REPLACE */
      public echo: boolean

      /** RX pin (should match Arduino gpio pin number) */
      public rxd: number

      /** TX pin (should match Arduino gpio pin number) */
      public txd: number

      /** Serial baud rate */
      public baud: meshtastic.ModuleConfig.SerialConfig.Serial_Baud

      /** TODO: REPLACE */
      public timeout: number

      /** Mode for serial module operation */
      public mode: meshtastic.ModuleConfig.SerialConfig.Serial_Mode

      /**
       * Overrides the platform's defacto Serial port instance to use with Serial module config settings
       * This is currently only usable in output modes like NMEA / CalTopo and may behave strangely or not work at all in other modes
       * Existing logging over the Serial Console will still be present
       */
      public overrideConsoleSerialPort: boolean

      /**
       * Encodes the specified SerialConfig message. Does not implicitly {@link meshtastic.ModuleConfig.SerialConfig.verify|verify} messages.
       * @param message SerialConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.ISerialConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a SerialConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns SerialConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.SerialConfig
    }

    namespace SerialConfig {
      /** TODO: REPLACE */
      enum Serial_Baud {
        BAUD_DEFAULT = 0,
        BAUD_110 = 1,
        BAUD_300 = 2,
        BAUD_600 = 3,
        BAUD_1200 = 4,
        BAUD_2400 = 5,
        BAUD_4800 = 6,
        BAUD_9600 = 7,
        BAUD_19200 = 8,
        BAUD_38400 = 9,
        BAUD_57600 = 10,
        BAUD_115200 = 11,
        BAUD_230400 = 12,
        BAUD_460800 = 13,
        BAUD_576000 = 14,
        BAUD_921600 = 15,
      }

      /** TODO: REPLACE */
      enum Serial_Mode {
        DEFAULT = 0,
        SIMPLE = 1,
        PROTO = 2,
        TEXTMSG = 3,
        NMEA = 4,
        CALTOPO = 5,
        WS85 = 6,
        VE_DIRECT = 7,
        MS_CONFIG = 8,
      }
    }

    /** Properties of an ExternalNotificationConfig. */
    interface IExternalNotificationConfig {
      /** Enable the ExternalNotificationModule */
      enabled?: boolean | null

      /**
       * When using in On/Off mode, keep the output on for this many
       * milliseconds. Default 1000ms (1 second).
       */
      outputMs?: number | null

      /**
       * Define the output pin GPIO setting Defaults to
       * EXT_NOTIFY_OUT if set for the board.
       * In standalone devices this pin should drive the LED to match the UI.
       */
      output?: number | null

      /**
       * Optional: Define a secondary output pin for a vibra motor
       * This is used in standalone devices to match the UI.
       */
      outputVibra?: number | null

      /**
       * Optional: Define a tertiary output pin for an active buzzer
       * This is used in standalone devices to to match the UI.
       */
      outputBuzzer?: number | null

      /**
       * IF this is true, the 'output' Pin will be pulled active high, false
       * means active low.
       */
      active?: boolean | null

      /** True: Alert when a text message arrives (output) */
      alertMessage?: boolean | null

      /** True: Alert when a text message arrives (output_vibra) */
      alertMessageVibra?: boolean | null

      /** True: Alert when a text message arrives (output_buzzer) */
      alertMessageBuzzer?: boolean | null

      /** True: Alert when the bell character is received (output) */
      alertBell?: boolean | null

      /** True: Alert when the bell character is received (output_vibra) */
      alertBellVibra?: boolean | null

      /** True: Alert when the bell character is received (output_buzzer) */
      alertBellBuzzer?: boolean | null

      /**
       * use a PWM output instead of a simple on/off output. This will ignore
       * the 'output', 'output_ms' and 'active' settings and use the
       * device.buzzer_gpio instead.
       */
      usePwm?: boolean | null

      /**
       * The notification will toggle with 'output_ms' for this time of seconds.
       * Default is 0 which means don't repeat at all. 60 would mean blink
       * and/or beep for 60 seconds
       */
      nagTimeout?: number | null

      /**
       * When true, enables devices with native I2S audio output to use the RTTTL over speaker like a buzzer
       * T-Watch S3 and T-Deck for example have this capability
       */
      useI2sAsBuzzer?: boolean | null
    }

    /** External Notifications Config */
    class ExternalNotificationConfig implements IExternalNotificationConfig {
      /**
       * Constructs a new ExternalNotificationConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IExternalNotificationConfig)

      /** Enable the ExternalNotificationModule */
      public enabled: boolean

      /**
       * When using in On/Off mode, keep the output on for this many
       * milliseconds. Default 1000ms (1 second).
       */
      public outputMs: number

      /**
       * Define the output pin GPIO setting Defaults to
       * EXT_NOTIFY_OUT if set for the board.
       * In standalone devices this pin should drive the LED to match the UI.
       */
      public output: number

      /**
       * Optional: Define a secondary output pin for a vibra motor
       * This is used in standalone devices to match the UI.
       */
      public outputVibra: number

      /**
       * Optional: Define a tertiary output pin for an active buzzer
       * This is used in standalone devices to to match the UI.
       */
      public outputBuzzer: number

      /**
       * IF this is true, the 'output' Pin will be pulled active high, false
       * means active low.
       */
      public active: boolean

      /** True: Alert when a text message arrives (output) */
      public alertMessage: boolean

      /** True: Alert when a text message arrives (output_vibra) */
      public alertMessageVibra: boolean

      /** True: Alert when a text message arrives (output_buzzer) */
      public alertMessageBuzzer: boolean

      /** True: Alert when the bell character is received (output) */
      public alertBell: boolean

      /** True: Alert when the bell character is received (output_vibra) */
      public alertBellVibra: boolean

      /** True: Alert when the bell character is received (output_buzzer) */
      public alertBellBuzzer: boolean

      /**
       * use a PWM output instead of a simple on/off output. This will ignore
       * the 'output', 'output_ms' and 'active' settings and use the
       * device.buzzer_gpio instead.
       */
      public usePwm: boolean

      /**
       * The notification will toggle with 'output_ms' for this time of seconds.
       * Default is 0 which means don't repeat at all. 60 would mean blink
       * and/or beep for 60 seconds
       */
      public nagTimeout: number

      /**
       * When true, enables devices with native I2S audio output to use the RTTTL over speaker like a buzzer
       * T-Watch S3 and T-Deck for example have this capability
       */
      public useI2sAsBuzzer: boolean

      /**
       * Encodes the specified ExternalNotificationConfig message. Does not implicitly {@link meshtastic.ModuleConfig.ExternalNotificationConfig.verify|verify} messages.
       * @param message ExternalNotificationConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IExternalNotificationConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes an ExternalNotificationConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns ExternalNotificationConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.ExternalNotificationConfig
    }

    /** Properties of a StoreForwardConfig. */
    interface IStoreForwardConfig {
      /** Enable the Store and Forward Module */
      enabled?: boolean | null

      /** TODO: REPLACE */
      heartbeat?: boolean | null

      /** TODO: REPLACE */
      records?: number | null

      /** TODO: REPLACE */
      historyReturnMax?: number | null

      /** TODO: REPLACE */
      historyReturnWindow?: number | null

      /** Set to true to let this node act as a server that stores received messages and resends them upon request. */
      isServer?: boolean | null
    }

    /** Store and Forward Module Config */
    class StoreForwardConfig implements IStoreForwardConfig {
      /**
       * Constructs a new StoreForwardConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IStoreForwardConfig)

      /** Enable the Store and Forward Module */
      public enabled: boolean

      /** TODO: REPLACE */
      public heartbeat: boolean

      /** TODO: REPLACE */
      public records: number

      /** TODO: REPLACE */
      public historyReturnMax: number

      /** TODO: REPLACE */
      public historyReturnWindow: number

      /** Set to true to let this node act as a server that stores received messages and resends them upon request. */
      public isServer: boolean

      /**
       * Encodes the specified StoreForwardConfig message. Does not implicitly {@link meshtastic.ModuleConfig.StoreForwardConfig.verify|verify} messages.
       * @param message StoreForwardConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IStoreForwardConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a StoreForwardConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns StoreForwardConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.StoreForwardConfig
    }

    /** Properties of a RangeTestConfig. */
    interface IRangeTestConfig {
      /** Enable the Range Test Module */
      enabled?: boolean | null

      /** Send out range test messages from this node */
      sender?: number | null

      /**
       * Bool value indicating that this node should save a RangeTest.csv file.
       * ESP32 Only
       */
      save?: boolean | null

      /**
       * Bool indicating that the node should cleanup / destroy it's RangeTest.csv file.
       * ESP32 Only
       */
      clearOnReboot?: boolean | null
    }

    /** Preferences for the RangeTestModule */
    class RangeTestConfig implements IRangeTestConfig {
      /**
       * Constructs a new RangeTestConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IRangeTestConfig)

      /** Enable the Range Test Module */
      public enabled: boolean

      /** Send out range test messages from this node */
      public sender: number

      /**
       * Bool value indicating that this node should save a RangeTest.csv file.
       * ESP32 Only
       */
      public save: boolean

      /**
       * Bool indicating that the node should cleanup / destroy it's RangeTest.csv file.
       * ESP32 Only
       */
      public clearOnReboot: boolean

      /**
       * Encodes the specified RangeTestConfig message. Does not implicitly {@link meshtastic.ModuleConfig.RangeTestConfig.verify|verify} messages.
       * @param message RangeTestConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IRangeTestConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a RangeTestConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns RangeTestConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.RangeTestConfig
    }

    /** Properties of a TelemetryConfig. */
    interface ITelemetryConfig {
      /**
       * Interval in seconds of how often we should try to send our
       * device metrics to the mesh
       */
      deviceUpdateInterval?: number | null

      /** TelemetryConfig environmentUpdateInterval */
      environmentUpdateInterval?: number | null

      /**
       * Preferences for the Telemetry Module (Environment)
       * Enable/Disable the telemetry measurement module measurement collection
       */
      environmentMeasurementEnabled?: boolean | null

      /** Enable/Disable the telemetry measurement module on-device display */
      environmentScreenEnabled?: boolean | null

      /**
       * We'll always read the sensor in Celsius, but sometimes we might want to
       * display the results in Fahrenheit as a "user preference".
       */
      environmentDisplayFahrenheit?: boolean | null

      /** Enable/Disable the air quality metrics */
      airQualityEnabled?: boolean | null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      airQualityInterval?: number | null

      /** Enable/disable Power metrics */
      powerMeasurementEnabled?: boolean | null

      /**
       * Interval in seconds of how often we should try to send our
       * power metrics to the mesh
       */
      powerUpdateInterval?: number | null

      /** Enable/Disable the power measurement module on-device display */
      powerScreenEnabled?: boolean | null

      /**
       * Preferences for the (Health) Telemetry Module
       * Enable/Disable the telemetry measurement module measurement collection
       */
      healthMeasurementEnabled?: boolean | null

      /**
       * Interval in seconds of how often we should try to send our
       * health metrics to the mesh
       */
      healthUpdateInterval?: number | null

      /** Enable/Disable the health telemetry module on-device display */
      healthScreenEnabled?: boolean | null

      /**
       * Enable/Disable the device telemetry module to send metrics to the mesh
       * Note: We will still send telemtry to the connected phone / client every minute over the API
       */
      deviceTelemetryEnabled?: boolean | null
    }

    /** Configuration for both device and environment metrics */
    class TelemetryConfig implements ITelemetryConfig {
      /**
       * Constructs a new TelemetryConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.ITelemetryConfig)

      /**
       * Interval in seconds of how often we should try to send our
       * device metrics to the mesh
       */
      public deviceUpdateInterval: number

      /** TelemetryConfig environmentUpdateInterval. */
      public environmentUpdateInterval: number

      /**
       * Preferences for the Telemetry Module (Environment)
       * Enable/Disable the telemetry measurement module measurement collection
       */
      public environmentMeasurementEnabled: boolean

      /** Enable/Disable the telemetry measurement module on-device display */
      public environmentScreenEnabled: boolean

      /**
       * We'll always read the sensor in Celsius, but sometimes we might want to
       * display the results in Fahrenheit as a "user preference".
       */
      public environmentDisplayFahrenheit: boolean

      /** Enable/Disable the air quality metrics */
      public airQualityEnabled: boolean

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      public airQualityInterval: number

      /** Enable/disable Power metrics */
      public powerMeasurementEnabled: boolean

      /**
       * Interval in seconds of how often we should try to send our
       * power metrics to the mesh
       */
      public powerUpdateInterval: number

      /** Enable/Disable the power measurement module on-device display */
      public powerScreenEnabled: boolean

      /**
       * Preferences for the (Health) Telemetry Module
       * Enable/Disable the telemetry measurement module measurement collection
       */
      public healthMeasurementEnabled: boolean

      /**
       * Interval in seconds of how often we should try to send our
       * health metrics to the mesh
       */
      public healthUpdateInterval: number

      /** Enable/Disable the health telemetry module on-device display */
      public healthScreenEnabled: boolean

      /**
       * Enable/Disable the device telemetry module to send metrics to the mesh
       * Note: We will still send telemtry to the connected phone / client every minute over the API
       */
      public deviceTelemetryEnabled: boolean

      /**
       * Encodes the specified TelemetryConfig message. Does not implicitly {@link meshtastic.ModuleConfig.TelemetryConfig.verify|verify} messages.
       * @param message TelemetryConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.ITelemetryConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a TelemetryConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns TelemetryConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.TelemetryConfig
    }

    /** Properties of a CannedMessageConfig. */
    interface ICannedMessageConfig {
      /** Enable the rotary encoder #1. This is a 'dumb' encoder sending pulses on both A and B pins while rotating. */
      rotary1Enabled?: boolean | null

      /** GPIO pin for rotary encoder A port. */
      inputbrokerPinA?: number | null

      /** GPIO pin for rotary encoder B port. */
      inputbrokerPinB?: number | null

      /** GPIO pin for rotary encoder Press port. */
      inputbrokerPinPress?: number | null

      /** Generate input event on CW of this kind. */
      inputbrokerEventCw?: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar | null

      /** Generate input event on CCW of this kind. */
      inputbrokerEventCcw?: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar | null

      /** Generate input event on Press of this kind. */
      inputbrokerEventPress?: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar | null

      /** Enable the Up/Down/Select input device. Can be RAK rotary encoder or 3 buttons. Uses the a/b/press definitions from inputbroker. */
      updown1Enabled?: boolean | null

      /** Enable/disable CannedMessageModule. */
      enabled?: boolean | null

      /**
       * Input event origin accepted by the canned message module.
       * Can be e.g. "rotEnc1", "upDownEnc1", "scanAndSelect", "cardkb", "serialkb", or keyword "_any"
       */
      allowInputSource?: string | null

      /**
       * CannedMessageModule also sends a bell character with the messages.
       * ExternalNotificationModule can benefit from this feature.
       */
      sendBell?: boolean | null
    }

    /** Canned Messages Module Config */
    class CannedMessageConfig implements ICannedMessageConfig {
      /**
       * Constructs a new CannedMessageConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.ICannedMessageConfig)

      /** Enable the rotary encoder #1. This is a 'dumb' encoder sending pulses on both A and B pins while rotating. */
      public rotary1Enabled: boolean

      /** GPIO pin for rotary encoder A port. */
      public inputbrokerPinA: number

      /** GPIO pin for rotary encoder B port. */
      public inputbrokerPinB: number

      /** GPIO pin for rotary encoder Press port. */
      public inputbrokerPinPress: number

      /** Generate input event on CW of this kind. */
      public inputbrokerEventCw: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar

      /** Generate input event on CCW of this kind. */
      public inputbrokerEventCcw: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar

      /** Generate input event on Press of this kind. */
      public inputbrokerEventPress: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar

      /** Enable the Up/Down/Select input device. Can be RAK rotary encoder or 3 buttons. Uses the a/b/press definitions from inputbroker. */
      public updown1Enabled: boolean

      /** Enable/disable CannedMessageModule. */
      public enabled: boolean

      /**
       * Input event origin accepted by the canned message module.
       * Can be e.g. "rotEnc1", "upDownEnc1", "scanAndSelect", "cardkb", "serialkb", or keyword "_any"
       */
      public allowInputSource: string

      /**
       * CannedMessageModule also sends a bell character with the messages.
       * ExternalNotificationModule can benefit from this feature.
       */
      public sendBell: boolean

      /**
       * Encodes the specified CannedMessageConfig message. Does not implicitly {@link meshtastic.ModuleConfig.CannedMessageConfig.verify|verify} messages.
       * @param message CannedMessageConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.ICannedMessageConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes a CannedMessageConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns CannedMessageConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.CannedMessageConfig
    }

    namespace CannedMessageConfig {
      /** TODO: REPLACE */
      enum InputEventChar {
        NONE = 0,
        UP = 17,
        DOWN = 18,
        LEFT = 19,
        RIGHT = 20,
        SELECT = 10,
        BACK = 27,
        CANCEL = 24,
      }
    }

    /** Properties of an AmbientLightingConfig. */
    interface IAmbientLightingConfig {
      /** Sets LED to on or off. */
      ledState?: boolean | null

      /** Sets the current for the LED output. Default is 10. */
      current?: number | null

      /** Sets the red LED level. Values are 0-255. */
      red?: number | null

      /** Sets the green LED level. Values are 0-255. */
      green?: number | null

      /** Sets the blue LED level. Values are 0-255. */
      blue?: number | null
    }

    /**
     * Ambient Lighting Module - Settings for control of onboard LEDs to allow users to adjust the brightness levels and respective color levels.
     * Initially created for the RAK14001 RGB LED module.
     */
    class AmbientLightingConfig implements IAmbientLightingConfig {
      /**
       * Constructs a new AmbientLightingConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IAmbientLightingConfig)

      /** Sets LED to on or off. */
      public ledState: boolean

      /** Sets the current for the LED output. Default is 10. */
      public current: number

      /** Sets the red LED level. Values are 0-255. */
      public red: number

      /** Sets the green LED level. Values are 0-255. */
      public green: number

      /** Sets the blue LED level. Values are 0-255. */
      public blue: number

      /**
       * Encodes the specified AmbientLightingConfig message. Does not implicitly {@link meshtastic.ModuleConfig.AmbientLightingConfig.verify|verify} messages.
       * @param message AmbientLightingConfig message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(message: meshtastic.ModuleConfig.IAmbientLightingConfig, writer?: $protobuf.Writer): $protobuf.Writer

      /**
       * Decodes an AmbientLightingConfig message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns AmbientLightingConfig
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ModuleConfig.AmbientLightingConfig
    }
  }

  /** Properties of a RemoteHardwarePin. */
  interface IRemoteHardwarePin {
    /** GPIO Pin number (must match Arduino) */
    gpioPin?: number | null

    /** Name for the GPIO pin (i.e. Front gate, mailbox, etc) */
    name?: string | null

    /** Type of GPIO access available to consumers on the mesh */
    type?: meshtastic.RemoteHardwarePinType | null
  }

  /** A GPIO pin definition for remote hardware module */
  class RemoteHardwarePin implements IRemoteHardwarePin {
    /**
     * Constructs a new RemoteHardwarePin.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IRemoteHardwarePin)

    /** GPIO Pin number (must match Arduino) */
    public gpioPin: number

    /** Name for the GPIO pin (i.e. Front gate, mailbox, etc) */
    public name: string

    /** Type of GPIO access available to consumers on the mesh */
    public type: meshtastic.RemoteHardwarePinType

    /**
     * Encodes the specified RemoteHardwarePin message. Does not implicitly {@link meshtastic.RemoteHardwarePin.verify|verify} messages.
     * @param message RemoteHardwarePin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IRemoteHardwarePin, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a RemoteHardwarePin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RemoteHardwarePin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.RemoteHardwarePin
  }

  /** RemoteHardwarePinType enum. */
  enum RemoteHardwarePinType {
    UNKNOWN = 0,
    DIGITAL_READ = 1,
    DIGITAL_WRITE = 2,
  }

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
   */
  enum PortNum {
    UNKNOWN_APP = 0,
    TEXT_MESSAGE_APP = 1,
    REMOTE_HARDWARE_APP = 2,
    POSITION_APP = 3,
    NODEINFO_APP = 4,
    ROUTING_APP = 5,
    ADMIN_APP = 6,
    TEXT_MESSAGE_COMPRESSED_APP = 7,
    WAYPOINT_APP = 8,
    AUDIO_APP = 9,
    DETECTION_SENSOR_APP = 10,
    ALERT_APP = 11,
    KEY_VERIFICATION_APP = 12,
    REPLY_APP = 32,
    IP_TUNNEL_APP = 33,
    PAXCOUNTER_APP = 34,
    SERIAL_APP = 64,
    STORE_FORWARD_APP = 65,
    RANGE_TEST_APP = 66,
    TELEMETRY_APP = 67,
    ZPS_APP = 68,
    SIMULATOR_APP = 69,
    TRACEROUTE_APP = 70,
    NEIGHBORINFO_APP = 71,
    ATAK_PLUGIN = 72,
    MAP_REPORT_APP = 73,
    POWERSTRESS_APP = 74,
    RETICULUM_TUNNEL_APP = 76,
    CAYENNE_APP = 77,
    PRIVATE_APP = 256,
    ATAK_FORWARDER = 257,
    MAX = 511,
  }

  /** Properties of a DeviceMetrics. */
  interface IDeviceMetrics {
    /** 0-100 (>100 means powered) */
    batteryLevel?: number | null

    /** Voltage measured */
    voltage?: number | null

    /** Utilization for the current channel, including well formed TX, RX and malformed RX (aka noise). */
    channelUtilization?: number | null

    /** Percent of airtime for transmission used within the last hour. */
    airUtilTx?: number | null

    /** How long the device has been running since the last reboot (in seconds) */
    uptimeSeconds?: number | null
  }

  /** Key native device metrics such as battery level */
  class DeviceMetrics implements IDeviceMetrics {
    /**
     * Constructs a new DeviceMetrics.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IDeviceMetrics)

    /** 0-100 (>100 means powered) */
    public batteryLevel?: number | null

    /** Voltage measured */
    public voltage?: number | null

    /** Utilization for the current channel, including well formed TX, RX and malformed RX (aka noise). */
    public channelUtilization?: number | null

    /** Percent of airtime for transmission used within the last hour. */
    public airUtilTx?: number | null

    /** How long the device has been running since the last reboot (in seconds) */
    public uptimeSeconds?: number | null

    /** DeviceMetrics _batteryLevel. */
    public _batteryLevel?: 'batteryLevel'

    /** DeviceMetrics _voltage. */
    public _voltage?: 'voltage'

    /** DeviceMetrics _channelUtilization. */
    public _channelUtilization?: 'channelUtilization'

    /** DeviceMetrics _airUtilTx. */
    public _airUtilTx?: 'airUtilTx'

    /** DeviceMetrics _uptimeSeconds. */
    public _uptimeSeconds?: 'uptimeSeconds'

    /**
     * Encodes the specified DeviceMetrics message. Does not implicitly {@link meshtastic.DeviceMetrics.verify|verify} messages.
     * @param message DeviceMetrics message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IDeviceMetrics, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a DeviceMetrics message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeviceMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.DeviceMetrics
  }

  /** Properties of an EnvironmentMetrics. */
  interface IEnvironmentMetrics {
    /** Temperature measured */
    temperature?: number | null

    /** Relative humidity percent measured */
    relativeHumidity?: number | null

    /** Barometric pressure in hPA measured */
    barometricPressure?: number | null

    /** Gas resistance in MOhm measured */
    gasResistance?: number | null

    /** Voltage measured (To be depreciated in favor of PowerMetrics in Meshtastic 3.x) */
    voltage?: number | null

    /** Current measured (To be depreciated in favor of PowerMetrics in Meshtastic 3.x) */
    current?: number | null

    /**
     * relative scale IAQ value as measured by Bosch BME680 . value 0-500.
     * Belongs to Air Quality but is not particle but VOC measurement. Other VOC values can also be put in here.
     */
    iaq?: number | null

    /** RCWL9620 Doppler Radar Distance Sensor, used for water level detection. Float value in mm. */
    distance?: number | null

    /** VEML7700 high accuracy ambient light(Lux) digital 16-bit resolution sensor. */
    lux?: number | null

    /** VEML7700 high accuracy white light(irradiance) not calibrated digital 16-bit resolution sensor. */
    whiteLux?: number | null

    /** Infrared lux */
    irLux?: number | null

    /** Ultraviolet lux */
    uvLux?: number | null

    /**
     * Wind direction in degrees
     * 0 degrees = North, 90 = East, etc...
     */
    windDirection?: number | null

    /** Wind speed in m/s */
    windSpeed?: number | null

    /** Weight in KG */
    weight?: number | null

    /** Wind gust in m/s */
    windGust?: number | null

    /** Wind lull in m/s */
    windLull?: number | null

    /** Radiation in µR/h */
    radiation?: number | null

    /** Rainfall in the last hour in mm */
    rainfall_1h?: number | null

    /** Rainfall in the last 24 hours in mm */
    rainfall_24h?: number | null

    /** Soil moisture measured (% 1-100) */
    soilMoisture?: number | null

    /** Soil temperature measured (*C) */
    soilTemperature?: number | null
  }

  /** Weather station or other environmental metrics */
  class EnvironmentMetrics implements IEnvironmentMetrics {
    /**
     * Constructs a new EnvironmentMetrics.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IEnvironmentMetrics)

    /** Temperature measured */
    public temperature?: number | null

    /** Relative humidity percent measured */
    public relativeHumidity?: number | null

    /** Barometric pressure in hPA measured */
    public barometricPressure?: number | null

    /** Gas resistance in MOhm measured */
    public gasResistance?: number | null

    /** Voltage measured (To be depreciated in favor of PowerMetrics in Meshtastic 3.x) */
    public voltage?: number | null

    /** Current measured (To be depreciated in favor of PowerMetrics in Meshtastic 3.x) */
    public current?: number | null

    /**
     * relative scale IAQ value as measured by Bosch BME680 . value 0-500.
     * Belongs to Air Quality but is not particle but VOC measurement. Other VOC values can also be put in here.
     */
    public iaq?: number | null

    /** RCWL9620 Doppler Radar Distance Sensor, used for water level detection. Float value in mm. */
    public distance?: number | null

    /** VEML7700 high accuracy ambient light(Lux) digital 16-bit resolution sensor. */
    public lux?: number | null

    /** VEML7700 high accuracy white light(irradiance) not calibrated digital 16-bit resolution sensor. */
    public whiteLux?: number | null

    /** Infrared lux */
    public irLux?: number | null

    /** Ultraviolet lux */
    public uvLux?: number | null

    /**
     * Wind direction in degrees
     * 0 degrees = North, 90 = East, etc...
     */
    public windDirection?: number | null

    /** Wind speed in m/s */
    public windSpeed?: number | null

    /** Weight in KG */
    public weight?: number | null

    /** Wind gust in m/s */
    public windGust?: number | null

    /** Wind lull in m/s */
    public windLull?: number | null

    /** Radiation in µR/h */
    public radiation?: number | null

    /** Rainfall in the last hour in mm */
    public rainfall_1h?: number | null

    /** Rainfall in the last 24 hours in mm */
    public rainfall_24h?: number | null

    /** Soil moisture measured (% 1-100) */
    public soilMoisture?: number | null

    /** Soil temperature measured (*C) */
    public soilTemperature?: number | null

    /** EnvironmentMetrics _temperature. */
    public _temperature?: 'temperature'

    /** EnvironmentMetrics _relativeHumidity. */
    public _relativeHumidity?: 'relativeHumidity'

    /** EnvironmentMetrics _barometricPressure. */
    public _barometricPressure?: 'barometricPressure'

    /** EnvironmentMetrics _gasResistance. */
    public _gasResistance?: 'gasResistance'

    /** EnvironmentMetrics _voltage. */
    public _voltage?: 'voltage'

    /** EnvironmentMetrics _current. */
    public _current?: 'current'

    /** EnvironmentMetrics _iaq. */
    public _iaq?: 'iaq'

    /** EnvironmentMetrics _distance. */
    public _distance?: 'distance'

    /** EnvironmentMetrics _lux. */
    public _lux?: 'lux'

    /** EnvironmentMetrics _whiteLux. */
    public _whiteLux?: 'whiteLux'

    /** EnvironmentMetrics _irLux. */
    public _irLux?: 'irLux'

    /** EnvironmentMetrics _uvLux. */
    public _uvLux?: 'uvLux'

    /** EnvironmentMetrics _windDirection. */
    public _windDirection?: 'windDirection'

    /** EnvironmentMetrics _windSpeed. */
    public _windSpeed?: 'windSpeed'

    /** EnvironmentMetrics _weight. */
    public _weight?: 'weight'

    /** EnvironmentMetrics _windGust. */
    public _windGust?: 'windGust'

    /** EnvironmentMetrics _windLull. */
    public _windLull?: 'windLull'

    /** EnvironmentMetrics _radiation. */
    public _radiation?: 'radiation'

    /** EnvironmentMetrics _rainfall_1h. */
    public _rainfall_1h?: 'rainfall_1h'

    /** EnvironmentMetrics _rainfall_24h. */
    public _rainfall_24h?: 'rainfall_24h'

    /** EnvironmentMetrics _soilMoisture. */
    public _soilMoisture?: 'soilMoisture'

    /** EnvironmentMetrics _soilTemperature. */
    public _soilTemperature?: 'soilTemperature'

    /**
     * Encodes the specified EnvironmentMetrics message. Does not implicitly {@link meshtastic.EnvironmentMetrics.verify|verify} messages.
     * @param message EnvironmentMetrics message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IEnvironmentMetrics, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes an EnvironmentMetrics message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns EnvironmentMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.EnvironmentMetrics
  }

  /** Properties of a PowerMetrics. */
  interface IPowerMetrics {
    /** Voltage (Ch1) */
    ch1Voltage?: number | null

    /** Current (Ch1) */
    ch1Current?: number | null

    /** Voltage (Ch2) */
    ch2Voltage?: number | null

    /** Current (Ch2) */
    ch2Current?: number | null

    /** Voltage (Ch3) */
    ch3Voltage?: number | null

    /** Current (Ch3) */
    ch3Current?: number | null

    /** Voltage (Ch4) */
    ch4Voltage?: number | null

    /** Current (Ch4) */
    ch4Current?: number | null

    /** Voltage (Ch5) */
    ch5Voltage?: number | null

    /** Current (Ch5) */
    ch5Current?: number | null

    /** Voltage (Ch6) */
    ch6Voltage?: number | null

    /** Current (Ch6) */
    ch6Current?: number | null

    /** Voltage (Ch7) */
    ch7Voltage?: number | null

    /** Current (Ch7) */
    ch7Current?: number | null

    /** Voltage (Ch8) */
    ch8Voltage?: number | null

    /** Current (Ch8) */
    ch8Current?: number | null
  }

  /** Power Metrics (voltage / current / etc) */
  class PowerMetrics implements IPowerMetrics {
    /**
     * Constructs a new PowerMetrics.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IPowerMetrics)

    /** Voltage (Ch1) */
    public ch1Voltage?: number | null

    /** Current (Ch1) */
    public ch1Current?: number | null

    /** Voltage (Ch2) */
    public ch2Voltage?: number | null

    /** Current (Ch2) */
    public ch2Current?: number | null

    /** Voltage (Ch3) */
    public ch3Voltage?: number | null

    /** Current (Ch3) */
    public ch3Current?: number | null

    /** Voltage (Ch4) */
    public ch4Voltage?: number | null

    /** Current (Ch4) */
    public ch4Current?: number | null

    /** Voltage (Ch5) */
    public ch5Voltage?: number | null

    /** Current (Ch5) */
    public ch5Current?: number | null

    /** Voltage (Ch6) */
    public ch6Voltage?: number | null

    /** Current (Ch6) */
    public ch6Current?: number | null

    /** Voltage (Ch7) */
    public ch7Voltage?: number | null

    /** Current (Ch7) */
    public ch7Current?: number | null

    /** Voltage (Ch8) */
    public ch8Voltage?: number | null

    /** Current (Ch8) */
    public ch8Current?: number | null

    /** PowerMetrics _ch1Voltage. */
    public _ch1Voltage?: 'ch1Voltage'

    /** PowerMetrics _ch1Current. */
    public _ch1Current?: 'ch1Current'

    /** PowerMetrics _ch2Voltage. */
    public _ch2Voltage?: 'ch2Voltage'

    /** PowerMetrics _ch2Current. */
    public _ch2Current?: 'ch2Current'

    /** PowerMetrics _ch3Voltage. */
    public _ch3Voltage?: 'ch3Voltage'

    /** PowerMetrics _ch3Current. */
    public _ch3Current?: 'ch3Current'

    /** PowerMetrics _ch4Voltage. */
    public _ch4Voltage?: 'ch4Voltage'

    /** PowerMetrics _ch4Current. */
    public _ch4Current?: 'ch4Current'

    /** PowerMetrics _ch5Voltage. */
    public _ch5Voltage?: 'ch5Voltage'

    /** PowerMetrics _ch5Current. */
    public _ch5Current?: 'ch5Current'

    /** PowerMetrics _ch6Voltage. */
    public _ch6Voltage?: 'ch6Voltage'

    /** PowerMetrics _ch6Current. */
    public _ch6Current?: 'ch6Current'

    /** PowerMetrics _ch7Voltage. */
    public _ch7Voltage?: 'ch7Voltage'

    /** PowerMetrics _ch7Current. */
    public _ch7Current?: 'ch7Current'

    /** PowerMetrics _ch8Voltage. */
    public _ch8Voltage?: 'ch8Voltage'

    /** PowerMetrics _ch8Current. */
    public _ch8Current?: 'ch8Current'

    /**
     * Encodes the specified PowerMetrics message. Does not implicitly {@link meshtastic.PowerMetrics.verify|verify} messages.
     * @param message PowerMetrics message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IPowerMetrics, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a PowerMetrics message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PowerMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.PowerMetrics
  }

  /** Properties of an AirQualityMetrics. */
  interface IAirQualityMetrics {
    /** Concentration Units Standard PM1.0 in ug/m3 */
    pm10Standard?: number | null

    /** Concentration Units Standard PM2.5 in ug/m3 */
    pm25Standard?: number | null

    /** Concentration Units Standard PM10.0 in ug/m3 */
    pm100Standard?: number | null

    /** Concentration Units Environmental PM1.0 in ug/m3 */
    pm10Environmental?: number | null

    /** Concentration Units Environmental PM2.5 in ug/m3 */
    pm25Environmental?: number | null

    /** Concentration Units Environmental PM10.0 in ug/m3 */
    pm100Environmental?: number | null

    /** 0.3um Particle Count in #/0.1l */
    particles_03um?: number | null

    /** 0.5um Particle Count in #/0.1l */
    particles_05um?: number | null

    /** 1.0um Particle Count in #/0.1l */
    particles_10um?: number | null

    /** 2.5um Particle Count in #/0.1l */
    particles_25um?: number | null

    /** 5.0um Particle Count in #/0.1l */
    particles_50um?: number | null

    /** 10.0um Particle Count in #/0.1l */
    particles_100um?: number | null

    /** CO2 concentration in ppm */
    co2?: number | null

    /** CO2 sensor temperature in degC */
    co2Temperature?: number | null

    /** CO2 sensor relative humidity in % */
    co2Humidity?: number | null

    /** Formaldehyde sensor formaldehyde concentration in ppb */
    formFormaldehyde?: number | null

    /** Formaldehyde sensor relative humidity in %RH */
    formHumidity?: number | null

    /** Formaldehyde sensor temperature in degrees Celsius */
    formTemperature?: number | null

    /** Concentration Units Standard PM4.0 in ug/m3 */
    pm40Standard?: number | null

    /** 4.0um Particle Count in #/0.1l */
    particles_40um?: number | null

    /** PM Sensor Temperature */
    pmTemperature?: number | null

    /** PM Sensor humidity */
    pmHumidity?: number | null

    /** PM Sensor VOC Index */
    pmVocIdx?: number | null

    /** PM Sensor NOx Index */
    pmNoxIdx?: number | null

    /** Typical Particle Size in um */
    particlesTps?: number | null
  }

  /** Air quality metrics */
  class AirQualityMetrics implements IAirQualityMetrics {
    /**
     * Constructs a new AirQualityMetrics.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IAirQualityMetrics)

    /** Concentration Units Standard PM1.0 in ug/m3 */
    public pm10Standard?: number | null

    /** Concentration Units Standard PM2.5 in ug/m3 */
    public pm25Standard?: number | null

    /** Concentration Units Standard PM10.0 in ug/m3 */
    public pm100Standard?: number | null

    /** Concentration Units Environmental PM1.0 in ug/m3 */
    public pm10Environmental?: number | null

    /** Concentration Units Environmental PM2.5 in ug/m3 */
    public pm25Environmental?: number | null

    /** Concentration Units Environmental PM10.0 in ug/m3 */
    public pm100Environmental?: number | null

    /** 0.3um Particle Count in #/0.1l */
    public particles_03um?: number | null

    /** 0.5um Particle Count in #/0.1l */
    public particles_05um?: number | null

    /** 1.0um Particle Count in #/0.1l */
    public particles_10um?: number | null

    /** 2.5um Particle Count in #/0.1l */
    public particles_25um?: number | null

    /** 5.0um Particle Count in #/0.1l */
    public particles_50um?: number | null

    /** 10.0um Particle Count in #/0.1l */
    public particles_100um?: number | null

    /** CO2 concentration in ppm */
    public co2?: number | null

    /** CO2 sensor temperature in degC */
    public co2Temperature?: number | null

    /** CO2 sensor relative humidity in % */
    public co2Humidity?: number | null

    /** Formaldehyde sensor formaldehyde concentration in ppb */
    public formFormaldehyde?: number | null

    /** Formaldehyde sensor relative humidity in %RH */
    public formHumidity?: number | null

    /** Formaldehyde sensor temperature in degrees Celsius */
    public formTemperature?: number | null

    /** Concentration Units Standard PM4.0 in ug/m3 */
    public pm40Standard?: number | null

    /** 4.0um Particle Count in #/0.1l */
    public particles_40um?: number | null

    /** PM Sensor Temperature */
    public pmTemperature?: number | null

    /** PM Sensor humidity */
    public pmHumidity?: number | null

    /** PM Sensor VOC Index */
    public pmVocIdx?: number | null

    /** PM Sensor NOx Index */
    public pmNoxIdx?: number | null

    /** Typical Particle Size in um */
    public particlesTps?: number | null

    /** AirQualityMetrics _pm10Standard. */
    public _pm10Standard?: 'pm10Standard'

    /** AirQualityMetrics _pm25Standard. */
    public _pm25Standard?: 'pm25Standard'

    /** AirQualityMetrics _pm100Standard. */
    public _pm100Standard?: 'pm100Standard'

    /** AirQualityMetrics _pm10Environmental. */
    public _pm10Environmental?: 'pm10Environmental'

    /** AirQualityMetrics _pm25Environmental. */
    public _pm25Environmental?: 'pm25Environmental'

    /** AirQualityMetrics _pm100Environmental. */
    public _pm100Environmental?: 'pm100Environmental'

    /** AirQualityMetrics _particles_03um. */
    public _particles_03um?: 'particles_03um'

    /** AirQualityMetrics _particles_05um. */
    public _particles_05um?: 'particles_05um'

    /** AirQualityMetrics _particles_10um. */
    public _particles_10um?: 'particles_10um'

    /** AirQualityMetrics _particles_25um. */
    public _particles_25um?: 'particles_25um'

    /** AirQualityMetrics _particles_50um. */
    public _particles_50um?: 'particles_50um'

    /** AirQualityMetrics _particles_100um. */
    public _particles_100um?: 'particles_100um'

    /** AirQualityMetrics _co2. */
    public _co2?: 'co2'

    /** AirQualityMetrics _co2Temperature. */
    public _co2Temperature?: 'co2Temperature'

    /** AirQualityMetrics _co2Humidity. */
    public _co2Humidity?: 'co2Humidity'

    /** AirQualityMetrics _formFormaldehyde. */
    public _formFormaldehyde?: 'formFormaldehyde'

    /** AirQualityMetrics _formHumidity. */
    public _formHumidity?: 'formHumidity'

    /** AirQualityMetrics _formTemperature. */
    public _formTemperature?: 'formTemperature'

    /** AirQualityMetrics _pm40Standard. */
    public _pm40Standard?: 'pm40Standard'

    /** AirQualityMetrics _particles_40um. */
    public _particles_40um?: 'particles_40um'

    /** AirQualityMetrics _pmTemperature. */
    public _pmTemperature?: 'pmTemperature'

    /** AirQualityMetrics _pmHumidity. */
    public _pmHumidity?: 'pmHumidity'

    /** AirQualityMetrics _pmVocIdx. */
    public _pmVocIdx?: 'pmVocIdx'

    /** AirQualityMetrics _pmNoxIdx. */
    public _pmNoxIdx?: 'pmNoxIdx'

    /** AirQualityMetrics _particlesTps. */
    public _particlesTps?: 'particlesTps'

    /**
     * Encodes the specified AirQualityMetrics message. Does not implicitly {@link meshtastic.AirQualityMetrics.verify|verify} messages.
     * @param message AirQualityMetrics message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IAirQualityMetrics, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes an AirQualityMetrics message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AirQualityMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.AirQualityMetrics
  }

  /** Properties of a LocalStats. */
  interface ILocalStats {
    /** How long the device has been running since the last reboot (in seconds) */
    uptimeSeconds?: number | null

    /** Utilization for the current channel, including well formed TX, RX and malformed RX (aka noise). */
    channelUtilization?: number | null

    /** Percent of airtime for transmission used within the last hour. */
    airUtilTx?: number | null

    /** Number of packets sent */
    numPacketsTx?: number | null

    /** Number of packets received (both good and bad) */
    numPacketsRx?: number | null

    /** Number of packets received that are malformed or violate the protocol */
    numPacketsRxBad?: number | null

    /** Number of nodes online (in the past 2 hours) */
    numOnlineNodes?: number | null

    /** Number of nodes total */
    numTotalNodes?: number | null

    /**
     * Number of received packets that were duplicates (due to multiple nodes relaying).
     * If this number is high, there are nodes in the mesh relaying packets when it's unnecessary, for example due to the ROUTER/REPEATER role.
     */
    numRxDupe?: number | null

    /** Number of packets we transmitted that were a relay for others (not originating from ourselves). */
    numTxRelay?: number | null

    /**
     * Number of times we canceled a packet to be relayed, because someone else did it before us.
     * This will always be zero for ROUTERs/REPEATERs. If this number is high, some other node(s) is/are relaying faster than you.
     */
    numTxRelayCanceled?: number | null

    /** Number of bytes used in the heap */
    heapTotalBytes?: number | null

    /** Number of bytes free in the heap */
    heapFreeBytes?: number | null
  }

  /** Local device mesh statistics */
  class LocalStats implements ILocalStats {
    /**
     * Constructs a new LocalStats.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.ILocalStats)

    /** How long the device has been running since the last reboot (in seconds) */
    public uptimeSeconds: number

    /** Utilization for the current channel, including well formed TX, RX and malformed RX (aka noise). */
    public channelUtilization: number

    /** Percent of airtime for transmission used within the last hour. */
    public airUtilTx: number

    /** Number of packets sent */
    public numPacketsTx: number

    /** Number of packets received (both good and bad) */
    public numPacketsRx: number

    /** Number of packets received that are malformed or violate the protocol */
    public numPacketsRxBad: number

    /** Number of nodes online (in the past 2 hours) */
    public numOnlineNodes: number

    /** Number of nodes total */
    public numTotalNodes: number

    /**
     * Number of received packets that were duplicates (due to multiple nodes relaying).
     * If this number is high, there are nodes in the mesh relaying packets when it's unnecessary, for example due to the ROUTER/REPEATER role.
     */
    public numRxDupe: number

    /** Number of packets we transmitted that were a relay for others (not originating from ourselves). */
    public numTxRelay: number

    /**
     * Number of times we canceled a packet to be relayed, because someone else did it before us.
     * This will always be zero for ROUTERs/REPEATERs. If this number is high, some other node(s) is/are relaying faster than you.
     */
    public numTxRelayCanceled: number

    /** Number of bytes used in the heap */
    public heapTotalBytes: number

    /** Number of bytes free in the heap */
    public heapFreeBytes: number

    /**
     * Encodes the specified LocalStats message. Does not implicitly {@link meshtastic.LocalStats.verify|verify} messages.
     * @param message LocalStats message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.ILocalStats, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a LocalStats message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LocalStats
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.LocalStats
  }

  /** Properties of a HealthMetrics. */
  interface IHealthMetrics {
    /** Heart rate (beats per minute) */
    heartBpm?: number | null

    /** SpO2 (blood oxygen saturation) level */
    spO2?: number | null

    /** Body temperature in degrees Celsius */
    temperature?: number | null
  }

  /** Health telemetry metrics */
  class HealthMetrics implements IHealthMetrics {
    /**
     * Constructs a new HealthMetrics.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IHealthMetrics)

    /** Heart rate (beats per minute) */
    public heartBpm?: number | null

    /** SpO2 (blood oxygen saturation) level */
    public spO2?: number | null

    /** Body temperature in degrees Celsius */
    public temperature?: number | null

    /** HealthMetrics _heartBpm. */
    public _heartBpm?: 'heartBpm'

    /** HealthMetrics _spO2. */
    public _spO2?: 'spO2'

    /** HealthMetrics _temperature. */
    public _temperature?: 'temperature'

    /**
     * Encodes the specified HealthMetrics message. Does not implicitly {@link meshtastic.HealthMetrics.verify|verify} messages.
     * @param message HealthMetrics message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IHealthMetrics, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a HealthMetrics message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns HealthMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.HealthMetrics
  }

  /** Properties of a HostMetrics. */
  interface IHostMetrics {
    /** Host system uptime */
    uptimeSeconds?: number | null

    /** Host system free memory */
    freememBytes?: number | Long | null

    /** Host system disk space free for / */
    diskfree1Bytes?: number | Long | null

    /** Secondary system disk space free */
    diskfree2Bytes?: number | Long | null

    /** Tertiary disk space free */
    diskfree3Bytes?: number | Long | null

    /** Host system one minute load in 1/100ths */
    load1?: number | null

    /** Host system five minute load  in 1/100ths */
    load5?: number | null

    /** Host system fifteen minute load  in 1/100ths */
    load15?: number | null

    /**
     * Optional User-provided string for arbitrary host system information
     * that doesn't make sense as a dedicated entry.
     */
    userString?: string | null
  }

  /** Linux host metrics */
  class HostMetrics implements IHostMetrics {
    /**
     * Constructs a new HostMetrics.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IHostMetrics)

    /** Host system uptime */
    public uptimeSeconds: number

    /** Host system free memory */
    public freememBytes: number | Long

    /** Host system disk space free for / */
    public diskfree1Bytes: number | Long

    /** Secondary system disk space free */
    public diskfree2Bytes?: number | Long | null

    /** Tertiary disk space free */
    public diskfree3Bytes?: number | Long | null

    /** Host system one minute load in 1/100ths */
    public load1: number

    /** Host system five minute load  in 1/100ths */
    public load5: number

    /** Host system fifteen minute load  in 1/100ths */
    public load15: number

    /**
     * Optional User-provided string for arbitrary host system information
     * that doesn't make sense as a dedicated entry.
     */
    public userString?: string | null

    /** HostMetrics _diskfree2Bytes. */
    public _diskfree2Bytes?: 'diskfree2Bytes'

    /** HostMetrics _diskfree3Bytes. */
    public _diskfree3Bytes?: 'diskfree3Bytes'

    /** HostMetrics _userString. */
    public _userString?: 'userString'

    /**
     * Encodes the specified HostMetrics message. Does not implicitly {@link meshtastic.HostMetrics.verify|verify} messages.
     * @param message HostMetrics message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IHostMetrics, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a HostMetrics message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns HostMetrics
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.HostMetrics
  }

  /** Properties of a Telemetry. */
  interface ITelemetry {
    /** Seconds since 1970 - or 0 for unknown/unset */
    time?: number | null

    /** Key native device metrics such as battery level */
    deviceMetrics?: meshtastic.IDeviceMetrics | null

    /** Weather station or other environmental metrics */
    environmentMetrics?: meshtastic.IEnvironmentMetrics | null

    /** Air quality metrics */
    airQualityMetrics?: meshtastic.IAirQualityMetrics | null

    /** Power Metrics */
    powerMetrics?: meshtastic.IPowerMetrics | null

    /** Local device mesh statistics */
    localStats?: meshtastic.ILocalStats | null

    /** Health telemetry metrics */
    healthMetrics?: meshtastic.IHealthMetrics | null

    /** Linux host metrics */
    hostMetrics?: meshtastic.IHostMetrics | null
  }

  /** Types of Measurements the telemetry module is equipped to handle */
  class Telemetry implements ITelemetry {
    /**
     * Constructs a new Telemetry.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.ITelemetry)

    /** Seconds since 1970 - or 0 for unknown/unset */
    public time: number

    /** Key native device metrics such as battery level */
    public deviceMetrics?: meshtastic.IDeviceMetrics | null

    /** Weather station or other environmental metrics */
    public environmentMetrics?: meshtastic.IEnvironmentMetrics | null

    /** Air quality metrics */
    public airQualityMetrics?: meshtastic.IAirQualityMetrics | null

    /** Power Metrics */
    public powerMetrics?: meshtastic.IPowerMetrics | null

    /** Local device mesh statistics */
    public localStats?: meshtastic.ILocalStats | null

    /** Health telemetry metrics */
    public healthMetrics?: meshtastic.IHealthMetrics | null

    /** Linux host metrics */
    public hostMetrics?: meshtastic.IHostMetrics | null

    /** Telemetry variant. */
    public variant?:
      | 'deviceMetrics'
      | 'environmentMetrics'
      | 'airQualityMetrics'
      | 'powerMetrics'
      | 'localStats'
      | 'healthMetrics'
      | 'hostMetrics'

    /**
     * Encodes the specified Telemetry message. Does not implicitly {@link meshtastic.Telemetry.verify|verify} messages.
     * @param message Telemetry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.ITelemetry, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Telemetry message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Telemetry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Telemetry
  }

  /** Supported I2C Sensors for telemetry in Meshtastic */
  enum TelemetrySensorType {
    SENSOR_UNSET = 0,
    BME280 = 1,
    BME680 = 2,
    MCP9808 = 3,
    INA260 = 4,
    INA219 = 5,
    BMP280 = 6,
    SHTC3 = 7,
    LPS22 = 8,
    QMC6310 = 9,
    QMI8658 = 10,
    QMC5883L = 11,
    SHT31 = 12,
    PMSA003I = 13,
    INA3221 = 14,
    BMP085 = 15,
    RCWL9620 = 16,
    SHT4X = 17,
    VEML7700 = 18,
    MLX90632 = 19,
    OPT3001 = 20,
    LTR390UV = 21,
    TSL25911FN = 22,
    AHT10 = 23,
    DFROBOT_LARK = 24,
    NAU7802 = 25,
    BMP3XX = 26,
    ICM20948 = 27,
    MAX17048 = 28,
    CUSTOM_SENSOR = 29,
    MAX30102 = 30,
    MLX90614 = 31,
    SCD4X = 32,
    RADSENS = 33,
    INA226 = 34,
    DFROBOT_RAIN = 35,
    DPS310 = 36,
    RAK12035 = 37,
    MAX17261 = 38,
    PCT2075 = 39,
    ADS1X15 = 40,
    ADS1X15_ALT = 41,
    SFA30 = 42,
    SEN5X = 43,
    TSL2561 = 44,
  }

  /** Properties of a Nau7802Config. */
  interface INau7802Config {
    /** The offset setting for the NAU7802 */
    zeroOffset?: number | null

    /** The calibration factor for the NAU7802 */
    calibrationFactor?: number | null
  }

  /** NAU7802 Telemetry configuration, for saving to flash */
  class Nau7802Config implements INau7802Config {
    /**
     * Constructs a new Nau7802Config.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.INau7802Config)

    /** The offset setting for the NAU7802 */
    public zeroOffset: number

    /** The calibration factor for the NAU7802 */
    public calibrationFactor: number

    /**
     * Encodes the specified Nau7802Config message. Does not implicitly {@link meshtastic.Nau7802Config.verify|verify} messages.
     * @param message Nau7802Config message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.INau7802Config, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Nau7802Config message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Nau7802Config
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.Nau7802Config
  }

  /** Properties of a XModem. */
  interface IXModem {
    /** XModem control */
    control?: meshtastic.XModem.Control | null

    /** XModem seq */
    seq?: number | null

    /** XModem crc16 */
    crc16?: number | null

    /** XModem buffer */
    buffer?: Uint8Array | null
  }

  /** Represents a XModem. */
  class XModem implements IXModem {
    /**
     * Constructs a new XModem.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IXModem)

    /** XModem control. */
    public control: meshtastic.XModem.Control

    /** XModem seq. */
    public seq: number

    /** XModem crc16. */
    public crc16: number

    /** XModem buffer. */
    public buffer: Uint8Array

    /**
     * Encodes the specified XModem message. Does not implicitly {@link meshtastic.XModem.verify|verify} messages.
     * @param message XModem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IXModem, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a XModem message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns XModem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.XModem
  }

  namespace XModem {
    /** Control enum. */
    enum Control {
      NUL = 0,
      SOH = 1,
      STX = 2,
      EOT = 4,
      ACK = 6,
      NAK = 21,
      CAN = 24,
      CTRLZ = 26,
    }
  }

  /** Properties of a DeviceProfile. */
  interface IDeviceProfile {
    /** Long name for the node */
    longName?: string | null

    /** Short name of the node */
    shortName?: string | null

    /** The url of the channels from our node */
    channelUrl?: string | null

    /** The Config of the node */
    config?: meshtastic.ILocalConfig | null

    /** The ModuleConfig of the node */
    moduleConfig?: meshtastic.ILocalModuleConfig | null

    /** Fixed position data */
    fixedPosition?: meshtastic.IPosition | null

    /** Ringtone for ExternalNotification */
    ringtone?: string | null

    /** Predefined messages for CannedMessage */
    cannedMessages?: string | null
  }

  /**
   * This abstraction is used to contain any configuration for provisioning a node on any client.
   * It is useful for importing and exporting configurations.
   */
  class DeviceProfile implements IDeviceProfile {
    /**
     * Constructs a new DeviceProfile.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IDeviceProfile)

    /** Long name for the node */
    public longName?: string | null

    /** Short name of the node */
    public shortName?: string | null

    /** The url of the channels from our node */
    public channelUrl?: string | null

    /** The Config of the node */
    public config?: meshtastic.ILocalConfig | null

    /** The ModuleConfig of the node */
    public moduleConfig?: meshtastic.ILocalModuleConfig | null

    /** Fixed position data */
    public fixedPosition?: meshtastic.IPosition | null

    /** Ringtone for ExternalNotification */
    public ringtone?: string | null

    /** Predefined messages for CannedMessage */
    public cannedMessages?: string | null

    /** DeviceProfile _longName. */
    public _longName?: 'longName'

    /** DeviceProfile _shortName. */
    public _shortName?: 'shortName'

    /** DeviceProfile _channelUrl. */
    public _channelUrl?: 'channelUrl'

    /** DeviceProfile _config. */
    public _config?: 'config'

    /** DeviceProfile _moduleConfig. */
    public _moduleConfig?: 'moduleConfig'

    /** DeviceProfile _fixedPosition. */
    public _fixedPosition?: 'fixedPosition'

    /** DeviceProfile _ringtone. */
    public _ringtone?: 'ringtone'

    /** DeviceProfile _cannedMessages. */
    public _cannedMessages?: 'cannedMessages'

    /**
     * Encodes the specified DeviceProfile message. Does not implicitly {@link meshtastic.DeviceProfile.verify|verify} messages.
     * @param message DeviceProfile message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IDeviceProfile, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a DeviceProfile message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeviceProfile
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.DeviceProfile
  }

  /** Properties of a LocalConfig. */
  interface ILocalConfig {
    /** The part of the config that is specific to the Device */
    device?: meshtastic.Config.IDeviceConfig | null

    /** The part of the config that is specific to the GPS Position */
    position?: meshtastic.Config.IPositionConfig | null

    /** The part of the config that is specific to the Power settings */
    power?: meshtastic.Config.IPowerConfig | null

    /** The part of the config that is specific to the Wifi Settings */
    network?: meshtastic.Config.INetworkConfig | null

    /** The part of the config that is specific to the Display */
    display?: meshtastic.Config.IDisplayConfig | null

    /** The part of the config that is specific to the Lora Radio */
    lora?: meshtastic.Config.ILoRaConfig | null

    /** The part of the config that is specific to the Bluetooth settings */
    bluetooth?: meshtastic.Config.IBluetoothConfig | null

    /**
     * A version integer used to invalidate old save files when we make
     * incompatible changes This integer is set at build time and is private to
     * NodeDB.cpp in the device code.
     */
    version?: number | null

    /** The part of the config that is specific to Security settings */
    security?: meshtastic.Config.ISecurityConfig | null
  }

  /** Represents a LocalConfig. */
  class LocalConfig implements ILocalConfig {
    /**
     * Constructs a new LocalConfig.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.ILocalConfig)

    /** The part of the config that is specific to the Device */
    public device?: meshtastic.Config.IDeviceConfig | null

    /** The part of the config that is specific to the GPS Position */
    public position?: meshtastic.Config.IPositionConfig | null

    /** The part of the config that is specific to the Power settings */
    public power?: meshtastic.Config.IPowerConfig | null

    /** The part of the config that is specific to the Wifi Settings */
    public network?: meshtastic.Config.INetworkConfig | null

    /** The part of the config that is specific to the Display */
    public display?: meshtastic.Config.IDisplayConfig | null

    /** The part of the config that is specific to the Lora Radio */
    public lora?: meshtastic.Config.ILoRaConfig | null

    /** The part of the config that is specific to the Bluetooth settings */
    public bluetooth?: meshtastic.Config.IBluetoothConfig | null

    /**
     * A version integer used to invalidate old save files when we make
     * incompatible changes This integer is set at build time and is private to
     * NodeDB.cpp in the device code.
     */
    public version: number

    /** The part of the config that is specific to Security settings */
    public security?: meshtastic.Config.ISecurityConfig | null

    /**
     * Encodes the specified LocalConfig message. Does not implicitly {@link meshtastic.LocalConfig.verify|verify} messages.
     * @param message LocalConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.ILocalConfig, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a LocalConfig message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LocalConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.LocalConfig
  }

  /** Properties of a LocalModuleConfig. */
  interface ILocalModuleConfig {
    /** The part of the config that is specific to the MQTT module */
    mqtt?: meshtastic.ModuleConfig.IMQTTConfig | null

    /** The part of the config that is specific to the Serial module */
    serial?: meshtastic.ModuleConfig.ISerialConfig | null

    /** The part of the config that is specific to the ExternalNotification module */
    externalNotification?: meshtastic.ModuleConfig.IExternalNotificationConfig | null

    /** The part of the config that is specific to the Store & Forward module */
    storeForward?: meshtastic.ModuleConfig.IStoreForwardConfig | null

    /** The part of the config that is specific to the RangeTest module */
    rangeTest?: meshtastic.ModuleConfig.IRangeTestConfig | null

    /** The part of the config that is specific to the Telemetry module */
    telemetry?: meshtastic.ModuleConfig.ITelemetryConfig | null

    /** The part of the config that is specific to the Canned Message module */
    cannedMessage?: meshtastic.ModuleConfig.ICannedMessageConfig | null

    /** The part of the config that is specific to the Audio module */
    audio?: meshtastic.ModuleConfig.IAudioConfig | null

    /** The part of the config that is specific to the Remote Hardware module */
    remoteHardware?: meshtastic.ModuleConfig.IRemoteHardwareConfig | null

    /** The part of the config that is specific to the Neighbor Info module */
    neighborInfo?: meshtastic.ModuleConfig.INeighborInfoConfig | null

    /** The part of the config that is specific to the Ambient Lighting module */
    ambientLighting?: meshtastic.ModuleConfig.IAmbientLightingConfig | null

    /** The part of the config that is specific to the Detection Sensor module */
    detectionSensor?: meshtastic.ModuleConfig.IDetectionSensorConfig | null

    /** Paxcounter Config */
    paxcounter?: meshtastic.ModuleConfig.IPaxcounterConfig | null

    /**
     * A version integer used to invalidate old save files when we make
     * incompatible changes This integer is set at build time and is private to
     * NodeDB.cpp in the device code.
     */
    version?: number | null
  }

  /** Represents a LocalModuleConfig. */
  class LocalModuleConfig implements ILocalModuleConfig {
    /**
     * Constructs a new LocalModuleConfig.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.ILocalModuleConfig)

    /** The part of the config that is specific to the MQTT module */
    public mqtt?: meshtastic.ModuleConfig.IMQTTConfig | null

    /** The part of the config that is specific to the Serial module */
    public serial?: meshtastic.ModuleConfig.ISerialConfig | null

    /** The part of the config that is specific to the ExternalNotification module */
    public externalNotification?: meshtastic.ModuleConfig.IExternalNotificationConfig | null

    /** The part of the config that is specific to the Store & Forward module */
    public storeForward?: meshtastic.ModuleConfig.IStoreForwardConfig | null

    /** The part of the config that is specific to the RangeTest module */
    public rangeTest?: meshtastic.ModuleConfig.IRangeTestConfig | null

    /** The part of the config that is specific to the Telemetry module */
    public telemetry?: meshtastic.ModuleConfig.ITelemetryConfig | null

    /** The part of the config that is specific to the Canned Message module */
    public cannedMessage?: meshtastic.ModuleConfig.ICannedMessageConfig | null

    /** The part of the config that is specific to the Audio module */
    public audio?: meshtastic.ModuleConfig.IAudioConfig | null

    /** The part of the config that is specific to the Remote Hardware module */
    public remoteHardware?: meshtastic.ModuleConfig.IRemoteHardwareConfig | null

    /** The part of the config that is specific to the Neighbor Info module */
    public neighborInfo?: meshtastic.ModuleConfig.INeighborInfoConfig | null

    /** The part of the config that is specific to the Ambient Lighting module */
    public ambientLighting?: meshtastic.ModuleConfig.IAmbientLightingConfig | null

    /** The part of the config that is specific to the Detection Sensor module */
    public detectionSensor?: meshtastic.ModuleConfig.IDetectionSensorConfig | null

    /** Paxcounter Config */
    public paxcounter?: meshtastic.ModuleConfig.IPaxcounterConfig | null

    /**
     * A version integer used to invalidate old save files when we make
     * incompatible changes This integer is set at build time and is private to
     * NodeDB.cpp in the device code.
     */
    public version: number

    /**
     * Encodes the specified LocalModuleConfig message. Does not implicitly {@link meshtastic.LocalModuleConfig.verify|verify} messages.
     * @param message LocalModuleConfig message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.ILocalModuleConfig, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a LocalModuleConfig message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LocalModuleConfig
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.LocalModuleConfig
  }

  /** Properties of a ChannelSet. */
  interface IChannelSet {
    /** Channel list with settings */
    settings?: meshtastic.IChannelSettings[] | null

    /** LoRa config */
    loraConfig?: meshtastic.Config.ILoRaConfig | null
  }

  /**
   * This is the most compact possible representation for a set of channels.
   * It includes only one PRIMARY channel (which must be first) and
   * any SECONDARY channels.
   * No DISABLED channels are included.
   * This abstraction is used only on the the 'app side' of the world (ie python, javascript and android etc) to show a group of Channels as a (long) URL
   */
  class ChannelSet implements IChannelSet {
    /**
     * Constructs a new ChannelSet.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IChannelSet)

    /** Channel list with settings */
    public settings: meshtastic.IChannelSettings[]

    /** LoRa config */
    public loraConfig?: meshtastic.Config.ILoRaConfig | null

    /**
     * Encodes the specified ChannelSet message. Does not implicitly {@link meshtastic.ChannelSet.verify|verify} messages.
     * @param message ChannelSet message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: meshtastic.IChannelSet, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a ChannelSet message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChannelSet
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): meshtastic.ChannelSet
  }
}
