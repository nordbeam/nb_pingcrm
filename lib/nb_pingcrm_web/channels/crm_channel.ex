defmodule NbPingcrmWeb.CrmChannel do
  @moduledoc """
  Channel for CRM real-time updates including:
  - Dashboard live stats
  - Activity feed
  - User presence
  - Record updates
  """
  use Phoenix.Channel

  alias NbPingcrmWeb.Presence

  @impl true
  def join("crm:lobby", _params, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def join("crm:contacts", _params, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def join("crm:organizations", _params, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def join("crm:users", _params, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  # Per-record channels for collaborative editing
  def join("crm:contact:" <> id, _params, socket) do
    send(self(), :after_join)
    {:ok, assign(socket, :record_id, id)}
  end

  def join("crm:organization:" <> id, _params, socket) do
    send(self(), :after_join)
    {:ok, assign(socket, :record_id, id)}
  end

  def join("crm:user:" <> id, _params, socket) do
    send(self(), :after_join)
    {:ok, assign(socket, :record_id, id)}
  end

  @impl true
  def handle_info(:after_join, socket) do
    # Track user presence
    if user = socket.assigns[:current_user] do
      {:ok, _} =
        Presence.track(socket, user.id, %{
          user_id: user.id,
          name: "#{user.first_name} #{user.last_name}",
          email: user.email,
          online_at: System.system_time(:second)
        })

      push(socket, "presence_state", Presence.list(socket))
    end

    {:noreply, socket}
  end

  # Handle typing indicator broadcasts
  @impl true
  def handle_in("typing", %{"typing" => typing}, socket) do
    if user = socket.assigns[:current_user] do
      broadcast_from!(socket, "user_typing", %{
        user_id: user.id,
        name: "#{user.first_name} #{user.last_name}",
        typing: typing
      })
    end

    {:noreply, socket}
  end

  # Handle editing indicator broadcasts
  def handle_in("editing", params, socket) do
    if user = socket.assigns[:current_user] do
      broadcast_from!(socket, "user_editing", %{
        user_id: user.id,
        name: "#{user.first_name} #{user.last_name}",
        editing: params["editing"],
        field: params["field"]
      })
    end

    {:noreply, socket}
  end
end
