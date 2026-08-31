# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :nb_ts,
  output_dir: "assets/js/types",
  emit: [:interfaces, :zod],
  page_props_augmentation: true,
  page_registry: true

config :nb_serializer, camelize_props: true

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
  with_forms: true,
  style: :resource

config :flop, repo: NbPingcrm.Repo

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

# Configures Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
