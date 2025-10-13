import { type FC } from 'react';

import { Badge, Label } from '@vendyx/ui';

import { useVariantContext, type VariantContext } from '../../variants/variants.context';

export const OptionDetailsPreview: FC<Props> = ({ option }) => {
  const { updateOption } = useVariantContext();

  return (
    <button
      type="button"
      className="hover:bg-muted/50 w-full flex flex-col gap-4 p-4 "
      onClick={() =>
        updateOption(option.id, {
          ...option,
          isEditing: true,
          values: [...option.values, { id: Math.random().toString(), name: '' }]
        })
      }
    >
      <Label className="text-left">{option.name}</Label>
      <div className="flex items-center gap-2 flex-wrap">
        {option.values.map(value => (
          <Badge key={value.id} variant="secondary">
            {value.color && (
              <div className="h-4 w-4 rounded mr-2" style={{ background: `#${value.color}` }} />
            )}
            {value.name}
          </Badge>
        ))}
      </div>
    </button>
  );
};

type Props = {
  option: VariantContext['options'][0];
};
