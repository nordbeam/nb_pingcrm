defmodule NbPingcrmWeb.ContactsController do
  use NbPingcrmWeb, :controller
  use NbInertia.Controller

  alias NbPingcrm.CRM
  alias NbPingcrm.CRM.Contact
  alias NbPingcrmWeb.InertiaShared.Auth
  alias NbPingcrmWeb.Serializers.{ContactSerializer, FlopMetaSerializer, OrganizationSerializer}

  inertia_shared(Auth)

  inertia_page :contacts_index do
    prop(:contacts, ContactSerializer)
    prop(:meta, FlopMetaSerializer)
    prop(:filters, :map)
    prop(:filter_mode, :string, nullable: true)
    prop(:filter_options, :map, nullable: true)
  end

  inertia_page :contacts_create do
    prop(:organizations, OrganizationSerializer)
  end

  inertia_page :contacts_edit do
    prop(:contact, ContactSerializer)
    prop(:organizations, OrganizationSerializer)
  end

  def index(conn, params) do
    account_id = conn.assigns.current_scope.user.account_id

    # Load organizations for filter dropdown
    organizations = CRM.list_organizations_for_select(account_id)

    organization_options =
      Enum.map(organizations, fn org ->
        %{value: org.id, label: org.name}
      end)

    # Debug: Log incoming params
    require Logger
    Logger.debug("ContactsController.index params: #{inspect(params)}")

    case CRM.list_contacts(account_id, params) do
      {:ok, {contacts, meta}} ->
        contacts = NbPingcrm.Repo.preload(contacts, :organization)

        render_inertia(conn, :contacts_index,
          contacts: {ContactSerializer, contacts},
          meta: {FlopMetaSerializer, meta, schema: Contact},
          filters: %{
            search: params["search"],
            trashed: params["trashed"]
          },
          filter_mode: params["filter_mode"],
          filter_options: %{
            organizations: organization_options
          }
        )

      {:error, changeset} ->
        # Debug: Log the actual error
        Logger.error("ContactsController.index Flop error: #{inspect(changeset)}")

        conn
        |> put_flash(:error, "Invalid parameters")
        |> redirect(to: ~p"/contacts")
    end
  end

  def new(conn, _params) do
    account_id = conn.assigns.current_scope.user.account_id
    organizations = CRM.list_organizations_for_select(account_id)

    render_inertia(conn, :contacts_create, organizations: {OrganizationSerializer, organizations})
  end

  def create(conn, contact_params) do
    account_id = conn.assigns.current_scope.user.account_id

    case CRM.create_contact(account_id, contact_params) do
      {:ok, _contact} ->
        conn
        |> put_flash(:success, "Contact created.")
        |> redirect(to: ~p"/contacts")

      {:error, changeset} ->
        organizations = CRM.list_organizations_for_select(account_id)

        conn
        |> assign_changeset_errors(changeset)
        |> render_inertia(:contacts_create,
          organizations: {OrganizationSerializer, organizations}
        )
    end
  end

  def edit(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    contact = CRM.get_contact_for_account!(account_id, id)
    organizations = CRM.list_organizations_for_select(account_id)

    render_inertia(conn, :contacts_edit,
      contact: {ContactSerializer, contact},
      organizations: {OrganizationSerializer, organizations}
    )
  end

  def update(conn, %{"id" => id} = params) do
    contact_params = Map.drop(params, ["id"])
    account_id = conn.assigns.current_scope.user.account_id
    contact = CRM.get_contact_for_account!(account_id, id)

    case CRM.update_contact(contact, contact_params) do
      {:ok, _contact} ->
        conn
        |> put_flash(:success, "Contact updated.")
        |> redirect(to: ~p"/contacts/#{id}/edit")

      {:error, changeset} ->
        organizations = CRM.list_organizations_for_select(account_id)

        conn
        |> assign_changeset_errors(changeset)
        |> render_inertia(:contacts_edit,
          contact: {ContactSerializer, contact},
          organizations: {OrganizationSerializer, organizations}
        )
    end
  end

  def delete(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    contact = CRM.get_contact_for_account!(account_id, id)

    case CRM.soft_delete_contact(contact) do
      {:ok, _contact} ->
        conn
        |> put_flash(:success, "Contact deleted.")
        |> redirect(to: ~p"/contacts")

      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Unable to delete contact.")
        |> redirect(to: ~p"/contacts")
    end
  end

  def restore(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    contact = CRM.get_contact_for_account!(account_id, id)

    case CRM.restore_contact(contact) do
      {:ok, _contact} ->
        conn
        |> put_flash(:success, "Contact restored.")
        |> redirect(to: ~p"/contacts/#{id}/edit")

      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Unable to restore contact.")
        |> redirect(to: ~p"/contacts/#{id}/edit")
    end
  end

  defp assign_changeset_errors(conn, changeset) do
    errors =
      Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
        Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
          opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
        end)
      end)

    Inertia.Controller.assign_errors(conn, errors)
  end
end
