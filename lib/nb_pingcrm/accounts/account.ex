defmodule NbPingcrm.Accounts.Account do
  @moduledoc """
  Account schema representing a tenant in the multi-tenant application.
  """
  use Ecto.Schema
  import Ecto.Changeset

  schema "accounts" do
    field(:name, :string)

    has_many(:users, NbPingcrm.Accounts.User)
    # has_many :organizations - added when CRM context is created
    # has_many :contacts - added when CRM context is created

    timestamps(type: :utc_datetime)
  end

  def changeset(account, attrs) do
    account
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
