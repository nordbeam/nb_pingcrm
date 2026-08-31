import type { TableResource } from './TableResourceSerializer';
import type { AuthProps } from './AuthProps';
/**
 * Props for Users/Index
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface UsersIndexProps extends AuthProps {
  users: TableResource;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { TableResourceSchema } from './TableResourceSerializer';
import { UserSchema } from './UserSerializer';

export const UsersIndexPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    flash: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
    users: z.lazy(() => TableResourceSchema),
  })
  .passthrough();

/** Wire/input representation accepted by UsersIndexPropsSchema. */
export type UsersIndexPropsWire = z.input<typeof UsersIndexPropsSchema>;

/** Runtime/output representation returned by UsersIndexPropsSchema. */
export type UsersIndexPropsRuntime = z.output<typeof UsersIndexPropsSchema>;
