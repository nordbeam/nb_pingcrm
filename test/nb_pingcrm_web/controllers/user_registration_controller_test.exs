defmodule NbPingcrmWeb.UserRegistrationControllerTest do
  use NbPingcrmWeb.ConnCase, async: true

  import NbPingcrm.AccountsFixtures

  describe "GET /users/register" do
    test "renders registration page", %{conn: conn} do
      conn = get(conn, ~p"/users/register")

      assert_inertia_page(conn, "Auth/Register")
      assert_inertia_props(conn, [:user, :account, :flash, :errors])
      assert_shared_prop(conn, :user, nil)
      assert_shared_prop(conn, :account, nil)
    end

    test "redirects if already logged in", %{conn: conn} do
      conn = conn |> log_in_user(user_fixture()) |> get(~p"/users/register")

      assert redirected_to(conn) == ~p"/"
    end
  end

  describe "POST /users/register" do
    @tag :capture_log
    test "creates account but does not log in", %{conn: conn} do
      email = unique_user_email()

      conn =
        post(conn, ~p"/users/register", %{
          "user" => valid_user_attributes(email: email)
        })

      refute get_session(conn, :user_token)
      assert redirected_to(conn) == ~p"/users/log-in"

      assert conn.assigns.flash["info"] =~
               ~r/An email was sent to .*, please access it to confirm your account/
    end

    test "render errors for invalid data", %{conn: conn} do
      conn =
        post(conn, ~p"/users/register", %{
          "user" => %{"email" => "with spaces"}
        })

      assert_inertia_page(conn, "Auth/Register")
      assert_inertia_props(conn, [:errors])
      assert Phoenix.Flash.get(conn.assigns.flash, :error) == "Please fix the errors below."
    end
  end
end
