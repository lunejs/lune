import { UserErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result.utils';

/**
 * Error thrown when the email provided already exists in the system
 */
export class EmailAlreadyExistsError extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.EmailAlreadyExists, 'Email already exists');
  }
}

/**
 * Error thrown when the provided credentials are invalid
 */
export class InvalidCredentialsError extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.InvalidCredentials, 'Invalid credentials');
  }
}

/**
 * Error thrown when the password provided is invalid, e.g., too short or does not meet complexity requirements
 */
export class InvalidPasswordError extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.InvalidPassword, 'Password must be at least 8 characters long');
  }
}

/**
 * Error thrown when the provided email is not valid or does not conform to the expected format
 */
export class InvalidEmailError extends ErrorResult<UserErrorCode> {
  constructor() {
    super(UserErrorCode.InvalidEmail, 'Email must be a valid email address');
  }
}
