export interface TableExport {
  format: string;
  label: string | null;
  name: string;
}

import { z } from 'zod';

export const TableExportSchema = z.object({
  format: z.string(),
  label: z.string().nullable(),
  name: z.string(),
});

/** Wire/input representation accepted by TableExportSchema. */
export type TableExportWire = z.input<typeof TableExportSchema>;

/** Runtime/output representation returned by TableExportSchema. */
export type TableExportRuntime = z.output<typeof TableExportSchema>;
