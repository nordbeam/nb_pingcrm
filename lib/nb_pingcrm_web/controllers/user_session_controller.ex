defmodule NbPingcrmWeb.UserSessionController do
  use NbPingcrmWeb, :controller

  alias NbPingcrm.Accounts
  alias NbPingcrmWeb.InertiaShared.Auth
  alias NbPingcrmWeb.UserAuth

  # Shared props (user, account, flash) merged into all pages
  inertia_shared(Auth)

  # Define page props for type generation
  inertia_page :auth_login, component: "Auth/Login" do
    prop(:email, :string, nullable: true)
    prop(:sudo_mode, :boolean, default: false)
    prop(:mode, enum: ["password", "magic"], default: "password")
  end

  def new(conn, params) do
    render_inertia(conn, :auth_login, login_page_props(conn, params))
  end

  # magic link login
  def create(conn, %{"user" => %{"token" => token} = user_params} = params) do
    info =
      case params do
        %{"_action" => "confirmed"} -> "User confirmed successfully."
        _ -> "Welcome back!"
      end

    case Accounts.login_user_by_magic_link(token) do
      {:ok, {user, _expired_tokens}} ->
        conn
        |> put_flash(:info, info)
        |> UserAuth.log_in_user(user, user_params)

      {:error, :not_found} ->
        conn
        |> put_flash(:error, "The link is invalid or it has expired.")
        |> render_inertia(:auth_login, login_page_props(conn, %{"mode" => "magic"}))
    end
  end

  # email + password login
  def create(conn, %{"user" => %{"email" => email, "password" => password} = user_params}) do
    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> put_flash(:info, "Welcome back!")
      |> UserAuth.log_in_user(user, user_params)
    else
      # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
      conn
      |> put_flash(:error, "Invalid email or password")
      |> render_inertia(
        :auth_login,
        login_page_props(conn, %{"email" => email, "mode" => "password"})
      )
    end
  end

  # magic link request
  def create(conn, %{"user" => %{"email" => email}}) do
    if user = Accounts.get_user_by_email(email) do
      Accounts.deliver_login_instructions(
        user,
        &url(~p"/users/log-in/#{&1}")
      )
    end

    info =
      "If your email is in our system, you will receive instructions for logging in shortly."

    conn
    |> put_flash(:info, info)
    |> redirect(to: ~p"/users/log-in")
  end

  def confirm(conn, %{"token" => token}) do
    if user = Accounts.get_user_by_magic_link_token(token) do
      form = Phoenix.Component.to_form(%{"token" => token}, as: "user")

      conn
      |> assign(:user, user)
      |> assign(:form, form)
      |> render(:confirm)
    else
      conn
      |> put_flash(:error, "Magic link is invalid or it has expired.")
      |> redirect(to: ~p"/users/log-in")
    end
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "Logged out successfully.")
    |> UserAuth.log_out_user()
  end

  defp login_page_props(conn, params) do
    user = conn.assigns[:current_scope] && conn.assigns.current_scope.user
    email = Map.get(params, "email") || user_email(user)
    mode = login_mode(params)

    %{
      email: email,
      sudo_mode: not is_nil(user),
      mode: mode
    }
  end

  defp login_mode(%{"mode" => "magic"}), do: "magic"
  defp login_mode(_), do: "password"

  defp user_email(%{email: email}) when is_binary(email), do: email
  defp user_email(_), do: nil
end
