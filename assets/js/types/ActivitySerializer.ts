export interface Activity {
  action: string;
  id: number;
  insertedAt: string;
  resourceId: number;
  resourceName: string | null;
  resourceType: string;
  userName: string | null;
}

import { z } from 'zod';

export const ActivitySchema = z.object({
  action: z.string(),
  id: z.number(),
  insertedAt: z.codec(z.iso.datetime({ offset: true }), z.date(), {
    decode: (value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) throw new Error('Invalid ISO datetime');
      return date;
    },
    encode: (value) => value.toISOString(),
  }),
  resourceId: z.number(),
  resourceName: z.string().nullable(),
  resourceType: z.string(),
  userName: z.string().nullable(),
});

/** Wire/input representation accepted by ActivitySchema. */
export type ActivityWire = z.input<typeof ActivitySchema>;

/** Runtime/output representation returned by ActivitySchema. */
export type ActivityRuntime = z.output<typeof ActivitySchema>;
