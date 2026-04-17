defmodule NbPingcrm.CRM.Contact do
  @moduledoc """
  Contact schema for the CRM.
  """
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  @derive {
    Flop.Schema,
    filterable: [:first_name, :last_name, :email, :city, :country, :organization_id, :phone],
    sortable: [:first_name, :last_name, :email, :city, :country, :inserted_at],
    compound_fields: [search: [:first_name, :last_name, :email, :phone, :city]],
    default_pagination_type: :page,
    default_limit: 10,
    default_order: %{order_by: [:last_name, :first_name], order_directions: [:asc, :asc]}
  }

  schema "contacts" do
    field(:first_name, :string)
    field(:last_name, :string)
    field(:email, :string)
    field(:phone, :string)
    field(:address, :string)
    field(:city, :string)
    field(:region, :string)
    field(:country, :string, default: "US")
    field(:postal_code, :string)
    field(:deleted_at, :utc_datetime)

    belongs_to(:account, NbPingcrm.Accounts.Account)
    belongs_to(:organization, NbPingcrm.CRM.Organization)

    timestamps(type: :utc_datetime)
  end

  @doc """
  Returns full name from first and last name.
  """
  def name(%__MODULE__{first_name: first, last_name: last}) do
    format_name(first, last)
  end

  def name(%{first_name: first, last_name: last}) do
    format_name(first, last)
  end

  def name(%{email: email}) when is_binary(email), do: email

  def name(_), do: ""

  @doc """
  Changeset for creating/updating a contact.
  """
  def changeset(contact, attrs) do
    contact
    |> cast(attrs, [
      :first_name,
      :last_name,
      :email,
      :phone,
      :address,
      :city,
      :region,
      :country,
      :postal_code,
      :organization_id
    ])
    |> validate_required([:first_name, :last_name])
    |> validate_length(:first_name, max: 50)
    |> validate_length(:last_name, max: 50)
    |> validate_format(:email, ~r/^[^@,;\s]+@[^@,;\s]+$/, message: "must be a valid email")
  end

  # Query helpers

  @doc """
  Scopes query to account.
  """
  def for_account(query \\ __MODULE__, account_id) do
    from(c in query, where: c.account_id == ^account_id)
  end

  @doc """
  Orders contacts by name.
  """
  def order_by_name(query \\ __MODULE__) do
    from(c in query, order_by: [asc: c.last_name, asc: c.first_name])
  end

  @doc """
  Filters by trashed status.
  """
  def filter_trashed(query, nil), do: from(c in query, where: is_nil(c.deleted_at))
  def filter_trashed(query, "with"), do: query
  def filter_trashed(query, "only"), do: from(c in query, where: not is_nil(c.deleted_at))
  def filter_trashed(query, _), do: from(c in query, where: is_nil(c.deleted_at))

  @doc """
  Searches contacts by name or email.
  """
  def search(query, nil), do: query
  def search(query, ""), do: query

  def search(query, term) do
    search_term = "%#{term}%"

    from(c in query,
      where:
        ilike(c.first_name, ^search_term) or
          ilike(c.last_name, ^search_term) or
          ilike(c.email, ^search_term)
    )
  end

  defp format_name(first, last) do
    [first, last]
    |> Enum.map(&normalize_name_part/1)
    |> Enum.reject(&(&1 == ""))
    |> Enum.join(" ")
  end

  defp normalize_name_part(nil), do: ""
  defp normalize_name_part(part) when is_binary(part), do: String.trim(part)
  defp normalize_name_part(part), do: part |> to_string() |> String.trim()
end
