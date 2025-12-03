/**
 * AddFilterButton - Dropdown with nested menus to add filters
 */

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { AddFilterButtonProps, FilterOption } from './types';
import { getDefaultOperator } from './filterOperators';

export function AddFilterButton({
  configs,
  filterOptions = {},
  onAddFilter,
}: AddFilterButtonProps) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  const handleSelectValue = (
    field: string,
    type: string,
    value: unknown,
    operators: string[]
  ) => {
    const op = getDefaultOperator(type as never);
    onAddFilter(field, operators.includes(op) ? op : operators[0], value);
    setOpen(false);
    // Clear the input value after adding
    setInputValues((prev) => ({ ...prev, [field]: '' }));
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string,
    type: string,
    operators: string[]
  ) => {
    if (e.key === 'Enter') {
      const value = inputValues[field]?.trim();
      if (value) {
        handleSelectValue(field, type, value, operators);
      }
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {configs.map((config) => {
          const Icon = config.icon;
          const options: FilterOption[] =
            (config.optionsKey && filterOptions[config.optionsKey]) ||
            config.options ||
            [];

          // For fields with options (enum/relation), show nested menu with searchable list
          if (options.length > 0) {
            return (
              <DropdownMenuSub key={config.field}>
                <DropdownMenuSubTrigger className="gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{config.label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="p-0">
                  <Command>
                    <CommandInput placeholder={`Search ${config.label.toLowerCase()}...`} />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => {
                          const OptionIcon = option.icon;
                          return (
                            <CommandItem
                              key={String(option.value)}
                              value={option.label}
                              onSelect={() =>
                                handleSelectValue(
                                  config.customParam || config.field,
                                  config.type,
                                  option.value,
                                  config.operators as string[]
                                )
                              }
                            >
                              {OptionIcon && <OptionIcon className="mr-2 h-4 w-4" />}
                              <span>{option.label}</span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          }

          // For string/number fields, show nested menu with input
          return (
            <DropdownMenuSub key={config.field}>
              <DropdownMenuSubTrigger className="gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                <span>{config.label}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-2 w-48">
                <Input
                  type={config.type === 'number' ? 'number' : 'text'}
                  placeholder={config.placeholder || `Enter ${config.label.toLowerCase()}...`}
                  value={inputValues[config.field] || ''}
                  onChange={(e) =>
                    setInputValues((prev) => ({
                      ...prev,
                      [config.field]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) =>
                    handleInputKeyDown(
                      e,
                      config.customParam || config.field,
                      config.type,
                      config.operators as string[]
                    )
                  }
                  autoFocus
                  className="h-8"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Press Enter to add filter
                </p>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddFilterButton;
