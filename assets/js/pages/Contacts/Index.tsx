import { Head, usePage, ClientModalLink, useModalStack } from "@/lib/inertia";
import type { ContactsIndexProps } from "@/types";
import type { TableResource } from "@/components/flop";
import { Table } from "@/components/flop";
import { contacts as contactsRoutes } from "@/routes";
import { ContactFormSkeleton } from "@/components/ContactFormSkeleton";
import { useTableRealtime } from "@/hooks/useTableRealtime";
import { CircleDot } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  postalCode: string | null;
  organizationId: number | null;
  organizationName: string | null;
  deletedAt: string | null;
}

export default function ContactsIndex() {
  const { props } = usePage<ContactsIndexProps>();
  const { visitModal } = useModalStack();
  const contacts = props.contacts as TableResource<Contact>;

  // Real-time updates
  const { data, isHighlighted } = useTableRealtime<Contact>({
    initialData: contacts.data,
    topic: "crm:contacts",
    createEvent: "contact_created",
    updateEvent: "contact_updated",
    deleteEvent: "contact_deleted",
    recordKey: "contact",
  });

  return (
    <>
      <Head title="Contacts" />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Contacts</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your contacts and their information.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CircleDot className="h-2 w-2 animate-pulse text-green-500" />
                Live
              </span>
              <ClientModalLink
                href={contactsRoutes.new()}
                loadingComponent={ContactFormSkeleton}
                modalConfig={{ slideover: true, position: "right" }}
                prefetch
              >
                <button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  New contact
                </button>
              </ClientModalLink>
            </div>
          </div>

          {/* Table */}
          <Table
            resource={{ ...contacts, data }}
            baseUrl="/contacts"
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
              visitModal(contactsRoutes.edit(row.id));
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

              // Custom rendering for organization
              if (column.key === "organizationName") {
                if (!row.organizationName) return null;
                return (
                  <span className="text-muted-foreground">{row.organizationName}</span>
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
            {data.length} contact{data.length !== 1 ? "s" : ""} total
          </div>
        </div>
      </div>
    </>
  );
}
