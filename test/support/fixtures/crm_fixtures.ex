defmodule NbPingcrm.CRMFixtures do
  @moduledoc """
  Test helpers for creating CRM records within an existing account.
  """

  alias NbPingcrm.Accounts
  alias NbPingcrm.CRM

  def organization_fixture(account_id, attrs \\ %{}) do
    unique = System.unique_integer([:positive])

    params =
      Enum.into(attrs, %{
        name: "Organization #{unique}",
        email: "organization#{unique}@example.com",
        city: "Casablanca"
      })

    {:ok, organization} =
      CRM.create_organization(account_id, params)

    organization
  end

  def contact_fixture(account_id, attrs \\ %{}) do
    unique = System.unique_integer([:positive])

    params =
      Enum.into(attrs, %{
        first_name: "Contact",
        last_name: "User#{unique}",
        email: "contact#{unique}@example.com",
        city: "Casablanca"
      })

    {:ok, contact} =
      CRM.create_contact(account_id, params)

    contact
  end

  def account_user_fixture(account_id, attrs \\ %{}) do
    unique = System.unique_integer([:positive])

    params =
      Enum.into(attrs, %{
        first_name: "Team",
        last_name: "Member#{unique}",
        email: "teammember#{unique}@example.com",
        password: "supersecret123"
      })

    {:ok, user} =
      Accounts.create_user(account_id, params)

    user
  end
end
