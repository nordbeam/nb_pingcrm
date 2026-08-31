import type { TableExport } from './TableExportSerializer';
import type { TableMeta } from './TableMetaSerializer';
import type { TableState } from './TableStateSerializer';
import type { TableFilter } from './TableFilterSerializer';
import type { TableColumn } from './TableColumnSerializer';
import type { TableAction } from './TableActionSerializer';
import type { TableViews } from './TableViewsSerializer';
import type { TableBulkAction } from './TableBulkActionSerializer';
import type { TableEmptyState } from './TableEmptyStateSerializer';
export interface TableResource {
  actions: Array<TableAction>;
  bulkActions: Array<TableBulkAction>;
  columns: Array<TableColumn>;
  data: any;
  emptyState: TableEmptyState | null;
  error: any | null;
  exports: Array<TableExport>;
  filters: Array<TableFilter>;
  meta: TableMeta;
  name: string;
  perPageOptions: Array<number>;
  searchPlaceholder: string | null;
  searchable: Array<string>;
  state: TableState;
  stickyHeader: boolean;
  token: string | null;
  views: TableViews;
}

import { z } from 'zod';
import { TableActionSchema } from './TableActionSerializer';
import { TableBulkActionSchema } from './TableBulkActionSerializer';
import { TableColumnSchema } from './TableColumnSerializer';
import { TableEmptyStateSchema } from './TableEmptyStateSerializer';
import { TableExportSchema } from './TableExportSerializer';
import { TableFilterSchema } from './TableFilterSerializer';
import { TableMetaSchema } from './TableMetaSerializer';
import { TableStateSchema } from './TableStateSerializer';
import { TableViewsSchema } from './TableViewsSerializer';

export const TableResourceSchema = z.object({
  actions: z.array(TableActionSchema),
  bulkActions: z.array(TableBulkActionSchema),
  columns: z.array(TableColumnSchema),
  data: z.any(),
  emptyState: TableEmptyStateSchema.nullable(),
  error: z.any().nullable(),
  exports: z.array(TableExportSchema),
  filters: z.array(TableFilterSchema),
  meta: TableMetaSchema,
  name: z.string(),
  perPageOptions: z.array(z.number()),
  searchPlaceholder: z.string().nullable(),
  searchable: z.array(z.string()),
  state: TableStateSchema,
  stickyHeader: z.boolean(),
  token: z.string().nullable(),
  views: TableViewsSchema,
});

/** Wire/input representation accepted by TableResourceSchema. */
export type TableResourceWire = z.input<typeof TableResourceSchema>;

/** Runtime/output representation returned by TableResourceSchema. */
export type TableResourceRuntime = z.output<typeof TableResourceSchema>;
