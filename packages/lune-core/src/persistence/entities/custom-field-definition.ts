import type { ID, LuneEntity, LuneTable } from './entity';

export const CustomFieldType = {
  SingleLineText: 'single_line_text',
  MultiLineText: 'multi_line_text',
  Integer: 'integer',
  Decimal: 'decimal',
  Money: 'money',
  Date: 'date',
  Boolean: 'boolean',
  Image: 'image',
  Reference: 'reference'
} as const;

export type CustomFieldType = (typeof CustomFieldType)[keyof typeof CustomFieldType];

export const CustomFieldAppliesTo = {
  Product: 'product',
  Collection: 'collection'
} as const;

export type CustomFieldAppliesTo = (typeof CustomFieldAppliesTo)[keyof typeof CustomFieldAppliesTo];

export const ReferenceTargetEntity = {
  Product: 'product',
  Collection: 'collection'
} as const;

export type ReferenceTargetEntity =
  (typeof ReferenceTargetEntity)[keyof typeof ReferenceTargetEntity];

type BaseCustomFieldDefinition = LuneEntity & {
  /** Name of the definition */
  name: string;
  /** A unique  and readable key to make reference to the definition */
  key: string;
  /** Weather the field is a list of values */
  isList: boolean;
  /** Entities this field can be applied to */
  appliesToEntity: CustomFieldAppliesTo;
  /** Type of the definition, @type {CustomFieldType} */
  type: string;
  /** ID of the custom object definition this field belongs to */
  customObjectDefinitionId?: ID | null;
  /** Order of the field in the custom object definition */
  order: number;
};

type SingleLineTextCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.SingleLineText;
  metadata: null;
};

type MultiLineTextCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.MultiLineText;
  metadata: null;
};

type IntegerCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.Integer;
  metadata: null;
};

type DecimalCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.Decimal;
  metadata: null;
};

type MoneyCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.Money;
  metadata: null;
};

type DateCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.Date;
  metadata: null;
};

type BooleanCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.Boolean;
  metadata: null;
};

type ImageCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.Image;
  metadata: null;
};

type ReferenceCustomField = BaseCustomFieldDefinition & {
  type: typeof CustomFieldType.Reference;
  metadata: { targetEntity: ReferenceTargetEntity };
};

/**
 * Represents a custom field that cna be attached to an entity
 */
export type CustomFieldDefinition =
  | SingleLineTextCustomField
  | MultiLineTextCustomField
  | IntegerCustomField
  | DecimalCustomField
  | MoneyCustomField
  | DateCustomField
  | BooleanCustomField
  | ImageCustomField
  | ReferenceCustomField;

export interface CustomFieldDefinitionTable extends LuneTable {
  name: string;
  key: string;
  is_list: boolean;
  applies_to_entity: string;
  type: CustomFieldType;
  metadata?: Record<string, unknown> | null;
  custom_object_definition_id?: ID | null;
  order: number;
  shop_id: ID;
}
