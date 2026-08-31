import type { TableEmptyStateAction } from './TableEmptyStateActionSerializer';
export interface TableEmptyState {
  action: TableEmptyStateAction | null;
  icon: string | null;
  message: string | null;
  title: string;
}

import { z } from 'zod';
import { TableEmptyStateActionSchema } from './TableEmptyStateActionSerializer';

export const TableEmptyStateSchema = z.object({
  action: TableEmptyStateActionSchema.nullable(),
  icon: z.string().nullable(),
  message: z.string().nullable(),
  title: z.string(),
});

/** Wire/input representation accepted by TableEmptyStateSchema. */
export type TableEmptyStateWire = z.input<typeof TableEmptyStateSchema>;

/** Runtime/output representation returned by TableEmptyStateSchema. */
export type TableEmptyStateRuntime = z.output<typeof TableEmptyStateSchema>;
