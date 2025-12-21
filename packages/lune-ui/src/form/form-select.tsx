import { type ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components';
import { cn } from '@/lib/utils';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';

export const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  items,
  groups,
  label,
  description,
  placeholder,
  className,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...rest}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {groups?.map(group => (
                <SelectGroup key={group.label}>
                  <SelectLabel>{group.label}</SelectLabel>

                  {group.items.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.icon && <item.icon size={16} />} {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
              {items?.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon && <item.icon size={16} />} {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
  groups?: { label: string; items: SelectItem[] }[];
  items?: SelectItem[];
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
};

type SelectItem = { label: string; value: string; icon?: LucideIcon };
