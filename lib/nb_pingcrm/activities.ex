defmodule NbPingcrm.Activities do
  @moduledoc """
  Context for managing CRM activities (audit trail).
  """

  import Ecto.Query, warn: false
  alias NbPingcrm.Activities.Activity
  alias NbPingcrm.Broadcaster
  alias NbPingcrm.Repo

  @doc """
  Lists recent activities for an account.
  """
  def list_recent_activities(account_id, limit \\ 20) do
    Activity
    |> where([a], a.account_id == ^account_id)
    |> order_by([a], desc: a.inserted_at)
    |> limit(^limit)
    |> preload(:user)
    |> Repo.all()
  end

  @doc """
  Creates an activity and broadcasts it.
  """
  def create_activity(attrs) do
    result =
      %Activity{}
      |> Activity.changeset(attrs)
      |> Repo.insert()

    with {:ok, activity} <- result do
      activity = Repo.preload(activity, :user)
      Broadcaster.broadcast_activity_created(activity)
      {:ok, activity}
    end
  end

  @doc """
  Records a contact activity.
  """
  def record_contact_activity(contact, action, user_id \\ nil) do
    create_activity(%{
      action: action,
      resource_type: "contact",
      resource_id: contact.id,
      resource_name: "#{contact.first_name} #{contact.last_name}",
      account_id: contact.account_id,
      user_id: user_id
    })
  end

  @doc """
  Records an organization activity.
  """
  def record_organization_activity(organization, action, user_id \\ nil) do
    create_activity(%{
      action: action,
      resource_type: "organization",
      resource_id: organization.id,
      resource_name: organization.name,
      account_id: organization.account_id,
      user_id: user_id
    })
  end

  @doc """
  Records a user activity.
  """
  def record_user_activity(user, action, actor_id \\ nil) do
    create_activity(%{
      action: action,
      resource_type: "user",
      resource_id: user.id,
      resource_name: "#{user.first_name} #{user.last_name}",
      account_id: user.account_id,
      user_id: actor_id
    })
  end
end
