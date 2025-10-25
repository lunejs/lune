import type { ID } from './entity';

export interface ProductOption {
  productId: ID;
  optionId: ID;
}

export interface ProductOptionTable {
  product_id: ID;
  option_id: ID;
}
