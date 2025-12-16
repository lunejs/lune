import { formatDate } from '@lune/common';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Small } from '@lune/ui';

import type { CommonOrderFragment } from '@/lib/api/types';

export const OrderCancellationCard = ({ order }: Props) => {
  const { cancellation } = order;

  if (!cancellation) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cancellation details</CardTitle>
        <CardDescription>{formatDate(new Date(cancellation.createdAt))}</CardDescription>
      </CardHeader>
      <CardContent>
        <Small>
          <span className="font-semibold">Reason:</span> {cancellation.reason}
        </Small>
      </CardContent>
    </Card>
  );
};

type Props = {
  order: CommonOrderFragment;
};
