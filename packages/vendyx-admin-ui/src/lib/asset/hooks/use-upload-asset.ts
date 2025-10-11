import { restFetcher } from '@/lib/api/fetchers/rest-fetcher';
import type { VendyxAsset } from '@/lib/api/types';

export const useUploadAsset = () => {
  const uploadAsset = async (images: File[]) => {
    const formData = new FormData();

    images.forEach(img => formData.append('files', img, img.name));

    const result = await restFetcher<{ success: boolean; data: Omit<VendyxAsset, 'order'>[] }>(
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
