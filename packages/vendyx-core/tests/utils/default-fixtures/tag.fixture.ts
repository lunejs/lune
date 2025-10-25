import type { TagTable } from '@/persistence/entities/tag';

export const DefaultTagFixture = (): TagTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  shop_id: crypto.randomUUID()
});
