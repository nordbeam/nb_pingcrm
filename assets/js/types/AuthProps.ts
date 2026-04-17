import type { User } from "./UserSerializer";
import type { Account } from "./AccountSerializer";
export interface AuthProps {
  account: Account | null;
  flash: Record<string, any>;
  user: User | null;
}
