# NbTs validation and tsgo provisioning

## Provisioning

`mix nb_ts.gen --validate` and `~TS` validation use the platform-specific
`tsgo` executable. NbTs does not fetch a binary during application startup,
compilation, or a failed validation. Provision the pinned release explicitly
after reviewing the source and network policy:

```bash
# Current host platform (default)
mix nb_ts.download_tsgo

# Explicit platform(s), or all release artifacts
TSGO_PLATFORMS=linux-amd64 mix nb_ts.download_tsgo
mix nb_ts.download_tsgo --platforms darwin-arm64,linux-arm64
mix nb_ts.download_tsgo --all
```

`TSGO_VERSION` or `--version` selects a release intentionally; do not use an
unreviewed moving URL. For a build image that manages the compiler itself:

```elixir
config :nb_ts, :tsgo_binary_path, "/opt/tooling/tsgo"
```

To inspect the selected path without downloading anything:

```bash
mix run --no-start -e 'IO.puts(NbTs.TsgoPool.binary_path())'
```

## Formatting generated output

Vite+ projects can make generation formatter-clean without changing every
compile. Run one explicit pass after generation:

```bash
mix nb_ts.gen --format --validate
```

For already-generated output:

```bash
mix nb_ts.format --output-dir assets/js/types
```

NbTs resolves a configured `:formatter`, `vp` on `PATH`, or the project's
`node_modules/.bin/vp`. It invokes `vp fmt --write` once and never installs or
downloads a formatter. Keep automatic compile-hook generation enabled for
incremental updates, then run the explicit format command before a frontend
check or commit.

## Cross-package validation

Compile and load the host plus optional producers before generating:

```bash
mix deps.get
mix compile --warnings-as-errors
mix nb_ts.gen --zod --validate
```

If the app uses NbSerializer, NbInertia, NbJson, NbFlop, or RPC metadata,
confirm each package is compiled and that its generated files are inside the
configured `output_dir`. Validate the entire directory, not a single file:
local imports are flattened into one tsgo bundle, and runtime Zod schema
values are ordered according to their local import dependencies. This covers
common chains such as page props -> `UserSchema`, Flop metadata ->
`FlopParamsSchema` -> filter schema, and table actions ->
`TableConfirmationSchema`.

Run the frontend checker separately as well; synthetic tsgo validation stubs
do not replace the application's real Zod, Inertia, React, or package module
resolution:

```bash
cd assets
vp check
tsc --noEmit
```

## Recovery

1. Read the first validation diagnostic and identify its generated source file.
2. If it says the binary is missing, provision the detected platform explicitly
   or set `:tsgo_binary_path`; no pool restart or automatic download is needed.
3. If types are missing or stale, run `mix compile --force`, confirm optional
   companion packages are loaded, and rerun `mix nb_ts.gen --validate`.
4. If output names or imports changed after an upgrade, generate into a clean
   temporary directory first and compare it with the tracked output. Preserve
   unrelated generated files according to the app's source-control policy.
5. Once the bundle is valid, run the focused generator tests and the full
   package test suite before committing generated output.
