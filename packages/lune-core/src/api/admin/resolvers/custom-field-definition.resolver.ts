import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  MutationCreateCustomFieldDefinitionArgs,
  MutationRemoveCustomFieldDefinitionArgs,
  MutationUpdateCustomFieldDefinitionArgs,
  QueryCustomFieldDefinitionArgs,
  QueryCustomFieldDefinitionsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomFieldDefinitionService } from '@/business/custom-field-definition/custom-field-definition.service';
import type { CustomFieldDefinition } from '@/persistence/entities/custom-field-definition';
import {
  CustomFieldAppliesTo,
  CustomFieldType
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
  CustomFieldAppliesToEntity: {
    PRODUCT: CustomFieldAppliesTo.Product,
    COLLECTION: CustomFieldAppliesTo.Collection
  },
  CustomFieldType: {
    SINGLE_LINE_TEXT: CustomFieldType.SingleLineText,
    MULTI_LINE_TEXT: CustomFieldType.MultiLineText,
    URL: CustomFieldType.Url,
    INTEGER: CustomFieldType.Integer,
    DECIMAL: CustomFieldType.Decimal,
    MONEY: CustomFieldType.Money,
    DATE: CustomFieldType.Date,
    BOOLEAN: CustomFieldType.Boolean,
    IMAGE: CustomFieldType.Image,
    PRODUCT_REFERENCE: CustomFieldType.ProductReference,
    COLLECTION_REFERENCE: CustomFieldType.CollectionReference,
    CUSTOM_OBJECT_REFERENCE: CustomFieldType.CustomObjectReference
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
