defmodule NbPingcrm.Broadcaster do
  @moduledoc """
  Broadcasts CRM events via Phoenix PubSub for real-time updates.

  Uses NbInertia.Realtime for automatic serialization of broadcast payloads.
  """
  use NbInertia.Realtime, endpoint: NbPingcrmWeb.Endpoint

  alias NbPingcrmWeb.Serializers.{
    ActivitySerializer,
    ContactSerializer,
    OrganizationSerializer,
    UserSerializer
  }

  # Topics
  @lobby "crm:lobby"
  @contacts "crm:contacts"
  @organizations "crm:organizations"
  @users "crm:users"

  ## Contacts

  def broadcast_contact_created(contact) do
    contact = preload_contact(contact)

    broadcast(@lobby, "contact_created", contact: {ContactSerializer, contact})
    broadcast(@contacts, "contact_created", contact: {ContactSerializer, contact})
    broadcast_stats_updated()
  end

  def broadcast_contact_updated(contact) do
    contact = preload_contact(contact)

    broadcast(@lobby, "contact_updated", contact: {ContactSerializer, contact})
    broadcast(@contacts, "contact_updated", contact: {ContactSerializer, contact})

    broadcast("crm:contact:#{contact.id}", "contact_updated",
      contact: {ContactSerializer, contact}
    )
  end

  def broadcast_contact_deleted(contact) do
    broadcast(@lobby, "contact_deleted", id: contact.id)
    broadcast(@contacts, "contact_deleted", id: contact.id)
    broadcast("crm:contact:#{contact.id}", "contact_deleted", id: contact.id)
    broadcast_stats_updated()
  end

  def broadcast_contact_restored(contact) do
    contact = preload_contact(contact)

    broadcast(@lobby, "contact_restored", contact: {ContactSerializer, contact})
    broadcast(@contacts, "contact_restored", contact: {ContactSerializer, contact})
    broadcast_stats_updated()
  end

  defp preload_contact(contact) do
    NbPingcrm.Repo.preload(contact, :organization)
  end

  ## Organizations

  def broadcast_organization_created(organization) do
    broadcast(@lobby, "organization_created",
      organization: {OrganizationSerializer, organization}
    )

    broadcast(@organizations, "organization_created",
      organization: {OrganizationSerializer, organization}
    )

    broadcast_stats_updated()
  end

  def broadcast_organization_updated(organization) do
    broadcast(@lobby, "organization_updated",
      organization: {OrganizationSerializer, organization}
    )

    broadcast(@organizations, "organization_updated",
      organization: {OrganizationSerializer, organization}
    )

    broadcast("crm:organization:#{organization.id}", "organization_updated",
      organization: {OrganizationSerializer, organization}
    )
  end

  def broadcast_organization_deleted(organization) do
    broadcast(@lobby, "organization_deleted", id: organization.id)
    broadcast(@organizations, "organization_deleted", id: organization.id)
    broadcast("crm:organization:#{organization.id}", "organization_deleted", id: organization.id)
    broadcast_stats_updated()
  end

  def broadcast_organization_restored(organization) do
    broadcast(@lobby, "organization_restored",
      organization: {OrganizationSerializer, organization}
    )

    broadcast(@organizations, "organization_restored",
      organization: {OrganizationSerializer, organization}
    )

    broadcast_stats_updated()
  end

  ## Users

  def broadcast_user_created(user) do
    broadcast(@lobby, "user_created", user: {UserSerializer, user})
    broadcast(@users, "user_created", user: {UserSerializer, user})
    broadcast_stats_updated()
  end

  def broadcast_user_updated(user) do
    broadcast(@lobby, "user_updated", user: {UserSerializer, user})
    broadcast(@users, "user_updated", user: {UserSerializer, user})
    broadcast("crm:user:#{user.id}", "user_updated", user: {UserSerializer, user})
  end

  def broadcast_user_deleted(user) do
    broadcast(@lobby, "user_deleted", id: user.id)
    broadcast(@users, "user_deleted", id: user.id)
    broadcast("crm:user:#{user.id}", "user_deleted", id: user.id)
    broadcast_stats_updated()
  end

  def broadcast_user_restored(user) do
    broadcast(@lobby, "user_restored", user: {UserSerializer, user})
    broadcast(@users, "user_restored", user: {UserSerializer, user})
    broadcast_stats_updated()
  end

  ## Activities

  def broadcast_activity_created(activity) do
    broadcast(@lobby, "activity_created", activity: {ActivitySerializer, activity})
  end

  ## Stats

  defp broadcast_stats_updated do
    # Broadcast to lobby that stats need refresh
    # The client will use Inertia reload for the actual stats
    broadcast(@lobby, "stats_updated", %{})
  end
end
