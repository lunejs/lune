import { ArgComponent, type EnhancedArg, EnhancedArgType } from '@/lib/api/types';

import { useDiscountDetailsFormContext } from '../use-form/use-form';

import { DiscountValue } from './discount-value/discount-value';
import { DiscountOrderRequirements } from './order-requirements/discount-order-requirements';

export const DiscountArgComponent = ({ component }: Props) => {
  const { handler } = useDiscountDetailsFormContext();

  const [key, arg] = findCustomArg(handler.args, component);

  if (!key || !arg) return null;

  if (component === ArgComponent.DiscountValue) return <DiscountValue argKey={key} />;
  if (component === ArgComponent.DiscountOrderRequirements)
    return <DiscountOrderRequirements argKey={key} />;

  // TODO: add warn log no discount component support
  return null;
};

const findCustomArg = (
  args: Record<string, EnhancedArg>,
  component: ArgComponent
): [string | null, EnhancedArg | null] => {
  for (const [key, arg] of Object.entries(args)) {
    if (typeof arg !== 'object' || !arg) continue;

    if (arg.type !== EnhancedArgType.Custom || arg.component !== component) {
      continue;
    }

    return [key, arg];
  }

  return [null, null];
};

type Props = {
  component: ArgComponent;
};
