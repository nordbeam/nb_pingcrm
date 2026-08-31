defmodule NbPingcrmWeb.OrganizationsController do
  use NbPingcrmWeb, :controller

  alias NbFlop.Serializers.TableResourceSerializer
  alias NbInertia.Modal.Redirector
  alias NbPingcrm.CRM
  alias NbPingcrm.CRM.Organization
  alias NbPingcrmWeb.InertiaShared.Auth
  alias NbPingcrmWeb.Serializers.OrganizationSerializer
  alias NbPingcrmWeb.Tables.OrganizationsTable

  inertia_shared(Auth)

  inertia_page :organizations_index do
    prop(:organizations, TableResourceSerializer)
  end

  inertia_page :organizations_create do
  end

  inertia_page :organizations_edit do
    prop(:organization, OrganizationSerializer)
  end

  def index(conn, params) do
    account_id = conn.assigns.current_scope.user.account_id

    # Build scoped query for multi-tenant filtering
    query =
      Organization
      |> Organization.for_account(account_id)
      |> Organization.filter_trashed(params["trashed"])
      |> Organization.search(params["search"])

    render_inertia(conn, :organizations_index,
      organizations: OrganizationsTable.make(conn, params, query: query)
    )
  end

  def new(conn, _params) do
    render_inertia_modal(conn, :organizations_create, [],
      base_url: ~p"/organizations",
      slideover: true
    )
  end

  def create(conn, org_params) do
    account_id = conn.assigns.current_scope.user.account_id

    case CRM.create_organization(account_id, org_params) do
      {:ok, _organization} ->
        conn
        |> put_flash(:success, "Organization created.")
        |> redirect_after_modal_submit(modal_to: ~p"/organizations")

      {:error, changeset} ->
        conn
        |> assign_changeset_errors(changeset)
        |> render_inertia(:organizations_create)
    end
  end

  def edit(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    organization = CRM.get_organization_for_account!(account_id, id)

    render_inertia_modal(
      conn,
      :organizations_edit,
      [organization: {OrganizationSerializer, organization}],
      base_url: ~p"/organizations",
      slideover: true
    )
  end

  def update(conn, %{"id" => id} = params) do
    org_params = Map.drop(params, ["id"])
    account_id = conn.assigns.current_scope.user.account_id
    organization = CRM.get_organization_for_account!(account_id, id)

    case CRM.update_organization(organization, org_params) do
      {:ok, _organization} ->
        conn
        |> put_flash(:success, "Organization updated.")
        |> redirect_after_modal_submit(
          modal_to: ~p"/organizations",
          default_to: ~p"/organizations/#{id}/edit"
        )

      {:error, changeset} ->
        conn
        |> assign_changeset_errors(changeset)
        |> render_inertia(:organizations_edit,
          organization: {OrganizationSerializer, organization}
        )
    end
  end

  def delete(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    organization = CRM.get_organization_for_account!(account_id, id)

    case CRM.soft_delete_organization(organization) do
      {:ok, _organization} ->
        conn
        |> put_flash(:success, "Organization deleted.")
        |> redirect_after_modal_submit(modal_to: ~p"/organizations")

      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Unable to delete organization.")
        |> redirect_after_modal_submit(modal_to: ~p"/organizations")
    end
  end

  def restore(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    organization = CRM.get_organization_for_account!(account_id, id)

    case CRM.restore_organization(organization) do
      {:ok, _organization} ->
        conn
        |> put_flash(:success, "Organization restored.")
        |> redirect_after_modal_submit(
          modal_to: ~p"/organizations",
          default_to: ~p"/organizations/#{id}/edit"
        )

      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Unable to restore organization.")
        |> redirect_after_modal_submit(
          modal_to: ~p"/organizations",
          default_to: ~p"/organizations/#{id}/edit"
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
