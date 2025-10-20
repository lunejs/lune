import type { PropsWithChildren } from 'react';

import { cn, TableRow } from '@vendyx/ui';

import { TranslateFormCell } from './translate-form-cell';
import { TranslateFormRow } from './translate-form-row';

export const TranslateFormRowData = ({ children, field, reference, className }: Props) => {
  return (
    <>
      <TableRow
        className={cn(
          'bg-transparent! hidden lg:table-row',
          typeof className === 'string' ? className : className?.row
        )}
      >
        <TranslateFormCell>{field}</TranslateFormCell>
        <TranslateFormCell
          className={typeof className === 'string' ? undefined : className?.referenceCell}
          isDisabled
        >
          {reference}
        </TranslateFormCell>
        {children}
      </TableRow>

      {field && (
        <TranslateFormRow className="lg:hidden">
          <TranslateFormCell>{field}</TranslateFormCell>
        </TranslateFormRow>
      )}

      {reference && (
        <TranslateFormRow className="lg:hidden">
          <TranslateFormCell isDisabled>{reference}</TranslateFormCell>
        </TranslateFormRow>
      )}

      <TranslateFormRow className="lg:hidden">{children}</TranslateFormRow>
    </>
  );
};

type Props = PropsWithChildren & {
  className?:
    | string
    | {
        row?: string;
        referenceCell?: string;
        mobileInputCell?: string;
      };
  field: string | null | undefined;
  reference: string | null | undefined;
};
