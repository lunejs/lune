import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CommonLocationFieldResolver } from '@/api/shared/resolvers/location-field.resolver';

export const LocationFieldResolver: GraphqlApiResolver = {
  Location: {
    ...CommonLocationFieldResolver
  }
};
