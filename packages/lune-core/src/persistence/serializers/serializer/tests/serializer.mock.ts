import { Serializer } from '../serializer';

type TestEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  followers: { user: string; photo: string }[];
};

type TestTable = {
  id: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  password: string;
  followers: string;
};

const MockedTestRow: Partial<TestTable> = {
  id: '123',
  created_at: new Date('2023-01-01T00:00:00Z'),
  updated_at: new Date('2023-01-02T00:00:00Z'),
  email: 'ellie.williams@us.com',
  password: 'hashed_password',
  followers: '[]'
};

const MockedPartialTestRow: Partial<TestTable> = {
  id: '123',
  created_at: new Date('2023-01-01T00:00:00Z'),
  email: 'alison.madden@gmail.com',
  followers: '[]'
};

const MockedTestEntity: Partial<TestEntity> = {
  id: '123',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-02T00:00:00Z'),
  email: 'joel.miller@us.com',
  password: 'hashed_password',
  followers: []
};

const MockedPartialTestEntity: Partial<TestEntity> = {
  id: '123',
  createdAt: new Date('2023-01-01T00:00:00Z'),
  email: 'troy@staff.com'
};

export class TestSerializer extends Serializer<TestEntity, TestTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['email', 'email'],
      ['password', 'password'],
      ['followers', 'followers']
    ]);
  }
}

export const TestSerializerMock = {
  MockedTestRow,
  MockedPartialTestRow,
  MockedPartialTestEntity,
  MockedTestEntity
};
