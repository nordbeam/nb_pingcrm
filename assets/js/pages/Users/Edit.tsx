import { Head, usePage } from "@/lib/inertia";
import { router, useForm } from "@/lib/inertia";
import type { UsersEditProps } from "@/types";
import { users } from "@/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DeletedNotice } from "@/components/DeletedNotice";
import { ViewerIndicator } from "@/components/ViewerIndicator";
import { Loader2, Trash2 } from "lucide-react";

interface UsersEditPageProps {
  onClose?: () => void;
}

export default function UsersEdit({ onClose }: UsersEditPageProps) {
  const { props } = usePage<UsersEditProps>();

  const { editedUser: user } = props;

  const form = useForm(
    {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      owner: user.owner,
    },
    users.update(user.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit({ preserveScroll: true });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      router.visit(users.delete(user.id));
    }
  };

  const handleRestore = () => {
    router.visit(users.restore(user.id));
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.visit(users.index());
    }
  };

  return (
    <>
      <Head title={`Edit ${user.name}`} />

      <div className="p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">Edit {user.name}</h2>
          <ViewerIndicator type="user" id={user.id} />
        </div>

        {user.deletedAt && (
          <DeletedNotice entityName="user" onRestore={handleRestore} />
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={form.data.first_name}
                  onChange={(e) => form.setData("first_name", e.target.value)}
                  className="mt-1.5"
                />
                {form.errors.first_name && (
                  <p className="mt-1.5 text-sm text-destructive">
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
                  className="mt-1.5"
                />
                {form.errors.last_name && (
                  <p className="mt-1.5 text-sm text-destructive">
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
                className="mt-1.5"
              />
              {form.errors.email && (
                <p className="mt-1.5 text-sm text-destructive">{form.errors.email}</p>
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

            <div className="flex items-center justify-between border-t border-border pt-5">
              {!user.deletedAt && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleDelete}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
              <div className="ml-auto flex gap-3">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={form.processing}>
                  {form.processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </form>
      </div>
    </>
  );
}
