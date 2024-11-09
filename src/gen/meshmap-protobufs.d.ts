import * as $protobuf from 'protobufjs'
import Long = require('long')
/** Properties of a Meshmap. */
export interface IMeshmap {}

/** Represents a Meshmap. */
export class Meshmap implements IMeshmap {
  /**
   * Constructs a new Meshmap.
   * @param [properties] Properties to set
   */
  constructor(properties?: IMeshmap)

  /**
   * Encodes the specified Meshmap message. Does not implicitly {@link Meshmap.verify|verify} messages.
   * @param message Meshmap message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  public static encode(message: IMeshmap, writer?: $protobuf.Writer): $protobuf.Writer

  /**
   * Decodes a Meshmap message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Meshmap
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Meshmap
}

export namespace Meshmap {
  /** Properties of a Position. */
  interface IPosition {
    /** Latitude: multiply by 1e-7 to get degrees in floating point */
    latitude?: number | null

    /** Longitude: multiply by 1e-7 to get degrees in floating point */
    longitude?: number | null
  }

  /** Represents a Position. */
  class Position implements IPosition {
    /**
     * Constructs a new Position.
     * @param [properties] Properties to set
     */
    constructor(properties?: Meshmap.IPosition)

    /** Latitude: multiply by 1e-7 to get degrees in floating point */
    public latitude: number

    /** Longitude: multiply by 1e-7 to get degrees in floating point */
    public longitude: number

    /**
     * Encodes the specified Position message. Does not implicitly {@link Meshmap.Position.verify|verify} messages.
     * @param message Position message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Meshmap.IPosition, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a Position message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Position
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Meshmap.Position
  }

  /** Properties of a PositionChunk. */
  interface IPositionChunk {
    /** PositionChunk positions */
    positions?: Meshmap.IPosition[] | null
  }

  /** Represents a PositionChunk. */
  class PositionChunk implements IPositionChunk {
    /**
     * Constructs a new PositionChunk.
     * @param [properties] Properties to set
     */
    constructor(properties?: Meshmap.IPositionChunk)

    /** PositionChunk positions. */
    public positions: Meshmap.IPosition[]

    /**
     * Encodes the specified PositionChunk message. Does not implicitly {@link Meshmap.PositionChunk.verify|verify} messages.
     * @param message PositionChunk message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Meshmap.IPositionChunk, writer?: $protobuf.Writer): $protobuf.Writer

    /**
     * Decodes a PositionChunk message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PositionChunk
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Meshmap.PositionChunk
  }
}
