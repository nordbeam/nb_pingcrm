defmodule NbPingcrmWeb.ContactsController do
  use NbPingcrmWeb, :controller

  alias NbFlop.Serializers.TableResourceSerializer
  alias NbInertia.Modal.Redirector
  alias NbPingcrm.CRM
  alias NbPingcrm.CRM.Contact
  alias NbPingcrmWeb.InertiaShared.Auth
  alias NbPingcrmWeb.Serializers.{ContactSerializer, OrganizationSerializer}
  alias NbPingcrmWeb.Tables.ContactsTable

  inertia_shared(Auth)

  inertia_page :contacts_index do
    prop(:contacts, TableResourceSerializer)
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

    # Build scoped query for multi-tenant filtering
    query =
      Contact
      |> Contact.for_account(account_id)
      |> Contact.filter_trashed(params["trashed"])
      |> Contact.search(params["search"])

    # preload: :organization is automatically inferred from column definition
    render_inertia(conn, :contacts_index,
      contacts: ContactsTable.make(conn, params, query: query)
    )
  end

  def new(conn, _params) do
    account_id = conn.assigns.current_scope.user.account_id
    organizations = CRM.list_organizations_for_select(account_id)

    render_inertia_modal(
      conn,
      :contacts_create,
      [organizations: {OrganizationSerializer, organizations}],
      base_url: ~p"/contacts",
      slideover: true
    )
  end

  def create(conn, contact_params) do
    account_id = conn.assigns.current_scope.user.account_id

    case CRM.create_contact(account_id, contact_params) do
      {:ok, _contact} ->
        conn
        |> put_flash(:success, "Contact created.")
        |> redirect_after_modal_submit(modal_to: ~p"/contacts")

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

    render_inertia_modal(
      conn,
      :contacts_edit,
      [
        contact: {ContactSerializer, contact},
        organizations: {OrganizationSerializer, organizations}
      ],
      base_url: ~p"/contacts",
      slideover: true
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
        |> redirect_after_modal_submit(
          modal_to: ~p"/contacts",
          default_to: ~p"/contacts/#{id}/edit"
        )

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
        |> redirect_after_modal_submit(modal_to: ~p"/contacts")

      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Unable to delete contact.")
        |> redirect_after_modal_submit(modal_to: ~p"/contacts")
    end
  end

  def restore(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    contact = CRM.get_contact_for_account!(account_id, id)

    case CRM.restore_contact(contact) do
      {:ok, _contact} ->
        conn
        |> put_flash(:success, "Contact restored.")
        |> redirect_after_modal_submit(
          modal_to: ~p"/contacts",
          default_to: ~p"/contacts/#{id}/edit"
        )

      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Unable to restore contact.")
        |> redirect_after_modal_submit(
          modal_to: ~p"/contacts",
          default_to: ~p"/contacts/#{id}/edit"
        )
    end
  end

  defp assign_changeset_errors(conn, changeset) do
    errors =
      Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
        Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
          opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
        end)
      end)

    NbInertia.CoreController.assign_errors(conn, errors)
  end

  defp redirect_after_modal_submit(conn, opts) do
    modal_to = Keyword.fetch!(opts, :modal_to)
    default_to = Keyword.get(opts, :default_to, modal_to)

    if Redirector.from_modal?(conn) do
      Redirector.redirect_modal(conn, to: modal_to)
    else
      redirect(conn, to: default_to)
    end
  end
end
