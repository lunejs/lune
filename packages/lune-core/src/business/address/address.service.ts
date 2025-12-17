import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { CreateAddressInput, UpdateAddressInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { AddressRepository } from '@/persistence/repositories/address-repository';

export class AddressService {
  private readonly addressRepository: AddressRepository;

  constructor(ctx: ExecutionContext) {
    this.addressRepository = ctx.repositories.address;
  }

  async create(customerId: ID, input: CreateAddressInput) {
    const currentDefault = await this.addressRepository.findOne({
      where: { customerId, isDefault: true }
    });

    if (input.isDefault && currentDefault) {
      await this.addressRepository.update({
        where: { id: currentDefault.id },
        data: { isDefault: false }
      });
    }

    return this.addressRepository.create({
      ...input,
      customerId,
      isDefault: !currentDefault ? true : (input.isDefault ?? false)
    });
  }

  async update(customerId: ID, addressId: ID, input: UpdateAddressInput) {
    if (input.isDefault) {
      const currentDefault = await this.addressRepository.findOne({
        where: { customerId, isDefault: true }
      });

      if (currentDefault && currentDefault.id !== addressId) {
        await this.addressRepository.update({
          where: { id: currentDefault.id },
          data: { isDefault: false }
        });
      }
    }

    return this.addressRepository.update({
      where: { id: addressId },
      data: {
        ...clean(input),
        streetLine2: input.streetLine2,
        references: input.references
      }
    });
  }

  async remove(addressId: ID) {
    await this.addressRepository.remove({ where: { id: addressId } });

    return true;
  }
}
