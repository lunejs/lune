import type { StateTable } from '@/persistence/entities/state';

export const DefaultStateFixture = (): StateTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: 'Seattle',
  code: `SE`,
  country_id: crypto.randomUUID()
});
