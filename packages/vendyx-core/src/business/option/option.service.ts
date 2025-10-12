import { clean } from '@vendyx/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateOptionInput,
  UpdateOptionInput,
  UpdateOptionValueInput
} from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { OptionRepository } from '@/persistence/repositories/option-repository';
import type { OptionValueRepository } from '@/persistence/repositories/option-value-repository';
import type { ProductRepository } from '@/persistence/repositories/product-repository';

export class OptionService {
  repository: OptionRepository;
  optionValueRepository: OptionValueRepository;
  productRepository: ProductRepository;

  constructor(private ctx: ExecutionContext) {
    this.repository = ctx.repositories.option;
    this.optionValueRepository = ctx.repositories.optionValue;
    this.productRepository = ctx.repositories.product;
  }

  async create(productId: ID, input: CreateOptionInput[]) {
    const promises = input.map(async optionInput => {
      const { values, ...baseOption } = optionInput;
      const option = await this.repository.create(baseOption);

      if (values.length) {
        await this.createOptionValues(option.id, values);
      }

      await this.productRepository.addOptions(productId, [option.id]);

      return option;
    });

    const result = await Promise.all(promises);

    return result;
  }

  async update(id: ID, input: UpdateOptionInput) {
    const { values, ...baseOption } = input;

    const valuesToCreate = values?.filter(v => !v.id) ?? [];
    const valuesToUpdate = values?.filter(v => !!v.id) ?? [];

    if (Array.isArray(values)) {
      await this.removeMissingOptionValues(id, valuesToUpdate);
    }

    if (valuesToCreate.length) {
      await this.createOptionValues(id, valuesToCreate);
    }

    if (valuesToUpdate.length) {
      await this.updateOptionValues(valuesToUpdate);
    }

    return await this.repository.update({ where: { id }, data: clean(baseOption) });
  }

  async softRemove(id: ID) {
    return this.repository.softRemove({ where: { id } });
  }

  async softRemoveValues(ids: ID[]) {
    await this.repository.softRemoveValues(ids);

    return true;
  }

  private async createOptionValues(optionId: ID, optionValues: UpdateOptionValueInput[]) {
    await this.optionValueRepository.createMany(
      optionValues.map(v => ({
        name: v.name ?? '',
        order: v.order ?? 0,
        optionId
      }))
    );
  }

  private async updateOptionValues(valuesToUpdate: UpdateOptionValueInput[]) {
    await Promise.all(
      valuesToUpdate.map(v => {
        return this.optionValueRepository.update({
          where: { id: v.id ?? '' },
          data: { name: v.name ?? '', order: v.order ?? undefined }
        });
      })
    );
  }

  private async removeMissingOptionValues(optionId: ID, valuesToUpdate: UpdateOptionValueInput[]) {
    const allValues = await this.optionValueRepository.findMany({ where: { optionId } });

    const allValuesIds = allValues.map(v => v.id);
    const newValuesIds = valuesToUpdate?.map(v => v.id) ?? [];

    const valuesToRemove = allValuesIds.filter(v => !newValuesIds.includes(v));

    await Promise.all(
      valuesToRemove.map(value => this.optionValueRepository.softRemove({ where: { id: value } }))
    );
  }
}
