import { Head, usePage, ClientModalLink, useModalStack } from "@/lib/inertia";
import type { UsersIndexProps } from "@/types";
import type { TableResource } from "@/components/flop";
import { Table } from "@/components/flop";
import { users as usersRoutes } from "@/routes";
import { cn } from "@/lib/utils";
import { UserFormSkeleton } from "@/components/UserFormSkeleton";
import { useTableRealtime } from "@/hooks/useTableRealtime";
import { CircleDot } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  owner: boolean;
  photo: string | null;
  deletedAt: string | null;
}

export default function UsersIndex() {
  const { props } = usePage<UsersIndexProps>();
  const { visitModal } = useModalStack();
  const users = props.users as TableResource<User>;

  // Real-time updates
  const { data, isHighlighted } = useTableRealtime<User>({
    initialData: users.data,
    topic: "crm:users",
    createEvent: "user_created",
    updateEvent: "user_updated",
    deleteEvent: "user_deleted",
    recordKey: "user",
  });

  return (
    <>
      <Head title="Users" />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Users</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage team members and their permissions.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CircleDot className="h-2 w-2 animate-pulse text-green-500" />
                Live
              </span>
              <ClientModalLink
                href={usersRoutes.new()}
                loadingComponent={UserFormSkeleton}
                modalConfig={{ slideover: true, position: "right" }}
                prefetch
              >
                <button className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  New user
                </button>
              </ClientModalLink>
            </div>
          </div>

          {/* Table */}
          <Table
            resource={{ ...users, data }}
            baseUrl="/users"
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
              visitModal(usersRoutes.edit(row.id));
            }}
            renderCell={(column, value, row) => {
              // Custom rendering for name column to include photo
              if (column.key === "name") {
                return (
                  <div className="flex items-center gap-3">
                    {row.photo ? (
                      <img
                        src={row.photo}
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {row.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{row.name}</div>
                      {row.deletedAt && (
                        <span className="text-xs text-muted-foreground">
                          (deleted)
                        </span>
                      )}
                    </div>
                  </div>
                );
              }

              // Custom rendering for owner badge - value is now "Owner" or "User" string
              if (column.key === "owner") {
                const isOwner = value === "Owner";
                return (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      isOwner
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    )}
                  >
                    {String(value)}
                  </span>
                );
              }

              return undefined; // Use default rendering
            }}
          />

          <div className="mt-3 text-xs text-muted-foreground">
            {data.length} user{data.length !== 1 ? "s" : ""} total
          </div>
        </div>
      </div>
    </>
  );
}
