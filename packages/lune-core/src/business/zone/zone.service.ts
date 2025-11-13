import { isArray } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { CreateZoneInput, UpdateZoneInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { ShippingMethodRepository } from '@/persistence/repositories/shipping-method-repository';
import type { ZoneRepository } from '@/persistence/repositories/zone-repository';
import type { ZoneStateRepository } from '@/persistence/repositories/zone-state-repository';

export class ZoneService {
  private readonly repository: ZoneRepository;
  private readonly zoneStateRepository: ZoneStateRepository;
  private readonly shippingMethodRepository: ShippingMethodRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.zone;
    this.zoneStateRepository = ctx.repositories.zoneState;
    this.shippingMethodRepository = ctx.repositories.shippingMethod;
  }

  async find() {
    return this.repository.findMany();
  }

  async findById(id: ID) {
    return this.repository.findOne({ where: { id } });
  }

  async create(input: CreateZoneInput) {
    const zone = await this.repository.create({ name: input.name });

    if (input.stateIds?.length) {
      await this.createStates(zone.id, input.stateIds);
    }

    return zone;
  }

  async update(zoneId: ID, input: UpdateZoneInput) {
    if (isArray(input.stateIds)) {
      await this.removeMissingStates(zoneId, input.stateIds);
    }

    return await this.repository.update({
      where: { id: zoneId },
      data: {
        name: input.name ?? undefined
      }
    });
  }

  async remove(zoneId: ID) {
    await Promise.all([
      this.zoneStateRepository.remove({ where: { zoneId } }),
      this.shippingMethodRepository.remove({ where: { zoneId } }),
      this.repository.remove({ where: { id: zoneId } })
    ]);

    return true;
  }

  private async createStates(zoneId: ID, statesIds: ID[]) {
    await this.zoneStateRepository.createMany(statesIds.map(stateId => ({ stateId, zoneId })));
  }

  private async removeMissingStates(zoneId: ID, newStates: ID[]) {
    const zoneStates = await this.zoneStateRepository.findMany({ where: { zoneId } });

    const statesToRemove = zoneStates.filter(state => !newStates.includes(state.stateId));

    await this.zoneStateRepository.removeMany({
      whereIn: 'stateId',
      values: statesToRemove.map(s => s.stateId)
    });
  }
}
