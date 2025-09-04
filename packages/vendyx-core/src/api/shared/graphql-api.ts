import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { createYoga, Plugin, YogaInitialContext, YogaServerInstance } from 'graphql-yoga';

import { ExecutionContext } from './context/types';

/**
 * @description
 * `GraphqlApi` is an utility class that simplifies the creation of a GraphQL API with yoga
 */
export class GraphqlApi {
  typeDefs: any[];
  resolvers: GraphqlApiResolver;
  schema: GraphQLSchema;

  handler: GraphqlApiHandler;

  constructor(private readonly config: GraphqlApiConfig) {
    this.typeDefs = this.genTypeDefs();
    this.resolvers = this.genResolvers();
    this.schema = this.genSchema();

    this.handler = this.genHandler(this.config.context);
  }

  private genHandler(context: GraphqlApiConfig['context']) {
    return createYoga({
      graphqlEndpoint: this.config.endpoint,
      context,
      schema: this.schema,
      plugins: this.config.plugins,
      logging: true
    });
  }

  private genSchema() {
    return makeExecutableSchema({
      typeDefs: this.typeDefs,
      resolvers: this.resolvers
    });
  }

  private genTypeDefs() {
    return this.config.typePaths.flatMap(typePath => {
      return loadFilesSync(typePath);
    });
  }

  private genResolvers() {
    let _resolvers: GraphqlApiResolver = {
      Query: {},
      Mutation: {}
    };

    this.config.resolvers.forEach(r => {
      _resolvers = {
        ...r,
        Query: {
          ..._resolvers.Query,
          ...r.Query
        },
        Mutation: {
          ..._resolvers.Mutation,
          ...r.Mutation
        }
      };
    });

    return _resolvers;
  }
}

type GraphqlApiConfig = {
  typePaths: string[];
  resolvers: GraphqlApiResolver[];
  endpoint: string;
  context: (initialContext: YogaInitialContext) => Promise<ExecutionContext>;
  plugins: (object | Plugin | Plugin<object & YogaInitialContext>)[] | undefined;
};

export type GraphqlApiResolver = {
  Query?: Record<string, any>;
  Mutation?: Record<string, any>;
} & Record<string, any>;

export type GraphQLFieldResolver = (
  parent: unknown,
  args: unknown,
  context: ExecutionContext,
  info: unknown
) => unknown;

type GraphqlApiHandler = YogaServerInstance<object, object>;
