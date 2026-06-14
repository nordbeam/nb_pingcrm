defmodule NbPingcrmWeb.FeatureCase do
  @moduledoc """
  Test case template for browser-based end-to-end tests.
  """

  use ExUnit.CaseTemplate

  import NbInertia.WallabyHelpers
  import Wallaby.Query

  alias NbPingcrm.Accounts
  alias NbPingcrm.AccountsFixtures
  alias NbPingcrm.CRMFixtures

  using do
    quote do
      use Wallaby.Feature

      import Wallaby.Query
      import NbInertia.WallabyHelpers
      import NbPingcrmWeb.FeatureCase

      alias NbPingcrm.AccountsFixtures
    end
  end

  def user_with_password_fixture(attrs \\ %{}) do
    user = AccountsFixtures.user_fixture(attrs)
    password = browser_test_password()

    {:ok, {user, _expired_tokens}} =
      Accounts.update_user_password(user, %{password: password})

    user
  end

  def log_in_user(session, user) do
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
  end

  def browser_test_password, do: "supersecret123"

  def organization_fixture(account_id, attrs \\ %{}) do
    CRMFixtures.organization_fixture(account_id, attrs)
  end

  def contact_fixture(account_id, attrs \\ %{}) do
    CRMFixtures.contact_fixture(account_id, attrs)
  end

  def account_user_fixture(account_id, attrs \\ %{}) do
    CRMFixtures.account_user_fixture(account_id, attrs)
  end
end
