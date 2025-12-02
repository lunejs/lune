import type { DiscountApplicationLevel, DiscountApplicationMode } from '@/lib/api/types';

import { DiscountsTableEmptyState } from './empty-state';
import { useDiscountsTable } from './use-discounts-table';

export const DiscountsTable = () => {
  const { isLoading, discounts, hasFiltersApplied } = useDiscountsTable();

  if (!isLoading && !hasFiltersApplied && !discounts.length) return <DiscountsTableEmptyState />;
};

export type DiscountsTableRow = {
  id: string;
  code: string;
  applicationMode: DiscountApplicationMode;
  applicationLevel: DiscountApplicationLevel;
  enabled: boolean;
  startsAt: Date;
  endsAt?: Date;
};
