defmodule NbPingcrmWeb.UserRegistrationController do
  use NbPingcrmWeb, :controller

  alias NbPingcrm.Accounts
  alias NbPingcrmWeb.InertiaShared.Auth

  # Shared props (user, account, flash) merged into all pages
  inertia_shared(Auth)

  # Define page props for type generation
  # Note: errors prop is auto-added by assign_errors/2
  inertia_page :auth_register, component: "Auth/Register" do
  end

  def new(conn, _params) do
    render_inertia(conn, :auth_register)
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.register_user(user_params) do
      {:ok, user} ->
        {:ok, _} =
          Accounts.deliver_login_instructions(
            user,
            &url(~p"/users/log-in/#{&1}")
          )

        conn
        |> put_flash(
          :info,
          "An email was sent to #{user.email}, please access it to confirm your account."
        )
        |> redirect(to: ~p"/users/log-in")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_flash(:error, "Please fix the errors below.")
        |> assign_errors(changeset)
        |> render_inertia(:auth_register)
    end
  end
end
