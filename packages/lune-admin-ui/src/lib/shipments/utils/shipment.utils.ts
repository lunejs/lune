import { LunePrice } from '@lunejs/common';

import type { CommonCountryFragment } from '@/lib/api/types';

export const isStateInCountry = (
  state: CommonCountryFragment['states'][0],
  country: CommonCountryFragment
) => {
  return country.states.some(s => s.id === state.id);
};

export const formatShippingMethodPreviewPrice = (previewPrice: number) => {
  if (previewPrice > 0) return LunePrice.format(previewPrice);

  if (previewPrice === 0) return 'Free';

  return 'Dynamic';
};
