---
name: nb-stack
description: "Install, configure, upgrade, diagnose, and verify the NbStack meta-installer, its Vite+ toolchain, and coordinated Phoenix frontend packages."
metadata:
  managed-by: usage-rules
---


<!-- usage-rules-skill-start -->
# NbStack

Use this skill when a Phoenix application needs the `nb_stack` meta-package or
a coordinated setup of the Nordbeam frontend packages. NbStack is an
installer/orchestration layer, not a runtime replacement for the packages it
composes.

## Discover the target release

- Inspect the target application's `mix.exs`, `mix.lock`, `assets/package.json`,
  package-manager lockfile, config, router, and Vite+ configuration.
- Read the selected `nb_stack` README and `lib/mix/tasks/nb_stack.install.ex`.
  The task schema, composed installers, dependency sources, and defaults are
  the release contract.
- Keep package boundaries intact. Child packages remain independently
  optional unless the selected installer says otherwise.

## Install and configure

- Use the documented `mix igniter.install nb_stack` task and pass only flags
  exposed by the selected release.
- Let the installer add dependencies, compose child installers, and generate
  integration files. Preserve existing app-owned frontend configuration.
- Verify `:nb_routes`, `:nb_serializer`, `:nb_ts`, `:nb_inertia`, `:nb_vite`,
  and optional `:nb_flop` configuration against generated output.
- Use a child package's skill for substantial package-specific customization.

## Upgrade and verify

- Compare the locked stack and child package versions with the target release's
  task source and changelog before rerunning an installer.
- After mode changes, regenerate routes and types with the current tasks and
  review stale artifacts before removing anything.
- Run `mix deps.get`, `mix compile`, relevant `mix test`, and the configured
  Vite+ checks/build. For SSR or table integrations, exercise their documented
  verification path too.
<!-- usage-rules-skill-end -->
