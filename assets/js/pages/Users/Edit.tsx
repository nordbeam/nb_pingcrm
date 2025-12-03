import React from "react";
import { Head, usePage } from "@/lib/inertia";
import { router, Link, useForm } from "@/lib/inertia";
import type { UsersEditProps } from "@/types";
import {
  users_index_path,
  users_users_update_path,
  users_delete_path,
  users_restore_path,
} from "@/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function UsersEdit() {
  const { props } = usePage<UsersEditProps>();
  const { user } = props;

  const form = useForm(
    {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      owner: user.owner,
    },
    users_users_update_path.put(user.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit({
      preserveScroll: true,
    });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      router.visit(users_delete_path.delete(user.id));
    }
  };

  const handleRestore = () => {
    router.visit(users_restore_path.put(user.id));
  };

  return (
    <>
      <Head title={`Edit ${user.name}`} />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={users_index_path()}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            &larr; Back to Users
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Edit {user.name}
            </h1>
            {user.deletedAt && <Badge variant="destructive">Deleted</Badge>}
          </div>
        </div>

        {/* Deleted user notice */}
        {user.deletedAt && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">
              This user has been deleted.{" "}
              <button
                type="button"
                onClick={handleRestore}
                className="font-medium underline hover:no-underline"
              >
                Click here to restore
              </button>
            </p>
          </div>
        )}

        {/* Form */}
        <div className="rounded-lg bg-white p-6 shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={form.data.first_name}
                  onChange={(e) => form.setData("first_name", e.target.value)}
                  className="mt-1"
                />
                {form.errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.first_name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={form.data.last_name}
                  onChange={(e) => form.setData("last_name", e.target.value)}
                  className="mt-1"
                />
                {form.errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.data.email}
                onChange={(e) => form.setData("email", e.target.value)}
                className="mt-1"
              />
              {form.errors.email && (
                <p className="mt-1 text-sm text-red-600">{form.errors.email}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="owner"
                checked={form.data.owner}
                onCheckedChange={(checked) =>
                  form.setData("owner", checked === true)
                }
              />
              <Label htmlFor="owner" className="cursor-pointer">
                Owner (Administrator)
              </Label>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              {!user.deletedAt && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete User
                </Button>
              )}
              <div className="ml-auto flex gap-3">
                <Link href={users_index_path()}>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={form.processing}>
                  {form.processing ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
