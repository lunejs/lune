import { CustomerErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

abstract class CustomerErrorResult extends ErrorResult<CustomerErrorCode> {
  constructor(code: CustomerErrorCode, message: string) {
    super('CustomerService', code, message);
  }
}

/**
 * Error thrown when provided email is invalid
 */
export class InvalidEmailError extends CustomerErrorResult {
  constructor() {
    super(CustomerErrorCode.InvalidEmail, 'Provided email is invalid');
  }
}

/**
 * Error thrown when provided email is already taken by other customer
 */
export class EmailAlreadyExistsError extends CustomerErrorResult {
  constructor() {
    super(CustomerErrorCode.EmailAlreadyExists, 'Provided email is already taken');
  }
}

/**
 * Error thrown when provided email is already taken by other customer
 */
export class InvalidCredentialsError extends CustomerErrorResult {
  constructor() {
    super(CustomerErrorCode.InvalidCredentials, 'Invalid credentials');
  }
}
