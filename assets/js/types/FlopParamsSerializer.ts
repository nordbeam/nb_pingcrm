import type { FlopFilter } from './FlopFilterSerializer';
export interface FlopParams {
  after?: string | null;
  before?: string | null;
  filters: Array<FlopFilter>;
  first?: number | null;
  last?: number | null;
  limit?: number | null;
  offset?: number | null;
  orderBy?: Array<string>;
  orderDirections?: Array<string>;
  page?: number | null;
  pageSize?: number | null;
}

import { z } from 'zod';
import { FlopFilterSchema } from './FlopFilterSerializer';

export const FlopParamsSchema = z.object({
  after: z.string().nullable().optional(),
  before: z.string().nullable().optional(),
  filters: z.array(FlopFilterSchema),
  first: z.number().nullable().optional(),
  last: z.number().nullable().optional(),
  limit: z.number().nullable().optional(),
  offset: z.number().nullable().optional(),
  orderBy: z.array(z.string()).optional(),
  orderDirections: z.array(z.string()).optional(),
  page: z.number().nullable().optional(),
  pageSize: z.number().nullable().optional(),
});

/** Wire/input representation accepted by FlopParamsSchema. */
export type FlopParamsWire = z.input<typeof FlopParamsSchema>;

/** Runtime/output representation returned by FlopParamsSchema. */
export type FlopParamsRuntime = z.output<typeof FlopParamsSchema>;
