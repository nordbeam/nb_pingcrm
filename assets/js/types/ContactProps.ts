/**
 * Props for Contact
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ContactProps {}

/**
 * Form inputs for Contact
 */
export interface ContactFormInputs {
  message: {
    name: string;
    email: string;
    subject: string;
    body: string;
  };
}

import { z } from 'zod';

export const ContactPropsSchema = z.object({}).passthrough();

/** Wire/input representation accepted by ContactPropsSchema. */
export type ContactPropsWire = z.input<typeof ContactPropsSchema>;

/** Runtime/output representation returned by ContactPropsSchema. */
export type ContactPropsRuntime = z.output<typeof ContactPropsSchema>;
