import type { ExecutionContext } from '@/api/shared/context/types';
import type { AssetType } from '@/persistence/entities/asset';
import type { AssetRepository } from '@/persistence/repositories/asset-repository/asset.repository';

export class AssetService {
  private repository: AssetRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.asset;
  }

  async create(input: Input) {
    return await this.repository.create(input);
  }
}

type Input = {
  name: string;
  providerId: string;
  source: string;
  type: AssetType;
};
