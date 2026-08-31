import type { AuthProps } from './AuthProps';
/**
 * Props for Auth/Register
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface AuthRegisterProps extends AuthProps {}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { UserSchema } from './UserSerializer';

export const AuthRegisterPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    flash: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by AuthRegisterPropsSchema. */
export type AuthRegisterPropsWire = z.input<typeof AuthRegisterPropsSchema>;

/** Runtime/output representation returned by AuthRegisterPropsSchema. */
export type AuthRegisterPropsRuntime = z.output<typeof AuthRegisterPropsSchema>;
