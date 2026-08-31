import type { Activity } from './ActivitySerializer';
import type { AuthProps } from './AuthProps';
/**
 * Props for Dashboard
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface DashboardProps extends AuthProps {
  activities: Activity[];
  stats: Record<string, any>;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { ActivitySchema } from './ActivitySerializer';
import { UserSchema } from './UserSerializer';

export const DashboardPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    activities: z.array(z.lazy(() => ActivitySchema)),
    flash: z.record(z.string(), z.any()),
    stats: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by DashboardPropsSchema. */
export type DashboardPropsWire = z.input<typeof DashboardPropsSchema>;

/** Runtime/output representation returned by DashboardPropsSchema. */
export type DashboardPropsRuntime = z.output<typeof DashboardPropsSchema>;
