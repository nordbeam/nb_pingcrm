export interface TableFlopFilter {
  field: string;
  op: string;
  value: any;
}

import { z } from 'zod';

export const TableFlopFilterSchema = z.object({
  field: z.string(),
  op: z.string(),
  value: z.any(),
});

/** Wire/input representation accepted by TableFlopFilterSchema. */
export type TableFlopFilterWire = z.input<typeof TableFlopFilterSchema>;

/** Runtime/output representation returned by TableFlopFilterSchema. */
export type TableFlopFilterRuntime = z.output<typeof TableFlopFilterSchema>;
