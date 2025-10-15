import { type Context, createContext, type ReactNode, use } from 'react';
import type { Table } from '@tanstack/react-table';

type Schema<TData> = {
  table: Table<TData>;
};

const Context = createContext({});

export const TableContextProvider = <TData,>({ children, table }: Props<TData>) => {
  return <Context.Provider value={{ table } satisfies Schema<TData>}>{children}</Context.Provider>;
};

export const useTableContext = <TData,>() => use(Context) as Schema<TData>;

type Props<TData> = {
  table: Table<TData>;
  children: ReactNode;
};
