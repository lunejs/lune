import { BoxesIcon, PackageIcon, SquircleDashedIcon } from 'lucide-react';

import { Card, CardContent, cn } from '@lunejs/ui';

import {
  type CommonCustomFieldDefinitionFragment,
  CustomFieldAppliesToEntity
} from '@/lib/api/types';

import { CustomFieldsListItem } from './custom-fields-list-item';

export const CustomFieldsList = ({ customFields }: Props) => {
  const productCount = customFields.filter(
    cf => cf.appliesToEntity === CustomFieldAppliesToEntity.Product
  ).length;
  const collectionCount = customFields.filter(
    cf => cf.appliesToEntity === CustomFieldAppliesToEntity.Collection
  ).length;
  const optionValueCount = customFields.filter(
    cf => cf.appliesToEntity === CustomFieldAppliesToEntity.OptionValue
  ).length;

  return (
    <Card className={cn('overflow-hidden p-0')}>
      <CardContent className="p-0 divide-y">
        <CustomFieldsListItem
          quantity={productCount}
          entity={CustomFieldAppliesToEntity.Product}
          icon={PackageIcon}
        />
        <CustomFieldsListItem
          quantity={collectionCount}
          entity={CustomFieldAppliesToEntity.Collection}
          icon={BoxesIcon}
        />
        <CustomFieldsListItem
          quantity={optionValueCount}
          entity={CustomFieldAppliesToEntity.OptionValue}
          icon={SquircleDashedIcon}
        />
      </CardContent>
    </Card>
  );
};

type Props = {
  customFields: CommonCustomFieldDefinitionFragment[];
};
