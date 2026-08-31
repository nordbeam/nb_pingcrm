export interface SharedPropsProps {
  currentUser: Record<string, any>;
  featureFlags: Record<string, any>;
  locale: string;
  navigation: any[];
  tenant: Record<string, any>;
}

import { z } from 'zod';

export const SharedPropsPropsSchema = z.object({
  currentUser: z.record(z.string(), z.any()),
  featureFlags: z.record(z.string(), z.any()),
  locale: z.string(),
  navigation: z.array(z.any()),
  tenant: z.record(z.string(), z.any()),
});

/** Wire/input representation accepted by SharedPropsPropsSchema. */
export type SharedPropsPropsWire = z.input<typeof SharedPropsPropsSchema>;

/** Runtime/output representation returned by SharedPropsPropsSchema. */
export type SharedPropsPropsRuntime = z.output<typeof SharedPropsPropsSchema>;
