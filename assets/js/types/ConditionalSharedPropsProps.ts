export interface ConditionalSharedPropsProps {
  permissions: any[];
  requestMeta: Record<string, any>;
}

import { z } from 'zod';

export const ConditionalSharedPropsPropsSchema = z.object({
  permissions: z.array(z.any()),
  requestMeta: z.record(z.string(), z.any()),
});

/** Wire/input representation accepted by ConditionalSharedPropsPropsSchema. */
export type ConditionalSharedPropsPropsWire = z.input<typeof ConditionalSharedPropsPropsSchema>;

/** Runtime/output representation returned by ConditionalSharedPropsPropsSchema. */
export type ConditionalSharedPropsPropsRuntime = z.output<typeof ConditionalSharedPropsPropsSchema>;
