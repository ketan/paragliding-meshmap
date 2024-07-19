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
    public channelId?: string | null

    /**
     * The sending gateway node ID. Can we use this to authenticate/prevent fake
     * nodeid impersonation for senders? - i.e. use gateway/mesh id (which is authenticated) + local node id as
     * the globally trusted nodenum
     */
    public gatewayId?: string | null

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
  }

  /** Information about a node intended to be reported unencrypted to a map using MQTT. */
  class MapReport implements IMapReport {
    /**
     * Constructs a new MapReport.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IMapReport)

    /** A full name for this user, i.e. "Kevin Hester" */
    public longName?: string | null

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     */
    public shortName?: string | null

    /** Role of the node that applies specific settings for a particular use-case */
    public role?: meshtastic.Config.DeviceConfig.Role | null

    /** Hardware model of the node, i.e. T-Beam, Heltec V3, etc... */
    public hwModel?: meshtastic.HardwareModel | null

    /** Device firmware version string */
    public firmwareVersion?: string | null

    /** The region code for the radio (US, CN, EU433, etc...) */
    public region?: meshtastic.Config.LoRaConfig.RegionCode | null

    /** Modem preset used by the radio (LongFast, MediumSlow, etc...) */
    public modemPreset?: meshtastic.Config.LoRaConfig.ModemPreset | null

    /**
     * Whether the node has a channel with default PSK and name (LongFast, MediumSlow, etc...)
     * and it uses the default frequency slot given the region and modem preset.
     */
    public hasDefaultChannel?: boolean | null

    /** Latitude: multiply by 1e-7 to get degrees in floating point */
    public latitudeI?: number | null

    /** Longitude: multiply by 1e-7 to get degrees in floating point */
    public longitudeI?: number | null

    /** Altitude in meters above MSL */
    public altitude?: number | null

    /** Indicates the bits of precision for latitude and longitude set by the sending node */
    public positionPrecision?: number | null

    /** Number of online nodes (heard in the last 2 hours) this node has in its list that were received locally (not via MQTT) */
    public numOnlineLocalNodes?: number | null

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

    /** Payload Variant */
    public payloadVariant?: 'device' | 'position' | 'power' | 'network' | 'display' | 'lora' | 'bluetooth'

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

      /** Disabling this will disable the SerialConsole by not initilizing the StreamAPI */
      serialEnabled?: boolean | null

      /**
       * By default we turn off logging as soon as an API client connects (to keep shared serial link quiet).
       * Set this to true to leave the debug log outputting even when API is active.
       */
      debugLogEnabled?: boolean | null

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
       */
      isManaged?: boolean | null

      /** Disables the triple-press of user button to enable or disable GPS */
      disableTripleClick?: boolean | null

      /** POSIX Timezone definition string from https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv. */
      tzdef?: string | null

      /** If true, disable the default blinking LED (LED_PIN) behavior on the device */
      ledHeartbeatDisabled?: boolean | null
    }

    /** Configuration */
    class DeviceConfig implements IDeviceConfig {
      /**
       * Constructs a new DeviceConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.IDeviceConfig)

      /** Sets the role of node */
      public role?: meshtastic.Config.DeviceConfig.Role | null

      /** Disabling this will disable the SerialConsole by not initilizing the StreamAPI */
      public serialEnabled?: boolean | null

      /**
       * By default we turn off logging as soon as an API client connects (to keep shared serial link quiet).
       * Set this to true to leave the debug log outputting even when API is active.
       */
      public debugLogEnabled?: boolean | null

      /**
       * For boards without a hard wired button, this is the pin number that will be used
       * Boards that have more than one button can swap the function with this one. defaults to BUTTON_PIN if defined.
       */
      public buttonGpio?: number | null

      /**
       * For boards without a PWM buzzer, this is the pin number that will be used
       * Defaults to PIN_BUZZER if defined.
       */
      public buzzerGpio?: number | null

      /** Sets the role of node */
      public rebroadcastMode?: meshtastic.Config.DeviceConfig.RebroadcastMode | null

      /**
       * Send our nodeinfo this often
       * Defaults to 900 Seconds (15 minutes)
       */
      public nodeInfoBroadcastSecs?: number | null

      /** Treat double tap interrupt on supported accelerometers as a button press if set to true */
      public doubleTapAsButtonPress?: boolean | null

      /**
       * If true, device is considered to be "managed" by a mesh administrator
       * Clients should then limit available configuration and administrative options inside the user interface
       */
      public isManaged?: boolean | null

      /** Disables the triple-press of user button to enable or disable GPS */
      public disableTripleClick?: boolean | null

      /** POSIX Timezone definition string from https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv. */
      public tzdef?: string | null

      /** If true, disable the default blinking LED (LED_PIN) behavior on the device */
      public ledHeartbeatDisabled?: boolean | null

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
      }

      /** Defines the device's behavior for how messages are rebroadcast */
      enum RebroadcastMode {
        ALL = 0,
        ALL_SKIP_DECODING = 1,
        LOCAL_ONLY = 2,
        KNOWN_ONLY = 3,
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
      public positionBroadcastSecs?: number | null

      /** Adaptive position braoadcast, which is now the default. */
      public positionBroadcastSmartEnabled?: boolean | null

      /**
       * If set, this node is at a fixed position.
       * We will generate GPS position updates at the regular interval, but use whatever the last lat/lon/alt we have for the node.
       * The lat/lon/alt can be set by an internal GPS or with the help of the app.
       */
      public fixedPosition?: boolean | null

      /** Is GPS enabled for this node? */
      public gpsEnabled?: boolean | null

      /**
       * How often should we try to get GPS position (in seconds)
       * or zero for the default of once every 30 seconds
       * or a very large value (maxint) to update only once at boot.
       */
      public gpsUpdateInterval?: number | null

      /** Deprecated in favor of using smart / regular broadcast intervals as implicit attempt time */
      public gpsAttemptTime?: number | null

      /**
       * Bit field of boolean configuration options for POSITION messages
       * (bitwise OR of PositionFlags)
       */
      public positionFlags?: number | null

      /** (Re)define GPS_RX_PIN for your board. */
      public rxGpio?: number | null

      /** (Re)define GPS_TX_PIN for your board. */
      public txGpio?: number | null

      /** The minimum distance in meters traveled (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled */
      public broadcastSmartMinimumDistance?: number | null

      /** The minimum number of seconds (since the last send) before we can send a position to the mesh if position_broadcast_smart_enabled */
      public broadcastSmartMinimumIntervalSecs?: number | null

      /** (Re)define PIN_GPS_EN for your board. */
      public gpsEnGpio?: number | null

      /** Set where GPS is enabled, disabled, or not present */
      public gpsMode?: meshtastic.Config.PositionConfig.GpsMode | null

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
      public isPowerSaving?: boolean | null

      /** Description: If non-zero, the device will fully power off this many seconds after external power is removed. */
      public onBatteryShutdownAfterSecs?: number | null

      /**
       * Ratio of voltage divider for battery pin eg. 3.20 (R1=100k, R2=220k)
       * Overrides the ADC_MULTIPLIER defined in variant for battery voltage calculation.
       * https://meshtastic.org/docs/configuration/radio/power/#adc-multiplier-override
       * Should be set to floating point value between 2 and 6
       */
      public adcMultiplierOverride?: number | null

      /**
       * Description: The number of seconds for to wait before turning off BLE in No Bluetooth states
       * Technical Details: ESP32 Only 0 for default of 1 minute
       */
      public waitBluetoothSecs?: number | null

      /**
       * Super Deep Sleep Seconds
       * While in Light Sleep if mesh_sds_timeout_secs is exceeded we will lower into super deep sleep
       * for this value (default 1 year) or a button press
       * 0 for default of one year
       */
      public sdsSecs?: number | null

      /**
       * Description: In light sleep the CPU is suspended, LoRa radio is on, BLE is off an GPS is on
       * Technical Details: ESP32 Only 0 for default of 300
       */
      public lsSecs?: number | null

      /**
       * Description: While in light sleep when we receive packets on the LoRa radio we will wake and handle them and stay awake in no BLE mode for this value
       * Technical Details: ESP32 Only 0 for default of 10 seconds
       */
      public minWakeSecs?: number | null

      /** I2C address of INA_2XX to use for reading device battery voltage */
      public deviceBatteryInaAddress?: number | null

      /**
       * If non-zero, we want powermon log outputs.  With the particular (bitfield) sources enabled.
       * Note: we picked an ID of 32 so that lower more efficient IDs can be used for more frequently used options.
       */
      public powermonEnables?: number | Long | null

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

      /** NTP server to use if WiFi is conneced, defaults to `0.pool.ntp.org` */
      ntpServer?: string | null

      /** Enable Ethernet */
      ethEnabled?: boolean | null

      /** acquire an address via DHCP or assign static */
      addressMode?: meshtastic.Config.NetworkConfig.AddressMode | null

      /** struct to keep static address */
      ipv4Config?: meshtastic.Config.NetworkConfig.IIpV4Config | null

      /** rsyslog Server and Port */
      rsyslogServer?: string | null
    }

    /** Network Config */
    class NetworkConfig implements INetworkConfig {
      /**
       * Constructs a new NetworkConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.INetworkConfig)

      /** Enable WiFi (disables Bluetooth) */
      public wifiEnabled?: boolean | null

      /**
       * If set, this node will try to join the specified wifi network and
       * acquire an address via DHCP
       */
      public wifiSsid?: string | null

      /** If set, will be use to authenticate to the named wifi */
      public wifiPsk?: string | null

      /** NTP server to use if WiFi is conneced, defaults to `0.pool.ntp.org` */
      public ntpServer?: string | null

      /** Enable Ethernet */
      public ethEnabled?: boolean | null

      /** acquire an address via DHCP or assign static */
      public addressMode?: meshtastic.Config.NetworkConfig.AddressMode | null

      /** struct to keep static address */
      public ipv4Config?: meshtastic.Config.NetworkConfig.IIpV4Config | null

      /** rsyslog Server and Port */
      public rsyslogServer?: string | null

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
        public ip?: number | null

        /** Static gateway address */
        public gateway?: number | null

        /** Static subnet mask */
        public subnet?: number | null

        /** Static DNS server address */
        public dns?: number | null

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
    }

    /** Properties of a DisplayConfig. */
    interface IDisplayConfig {
      /**
       * Number of seconds the screen stays on after pressing the user button or receiving a message
       * 0 for default of one minute MAXUINT for always on
       */
      screenOnSecs?: number | null

      /** How the GPS coordinates are formatted on the OLED screen. */
      gpsFormat?: meshtastic.Config.DisplayConfig.GpsCoordinateFormat | null

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
      public screenOnSecs?: number | null

      /** How the GPS coordinates are formatted on the OLED screen. */
      public gpsFormat?: meshtastic.Config.DisplayConfig.GpsCoordinateFormat | null

      /**
       * Automatically toggles to the next page on the screen like a carousel, based the specified interval in seconds.
       * Potentially useful for devices without user buttons.
       */
      public autoScreenCarouselSecs?: number | null

      /**
       * If this is set, the displayed compass will always point north. if unset, the old behaviour
       * (top of display is heading direction) is used.
       */
      public compassNorthTop?: boolean | null

      /** Flip screen vertically, for cases that mount the screen upside down */
      public flipScreen?: boolean | null

      /** Perferred display units */
      public units?: meshtastic.Config.DisplayConfig.DisplayUnits | null

      /** Override auto-detect in screen */
      public oled?: meshtastic.Config.DisplayConfig.OledType | null

      /** Display Mode */
      public displaymode?: meshtastic.Config.DisplayConfig.DisplayMode | null

      /** Print first line in pseudo-bold? FALSE is original style, TRUE is bold */
      public headingBold?: boolean | null

      /** Should we wake the screen up on accelerometer detected motion or tap */
      public wakeOnTapOrMotion?: boolean | null

      /** Indicates how to rotate or invert the compass output to accurate display on the display. */
      public compassOrientation?: meshtastic.Config.DisplayConfig.CompassOrientation | null

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
      /** How the GPS coordinates are displayed on the OLED screen. */
      enum GpsCoordinateFormat {
        DEC = 0,
        DMS = 1,
        UTM = 2,
        MGRS = 3,
        OLC = 4,
        OSGR = 5,
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
      public usePreset?: boolean | null

      /**
       * Either modem_config or bandwidth/spreading/coding will be specified - NOT BOTH.
       * As a heuristic: If bandwidth is specified, do not use modem_config.
       * Because protobufs take ZERO space when the value is zero this works out nicely.
       * This value is replaced by bandwidth/spread_factor/coding_rate.
       * If you'd like to experiment with other options add them to MeshRadio.cpp in the device code.
       */
      public modemPreset?: meshtastic.Config.LoRaConfig.ModemPreset | null

      /**
       * Bandwidth in MHz
       * Certain bandwidth numbers are 'special' and will be converted to the
       * appropriate floating point value: 31 -> 31.25MHz
       */
      public bandwidth?: number | null

      /**
       * A number from 7 to 12.
       * Indicates number of chirps per symbol as 1<<spread_factor.
       */
      public spreadFactor?: number | null

      /**
       * The denominator of the coding rate.
       * ie for 4/5, the value is 5. 4/8 the value is 8.
       */
      public codingRate?: number | null

      /**
       * This parameter is for advanced users with advanced test equipment, we do not recommend most users use it.
       * A frequency offset that is added to to the calculated band center frequency.
       * Used to correct for crystal calibration errors.
       */
      public frequencyOffset?: number | null

      /** The region code for the radio (US, CN, EU433, etc...) */
      public region?: meshtastic.Config.LoRaConfig.RegionCode | null

      /**
       * Maximum number of hops. This can't be greater than 7.
       * Default of 3
       * Attempting to set a value > 7 results in the default
       */
      public hopLimit?: number | null

      /**
       * Disable TX from the LoRa radio. Useful for hot-swapping antennas and other tests.
       * Defaults to false
       */
      public txEnabled?: boolean | null

      /**
       * If zero, then use default max legal continuous power (ie. something that won't
       * burn out the radio hardware)
       * In most cases you should use zero here.
       * Units are in dBm.
       */
      public txPower?: number | null

      /**
       * This controls the actual hardware frequency the radio transmits on.
       * Most users should never need to be exposed to this field/concept.
       * A channel number between 1 and NUM_CHANNELS (whatever the max is in the current region).
       * If ZERO then the rule is "use the old channel name hash based
       * algorithm to derive the channel number")
       * If using the hash algorithm the channel number will be: hash(channel_name) %
       * NUM_CHANNELS (Where num channels depends on the regulatory region).
       */
      public channelNum?: number | null

      /**
       * If true, duty cycle limits will be exceeded and thus you're possibly not following
       * the local regulations if you're not a HAM.
       * Has no effect if the duty cycle of the used region is 100%.
       */
      public overrideDutyCycle?: boolean | null

      /** If true, sets RX boosted gain mode on SX126X based radios */
      public sx126xRxBoostedGain?: boolean | null

      /**
       * This parameter is for advanced users and licensed HAM radio operators.
       * Ignore Channel Calculation and use this frequency instead. The frequency_offset
       * will still be applied. This will allow you to use out-of-band frequencies.
       * Please respect your local laws and regulations. If you are a HAM, make sure you
       * enable HAM mode and turn off encryption.
       */
      public overrideFrequency?: number | null

      /** If true, disable the build-in PA FAN using pin define in RF95_FAN_EN. */
      public paFanDisabled?: boolean | null

      /**
       * For testing it is useful sometimes to force a node to never listen to
       * particular other nodes (simulating radio out of range). All nodenums listed
       * in ignore_incoming will have packets they send dropped on receive (by router.cpp)
       */
      public ignoreIncoming: number[]

      /** If true, the device will not process any packets received via LoRa that passed via MQTT anywhere on the path towards it. */
      public ignoreMqtt?: boolean | null

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

      /** Enables device (serial style logs) over Bluetooth */
      deviceLoggingEnabled?: boolean | null
    }

    /** Represents a BluetoothConfig. */
    class BluetoothConfig implements IBluetoothConfig {
      /**
       * Constructs a new BluetoothConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.Config.IBluetoothConfig)

      /** Enable Bluetooth on the device */
      public enabled?: boolean | null

      /** Determines the pairing strategy for the device */
      public mode?: meshtastic.Config.BluetoothConfig.PairingMode | null

      /** Specified PIN for PairingMode.FixedPin */
      public fixedPin?: number | null

      /** Enables device (serial style logs) over Bluetooth */
      public deviceLoggingEnabled?: boolean | null

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

  /** a gps position */
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
    public time?: number | null

    /** TODO: REPLACE */
    public locationSource?: meshtastic.Position.LocSource | null

    /** TODO: REPLACE */
    public altitudeSource?: meshtastic.Position.AltSource | null

    /** Positional timestamp (actual timestamp of GPS solution) in integer epoch seconds */
    public timestamp?: number | null

    /** Pos. timestamp milliseconds adjustment (rarely available or required) */
    public timestampMillisAdjust?: number | null

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
    public PDOP?: number | null

    /** TODO: REPLACE */
    public HDOP?: number | null

    /** TODO: REPLACE */
    public VDOP?: number | null

    /**
     * GPS accuracy (a hardware specific constant) in mm
     * multiplied with DOP to calculate positional accuracy
     * Default: "'bout three meters-ish" :)
     */
    public gpsAccuracy?: number | null

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
    public fixQuality?: number | null

    /** GPS fix type 2D/3D (from NMEA GxGSA statement) */
    public fixType?: number | null

    /** GPS "Satellites in View" number */
    public satsInView?: number | null

    /** Sensor ID - in case multiple positioning sensors are being used */
    public sensorId?: number | null

    /**
     * Estimated/expected time (in seconds) until next update:
     * - if we update at fixed intervals of X seconds, use X
     * - if we update at dynamic intervals (based on relative movement etc),
     * but "AT LEAST every Y seconds", use Y
     */
    public nextUpdate?: number | null

    /**
     * A sequence number, incremented with each Position message to help
     * detect lost updates if needed
     */
    public seqNumber?: number | null

    /** Indicates the bits of precision set by the sending node */
    public precisionBits?: number | null

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
    public id?: string | null

    /** A full name for this user, i.e. "Kevin Hester" */
    public longName?: string | null

    /**
     * A VERY short name, ideally two characters.
     * Suitable for a tiny OLED screen
     */
    public shortName?: string | null

    /**
     * Deprecated in Meshtastic 2.1.x
     * This is the addr of the radio.
     * Not populated by the phone, but added by the esp32 when broadcasting
     */
    public macaddr?: Uint8Array | null

    /**
     * TBEAM, HELTEC, etc...
     * Starting in 1.2.11 moved to hw_model enum in the NodeInfo object.
     * Apps will still need the string here for older builds
     * (so OTA update can find the right image), but if the enum is available it will be used instead.
     */
    public hwModel?: meshtastic.HardwareModel | null

    /**
     * In some regions Ham radio operators have different bandwidth limitations than others.
     * If this user is a licensed operator, set this flag.
     * Also, "long_name" should be their licence number.
     */
    public isLicensed?: boolean | null

    /** Indicates that the user's role in the mesh */
    public role?: meshtastic.Config.DeviceConfig.Role | null

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
    /** The list of nodenums this packet has visited so far */
    route?: number[] | null
  }

  /** A message used in our Dynamic Source Routing protocol (RFC 4728 based) */
  class RouteDiscovery implements IRouteDiscovery {
    /**
     * Constructs a new RouteDiscovery.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IRouteDiscovery)

    /** The list of nodenums this packet has visited so far */
    public route: number[]

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
    public portnum?: meshtastic.PortNum | null

    /** TODO: REPLACE */
    public payload?: Uint8Array | null

    /**
     * Not normally used, but for testing a sender can request that recipient
     * responds in kind (i.e. if it received a position, it should unicast back it's position).
     * Note: that if you set this on a broadcast you will receive many replies.
     */
    public wantResponse?: boolean | null

    /**
     * The address of the destination node.
     * This field is is filled in by the mesh radio device software, application
     * layer software should never need it.
     * RouteDiscovery messages _must_ populate this.
     * Other message types might need to if they are doing multihop routing.
     */
    public dest?: number | null

    /**
     * The address of the original sender for this message.
     * This field should _only_ be populated for reliable multihop packets (to keep
     * packets small).
     */
    public source?: number | null

    /**
     * Only used in routing or response messages.
     * Indicates the original message ID that this message is reporting failure on. (formerly called original_id)
     */
    public requestId?: number | null

    /** If set, this message is intened to be a reply to a previously sent message with the defined id. */
    public replyId?: number | null

    /**
     * Defaults to false. If true, then what is in the payload should be treated as an emoji like giving
     * a message a heart or poop emoji.
     */
    public emoji?: number | null

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
    public id?: number | null

    /** latitude_i */
    public latitudeI?: number | null

    /** longitude_i */
    public longitudeI?: number | null

    /** Time the waypoint is to expire (epoch) */
    public expire?: number | null

    /**
     * If greater than zero, treat the value as a nodenum only allowing them to update the waypoint.
     * If zero, the waypoint is open to be edited by any member of the mesh.
     */
    public lockedTo?: number | null

    /** Name of the waypoint - max 30 chars */
    public name?: string | null

    /** Description of the waypoint - max 100 chars */
    public description?: string | null

    /** Designator icon for the waypoint in the form of a unicode emoji */
    public icon?: number | null

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
    public topic?: string | null

    /** Bytes */
    public data?: Uint8Array | null

    /** Text */
    public text?: string | null

    /** Whether the message should be retained (or not) */
    public retained?: boolean | null

    /** The actual service envelope payload or text for mqtt pub / sub */
    public payloadVariant?: 'data' | 'text'

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
     * If unset treated as zero (no forwarding, send to adjacent nodes only)
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
    public from?: number | null

    /** The (immediate) destination for this packet */
    public to?: number | null

    /**
     * (Usually) If set, this indicates the index in the secondary_channels table that this packet was sent/received on.
     * If unset, packet was on the primary channel.
     * A particular node might know only a subset of channels in use on the mesh.
     * Therefore channel_index is inherently a local concept and meaningless to send between nodes.
     * Very briefly, while sending and receiving deep inside the device Router code, this field instead
     * contains the 'channel hash' instead of the index.
     * This 'trick' is only used while the payload_variant is an 'encrypted'.
     */
    public channel?: number | null

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
    public id?: number | null

    /**
     * The time this message was received by the esp32 (secs since 1970).
     * Note: this field is _never_ sent on the radio link itself (to save space) Times
     * are typically not sent over the mesh, but they will be added to any Packet
     * (chain of SubPacket) sent to the phone (so the phone can know exact time of reception)
     */
    public rxTime?: number | null

    /**
     * *Never* sent over the radio links.
     * Set during reception to indicate the SNR of this packet.
     * Used to collect statistics on current link quality.
     */
    public rxSnr?: number | null

    /**
     * If unset treated as zero (no forwarding, send to adjacent nodes only)
     * if 1, allow hopping through one node, etc...
     * For our usecase real world topologies probably have a max of about 3.
     * This field is normally placed into a few of bits in the header.
     */
    public hopLimit?: number | null

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
    public wantAck?: boolean | null

    /**
     * The priority of this message for sending.
     * See MeshPacket.Priority description for more details.
     */
    public priority?: meshtastic.MeshPacket.Priority | null

    /** rssi of received packet. Only sent to phone for dispay purposes. */
    public rxRssi?: number | null

    /** Describe if this message is delayed */
    public delayed?: meshtastic.MeshPacket.Delayed | null

    /** Describes whether this packet passed via MQTT somewhere along the path it currently took. */
    public viaMqtt?: boolean | null

    /**
     * Hop limit with which the original packet started. Sent via LoRa using three bits in the unencrypted header.
     * When receiving a packet, the difference between hop_start and hop_limit gives how many hops it traveled.
     */
    public hopStart?: number | null

    /** MeshPacket payloadVariant. */
    public payloadVariant?: 'decoded' | 'encrypted'

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
      ACK = 120,
      MAX = 127,
    }

    /** Identify if this is a delayed packet */
    enum Delayed {
      NO_DELAY = 0,
      DELAYED_BROADCAST = 1,
      DELAYED_DIRECT = 2,
    }
  }

  /** Shared constants between device and phone */
  enum Constants {
    ZERO = 0,
    DATA_PAYLOAD_LEN = 237,
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

    /** Number of hops away from us this node is (0 if adjacent) */
    hopsAway?: number | null

    /**
     * True if node is in our favorites list
     * Persists between NodeDB internal clean ups
     */
    isFavorite?: boolean | null
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
    public num?: number | null

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
    public snr?: number | null

    /** Set to indicate the last time we received a packet from this node */
    public lastHeard?: number | null

    /** The latest device metrics for the node. */
    public deviceMetrics?: meshtastic.IDeviceMetrics | null

    /** local channel index we heard that node on. Only populated if its not the default channel. */
    public channel?: number | null

    /** True if we witnessed the node over MQTT instead of LoRA transport */
    public viaMqtt?: boolean | null

    /** Number of hops away from us this node is (0 if adjacent) */
    public hopsAway?: number | null

    /**
     * True if node is in our favorites list
     * Persists between NodeDB internal clean ups
     */
    public isFavorite?: boolean | null

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
    public myNodeNum?: number | null

    /**
     * The total number of reboots this node has ever encountered
     * (well - since the last time we discarded preferences)
     */
    public rebootCount?: number | null

    /**
     * The minimum app version that can talk to this device.
     * Phone/PC apps should compare this to their build number and if too low tell the user they must update their app
     */
    public minAppVersion?: number | null

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
    public message?: string | null

    /** Seconds since 1970 - or 0 for unknown/unset */
    public time?: number | null

    /** Usually based on thread name - if known */
    public source?: string | null

    /** Not yet set */
    public level?: meshtastic.LogRecord.Level | null

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
    public res?: number | null

    /** Free entries in the outgoing queue */
    public free?: number | null

    /** Maximum entries in the outgoing queue */
    public maxlen?: number | null

    /** What was mesh packet id that generated this response? */
    public meshPacketId?: number | null

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
    public id?: number | null

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
    public fileName?: string | null

    /** The size of the file in bytes */
    public sizeBytes?: number | null

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
    public portnum?: meshtastic.PortNum | null

    /** Compressed data. */
    public data?: Uint8Array | null

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
    public nodeId?: number | null

    /** Field to pass neighbor info for the next sending cycle */
    public lastSentById?: number | null

    /** Broadcast interval of the represented node (in seconds) */
    public nodeBroadcastIntervalSecs?: number | null

    /** The list of out edges from this node */
    public neighbors: meshtastic.INeighbor[]

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
    public nodeId?: number | null

    /** SNR of last heard message */
    public snr?: number | null

    /**
     * Reception time (in secs since 1970) of last message that was last sent by this ID.
     * Note: this is for local storage only and will not be sent out over the mesh.
     */
    public lastRxTime?: number | null

    /**
     * Broadcast interval of this neighbor (in seconds).
     * Note: this is for local storage only and will not be sent out over the mesh.
     */
    public nodeBroadcastIntervalSecs?: number | null

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
  }

  /** Device metadata response */
  class DeviceMetadata implements IDeviceMetadata {
    /**
     * Constructs a new DeviceMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IDeviceMetadata)

    /** Device firmware version string */
    public firmwareVersion?: string | null

    /** Device state version */
    public deviceStateVersion?: number | null

    /** Indicates whether the device can shutdown CPU natively or via power management chip */
    public canShutdown?: boolean | null

    /** Indicates that the device has native wifi capability */
    public hasWifi?: boolean | null

    /** Indicates that the device has native bluetooth capability */
    public hasBluetooth?: boolean | null

    /** Indicates that the device has an ethernet peripheral */
    public hasEthernet?: boolean | null

    /** Indicates that the device's role in the mesh */
    public role?: meshtastic.Config.DeviceConfig.Role | null

    /** Indicates the device's current enabled position flags */
    public positionFlags?: number | null

    /** Device hardware model */
    public hwModel?: meshtastic.HardwareModel | null

    /** Has Remote Hardware enabled */
    public hasRemoteHardware?: boolean | null

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

  /** Properties of a Heartbeat. */
  interface IHeartbeat {}

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
    public nodeNum?: number | null

    /** The the available gpio pin for usage with RemoteHardware module */
    public pin?: meshtastic.IRemoteHardwarePin | null

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
    public payloadId?: number | null

    /** The total number of chunks in the payload */
    public chunkCount?: number | null

    /** The current chunk index in the total */
    public chunkIndex?: number | null

    /** The binary data of the current chunk */
    public payloadChunk?: Uint8Array | null

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
    public payloadId?: number | null

    /** Request to transfer chunked payload */
    public requestTransfer?: boolean | null

    /** Accept the transfer chunked payload */
    public acceptTransfer?: boolean | null

    /** Request missing indexes in the chunked payload */
    public resendChunks?: meshtastic.Iresend_chunks | null

    /** ChunkedPayloadResponse payloadVariant. */
    public payloadVariant?: 'requestTransfer' | 'acceptTransfer' | 'resendChunks'

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
    public channelNum?: number | null

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
    public psk?: Uint8Array | null

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
    public name?: string | null

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
    public id?: number | null

    /** If true, messages on the mesh will be sent to the *public* internet by any gateway ndoe */
    public uplinkEnabled?: boolean | null

    /** If true, messages seen on the internet will be forwarded to the local mesh. */
    public downlinkEnabled?: boolean | null

    /** Per-channel module settings. */
    public moduleSettings?: meshtastic.IModuleSettings | null

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
    public positionPrecision?: number | null

    /**
     * Controls whether or not the phone / clients should mute the current channel
     * Useful for noisy public channels you don't necessarily want to disable
     */
    public isClientMuted?: boolean | null

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
    public index?: number | null

    /** The new settings, or NULL to disable that channel */
    public settings?: meshtastic.IChannelSettings | null

    /** TODO: REPLACE */
    public role?: meshtastic.Channel.Role | null

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
      public enabled?: boolean | null

      /**
       * The server to use for our MQTT global message gateway feature.
       * If not set, the default server will be used
       */
      public address?: string | null

      /**
       * MQTT username to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default username
       */
      public username?: string | null

      /**
       * MQTT password to use (most useful for a custom MQTT server).
       * If using a custom server, this will be honoured even if empty.
       * If using the default server, this will only be honoured if set, otherwise the device will use the default password
       */
      public password?: string | null

      /**
       * Whether to send encrypted or decrypted packets to MQTT.
       * This parameter is only honoured if you also set server
       * (the default official mqtt.meshtastic.org server can handle encrypted packets)
       * Decrypted packets may be useful for external systems that want to consume meshtastic packets
       */
      public encryptionEnabled?: boolean | null

      /** Whether to send / consume json packets on MQTT */
      public jsonEnabled?: boolean | null

      /** If true, we attempt to establish a secure connection using TLS */
      public tlsEnabled?: boolean | null

      /**
       * The root topic to use for MQTT messages. Default is "msh".
       * This is useful if you want to use a single MQTT server for multiple meshtastic networks and separate them via ACLs
       */
      public root?: string | null

      /** If true, we can use the connected phone / client to proxy messages to MQTT instead of a direct connection */
      public proxyToClientEnabled?: boolean | null

      /** If true, we will periodically report unencrypted information about our node to a map via MQTT */
      public mapReportingEnabled?: boolean | null

      /** Settings for reporting information about our node to a map via MQTT */
      public mapReportSettings?: meshtastic.ModuleConfig.IMapReportSettings | null

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
    }

    /** Settings for reporting unencrypted information about our node to a map via MQTT */
    class MapReportSettings implements IMapReportSettings {
      /**
       * Constructs a new MapReportSettings.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IMapReportSettings)

      /** How often we should report our info to the map (in seconds) */
      public publishIntervalSecs?: number | null

      /** Bits of precision for the location sent (default of 32 is full precision). */
      public positionPrecision?: number | null

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
      public enabled?: boolean | null

      /** Whether the Module allows consumers to read / write to pins not defined in available_pins */
      public allowUndefinedPinAccess?: boolean | null

      /** Exposes the available pins to the mesh for reading and writing */
      public availablePins: meshtastic.IRemoteHardwarePin[]

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
       * Neighbor Info to the mesh
       */
      updateInterval?: number | null
    }

    /** NeighborInfoModule Config */
    class NeighborInfoConfig implements INeighborInfoConfig {
      /**
       * Constructs a new NeighborInfoConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.INeighborInfoConfig)

      /** Whether the Module is enabled */
      public enabled?: boolean | null

      /**
       * Interval in seconds of how often we should try to send our
       * Neighbor Info to the mesh
       */
      public updateInterval?: number | null

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

      /** Interval in seconds of how often we can send a message to the mesh when a state change is detected */
      minimumBroadcastSecs?: number | null

      /**
       * Interval in seconds of how often we should send a message to the mesh with the current state regardless of changes
       * When set to 0, only state changes will be broadcasted
       * Works as a sort of status heartbeat for peace of mind
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

      /**
       * Whether or not the GPIO pin state detection is triggered on HIGH (1)
       * Otherwise LOW (0)
       */
      detectionTriggeredHigh?: boolean | null

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
      public enabled?: boolean | null

      /** Interval in seconds of how often we can send a message to the mesh when a state change is detected */
      public minimumBroadcastSecs?: number | null

      /**
       * Interval in seconds of how often we should send a message to the mesh with the current state regardless of changes
       * When set to 0, only state changes will be broadcasted
       * Works as a sort of status heartbeat for peace of mind
       */
      public stateBroadcastSecs?: number | null

      /**
       * Send ASCII bell with alert message
       * Useful for triggering ext. notification on bell
       */
      public sendBell?: boolean | null

      /**
       * Friendly name used to format message sent to mesh
       * Example: A name "Motion" would result in a message "Motion detected"
       * Maximum length of 20 characters
       */
      public name?: string | null

      /** GPIO pin to monitor for state changes */
      public monitorPin?: number | null

      /**
       * Whether or not the GPIO pin state detection is triggered on HIGH (1)
       * Otherwise LOW (0)
       */
      public detectionTriggeredHigh?: boolean | null

      /**
       * Whether or not use INPUT_PULLUP mode for GPIO pin
       * Only applicable if the board uses pull-up resistors on the pin
       */
      public usePullup?: boolean | null

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
      public codec2Enabled?: boolean | null

      /** PTT Pin */
      public pttPin?: number | null

      /** The audio sample rate to use for codec2 */
      public bitrate?: meshtastic.ModuleConfig.AudioConfig.Audio_Baud | null

      /** I2S Word Select */
      public i2sWs?: number | null

      /** I2S Data IN */
      public i2sSd?: number | null

      /** I2S Data OUT */
      public i2sDin?: number | null

      /** I2S Clock */
      public i2sSck?: number | null

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
      public enabled?: boolean | null

      /** PaxcounterConfig paxcounterUpdateInterval. */
      public paxcounterUpdateInterval?: number | null

      /** WiFi RSSI threshold. Defaults to -80 */
      public wifiThreshold?: number | null

      /** BLE RSSI threshold. Defaults to -80 */
      public bleThreshold?: number | null

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
      public enabled?: boolean | null

      /** TODO: REPLACE */
      public echo?: boolean | null

      /** RX pin (should match Arduino gpio pin number) */
      public rxd?: number | null

      /** TX pin (should match Arduino gpio pin number) */
      public txd?: number | null

      /** Serial baud rate */
      public baud?: meshtastic.ModuleConfig.SerialConfig.Serial_Baud | null

      /** TODO: REPLACE */
      public timeout?: number | null

      /** Mode for serial module operation */
      public mode?: meshtastic.ModuleConfig.SerialConfig.Serial_Mode | null

      /**
       * Overrides the platform's defacto Serial port instance to use with Serial module config settings
       * This is currently only usable in output modes like NMEA / CalTopo and may behave strangely or not work at all in other modes
       * Existing logging over the Serial Console will still be present
       */
      public overrideConsoleSerialPort?: boolean | null

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
      public enabled?: boolean | null

      /**
       * When using in On/Off mode, keep the output on for this many
       * milliseconds. Default 1000ms (1 second).
       */
      public outputMs?: number | null

      /**
       * Define the output pin GPIO setting Defaults to
       * EXT_NOTIFY_OUT if set for the board.
       * In standalone devices this pin should drive the LED to match the UI.
       */
      public output?: number | null

      /**
       * Optional: Define a secondary output pin for a vibra motor
       * This is used in standalone devices to match the UI.
       */
      public outputVibra?: number | null

      /**
       * Optional: Define a tertiary output pin for an active buzzer
       * This is used in standalone devices to to match the UI.
       */
      public outputBuzzer?: number | null

      /**
       * IF this is true, the 'output' Pin will be pulled active high, false
       * means active low.
       */
      public active?: boolean | null

      /** True: Alert when a text message arrives (output) */
      public alertMessage?: boolean | null

      /** True: Alert when a text message arrives (output_vibra) */
      public alertMessageVibra?: boolean | null

      /** True: Alert when a text message arrives (output_buzzer) */
      public alertMessageBuzzer?: boolean | null

      /** True: Alert when the bell character is received (output) */
      public alertBell?: boolean | null

      /** True: Alert when the bell character is received (output_vibra) */
      public alertBellVibra?: boolean | null

      /** True: Alert when the bell character is received (output_buzzer) */
      public alertBellBuzzer?: boolean | null

      /**
       * use a PWM output instead of a simple on/off output. This will ignore
       * the 'output', 'output_ms' and 'active' settings and use the
       * device.buzzer_gpio instead.
       */
      public usePwm?: boolean | null

      /**
       * The notification will toggle with 'output_ms' for this time of seconds.
       * Default is 0 which means don't repeat at all. 60 would mean blink
       * and/or beep for 60 seconds
       */
      public nagTimeout?: number | null

      /**
       * When true, enables devices with native I2S audio output to use the RTTTL over speaker like a buzzer
       * T-Watch S3 and T-Deck for example have this capability
       */
      public useI2sAsBuzzer?: boolean | null

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
      public enabled?: boolean | null

      /** TODO: REPLACE */
      public heartbeat?: boolean | null

      /** TODO: REPLACE */
      public records?: number | null

      /** TODO: REPLACE */
      public historyReturnMax?: number | null

      /** TODO: REPLACE */
      public historyReturnWindow?: number | null

      /** Set to true to let this node act as a server that stores received messages and resends them upon request. */
      public isServer?: boolean | null

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
    }

    /** Preferences for the RangeTestModule */
    class RangeTestConfig implements IRangeTestConfig {
      /**
       * Constructs a new RangeTestConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.IRangeTestConfig)

      /** Enable the Range Test Module */
      public enabled?: boolean | null

      /** Send out range test messages from this node */
      public sender?: number | null

      /**
       * Bool value indicating that this node should save a RangeTest.csv file.
       * ESP32 Only
       */
      public save?: boolean | null

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

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      powerMeasurementEnabled?: boolean | null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      powerUpdateInterval?: number | null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      powerScreenEnabled?: boolean | null
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
      public deviceUpdateInterval?: number | null

      /** TelemetryConfig environmentUpdateInterval. */
      public environmentUpdateInterval?: number | null

      /**
       * Preferences for the Telemetry Module (Environment)
       * Enable/Disable the telemetry measurement module measurement collection
       */
      public environmentMeasurementEnabled?: boolean | null

      /** Enable/Disable the telemetry measurement module on-device display */
      public environmentScreenEnabled?: boolean | null

      /**
       * We'll always read the sensor in Celsius, but sometimes we might want to
       * display the results in Fahrenheit as a "user preference".
       */
      public environmentDisplayFahrenheit?: boolean | null

      /** Enable/Disable the air quality metrics */
      public airQualityEnabled?: boolean | null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      public airQualityInterval?: number | null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      public powerMeasurementEnabled?: boolean | null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      public powerUpdateInterval?: number | null

      /**
       * Interval in seconds of how often we should try to send our
       * air quality metrics to the mesh
       */
      public powerScreenEnabled?: boolean | null

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
       * Can be e.g. "rotEnc1", "upDownEnc1" or keyword "_any"
       */
      allowInputSource?: string | null

      /**
       * CannedMessageModule also sends a bell character with the messages.
       * ExternalNotificationModule can benefit from this feature.
       */
      sendBell?: boolean | null
    }

    /** TODO: REPLACE */
    class CannedMessageConfig implements ICannedMessageConfig {
      /**
       * Constructs a new CannedMessageConfig.
       * @param [properties] Properties to set
       */
      constructor(properties?: meshtastic.ModuleConfig.ICannedMessageConfig)

      /** Enable the rotary encoder #1. This is a 'dumb' encoder sending pulses on both A and B pins while rotating. */
      public rotary1Enabled?: boolean | null

      /** GPIO pin for rotary encoder A port. */
      public inputbrokerPinA?: number | null

      /** GPIO pin for rotary encoder B port. */
      public inputbrokerPinB?: number | null

      /** GPIO pin for rotary encoder Press port. */
      public inputbrokerPinPress?: number | null

      /** Generate input event on CW of this kind. */
      public inputbrokerEventCw?: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar | null

      /** Generate input event on CCW of this kind. */
      public inputbrokerEventCcw?: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar | null

      /** Generate input event on Press of this kind. */
      public inputbrokerEventPress?: meshtastic.ModuleConfig.CannedMessageConfig.InputEventChar | null

      /** Enable the Up/Down/Select input device. Can be RAK rotary encoder or 3 buttons. Uses the a/b/press definitions from inputbroker. */
      public updown1Enabled?: boolean | null

      /** Enable/disable CannedMessageModule. */
      public enabled?: boolean | null

      /**
       * Input event origin accepted by the canned message module.
       * Can be e.g. "rotEnc1", "upDownEnc1" or keyword "_any"
       */
      public allowInputSource?: string | null

      /**
       * CannedMessageModule also sends a bell character with the messages.
       * ExternalNotificationModule can benefit from this feature.
       */
      public sendBell?: boolean | null

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
      public ledState?: boolean | null

      /** Sets the current for the LED output. Default is 10. */
      public current?: number | null

      /** Sets the red LED level. Values are 0-255. */
      public red?: number | null

      /** Sets the green LED level. Values are 0-255. */
      public green?: number | null

      /** Sets the blue LED level. Values are 0-255. */
      public blue?: number | null

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
    public gpioPin?: number | null

    /** Name for the GPIO pin (i.e. Front gate, mailbox, etc) */
    public name?: string | null

    /** Type of GPIO access available to consumers on the mesh */
    public type?: meshtastic.RemoteHardwarePinType | null

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
    /** Concentration Units Standard PM1.0 */
    pm10Standard?: number | null

    /** Concentration Units Standard PM2.5 */
    pm25Standard?: number | null

    /** Concentration Units Standard PM10.0 */
    pm100Standard?: number | null

    /** Concentration Units Environmental PM1.0 */
    pm10Environmental?: number | null

    /** Concentration Units Environmental PM2.5 */
    pm25Environmental?: number | null

    /** Concentration Units Environmental PM10.0 */
    pm100Environmental?: number | null

    /** 0.3um Particle Count */
    particles_03um?: number | null

    /** 0.5um Particle Count */
    particles_05um?: number | null

    /** 1.0um Particle Count */
    particles_10um?: number | null

    /** 2.5um Particle Count */
    particles_25um?: number | null

    /** 5.0um Particle Count */
    particles_50um?: number | null

    /** 10.0um Particle Count */
    particles_100um?: number | null
  }

  /** Air quality metrics */
  class AirQualityMetrics implements IAirQualityMetrics {
    /**
     * Constructs a new AirQualityMetrics.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.IAirQualityMetrics)

    /** Concentration Units Standard PM1.0 */
    public pm10Standard?: number | null

    /** Concentration Units Standard PM2.5 */
    public pm25Standard?: number | null

    /** Concentration Units Standard PM10.0 */
    public pm100Standard?: number | null

    /** Concentration Units Environmental PM1.0 */
    public pm10Environmental?: number | null

    /** Concentration Units Environmental PM2.5 */
    public pm25Environmental?: number | null

    /** Concentration Units Environmental PM10.0 */
    public pm100Environmental?: number | null

    /** 0.3um Particle Count */
    public particles_03um?: number | null

    /** 0.5um Particle Count */
    public particles_05um?: number | null

    /** 1.0um Particle Count */
    public particles_10um?: number | null

    /** 2.5um Particle Count */
    public particles_25um?: number | null

    /** 5.0um Particle Count */
    public particles_50um?: number | null

    /** 10.0um Particle Count */
    public particles_100um?: number | null

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
  }

  /** Types of Measurements the telemetry module is equipped to handle */
  class Telemetry implements ITelemetry {
    /**
     * Constructs a new Telemetry.
     * @param [properties] Properties to set
     */
    constructor(properties?: meshtastic.ITelemetry)

    /** Seconds since 1970 - or 0 for unknown/unset */
    public time?: number | null

    /** Key native device metrics such as battery level */
    public deviceMetrics?: meshtastic.IDeviceMetrics | null

    /** Weather station or other environmental metrics */
    public environmentMetrics?: meshtastic.IEnvironmentMetrics | null

    /** Air quality metrics */
    public airQualityMetrics?: meshtastic.IAirQualityMetrics | null

    /** Power Metrics */
    public powerMetrics?: meshtastic.IPowerMetrics | null

    /** Telemetry variant. */
    public variant?: 'deviceMetrics' | 'environmentMetrics' | 'airQualityMetrics' | 'powerMetrics'

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
    public zeroOffset?: number | null

    /** The calibration factor for the NAU7802 */
    public calibrationFactor?: number | null

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
    public control?: meshtastic.XModem.Control | null

    /** XModem seq. */
    public seq?: number | null

    /** XModem crc16. */
    public crc16?: number | null

    /** XModem buffer. */
    public buffer?: Uint8Array | null

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
}
