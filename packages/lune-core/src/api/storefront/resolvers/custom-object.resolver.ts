import { clean } from '@lunejs/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import type {
  CustomObjectFieldsArgs,
  QueryCustomObjectArgs,
  QueryCustomObjectsArgs
} from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { CustomObjectEntryService } from '@/business/custom-object-entry/custom-object-entry.service';
import type { CustomObjectEntry } from '@/persistence/entities/custom-object-entry';

import { UseStorefrontApiKeyGuard } from '../guards/storefront-api-key.guard';

async function customObject(_: unknown, input: QueryCustomObjectArgs, ctx: ExecutionContext) {
  const service = new CustomObjectEntryService(ctx);

  const { id, slug } = clean(input);

  return await service.findUnique(id, slug);
}

async function customObjects(
  _: unknown,
  { definitionKey, input }: QueryCustomObjectsArgs,
  ctx: ExecutionContext
) {
  const service = new CustomObjectEntryService(ctx);

  const [entries, total] = await Promise.all([
    service.findByDefinitionKey(definitionKey, clean(input ?? {})),
    service.countByDefinitionKey(definitionKey)
  ]);

  return new ListResponse(entries, entries.length, { total });
}

export const CustomObjectResolver: GraphqlApiResolver = {
  Query: {
    customObject: UseStorefrontApiKeyGuard(customObject),
    customObjects: UseStorefrontApiKeyGuard(customObjects)
  },
  CustomObject: {
    fields: async (
      parent: CustomObjectEntry,
      { keys }: CustomObjectFieldsArgs,
      ctx: ExecutionContext
    ) => {
      const fields = await ctx.loaders.customObjectEntry.fields.load({
        entryId: parent.id,
        keys
      });

      return fields.map(f => ({
        ...f.definition,
        id: f.id,
        value: f.value
      }));
    }
  }
};
