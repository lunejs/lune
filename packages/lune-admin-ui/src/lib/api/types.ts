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
      component: 'discount-value' | 'discount-order-requirements';
    };
