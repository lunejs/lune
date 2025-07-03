import { UserTable } from '@/persistence/entities/user';

export const CREATE_USER_MUTATION = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      apiErrors {
        code
        message
      }
      user {
        id
        email
      }
    }
  }
`;

const userAlreadyCreated: Partial<UserTable> = {
  email: 'existing@email.com',
  password: '12345678'
};

export const createUserMock = {
  userAlreadyCreated
};
