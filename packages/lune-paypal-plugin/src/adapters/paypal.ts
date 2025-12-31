import type { CreateOrderRequestBody, OrderResponseBody } from '@paypal/paypal-js';
import axios from 'axios';

import type { PaypalPluginConfig } from '../paypal.plugin';

import type {
  CreatePaypalOrderResponse,
  PaypalCapturePaymentResponse,
  PaypalGenerateAccessTokenResponse
} from './paypal.types';

const PAYPAL_SANDBOX_BASE_URL = 'https://api-m.sandbox.paypal.com';
const PAYPAL_LIVE_BASE_URL = 'https://api-m.paypal.com';

export class PayPal {
  private static config: Config;

  static init(config: Config) {
    this.config = config;
  }

  /**
   * Create a paypal order
   *
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
   */
  async createOrder(input: CreateOrderRequestBody) {
    const accessToken = await this.generateAccessToken();

    const { data } = await axios.post<CreatePaypalOrderResponse>(
      `${this.getBaseUrl()}/v2/checkout/orders`,
      input,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
          // Uncomment one of these to force an error for negative testing (in sandbox mode only).
          // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
          // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }
      }
    );

    return data;
  }

  /**
   * Capture payment for a paypal order
   *
   * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
   */
  async capturePayment(orderId: string) {
    const accessToken = await this.generateAccessToken();

    const { data } = await axios.post<PaypalCapturePaymentResponse>(
      `${this.getBaseUrl()}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
          // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
          // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
          // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
          // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        }
      }
    );

    return data;
  }

  /**
   * Get paypal order details
   */
  async getOrderDetails(orderId: string) {
    const accessToken = await this.generateAccessToken();

    const { data } = await axios.get<OrderResponseBody>(
      `${this.getBaseUrl()}/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return data;
  }

  /**
   * Generates an access token for the paypal api
   *
   * @see https://developer.paypal.com/api/rest/#link-getaccesstoken
   */
  private async generateAccessToken() {
    if (PayPal.config) throw new Error('Paypal config should be present');

    const { clientId, secret } = PayPal.config;

    if (!clientId || !secret) {
      throw new Error('Paypal client id and secret are required');
    }

    const token = Buffer.from(clientId + ':' + secret).toString('base64');

    const { data } = await axios.post<PaypalGenerateAccessTokenResponse>(
      `${this.getBaseUrl()}/v1/oauth2/token`,
      { grant_type: 'client_credentials' },
      {
        headers: {
          Authorization: `Basic ${token}`,
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return data.access_token;
  }

  private getBaseUrl() {
    return PayPal.config.devMode ? PAYPAL_SANDBOX_BASE_URL : PAYPAL_LIVE_BASE_URL;
  }
}

type Config = PaypalPluginConfig;
