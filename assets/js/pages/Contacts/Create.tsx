import { Head, usePage } from "@/lib/inertia";
import { router, useForm } from "@/lib/inertia";
import type { ContactsCreateProps, Organization } from "@/types";
import { contacts } from "@/routes";
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
import { Loader2 } from "lucide-react";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AU", name: "Australia" },
];

interface ContactsCreatePageProps {
  organizations?: Organization[];
  onClose?: () => void;
}

export default function ContactsCreate({ organizations: propOrganizations, onClose }: ContactsCreatePageProps) {
  const { props } = usePage<ContactsCreateProps>();

  // Use props passed directly (modal) or fall back to usePage() (regular page)
  const organizations = propOrganizations ?? (props.organizations as unknown as Organization[]) ?? [];

  const form = useForm(
    {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      country: "US",
      postal_code: "",
      organization_id: "",
    },
    contacts.create()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form.data,
      organization_id: form.data.organization_id === "_none" ? "" : form.data.organization_id,
    };
    router.post(contacts.create.url(), data, {
      preserveScroll: true,
      onSuccess: () => {
        if (onClose) {
          onClose();
        }
        router.visit(contacts.index());
      },
    });
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.visit(contacts.index());
    }
  };

  return (
    <>
      <Head title="Create Contact" />

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Create Contact</h2>

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
            <Label htmlFor="organization_id">Organization</Label>
            <Select
              value={form.data.organization_id}
              onValueChange={(value) =>
                form.setData("organization_id", value)
              }
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select an organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_none">None</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={String(org.id)}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.errors.organization_id && (
              <p className="mt-1.5 text-sm text-destructive">
                {form.errors.organization_id}
              </p>
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
                "Create Contact"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
