export interface TableSortState {
  direction: string;
  field: string;
}

import { z } from 'zod';

export const TableSortStateSchema = z.object({
  direction: z.string(),
  field: z.string(),
});

/** Wire/input representation accepted by TableSortStateSchema. */
export type TableSortStateWire = z.input<typeof TableSortStateSchema>;

/** Runtime/output representation returned by TableSortStateSchema. */
export type TableSortStateRuntime = z.output<typeof TableSortStateSchema>;
