export interface Account {
  id: number;
  name: string;
}

import { z } from 'zod';

export const AccountSchema = z.object({
  id: z.number(),
  name: z.string(),
});

/** Wire/input representation accepted by AccountSchema. */
export type AccountWire = z.input<typeof AccountSchema>;

/** Runtime/output representation returned by AccountSchema. */
export type AccountRuntime = z.output<typeof AccountSchema>;
