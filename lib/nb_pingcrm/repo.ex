defmodule NbPingcrm.Repo do
  use Ecto.Repo,
    otp_app: :nb_pingcrm,
    adapter: Ecto.Adapters.Postgres
end
