export interface Contact {
  address: string | null;
  city: string | null;
  country: string | null;
  deletedAt: string | null;
  email: string | null;
  firstName: string;
  id: number;
  lastName: string;
  name: string;
  organizationId: number | null;
  organizationName: string | null;
  phone: string | null;
  postalCode: string | null;
  region: string | null;
}

import { z } from 'zod';

export const ContactSchema = z.object({
  address: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
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
  email: z.string().nullable(),
  firstName: z.string(),
  id: z.number(),
  lastName: z.string(),
  name: z.string(),
  organizationId: z.number().nullable(),
  organizationName: z.string().nullable(),
  phone: z.string().nullable(),
  postalCode: z.string().nullable(),
  region: z.string().nullable(),
});

/** Wire/input representation accepted by ContactSchema. */
export type ContactWire = z.input<typeof ContactSchema>;

/** Runtime/output representation returned by ContactSchema. */
export type ContactRuntime = z.output<typeof ContactSchema>;
