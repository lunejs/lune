import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type {
  QueryCustomFieldDefinitionArgs,
  QueryCustomFieldDefinitionsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomFieldDefinitionService } from '@/business/custom-field-definition/custom-field-definition.service';

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
  Query: {
    customFieldDefinitions: UseUserGuard(customFieldDefinitions),
    customFieldDefinition: UseUserGuard(customFieldDefinition)
  }
};
