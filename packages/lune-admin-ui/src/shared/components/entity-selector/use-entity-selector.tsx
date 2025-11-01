import { useEffect, useState } from 'react';

import type { EntitySelectorProps } from './entity-selector';

export const useEntitySelector = <T,>(input: Input<T>) => {
  const [selected, setSelected] = useState<T[]>(input.defaultSelected);

  useEffect(() => {
    setSelected([...input.defaultSelected, ...selected]);
  }, [input.defaultSelected]);

  const isSelected = (item: T) => {
    return selected.some(s => input.getRowId(s) === input.getRowId(item));
  };

  const onSelect = (value: boolean, item: T) => {
    if (value) {
      setSelected(prev => [...prev, item]);
    } else {
      setSelected(prev => prev.filter(p => input.getRowId(p) !== input.getRowId(item)));
    }
  };

  return {
    selected,
    isSelected,
    onSelect
  };
};

type Input<T> = Pick<EntitySelectorProps<T>, 'getRowId' | 'defaultSelected'>;
