import React from "react";
import { Head, usePage } from "@/lib/inertia";
import { router, Link, useForm } from "@/lib/inertia";
import type { OrganizationsEditProps } from "@/types";
import {
  organizations_index_path,
  organizations_organizations_update_path,
  organizations_delete_path,
  organizations_restore_path,
} from "@/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AU", name: "Australia" },
];

export default function OrganizationsEdit() {
  const { props } = usePage<OrganizationsEditProps>();
  const { organization } = props;

  const form = useForm(
    {
      name: organization.name,
      email: organization.email || "",
      phone: organization.phone || "",
      address: organization.address || "",
      city: organization.city || "",
      region: organization.region || "",
      country: organization.country || "US",
      postal_code: organization.postalCode || "",
    },
    organizations_organizations_update_path.put(organization.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit({
      preserveScroll: true,
    });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${organization.name}?`)) {
      router.visit(organizations_delete_path.delete(organization.id));
    }
  };

  const handleRestore = () => {
    router.visit(organizations_restore_path.put(organization.id));
  };

  return (
    <>
      <Head title={`Edit ${organization.name}`} />

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={organizations_index_path()}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            &larr; Back to Organizations
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Edit {organization.name}
            </h1>
            {organization.deletedAt && (
              <Badge variant="destructive">Deleted</Badge>
            )}
          </div>
        </div>

        {/* Deleted notice */}
        {organization.deletedAt && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">
              This organization has been deleted.{" "}
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
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.data.name}
                onChange={(e) => form.setData("name", e.target.value)}
                className="mt-1"
              />
              {form.errors.name && (
                <p className="mt-1 text-sm text-red-600">{form.errors.name}</p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
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
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.data.phone}
                  onChange={(e) => form.setData("phone", e.target.value)}
                  className="mt-1"
                />
                {form.errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={form.data.address}
                onChange={(e) => form.setData("address", e.target.value)}
                className="mt-1"
              />
              {form.errors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {form.errors.address}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.data.city}
                  onChange={(e) => form.setData("city", e.target.value)}
                  className="mt-1"
                />
                {form.errors.city && (
                  <p className="mt-1 text-sm text-red-600">{form.errors.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="region">State/Province</Label>
                <Input
                  id="region"
                  value={form.data.region}
                  onChange={(e) => form.setData("region", e.target.value)}
                  className="mt-1"
                />
                {form.errors.region && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.region}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={form.data.country}
                  onValueChange={(value) => form.setData("country", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.errors.country && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.country}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  value={form.data.postal_code}
                  onChange={(e) => form.setData("postal_code", e.target.value)}
                  className="mt-1"
                />
                {form.errors.postal_code && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.errors.postal_code}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              {!organization.deletedAt && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete Organization
                </Button>
              )}
              <div className="ml-auto flex gap-3">
                <Link href={organizations_index_path()}>
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
