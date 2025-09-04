import { Transaction } from '@/persistence/connection';
import { Serializer } from '@/persistence/serializers/serializer';

import { Repository } from '../repository';

export const recordsMock: TestTable[] = [
  {
    id: crypto.randomUUID(),
    email: 'ellie@williams.com',
    password: 'password123',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: crypto.randomUUID(),
    email: 'joel@miller.com',
    password: 'password123',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: crypto.randomUUID(),
    email: 'natha@drake.com',
    password: 'password123',
    is_active: false,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: crypto.randomUUID(),
    email: 'sam@drake.com',
    password: 'password123',
    is_active: false,
    created_at: new Date(),
    updated_at: new Date()
  }
];

export class TestRepository extends Repository<TestEntity, TestTable> {
  constructor(table: string, trx: Transaction) {
    super(table, trx, new TestSerializer());
  }
}

class TestSerializer extends Serializer<TestEntity, TestTable> {
  constructor() {
    super([
      ['id', 'id'],
      ['created_at', 'createdAt'],
      ['updated_at', 'updatedAt'],
      ['deleted_at', 'deletedAt'],
      ['email', 'email'],
      ['password', 'password'],
      ['is_active', 'isActive']
    ]);
  }
}

export type TestEntity = {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

type TestTable = {
  id: string;
  email: string;
  password: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};
