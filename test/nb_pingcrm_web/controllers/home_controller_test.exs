defmodule NbPingcrmWeb.HomeControllerTest do
  use NbPingcrmWeb.ConnCase

  test "GET / redirects unauthenticated users to log in", %{conn: conn} do
    conn = get(conn, ~p"/")
    assert redirected_to(conn) == ~p"/users/log-in"
  end

  test "GET / renders the dashboard for authenticated users", %{conn: conn} do
    %{conn: conn} = register_and_log_in_user(%{conn: conn})

    conn = inertia_get(conn, ~p"/")

    assert conn.status == 200
    assert_inertia_page(conn, "Dashboard")
    assert_inertia_props(conn, [:stats, :activities, :user, :account])
  end
end
