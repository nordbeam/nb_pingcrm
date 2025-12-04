import { useState, useMemo } from "react";
import { Head, usePage } from "@/lib/inertia";
import { router } from "@/lib/inertia";
import type { UsersIndexProps, User } from "@/types";
import { users as usersRoutes } from "@/routes";
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
import { usersFilterConfig } from "./filterConfig";
import { createColumns } from "./columns";

export default function UsersIndex() {
  const { props } = usePage<UsersIndexProps>();
  const users = props.users as unknown as User[];
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
        role: filters?.role || undefined,
        trashed: filters?.trashed || undefined,
        filter_mode: filterMode !== "all" ? filterMode : undefined,
      };

      router.visit(usersRoutes.index({ query }), {
        preserveState: true,
        preserveScroll: true,
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit(
      usersRoutes.index({
        query: {
          search: search || undefined,
          role: filters?.role || undefined,
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
        usersRoutes.index({
          query: {
            role: filters?.role || undefined,
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
      role: filters?.role,
      trashed: filters?.trashed,
      filter_mode: filterMode !== "all" ? filterMode : undefined,
    };
    query[param] = value;

    router.visit(usersRoutes.index({ query }), { preserveState: true });
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    router.visit(
      usersRoutes.index({
        query: {
          ...flopToQueryParams(flop.params),
          search: filters?.search,
          role: filters?.role,
          trashed: filters?.trashed,
          filter_mode: mode !== "all" ? mode : undefined,
        },
      }),
      { preserveState: true }
    );
  };

  const handleClearFilters = () => {
    flop.clearFilters();
    router.visit(usersRoutes.index({ query: { search: filters?.search } }), {
      preserveState: true,
    });
  };

  const handleDelete = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      router.visit(usersRoutes.delete(user.id));
    }
  };

  const handleRestore = (user: User) => {
    router.visit(usersRoutes.restore(user.id));
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
      <Head title="Users" />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            title="Users"
            description="Manage team members and their permissions."
            action={{
              label: "New user",
              href: usersRoutes.new(),
            }}
          />

          {/* Search and Filters */}
          <div className="mb-4 space-y-3">
            <SearchInput
              value={search}
              onChange={handleSearchChange}
              onSubmit={handleSearch}
              placeholder="Search users..."
            />

            <FilterBar
              configs={usersFilterConfig}
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
              data={users}
              meta={meta}
              onSortChange={flop.setSort}
              getSortDirection={flop.getSortDirection}
              emptyState="No users found."
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
            {meta.totalCount} user{meta.totalCount !== 1 ? "s" : ""} total
          </div>
        </div>
      </div>
    </>
  );
}
