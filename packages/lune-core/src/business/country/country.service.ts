import type { ExecutionContext } from '@/api/shared/context/types';
import type { CountryRepository } from '@/persistence/repositories/country-repository';
import { SortKey } from '@/persistence/repositories/repository';

export class CountryService {
  private readonly repository: CountryRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.country;
  }

  async find() {
    return await this.repository.findMany({ orderBy: { name: SortKey.Asc } });
  }
}
