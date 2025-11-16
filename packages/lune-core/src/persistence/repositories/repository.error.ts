import { LuneError } from '@/errors/lune.error';

export class RepositoryError extends LuneError {
  constructor(error: Error | unknown) {
    const message = error instanceof Error ? error.message : String(error);

    super(message);

    this.name = 'RepositoryError';
  }
}
