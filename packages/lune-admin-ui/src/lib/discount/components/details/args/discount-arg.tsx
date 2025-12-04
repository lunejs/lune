import { ArgComponent, type EnhancedArg, EnhancedArgType } from '@/lib/api/types';

import { useDiscountDetailsFormContext } from '../use-form/use-form';

import { DiscountValue } from './discount-value/discount-value';
import { DiscountOrderRequirements } from './order-requirements/discount-order-requirements';

export const DiscountArg = ({ component }: Props) => {
  const { handler } = useDiscountDetailsFormContext();

  const args = Object.values(handler.args as EnhancedArg);

  const hasCustomComponentArg = findCustomArg(args, component);

  if (!hasCustomComponentArg) return null;

  if (component === ArgComponent.DiscountValue) return <DiscountValue />;
  if (component === ArgComponent.DiscountOrderRequirements) return <DiscountOrderRequirements />;

  // TODO: add warn log no discount component support
  return null;
};

const findCustomArg = (args: EnhancedArg[], component: ArgComponent) => {
  return args.find(a => a.type === EnhancedArgType.Custom && a.component === component);
};

type Props = {
  component: ArgComponent;
};
