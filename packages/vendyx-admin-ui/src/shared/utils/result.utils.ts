export type ActionResult<T> =
  | {
      isSuccess: true;
    }
  | {
      isSuccess: false;
      error?: string;
      errorCode?: T;
    };
