import type { TableResource } from './TableResourceSerializer';
import type { AuthProps } from './AuthProps';
/**
 * Props for Organizations/Index
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface OrganizationsIndexProps extends AuthProps {
  organizations: TableResource;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { TableResourceSchema } from './TableResourceSerializer';
import { UserSchema } from './UserSerializer';

export const OrganizationsIndexPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    flash: z.record(z.string(), z.any()),
    organizations: z.lazy(() => TableResourceSchema),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by OrganizationsIndexPropsSchema. */
export type OrganizationsIndexPropsWire = z.input<typeof OrganizationsIndexPropsSchema>;

/** Runtime/output representation returned by OrganizationsIndexPropsSchema. */
export type OrganizationsIndexPropsRuntime = z.output<typeof OrganizationsIndexPropsSchema>;
