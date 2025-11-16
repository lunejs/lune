import { createContext, type PropsWithChildren, use } from 'react';

import type { CommonShippingHandlersFragment, CommonZoneFragment } from '@/lib/api/types';

type Schema = {
  zone: CommonZoneFragment;
  handlers: CommonShippingHandlersFragment[];
};

const Context = createContext<Schema | null>(null);

export const ZoneShippingMethodProvider = ({ zone, handlers, children }: Props) => {
  return <Context.Provider value={{ zone, handlers }}>{children}</Context.Provider>;
};

type Props = PropsWithChildren & Schema;

export const useZoneShippingMethodContext = () => use(Context) as Schema;
