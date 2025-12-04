import type { User } from "./UserSerializer";
import type { FlopMeta } from "./FlopMetaSerializer";
import type { AuthProps } from "./AuthProps";
/**
 * Props for Users/Index
 *
 * Generated from NbSerializer Inertia page declaration
 */
export interface UsersIndexProps extends AuthProps {
  filterMode: string | null;
  filters: Record<string, any>;
  meta: FlopMeta;
  users: User;
  [key: string]: unknown;
}
