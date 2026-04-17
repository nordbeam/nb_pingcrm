defmodule NbPingcrmWeb.UserSocket do
  @moduledoc """
  Phoenix Socket for real-time CRM features.

  Authenticates users via session token and provides channels for:
  - Dashboard live stats
  - Activity feed
  - User presence
  - Collaborative editing
  """
  use Phoenix.Socket

  alias NbPingcrm.Accounts

  # CRM channels
  channel "crm:*", NbPingcrmWeb.CrmChannel

  @impl true
  def connect(_params, socket, connect_info) do
    # Get user from session token
    case get_user_from_session(connect_info) do
      {:ok, user} ->
        {:ok, assign(socket, :current_user, user)}

      :error ->
        # Allow anonymous connections for public pages
        {:ok, socket}
    end
  end

  @impl true
  def id(socket) do
    case socket.assigns[:current_user] do
      nil -> nil
      user -> "user_socket:#{user.id}"
    end
  end

  defp get_user_from_session(connect_info) do
    with %{session: session} <- connect_info,
         token when is_binary(token) <- session["user_token"],
         {user, _token_inserted_at} <- Accounts.get_user_by_session_token(token) do
      {:ok, user}
    else
      _ -> :error
    end
  end
end
