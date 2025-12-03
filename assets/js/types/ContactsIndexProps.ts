import type { Contact } from "./ContactSerializer";
import type { FlopMeta } from "./FlopMetaSerializer";
import type { AuthProps } from "./AuthProps";
/**
 * Props for Contacts/Index
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ContactsIndexProps extends AuthProps {
  contacts: Contact;
  filters: Record<string, any>;
  meta: FlopMeta;
  [key: string]: unknown;
}
