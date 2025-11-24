import { type FC } from 'react';
import { WorkflowIcon } from 'lucide-react';

import { Badge, Label, Tooltip, TooltipContent, TooltipTrigger } from '@lune/ui';

import { useVariantContext, type VariantContext } from '../../variants/variants.context';

export const OptionDetailsPreview: FC<Props> = ({ option }) => {
  const { updateOption, presets } = useVariantContext();

  const optionPreset = presets.find(p => p.id === option.presetId);

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
      <div className="flex items-center justify-between relative">
        <Label className="text-left">{option.name}</Label>
        {optionPreset && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-1 bg-distinct/20 rounded-sm absolute right-0">
                <WorkflowIcon className="text-distinct" size={14} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Connected to <span className="font-semibold">{optionPreset.name}</span>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {option.values.map(value => {
          const presetValue = optionPreset?.values.items.find(p => p.id === value.presetId);

          return (
            <Badge key={value.id} variant="secondary" className="items-center">
              {presetValue?.metadata?.hex && (
                <div className="h-3 w-3 rounded" style={{ background: presetValue.metadata.hex }} />
              )}
              {value.name}
            </Badge>
          );
        })}
      </div>
    </button>
  );
};

type Props = {
  option: VariantContext['options'][0];
};
