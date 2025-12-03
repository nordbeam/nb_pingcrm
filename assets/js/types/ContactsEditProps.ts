import type { Contact } from "./ContactSerializer";
import type { Organization } from "./OrganizationSerializer";
import type { AuthProps } from "./AuthProps";
/**
 * Props for Contacts/Edit
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ContactsEditProps extends AuthProps {
  contact: Contact;
  organizations: Organization;
  [key: string]: unknown;
}
