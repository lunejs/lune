import { useCallback, useState } from 'react';
import { type DebouncedState, useDebouncedCallback } from 'use-debounce';

import { TYPING_DEBOUNCE_DELAY } from '../../utils/constants.utils';

type Pagination = {
  page: number;
  size: number;
};

const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  size: 10
};

export const useDataTable = <T extends Record<string, unknown>>(
  initialFilters: T
): UseDataTableReturn<T> => {
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  const updateFilters = useDebouncedCallback((partial: Partial<T>) => {
    setFilters(prev => ({ ...prev, ...partial }));
    setPagination(prev => ({ ...prev, page: DEFAULT_PAGINATION.page }));
  }, TYPING_DEBOUNCE_DELAY);

  const updatePagination = useCallback((partial: Partial<Pagination>) => {
    setPagination(prev => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => {
    setFilters(initialFilters);
    setPagination(DEFAULT_PAGINATION);
  }, [initialFilters]);

  return {
    filters,
    pagination,
    updateFilters,
    updatePagination,
    reset
  };
};

export type UseDataTableReturn<T> = {
  filters: T;
  pagination: Pagination;
  updateFilters: DebouncedState<(partial: Partial<T>) => void>;
  updatePagination: (partial: Partial<Pagination>) => void;
  reset: () => void;
};
