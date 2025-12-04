import { Head } from "@/lib/inertia";
import { router, useForm } from "@/lib/inertia";
import { users } from "@/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

interface UsersCreateProps {
  onClose?: () => void;
}

export default function UsersCreate({ onClose }: UsersCreateProps) {
  const form = useForm(
    {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      owner: false,
    },
    users.create()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit({
      preserveScroll: true,
      onSuccess: () => {
        if (onClose) {
          onClose();
        }
        router.visit(users.index());
      },
    });
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
      <Head title="Create User" />

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Create User</h2>

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

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.data.password}
              onChange={(e) => form.setData("password", e.target.value)}
              className="mt-1.5"
            />
            {form.errors.password && (
              <p className="mt-1.5 text-sm text-destructive">
                {form.errors.password}
              </p>
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

          <div className="flex justify-end gap-3 border-t border-border pt-5">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.processing}>
              {form.processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
