import { Badge } from '@lune/ui';

import { PaymentState } from '@/lib/api/types';

export const OrderPaymentStatusBadge = ({ state }: Props) => {
  if (state === PaymentState.Authorized) {
    return (
      <Badge variant={'outline'} className="bg-warning text-warning-foreground">
        Authorized
      </Badge>
    );
  }

  if (state === PaymentState.Canceled) {
    return (
      <Badge variant={'outline'} className="bg-muted text-muted-foreground">
        Canceled
      </Badge>
    );
  }

  if (state === PaymentState.Captured) {
    return (
      <Badge variant={'outline'} className="bg-distinct border-none text-foreground">
        Captured
      </Badge>
    );
  }

  if (state === PaymentState.Failed) {
    return (
      <Badge
        variant={'outline'}
        className="bg-destructive/15 text-destructive border-none py-[3px] px-[9px]"
      >
        Failed
      </Badge>
    );
  }

  if (state === PaymentState.Pending) {
    return (
      <Badge variant={'outline'} className="bg-warning text-warning-foreground">
        Pending
      </Badge>
    );
  }

  if (state === PaymentState.Rejected) {
    return (
      <Badge variant={'outline'} className="bg-muted text-muted-foreground">
        Rejected
      </Badge>
    );
  }

  if (state === PaymentState.Submitted) {
    return (
      <Badge variant={'outline'} className="bg-warning text-warning-foreground">
        Submitted
      </Badge>
    );
  }

  return null;
};

type Props = {
  state: PaymentState;
};
