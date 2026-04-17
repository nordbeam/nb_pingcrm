import type { AuthProps } from "./AuthProps";
/**
 * Props for Reports/Index
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface ReportsIndexProps extends AuthProps {
  contactsByCountry: Record<string, any>[];
  contactsByOrganization: Record<string, any>[];
  contactsOverTime: Record<string, any>[];
  organizationsByCountry: Record<string, any>[];
  recentActivity: Record<string, any>;
  totals: Record<string, any>;
  trashed: Record<string, any>;
}
