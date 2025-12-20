export class PaypalServiceError extends Error {
  constructor(
    private readonly code: string,
    message: string
  ) {
    super(message);
  }
}

export class OrderNotFoundError extends PaypalServiceError {
  constructor(message: string) {
    super('ORDER_NOT_FOUND', message);
  }
}

export class PaypalRequestError extends PaypalServiceError {
  constructor(message: string) {
    super('PAYPAL_REQUEST_ERROR', message);
  }
}
