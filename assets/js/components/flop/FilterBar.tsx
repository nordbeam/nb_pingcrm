/**
 * FilterBar - Main container for Linear-style filter chips
 */

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FilterBarProps, FilterConfig, FlopOperator } from './types';
import { FilterChip } from './FilterChip';
import { AddFilterButton } from './AddFilterButton';
import { FilterModeToggle } from './FilterModeToggle';

export function FilterBar({
  configs,
  filters,
  customFilters = {},
  filterOptions = {},
  filterMode,
  onFilterChange,
  onFilterRemove,
  onCustomFilterChange,
  onClearFilters,
  onFilterModeChange,
  className = '',
}: FilterBarProps) {
  // Build active filters from both Flop filters and custom filters
  const activeFilters: Array<{
    config: FilterConfig;
    operator: FlopOperator | string;
    value: unknown;
    isCustom: boolean;
  }> = [];

  // Add custom filters (role, trashed, etc.)
  configs.forEach((config) => {
    if (config.customParam && customFilters[config.customParam] !== undefined) {
      const value = customFilters[config.customParam];
      // Skip "default" values
      if (value !== '' && value !== null && value !== 'all' && value !== 'not_trashed') {
        activeFilters.push({
          config,
          operator: '==',
          value,
          isCustom: true,
        });
      }
    }
  });

  // Add Flop filters
  filters.forEach((filter) => {
    const config = configs.find(
      (c) => c.field === filter.field || c.customParam === filter.field
    );
    if (config && !config.customParam) {
      activeFilters.push({
        config,
        operator: filter.op,
        value: filter.value,
        isCustom: false,
      });
    }
  });

  const hasActiveFilters = activeFilters.length > 0;

  const handleFilterChange = (
    config: FilterConfig,
    isCustom: boolean,
    op: FlopOperator | string,
    value: unknown
  ) => {
    if (isCustom && config.customParam && onCustomFilterChange) {
      onCustomFilterChange(config.customParam, value);
    } else {
      onFilterChange(config.field, op, value);
    }
  };

  const handleFilterRemove = (config: FilterConfig, isCustom: boolean, op: FlopOperator | string) => {
    if (isCustom && config.customParam && onCustomFilterChange) {
      // Reset to default value
      onCustomFilterChange(config.customParam, undefined);
    } else {
      onFilterRemove(config.field, op);
    }
  };

  // Filter out configs that already have active filters for the add button
  const availableConfigs = configs.filter((config) => {
    // For single-value fields (customParam), check if already active
    if (config.customParam) {
      return !activeFilters.some((af) => af.config.field === config.field);
    }
    // For Flop filters, allow multiple (different operators)
    return true;
  });

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      role="group"
      aria-label="Active filters"
    >
      {/* Active filter chips */}
      {activeFilters.map((af, index) => {
        const options =
          (af.config.optionsKey && filterOptions[af.config.optionsKey]) ||
          af.config.options;

        return (
          <FilterChip
            key={`${af.config.field}-${af.operator}-${index}`}
            config={af.config}
            operator={af.operator}
            value={af.value}
            filterOptions={options}
            onOperatorChange={(op) =>
              handleFilterChange(af.config, af.isCustom, op, af.value)
            }
            onValueChange={(value) =>
              handleFilterChange(af.config, af.isCustom, af.operator, value)
            }
            onRemove={() => handleFilterRemove(af.config, af.isCustom, af.operator)}
          />
        );
      })}

      {/* Add filter button */}
      {availableConfigs.length > 0 && (
        <AddFilterButton
          configs={availableConfigs}
          filterOptions={filterOptions}
          onAddFilter={(field, op, value) => {
            const config = configs.find(
              (c) => c.field === field || c.customParam === field
            );
            if (config?.customParam && onCustomFilterChange) {
              onCustomFilterChange(config.customParam, value);
            } else {
              onFilterChange(field, op, value);
            }
          }}
        />
      )}

      {/* Filter mode toggle (only show when multiple filters) */}
      {activeFilters.length > 1 && (
        <FilterModeToggle mode={filterMode} onChange={onFilterModeChange} />
      )}

      {/* Clear all button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground hover:text-destructive"
          onClick={onClearFilters}
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}

export default FilterBar;
