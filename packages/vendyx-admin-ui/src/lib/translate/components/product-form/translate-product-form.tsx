import { ChevronDownIcon, Languages } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

import {
  Button,
  Card,
  CardContent,
  CardTitle,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  H4,
  Table,
  TableBody
} from '@vendyx/ui';

import type { CommonProductForTranslationFragment } from '@/lib/api/types';
import { isFirst, isLast } from '@/shared/utils/arrays.utils';

import { TranslateFormCell } from '../form/translate-form-cell';
import { TranslateFormHeader } from '../form/translate-form-header';
import { TranslateFormRow } from '../form/translate-form-row';
import { TranslateFormSeparator } from '../form/translate-form-separator';
import { TranslateInput } from '../form/translate-input';
import { TranslateTextarea } from '../form/translate-textarea';

import { useTranslateProductForm } from './use-translate-product-form';

export const TranslateProductForm = ({ product }: Props) => {
  const form = useTranslateProductForm(product);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="w-full border-l">
        <header className="flex items-center justify-between w-full p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src={product.assets.items?.[0].source}
              alt={product.name}
              className="w-9 h-9 rounded-sm object-cover"
            />
            <H4>{product.name}</H4>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'} disabled>
                  <Languages /> English <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>French</DropdownMenuItem>
                <DropdownMenuItem>German</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button disabled={!form.formState.isDirty || form.formState.isSubmitting}>Save</Button>
          </div>
        </header>
        <div className="p-4">
          <Card className="pb-0">
            <div className="flex items-center justify-between px-4">
              <CardTitle>General</CardTitle>
            </div>
            <CardContent className="p-0">
              <Table>
                <TranslateFormHeader />
                <TableBody>
                  <TranslateFormRow>
                    <TranslateFormCell>Name</TranslateFormCell>
                    <TranslateFormCell isDisabled>{product.name}</TranslateFormCell>
                    <TranslateInput {...form.register('name')} />
                  </TranslateFormRow>

                  <TranslateFormRow>
                    <TranslateFormCell>Description</TranslateFormCell>
                    <TranslateFormCell isDisabled>{product.description}</TranslateFormCell>
                    <TranslateTextarea {...form.register('description')} />
                  </TranslateFormRow>

                  <TranslateFormSeparator text="Options" />

                  {product.options.map(option => (
                    <Fragment key={option.id}>
                      <TranslateFormRow>
                        <TranslateFormCell>Option name</TranslateFormCell>
                        <TranslateFormCell isDisabled>{option.name}</TranslateFormCell>
                        <TranslateInput defaultValue={''} />
                      </TranslateFormRow>

                      {option.values.map((value, i) => (
                        <TranslateFormRow
                          key={value.id}
                          className={cn(!isLast(i, option.values) && 'border-0!')}
                        >
                          <TranslateFormCell>{isFirst(i) && 'Option Values'}</TranslateFormCell>
                          <TranslateFormCell className="border-b" isDisabled>
                            {value.name}
                          </TranslateFormCell>
                          <TranslateInput defaultValue={''} className="border-b" />
                        </TranslateFormRow>
                      ))}
                    </Fragment>
                  ))}
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
