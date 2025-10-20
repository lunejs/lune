import { Card, CardContent, CardTitle, cn, Form, H4, Table, TableBody } from '@vendyx/ui';

import { type CommonProductForTranslationFragment } from '@/lib/api/types';
import { ImagePlaceholder } from '@/shared/components/placeholders/image-placeholder';

import { TranslateFormHeader } from '../form/translate-form-header';
import { TranslateFormRowData } from '../form/translate-form-row-data';
import { TranslateFormSeparator } from '../form/translate-form-separator';
import { TranslateInput } from '../form/translate-input';
import { TranslateTextarea } from '../form/translate-textarea';
import { LocaleSelector } from '../locale-selector/locale-selector';

import { TranslateOptions } from './options/translate-product-options';
import { ReplaceProductSheet } from './replace-product/replace-product-sheet';
import { TranslateProductFormSubmitButton } from './submit-button/translate-product-form-submit-button';
import { useTranslateProductForm } from './use-form/use-translate-product-form';

export const TranslateProductForm = ({ product }: Props) => {
  const form = useTranslateProductForm(product);

  const hasOptions = !!product.options.length;

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="w-full border-l">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full p-4 border-b">
          <div className="flex items-center gap-3">
            {product.assets.items?.[0]?.source ? (
              <img
                src={product.assets.items?.[0]?.source}
                alt={product.name}
                className="shrink-0 size-10 sm:size-9 rounded-sm object-cover"
              />
            ) : (
              <ImagePlaceholder
                className="shrink-0 size-10 sm:size-9 rounded-sm object-cover"
                initial={product.name}
              />
            )}
            <H4>{product.name}</H4>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <ReplaceProductSheet />
            <LocaleSelector />
            <TranslateProductFormSubmitButton product={product} />
          </div>
        </header>
        <div className="p-4">
          <Card className="pb-0">
            <div className="flex items-center justify-between px-4">
              <CardTitle>General</CardTitle>
            </div>
            <CardContent className="p-0 border-t lg:border-t-0">
              <Table>
                <TranslateFormHeader />
                <TableBody>
                  <TranslateFormRowData field="Name" reference={product.name}>
                    <TranslateInput label="English" {...form.register('name')} />
                  </TranslateFormRowData>

                  <TranslateFormRowData
                    field="Description"
                    reference={product.description}
                    className={cn(!hasOptions && 'border-b-0')}
                  >
                    <TranslateTextarea label="English" {...form.register('description')} />
                  </TranslateFormRowData>

                  {hasOptions && <TranslateFormSeparator text="Options" />}

                  <TranslateOptions product={product} />
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
  product: CommonProductForTranslationFragment;
};
