import { ProductOptionTable } from '@/persistence/entities/product-option';
import { Tables } from '@/persistence/tables';
import { Fixture } from '@/tests/utils/fixtures';

import { OptionConstants } from './option.fixtures';
import { ProductConstants } from './product.fixtures';

export class ProductOptionFixtures implements Fixture<ProductOptionTable> {
  table: Tables = Tables.ProductOption;

  async build(): Promise<Partial<ProductOptionTable>[]> {
    return [
      {
        option_id: OptionConstants.ColorOptionID,
        product_id: ProductConstants.ShirtID
      },
      {
        option_id: OptionConstants.SizeOptionID,
        product_id: ProductConstants.ShirtID
      },
      {
        option_id: OptionConstants.MaterialOptionID,
        product_id: ProductConstants.JacketID
      },
      {
        option_id: OptionConstants.JacketColorOptionID,
        product_id: ProductConstants.JacketID
      }
    ];
  }
}
