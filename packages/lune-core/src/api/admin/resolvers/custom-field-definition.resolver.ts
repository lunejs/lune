import { UseUserGuard } from '@/api/admin/guards/user.guard';
import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { CustomFieldDefinitionEnumsResolver } from '@/api/shared/resolvers/enums/custom-field-definition.enums.resolver';
import type {
  MutationCreateCustomFieldDefinitionArgs,
  MutationRemoveCustomFieldDefinitionArgs,
  MutationUpdateCustomFieldDefinitionArgs,
  QueryCustomFieldDefinitionArgs,
  QueryCustomFieldDefinitionsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomFieldDefinitionService } from '@/business/custom-field-definition/custom-field-definition.service';
import {
  CustomFieldAppliesTo,
  type CustomFieldDefinition
} from '@/persistence/entities/custom-field-definition';
import { isErrorResult } from '@/utils/error-result';

async function customFieldDefinitions(
  _,
  { input }: QueryCustomFieldDefinitionsArgs,
  ctx: ExecutionContext
) {
  const customFieldDefinitionService = new CustomFieldDefinitionService(ctx);

  const [definitions, count] = await Promise.all([
    customFieldDefinitionService.find(input ?? {}),
    customFieldDefinitionService.count(input?.filters)
  ]);

  return new ListResponse(definitions, definitions.length, { total: count });
}

async function customFieldDefinition(
  _,
  { id }: QueryCustomFieldDefinitionArgs,
  ctx: ExecutionContext
) {
  const customFieldDefinitionService = new CustomFieldDefinitionService(ctx);

  return customFieldDefinitionService.findUnique(id);
}

async function createCustomFieldDefinition(
  _,
  { input }: MutationCreateCustomFieldDefinitionArgs,
  ctx: ExecutionContext
) {
  const customFieldDefinitionService = new CustomFieldDefinitionService(ctx);

  const result = await customFieldDefinitionService.create(input);

  return isErrorResult(result)
    ? { apiErrors: [result] }
    : { apiErrors: [], customFieldDefinition: result };
}

async function updateCustomFieldDefinition(
  _,
  { id, input }: MutationUpdateCustomFieldDefinitionArgs,
  ctx: ExecutionContext
) {
  const customFieldDefinitionService = new CustomFieldDefinitionService(ctx);

  return await customFieldDefinitionService.update(id, input);
}

async function removeCustomFieldDefinition(
  _,
  { id }: MutationRemoveCustomFieldDefinitionArgs,
  ctx: ExecutionContext
) {
  const customFieldDefinitionService = new CustomFieldDefinitionService(ctx);

  return await customFieldDefinitionService.remove(id);
}

export const CustomFieldDefinitionResolver: GraphqlApiResolver = {
  ...CustomFieldDefinitionEnumsResolver,
  CustomFieldAppliesToEntity: {
    PRODUCT: CustomFieldAppliesTo.Product,
    COLLECTION: CustomFieldAppliesTo.Collection,
    OPTION_VALUE: CustomFieldAppliesTo.OptionValue,
    CUSTOM_OBJECT: CustomFieldAppliesTo.CustomObject
  },
  CustomFieldDefinition: {
    referenceTarget: (parent: CustomFieldDefinition, _, ctx: ExecutionContext) => {
      if (!parent.referenceTargetId) return null;

      return ctx.loaders.customFieldDefinition.referenceTarget.load(parent.referenceTargetId);
    }
  },
  Query: {
    customFieldDefinitions: UseUserGuard(customFieldDefinitions),
    customFieldDefinition: UseUserGuard(customFieldDefinition)
  },
  Mutation: {
    createCustomFieldDefinition: UseUserGuard(createCustomFieldDefinition),
    updateCustomFieldDefinition: UseUserGuard(updateCustomFieldDefinition),
    removeCustomFieldDefinition: UseUserGuard(removeCustomFieldDefinition)
  }
};
