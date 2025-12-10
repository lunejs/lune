import { useState } from 'react';

import { queryClient } from '@/app/app';
import { restFetcher } from '@/lib/api/fetchers/rest-fetcher';
import type { LuneAsset } from '@/lib/api/types';

import { AssetCacheKeys } from '../constants/cache-keys';

export const useUploadAsset = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadAsset = async (images: File[]) => {
    setIsUploading(true);

    const formData = new FormData();
    images.forEach(img => formData.append('files', img, img.name));

    const result = await restFetcher<{ success: boolean; data: Omit<LuneAsset, 'order'>[] }>(
      '/upload',
      {
        method: 'POST',
        body: formData
      }
    );

    await Promise.all([
      queryClient.refetchQueries({ queryKey: [AssetCacheKeys.all] }),
      queryClient.refetchQueries({ queryKey: [AssetCacheKeys.Count] })
    ]);

    setIsUploading(false);

    return result;
  };

  return {
    isUploading,
    uploadAsset
  };
};
