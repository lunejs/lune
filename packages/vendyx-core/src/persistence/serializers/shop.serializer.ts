import { Shop, ShopTable } from '../entities/shop';

import { Serializer } from './serializer';

export class ShopSerializer extends Serializer<Shop, ShopTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['name', 'name'],
      ['slug', 'slug'],
      ['shop_api_key', 'shopApiKey'],
      ['email', 'email'],
      ['phone_number', 'phoneNumber'],
      ['logo', 'logo'],
      ['socials', 'socials'],
      ['storefront_url', 'storefrontUrl']
    ]);
  }
}
