export interface TableColumn {
  alignment: string;
  cellClass: string | null;
  colors: any | null;
  decimals: number | null;
  fallback: string | null;
  format: string | null;
  headerClass: string | null;
  height: number | null;
  key: string;
  label: string | null;
  prefix: string | null;
  rounded: boolean | null;
  searchable: boolean;
  sortable: boolean;
  stickable: boolean;
  suffix: string | null;
  thousandsSeparator: string | null;
  toggleable: boolean;
  truncate: boolean;
  type: string;
  visible: boolean;
  width: number | null;
  wrap: boolean;
}

import { z } from 'zod';

export const TableColumnSchema = z.object({
  alignment: z.string(),
  cellClass: z.string().nullable(),
  colors: z.any().nullable(),
  decimals: z.number().nullable(),
  fallback: z.string().nullable(),
  format: z.string().nullable(),
  headerClass: z.string().nullable(),
  height: z.number().nullable(),
  key: z.string(),
  label: z.string().nullable(),
  prefix: z.string().nullable(),
  rounded: z.boolean().nullable(),
  searchable: z.boolean(),
  sortable: z.boolean(),
  stickable: z.boolean(),
  suffix: z.string().nullable(),
  thousandsSeparator: z.string().nullable(),
  toggleable: z.boolean(),
  truncate: z.boolean(),
  type: z.string(),
  visible: z.boolean(),
  width: z.number().nullable(),
  wrap: z.boolean(),
});

/** Wire/input representation accepted by TableColumnSchema. */
export type TableColumnWire = z.input<typeof TableColumnSchema>;

/** Runtime/output representation returned by TableColumnSchema. */
export type TableColumnRuntime = z.output<typeof TableColumnSchema>;
