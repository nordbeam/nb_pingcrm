import type { TableFlop } from './TableFlopSerializer';
export interface TableMeta {
  currentPage: number | null;
  endCursor: string | null;
  flop: TableFlop | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  pageSize: number | null;
  previousPage: number | null;
  startCursor: string | null;
  totalCount: number | null;
  totalPages: number | null;
}

import { z } from 'zod';
import { TableFlopSchema } from './TableFlopSerializer';

export const TableMetaSchema = z.object({
  currentPage: z.number().nullable(),
  endCursor: z.string().nullable(),
  flop: TableFlopSchema.nullable(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  nextPage: z.number().nullable(),
  pageSize: z.number().nullable(),
  previousPage: z.number().nullable(),
  startCursor: z.string().nullable(),
  totalCount: z.number().nullable(),
  totalPages: z.number().nullable(),
});

/** Wire/input representation accepted by TableMetaSchema. */
export type TableMetaWire = z.input<typeof TableMetaSchema>;

/** Runtime/output representation returned by TableMetaSchema. */
export type TableMetaRuntime = z.output<typeof TableMetaSchema>;
