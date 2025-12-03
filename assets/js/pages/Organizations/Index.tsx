import { useState, useMemo } from "react";
import { Head, usePage } from "@/lib/inertia";
import { router, Link } from "@/lib/inertia";
import type { OrganizationsIndexProps, Organization } from "@/types";
import {
  organizations_index_path,
  organizations_new_path,
  organizations_delete_path,
  organizations_restore_path,
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

      router.visit(organizations_index_path({ query }), {
        preserveState: true,
        preserveScroll: true,
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit(
      organizations_index_path({
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
        organizations_index_path({
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

    router.visit(organizations_index_path({ query }), { preserveState: true });
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    router.visit(
      organizations_index_path({
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
      organizations_index_path({ query: { search: filters?.search } }),
      { preserveState: true }
    );
  };

  const handleDelete = (organization: Organization) => {
    if (confirm(`Are you sure you want to delete ${organization.name}?`)) {
      router.visit(organizations_delete_path.delete(organization.id));
    }
  };

  const handleRestore = (organization: Organization) => {
    router.visit(organizations_restore_path.put(organization.id));
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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <Link href={organizations_new_path()}>
            <Button>Create Organization</Button>
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
              onChange={handleSearchChange}
              className="max-w-xs"
            />
          </form>

          {/* Filter Bar */}
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
        <div className="rounded-lg bg-white shadow">
          <DataTable
            columns={columns}
            data={organizations}
            meta={meta}
            onSortChange={flop.setSort}
            getSortDirection={flop.getSortDirection}
            emptyState="No organizations found."
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
          {meta.totalCount} organization{meta.totalCount !== 1 ? "s" : ""} total
        </div>
      </div>
    </>
  );
}
