import path from 'node:path';
import { GraphqlApi } from '../shared/graphql-api';

export class AdminApi extends GraphqlApi {
  constructor() {
    super({
      typePaths: [
        path.join(__dirname, './**/*.gql'),
        path.join(__dirname, '../shared/gql/**/*.gql'),
      ],
      resolvers: [],
    });
  }
}
