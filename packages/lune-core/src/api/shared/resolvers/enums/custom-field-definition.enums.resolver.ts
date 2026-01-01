import { CustomFieldType } from '@/persistence/entities/custom-field-definition';

import type { GraphqlApiResolver } from '../../graphql-api';

export const CustomFieldDefinitionEnumsResolver: GraphqlApiResolver = {
  CustomFieldType: {
    SINGLE_LINE_TEXT: CustomFieldType.SingleLineText,
    MULTI_LINE_TEXT: CustomFieldType.MultiLineText,
    URL: CustomFieldType.Url,
    COLOR: CustomFieldType.Color,
    INTEGER: CustomFieldType.Integer,
    DECIMAL: CustomFieldType.Decimal,
    MONEY: CustomFieldType.Money,
    DATE: CustomFieldType.Date,
    BOOLEAN: CustomFieldType.Boolean,
    IMAGE: CustomFieldType.Image,
    PRODUCT_REFERENCE: CustomFieldType.ProductReference,
    COLLECTION_REFERENCE: CustomFieldType.CollectionReference,
    CUSTOM_OBJECT_REFERENCE: CustomFieldType.CustomObjectReference
  }
};
