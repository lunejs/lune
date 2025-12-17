'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { Badge, Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@lune/ui';

export function MultiSelect({
  items,
  defaultSelected,
  onSelectionChange,
  placeholder = 'Select options...'
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Item[]>(defaultSelected ?? []);
  const [inputValue, setInputValue] = useState('');
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUnselect = (option: Item) => {
    const newSelected = selected.filter(s => s.value !== option.value);

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if ((e.key === 'Delete' || e.key === 'Backspace') && input.value === '') {
        const optionToRemove = selected[selected.length - 1];
        handleUnselect(optionToRemove);
      }

      if (e.key === 'Escape') {
        input.blur();
        setOpen(false);
      }
    },
    [selected]
  );

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;

    const prevPaddingRight = html.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      html.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  const updateDropdownPosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const preferredHeight = 240;
    const margin = 8;

    const style: React.CSSProperties = {
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 50
    };

    if (spaceBelow >= preferredHeight || spaceBelow >= spaceAbove) {
      // opens above
      style.top = rect.bottom + margin;
      style.maxHeight = Math.max(120, Math.min(preferredHeight, spaceBelow - margin));
    } else {
      // opens under
      style.bottom = viewportHeight - rect.top + margin;
      style.maxHeight = Math.max(120, Math.min(preferredHeight, spaceAbove - margin));
    }

    setDropdownStyle(style);
  }, []);

  useEffect(() => {
    if (open) {
      updateDropdownPosition();
    }
  }, [open, updateDropdownPosition, selected.length]);

  // close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!triggerRef.current?.contains(target) && !dropdownRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const isSelected = (opt: Item) => selected.some(s => s.value === opt.value);

  const availableToSelect = items.filter(opt => !isSelected(opt));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent h-auto">
      <div
        ref={triggerRef}
        className="group dark:bg-input/30 rounded-md border border-input px-3 py-2 text-sm transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
        onClick={() => {
          setOpen(true);
          requestAnimationFrame(() => {
            inputRef.current?.focus();
          });
        }}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map(option => (
            <Badge key={option.value} variant="secondary">
              {option.leading}
              {option.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}

          <CommandInput
            raw
            ref={inputRef}
            value={inputValue}
            onValueChange={e => {
              setInputValue(e);
              if (!open) setOpen(true);
            }}
            onFocus={() => {
              setOpen(true);
              updateDropdownPosition();
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {mounted &&
        open &&
        availableToSelect.length > 0 &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in overflow-auto"
          >
            <CommandList className="max-h-fit">
              <CommandGroup className="max-h-none overflow-visible">
                {availableToSelect.map(option => (
                  <CommandItem
                    key={option.value}
                    onMouseDown={e => e.preventDefault()}
                    onSelect={() => {
                      setInputValue('');
                      const newSelected = [...selected, option];
                      setSelected(newSelected);
                      onSelectionChange?.(newSelected);
                    }}
                    className="cursor-pointer"
                  >
                    {option.leading}
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>,
          document.body
        )}
    </Command>
  );
}

type Props = {
  items: Item[];
  defaultSelected?: Item[];
  onSelectionChange?: (selected: Item[]) => void;
  placeholder?: string;
};

export type Item = {
  value: string;
  label: string;
  leading?: React.ReactElement;
};
