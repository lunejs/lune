import { graphql } from '../codegen';

export const COMMON_USER_FRAGMENT = graphql(`
  fragment CommonUser on User {
    id
    email
  }
`);

export const WHOAMI_QUERY = graphql(`
  query Whoami {
    whoami {
      ...CommonUser
    }
  }
`);

export const GENERATE_ACCESS_TOKEN_MUTATION = graphql(`
  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {
    generateUserAccessToken(input: $input) {
      apiErrors {
        code
        message
      }
      accessToken
    }
  }
`);
