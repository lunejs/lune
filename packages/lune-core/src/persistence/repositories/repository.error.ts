import { LuneError } from '@/errors/lune.error';

export class RepositoryError extends LuneError {
  constructor(ctx: string, error: Error | unknown) {
    const message = error instanceof Error ? error.message : 'Unknown repository error';

    super(ctx, message, error);
  }
}
