/**
 * Props for ProfileComplete
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ProfileCompleteProps {}

/**
 * Form inputs for ProfileComplete
 */
export interface ProfileCompleteFormInputs {
  profile: {
    fullName: string;
    username: string;
    age: number;
    heightCm?: number;
    subscribed: boolean;
    birthday?: string;
    lastLogin?: string;
    preferences?: Record<string, any>;
    customData?: any;
  };
}

import { z } from 'zod';

export const ProfileCompletePropsSchema = z.object({}).passthrough();

/** Wire/input representation accepted by ProfileCompletePropsSchema. */
export type ProfileCompletePropsWire = z.input<typeof ProfileCompletePropsSchema>;

/** Runtime/output representation returned by ProfileCompletePropsSchema. */
export type ProfileCompletePropsRuntime = z.output<typeof ProfileCompletePropsSchema>;
