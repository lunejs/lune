import { BoxesIcon, PackageIcon } from 'lucide-react';

import { Card, CardContent, cn } from '@lune/ui';

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
      </CardContent>
    </Card>
  );
};

type Props = {
  customFields: CommonCustomFieldDefinitionFragment[];
};
