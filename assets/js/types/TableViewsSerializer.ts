import type { TableViewItem } from './TableViewItemSerializer';
export interface TableViews {
  current: TableViewItem | null;
  enabled: boolean;
  list: Array<TableViewItem>;
}

import { z } from 'zod';
import { TableViewItemSchema } from './TableViewItemSerializer';

export const TableViewsSchema = z.object({
  current: TableViewItemSchema.nullable(),
  enabled: z.boolean(),
  list: z.array(TableViewItemSchema),
});

/** Wire/input representation accepted by TableViewsSchema. */
export type TableViewsWire = z.input<typeof TableViewsSchema>;

/** Runtime/output representation returned by TableViewsSchema. */
export type TableViewsRuntime = z.output<typeof TableViewsSchema>;
