export interface Example {
  authorId?: number;
  excerpt: string;
  id: number;
  publishedAt: string;
  statusLabel: string;
  title: string;
}

import { z } from 'zod';

export const ExampleSchema = z.object({
  authorId: z.number().optional(),
  excerpt: z.string(),
  id: z.number(),
  publishedAt: z.custom<unknown>(), // custom transform/format is opaque; provide a schema override
  statusLabel: z.string(),
  title: z.string(),
});

/** Wire/input representation accepted by ExampleSchema. */
export type ExampleWire = z.input<typeof ExampleSchema>;

/** Runtime/output representation returned by ExampleSchema. */
export type ExampleRuntime = z.output<typeof ExampleSchema>;
