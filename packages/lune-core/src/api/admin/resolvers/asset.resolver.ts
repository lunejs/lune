import type { ExecutionContext } from '@/api/shared/context/types';
import type { GraphqlApiResolver } from '@/api/shared/graphql-api';
import { UseUserGuard } from '@/api/shared/guards/user.guard';
import type { QueryAssetsArgs } from '@/api/shared/types/graphql';
import { ListResponse } from '@/api/shared/utils/list-response';
import { AssetService } from '@/business/asset/asset.service';

async function assets(_, { input }: QueryAssetsArgs, ctx: ExecutionContext) {
  const assetService = new AssetService(ctx);

  const [assets, count] = await Promise.all([
    assetService.find(input ?? {}),
    assetService.count(input?.filters ?? {})
  ]);

  return new ListResponse(assets, assets.length, { total: count });
}

export const AssetResolver: GraphqlApiResolver = {
  Query: {
    assets: UseUserGuard(assets)
  }
};
