export interface TableEmptyStateAction {
  label: string;
  url: string;
  variant: string;
}

import { z } from 'zod';

export const TableEmptyStateActionSchema = z.object({
  label: z.string(),
  url: z.string(),
  variant: z.string(),
});

/** Wire/input representation accepted by TableEmptyStateActionSchema. */
export type TableEmptyStateActionWire = z.input<typeof TableEmptyStateActionSchema>;

/** Runtime/output representation returned by TableEmptyStateActionSchema. */
export type TableEmptyStateActionRuntime = z.output<typeof TableEmptyStateActionSchema>;
