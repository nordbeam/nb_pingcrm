import type { TableConfirmation } from './TableConfirmationSerializer';
export interface TableAction {
  confirmation: TableConfirmation | null;
  frontend: boolean;
  icon: string | null;
  label: string | null;
  name: string;
  variant: string;
}

import { z } from 'zod';
import { TableConfirmationSchema } from './TableConfirmationSerializer';

export const TableActionSchema = z.object({
  confirmation: TableConfirmationSchema.nullable(),
  frontend: z.boolean(),
  icon: z.string().nullable(),
  label: z.string().nullable(),
  name: z.string(),
  variant: z.string(),
});

/** Wire/input representation accepted by TableActionSchema. */
export type TableActionWire = z.input<typeof TableActionSchema>;

/** Runtime/output representation returned by TableActionSchema. */
export type TableActionRuntime = z.output<typeof TableActionSchema>;
