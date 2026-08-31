import type { FlopParams } from './FlopParamsSerializer';
import type { FilterableField } from './FilterableFieldSerializer';
export interface FlopMeta {
  currentOffset: number | null;
  currentPage: number | null;
  endCursor: string | null;
  filterableFields?: Array<FilterableField>;
  flop: FlopParams;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextOffset: number | null;
  nextPage: number | null;
  pageSize: number | null;
  previousOffset: number | null;
  previousPage: number | null;
  sortableFields?: Array<string>;
  startCursor: string | null;
  totalCount: number | null;
  totalPages: number | null;
}

import { z } from 'zod';
import { FilterableFieldSchema } from './FilterableFieldSerializer';
import { FlopParamsSchema } from './FlopParamsSerializer';

export const FlopMetaSchema = z.object({
  currentOffset: z.number().nullable(),
  currentPage: z.number().nullable(),
  endCursor: z.string().nullable(),
  filterableFields: z.array(FilterableFieldSchema).optional(),
  flop: FlopParamsSchema,
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  nextOffset: z.number().nullable(),
  nextPage: z.number().nullable(),
  pageSize: z.number().nullable(),
  previousOffset: z.number().nullable(),
  previousPage: z.number().nullable(),
  sortableFields: z.array(z.string()).optional(),
  startCursor: z.string().nullable(),
  totalCount: z.number().nullable(),
  totalPages: z.number().nullable(),
});

/** Wire/input representation accepted by FlopMetaSchema. */
export type FlopMetaWire = z.input<typeof FlopMetaSchema>;

/** Runtime/output representation returned by FlopMetaSchema. */
export type FlopMetaRuntime = z.output<typeof FlopMetaSchema>;
