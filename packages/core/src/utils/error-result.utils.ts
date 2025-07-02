/**
 * This type is returned when an error has occurred in the service layer.
 */
export class ErrorResult<T> {
  constructor(
    readonly code: T,
    readonly message: string,
    readonly metadata?: any
  ) {
    console.error({
      code,
      message,
      metadata
    });
  }
}

/**
 * Type guard to check if a result from a service is an {ErrorResult}.
 */
export const isErrorResult = (result: any): result is ErrorResult<any> => {
  return result instanceof ErrorResult;
};
