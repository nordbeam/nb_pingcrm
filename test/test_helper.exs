Enum.each(
  [
    Path.expand("../priv/hot", __DIR__),
    Path.expand("../assets/priv/ssr-hot", __DIR__)
  ],
  &File.rm_rf!/1
)

ExUnit.start(exclude: [:feature])
Ecto.Adapters.SQL.Sandbox.mode(NbPingcrm.Repo, :manual)
Application.put_env(:wallaby, :base_url, NbPingcrmWeb.Endpoint.url())
{:ok, _} = Application.ensure_all_started(:wallaby)
