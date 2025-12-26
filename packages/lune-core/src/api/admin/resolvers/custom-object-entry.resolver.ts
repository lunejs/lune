import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationAddCustomObjectEntryTranslationArgs,
  MutationCreateCustomObjectEntryArgs,
  MutationRemoveCustomObjectEntryArgs,
  MutationUpdateCustomObjectEntryArgs,
  QueryCustomObjectEntriesArgs,
  QueryCustomObjectEntryArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomObjectEntryService } from '@/business/custom-object-entry/custom-object-entry.service';
import type { CustomObjectEntry } from '@/persistence/entities/custom-object-entry';
import type { CustomObjectEntryValue } from '@/persistence/entities/custom-object-entry-value';

async function customObjectEntry(
  _: unknown,
  { id }: QueryCustomObjectEntryArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectEntryService(ctx);

  return service.findUnique(id);
}

async function customObjectEntries(
  _: unknown,
  { definitionId, input }: QueryCustomObjectEntriesArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectEntryService(ctx);

  const [items, total] = await Promise.all([
    service.findByDefinitionId(definitionId, input),
    service.countByDefinitionId(definitionId)
  ]);

  return new ListResponse(items, items.length, { total });
}

async function createCustomObjectEntry(
  _: unknown,
  { definitionId, input }: MutationCreateCustomObjectEntryArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectEntryService(ctx);

  return service.create(definitionId, input);
}

async function updateCustomObjectEntry(
  _: unknown,
  { id, input }: MutationUpdateCustomObjectEntryArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectEntryService(ctx);

  return service.update(id, input);
}

async function removeCustomObjectEntry(
  _: unknown,
  { ids }: MutationRemoveCustomObjectEntryArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectEntryService(ctx);

  return service.remove(ids);
}

async function addCustomObjectEntryTranslation(
  _: unknown,
  { id, input }: MutationAddCustomObjectEntryTranslationArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectEntryService(ctx);

  return service.addTranslation(id, input);
}

export const CustomObjectEntryResolver: GraphqlApiResolver = {
  Query: {
    customObjectEntry: UseUserGuard(customObjectEntry),
    customObjectEntries: UseUserGuard(customObjectEntries)
  },
  Mutation: {
    createCustomObjectEntry: UseUserGuard(createCustomObjectEntry),
    updateCustomObjectEntry: UseUserGuard(updateCustomObjectEntry),
    removeCustomObjectEntry: UseUserGuard(removeCustomObjectEntry),
    addCustomObjectEntryTranslation: UseUserGuard(addCustomObjectEntryTranslation)
  },
  CustomObjectEntry: {
    definition: (parent: CustomObjectEntry, _: unknown, ctx: ExecutionContext) => {
      return ctx.loaders.customObjectEntry.definition.load(parent.definitionId);
    },
    values: (parent: CustomObjectEntry, _: unknown, ctx: ExecutionContext) => {
      return ctx.loaders.customObjectEntry.values.load(parent.id);
    }
  },
  CustomObjectEntryValue: {
    field: (parent: CustomObjectEntryValue, _: unknown, ctx: ExecutionContext) => {
      return ctx.loaders.customObjectEntry.valueField.load(parent.fieldId);
    },
    translations: (parent: CustomObjectEntryValue, _: unknown, ctx: ExecutionContext) => {
      return ctx.loaders.customObjectEntry.valueTranslations.load(parent.id);
    }
  }
};
