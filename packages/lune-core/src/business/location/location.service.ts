import { clean } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CreateLocationInput,
  ListInput,
  UpdateLocationInput
} from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { InStorePickupRepository } from '@/persistence/repositories/in-store-pickup-repository';
import type { LocationRepository } from '@/persistence/repositories/location-repository';
import { SortKey } from '@/persistence/repositories/repository';

import { LocationNameAlreadyExistsError } from './location.errors';

export class LocationService {
  private readonly repository: LocationRepository;
  private readonly inStorePickupRepository: InStorePickupRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.location;
    this.inStorePickupRepository = ctx.repositories.inStorePickup;
  }

  async find(input: ListInput) {
    return await this.repository.findMany({
      ...clean(input),
      orderBy: { createdAt: SortKey.Desc }
    });
  }

  async count() {
    return await this.repository.count();
  }

  async findById(id: ID) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(input: CreateLocationInput) {
    const nameAlreadyExists = await this.repository.findOne({ where: { name: input.name } });

    if (nameAlreadyExists) {
      return new LocationNameAlreadyExistsError();
    }

    const location = await this.repository.create({
      ...clean(input),
      enabled: input.enabled ?? true
    });

    await this.inStorePickupRepository.create({
      locationId: location.id,
      instructions: '',
      isAvailable: false
    });

    return location;
  }

  async update(locationId: ID, input: UpdateLocationInput) {
    if (input.name) {
      const nameAlreadyExists = await this.repository.findOne({ where: { name: input.name } });

      if (nameAlreadyExists && nameAlreadyExists.id !== locationId) {
        return new LocationNameAlreadyExistsError();
      }
    }

    return await this.repository.update({
      where: { id: locationId },
      data: {
        ...clean(input)
      }
    });
  }
}
