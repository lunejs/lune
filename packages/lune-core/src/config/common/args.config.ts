export type Args = Record<string, Arg>;

type Arg =
  | {
      type: 'text';
      required?: boolean;
      label?: string;
      defaultValue?: string;
      placeholder?: string;
      conditions?: { min?: number; max?: number };
    }
  | {
      type: 'number';
      required?: boolean;
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions?: { min?: number; max?: number };
    }
  | {
      type: 'boolean';
      required?: boolean;
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: 'select';
      required?: boolean;
      label?: string;
      defaultValue?: string;
      options: { label: string; value: string }[];
    }
  | {
      type: 'checkbox';
      required?: boolean;
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: 'price';
      required?: boolean;
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions?: { min?: number; max?: number };
    }
  | {
      type: 'entity-selector';
      entity: 'product' | 'countries' | 'variants';
    }
  | {
      type: 'custom';
      component: CustomComponent;
    };

type CustomComponent = keyof ComponentValueMap;

interface ComponentValueMap {
  'discount-value': {
    type: 'percentage' | 'fixed';
    value: number;
  };
  'discount-order-requirements': {
    type: 'none' | 'minimum_items' | 'minimum_amount';
    value: number;
  };
}

type InferArgValue<T> = T extends { type: 'custom'; component: infer C }
  ? C extends keyof ComponentValueMap
    ? ComponentValueMap[C]
    : unknown
  : T extends { type: 'text' }
    ? string
    : T extends { type: 'number' }
      ? number
      : T extends { type: 'boolean' }
        ? boolean
        : T extends { type: 'select' }
          ? string
          : T extends { type: 'checkbox' }
            ? boolean
            : T extends { type: 'price' }
              ? number
              : T extends { type: 'entity-selector' }
                ? string[]
                : unknown;

export type InferArgs<T> = {
  [K in keyof T]: InferArgValue<T[K]>;
};
