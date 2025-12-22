import {
  BoxesIcon,
  CalendarIcon,
  DollarSignIcon,
  HashIcon,
  ImageIcon,
  type LucideIcon,
  PackageIcon,
  ShoppingCartIcon,
  TextIcon,
  ToggleLeftIcon,
  TypeIcon,
  UserIcon
} from 'lucide-react';

import { CustomFieldAppliesToEntity, CustomFieldType } from '@/lib/api/types';

class CustomFieldTypeData {
  constructor(
    readonly title: string,
    readonly icon: LucideIcon
  ) {}
}

const DATA: Record<string, CustomFieldTypeData> = {
  // Text
  [CustomFieldType.SingleLineText]: new CustomFieldTypeData('Single line text', TypeIcon),
  [CustomFieldType.MultiLineText]: new CustomFieldTypeData('Multi line text', TextIcon),

  // Number
  [CustomFieldType.Integer]: new CustomFieldTypeData('Integer', HashIcon),
  [CustomFieldType.Decimal]: new CustomFieldTypeData('Decimal', HashIcon),
  [CustomFieldType.Money]: new CustomFieldTypeData('Money', DollarSignIcon),

  // Media
  [CustomFieldType.Image]: new CustomFieldTypeData('Image', ImageIcon),

  // Other
  [CustomFieldType.Boolean]: new CustomFieldTypeData('Boolean', ToggleLeftIcon),
  [CustomFieldType.Date]: new CustomFieldTypeData('Date', CalendarIcon),

  // Reference
  [`${CustomFieldType.Reference}:product`]: new CustomFieldTypeData('Product', PackageIcon),
  [`${CustomFieldType.Reference}:collection`]: new CustomFieldTypeData('Collection', BoxesIcon),
  [`${CustomFieldType.Reference}:customer`]: new CustomFieldTypeData('Customer', UserIcon),
  [`${CustomFieldType.Reference}:order`]: new CustomFieldTypeData('Order', ShoppingCartIcon)
};

export const getEntityName = (entity: CustomFieldAppliesToEntity) => {
  const NAMES = {
    [CustomFieldAppliesToEntity.Product]: 'Product',
    [CustomFieldAppliesToEntity.Collection]: 'Collection'
  };

  return NAMES[entity];
};

export const getCustomFieldTypeData = (type: CustomFieldType | string) => DATA[type];

export const isTranslatable = (type: CustomFieldType) =>
  [CustomFieldType.SingleLineText, CustomFieldType.MultiLineText].includes(type);
