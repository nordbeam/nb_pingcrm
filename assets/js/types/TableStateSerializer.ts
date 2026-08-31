import type { TableSortState } from './TableSortStateSerializer';
import type { TableFlopFilter } from './TableFlopFilterSerializer';
export interface TableState {
  columns: Array<string>;
  filters: Array<TableFlopFilter>;
  page: number;
  perPage: number;
  search: string | null;
  sort: TableSortState | null;
}

import { z } from 'zod';
import { TableFlopFilterSchema } from './TableFlopFilterSerializer';
import { TableSortStateSchema } from './TableSortStateSerializer';

export const TableStateSchema = z.object({
  columns: z.array(z.string()),
  filters: z.array(TableFlopFilterSchema),
  page: z.number(),
  perPage: z.number(),
  search: z.string().nullable(),
  sort: TableSortStateSchema.nullable(),
});

/** Wire/input representation accepted by TableStateSchema. */
export type TableStateWire = z.input<typeof TableStateSchema>;

/** Runtime/output representation returned by TableStateSchema. */
export type TableStateRuntime = z.output<typeof TableStateSchema>;
