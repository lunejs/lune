import {
  BoxesIcon,
  CalendarIcon,
  CircleIcon,
  DollarSignIcon,
  HashIcon,
  ImageIcon,
  ListIcon,
  PackageIcon,
  ShoppingCartIcon,
  TextIcon,
  ToggleLeftIcon,
  TypeIcon,
  UserIcon
} from 'lucide-react';

import { Form, FormSelect } from '@lune/ui';

import type {
  CommonCustomFieldDefinitionFragment,
  CustomFieldAppliesToEntity
} from '@/lib/api/types';
import { CustomFieldType } from '@/lib/api/types';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';

import { getEntityName } from '../../utils/custom-field.utils';

import { CustomFieldActions } from './actions/custom-field-actions';
import { CustomFieldName } from './name/custom-field-name';
import { CustomFieldSubmitButton } from './use-form/submit-button';
import { useCustomFieldForm } from './use-form/use-form';

export const CustomFieldDetails = ({ entity, definition }: Props) => {
  const form = useCustomFieldForm(entity, definition);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={
            definition
              ? definition.name
              : `Add ${getEntityName(entity).toLowerCase()} custom fields`
          }
          subtitle={definition && `${getEntityName(entity)} custom field`}
          backUrl={`/settings/custom-fields/${entity}`}
          actions={
            <div className="flex items-center gap-4">
              {definition && <CustomFieldActions definition={definition} entity={entity} />}
              <CustomFieldSubmitButton />
            </div>
          }
          className="flex flex-col gap-4"
        >
          <CustomFieldName />

          <div className="flex items-end gap-4">
            <FormSelect
              disabled={!!definition}
              label="Type"
              control={form.control}
              name="quantity"
              items={[
                { label: 'One value', value: 'single', icon: CircleIcon },
                { label: 'List of values', value: 'multiple', icon: ListIcon }
              ]}
              className="w-40 shrink-0"
            />

            <FormSelect
              disabled={!!definition}
              control={form.control}
              name="type"
              placeholder="Select a type"
              groups={[
                {
                  label: 'Text',
                  items: [
                    {
                      label: 'Single line text',
                      value: CustomFieldType.SingleLineText,
                      icon: TypeIcon
                    },
                    {
                      label: 'Multi line text',
                      value: CustomFieldType.MultiLineText,
                      icon: TextIcon
                    }
                  ]
                },
                {
                  label: 'Number',
                  items: [
                    { label: 'Integer', value: CustomFieldType.Integer, icon: HashIcon },
                    { label: 'Decimal', value: CustomFieldType.Decimal, icon: HashIcon },
                    { label: 'Money', value: CustomFieldType.Money, icon: DollarSignIcon }
                  ]
                },
                {
                  label: 'Media',
                  items: [{ label: 'Image', value: CustomFieldType.Image, icon: ImageIcon }]
                },
                {
                  label: 'Reference',
                  items: [
                    {
                      label: 'Product',
                      value: `${CustomFieldType.Reference}:product`,
                      icon: PackageIcon
                    },
                    {
                      label: 'Collection',
                      value: `${CustomFieldType.Reference}:collection`,
                      icon: BoxesIcon
                    },
                    {
                      label: 'Customer',
                      value: `${CustomFieldType.Reference}:customer`,
                      icon: UserIcon
                    },
                    {
                      label: 'Order',
                      value: `${CustomFieldType.Reference}:order`,
                      icon: ShoppingCartIcon
                    }
                  ]
                },
                {
                  label: 'Other',
                  items: [
                    { label: 'Boolean', value: CustomFieldType.Boolean, icon: ToggleLeftIcon },
                    { label: 'Date', value: CustomFieldType.Date, icon: CalendarIcon }
                  ]
                }
              ]}
              className="w-full"
            />
          </div>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  definition?: CommonCustomFieldDefinitionFragment;
  entity: CustomFieldAppliesToEntity;
};
