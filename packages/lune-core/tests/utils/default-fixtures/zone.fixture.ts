import type { ZoneTable } from '@/persistence/entities/zone';

export const DefaultZoneFixture = (): ZoneTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: '',
  shop_id: crypto.randomUUID()
});
