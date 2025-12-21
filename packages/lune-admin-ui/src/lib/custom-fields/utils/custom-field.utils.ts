import { CustomFieldAppliesToEntity } from '@/lib/api/types';

export const getEntityName = (entity: CustomFieldAppliesToEntity) => {
  const NAMES = {
    [CustomFieldAppliesToEntity.Product]: 'Product',
    [CustomFieldAppliesToEntity.Collection]: 'Collection'
  };

  return NAMES[entity];
};
