import { Card, CardContent, CardTitle, Form, H4, Table, TableBody } from '@lunejs/ui';

import {
  type CommonCustomObjectDefinitionFragment,
  type CommonCustomObjectEntryForTranslationFragment
} from '@/lib/api/types';
import { getDisplayFieldValue } from '@/lib/custom-fields/utils/custom-field.utils';

import { TranslateFormHeader } from '../form/translate-form-header';
import { LocaleSelector } from '../locale-selector/locale-selector';

import { useTranslateObjectEntryForm } from './use-form/use-translate-object-entry-form';
import { TranslateCustomObjectValues } from './values/translate-custom-object-values';
import { TranslateCustomObjectEntrySubmitButton } from './submit-button';

export const TranslateCustomObjectEntryForm = ({ definition, entry }: Props) => {
  const form = useTranslateObjectEntryForm(entry);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="w-full border-l">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full p-4 border-b">
          <div className="flex items-center gap-3">
            <H4>{getDisplayFieldValue(entry, definition)}</H4>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* <ReplaceCollectionSheet /> */}
            <LocaleSelector />
            <TranslateCustomObjectEntrySubmitButton entry={entry} />
          </div>
        </header>
        <div className="p-4 sm:h-[calc(100vh-69px-69px-32px)] overflow-y-auto">
          <Card className="pb-0">
            <div className="flex items-center justify-between px-4">
              <CardTitle>General</CardTitle>
            </div>
            <CardContent className="p-0 border-t lg:border-t-0">
              <Table>
                <TranslateFormHeader />
                <TableBody>
                  <TranslateCustomObjectValues entry={entry} />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

type Props = {
  definition: CommonCustomObjectDefinitionFragment;
  entry: CommonCustomObjectEntryForTranslationFragment;
};
