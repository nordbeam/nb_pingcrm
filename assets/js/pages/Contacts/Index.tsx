import { useState, useMemo } from "react";
import { Head, usePage } from "@/lib/inertia";
import { router, Link } from "@/lib/inertia";
import type { ContactsIndexProps, Contact } from "@/types";
import {
  contacts_index_path,
  contacts_new_path,
  contacts_delete_path,
  contacts_restore_path,
} from "@/routes";
import {
  useFlopParams,
  flopToQueryParams,
  Pagination,
  FilterBar,
  DataTable,
  type FilterMode,
  type FlopOperator,
  type FilterOption,
} from "@/components/flop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactsFilterConfig } from "./filterConfig";
import { createColumns } from "./columns";

export default function ContactsIndex() {
  const { props } = usePage<ContactsIndexProps>();
  const contacts = props.contacts as unknown as Contact[];
  const { meta, filters } = props;

  // Get filter options from props (organizations for relation filter)
  const filterOptions: Record<string, FilterOption[]> =
    ((props as Record<string, unknown>).filter_options as Record<
      string,
      FilterOption[]
    >) || {};

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

      router.visit(contacts_index_path({ query }), {
        preserveState: true,
        preserveScroll: true,
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit(
      contacts_index_path({
        query: {
          search: search || undefined,
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
      trashed: filters?.trashed,
      filter_mode: filterMode !== "all" ? filterMode : undefined,
    };
    query[param] = value;

    router.visit(contacts_index_path({ query }), { preserveState: true });
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    router.visit(
      contacts_index_path({
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
    router.visit(contacts_index_path({ query: { search: filters?.search } }), {
      preserveState: true,
    });
  };

  const handleDelete = (contact: Contact) => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      router.visit(contacts_delete_path.delete(contact.id));
    }
  };

  const handleRestore = (contact: Contact) => {
    router.visit(contacts_restore_path.put(contact.id));
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
      <Head title="Contacts" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <Link href={contacts_new_path()}>
            <Button>Create Contact</Button>
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
            configs={contactsFilterConfig}
            filters={flop.params.filters ?? []}
            customFilters={filters}
            filterOptions={filterOptions}
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
            data={contacts}
            meta={meta}
            onSortChange={flop.setSort}
            getSortDirection={flop.getSortDirection}
            emptyState="No contacts found."
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
          {meta.totalCount} contact{meta.totalCount !== 1 ? "s" : ""} total
        </div>
      </div>
    </>
  );
}
