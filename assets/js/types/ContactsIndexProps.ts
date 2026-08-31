import type { TableResource } from './TableResourceSerializer';
import type { AuthProps } from './AuthProps';
/**
 * Props for Contacts/Index
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ContactsIndexProps extends AuthProps {
  contacts: TableResource;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { TableResourceSchema } from './TableResourceSerializer';
import { UserSchema } from './UserSerializer';

export const ContactsIndexPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    contacts: z.lazy(() => TableResourceSchema),
    flash: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by ContactsIndexPropsSchema. */
export type ContactsIndexPropsWire = z.input<typeof ContactsIndexPropsSchema>;

/** Runtime/output representation returned by ContactsIndexPropsSchema. */
export type ContactsIndexPropsRuntime = z.output<typeof ContactsIndexPropsSchema>;
