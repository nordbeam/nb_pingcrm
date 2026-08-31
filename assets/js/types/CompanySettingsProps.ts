/**
 * Props for CompanySettings
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface CompanySettingsProps {
  billing: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  company: {
    name: string;
    taxId: string;
    website?: string;
  };
}

import { z } from 'zod';

export const CompanySettingsPropsSchema = z
  .object({
    billing: z.record(z.string(), z.any()),
    company: z.record(z.string(), z.any()),
  })
  .passthrough();

/** Wire/input representation accepted by CompanySettingsPropsSchema. */
export type CompanySettingsPropsWire = z.input<typeof CompanySettingsPropsSchema>;

/** Runtime/output representation returned by CompanySettingsPropsSchema. */
export type CompanySettingsPropsRuntime = z.output<typeof CompanySettingsPropsSchema>;
