import { Head, usePage } from "@/lib/inertia";
import { router, useForm } from "@/lib/inertia";
import type { OrganizationsEditProps } from "@/types";
import { organizations } from "@/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeletedNotice } from "@/components/DeletedNotice";
import { ViewerIndicator } from "@/components/ViewerIndicator";
import { Loader2, Trash2 } from "lucide-react";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AU", name: "Australia" },
];

interface OrganizationsEditPageProps {
  onClose?: () => void;
}

export default function OrganizationsEdit({ onClose }: OrganizationsEditPageProps) {
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
    organizations.update(organization.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit({ preserveScroll: true });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${organization.name}?`)) {
      router.visit(organizations.delete(organization.id));
    }
  };

  const handleRestore = () => {
    router.visit(organizations.restore(organization.id));
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.visit(organizations.index());
    }
  };

  return (
    <>
      <Head title={`Edit ${organization.name}`} />

      <div className="p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">Edit {organization.name}</h2>
          <ViewerIndicator type="organization" id={organization.id} />
        </div>

        {organization.deletedAt && (
          <DeletedNotice entityName="organization" onRestore={handleRestore} />
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.data.name}
                onChange={(e) => form.setData("name", e.target.value)}
                className="mt-1.5"
              />
              {form.errors.name && (
                <p className="mt-1.5 text-sm text-destructive">{form.errors.name}</p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
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
                  <p className="mt-1.5 text-sm text-destructive">
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
                  className="mt-1.5"
                />
                {form.errors.phone && (
                  <p className="mt-1.5 text-sm text-destructive">
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
                className="mt-1.5"
              />
              {form.errors.address && (
                <p className="mt-1.5 text-sm text-destructive">
                  {form.errors.address}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.data.city}
                  onChange={(e) => form.setData("city", e.target.value)}
                  className="mt-1.5"
                />
                {form.errors.city && (
                  <p className="mt-1.5 text-sm text-destructive">{form.errors.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="region">State/Province</Label>
                <Input
                  id="region"
                  value={form.data.region}
                  onChange={(e) => form.setData("region", e.target.value)}
                  className="mt-1.5"
                />
                {form.errors.region && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {form.errors.region}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={form.data.country}
                  onValueChange={(value) => form.setData("country", value)}
                >
                  <SelectTrigger className="mt-1.5">
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
                  <p className="mt-1.5 text-sm text-destructive">
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
                  className="mt-1.5"
                />
                {form.errors.postal_code && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {form.errors.postal_code}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-5">
              {!organization.deletedAt && (
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
