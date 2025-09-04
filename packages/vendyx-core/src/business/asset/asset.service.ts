import { ExecutionContext } from '@/api/shared/context/types';
import { AssetType } from '@/persistence/entities/asset';
import { AssetRepository } from '@/persistence/repositories/asset-repository/asset.repository';

export class AssetService {
  private repository: AssetRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.asset;
  }

  async create(input: Input) {
    await this.repository.create(input);
  }
}

type Input = {
  name: string;
  providerId: string;
  source: string;
  type: AssetType;
};
