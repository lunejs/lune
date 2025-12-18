import { createContext, type ReactNode, use } from 'react';

import type { AdminUiConfig } from './admin-ui-config';

type AdminUiContext = {
  config: AdminUiConfig;
};

const Context = createContext<AdminUiContext>({
  config: {
    apiUrl: ''
  }
});

export const AdminUiContextProvider = ({ config, children }: Props) => {
  return <Context.Provider value={{ config }}>{children}</Context.Provider>;
};

export const useAdminUiContext = () => use(Context);

type Props = {
  children: ReactNode;
  config: AdminUiConfig;
};
