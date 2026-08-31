import type { Contact } from './ContactSerializer';
import type { Organization } from './OrganizationSerializer';
import type { AuthProps } from './AuthProps';
/**
 * Props for Contacts/Edit
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ContactsEditProps extends AuthProps {
  contact: Contact;
  organizations: Organization;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { ContactSchema } from './ContactSerializer';
import { OrganizationSchema } from './OrganizationSerializer';
import { UserSchema } from './UserSerializer';

export const ContactsEditPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    contact: z.lazy(() => ContactSchema),
    flash: z.record(z.string(), z.any()),
    organizations: z.lazy(() => OrganizationSchema),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by ContactsEditPropsSchema. */
export type ContactsEditPropsWire = z.input<typeof ContactsEditPropsSchema>;

/** Runtime/output representation returned by ContactsEditPropsSchema. */
export type ContactsEditPropsRuntime = z.output<typeof ContactsEditPropsSchema>;
