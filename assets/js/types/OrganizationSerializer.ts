export interface Organization {
  address: string | null;
  city: string | null;
  country: string | null;
  deletedAt: string | null;
  email: string | null;
  id: number;
  name: string;
  phone: string | null;
  postalCode: string | null;
  region: string | null;
}

import { z } from 'zod';

export const OrganizationSchema = z.object({
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
  id: z.number(),
  name: z.string(),
  phone: z.string().nullable(),
  postalCode: z.string().nullable(),
  region: z.string().nullable(),
});

/** Wire/input representation accepted by OrganizationSchema. */
export type OrganizationWire = z.input<typeof OrganizationSchema>;

/** Runtime/output representation returned by OrganizationSchema. */
export type OrganizationRuntime = z.output<typeof OrganizationSchema>;
