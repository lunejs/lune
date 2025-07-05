import { GraphQLError } from 'graphql';

export class UnauthorizedError extends GraphQLError {
  constructor(reason: string) {
    super(reason, {
      extensions: {
        code: 'UNAUTHORIZED'
      }
    });
    this.name = 'UnauthorizedError';
  }
}
