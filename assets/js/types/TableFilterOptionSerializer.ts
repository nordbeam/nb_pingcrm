export interface TableFilterOption {
  label: string;
  value: string;
}

import { z } from 'zod';

export const TableFilterOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

/** Wire/input representation accepted by TableFilterOptionSchema. */
export type TableFilterOptionWire = z.input<typeof TableFilterOptionSchema>;

/** Runtime/output representation returned by TableFilterOptionSchema. */
export type TableFilterOptionRuntime = z.output<typeof TableFilterOptionSchema>;
