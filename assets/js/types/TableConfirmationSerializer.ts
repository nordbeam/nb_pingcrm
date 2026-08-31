export interface TableConfirmation {
  cancelButton: string | null;
  confirmButton: string | null;
  icon: string | null;
  message: string;
  title: string;
  variant: string;
}

import { z } from 'zod';

export const TableConfirmationSchema = z.object({
  cancelButton: z.string().nullable(),
  confirmButton: z.string().nullable(),
  icon: z.string().nullable(),
  message: z.string(),
  title: z.string(),
  variant: z.string(),
});

/** Wire/input representation accepted by TableConfirmationSchema. */
export type TableConfirmationWire = z.input<typeof TableConfirmationSchema>;

/** Runtime/output representation returned by TableConfirmationSchema. */
export type TableConfirmationRuntime = z.output<typeof TableConfirmationSchema>;
