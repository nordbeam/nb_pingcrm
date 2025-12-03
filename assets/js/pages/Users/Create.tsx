import { Head } from "@/lib/inertia";
import { router, Link, useForm } from "@/lib/inertia";
import { users_index_path, users_create_path } from "@/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function UsersCreate() {

  const form = useForm(
    {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      owner: false,
    },
    users_create_path.post()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit({
      preserveScroll: true,
      onSuccess: () => {
        router.visit(users_index_path());
      },
    });
  };

  return (
    <>
      <Head title="Create User" />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={users_index_path()}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            &larr; Back to Users
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Create User</h1>
        </div>

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

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.data.password}
                onChange={(e) => form.setData("password", e.target.value)}
                className="mt-1"
              />
              {form.errors.password && (
                <p className="mt-1 text-sm text-red-600">
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

            <div className="flex justify-end gap-3 border-t pt-6">
              <Link href={users_index_path()}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={form.processing}>
                {form.processing ? "Creating..." : "Create User"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
