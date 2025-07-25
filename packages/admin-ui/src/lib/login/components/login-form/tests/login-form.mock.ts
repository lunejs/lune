export const SUCCESS_GENERATE_USER_ACCESS_TOKEN_RESPONSE = {
  generateUserAccessToken: {
    accessToken: 'mocked-token',
    apiErrors: []
  }
};

export const INVALID_CREDENTIALS_USER_ACCESS_TOKEN_RESPONSE = {
  generateUserAccessToken: {
    accessToken: null,
    apiErrors: [
      {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid credentials'
      }
    ]
  }
};
