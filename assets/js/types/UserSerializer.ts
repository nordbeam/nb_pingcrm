export interface User {
  deletedAt: string | null;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  name: string;
  owner: boolean;
  photo: string | null;
}

import { z } from 'zod';

export const UserSchema = z.object({
  deletedAt: z
    .codec(z.iso.datetime({ offset: true }), z.date(), {
      decode: (value) => {
        const date = new Date(value);
        if (isNaN(date.getTime())) throw new Error('Invalid ISO datetime');
        return date;
      },
      encode: (value) => value.toISOString(),
    })
    .nullable(),
  email: z.string(),
  firstName: z.string(),
  id: z.number(),
  lastName: z.string(),
  name: z.string(),
  owner: z.boolean(),
  photo: z.string().nullable(),
});

/** Wire/input representation accepted by UserSchema. */
export type UserWire = z.input<typeof UserSchema>;

/** Runtime/output representation returned by UserSchema. */
export type UserRuntime = z.output<typeof UserSchema>;
