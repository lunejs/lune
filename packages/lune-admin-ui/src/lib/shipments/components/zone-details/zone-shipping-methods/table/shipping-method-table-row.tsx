import { Badge, cn, TableCell, TableRow } from '@lune/ui';

import type { CommonZoneFragment } from '@/lib/api/types';
import { formatShippingMethodPreviewPrice } from '@/lib/shipments/utils/shipment.utils';

import { RemovingShippingMethodButton } from '../actions/remove/remove-shipping-method-button';
import { useRemoveShippingMethodButton } from '../actions/remove/use-remove-shipping-method-button';
import { UpdateShippingMethodButton } from '../actions/update-shipping-method';

export const ShippingMethodTableRow = ({ method }: Props) => {
  const { isRemoving, removeShippingMethod } = useRemoveShippingMethodButton();

  return (
    <TableRow className={cn(isRemoving && 'opacity-40')}>
      <TableCell>
        <UpdateShippingMethodButton method={method} />
      </TableCell>
      <TableCell>{formatShippingMethodPreviewPrice(method.pricePreview)}</TableCell>
      <TableCell>
        <Badge variant={method.enabled ? 'default' : 'secondary'}>
          {method.enabled ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell className="w-8">
        <RemovingShippingMethodButton
          isRemoving={isRemoving}
          method={method}
          onClick={() => removeShippingMethod(method.id)}
        />
      </TableCell>
    </TableRow>
  );
};

type Props = {
  method: CommonZoneFragment['shippingMethods'][0];
};
