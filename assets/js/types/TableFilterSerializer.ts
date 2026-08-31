import type { TableFilterOption } from './TableFilterOptionSerializer';
export interface TableFilter {
  clauses: Array<string>;
  colors: any | null;
  defaultClause: string;
  field: string;
  icon: string | null;
  label: string | null;
  max: any | null;
  min: any | null;
  nullable: boolean;
  options: Array<TableFilterOption>;
  placeholder: string | null;
  type: string;
}

import { z } from 'zod';
import { TableFilterOptionSchema } from './TableFilterOptionSerializer';

export const TableFilterSchema = z.object({
  clauses: z.array(z.string()),
  colors: z.any().nullable(),
  defaultClause: z.string(),
  field: z.string(),
  icon: z.string().nullable(),
  label: z.string().nullable(),
  max: z.any().nullable(),
  min: z.any().nullable(),
  nullable: z.boolean(),
  options: z.array(TableFilterOptionSchema),
  placeholder: z.string().nullable(),
  type: z.string(),
});

/** Wire/input representation accepted by TableFilterSchema. */
export type TableFilterWire = z.input<typeof TableFilterSchema>;

/** Runtime/output representation returned by TableFilterSchema. */
export type TableFilterRuntime = z.output<typeof TableFilterSchema>;
