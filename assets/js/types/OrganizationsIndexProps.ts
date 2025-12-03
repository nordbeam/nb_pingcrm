import type { Organization } from "./OrganizationSerializer";
import type { FlopMeta } from "./FlopMetaSerializer";
import type { AuthProps } from "./AuthProps";
/**
 * Props for Organizations/Index
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface OrganizationsIndexProps extends AuthProps {
  filters: Record<string, any>;
  meta: FlopMeta;
  organizations: Organization;
  [key: string]: unknown;
}
