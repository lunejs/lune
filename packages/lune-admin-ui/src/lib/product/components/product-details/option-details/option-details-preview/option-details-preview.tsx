import { type FC } from 'react';
import { Badge, Label, Tooltip, TooltipContent, TooltipTrigger } from '@lunejs/ui';
import { WorkflowIcon } from 'lucide-react';
import { Link } from 'react-router';

import { getEntryColorValue } from '@/lib/product/utils/option-values.utils';

import { useVariantContext, type VariantContext } from '../../variants/variants.context';

export const OptionDetailsPreview: FC<Props> = ({ option }) => {
  const { updateOption, customObjects } = useVariantContext();

  const customObject = customObjects.find(co => co.id === option.customObjectId);
  const customObjectEntries = customObject?.entries.items ?? [];

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
        {customObject && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-1 bg-distinct/20 rounded-sm absolute right-0">
                <WorkflowIcon className="text-distinct" size={14} />
              </div>
            </TooltipTrigger>
            <TooltipContent onClick={e => e.stopPropagation()}>
              Connected to{' '}
              <Link
                to={`/custom-objects/${customObject.id}`}
                className="font-semibold hover:underline"
              >
                {customObject.name}
              </Link>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {option.values.map(value => {
          const entry = customObjectEntries.find(e => e.id === value.customObjectEntryId);
          const colorValue = entry ? getEntryColorValue(entry) : null;

          return (
            <Badge key={value.id} variant="secondary" className="items-center">
              {colorValue && <div className="h-3 w-3 rounded" style={{ background: colorValue }} />}
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
