import type { User } from './UserSerializer';
import type { AuthProps } from './AuthProps';
/**
 * Props for Users/Edit
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface UsersEditProps extends AuthProps {
  editedUser: User;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { UserSchema } from './UserSerializer';

export const UsersEditPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    editedUser: z.lazy(() => UserSchema),
    flash: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by UsersEditPropsSchema. */
export type UsersEditPropsWire = z.input<typeof UsersEditPropsSchema>;

/** Runtime/output representation returned by UsersEditPropsSchema. */
export type UsersEditPropsRuntime = z.output<typeof UsersEditPropsSchema>;
