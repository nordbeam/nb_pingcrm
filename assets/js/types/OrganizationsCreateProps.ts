import type { AuthProps } from './AuthProps';
/**
 * Props for Organizations/Create
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface OrganizationsCreateProps extends AuthProps {}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { UserSchema } from './UserSerializer';

export const OrganizationsCreatePropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    flash: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by OrganizationsCreatePropsSchema. */
export type OrganizationsCreatePropsWire = z.input<typeof OrganizationsCreatePropsSchema>;

/** Runtime/output representation returned by OrganizationsCreatePropsSchema. */
export type OrganizationsCreatePropsRuntime = z.output<typeof OrganizationsCreatePropsSchema>;
