import { createContext, type ReactNode, useContext } from 'react';

type Schema = Record<string, any>;

const Context = createContext<Schema>({});

export const PageContextProvider = <T extends Schema>({
  children,
  value
}: {
  children: ReactNode;
  value: T;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useEntityContext = <T,>() => useContext(Context) as T;
