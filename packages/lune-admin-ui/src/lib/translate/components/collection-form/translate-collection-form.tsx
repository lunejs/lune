import { Card, CardContent, CardTitle, Form, H4, Table, TableBody } from '@lunejs/ui';

import { type CommonCollectionForTranslationFragment } from '@/lib/api/types';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

import { TranslateFormHeader } from '../form/translate-form-header';
import { TranslateFormRowData } from '../form/translate-form-row-data';
import { TranslateFormSeparator } from '../form/translate-form-separator';
import { TranslateInput } from '../form/translate-input';
import { TranslateTextarea } from '../form/translate-textarea';
import { LocaleSelector } from '../locale-selector/locale-selector';

import { TranslateCollectionCustomField } from './custom-fields/translate-collection-custom-fields';
import { ReplaceCollectionSheet } from './replace-collection/replace-collection-sheet';
import { useTranslateCollectionForm } from './use-form/use-translate-collection-form';
import { TranslateCollectionSubmitButton } from './submit-button';

export const TranslateCollectionForm = ({ collection }: Props) => {
  const form = useTranslateCollectionForm(collection);

  const hasCustomFields = !!collection.customFieldEntries.length;

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="w-full border-l">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full p-4 border-b">
          <div className="flex items-center gap-3">
            {collection.assets.items?.[0]?.source ? (
              <img
                src={collection.assets.items?.[0]?.source}
                alt={collection.name}
                className="shrink-0 size-10 sm:size-9 rounded-sm object-cover"
              />
            ) : (
              <ImagePlaceholder
                className="shrink-0 size-10 sm:size-9 rounded-sm object-cover"
                initial={collection.name}
              />
            )}
            <H4>{collection.name}</H4>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <ReplaceCollectionSheet />
            <LocaleSelector />
            <TranslateCollectionSubmitButton collection={collection} />
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
                  <TranslateFormRowData field="Name" reference={collection.name}>
                    <TranslateInput
                      label="English"
                      {...form.register('name')}
                      onChange={e => form.setValue('name', e.target.value)}
                    />
                  </TranslateFormRowData>

                  <TranslateFormRowData
                    field="Description"
                    reference={collection.description}
                    className="border-b-0"
                  >
                    <TranslateTextarea
                      label="English"
                      {...form.register('description')}
                      onChange={e => form.setValue('description', e.target.value)}
                    />
                  </TranslateFormRowData>

                  {hasCustomFields && (
                    <TranslateFormSeparator text="Custom fields" className="border-t!" />
                  )}

                  <TranslateCollectionCustomField collection={collection} />
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
  collection: CommonCollectionForTranslationFragment;
};
