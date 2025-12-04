import { useState, useMemo } from "react";
import { Head, usePage } from "@/lib/inertia";
import { router } from "@/lib/inertia";
import type { OrganizationsIndexProps, Organization } from "@/types";
import { organizations as orgsRoutes } from "@/routes";
import {
  useFlopParams,
  flopToQueryParams,
  Pagination,
  FilterBar,
  DataTable,
  type FilterMode,
  type FlopOperator,
} from "@/components/flop";
import { PageHeader } from "@/components/PageHeader";
import { SearchInput } from "@/components/SearchInput";
import { organizationsFilterConfig } from "./filterConfig";
import { createColumns } from "./columns";

export default function OrganizationsIndex() {
  const { props } = usePage<OrganizationsIndexProps>();
  const organizations = props.organizations as unknown as Organization[];
  const { meta, filters } = props;

  const [search, setSearch] = useState(filters?.search || "");
  const [filterMode, setFilterMode] = useState<FilterMode>(
    ((props as Record<string, unknown>).filter_mode as FilterMode) || "all"
  );

  const flop = useFlopParams(meta, {
    onParamsChange: (params) => {
      const query = {
        ...flopToQueryParams(params),
        search: search || undefined,
        trashed: filters?.trashed || undefined,
        filter_mode: filterMode !== "all" ? filterMode : undefined,
      };

      router.visit(orgsRoutes.index({ query }), {
        preserveState: true,
        preserveScroll: true,
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit(
      orgsRoutes.index({
        query: {
          search: search || undefined,
          trashed: filters?.trashed || undefined,
          filter_mode: filterMode !== "all" ? filterMode : undefined,
        },
      }),
      { preserveState: true }
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (!value && filters?.search) {
      router.visit(
        orgsRoutes.index({
          query: {
            trashed: filters?.trashed || undefined,
            filter_mode: filterMode !== "all" ? filterMode : undefined,
          },
        }),
        { preserveState: true }
      );
    }
  };

  const handleCustomFilterChange = (param: string, value: unknown) => {
    const query: Record<string, unknown> = {
      search: filters?.search,
      trashed: filters?.trashed,
      filter_mode: filterMode !== "all" ? filterMode : undefined,
    };
    query[param] = value;

    router.visit(orgsRoutes.index({ query }), { preserveState: true });
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    router.visit(
      orgsRoutes.index({
        query: {
          ...flopToQueryParams(flop.params),
          search: filters?.search,
          trashed: filters?.trashed,
          filter_mode: mode !== "all" ? mode : undefined,
        },
      }),
      { preserveState: true }
    );
  };

  const handleClearFilters = () => {
    flop.clearFilters();
    router.visit(
      orgsRoutes.index({ query: { search: filters?.search } }),
      { preserveState: true }
    );
  };

  const handleDelete = (organization: Organization) => {
    if (confirm(`Are you sure you want to delete ${organization.name}?`)) {
      router.visit(orgsRoutes.delete(organization.id));
    }
  };

  const handleRestore = (organization: Organization) => {
    router.visit(orgsRoutes.restore(organization.id));
  };

  const columns = useMemo(
    () =>
      createColumns({
        onDelete: handleDelete,
        onRestore: handleRestore,
      }),
    []
  );

  return (
    <>
      <Head title="Organizations" />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            title="Organizations"
            description="Manage your organizations and their contacts."
            action={{
              label: "New organization",
              href: orgsRoutes.new(),
            }}
          />

          {/* Search and Filters */}
          <div className="mb-4 space-y-3">
            <SearchInput
              value={search}
              onChange={handleSearchChange}
              onSubmit={handleSearch}
              placeholder="Search organizations..."
            />

            <FilterBar
              configs={organizationsFilterConfig}
              filters={flop.params.filters ?? []}
              customFilters={filters}
              filterMode={filterMode}
              onFilterChange={(field, op, value) =>
                flop.setFilter(field, op as FlopOperator, value)
              }
              onFilterRemove={(field, op) =>
                flop.removeFilter(field, op as FlopOperator | undefined)
              }
              onCustomFilterChange={handleCustomFilterChange}
              onClearFilters={handleClearFilters}
              onFilterModeChange={handleFilterModeChange}
            />
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border bg-card">
            <DataTable
              columns={columns}
              data={organizations}
              meta={meta}
              onSortChange={flop.setSort}
              getSortDirection={flop.getSortDirection}
              emptyState="No organizations found."
              rowClassName={(row) =>
                row.original.deletedAt ? "bg-muted/50 opacity-60" : ""
              }
            />

            {meta.totalPages && meta.totalPages > 1 && (
              <div className="border-t border-border px-4 py-3">
                <Pagination
                  meta={meta}
                  onPageChange={flop.setPage}
                  className="flex items-center justify-center gap-1"
                />
              </div>
            )}
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            {meta.totalCount} organization{meta.totalCount !== 1 ? "s" : ""} total
          </div>
        </div>
      </div>
    </>
  );
}
