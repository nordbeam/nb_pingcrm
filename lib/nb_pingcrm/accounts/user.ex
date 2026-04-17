defmodule NbPingcrm.Accounts.User do
  @moduledoc """
  User schema for authentication and account management.
  """
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  @derive {
    Flop.Schema,
    filterable: [:first_name, :last_name, :email, :owner],
    sortable: [:first_name, :last_name, :email, :owner, :inserted_at],
    compound_fields: [search: [:first_name, :last_name, :email]],
    default_pagination_type: :page,
    default_limit: 10,
    default_order: %{order_by: [:last_name, :first_name], order_directions: [:asc, :asc]}
  }

  schema "users" do
    field(:first_name, :string)
    field(:last_name, :string)
    field(:email, :string)
    field(:password, :string, virtual: true, redact: true)
    field(:hashed_password, :string, redact: true)
    field(:owner, :boolean, default: false)
    field(:photo_path, :string)
    field(:deleted_at, :utc_datetime)
    field(:confirmed_at, :utc_datetime)
    field(:authenticated_at, :utc_datetime, virtual: true)

    belongs_to(:account, NbPingcrm.Accounts.Account)

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
  Checks if this is the demo user.
  """
  def demo_user?(%__MODULE__{email: email}) do
    email == "johndoe@example.com"
  end

  @doc """
  A user changeset for registration.
  """
  def registration_changeset(user, attrs, opts \\ []) do
    user
    |> cast(attrs, [:first_name, :last_name, :email, :password, :owner, :account_id])
    |> validate_required([:first_name, :last_name])
    |> validate_email(opts)
    |> validate_password(opts)
  end

  @doc """
  A user changeset for updating profile.
  """
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :email, :owner, :photo_path])
    |> validate_required([:first_name, :last_name, :email])
    |> validate_email(validate_unique: true)
  end

  @doc """
  A user changeset for registering or changing the email.
  """
  def email_changeset(user, attrs, opts \\ []) do
    user
    |> cast(attrs, [:email])
    |> validate_email(opts)
  end

  defp validate_email(changeset, opts) do
    changeset =
      changeset
      |> validate_required([:email])
      |> validate_format(:email, ~r/^[^@,;\s]+@[^@,;\s]+$/,
        message: "must have the @ sign and no spaces"
      )
      |> validate_length(:email, max: 160)

    if Keyword.get(opts, :validate_unique, true) do
      changeset
      |> unsafe_validate_unique(:email, NbPingcrm.Repo)
      |> unique_constraint(:email)
    else
      changeset
    end
  end

  @doc """
  A user changeset for changing the password.
  """
  def password_changeset(user, attrs, opts \\ []) do
    user
    |> cast(attrs, [:password])
    |> validate_confirmation(:password, message: "does not match password")
    |> validate_password(opts)
  end

  defp validate_password(changeset, opts) do
    changeset
    |> validate_required([:password])
    |> validate_length(:password, min: 12, max: 72)
    |> maybe_hash_password(opts)
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

  defp maybe_hash_password(changeset, opts) do
    hash_password? = Keyword.get(opts, :hash_password, true)
    password = get_change(changeset, :password)

    if hash_password? && password && changeset.valid? do
      changeset
      |> validate_length(:password, max: 72, count: :bytes)
      |> put_change(:hashed_password, Bcrypt.hash_pwd_salt(password))
      |> delete_change(:password)
    else
      changeset
    end
  end

  @doc """
  Confirms the account by setting `confirmed_at`.
  """
  def confirm_changeset(user) do
    now = DateTime.utc_now(:second)
    change(user, confirmed_at: now)
  end

  @doc """
  Verifies the password.
  """
  def valid_password?(%__MODULE__{hashed_password: hashed_password}, password)
      when is_binary(hashed_password) and byte_size(password) > 0 do
    Bcrypt.verify_pass(password, hashed_password)
  end

  def valid_password?(_, _) do
    Bcrypt.no_user_verify()
    false
  end

  # Query helpers

  @doc """
  Orders users by name (last_name, first_name).
  """
  def order_by_name(query \\ __MODULE__) do
    from(u in query, order_by: [asc: u.last_name, asc: u.first_name])
  end

  @doc """
  Filters by role (owner or user).
  """
  def filter_by_role(query, nil), do: query
  def filter_by_role(query, "owner"), do: from(u in query, where: u.owner == true)
  def filter_by_role(query, "user"), do: from(u in query, where: u.owner == false)
  def filter_by_role(query, _), do: query

  @doc """
  Filters by trashed status.
  """
  def filter_trashed(query, nil), do: from(u in query, where: is_nil(u.deleted_at))
  def filter_trashed(query, "with"), do: query
  def filter_trashed(query, "only"), do: from(u in query, where: not is_nil(u.deleted_at))
  def filter_trashed(query, _), do: from(u in query, where: is_nil(u.deleted_at))

  @doc """
  Searches users by name or email.
  """
  def search(query, nil), do: query
  def search(query, ""), do: query

  def search(query, term) do
    search_term = "%#{term}%"

    from(u in query,
      where:
        ilike(u.first_name, ^search_term) or
          ilike(u.last_name, ^search_term) or
          ilike(u.email, ^search_term)
    )
  end

  @doc """
  Scopes query to account.
  """
  def for_account(query \\ __MODULE__, account_id) do
    from(u in query, where: u.account_id == ^account_id)
  end
end
