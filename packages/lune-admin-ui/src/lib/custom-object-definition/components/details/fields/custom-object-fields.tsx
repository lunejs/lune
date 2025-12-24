import { CircleFadingPlusIcon, GripVerticalIcon, XIcon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import { Button, Card, CardContent, CardHeader, CardTitle, FormInput, FormSelect } from '@lune/ui';

import { CustomFieldType } from '@/lib/api/types';
import { getCustomFieldTypeData } from '@/lib/custom-fields/utils/custom-field.utils';

import { CustomFieldIsList } from '../is-list/custom-field-is-list';
import { useCustomObjectFormContext } from '../use-form/use-form';

export const CustomObjectFields = () => {
  const form = useCustomObjectFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields'
  });

  return (
    <Card className="pb-0 gap-0">
      <CardHeader className="flex border-b">
        <CardTitle>Fields</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-0">
        <div className="flex flex-col divide-y">
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-4 px-6 py-4">
              {fields.length > 1 && (
                <Button size={'icon'} variant={'ghost'}>
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
                <CustomFieldIsList index={i} />

                <FormSelect
                  disabled={!!form.definition}
                  control={form.control}
                  name={`fields.${i}.type`}
                  placeholder="Select a type"
                  groups={[
                    {
                      label: 'Text',
                      items: [
                        {
                          label: 'Single line text',
                          value: CustomFieldType.SingleLineText,
                          icon: getCustomFieldTypeData(CustomFieldType.SingleLineText).icon
                        },
                        {
                          label: 'Multi line text',
                          value: CustomFieldType.MultiLineText,
                          icon: getCustomFieldTypeData(CustomFieldType.MultiLineText).icon
                        }
                      ]
                    },
                    {
                      label: 'Number',
                      items: [
                        {
                          label: 'Integer',
                          value: CustomFieldType.Integer,
                          icon: getCustomFieldTypeData(CustomFieldType.Integer).icon
                        },
                        {
                          label: 'Decimal',
                          value: CustomFieldType.Decimal,
                          icon: getCustomFieldTypeData(CustomFieldType.Decimal).icon
                        },
                        {
                          label: 'Money',
                          value: CustomFieldType.Money,
                          icon: getCustomFieldTypeData(CustomFieldType.Money).icon
                        }
                      ]
                    },
                    {
                      label: 'Media',
                      items: [
                        {
                          label: 'Image',
                          value: CustomFieldType.Image,
                          icon: getCustomFieldTypeData(CustomFieldType.Image).icon
                        }
                      ]
                    },
                    {
                      label: 'Reference',
                      items: [
                        {
                          label: 'Product',
                          value: `${CustomFieldType.Reference}:product`,
                          icon: getCustomFieldTypeData(`${CustomFieldType.Reference}:product`).icon
                        },
                        {
                          label: 'Collection',
                          value: `${CustomFieldType.Reference}:collection`,
                          icon: getCustomFieldTypeData(`${CustomFieldType.Reference}:collection`)
                            .icon
                        },
                        {
                          label: 'Customer',
                          value: `${CustomFieldType.Reference}:customer`,
                          icon: getCustomFieldTypeData(`${CustomFieldType.Reference}:customer`).icon
                        },
                        {
                          label: 'Order',
                          value: `${CustomFieldType.Reference}:order`,
                          icon: getCustomFieldTypeData(`${CustomFieldType.Reference}:order`).icon
                        }
                      ]
                    },
                    {
                      label: 'Other',
                      items: [
                        {
                          label: 'Boolean',
                          value: CustomFieldType.Boolean,
                          icon: getCustomFieldTypeData(CustomFieldType.Boolean).icon
                        },
                        {
                          label: 'Date',
                          value: CustomFieldType.Date,
                          icon: getCustomFieldTypeData(CustomFieldType.Date).icon
                        }
                      ]
                    }
                  ]}
                  className="w-44 shrink-0"
                />
              </div>
              {fields.length > 1 && (
                <Button size={'icon'} variant={'ghost'} onClick={() => remove(i)}>
                  <XIcon />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="border-t px-6 py-4">
          <Button
            size={'sm'}
            variant={'outline'}
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
