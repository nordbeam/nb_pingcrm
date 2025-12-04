import { useState, useMemo } from "react";
import { Head, usePage } from "@/lib/inertia";
import { router } from "@/lib/inertia";
import type { ContactsIndexProps, Contact } from "@/types";
import { contacts as contactsRoutes } from "@/routes";
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
import { PageHeader } from "@/components/PageHeader";
import { SearchInput } from "@/components/SearchInput";
import { ContactFormSkeleton } from "@/components/ContactFormSkeleton";
import { contactsFilterConfig } from "./filterConfig";
import { createColumns } from "./columns";

export default function ContactsIndex() {
  const { props } = usePage<ContactsIndexProps>();
  const contacts = props.contacts as unknown as Contact[];
  const { meta, filters } = props;

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

      router.visit(contactsRoutes.index({ query }), {
        preserveState: true,
        preserveScroll: true,
      });
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit(
      contactsRoutes.index({
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
        contactsRoutes.index({
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

    router.visit(contactsRoutes.index({ query }), { preserveState: true });
  };

  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    router.visit(
      contactsRoutes.index({
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
    router.visit(contactsRoutes.index({ query: { search: filters?.search } }), {
      preserveState: true,
    });
  };

  const handleDelete = (contact: Contact) => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      router.visit(contactsRoutes.delete(contact.id));
    }
  };

  const handleRestore = (contact: Contact) => {
    router.visit(contactsRoutes.restore(contact.id));
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

      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            title="Contacts"
            description="Manage your contacts and their information."
            action={{
              label: "New contact",
              href: contactsRoutes.new(),
              loadingComponent: ContactFormSkeleton,
              modalConfig: { slideover: true, position: "right" },
              prefetch: true,
            }}
          />

          {/* Search and Filters */}
          <div className="mb-4 space-y-3">
            <SearchInput
              value={search}
              onChange={handleSearchChange}
              onSubmit={handleSearch}
              placeholder="Search contacts..."
            />

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
          <div className="rounded-lg border border-border bg-card">
            <DataTable
              columns={columns}
              data={contacts}
              meta={meta}
              onSortChange={flop.setSort}
              getSortDirection={flop.getSortDirection}
              emptyState="No contacts found."
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
            {meta.totalCount} contact{meta.totalCount !== 1 ? "s" : ""} total
          </div>
        </div>
      </div>
    </>
  );
}
