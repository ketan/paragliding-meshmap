export class ProtobufError extends Error {
  constructor(e: Error) {
    super(e.message, e)
  }
}
