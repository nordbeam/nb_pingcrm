/**
 * Organizations table column definitions for TanStack Table
 */

import type { ColumnDef } from "@tanstack/react-table";
import type { Organization } from "@/types";
import { Link } from "@/lib/inertia";
import { organizations_edit_path } from "@/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SortableColumnHeader } from "@/components/flop";

interface ColumnsOptions {
  onDelete: (organization: Organization) => void;
  onRestore: (organization: Organization) => void;
}

export function createColumns({
  onDelete,
  onRestore,
}: ColumnsOptions): ColumnDef<Organization>[] {
  return [
    {
      accessorKey: "name",
      header: () => (
        <SortableColumnHeader field="name">Name</SortableColumnHeader>
      ),
      cell: ({ row }) => {
        const organization = row.original;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{organization.name}</span>
            {organization.deletedAt && (
              <Badge variant="destructive">Deleted</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "city",
      header: () => (
        <SortableColumnHeader field="city">City</SortableColumnHeader>
      ),
      cell: ({ row }) => row.original.city || "-",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.phone || "-",
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const organization = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={organizations_edit_path(organization.id)}>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </Link>
            {organization.deletedAt ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRestore(organization)}
              >
                Restore
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => onDelete(organization)}
              >
                Delete
              </Button>
            )}
          </div>
        );
      },
    },
  ];
}
