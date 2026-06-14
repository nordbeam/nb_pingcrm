defmodule NbPingcrmWeb.AuthenticationFeatureTest do
  use NbPingcrmWeb.FeatureCase, async: false

  @moduletag :feature

  feature "user can sign in from the browser and land on the dashboard", %{
    session: session
  } do
    user = user_with_password_fixture()

    session
    |> inertia_visit("/users/log-in")
    |> assert_inertia_component("Auth/Login")
    |> fill_inertia_form(
      email: user.email,
      password: browser_test_password()
    )
    |> submit_form(button("Sign in"))
    |> assert_path("/")
    |> assert_inertia_component("Dashboard")
    |> assert_inertia_prop("user.email", user.email)
    |> assert_text("Recent Activity")
    |> assert_text("Quick Actions")
  end
end
