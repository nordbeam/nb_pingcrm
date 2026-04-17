defmodule NbPingcrm.Activities.Activity do
  @moduledoc """
  Schema for tracking CRM activities (audit trail).
  """
  use Ecto.Schema
  import Ecto.Changeset

  alias NbPingcrm.Accounts.{Account, User}

  schema "activities" do
    field :action, :string
    field :resource_type, :string
    field :resource_id, :integer
    field :resource_name, :string
    field :metadata, :map, default: %{}

    belongs_to :user, User
    belongs_to :account, Account

    timestamps(updated_at: false)
  end

  @required_fields [:action, :resource_type, :resource_id, :account_id]
  @optional_fields [:resource_name, :metadata, :user_id]

  def changeset(activity, attrs) do
    activity
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_inclusion(:action, ~w(created updated deleted restored))
    |> validate_inclusion(:resource_type, ~w(contact organization user))
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:account_id)
  end
end
