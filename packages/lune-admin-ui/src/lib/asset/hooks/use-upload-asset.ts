import { useState } from 'react';

import { LuneLogger } from '@lune/common';

import { queryClient } from '@/app/app';
import { restFetcher } from '@/lib/api/fetchers/rest-fetcher';
import type { LuneAsset } from '@/lib/api/types';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { AssetCacheKeys } from '../constants/cache-keys';

export const useUploadAsset = () => {
  const { loading, failure, success } = useLoadingNotification();

  const [isUploading, setIsUploading] = useState(false);

  const uploadAsset = async (images: File[]) => {
    try {
      loading('Uploading...');
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

      if (!result.success) {
        failure('Failed to upload images');
        setIsUploading(false);
        return;
      }

      await Promise.all([
        queryClient.refetchQueries({ queryKey: [AssetCacheKeys.all] }),
        queryClient.refetchQueries({ queryKey: [AssetCacheKeys.Count] })
      ]);

      success('Uploaded');
      setIsUploading(false);

      return result;
    } catch (error) {
      LuneLogger.error(error);
      failure('Failed to upload images');
      setIsUploading(false);

      return {
        success: false,
        data: []
      };
    }
  };

  return {
    isUploading,
    uploadAsset
  };
};
