import type { TableConfirmation } from './TableConfirmationSerializer';
export interface TableBulkAction {
  confirmation: TableConfirmation | null;
  frontend: boolean;
  icon: string | null;
  label: string | null;
  name: string;
  variant: string;
}

import { z } from 'zod';
import { TableConfirmationSchema } from './TableConfirmationSerializer';

export const TableBulkActionSchema = z.object({
  confirmation: TableConfirmationSchema.nullable(),
  frontend: z.boolean(),
  icon: z.string().nullable(),
  label: z.string().nullable(),
  name: z.string(),
  variant: z.string(),
});

/** Wire/input representation accepted by TableBulkActionSchema. */
export type TableBulkActionWire = z.input<typeof TableBulkActionSchema>;

/** Runtime/output representation returned by TableBulkActionSchema. */
export type TableBulkActionRuntime = z.output<typeof TableBulkActionSchema>;
