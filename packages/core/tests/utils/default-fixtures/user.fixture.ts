import { UserTable } from '@/persistence/entities/user';

export const DefaultUserFixture: UserTable = {
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  email: '',
  password: ''
};
