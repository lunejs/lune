import { BarcodeIcon, BoxesIcon, PackageIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';

import { Card, CardContent, cn } from '@lune/ui';

import {
  type CommonCustomFieldDefinitionFragment,
  CustomFieldAppliesToEntity
} from '@/lib/api/types';

import { CustomFieldsTableRow } from './custom-fields-table-row';

export const CustomFieldsTable = ({ customFields }: Props) => {
  const productCount = customFields.filter(
    cf => cf.appliesToEntity === CustomFieldAppliesToEntity.Product
  ).length;
  const collectionCount = customFields.filter(
    cf => cf.appliesToEntity === CustomFieldAppliesToEntity.Collection
  ).length;

  return (
    <Card className={cn('overflow-hidden p-0')}>
      <CardContent className="p-0 divide-y">
        <CustomFieldsTableRow quantity={productCount} entity="Product" icon={PackageIcon} />
        <CustomFieldsTableRow quantity={collectionCount} entity="Collection" icon={BoxesIcon} />
        <CustomFieldsTableRow quantity={0} entity="Variant" icon={BarcodeIcon} />
        <CustomFieldsTableRow quantity={0} entity="Customer" icon={UserIcon} />
        <CustomFieldsTableRow quantity={0} entity="Order" icon={ShoppingCartIcon} />
      </CardContent>
    </Card>
  );
};

type Props = {
  customFields: CommonCustomFieldDefinitionFragment[];
};
