import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  QueryCustomFieldDefinitionArgs,
  QueryCustomFieldDefinitionsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomFieldDefinitionService } from '@/business/custom-field-definition/custom-field-definition.service';
import {
  CustomFieldAppliesTo,
  CustomFieldType
} from '@/persistence/entities/custom-field-definition';

async function customFieldDefinitions(
  _,
  { input }: QueryCustomFieldDefinitionsArgs,
  ctx: ExecutionContext
) {
  const customFieldDefinitionService = new CustomFieldDefinitionService(ctx);

  const [definitions, count] = await Promise.all([
    customFieldDefinitionService.find(input ?? {}),
    customFieldDefinitionService.count()
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

export const CustomFieldDefinitionResolver: GraphqlApiResolver = {
  CustomFieldAppliesToEntity: {
    PRODUCT: CustomFieldAppliesTo.Product
  },
  CustomFieldType: {
    SINGLE_LINE_TEXT: CustomFieldType.SingleLineText,
    MULTI_LINE_TEXT: CustomFieldType.MultiLineText,
    INTEGER: CustomFieldType.Integer,
    DECIMAL: CustomFieldType.Decimal,
    MONEY: CustomFieldType.Money,
    DATE: CustomFieldType.Date,
    BOOLEAN: CustomFieldType.Boolean,
    IMAGE: CustomFieldType.Image,
    REFERENCE: CustomFieldType.Reference
  },
  Query: {
    customFieldDefinitions: UseUserGuard(customFieldDefinitions),
    customFieldDefinition: UseUserGuard(customFieldDefinition)
  }
};
