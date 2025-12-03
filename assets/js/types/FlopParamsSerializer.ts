import type { FlopFilter } from "./FlopFilterSerializer";
export interface FlopParams {
  after?: string | null;
  before?: string | null;
  filters: Array<FlopFilter>;
  first?: number | null;
  last?: number | null;
  limit?: number | null;
  offset?: number | null;
  orderBy?: Array<string>;
  orderDirections?: Array<string>;
  page?: number | null;
  pageSize?: number | null;
}
