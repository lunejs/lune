import { useState } from 'react';
import {
  CircleFadingPlusIcon,
  CircleIcon,
  GripVerticalIcon,
  ListIcon,
  MoreVerticalIcon,
  XIcon
} from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import { isLast } from '@lune/common';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FormInput,
  FormSelect
} from '@lune/ui';

import type { CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { CUSTOM_FIELD_TYPE_GROUPS } from '@/lib/custom-fields/utils/custom-field.utils';
import { SortableItem } from '@/shared/components/sortable-list/sortable-item';
import { SortableList } from '@/shared/components/sortable-list/sortable-list';

import { useCustomObjectFormContext } from '../use-form/use-form';

import { RemoveCustomFieldButton } from './remove/remove-custom-field-button';

export const CustomObjectFields = () => {
  const form = useCustomObjectFormContext();

  const [fieldToRemove, setFieldToRemove] = useState<CommonCustomFieldDefinitionFragment | null>(
    null
  );

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
            {fields.map((field, i) => {
              const persistedField = form.definition?.fields.find(f => f.id === field.fieldId);

              return (
                <SortableItem key={field.id} itemId={field.id}>
                  {({ attributes, listeners, isDragging }) => {
                    return (
                      <div
                        className={cn(
                          'z-10 flex flex-col gap-4 px-6 py-4 md:flex-row',
                          !isLast(i, fields) && 'border-b',
                          isDragging && 'border-transparent bg-muted/50'
                        )}
                      >
                        <div className="flex items-center gap-4">
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
                            className="flex-1 md:w-1/2"
                            placeholder="Field label"
                          />

                          {persistedField && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild className="md:hidden">
                                <Button variant={'ghost'} size={'icon'}>
                                  <MoreVerticalIcon />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                  <span className="font-semibold">key:</span> {persistedField.key}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive hover:text-destructive!"
                                  onClick={() => setFieldToRemove(persistedField)}
                                >
                                  <XIcon className="text-destructive" /> Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>

                        <div className="flex flex-col items-start gap-4 md:flex-row">
                          <FormSelect
                            disabled={!!persistedField}
                            control={form.control}
                            name={`fields.${i}.quantity`}
                            items={[
                              { label: 'One value', value: 'single', icon: CircleIcon },
                              { label: 'List of values', value: 'multiple', icon: ListIcon }
                            ]}
                            className="w-full md:w-40"
                          />

                          <FormSelect
                            disabled={!!persistedField}
                            control={form.control}
                            name={`fields.${i}.type`}
                            placeholder="Select a type"
                            className="w-full md:w-44 shrink-0"
                            groups={CUSTOM_FIELD_TYPE_GROUPS}
                          />
                        </div>

                        {fields.length > 1 && !persistedField && (
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => remove(i)}
                          >
                            <XIcon />
                          </Button>
                        )}

                        {persistedField && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild className="hidden md:inline-flex">
                              <Button variant={'ghost'} size={'icon'}>
                                <MoreVerticalIcon />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuLabel>
                                <span className="font-semibold">key:</span> {persistedField.key}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive hover:text-destructive!"
                                onClick={() => setFieldToRemove(persistedField)}
                              >
                                <XIcon className="text-destructive" /> Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    );
                  }}
                </SortableItem>
              );
            })}
          </div>
        </SortableList>

        <RemoveCustomFieldButton
          isOpen={!!fieldToRemove}
          setIsOpen={value => (value ? setFieldToRemove(fieldToRemove) : setFieldToRemove(null))}
          definition={fieldToRemove as CommonCustomFieldDefinitionFragment}
        />

        <div className="border-t px-6 py-4">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => append({ name: '', quantity: 'single', type: '' as any })}
          >
            <CircleFadingPlusIcon size={16} />
            Add field
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
