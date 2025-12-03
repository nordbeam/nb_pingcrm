defmodule NbPingcrm.CRM do
  @moduledoc """
  The CRM context for managing organizations and contacts.
  """

  import Ecto.Query, warn: false
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
    %Organization{account_id: account_id}
    |> Organization.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates an organization.
  """
  def update_organization(organization, attrs) do
    organization
    |> Organization.changeset(attrs)
    |> Repo.update()
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
    organization
    |> Ecto.Changeset.change(deleted_at: DateTime.utc_now(:second))
    |> Repo.update()
  end

  @doc """
  Restores a soft-deleted organization.
  """
  def restore_organization(organization) do
    organization
    |> Ecto.Changeset.change(deleted_at: nil)
    |> Repo.update()
  end

  @doc """
  Permanently deletes an organization.
  """
  def delete_organization(organization) do
    Repo.delete(organization)
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
    %Contact{account_id: account_id}
    |> Contact.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a contact.
  """
  def update_contact(contact, attrs) do
    contact
    |> Contact.changeset(attrs)
    |> Repo.update()
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
    contact
    |> Ecto.Changeset.change(deleted_at: DateTime.utc_now(:second))
    |> Repo.update()
  end

  @doc """
  Restores a soft-deleted contact.
  """
  def restore_contact(contact) do
    contact
    |> Ecto.Changeset.change(deleted_at: nil)
    |> Repo.update()
  end

  @doc """
  Permanently deletes a contact.
  """
  def delete_contact(contact) do
    Repo.delete(contact)
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
end
