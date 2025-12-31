import type { ExecutionContext } from '@/api/shared/context/types';
import type { AssetFilters, AssetListInput } from '@/api/shared/types/graphql';
import { getConfig } from '@/config/config';
import type { Asset } from '@/persistence/entities/asset';
import type { ID } from '@/persistence/entities/entity';
import type { AssetRepository } from '@/persistence/repositories/asset-repository';
import type { RepositoryInput } from '@/persistence/repositories/repository';

export class AssetService {
  private repository: AssetRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.asset;
  }

  async find(input?: AssetListInput) {
    return await this.repository.findByFilters(input);
  }

  async count(input?: AssetFilters) {
    return await this.repository.countByFilters(input);
  }

  async create(input: RepositoryInput<Asset>) {
    return await this.repository.create(input);
  }

  async remove(ids: ID[]) {
    const assetsToRemove = await this.repository.findMany({
      whereIn: { field: 'id', values: ids }
    });
    await this.repository.removeAllFromCollection(ids);
    await this.repository.removeAllFromProduct(ids);
    await this.repository.removeAllFromVariant(ids);
    await this.repository.removeMany({ whereIn: 'id', values: ids });

    const { storageProvider } = getConfig().assets;
    await Promise.all(assetsToRemove.map(asset => storageProvider.remove(asset.providerId)));

    return true;
  }
}
