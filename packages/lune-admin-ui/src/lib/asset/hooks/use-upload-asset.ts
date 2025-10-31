import { restFetcher } from '@/lib/api/fetchers/rest-fetcher';
import type { LuneAsset } from '@/lib/api/types';

export const useUploadAsset = () => {
  const uploadAsset = async (images: File[]) => {
    const formData = new FormData();

    images.forEach(img => formData.append('files', img, img.name));

    const result = await restFetcher<{ success: boolean; data: Omit<LuneAsset, 'order'>[] }>(
      '/upload',
      {
        method: 'POST',
        body: formData
      }
    );

    return result;
  };

  return {
    uploadAsset
  };
};
