# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :nb_pingcrm, :scopes,
  user: [
    default: true,
    module: NbPingcrm.Accounts.Scope,
    assign_key: :current_scope,
    access_path: [:user, :id],
    schema_key: :user_id,
    schema_type: :id,
    schema_table: :users,
    test_data_fixture: NbPingcrm.AccountsFixtures,
    test_setup_helper: :register_and_log_in_user
  ]

config :nb_inertia, camelize_props: true, endpoint: NbPingcrmWeb.Endpoint, ssr: true
config :nb_vite, otp_app: :nb_pingcrm

config :nb_routes,
  router: NbPingcrmWeb.Router,
  variant: :rich,
  with_methods: true,
  with_forms: true

config :flop, repo: NbPingcrm.Repo

config :bun,
  version: "1.3.0",
  dev: [
    args: ["run", "dev"],
    cd: Path.expand("../assets", __DIR__),
    env: %{
      "PHX_BUILD_PATH" => Mix.Project.build_path(),
      "PHX_APP_NAME" => "nb_pingcrm",
      "PHX_VERSION" => "1.8"
    }
  ],
  build: [
    args: ["run", "build"],
    cd: Path.expand("../assets", __DIR__),
    env: %{
      "PHX_BUILD_PATH" => Mix.Project.build_path(),
      "PHX_APP_NAME" => "nb_pingcrm",
      "PHX_VERSION" => "1.8"
    }
  ],
  assets: [
    args: [],
    cd: Path.expand("../assets", __DIR__)
  ]

config :nb_pingcrm,
  ecto_repos: [NbPingcrm.Repo],
  generators: [timestamp_type: :utc_datetime]

# Configures the endpoint
config :nb_pingcrm, NbPingcrmWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: NbPingcrmWeb.ErrorHTML, json: NbPingcrmWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: NbPingcrm.PubSub,
  live_view: [signing_salt: "RNluCcXp"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :nb_pingcrm, NbPingcrm.Mailer, adapter: Swoosh.Adapters.Local

# Configure esbuild (the version is required)
config :esbuild,
  version: "0.25.4",
  nb_pingcrm: [
    args:
      ~w(js/app.js --bundle --target=es2022 --outdir=../priv/static/assets/js --external:/fonts/* --external:/images/* --alias:@=.),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => [Path.expand("../deps", __DIR__), Mix.Project.build_path()]}
  ]

# Configure tailwind (the version is required)
config :tailwind,
  version: "4.1.7",
  nb_pingcrm: [
    args: ~w(
      --input=assets/css/app.css
      --output=priv/static/assets/css/app.css
    ),
    cd: Path.expand("..", __DIR__)
  ]

# Configures Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
