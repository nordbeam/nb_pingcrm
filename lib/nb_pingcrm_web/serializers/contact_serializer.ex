defmodule NbPingcrmWeb.Serializers.ContactSerializer do
  @moduledoc false
  use NbSerializer.Serializer

  alias NbPingcrm.CRM.{Contact, Organization}

  schema do
    field(:id, :number)
    field(:first_name, :string)
    field(:last_name, :string)
    field(:name, :string, compute: :compute_name)
    field(:email, :string, nullable: true)
    field(:phone, :string, nullable: true)
    field(:address, :string, nullable: true)
    field(:city, :string, nullable: true)
    field(:region, :string, nullable: true)
    field(:country, :string, nullable: true)
    field(:postal_code, :string, nullable: true)
    field(:deleted_at, :datetime, nullable: true)
    field(:organization_id, :number, nullable: true)
    field(:organization_name, :string, compute: :compute_organization_name, nullable: true)
  end

  def compute_name(contact, _opts) do
    Contact.name(contact)
  end

  def compute_organization_name(%{organization: %Organization{name: name}}, _opts) do
    name
  end

  def compute_organization_name(_, _opts), do: nil
end
