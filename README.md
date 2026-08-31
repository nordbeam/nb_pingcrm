# NbPingcrm

To start your Phoenix server:

* Run `mix setup` to install and setup dependencies
* Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Frontend checks

The frontend uses Vite+ and npm 12. Run its checks from `assets/`:

```bash
corepack npm@12.0.2 ci
vp check
corepack npm@12.0.2 run types:check
corepack npm@12.0.2 run build:budget
```

`build:budget` builds the client and SSR bundles, then checks the initial
Inertia CSS/JavaScript graph and SSR gzip sizes against absolute limits and the
checked-in baseline. After reviewing an intentional size change, update that
baseline with `node scripts/check-bundle-size.mjs --update-baseline`.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

* Official website: https://www.phoenixframework.org/
* Guides: https://hexdocs.pm/phoenix/overview.html
* Docs: https://hexdocs.pm/phoenix
* Forum: https://elixirforum.com/c/phoenix-forum
* Source: https://github.com/phoenixframework/phoenix
