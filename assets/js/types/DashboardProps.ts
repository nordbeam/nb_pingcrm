import type { Activity } from "./ActivitySerializer";
import type { AuthProps } from "./AuthProps";
/**
 * Props for Dashboard
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface DashboardProps extends AuthProps {
  activities: Activity[];
  stats: Record<string, any>;
}
