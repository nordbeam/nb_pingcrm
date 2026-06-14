import { Head, usePage } from "@/lib/inertia";
import { router, useForm } from "@/lib/inertia";
import type { ContactsEditProps, Organization } from "@/types";
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
import { DeletedNotice } from "@/components/DeletedNotice";
import { ViewerIndicator } from "@/components/ViewerIndicator";
import { EditingBanner, EditingIndicator } from "@/components/EditingIndicator";
import { useEditingIndicator } from "@/hooks/useEditingIndicator";
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

interface ContactsEditPageProps {
  onClose?: () => void;
}

export default function ContactsEdit({ onClose }: ContactsEditPageProps) {
  const { props } = usePage<ContactsEditProps>();

  const { contact } = props;
  const organizations = props.organizations as unknown as Organization[];

  // Collaborative editing indicators
  const { startEditing, stopEditing, editingUsers, isFieldBeingEdited } =
    useEditingIndicator({ type: "contact", id: contact.id });

  const form = useForm(
    {
      first_name: contact.firstName,
      last_name: contact.lastName,
      email: contact.email || "",
      phone: contact.phone || "",
      address: contact.address || "",
      city: contact.city || "",
      region: contact.region || "",
      country: contact.country || "US",
      postal_code: contact.postalCode || "",
      organization_id: contact.organizationId ? String(contact.organizationId) : "_none",
    },
    contacts.update(contact.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form.data,
      organization_id: form.data.organization_id === "_none" ? "" : form.data.organization_id,
    };
    router.put(contacts.update.url(contact.id), data, { preserveScroll: true });
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
      router.visit(contacts.delete(contact.id));
    }
  };

  const handleRestore = () => {
    router.visit(contacts.restore(contact.id));
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
      <Head title={`Edit ${contact.name}`} />

      <div className="p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">Edit {contact.name}</h2>
          <ViewerIndicator type="contact" id={contact.id} />
        </div>

        {contact.deletedAt && (
          <DeletedNotice entityName="contact" onRestore={handleRestore} />
        )}

        {/* Editing indicator banner */}
        <EditingBanner editingUsers={editingUsers} />

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <div className="flex items-center">
                  <Label htmlFor="first_name">First Name</Label>
                  {isFieldBeingEdited("first_name") && (
                    <EditingIndicator editingUser={isFieldBeingEdited("first_name")!} />
                  )}
                </div>
                <Input
                  id="first_name"
                  value={form.data.first_name}
                  onChange={(e) => form.setData("first_name", e.target.value)}
                  onFocus={() => startEditing("first_name")}
                  onBlur={stopEditing}
                  className="mt-1.5"
                />
                {form.errors.first_name && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {form.errors.first_name}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center">
                  <Label htmlFor="last_name">Last Name</Label>
                  {isFieldBeingEdited("last_name") && (
                    <EditingIndicator editingUser={isFieldBeingEdited("last_name")!} />
                  )}
                </div>
                <Input
                  id="last_name"
                  value={form.data.last_name}
                  onChange={(e) => form.setData("last_name", e.target.value)}
                  onFocus={() => startEditing("last_name")}
                  onBlur={stopEditing}
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
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                  {isFieldBeingEdited("email") && (
                    <EditingIndicator editingUser={isFieldBeingEdited("email")!} />
                  )}
                </div>
                <Input
                  id="email"
                  type="email"
                  value={form.data.email}
                  onChange={(e) => form.setData("email", e.target.value)}
                  onFocus={() => startEditing("email")}
                  onBlur={stopEditing}
                  className="mt-1.5"
                />
                {form.errors.email && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {form.errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center">
                  <Label htmlFor="phone">Phone</Label>
                  {isFieldBeingEdited("phone") && (
                    <EditingIndicator editingUser={isFieldBeingEdited("phone")!} />
                  )}
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={form.data.phone}
                  onChange={(e) => form.setData("phone", e.target.value)}
                  onFocus={() => startEditing("phone")}
                  onBlur={stopEditing}
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
              {!contact.deletedAt && (
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
