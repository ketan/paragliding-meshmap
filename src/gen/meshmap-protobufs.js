/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import $protobuf from 'protobufjs/minimal.js'

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

export const Meshmap = ($root.Meshmap = (() => {
  /**
   * Properties of a Meshmap.
   * @exports IMeshmap
   * @interface IMeshmap
   */

  /**
   * Constructs a new Meshmap.
   * @exports Meshmap
   * @classdesc Represents a Meshmap.
   * @implements IMeshmap
   * @constructor
   * @param {IMeshmap=} [properties] Properties to set
   */
  function Meshmap(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * Encodes the specified Meshmap message. Does not implicitly {@link Meshmap.verify|verify} messages.
   * @function encode
   * @memberof Meshmap
   * @static
   * @param {IMeshmap} message Meshmap message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Meshmap.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    return writer
  }

  /**
   * Decodes a Meshmap message from the specified reader or buffer.
   * @function decode
   * @memberof Meshmap
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Meshmap} Meshmap
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Meshmap.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Meshmap()
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

  Meshmap.Position = (function () {
    /**
     * Properties of a Position.
     * @memberof Meshmap
     * @interface IPosition
     * @property {number|null} [latitude] Latitude: multiply by 1e-7 to get degrees in floating point
     * @property {number|null} [longitude] Longitude: multiply by 1e-7 to get degrees in floating point
     */

    /**
     * Constructs a new Position.
     * @memberof Meshmap
     * @classdesc Represents a Position.
     * @implements IPosition
     * @constructor
     * @param {Meshmap.IPosition=} [properties] Properties to set
     */
    function Position(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * Latitude: multiply by 1e-7 to get degrees in floating point
     * @member {number} latitude
     * @memberof Meshmap.Position
     * @instance
     */
    Position.prototype.latitude = 0

    /**
     * Longitude: multiply by 1e-7 to get degrees in floating point
     * @member {number} longitude
     * @memberof Meshmap.Position
     * @instance
     */
    Position.prototype.longitude = 0

    /**
     * Encodes the specified Position message. Does not implicitly {@link Meshmap.Position.verify|verify} messages.
     * @function encode
     * @memberof Meshmap.Position
     * @static
     * @param {Meshmap.IPosition} message Position message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Position.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.latitude != null && Object.hasOwnProperty.call(message, 'latitude'))
        writer.uint32(/* id 1, wireType 5 =*/ 13).sfixed32(message.latitude)
      if (message.longitude != null && Object.hasOwnProperty.call(message, 'longitude'))
        writer.uint32(/* id 2, wireType 5 =*/ 21).sfixed32(message.longitude)
      return writer
    }

    /**
     * Decodes a Position message from the specified reader or buffer.
     * @function decode
     * @memberof Meshmap.Position
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Meshmap.Position} Position
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Position.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.Meshmap.Position()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.latitude = reader.sfixed32()
            break
          }
          case 2: {
            message.longitude = reader.sfixed32()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return Position
  })()

  Meshmap.PositionChunk = (function () {
    /**
     * Properties of a PositionChunk.
     * @memberof Meshmap
     * @interface IPositionChunk
     * @property {Array.<Meshmap.IPosition>|null} [positions] PositionChunk positions
     */

    /**
     * Constructs a new PositionChunk.
     * @memberof Meshmap
     * @classdesc Represents a PositionChunk.
     * @implements IPositionChunk
     * @constructor
     * @param {Meshmap.IPositionChunk=} [properties] Properties to set
     */
    function PositionChunk(properties) {
      this.positions = []
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * PositionChunk positions.
     * @member {Array.<Meshmap.IPosition>} positions
     * @memberof Meshmap.PositionChunk
     * @instance
     */
    PositionChunk.prototype.positions = $util.emptyArray

    /**
     * Encodes the specified PositionChunk message. Does not implicitly {@link Meshmap.PositionChunk.verify|verify} messages.
     * @function encode
     * @memberof Meshmap.PositionChunk
     * @static
     * @param {Meshmap.IPositionChunk} message PositionChunk message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PositionChunk.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.positions != null && message.positions.length)
        for (let i = 0; i < message.positions.length; ++i)
          $root.Meshmap.Position.encode(message.positions[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim()
      return writer
    }

    /**
     * Decodes a PositionChunk message from the specified reader or buffer.
     * @function decode
     * @memberof Meshmap.PositionChunk
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Meshmap.PositionChunk} PositionChunk
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PositionChunk.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.Meshmap.PositionChunk()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            if (!(message.positions && message.positions.length)) message.positions = []
            message.positions.push($root.Meshmap.Position.decode(reader, reader.uint32()))
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    return PositionChunk
  })()

  return Meshmap
})())

export { $root as default }
