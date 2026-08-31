import type { Organization } from './OrganizationSerializer';
import type { AuthProps } from './AuthProps';
/**
 * Props for Contacts/Create
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ContactsCreateProps extends AuthProps {
  organizations: Organization;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { OrganizationSchema } from './OrganizationSerializer';
import { UserSchema } from './UserSerializer';

export const ContactsCreatePropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    flash: z.record(z.string(), z.any()),
    organizations: z.lazy(() => OrganizationSchema),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by ContactsCreatePropsSchema. */
export type ContactsCreatePropsWire = z.input<typeof ContactsCreatePropsSchema>;

/** Runtime/output representation returned by ContactsCreatePropsSchema. */
export type ContactsCreatePropsRuntime = z.output<typeof ContactsCreatePropsSchema>;
