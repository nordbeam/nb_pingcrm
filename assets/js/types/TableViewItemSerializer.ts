export interface TableViewItem {
  default: boolean;
  id: string;
  name: string;
}

import { z } from 'zod';

export const TableViewItemSchema = z.object({
  default: z.boolean(),
  id: z.string(),
  name: z.string(),
});

/** Wire/input representation accepted by TableViewItemSchema. */
export type TableViewItemWire = z.input<typeof TableViewItemSchema>;

/** Runtime/output representation returned by TableViewItemSchema. */
export type TableViewItemRuntime = z.output<typeof TableViewItemSchema>;
