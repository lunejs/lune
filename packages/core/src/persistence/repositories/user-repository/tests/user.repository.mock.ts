import { User } from '@/persistence/entities/user';

export const userRepositoryMock: Partial<User>[] = [
  {
    email: 'astrid@gmail.com',
    password: 'hashed-password-1'
  }
];
