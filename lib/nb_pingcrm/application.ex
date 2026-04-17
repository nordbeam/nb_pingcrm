defmodule NbPingcrm.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      NbPingcrmWeb.Telemetry,
      NbPingcrm.Repo,
      {DNSCluster, query: Application.get_env(:nb_pingcrm, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: NbPingcrm.PubSub},
      # Presence tracking for real-time features
      NbPingcrmWeb.Presence,
      # Start a worker by calling: NbPingcrm.Worker.start_link(arg)
      # {NbPingcrm.Worker, arg},
      # SSR support for Inertia.js
      NbInertia.SSR,
      # Start to serve requests, typically the last entry
      NbPingcrmWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: NbPingcrm.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    NbPingcrmWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
