import { getFragmentData } from '@/lib/api/codegen';
import { useGqlQuery } from '@/lib/api/fetchers/use-gql-query';
import {
  COMMON_OPTION_PRESET,
  GET_ALL_OPTION_PRESETS_QUERY
} from '@/lib/api/operations/option-preset.operations';

import { OptionPresetCacheKeys } from '../constants/cache-keys';

export const useGetOptionPresets = () => {
  const result = useGqlQuery(GET_ALL_OPTION_PRESETS_QUERY, { key: [OptionPresetCacheKeys.all] });

  const optionPresets =
    result.data?.optionPresets.items.map(p => getFragmentData(COMMON_OPTION_PRESET, p)) ?? [];

  return {
    ...result,
    optionPresets
  };
};
