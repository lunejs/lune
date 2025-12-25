import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationCreateCustomObjectDefinitionArgs,
  MutationRemoveCustomObjectDefinitionArgs,
  MutationUpdateCustomObjectDefinitionArgs,
  QueryCustomObjectDefinitionArgs,
  QueryCustomObjectDefinitionsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomObjectDefinitionService } from '@/business/custom-object-definition/custom-object-definition.service';
import type { CustomObjectDefinition } from '@/persistence/entities/custom-object-definition';
import { isErrorResult } from '@/utils/error-result';

async function customObjectDefinitions(
  _: unknown,
  { input }: QueryCustomObjectDefinitionsArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectDefinitionService(ctx);

  const [definitions, count] = await Promise.all([
    service.find(input ?? {}),
    service.count(input?.filters)
  ]);

  return new ListResponse(definitions, definitions.length, { total: count });
}

async function customObjectDefinition(
  _: unknown,
  { id }: QueryCustomObjectDefinitionArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectDefinitionService(ctx);

  return service.findUnique(id);
}

async function createCustomObjectDefinition(
  _: unknown,
  { input }: MutationCreateCustomObjectDefinitionArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectDefinitionService(ctx);

  const result = await service.create(input);

  return isErrorResult(result)
    ? { apiErrors: [result] }
    : { apiErrors: [], customObjectDefinition: result };
}

async function updateCustomObjectDefinition(
  _: unknown,
  { id, input }: MutationUpdateCustomObjectDefinitionArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectDefinitionService(ctx);

  const result = await service.update(id, input);

  return isErrorResult(result)
    ? { apiErrors: [result] }
    : { apiErrors: [], customObjectDefinition: result };
}

async function removeCustomObjectDefinition(
  _: unknown,
  { id }: MutationRemoveCustomObjectDefinitionArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectDefinitionService(ctx);

  return await service.remove(id);
}

export const CustomObjectDefinitionResolver: GraphqlApiResolver = {
  Query: {
    customObjectDefinitions: UseUserGuard(customObjectDefinitions),
    customObjectDefinition: UseUserGuard(customObjectDefinition)
  },
  Mutation: {
    createCustomObjectDefinition: UseUserGuard(createCustomObjectDefinition),
    updateCustomObjectDefinition: UseUserGuard(updateCustomObjectDefinition),
    removeCustomObjectDefinition: UseUserGuard(removeCustomObjectDefinition)
  },
  CustomObjectDefinition: {
    fields: (parent: CustomObjectDefinition, _: unknown, ctx: ExecutionContext) => {
      return ctx.loaders.customObjectDefinition.fields.load(parent.id);
    },
    displayField: (parent: CustomObjectDefinition, _: unknown, ctx: ExecutionContext) => {
      if (!parent.displayFieldId) return null;

      return ctx.loaders.customObjectDefinition.displayField.load(parent.displayFieldId);
    }
  }
};
