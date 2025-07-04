export const GENERATE_USER_ACCESS_TOKEN_MUTATION = /* GraphQL */ `
  mutation generateUserAccessToken($input: GenerateUserAccessTokenInput!) {
    generateUserAccessToken(input: $input) {
      apiErrors {
        code
        message
      }
      accessToken
    }
  }
`;
