defmodule NbPingcrmWeb.Presence do
  @moduledoc """
  Presence tracking for CRM real-time features.

  Tracks which users are online and what pages/records they're viewing.
  """
  use Phoenix.Presence,
    otp_app: :nb_pingcrm,
    pubsub_server: NbPingcrm.PubSub
end
