export interface FilterableField {
  field: string;
  label: string;
  operators: Array<string>;
  type: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'array' | 'enum';
}

import { z } from 'zod';

export const FilterableFieldSchema = z.object({
  field: z.string(),
  label: z.string(),
  operators: z.array(z.string()),
  type: z.enum(['string', 'number', 'boolean', 'date', 'datetime', 'array', 'enum']),
});

/** Wire/input representation accepted by FilterableFieldSchema. */
export type FilterableFieldWire = z.input<typeof FilterableFieldSchema>;

/** Runtime/output representation returned by FilterableFieldSchema. */
export type FilterableFieldRuntime = z.output<typeof FilterableFieldSchema>;
