/**
 * Contacts table column definitions for TanStack Table
 */

import type { ColumnDef } from "@tanstack/react-table";
import type { Contact } from "@/types";
import { Link } from "@/lib/inertia";
import { contacts_edit_path } from "@/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SortableColumnHeader } from "@/components/flop";

interface ColumnsOptions {
  onDelete: (contact: Contact) => void;
  onRestore: (contact: Contact) => void;
}

export function createColumns({
  onDelete,
  onRestore,
}: ColumnsOptions): ColumnDef<Contact>[] {
  return [
    {
      accessorKey: "name",
      header: () => (
        <SortableColumnHeader field="last_name">Name</SortableColumnHeader>
      ),
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{contact.name}</span>
            {contact.deletedAt && <Badge variant="destructive">Deleted</Badge>}
          </div>
        );
      },
    },
    {
      accessorKey: "organizationName",
      header: "Organization",
      cell: ({ row }) => row.original.organizationName || "-",
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
        const contact = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={contacts_edit_path(contact.id)}>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </Link>
            {contact.deletedAt ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRestore(contact)}
              >
                Restore
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => onDelete(contact)}
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
