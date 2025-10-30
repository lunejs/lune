export type ActionResult<TErrorCode = string, TData = void> =
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  | (TData extends void ? { isSuccess: true } : { isSuccess: true; data: TData })
  | {
      isSuccess: false;
      error: string;
      errorCode?: TErrorCode;
    };
