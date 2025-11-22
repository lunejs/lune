/**
 * Utility class for building api errors for ui representation
 */
export class ApiError<TErrorCode> {
  constructor(
    readonly error: string,
    readonly errorCode: TErrorCode
  ) {}
}
