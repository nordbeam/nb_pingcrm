/**
 * FilterValueSelect - Searchable select for enum/relation filter values
 */

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { FilterValueSelectProps } from './types';

export function FilterValueSelect({
  options,
  value,
  onSelect,
  placeholder = 'Search...',
}: FilterValueSelectProps) {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = option.value === value;

            return (
              <CommandItem
                key={String(option.value)}
                value={option.label}
                onSelect={() => onSelect(option.value)}
                className={isSelected ? 'bg-accent' : ''}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <span>{option.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default FilterValueSelect;
