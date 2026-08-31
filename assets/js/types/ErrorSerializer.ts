export interface Error {
  code?: string;
  details?: any;
  error?: string;
  field?: string;
  message?: string;
  status?: number;
}

import { z } from 'zod';

export const ErrorSchema = z.object({
  code: z.string().optional(),
  details: z.any().optional(),
  error: z.string().optional(),
  field: z.string().optional(),
  message: z.string().optional(),
  status: z.number().optional(),
});

/** Wire/input representation accepted by ErrorSchema. */
export type ErrorWire = z.input<typeof ErrorSchema>;

/** Runtime/output representation returned by ErrorSchema. */
export type ErrorRuntime = z.output<typeof ErrorSchema>;
