import { CardTitle, TableCell } from '@lune/ui';

import { TranslateFormRow } from './translate-form-row';

export const TranslateFormSeparator = ({ className, text }: Props) => {
  return (
    <TranslateFormRow className={className}>
      <TableCell className="py-6 pl-4">
        <CardTitle className="text-base">{text}</CardTitle>
      </TableCell>
    </TranslateFormRow>
  );
};

type Props = {
  className?: string;
  text: string;
};
