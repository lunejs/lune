import { User, UserTable } from '@/persistence/entities/user';

const mockedUserRow: Partial<UserTable> = {
  id: '123',
  created_at: new Date('2023-01-01T00:00:00Z'),
  updated_at: new Date('2023-01-02T00:00:00Z'),
  email: 'ellie.williams@us.com',
  password: 'hashed_password'
};

const mockedPartialUserRow: Partial<UserTable> = {
  id: '123',
  created_at: new Date('2023-01-01T00:00:00Z'),
  email: 'alison.madden@gmail.com'
};

const mockedUserEntity: Partial<User> = {
  id: '123',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-02T00:00:00Z'),
  email: 'joel.miller@us.com',
  password: 'hashed_password'
};

const mockedPartialUserEntity: Partial<User> = {
  id: '123',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  email: 'troy@staff.com'
};

export const userSerializerMock = {
  mockedUserRow,
  mockedPartialUserRow,
  mockedPartialUserEntity,
  mockedUserEntity
};
