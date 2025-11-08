import type { ZoneStateTable } from '@/persistence/entities/zone-state';

export const DefaultZoneStateFixture = (): ZoneStateTable => ({
  zone_id: crypto.randomUUID(),
  state_id: crypto.randomUUID()
});
