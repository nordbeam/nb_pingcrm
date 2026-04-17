defmodule NbPingcrm.CRM do
  @moduledoc """
  The CRM context for managing organizations and contacts.
  """

  import Ecto.Query, warn: false
  alias NbPingcrm.Broadcaster
  alias NbPingcrm.CRM.{Contact, Organization}
  alias NbPingcrm.Repo

  ## Organizations

  @doc """
  Lists organizations with Flop pagination and filtering.
  """
  def list_organizations(account_id, params \\ %{}, opts \\ []) do
    filter_op = if params["filter_mode"] == "any", do: :or, else: :and

    Organization
    |> Organization.for_account(account_id)
    |> Organization.filter_trashed(params["trashed"])
    |> Organization.search(params["search"])
    |> Flop.validate_and_run(
      params,
      Keyword.merge([for: Organization, filter_op: filter_op], opts)
    )
  end

  @doc """
  Gets a single organization within an account.
  """
  def get_organization_for_account!(account_id, id) do
    Organization
    |> Organization.for_account(account_id)
    |> Repo.get!(id)
  end

  @doc """
  Gets a single organization.
  """
  def get_organization!(id), do: Repo.get!(Organization, id)

  @doc """
  Creates an organization within an account.
  """
  def create_organization(account_id, attrs) do
    result =
      %Organization{account_id: account_id}
      |> Organization.changeset(attrs)
      |> Repo.insert()

    with {:ok, organization} <- result do
      Broadcaster.broadcast_organization_created(organization)
      {:ok, organization}
    end
  end

  @doc """
  Updates an organization.
  """
  def update_organization(organization, attrs) do
    result =
      organization
      |> Organization.changeset(attrs)
      |> Repo.update()

    with {:ok, organization} <- result do
      Broadcaster.broadcast_organization_updated(organization)
      {:ok, organization}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking organization changes.
  """
  def change_organization(organization, attrs \\ %{}) do
    Organization.changeset(organization, attrs)
  end

  @doc """
  Soft deletes an organization.
  """
  def soft_delete_organization(organization) do
    result =
      organization
      |> Ecto.Changeset.change(deleted_at: DateTime.utc_now(:second))
      |> Repo.update()

    with {:ok, organization} <- result do
      Broadcaster.broadcast_organization_deleted(organization)
      {:ok, organization}
    end
  end

  @doc """
  Restores a soft-deleted organization.
  """
  def restore_organization(organization) do
    result =
      organization
      |> Ecto.Changeset.change(deleted_at: nil)
      |> Repo.update()

    with {:ok, organization} <- result do
      Broadcaster.broadcast_organization_restored(organization)
      {:ok, organization}
    end
  end

  @doc """
  Permanently deletes an organization.
  """
  def delete_organization(organization) do
    result = Repo.delete(organization)

    with {:ok, organization} <- result do
      Broadcaster.broadcast_organization_deleted(organization)
      {:ok, organization}
    end
  end

  @doc """
  Lists all organizations for dropdown select.
  """
  def list_organizations_for_select(account_id) do
    Organization
    |> Organization.for_account(account_id)
    |> Organization.filter_trashed(nil)
    |> Organization.order_by_name()
    |> Repo.all()
  end

  ## Contacts

  @doc """
  Lists contacts with Flop pagination and filtering.
  """
  def list_contacts(account_id, params \\ %{}, opts \\ []) do
    filter_op = if params["filter_mode"] == "any", do: :or, else: :and

    Contact
    |> Contact.for_account(account_id)
    |> Contact.filter_trashed(params["trashed"])
    |> Contact.search(params["search"])
    |> Flop.validate_and_run(
      params,
      Keyword.merge([for: Contact, filter_op: filter_op], opts)
    )
  end

  @doc """
  Gets a single contact within an account.
  """
  def get_contact_for_account!(account_id, id) do
    Contact
    |> Contact.for_account(account_id)
    |> Repo.get!(id)
    |> Repo.preload(:organization)
  end

  @doc """
  Gets a single contact.
  """
  def get_contact!(id), do: Repo.get!(Contact, id)

  @doc """
  Creates a contact within an account.
  """
  def create_contact(account_id, attrs) do
    result =
      %Contact{account_id: account_id}
      |> Contact.changeset(attrs)
      |> Repo.insert()

    with {:ok, contact} <- result do
      Broadcaster.broadcast_contact_created(contact)
      {:ok, contact}
    end
  end

  @doc """
  Updates a contact.
  """
  def update_contact(contact, attrs) do
    result =
      contact
      |> Contact.changeset(attrs)
      |> Repo.update()

    with {:ok, contact} <- result do
      Broadcaster.broadcast_contact_updated(contact)
      {:ok, contact}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking contact changes.
  """
  def change_contact(contact, attrs \\ %{}) do
    Contact.changeset(contact, attrs)
  end

  @doc """
  Soft deletes a contact.
  """
  def soft_delete_contact(contact) do
    result =
      contact
      |> Ecto.Changeset.change(deleted_at: DateTime.utc_now(:second))
      |> Repo.update()

    with {:ok, contact} <- result do
      Broadcaster.broadcast_contact_deleted(contact)
      {:ok, contact}
    end
  end

  @doc """
  Restores a soft-deleted contact.
  """
  def restore_contact(contact) do
    result =
      contact
      |> Ecto.Changeset.change(deleted_at: nil)
      |> Repo.update()

    with {:ok, contact} <- result do
      Broadcaster.broadcast_contact_restored(contact)
      {:ok, contact}
    end
  end

  @doc """
  Permanently deletes a contact.
  """
  def delete_contact(contact) do
    result = Repo.delete(contact)

    with {:ok, contact} <- result do
      Broadcaster.broadcast_contact_deleted(contact)
      {:ok, contact}
    end
  end

  ## Dashboard Stats

  @doc """
  Counts active (non-deleted) organizations in an account.
  """
  def count_organizations(account_id) do
    Organization
    |> Organization.for_account(account_id)
    |> Organization.filter_trashed(nil)
    |> Repo.aggregate(:count)
  end

  @doc """
  Counts active (non-deleted) contacts in an account.
  """
  def count_contacts(account_id) do
    Contact
    |> Contact.for_account(account_id)
    |> Contact.filter_trashed(nil)
    |> Repo.aggregate(:count)
  end

  ## Report Metrics

  @doc """
  Gets contacts grouped by organization for reports.
  Returns top N organizations by contact count.
  """
  def contacts_by_organization(account_id, limit \\ 10) do
    from(c in Contact,
      join: o in Organization,
      on: c.organization_id == o.id,
      where: c.account_id == ^account_id and is_nil(c.deleted_at) and is_nil(o.deleted_at),
      group_by: [o.id, o.name],
      select: %{id: o.id, name: o.name, count: count(c.id)},
      order_by: [desc: count(c.id)],
      limit: ^limit
    )
    |> Repo.all()
  end

  @doc """
  Gets contacts grouped by country for reports.
  """
  def contacts_by_country(account_id) do
    from(c in Contact,
      where: c.account_id == ^account_id and is_nil(c.deleted_at) and not is_nil(c.country),
      group_by: c.country,
      select: %{country: c.country, count: count(c.id)},
      order_by: [desc: count(c.id)]
    )
    |> Repo.all()
  end

  @doc """
  Gets organizations grouped by country for reports.
  """
  def organizations_by_country(account_id) do
    from(o in Organization,
      where: o.account_id == ^account_id and is_nil(o.deleted_at) and not is_nil(o.country),
      group_by: o.country,
      select: %{country: o.country, count: count(o.id)},
      order_by: [desc: count(o.id)]
    )
    |> Repo.all()
  end

  @doc """
  Counts deleted (trashed) items.
  """
  def count_trashed(account_id) do
    contacts =
      Contact
      |> Contact.for_account(account_id)
      |> Contact.filter_trashed("only")
      |> Repo.aggregate(:count)

    organizations =
      Organization
      |> Organization.for_account(account_id)
      |> Organization.filter_trashed("only")
      |> Repo.aggregate(:count)

    %{contacts: contacts, organizations: organizations}
  end

  @doc """
  Gets new records created in the last N days.
  """
  def recent_activity(account_id, days \\ 30) do
    since = DateTime.utc_now() |> DateTime.add(-days, :day)

    contacts =
      from(c in Contact,
        where: c.account_id == ^account_id and c.inserted_at >= ^since,
        select: count(c.id)
      )
      |> Repo.one()

    organizations =
      from(o in Organization,
        where: o.account_id == ^account_id and o.inserted_at >= ^since,
        select: count(o.id)
      )
      |> Repo.one()

    %{contacts: contacts, organizations: organizations, days: days}
  end

  @doc """
  Gets contacts created over time (last N months).
  """
  def contacts_over_time(account_id, months \\ 6) do
    since = DateTime.utc_now() |> DateTime.add(-months * 30, :day)

    from(c in Contact,
      where: c.account_id == ^account_id and c.inserted_at >= ^since,
      group_by: fragment("date_trunc('month', ?)", c.inserted_at),
      select: %{
        month: fragment("date_trunc('month', ?)", c.inserted_at),
        count: count(c.id)
      },
      order_by: fragment("date_trunc('month', ?)", c.inserted_at)
    )
    |> Repo.all()
    |> Enum.map(fn %{month: month, count: count} ->
      %{month: format_month(month), count: count}
    end)
  end

  defp format_month(%DateTime{} = dt) do
    Calendar.strftime(dt, "%b %Y")
  end

  defp format_month(%NaiveDateTime{} = dt) do
    Calendar.strftime(dt, "%b %Y")
  end
end
