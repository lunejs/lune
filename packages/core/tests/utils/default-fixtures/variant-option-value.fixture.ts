import { VariantOptionValueTable } from '@/persistence/entities/variant-option-value';

export const DefaultVariantOptionValueFixture = (): VariantOptionValueTable => ({
  variant_id: crypto.randomUUID(),
  option_value_id: crypto.randomUUID()
});
