export type ActionResult<T = string> =
  | {
      isSuccess: true;
    }
  | {
      isSuccess: false;
      error: string;
      errorCode?: T;
    };
