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
      # nb stack (GitHub commit pins for reproducible integration testing)
      {:nb_stack,
       github: "nordbeam/nb_stack",
       ref: "f3679534481227306073f3869d23b1202e361ef2",
       override: true},
      {:nb_vite,
       github: "nordbeam/nb_vite", ref: "b523cf75f795baae8b34a41cf7650f6ef5d0b8db", override: true},
      {:nb_inertia,
       github: "nordbeam/nb_inertia",
       ref: "3eb9f6d30bcf2cd7fd46d6c1ec22458ae203b603",
       override: true},
      {:nb_routes,
       github: "nordbeam/nb_routes",
       ref: "ef01c5632d78755903a7da6fb2ef282c5452d443",
       override: true},
      {:nb_serializer,
       github: "nordbeam/nb_serializer",
       ref: "7813a785c14d45722e49c616288cf70f41ac3764",
       override: true},
      {:nb_ts,
       github: "nordbeam/nb_ts", ref: "7c43b1743b8b6ea25248cee134327184cc0a4985", override: true},
      {:nb_flop,
       github: "nordbeam/nb_flop", ref: "aaba97d1e76d2c5bf2875adb7833e25bc5ad1b91", override: true},
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
