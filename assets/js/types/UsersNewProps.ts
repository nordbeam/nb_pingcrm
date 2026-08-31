/**
 * Props for Users/New
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface UsersNewProps {
  user: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    age?: number;
    bio?: string;
  };
}

import { z } from 'zod';

export const UsersNewPropsSchema = z
  .object({
    user: z.record(z.string(), z.any()),
  })
  .passthrough();

/** Wire/input representation accepted by UsersNewPropsSchema. */
export type UsersNewPropsWire = z.input<typeof UsersNewPropsSchema>;

/** Runtime/output representation returned by UsersNewPropsSchema. */
export type UsersNewPropsRuntime = z.output<typeof UsersNewPropsSchema>;
