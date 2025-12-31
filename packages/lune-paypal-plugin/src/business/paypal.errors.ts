import { PaypalErrorCode } from '../api/types.api';

export abstract class PaypalServiceError extends Error {
  constructor(
    private readonly code: PaypalErrorCode,
    message: string
  ) {
    super(message);
  }
}

export class OrderNotFoundError extends PaypalServiceError {
  constructor(message: string) {
    super(PaypalErrorCode.OrderNotFound, message);
  }
}

export class PaypalRequestError extends PaypalServiceError {
  constructor(message: string) {
    super(PaypalErrorCode.PaypalRequestError, message);
  }
}
