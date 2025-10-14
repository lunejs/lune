import { useRef } from 'react';

import { notification } from '@vendyx/ui';

export const useLoadingNotification = () => {
  const notificationId = useRef<string | number | null>(null);

  const loading = (msg: string) => {
    notificationId.current = notification.loading(msg);
  };

  const success = (msg: string) => {
    if (notificationId.current) {
      notification.dismiss(notificationId.current);
    }

    notification.success(msg);
  };

  const failure = (msg: string) => {
    if (notificationId.current) {
      notification.dismiss(notificationId.current);
    }

    notification.error(msg);
  };

  return {
    loading,
    success,
    failure
  };
};
