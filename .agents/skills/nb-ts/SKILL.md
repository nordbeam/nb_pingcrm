---
name: nb-ts
description: "Generate and validate TypeScript from nb serializers, Inertia pages, JSON contracts, Flop tables, RPC metadata, and the ~TS escape hatch."
metadata:
  managed-by: usage-rules
---


<!-- usage-rules-skill-start -->
# NbTs

Use this skill for `nb_ts` installation, compile-time or manual type generation, `~TS` fragments, generated API clients/types, incremental discovery, and validation of types emitted from optional nb packages.

## Discover the target release

- Inspect the target app's `mix.exs`, `mix.lock`, `config/config.exs`, `assets/tsconfig.json`, `assets/package.json`/lockfile, generated type directory, Mix compiler list/aliases, and compiled companion packages. Read the selected README, installer/gen tasks, generator options, and discovery modules before relying on a source or generated filename.
- Serializer, Inertia, JSON, Flop, and RPC discovery are adapters, not guaranteed dependencies. Keep each integration optional and use only adapters exported by the installed release.
- If docs or release notes label features as Pitch 1 or Pitch 3, detect those capabilities in the selected version's source, task schema, generated files, or package exports before demonstrating them. Never present an undetected API as available.

## Install and generate

- Prefer `mix igniter.install nb_ts`, optionally with the current task's `--output-dir` and `--yes`. It should configure `:nb_ts`, create the output directory, update `tsconfig.json` when supported, and add a generation alias; verify each result rather than assuming it.
- Use the task exposed by the target version, commonly `mix nb_ts.gen` (or a configured `mix ts.gen` alias), with only supported `--output-dir`, `--validate`, and `--verbose` options. If the version has a tsgo download task, use its documented version/platform controls and inspect the binary source before changing it.
- Automatic generation requires the target Mix compiler/config. Manual generation is safer for a first diagnosis; preserve generated files according to the app's source-control policy.

## Implement and configure

- Define normal contracts with the Elixir-native DSL from the companion package, then let NbTs discover them. Use `import NbTs.Sigil` and `~TS"..."` only for TypeScript constructs the native helpers cannot express; the target version may validate fragments with tsgo.
- Verify output naming, namespaces, index exports, optionality, serializer imports, API-client files, table row types, modal/form types, and RPC router types from generated artifacts. Do not assume all are emitted merely because a companion package is installed.
- Keep `output_dir`, `tsconfig` includes/paths, aliases, and frontend imports aligned. Do not hand-edit generated interfaces or API clients to mask a source contract error.

## Upgrade or migrate

- Compare locked versions, generated output, `tsconfig.json`, compiler order, tsgo version/binaries, and companion package metadata before upgrading. Regenerate in a clean output directory when names or discovery rules change, then update consumers intentionally.
- Watch for changed optionality semantics, namespace/collision rules, index exports, serializer/reference imports, and API-client options. Preserve optional dependency boundaries and avoid making a package required solely for type generation.
- If incremental output is stale, follow the target dependency-tracker/manifest behavior; a full generation is a diagnostic fallback, not a reason to delete unrelated files.

## Diagnose and verify

- For no output, ensure modules were compiled/loaded, the app and companion packages are discoverable, output config is active, and any compile hook/supervisor is ready. For invalid TypeScript, run the target generator with validation and inspect the first source contract reported.
- For missing serializer/Inertia/JSON/Flop/RPC types, check that the installed release exports the relevant discovery signature and that the companion module was compiled, not merely declared in `mix.exs`.
- Verify with `mix deps.get`, `mix compile`, `mix nb_ts.gen --validate` (or the target equivalent), a strict frontend TypeScript check, and focused tests for generated exports and representative contracts.
- If “latest” is requested, consult current package source/HexDocs, official TypeScript/tsgo documentation, and the installed companion package release notes; state the date checked and reconcile with lockfiles.
<!-- usage-rules-skill-end -->
