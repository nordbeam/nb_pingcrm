export interface FlopFilter {
  field: string;
  op: string;
  value: any;
}

import { z } from 'zod';

export const FlopFilterSchema = z.object({
  field: z.string(),
  op: z.string(),
  value: z.any(),
});

/** Wire/input representation accepted by FlopFilterSchema. */
export type FlopFilterWire = z.input<typeof FlopFilterSchema>;

/** Runtime/output representation returned by FlopFilterSchema. */
export type FlopFilterRuntime = z.output<typeof FlopFilterSchema>;
