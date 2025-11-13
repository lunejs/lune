import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationCreateZoneArgs,
  MutationRemoveZoneArgs,
  MutationUpdateZoneArgs,
  QueryZoneArgs
} from '@/api/shared/types/graphql';
import { ZoneService } from '@/business/zone/zone.service';
import type { Zone } from '@/persistence/entities/zone';

async function zones(_, __, ctx: ExecutionContext) {
  const zoneService = new ZoneService(ctx);

  return await zoneService.find();
}

async function zone(_, { id }: QueryZoneArgs, ctx: ExecutionContext) {
  const zoneService = new ZoneService(ctx);

  return await zoneService.findById(id);
}

async function createZone(_, { input }: MutationCreateZoneArgs, ctx: ExecutionContext) {
  const zoneService = new ZoneService(ctx);

  return await zoneService.create(input);
}

async function updateZone(_, { id, input }: MutationUpdateZoneArgs, ctx: ExecutionContext) {
  const zoneService = new ZoneService(ctx);

  return await zoneService.update(id, input);
}

async function removeZone(_, { id }: MutationRemoveZoneArgs, ctx: ExecutionContext) {
  const zoneService = new ZoneService(ctx);

  return await zoneService.remove(id);
}

export const ZoneResolver: GraphqlApiResolver = {
  Query: {
    zones: UseUserGuard(zones),
    zone: UseUserGuard(zone)
  },
  Mutation: {
    createZone: UseUserGuard(createZone),
    updateZone: UseUserGuard(updateZone),
    removeZone: UseUserGuard(removeZone)
  },
  Zone: {
    states: (parent: Zone, _, ctx: ExecutionContext) => {
      return ctx.loaders.zone.states.load(parent.id);
    },
    shippingMethods: (parent: Zone, _, ctx: ExecutionContext) => {
      return ctx.loaders.zone.shippingMethods.load(parent.id);
    }
  }
};
