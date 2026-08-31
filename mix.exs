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
      usage_rules: usage_rules(),
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
      # nb stack (GitHub commit pins for reproducible integration testing)
      {:nb_stack,
       github: "nordbeam/nb_stack",
       ref: "55e922d789d33775a016bc27f37303898e1e3f56",
       override: true},
      {:nb_vite,
       github: "nordbeam/nb_vite", ref: "4f0c73d5e796431ba72b9f30614c67d778361aa9", override: true},
      {:nb_inertia,
       github: "nordbeam/nb_inertia",
       ref: "5213e3f82598e8eff7d3777a34de9249a4e97231",
       override: true},
      {:nb_routes,
       github: "nordbeam/nb_routes",
       ref: "a1f0c254cdc7b197491a966e61113bbf71a6bc4d",
       override: true},
      {:nb_serializer,
       github: "nordbeam/nb_serializer",
       ref: "7a8a506541e044c2051831ec705c92cd31f344da",
       override: true},
      {:nb_ts,
       github: "nordbeam/nb_ts", ref: "7ce935c272a6eb04f8888ee7eca5a255421eacc4", override: true},
      {:nb_flop,
       github: "nordbeam/nb_flop", ref: "538a44c99ed2699eff76e0fff1e64b16180299bd", override: true},
      {:flop, "~> 0.28"},
      {:csv, "~> 3.2"},
      {:igniter, "~> 0.8"},
      {:usage_rules, "~> 1.2", only: :dev, runtime: false},
      {:wallaby, "~> 0.31", runtime: false, only: :test},
      {:credo, "~> 1.7.19", only: [:dev, :test], runtime: false}
    ]
  end

  defp usage_rules do
    [
      skills: [
        location: ".agents/skills",
        package_skills: [~r/^nb_/]
      ]
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
