import * as path from 'path';

import { GraphqlApiResolver, LunePlugin } from '@lune/core';

export class HelloWorldPlugin extends LunePlugin {
  constructor() {
    super({
      adminApiExtension: {
        typePaths: [
          path.join(
            process.cwd(),
            './plugins/hello-world/hello-world-admin.gql'
          ),
        ],
        resolvers: [AdminResolver],
      },
      storefrontApiExtension: {
        typePaths: [
          path.join(
            process.cwd(),
            './plugins/hello-world/hello-world-storefront.gql'
          ),
        ],
        resolvers: [StorefrontResolver],
      },
    });
  }
}

const AdminResolver: GraphqlApiResolver = {
  Query: {
    adminHello: () => ({ foo: 'hi admin' }),
  },
};

const StorefrontResolver: GraphqlApiResolver = {
  Query: {
    storefrontHello: () => ({ foo: 'hi storefront' }),
  },
};
