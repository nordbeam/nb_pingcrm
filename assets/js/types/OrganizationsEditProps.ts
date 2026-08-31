import type { Organization } from './OrganizationSerializer';
import type { AuthProps } from './AuthProps';
/**
 * Props for Organizations/Edit
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface OrganizationsEditProps extends AuthProps {
  organization: Organization;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { OrganizationSchema } from './OrganizationSerializer';
import { UserSchema } from './UserSerializer';

export const OrganizationsEditPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    flash: z.record(z.string(), z.any()),
    organization: z.lazy(() => OrganizationSchema),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by OrganizationsEditPropsSchema. */
export type OrganizationsEditPropsWire = z.input<typeof OrganizationsEditPropsSchema>;

/** Runtime/output representation returned by OrganizationsEditPropsSchema. */
export type OrganizationsEditPropsRuntime = z.output<typeof OrganizationsEditPropsSchema>;
