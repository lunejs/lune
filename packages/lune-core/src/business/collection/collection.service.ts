import { clean, getSlugBy, isArray } from '@lune/common';

import type { ExecutionContext } from '@/api/shared/context/types';
import type {
  CollectionTranslationInput,
  CustomFieldValue,
  UpdateCollectionInput
} from '@/api/shared/types/graphql';
import { type CollectionListInput, type CreateCollectionInput } from '@/api/shared/types/graphql';
import { type Collection, CollectionContentType } from '@/persistence/entities/collection';
import type { ID } from '@/persistence/entities/entity';
import type { Locale } from '@/persistence/entities/locale';
import type { CollectionCustomFieldRepository } from '@/persistence/repositories/collection-custom-field-repository';
import type { CollectionCustomFieldTranslationRepository } from '@/persistence/repositories/collection-custom-field-translation-repository';
import type { CollectionRepository } from '@/persistence/repositories/collection-repository';
import type { CollectionTranslationRepository } from '@/persistence/repositories/collection-translation-repository';
import type { Where } from '@/persistence/repositories/repository';

export class CollectionService {
  private repository: CollectionRepository;
  private translationRepository: CollectionTranslationRepository;
  private customFieldRepository: CollectionCustomFieldRepository;
  private customFieldTranslationRepository: CollectionCustomFieldTranslationRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.collection;
    this.translationRepository = ctx.repositories.collectionTranslation;
    this.customFieldRepository = ctx.repositories.collectionCustomField;
    this.customFieldTranslationRepository = ctx.repositories.collectionCustomFieldTranslation;
  }

  async find(input?: CollectionListInput) {
    return this.repository.findByFilters(input ?? {});
  }

  async count(input?: CollectionListInput['filters']) {
    return this.repository.countByFilters(input ?? {});
  }

  async findUnique(id?: ID, slug?: string, options?: Where<Collection>) {
    if (id) return this.repository.findOne({ where: { id, ...options } });
    if (slug) return this.repository.findOne({ where: { slug, ...options } });

    return null;
  }

  async create(input: CreateCollectionInput) {
    const slug = await this.validateAndParseSlug(input.name);
    const collectionCount = await this.repository.count();

    const { assets, products, subCollections, customFields, ...baseCollection } = input;

    const collection = await this.repository.create({
      ...clean(baseCollection),
      slug,
      enabled: input.enabled ?? true,
      order: input.order ?? collectionCount + 1,
      contentType:
        (input.contentType as unknown as CollectionContentType) ?? CollectionContentType.Products
    });

    if (customFields?.length) {
      await this.upsertCustomFields(
        collection.id,
        customFields.filter(cf => cf.value != null)
      );
    }

    if (assets?.length) {
      await this.repository.upsertAssets(collection.id, assets);
    }

    if (products?.length && collection.contentType === CollectionContentType.Products) {
      await this.repository.upsertProducts(collection.id, products);
    }

    if (subCollections?.length && collection.contentType === CollectionContentType.Collections) {
      await this.repository.addSubCollections(collection.id, subCollections);
    }

    return collection;
  }

  async update(id: ID, input: UpdateCollectionInput) {
    const { assets, products, subCollections, customFields, ...baseCollection } = input;

    const result = await this.repository.update({
      where: { id },
      data: clean(baseCollection)
    });

    if (customFields?.length) {
      await this.removeEmptyCustomFields(id, customFields);
      await this.upsertCustomFields(
        id,
        customFields.filter(cf => cf.value != null)
      );
    }

    if (assets?.length) {
      await this.repository.upsertAssets(id, assets);
    }

    if (products?.length) {
      await this.repository.upsertProducts(id, products);
    }

    if (subCollections?.length) {
      await this.addNewSubCollections(id, subCollections);
    }

    await this.removeMissingSubCollection(id, subCollections);
    await this.removeMissingAssets(id, assets);
    await this.removeMissingProducts(id, products);

    return result;
  }

  async remove(ids: ID[]) {
    await this.customFieldRepository.removeMany({ whereIn: 'collectionId', values: ids });
    await this.repository.removeAllAssets(ids);
    await this.repository.removeAllProducts(ids);
    await this.repository.removeAllTranslations(ids);
    await this.repository.removeMany({ whereIn: 'id', values: ids });

    return true;
  }

  async addTranslation(id: ID, input: CollectionTranslationInput) {
    if (input.customFields?.length) {
      await Promise.all(
        input.customFields.map(cf =>
          this.customFieldTranslationRepository.upsert({
            where: { fieldId: cf.id, locale: input.locale as unknown as Locale },
            create: {
              locale: input.locale as unknown as Locale,
              fieldId: cf.id,
              value: JSON.stringify(cf.value)
            },
            update: {
              value: cf.value != null ? JSON.stringify(cf.value) : null
            }
          })
        )
      );
    }

    const r = await this.translationRepository.upsert({
      where: { collectionId: id, locale: input.locale as unknown as Locale },
      create: {
        ...clean(input),
        slug: input.name ? await this.validateAndParseSlug(input.name) : undefined,
        collectionId: id,
        locale: input.locale as unknown as Locale
      },
      update: {
        name: input.name,
        description: input.description
      }
    });

    return r;
  }

  private async addNewSubCollections(collectionId: ID, newSubCollections: string[]) {
    const { contentType } = (await this.repository.findOne({
      where: { id: collectionId },
      fields: ['contentType']
    })) as Collection;

    if (contentType === CollectionContentType.Products) return;

    const subCollections = await this.repository.findMany({ where: { parentId: collectionId } });

    const subCollectionsToAdd = newSubCollections.filter(
      subCollection => !subCollections.map(s => s.id).includes(subCollection)
    );

    await this.repository.addSubCollections(collectionId, subCollectionsToAdd);
  }

  private async removeMissingSubCollection(
    collectionId: ID,
    newSubCollections: UpdateCollectionInput['subCollections']
  ) {
    if (!isArray(newSubCollections)) return;

    const subCollections = await this.repository.findMany({ where: { parentId: collectionId } });

    const subCollectionsToRemove = subCollections
      .map(subCollection => subCollection.id)
      .filter(subCollection => !newSubCollections?.includes(subCollection));

    await this.repository.removeSubCollection(subCollectionsToRemove);
  }

  private async removeMissingAssets(collectionId: ID, newAssets: UpdateCollectionInput['assets']) {
    if (!isArray(newAssets)) return;

    const assets = await this.repository.findAssets(collectionId);

    const assetsToRemove = assets
      .map(a => a.id)
      .filter(assetId => !newAssets.some(asset => asset.id === assetId));

    await this.repository.removeAssets(collectionId, assetsToRemove);
  }

  private async removeMissingProducts(
    collectionId: ID,
    newProducts: UpdateCollectionInput['products']
  ) {
    if (!isArray(newProducts)) return;

    const products = await this.repository.findProducts(collectionId);

    const productsToRemove = products
      .map(a => a.id)
      .filter(productId => !newProducts.some(id => id === productId));

    await this.repository.removeProducts(collectionId, productsToRemove);
  }

  private async validateAndParseSlug(name: string) {
    const slug = getSlugBy(name);

    const productNameCount = await this.repository.countDuplicatedSlug(slug);

    if (!productNameCount) return slug;

    return slug + '-' + productNameCount;
  }

  private upsertCustomFields = async (collectionId: ID, fields: CustomFieldValue[]) => {
    await Promise.all(
      fields.map(cf =>
        this.customFieldRepository.upsert({
          where: { definitionId: cf.id, collectionId },
          create: { definitionId: cf.id, collectionId, value: JSON.stringify(cf.value) },
          update: { value: JSON.stringify(cf.value) }
        })
      )
    );
  };

  private removeEmptyCustomFields = async (collectionId: ID, fields: CustomFieldValue[]) => {
    const idsToRemove = fields.filter(f => f.value == null).map(f => f.id);

    await Promise.all(
      idsToRemove.map(id =>
        this.customFieldRepository.remove({ where: { definitionId: id, collectionId } })
      )
    );
  };
}
