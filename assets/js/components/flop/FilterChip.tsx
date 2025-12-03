/**
 * FilterChip - Individual filter display with inline editing
 */

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { FilterChipProps, FlopOperator } from './types';
import { getOperatorLabel, formatFilterValue } from './filterOperators';
import { FilterValueSelect } from './FilterValueSelect';
import { FilterValueInput } from './FilterValueInput';

export function FilterChip({
  config,
  operator,
  value,
  filterOptions,
  onOperatorChange,
  onValueChange,
  onRemove,
}: FilterChipProps) {
  const Icon = config.icon;
  const operatorLabel = getOperatorLabel(operator);
  const options = filterOptions || config.options || [];
  const valueLabel = formatFilterValue(value, options);

  const hasMultipleOperators = config.operators.length > 1;
  const isSelectType = config.type === 'enum' || config.type === 'relation' || config.type === 'boolean';

  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1 px-2 py-1 h-7 text-sm font-normal"
    >
      {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
      <span className="text-muted-foreground">{config.label}</span>

      {/* Operator */}
      {hasMultipleOperators ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="px-1 hover:bg-muted rounded text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {operatorLabel}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1" align="start">
            <div className="flex flex-col gap-0.5">
              {config.operators.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => onOperatorChange(op)}
                  className={`text-left px-2 py-1.5 text-sm rounded hover:bg-muted transition-colors ${
                    op === operator ? 'bg-muted font-medium' : ''
                  }`}
                >
                  {getOperatorLabel(op)}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <span className="text-xs text-muted-foreground">{operatorLabel}</span>
      )}

      {/* Value */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="px-1.5 py-0.5 bg-background border rounded text-xs font-medium hover:bg-muted transition-colors max-w-[120px] truncate"
          >
            {valueLabel}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="start">
          {isSelectType && options.length > 0 ? (
            <FilterValueSelect
              options={options}
              value={value}
              onSelect={onValueChange}
              placeholder={config.placeholder}
            />
          ) : (
            <FilterValueInput
              value={String(value || '')}
              onChange={onValueChange}
              placeholder={config.placeholder}
              type={config.type === 'number' ? 'number' : config.type === 'date' ? 'date' : 'text'}
            />
          )}
        </PopoverContent>
      </Popover>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="sm"
        className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20 hover:text-destructive"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Remove filter</span>
      </Button>
    </Badge>
  );
}

export default FilterChip;
