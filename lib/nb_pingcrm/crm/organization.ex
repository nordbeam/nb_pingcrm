defmodule NbPingcrm.CRM.Organization do
  @moduledoc """
  Organization schema for the CRM.
  """
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  @derive {
    Flop.Schema,
    filterable: [:name, :email, :city, :country, :phone],
    sortable: [:name, :city, :country, :inserted_at],
    compound_fields: [search: [:name, :email, :city, :phone]],
    default_pagination_type: :page,
    default_limit: 10,
    default_order: %{order_by: [:name], order_directions: [:asc]}
  }

  schema "organizations" do
    field(:name, :string)
    field(:email, :string)
    field(:phone, :string)
    field(:address, :string)
    field(:city, :string)
    field(:region, :string)
    field(:country, :string, default: "US")
    field(:postal_code, :string)
    field(:deleted_at, :utc_datetime)

    belongs_to(:account, NbPingcrm.Accounts.Account)
    has_many(:contacts, NbPingcrm.CRM.Contact)

    timestamps(type: :utc_datetime)
  end

  @doc """
  Changeset for creating/updating an organization.
  """
  def changeset(organization, attrs) do
    organization
    |> cast(attrs, [:name, :email, :phone, :address, :city, :region, :country, :postal_code])
    |> validate_required([:name])
    |> validate_length(:name, max: 100)
    |> validate_format(:email, ~r/^[^@,;\s]+@[^@,;\s]+$/, message: "must be a valid email")
  end

  # Query helpers

  @doc """
  Scopes query to account.
  """
  def for_account(query \\ __MODULE__, account_id) do
    from(o in query, where: o.account_id == ^account_id)
  end

  @doc """
  Orders organizations by name.
  """
  def order_by_name(query \\ __MODULE__) do
    from(o in query, order_by: [asc: o.name])
  end

  @doc """
  Filters by trashed status.
  """
  def filter_trashed(query, nil), do: from(o in query, where: is_nil(o.deleted_at))
  def filter_trashed(query, "with"), do: query
  def filter_trashed(query, "only"), do: from(o in query, where: not is_nil(o.deleted_at))
  def filter_trashed(query, _), do: from(o in query, where: is_nil(o.deleted_at))

  @doc """
  Searches organizations by name, email, city.
  """
  def search(query, nil), do: query
  def search(query, ""), do: query

  def search(query, term) do
    search_term = "%#{term}%"

    from(o in query,
      where:
        ilike(o.name, ^search_term) or
          ilike(o.email, ^search_term) or
          ilike(o.city, ^search_term)
    )
  end
end
