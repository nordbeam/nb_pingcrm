import { useState, useMemo } from "react";
import { Head, usePage } from "@/lib/inertia";
import { router, Link } from "@/lib/inertia";
import type { UsersIndexProps, User } from "@/types";
import {
  users_index_path,
  users_new_path,
  users_delete_path,
  users_restore_path,
} from "@/routes";
import {
  useFlopParams,
  flopToQueryParams,
  Pagination,
  FilterBar,
  DataTable,
  type FilterMode,
  type FlopOperator,
} from "@/components/flop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

      router.visit(users_index_path({ query }), {
        preserveState: true,
        preserveScroll: true,
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit(
      users_index_path({
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

  const handleCustomFilterChange = (param: string, value: unknown) => {
    const query: Record<string, unknown> = {
      search: filters?.search,
      role: filters?.role,
      trashed: filters?.trashed,
      filter_mode: filterMode !== "all" ? filterMode : undefined,
    };
    query[param] = value;

    router.visit(users_index_path({ query }), { preserveState: true });
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    router.visit(
      users_index_path({
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
    router.visit(users_index_path({ query: { search: filters?.search } }), {
      preserveState: true,
    });
  };

  const handleDelete = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      router.visit(users_delete_path.delete(user.id));
    }
  };

  const handleRestore = (user: User) => {
    router.visit(users_restore_path.put(user.id));
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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <Link href={users_new_path()}>
            <Button>Create User</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-3 rounded-lg bg-white p-4 shadow">
          {/* Search */}
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </form>

          {/* Filter Bar */}
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
        <div className="rounded-lg bg-white shadow">
          <DataTable
            columns={columns}
            data={users}
            meta={meta}
            onSortChange={flop.setSort}
            getSortDirection={flop.getSortDirection}
            emptyState="No users found."
            rowClassName={(row) =>
              row.original.deletedAt ? "bg-gray-50 opacity-60" : ""
            }
          />

          {/* Pagination */}
          {meta.totalPages && meta.totalPages > 1 && (
            <div className="border-t p-4">
              <Pagination
                meta={meta}
                onPageChange={flop.setPage}
                className="flex items-center justify-center gap-2"
              />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 text-sm text-gray-500">
          {meta.totalCount} user{meta.totalCount !== 1 ? "s" : ""} total
        </div>
      </div>
    </>
  );
}
