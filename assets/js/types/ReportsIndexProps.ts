import type { AuthProps } from './AuthProps';
/**
 * Props for Reports/Index
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ReportsIndexProps extends AuthProps {
  contactsByCountry: Array<Record<string, any>>;
  contactsByOrganization: Array<Record<string, any>>;
  contactsOverTime: Array<Record<string, any>>;
  organizationsByCountry: Array<Record<string, any>>;
  recentActivity: Record<string, any>;
  totals: Record<string, any>;
  trashed: Record<string, any>;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { UserSchema } from './UserSerializer';

export const ReportsIndexPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    contactsByCountry: z.array(z.record(z.string(), z.any())),
    contactsByOrganization: z.array(z.record(z.string(), z.any())),
    contactsOverTime: z.array(z.record(z.string(), z.any())),
    flash: z.record(z.string(), z.any()),
    organizationsByCountry: z.array(z.record(z.string(), z.any())),
    recentActivity: z.record(z.string(), z.any()),
    totals: z.record(z.string(), z.any()),
    trashed: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by ReportsIndexPropsSchema. */
export type ReportsIndexPropsWire = z.input<typeof ReportsIndexPropsSchema>;

/** Runtime/output representation returned by ReportsIndexPropsSchema. */
export type ReportsIndexPropsRuntime = z.output<typeof ReportsIndexPropsSchema>;
