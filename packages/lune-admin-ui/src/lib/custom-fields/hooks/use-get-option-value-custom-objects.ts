import { useMemo } from 'react';

import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_CUSTOM_FIELD_DEFINITION_FOR_OPTION_VALUES_FRAGMENT,
  GET_CUSTOM_FIELD_DEFINITIONS_FOR_OPTION_VALUES_QUERY
} from '@/lib/api/operations/custom-field-definition.operations';
import { CustomFieldAppliesToEntity, CustomFieldType } from '@/lib/api/types';

import { CustomFieldDefinitionsCacheKeys } from '../constants/cache-keys';

export const useGetOptionValueCustomObjects = () => {
  const result = useGqlQuery(GET_CUSTOM_FIELD_DEFINITIONS_FOR_OPTION_VALUES_QUERY, {
    key: [CustomFieldDefinitionsCacheKeys.ForOptionValues],
    variables: {
      input: {
        filters: {
          appliesToEntity: CustomFieldAppliesToEntity.OptionValue,
          type: CustomFieldType.CustomObjectReference
        }
      }
    }
  });

  const customObjects = useMemo(() => {
    const items = result.data?.customFieldDefinitions.items ?? [];
    const definitions = items.map(item =>
      getFragmentData(COMMON_CUSTOM_FIELD_DEFINITION_FOR_OPTION_VALUES_FRAGMENT, item)
    );

    // Extract unique CustomObjectDefinitions from referenceTarget
    return definitions
      .map(def => def.referenceTarget)
      .filter((target): target is NonNullable<typeof target> => target !== null);
  }, [result.data]);

  return {
    ...result,
    customObjects
  };
};
