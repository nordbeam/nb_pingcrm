/**
 * FilterValueInput - Text/number/date input for filter values
 */

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import type { FilterValueInputProps } from './types';

export function FilterValueInput({
  value = '',
  onChange,
  placeholder = 'Enter value...',
  type = 'text',
  debounceMs = 500,
}: FilterValueInputProps & { debounceMs?: number }) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local value when prop changes (e.g., from URL)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new debounced timeout
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Clear pending timeout and submit immediately
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      onChange(localValue);
    }
  };

  const handleBlur = () => {
    // Submit on blur if value differs
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  return (
    <Input
      type={type}
      value={localValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder={placeholder}
      className="h-8"
    />
  );
}

export default FilterValueInput;
