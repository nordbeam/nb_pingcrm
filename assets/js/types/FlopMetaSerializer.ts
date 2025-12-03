import type { FlopParams } from "./FlopParamsSerializer";
import type { FilterableField } from "./FilterableFieldSerializer";
export interface FlopMeta {
  currentOffset: number | null;
  currentPage: number | null;
  endCursor: string | null;
  filterableFields?: Array<FilterableField>;
  flop: FlopParams;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextOffset: number | null;
  nextPage: number | null;
  pageSize: number | null;
  previousOffset: number | null;
  previousPage: number | null;
  sortableFields?: Array<string>;
  startCursor: string | null;
  totalCount: number | null;
  totalPages: number | null;
}
