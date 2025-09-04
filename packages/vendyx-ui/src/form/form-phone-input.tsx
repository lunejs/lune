import { type ComponentProps } from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { cn } from '@/lib';
import { PhoneInput } from '@/components/phone-input';

export const FormPhoneInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  className,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...rest}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && (
            <FormLabel className="flex items-center h-[14px]">
              {label}
            </FormLabel>
          )}
          <div className="flex items-center gap-2 w-full">
            <FormControl>
              <PhoneInput {...field} />
            </FormControl>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<
  ComponentProps<typeof FormField<TFieldValues, TName>>,
  'control' | 'defaultValue' | 'disabled' | 'name'
> & {
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
};
