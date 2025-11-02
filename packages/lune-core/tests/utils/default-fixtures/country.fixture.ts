import type { CountryTable } from '@/persistence/entities/country';

export const DefaultCountryFixture = (): CountryTable => ({
  id: crypto.randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  name: 'Narnia',
  code: `NA`
});
