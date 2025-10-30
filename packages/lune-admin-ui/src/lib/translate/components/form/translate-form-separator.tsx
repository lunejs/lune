import { CardTitle, TableCell } from '@lune/ui';

import { TranslateFormRow } from './translate-form-row';

export const TranslateFormSeparator = ({ text }: Props) => {
  return (
    <TranslateFormRow>
      <TableCell className="py-6 pl-4">
        <CardTitle className="text-base">{text}</CardTitle>
      </TableCell>
    </TranslateFormRow>
  );
};

type Props = {
  text: string;
};
