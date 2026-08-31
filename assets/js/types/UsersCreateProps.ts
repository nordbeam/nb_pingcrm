import type { AuthProps } from './AuthProps';
/**
 * Props for Users/Create
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface UsersCreateProps extends AuthProps {}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { UserSchema } from './UserSerializer';

export const UsersCreatePropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    flash: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by UsersCreatePropsSchema. */
export type UsersCreatePropsWire = z.input<typeof UsersCreatePropsSchema>;

/** Runtime/output representation returned by UsersCreatePropsSchema. */
export type UsersCreatePropsRuntime = z.output<typeof UsersCreatePropsSchema>;
