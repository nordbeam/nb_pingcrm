import type { TableFlopFilter } from './TableFlopFilterSerializer';
export interface TableFlop {
  filters: Array<TableFlopFilter>;
  orderBy: Array<string> | null;
  orderDirections: Array<string> | null;
  page: number | null;
  pageSize: number | null;
}

import { z } from 'zod';
import { TableFlopFilterSchema } from './TableFlopFilterSerializer';

export const TableFlopSchema = z.object({
  filters: z.array(TableFlopFilterSchema),
  orderBy: z.array(z.string()).nullable(),
  orderDirections: z.array(z.string()).nullable(),
  page: z.number().nullable(),
  pageSize: z.number().nullable(),
});

/** Wire/input representation accepted by TableFlopSchema. */
export type TableFlopWire = z.input<typeof TableFlopSchema>;

/** Runtime/output representation returned by TableFlopSchema. */
export type TableFlopRuntime = z.output<typeof TableFlopSchema>;
