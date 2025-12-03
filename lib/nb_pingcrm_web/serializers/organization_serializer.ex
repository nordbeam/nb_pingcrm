defmodule NbPingcrmWeb.Serializers.OrganizationSerializer do
  @moduledoc false
  use NbSerializer.Serializer

  schema do
    field(:id, :number)
    field(:name, :string)
    field(:email, :string, nullable: true)
    field(:phone, :string, nullable: true)
    field(:address, :string, nullable: true)
    field(:city, :string, nullable: true)
    field(:region, :string, nullable: true)
    field(:country, :string, nullable: true)
    field(:postal_code, :string, nullable: true)
    field(:deleted_at, :datetime, nullable: true)
  end
end
