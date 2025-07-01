import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { createYoga, YogaServerInstance } from 'graphql-yoga';

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

    this.handler = this.genHandler();
  }

  private genHandler() {
    return createYoga({ schema: this.schema });
  }

  private genSchema() {
    return makeExecutableSchema({
      typeDefs: this.typeDefs,
      resolvers: {},
    });
  }

  private genTypeDefs() {
    return this.config.typePaths.flatMap((typePath) => {
      return loadFilesSync(typePath);
    });
  }

  private genResolvers() {
    let _resolvers: GraphqlApiResolver = {
      Query: {},
      Mutation: {},
    };

    this.config.resolvers.forEach((r) => {
      _resolvers = {
        Query: {
          ..._resolvers.Query,
          ...r.Query,
        },
        Mutation: {
          ..._resolvers.Mutation,
          ...r.Mutation,
        },
      };
    });

    return _resolvers;
  }
}

type GraphqlApiConfig = {
  typePaths: string[];
  resolvers: GraphqlApiResolver[];
};

type GraphqlApiResolver = {
  Query?: Record<string, any>;
  Mutation?: Record<string, any>;
};

type GraphqlApiHandler = YogaServerInstance<object, object>;
