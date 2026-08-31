defmodule NbPingcrm.MixProject do
  use Mix.Project

  def project do
    [
      app: :nb_pingcrm,
      version: "0.1.0",
      elixir: "~> 1.20",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps(),
      compilers: [:phoenix_live_view] ++ Mix.compilers(),
      listeners: [Phoenix.CodeReloader]
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {NbPingcrm.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  def cli do
    [
      preferred_envs: [precommit: :test]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:deno_rider, "~> 0.2"},
      {:tidewave, "~> 0.9", only: [:dev]},
      {:bcrypt_elixir, "~> 3.0"},
      {:inertia, "~> 2.6"},
      {:phoenix, "~> 1.8.13"},
      {:phoenix_ecto, "~> 4.5"},
      {:ecto_sql, "~> 3.14"},
      {:postgrex, "~> 0.22.4"},
      {:phoenix_html, "~> 4.1"},
      {:phoenix_live_reload, "~> 1.7", only: :dev},
      {:phoenix_live_view, "~> 1.2.11"},
      {:lazy_html, "~> 0.1.12", only: :test},
      {:phoenix_live_dashboard, "~> 0.9"},
      {:heroicons,
       github: "tailwindlabs/heroicons",
       tag: "v2.2.0",
       sparse: "optimized",
       app: false,
       compile: false,
       depth: 1},
      {:swoosh, "~> 1.28"},
      {:req, "~> 0.5"},
      {:telemetry_metrics, "~> 1.2"},
      {:telemetry_poller, "~> 1.0"},
      {:gettext, "~> 1.0"},
      {:jason, "~> 1.2"},
      {:dns_cluster, "~> 0.3"},
      {:bandit, "~> 1.12"},
      # nb stack (local paths for development)
      {:nb_stack, [path: "../nb_stack", override: true]},
      {:nb_vite, path: "../nb_vite", override: true},
      {:nb_inertia, path: "../nb_inertia", override: true},
      {:nb_routes, path: "../nb_routes", override: true},
      {:nb_serializer, path: "../nb_serializer", override: true},
      {:nb_ts, path: "../nb_ts", override: true},
      {:nb_flop, path: "../nb_flop", override: true},
      {:flop, "~> 0.28"},
      {:csv, "~> 3.2"},
      {:igniter, "~> 0.8"},
      {:wallaby, "~> 0.31", runtime: false, only: :test},
      {:credo, "~> 1.7.19", only: [:dev, :test], runtime: false}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ecto.setup", "assets.setup", "assets.build"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"],
      "assets.setup": ["nb_vite.deps"],
      "assets.build": ["compile", "nb_vite.deps", "nb_vite build"],
      "assets.deploy": [
        "compile",
        "nb_vite.deps",
        "nb_vite build",
        "phx.digest"
      ],
      "test.e2e": [
        "ecto.create --quiet",
        "ecto.migrate --quiet",
        "assets.build",
        "test --include feature"
      ],
      precommit: ["compile --warnings-as-errors", "deps.unlock --unused", "format", "test"],
      "ts.gen": ["nb_ts.gen"]
    ]
  end
end
