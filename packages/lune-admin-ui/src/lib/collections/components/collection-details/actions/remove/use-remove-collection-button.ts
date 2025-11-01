import { useNavigate } from 'react-router';

import { useRemoveCollections } from '@/lib/collections/hooks/use-remove-collections';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

export const useRemoveCollectionButton = () => {
  const navigate = useNavigate();
  const { loading, success, failure } = useLoadingNotification();
  const { removeCollections } = useRemoveCollections();

  const exec = async (id: string) => {
    loading('Removing...');
    const { isSuccess } = await removeCollections([id]);

    if (!isSuccess) {
      failure('Failed to remove collection');
      return;
    }

    success('Collection removed');
    navigate('/collections');
  };

  return {
    removeCollection: exec
  };
};
