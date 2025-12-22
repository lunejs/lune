import { useState } from 'react';

import { genUUID } from '../utils/id.utils';

export const useList = <T = unknown>(defaultItems: Item<T>['value'][]) => {
  const [items, setItems] = useState<Item<T>[]>(defaultItems.map(item => new Item(item)) ?? []);

  const append = (value: T) => setItems(prev => [...prev, new Item(value)]);
  const remove = (id: string) => setItems(prev => prev.filter(v => v.id !== id));
  const reset = (values: Item<T>[]) => setItems(values);
  const build = (value: Item<T>['value']) => new Item(value);

  const update = (id: string, value: T) => {
    setItems(prev => prev.map(v => (v.id === id ? { ...v, value } : v)));
  };

  return {
    append,
    remove,
    build,
    update,
    reset,
    items
  };
};

class Item<T> {
  id: string;

  constructor(public value: T) {
    this.id = genUUID();
  }
}
