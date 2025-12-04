/**
 * Users table column definitions for TanStack Table
 */

import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/types";
import { ClientModalLink } from "@/lib/inertia";
import { users } from "@/routes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SortableColumnHeader } from "@/components/flop";

interface ColumnsOptions {
  onDelete: (user: User) => void;
  onRestore: (user: User) => void;
}

export function createColumns({
  onDelete,
  onRestore,
}: ColumnsOptions): ColumnDef<User>[] {
  return [
    {
      accessorKey: "name",
      header: () => (
        <SortableColumnHeader field="last_name">Name</SortableColumnHeader>
      ),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            {user.photo ? (
              <img
                src={user.photo}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </div>
            )}
            <span className="font-medium">{user.name}</span>
            {user.deletedAt && <Badge variant="destructive">Deleted</Badge>}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <SortableColumnHeader field="email">Email</SortableColumnHeader>
      ),
    },
    {
      accessorKey: "owner",
      header: "Role",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Badge variant={user.owner ? "default" : "secondary"}>
            {user.owner ? "Owner" : "User"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex justify-end gap-2">
            <ClientModalLink href={users.edit(user.id)}>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </ClientModalLink>
            {user.deletedAt ? (
              <Button variant="ghost" size="sm" onClick={() => onRestore(user)}>
                Restore
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => onDelete(user)}
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
