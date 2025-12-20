import * as path from 'path';

import { LunePlugin } from '@lune/core';

import { PayPal } from './adapters/paypal';
import { PayPalResolver } from './api/paypal.resolver';

export class PaypalPlugin extends LunePlugin {
  constructor(config: PaypalPluginConfig) {
    PayPal.init(config);

    super({
      storefrontApiExtension: {
        typePaths: [path.join(__dirname, './paypal.gql')],
        resolvers: [PayPalResolver]
      }
    });
  }
}

export type PaypalPluginConfig = {
  /**
   * Paypal client id
   *
   * @see https://developer.paypal.com/api/rest/?&_ga=2.40671527.481548134.1721421134-1988125686.1720040522#link-getclientidandclientsecret
   */
  clientId: string;
  /**
   * Paypal secret
   *
   * @see https://developer.paypal.com/api/rest/?&_ga=2.40671527.481548134.1721421134-1988125686.1720040522#link-getclientidandclientsecret
   */
  secret: string;
  /**
   * Paypal mode
   *
   * @description
   * Set to true if you want to use paypal in sandbox mode
   */
  devMode?: boolean;
};
