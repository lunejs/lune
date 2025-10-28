export type ActionResult<TErrorCode = string, TData = unknown> =
  | {
      isSuccess: true;
      data: TData;
    }
  | {
      isSuccess: false;
      error: string;
      errorCode?: TErrorCode;
    };
