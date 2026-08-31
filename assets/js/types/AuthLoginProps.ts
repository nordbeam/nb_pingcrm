import type { AuthProps } from './AuthProps';
/**
 * Props for Auth/Login
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface AuthLoginProps extends AuthProps {
  email: string | null;
  mode: 'password' | 'magic';
  sudoMode: boolean;
}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { UserSchema } from './UserSerializer';

export const AuthLoginPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    email: z.string().nullable(),
    flash: z.record(z.string(), z.any()),
    mode: z.enum(['password', 'magic']),
    sudoMode: z.boolean(),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by AuthLoginPropsSchema. */
export type AuthLoginPropsWire = z.input<typeof AuthLoginPropsSchema>;

/** Runtime/output representation returned by AuthLoginPropsSchema. */
export type AuthLoginPropsRuntime = z.output<typeof AuthLoginPropsSchema>;
