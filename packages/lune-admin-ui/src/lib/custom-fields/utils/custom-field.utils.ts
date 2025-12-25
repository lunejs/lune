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
  [CustomFieldType.ProductReference]: new CustomFieldTypeData('Product', PackageIcon),
  [CustomFieldType.CollectionReference]: new CustomFieldTypeData('Collection', BoxesIcon),
  [`customer`]: new CustomFieldTypeData('Customer', UserIcon),
  [`order`]: new CustomFieldTypeData('Order', ShoppingCartIcon)
};

export const getEntityName = (entity: CustomFieldAppliesToEntity) => {
  const NAMES: Record<CustomFieldAppliesToEntity, string> = {
    [CustomFieldAppliesToEntity.Product]: 'Product',
    [CustomFieldAppliesToEntity.Collection]: 'Collection',
    [CustomFieldAppliesToEntity.CustomObject]: 'Custom object'
  };

  return NAMES[entity];
};

export const getCustomFieldTypeData = (type: CustomFieldType | string) => DATA[type];

export const isTranslatable = (type: CustomFieldType) =>
  [CustomFieldType.SingleLineText, CustomFieldType.MultiLineText].includes(type);

export const CUSTOM_FIELD_TYPE_GROUPS = [
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
        value: CustomFieldType.ProductReference,
        icon: getCustomFieldTypeData(CustomFieldType.ProductReference).icon
      },
      {
        label: 'Collection',
        value: CustomFieldType.CollectionReference,
        icon: getCustomFieldTypeData(CustomFieldType.CollectionReference).icon
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
];
