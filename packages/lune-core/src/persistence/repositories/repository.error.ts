import { VendyxError } from '@/errors/vendyx.error';

export class RepositoryError extends VendyxError {
  constructor(ctx: string, error: Error | unknown) {
    const message = error instanceof Error ? error.message : 'Unknown repository error';

    super(ctx, message, error);
  }
}
