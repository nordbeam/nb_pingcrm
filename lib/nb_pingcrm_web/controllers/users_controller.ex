defmodule NbPingcrmWeb.UsersController do
  use NbPingcrmWeb, :controller
  use NbInertia.Controller

  alias NbFlop.Serializers.TableResourceSerializer
  alias NbPingcrm.Accounts
  alias NbPingcrm.Accounts.User
  alias NbPingcrmWeb.InertiaShared.Auth
  alias NbPingcrmWeb.Serializers.UserSerializer
  alias NbPingcrmWeb.Tables.UsersTable

  inertia_shared(Auth)

  inertia_page :users_index do
    prop(:users, TableResourceSerializer)
  end

  inertia_page :users_create do
  end

  inertia_page :users_edit do
    prop(:user, UserSerializer)
  end

  def index(conn, params) do
    account_id = conn.assigns.current_scope.user.account_id

    # Build scoped query for multi-tenant filtering
    query =
      User
      |> User.for_account(account_id)
      |> User.filter_trashed(params["trashed"])
      |> User.filter_by_role(params["role"])
      |> User.search(params["search"])

    render_inertia(conn, :users_index, users: UsersTable.make(conn, params, query: query))
  end

  def new(conn, _params) do
    render_inertia_modal(conn, :users_create, [],
      base_url: ~p"/users",
      slideover: true
    )
  end

  def create(conn, user_params) do
    account_id = conn.assigns.current_scope.user.account_id

    case Accounts.create_user(account_id, user_params) do
      {:ok, _user} ->
        conn
        |> put_flash(:success, "User created.")
        |> redirect(to: ~p"/users")

      {:error, changeset} ->
        conn
        |> assign_changeset_errors(changeset)
        |> render_inertia(:users_create)
    end
  end

  def edit(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    user = Accounts.get_user_for_account!(account_id, id)

    render_inertia_modal(conn, :users_edit, [user: {UserSerializer, user}],
      base_url: ~p"/users",
      slideover: true
    )
  end

  def update(conn, %{"id" => id} = params) do
    user_params = Map.drop(params, ["id"])
    account_id = conn.assigns.current_scope.user.account_id
    user = Accounts.get_user_for_account!(account_id, id)

    case Accounts.update_user(user, user_params) do
      {:ok, _user} ->
        conn
        |> put_flash(:success, "User updated.")
        |> redirect(to: ~p"/users/#{id}/edit")

      {:error, changeset} ->
        conn
        |> assign_changeset_errors(changeset)
        |> render_inertia(:users_edit, user: {UserSerializer, user})
    end
  end

  def delete(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    user = Accounts.get_user_for_account!(account_id, id)

    case Accounts.soft_delete_user(user) do
      {:ok, _user} ->
        conn
        |> put_flash(:success, "User deleted.")
        |> redirect(to: ~p"/users")

      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Unable to delete user.")
        |> redirect(to: ~p"/users")
    end
  end

  def restore(conn, %{"id" => id}) do
    account_id = conn.assigns.current_scope.user.account_id
    user = Accounts.get_user_for_account!(account_id, id)

    case Accounts.restore_user(user) do
      {:ok, _user} ->
        conn
        |> put_flash(:success, "User restored.")
        |> redirect(to: ~p"/users/#{id}/edit")

      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Unable to restore user.")
        |> redirect(to: ~p"/users/#{id}/edit")
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
