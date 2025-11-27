import type { ExecutionContext } from '@/api/shared/context/types';
import type { Asset } from '@/persistence/entities/asset';
import type { AssetRepository } from '@/persistence/repositories/asset-repository';
import type { RepositoryInput } from '@/persistence/repositories/repository';

export class AssetService {
  private repository: AssetRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.asset;
  }

  async create(input: RepositoryInput<Asset>) {
    return await this.repository.create(input);
  }
}
