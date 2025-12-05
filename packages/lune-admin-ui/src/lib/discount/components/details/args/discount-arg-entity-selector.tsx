import { ArgEntity } from '@/lib/api/types';
import { type EnhancedArg, EnhancedArgType } from '@/lib/api/types';
import { ArgVariantEntitySelectorTable } from '@/shared/components/args/entity-selector/variant/arg-variant-entity-selector-table';

import { useDiscountDetailsFormContext } from '../use-form/use-form';

export const DiscountArgEntitySelector = ({ entity }: Props) => {
  const {
    setValue,
    getValues,
    handler,
    formState: { defaultValues }
  } = useDiscountDetailsFormContext();

  const [key, arg] = findCustomArg(handler.args, entity);

  const onChange = (value: string[]) => {
    if (!key) return;

    setValue('metadata', {
      ...getValues('metadata'),
      [key]: value
    });
  };

  if (!key || !arg) return null;

  const defaultEntities = (defaultValues?.metadata ?? {})[key] as string[];

  if (entity === ArgEntity.Variant)
    return (
      <ArgVariantEntitySelectorTable defaultSelected={defaultEntities} onValueChange={onChange} />
    );

  // TODO: add warn log no discount component support
  return null;
};

const findCustomArg = (
  args: Record<string, EnhancedArg>,
  entity: ArgEntity
): [string | null, EnhancedArg | null] => {
  for (const [key, arg] of Object.entries(args)) {
    if (typeof arg !== 'object' || !arg) continue;

    if (arg.type !== EnhancedArgType.EntitySelector || arg.entity !== entity) {
      continue;
    }

    return [key, arg];
  }

  return [null, null];
};

type Props = {
  entity: ArgEntity;
};
