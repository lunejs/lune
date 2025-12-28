export * from './codegen';
export * from './codegen/graphql';

export type LuneAsset = {
  id: string;
  name: string;
  source: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
  type: 'IMAGE';
};

export type Args = Record<string, Arg>;

export enum ArgType {
  Text = 'text',
  Number = 'number',
  Boolean = 'boolean',
  Select = 'select',
  Checkbox = 'checkbox',
  Price = 'price'
}

export enum EnhancedArgType {
  EntitySelector = 'entity-selector',
  Custom = 'custom'
}

export enum ArgComponent {
  DiscountValue = 'discount-value',
  DiscountOrderRequirements = 'discount-order-requirements'
}

export enum ArgEntity {
  Product = 'product',
  // TODO: pass to singular
  Variant = 'variants',
  Countries = 'countries'
}

export type Arg =
  | {
      type: ArgType.Text;
      required?: boolean;
      label?: string;
      defaultValue?: string;
      placeholder?: string;
      conditions?: { min?: number; max?: number };
    }
  | {
      type: ArgType.Number;
      required?: boolean;
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions?: { min?: number; max?: number };
    }
  | {
      type: ArgType.Boolean;
      required?: boolean;
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: ArgType.Select;
      required?: boolean;
      label?: string;
      defaultValue?: string;
      options: { label: string; value: string }[];
    }
  | {
      type: ArgType.Checkbox;
      required?: boolean;
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: ArgType.Price;
      required?: boolean;
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions?: { min?: number; max?: number };
    };

export type EnhancedArg =
  | {
      type: EnhancedArgType.EntitySelector;
      entity: ArgEntity.Product | ArgEntity.Countries | ArgEntity.Variant;
    }
  | {
      type: EnhancedArgType.Custom;
      component: ArgComponent.DiscountValue | ArgComponent.DiscountOrderRequirements;
    };

export type ShippingFulfillmentMetadata = {
  trackingCode: string | null;
  carrier: string | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
};

export type PickupFulfillmentMetadata = {
  readyAt: Date | null;
  pickedUpAt: Date | null;
};
