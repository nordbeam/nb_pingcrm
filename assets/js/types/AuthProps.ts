import type { User } from './UserSerializer';
import type { Account } from './AccountSerializer';
export interface AuthProps {
  account: Account | null;
  flash: Record<string, any>;
  user: User | null;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { UserSchema } from './UserSerializer';

export const AuthPropsSchema = z.object({
  account: AccountSchema.nullable(),
  flash: z.record(z.string(), z.any()),
  user: UserSchema.nullable(),
});

/** Wire/input representation accepted by AuthPropsSchema. */
export type AuthPropsWire = z.input<typeof AuthPropsSchema>;

/** Runtime/output representation returned by AuthPropsSchema. */
export type AuthPropsRuntime = z.output<typeof AuthPropsSchema>;
