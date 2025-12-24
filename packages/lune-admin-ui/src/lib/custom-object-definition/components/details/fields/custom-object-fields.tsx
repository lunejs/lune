import { CircleFadingPlusIcon, CircleIcon, GripVerticalIcon, ListIcon, XIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import { isLast } from '@lune/common';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  FormInput,
  FormSelect
} from '@lune/ui';

import { CUSTOM_FIELD_TYPE_GROUPS } from '@/lib/custom-fields/utils/custom-field.utils';
import { SortableItem } from '@/shared/components/sortable-list/sortable-item';
import { SortableList } from '@/shared/components/sortable-list/sortable-list';

import { useCustomObjectFormContext } from '../use-form/use-form';

export const CustomObjectFields = () => {
  const form = useCustomObjectFormContext();

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'fields'
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id);
      const newIndex = fields.findIndex(f => f.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  return (
    <Card className="pb-0 gap-0">
      <CardHeader className="flex border-b">
        <CardTitle>Fields</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-0">
        <SortableList items={fields.map(f => f.id)} onDragEnd={handleDragEnd}>
          <div className="flex flex-col">
            {fields.map((field, i) => (
              <SortableItem key={field.id} itemId={field.id}>
                {({ attributes, listeners, isDragging }) => (
                  <div
                    className={cn(
                      'z-10 flex items-center gap-4 px-6 py-4',
                      !isLast(i, fields) && 'border-b',
                      isDragging && 'border-transparent bg-muted/50'
                    )}
                  >
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className={cn('cursor-grab', isDragging && 'cursor-grabbing')}
                        {...attributes}
                        {...listeners}
                      >
                        <GripVerticalIcon />
                      </Button>
                    )}

                    <FormInput
                      control={form.control}
                      name={`fields.${i}.name`}
                      className="w-1/2"
                      placeholder="Field label"
                    />

                    <div className="flex items-end gap-4 flex-1">
                      <FormSelect
                        control={form.control}
                        name={`fields.${i}.quantity`}
                        items={[
                          { label: 'One value', value: 'single', icon: CircleIcon },
                          { label: 'List of values', value: 'list', icon: ListIcon }
                        ]}
                        className="w-40"
                      />

                      <FormSelect
                        control={form.control}
                        name={`fields.${i}.type`}
                        placeholder="Select a type"
                        className="w-44 shrink-0"
                        groups={CUSTOM_FIELD_TYPE_GROUPS}
                      />
                    </div>

                    {fields.length > 1 && (
                      <Button type="button" size="icon" variant="ghost" onClick={() => remove(i)}>
                        <XIcon />
                      </Button>
                    )}
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableList>

        <div className="border-t px-6 py-4">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => append({ name: '', quantity: 'single', type: '' })}
          >
            <CircleFadingPlusIcon size={16} />
            Add field
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
