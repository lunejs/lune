import { LocationErrorCode } from '@/api/shared/types/graphql';
import { ErrorResult } from '@/utils/error-result';

/**
 * Error thrown when a new location is created with a name that already exists.
 */
export class LocationNameAlreadyExistsError extends ErrorResult<LocationErrorCode> {
  constructor() {
    super(
      'LocationService',
      LocationErrorCode.LocationNameAlreadyExists,
      'Location name already exists'
    );
  }
}
