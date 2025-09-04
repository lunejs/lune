export class VendyxError extends Error {
  constructor(
    readonly ctx: string,
    message: string,
    readonly metadata?: unknown
  ) {
    super(message);
  }
}
