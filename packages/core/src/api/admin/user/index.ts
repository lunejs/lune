import { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { userMutationResolver } from './mutation.resolver';

export const userResolver: GraphqlApiResolver = {
  Mutation: userMutationResolver
};
