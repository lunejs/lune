export const SUCCESS_CREATE_SHOP_RESPONSE = {
  createShop: {
    apiErrors: [],
    shop: {
      id: '1',
      slug: 'acme-store'
    }
  }
};

export const EMAIL_ALREADY_EXISTS_CREATE_SHOP_RESPONSE = {
  createShop: {
    apiErrors: [
      {
        message: 'Shop with the provided email already exists',
        code: 'EMAIL_ALREADY_EXISTS'
      }
    ],
    shop: null
  }
};
