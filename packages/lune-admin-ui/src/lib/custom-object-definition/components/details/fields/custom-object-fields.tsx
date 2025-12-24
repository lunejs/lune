import { useState } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CircleFadingPlusIcon, CircleIcon, GripVerticalIcon, XIcon } from 'lucide-react';

import { isLast } from '@lune/common';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@lune/ui';

import { CustomFieldType } from '@/lib/api/types';
import { getCustomFieldTypeData } from '@/lib/custom-fields/utils/custom-field.utils';

interface Field {
  id: string;
  name: string;
  quantity: 'single' | 'list';
  type: string;
}

const createField = (): Field => ({
  id: crypto.randomUUID(),
  name: '',
  quantity: 'single',
  type: ''
});

export const CustomObjectFields = () => {
  const [fields, setFields] = useState<Field[]>([createField()]);
  console.log({ fields });

  // Handlers
  const append = () => setFields(prev => [...prev, createField()]);

  const remove = (index: number) => setFields(prev => prev.filter((_, i) => i !== index));

  const updateField = (index: number, key: keyof Omit<Field, 'id'>, value: string) => {
    setFields(prev => prev.map((f, i) => (i === index ? { ...f, [key]: value } : f)));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFields(prev => {
        const oldIndex = prev.findIndex(f => f.id === active.id);
        const newIndex = prev.findIndex(f => f.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <Card className="pb-0 gap-0">
      <CardHeader className="flex border-b">
        <CardTitle>Fields</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-0">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col">
              {fields.map((field, i) => (
                <SortableItem key={field.id} id={field.id}>
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

                      <Input
                        type="text"
                        value={field.name}
                        onChange={e => updateField(i, 'name', e.target.value)}
                        className="w-1/2 "
                        placeholder="Field label"
                      />

                      <div className="flex items-end gap-4 flex-1">
                        <Select defaultValue="single">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">
                              <CircleIcon /> One value
                            </SelectItem>
                            <SelectItem value="list">
                              <CircleIcon /> List of values
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          value={field.type}
                          onValueChange={value => updateField(i, 'type', value)}
                        >
                          <SelectTrigger className="w-44 shrink-0">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Text</SelectLabel>
                              <SelectItem value={CustomFieldType.SingleLineText}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(
                                    CustomFieldType.SingleLineText
                                  ).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Single line text
                              </SelectItem>
                              <SelectItem value={CustomFieldType.MultiLineText}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(
                                    CustomFieldType.MultiLineText
                                  ).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Multi line text
                              </SelectItem>
                            </SelectGroup>

                            <SelectGroup>
                              <SelectLabel>Number</SelectLabel>
                              <SelectItem value={CustomFieldType.Integer}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(CustomFieldType.Integer).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Integer
                              </SelectItem>
                              <SelectItem value={CustomFieldType.Decimal}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(CustomFieldType.Decimal).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Decimal
                              </SelectItem>
                              <SelectItem value={CustomFieldType.Money}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(CustomFieldType.Money).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Money
                              </SelectItem>
                            </SelectGroup>

                            <SelectGroup>
                              <SelectLabel>Media</SelectLabel>
                              <SelectItem value={CustomFieldType.Image}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(CustomFieldType.Image).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Image
                              </SelectItem>
                            </SelectGroup>

                            <SelectGroup>
                              <SelectLabel>Reference</SelectLabel>
                              <SelectItem value={`${CustomFieldType.Reference}:product`}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(
                                    `${CustomFieldType.Reference}:product`
                                  ).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Product
                              </SelectItem>
                              <SelectItem value={`${CustomFieldType.Reference}:collection`}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(
                                    `${CustomFieldType.Reference}:collection`
                                  ).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Collection
                              </SelectItem>
                              <SelectItem value={`${CustomFieldType.Reference}:customer`}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(
                                    `${CustomFieldType.Reference}:customer`
                                  ).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Customer
                              </SelectItem>
                              <SelectItem value={`${CustomFieldType.Reference}:order`}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(
                                    `${CustomFieldType.Reference}:order`
                                  ).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Order
                              </SelectItem>
                            </SelectGroup>

                            <SelectGroup>
                              <SelectLabel>Other</SelectLabel>
                              <SelectItem value={CustomFieldType.Boolean}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(CustomFieldType.Boolean).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Boolean
                              </SelectItem>
                              <SelectItem value={CustomFieldType.Date}>
                                {(() => {
                                  const Icon = getCustomFieldTypeData(CustomFieldType.Date).icon;
                                  return Icon ? <Icon size={16} /> : null;
                                })()}
                                Date
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
          </SortableContext>
        </DndContext>

        <div className="border-t px-6 py-4">
          <Button size="sm" variant="outline" type="button" onClick={append}>
            <CircleFadingPlusIcon size={16} />
            Add field
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

type UseSortableReturn = Omit<
  ReturnType<typeof useSortable>,
  'setNodeRef' | 'transform' | 'transition'
>;

function SortableItem(props: {
  id: string;
  children: (args: UseSortableReturn) => React.ReactNode;
}) {
  const { setNodeRef, transform, transition, ...rest } = useSortable({
    id: props.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: rest.isDragging ? '50' : undefined
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children({ ...rest })}
    </div>
  );
}
