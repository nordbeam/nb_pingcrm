import Config

# Only in tests, remove the complexity from the password hashing algorithm
config :bcrypt_elixir, :log_rounds, 1

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :nb_pingcrm, NbPingcrm.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "nb_pingcrm_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: System.schedulers_online() * 2

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :nb_pingcrm, NbPingcrmWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  check_origin: false,
  secret_key_base: "h3bNsX7ELMnf9WjLfJu1PUTaF/lmUxhxeKr0ZEFW11CL9jZq5JtU+r+RnZtoRbFW",
  server: true

# In test we don't send emails
config :nb_pingcrm, NbPingcrm.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Enable helpful, but potentially expensive runtime checks
config :phoenix_live_view,
  enable_expensive_runtime_checks: true

config :nb_inertia,
  env: :test,
  ssr: false,
  raise_on_ssr_failure: false

config :wallaby,
  otp_app: :nb_pingcrm,
  base_url: "http://localhost:4002",
  driver: Wallaby.Chrome,
  screenshot_on_failure: true,
  chromedriver: [
    headless: true,
    capabilities: %{
      chromeOptions: %{
        args: [
          "--no-sandbox",
          "window-size=1440,1200",
          "--disable-gpu",
          "--headless",
          "--fullscreen",
          "--disable-dev-shm-usage",
          "--user-agent=Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
        ]
      }
    }
  ]

config :nb_pingcrm, :sandbox, Ecto.Adapters.SQL.Sandbox
