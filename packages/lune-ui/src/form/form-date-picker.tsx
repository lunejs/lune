import { type ComponentProps } from 'react';
import { formatDate } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { type Matcher } from 'react-day-picker';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/components';
import { cn } from '@/lib';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';

export const FormDatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  placeholder,
  className,
  disabledDates,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...rest}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && (
            <div className="flex items-center justify-between">
              <FormLabel className="flex items-center h-3.5">{label}</FormLabel>
            </div>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? formatDate(field.value, 'PPP') : <span>{placeholder}</span>}
                  <CalendarIcon size={16} className="ml-auto opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                defaultMonth={new Date(field.value ?? new Date())}
                selected={new Date(field.value)}
                onSelect={field.onChange}
                disabled={disabledDates}
                className="h-[325px]"
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<
  ComponentProps<typeof FormField<TFieldValues, TName>>,
  'control' | 'defaultValue' | 'disabled' | 'name'
> & {
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  disabledDates?: Matcher | undefined;
};
