import { Head, usePage, ClientModalLink, router } from "@/lib/inertia";
import type { OrganizationsIndexProps } from "@/types";
import type { TableResource } from "@/components/flop";
import { Table } from "@/components/flop";
import { organizations as orgsRoutes } from "@/routes";
import { OrganizationFormSkeleton } from "@/components/OrganizationFormSkeleton";
import { useTableRealtime } from "@/hooks/useTableRealtime";
import { CircleDot } from "lucide-react";

interface Organization {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  postalCode: string | null;
  contactsCount: number;
  deletedAt: string | null;
}

export default function OrganizationsIndex() {
  const { props } = usePage<OrganizationsIndexProps>();
  const organizations = props.organizations as TableResource<Organization>;

  // Real-time updates
  const { data, isHighlighted } = useTableRealtime<Organization>({
    initialData: organizations.data,
    topic: "crm:organizations",
    createEvent: "organization_created",
    updateEvent: "organization_updated",
    deleteEvent: "organization_deleted",
    recordKey: "organization",
  });

  return (
    <>
      <Head title="Organizations" />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Organizations</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your organizations and their contacts.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CircleDot className="h-2 w-2 animate-pulse text-green-500" />
                Live
              </span>
              <ClientModalLink
                href={orgsRoutes.new()}
                loadingComponent={OrganizationFormSkeleton}
                modalConfig={{ slideover: true, position: "right" }}
                prefetch
              >
                <button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  New organization
                </button>
              </ClientModalLink>
            </div>
          </div>

          {/* Table */}
          <Table
            resource={{ ...organizations, data }}
            baseUrl="/organizations"
            rowClassName={(row) => {
              const classes: string[] = [];
              if (row.deletedAt) classes.push("bg-muted/50 opacity-60");
              if (isHighlighted(row.id)) {
                classes.push(
                  "animate-pulse bg-primary/10 ring-1 ring-primary/20"
                );
              }
              return classes.join(" ");
            }}
            onRowClick={(row) => {
              router.visit(orgsRoutes.edit(row.id));
            }}
            renderCell={(column, value, row) => {
              // Custom rendering for name with delete indicator
              if (column.key === "name") {
                return (
                  <div>
                    <div className="font-medium">{row.name}</div>
                    {row.deletedAt && (
                      <span className="text-xs text-muted-foreground">(deleted)</span>
                    )}
                  </div>
                );
              }

              // Custom rendering for location
              if (column.key === "city") {
                const parts = [row.city, row.region].filter(Boolean);
                return parts.length > 0 ? parts.join(", ") : null;
              }

              return undefined; // Use default rendering
            }}
          />

          <div className="mt-3 text-xs text-muted-foreground">
            {data.length} organization{data.length !== 1 ? "s" : ""} total
          </div>
        </div>
      </div>
    </>
  );
}
