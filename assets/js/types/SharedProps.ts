import type { AuthProps } from './AuthProps';
import type { ConditionalSharedPropsProps } from './ConditionalSharedPropsProps';
import type { SharedPropsProps } from './SharedPropsProps';

/**
 * Props for Shared
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface SharedProps
  extends Record<string, unknown>, AuthProps, ConditionalSharedPropsProps, SharedPropsProps {}

import { z } from 'zod';
import { AccountSchema } from './AccountSerializer';
import { UserSchema } from './UserSerializer';

export const SharedPropsSchema = z
  .object({
    account: z.lazy(() => AccountSchema).nullable(),
    currentUser: z.record(z.string(), z.any()),
    featureFlags: z.record(z.string(), z.any()),
    flash: z.record(z.string(), z.any()),
    locale: z.string(),
    navigation: z.array(z.any()),
    permissions: z.array(z.any()),
    requestMeta: z.record(z.string(), z.any()),
    tenant: z.record(z.string(), z.any()),
    user: z.lazy(() => UserSchema).nullable(),
  })
  .passthrough();

/** Wire/input representation accepted by SharedPropsSchema. */
export type SharedPropsWire = z.input<typeof SharedPropsSchema>;

/** Runtime/output representation returned by SharedPropsSchema. */
export type SharedPropsRuntime = z.output<typeof SharedPropsSchema>;
