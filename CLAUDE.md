# CLAUDE.md - nb_pingcrm

Developer guidance for Claude Code when working with nb_pingcrm - a PingCRM clone built with the nb stack.

## Project Overview

**nb_pingcrm** is a Phoenix/React port of the official Inertia.js PingCRM demo application, built using the nb stack packages. It demonstrates best practices for building modern Phoenix applications with:

- **nb_vite**: Vite build integration with HMR
- **nb_inertia**: Inertia.js integration with enhanced components
- **nb_routes**: Type-safe route helpers (rich mode)
- **nb_serializer**: Declarative JSON serialization
- **nb_ts**: Automatic TypeScript type generation
- **nb_flop**: Pagination, sorting, and filtering

## Key Commands

```bash
# Start development server
mix phx.server

# Run tests
mix test

# Generate TypeScript types (auto-runs on compile)
mix nb_ts.gen.types

# Generate route helpers (auto-runs via Vite plugin)
mix nb_routes.gen

# Database operations
mix ecto.migrate
mix ecto.reset

# Format code
mix format

# Install dependencies
mix deps.get
cd assets && bun install
```

## Architecture

### Directory Structure

```
nb_pingcrm/
├── lib/
│   ├── nb_pingcrm/              # Business logic (contexts)
│   │   ├── accounts/            # Users, accounts
│   │   │   ├── account.ex
│   │   │   ├── user.ex
│   │   │   └── user_token.ex
│   │   ├── crm/                 # Organizations, contacts
│   │   │   ├── organization.ex
│   │   │   └── contact.ex
│   │   ├── accounts.ex          # Accounts context
│   │   └── crm.ex               # CRM context
│   └── nb_pingcrm_web/          # Web layer
│       ├── controllers/         # Phoenix controllers
│       ├── inertia_shared/      # NbInertia.SharedProps modules (auto-gen TS types)
│       ├── plugs/               # Custom plugs (e.g., InertiaSharedProps)
│       ├── serializers/         # nb_serializer definitions
│       └── router.ex
├── assets/
│   └── js/
│       ├── pages/               # Inertia page components
│       ├── layouts/             # Layout components
│       ├── components/          # Reusable components
│       │   ├── ui/              # shadcn/ui components
│       │   └── flop/            # Flop components
│       ├── types/               # Auto-generated TypeScript types
│       ├── lib/
│       │   └── inertia.ts       # Enhanced Inertia exports
│       ├── routes.js            # Auto-generated route helpers
│       └── app.tsx              # Inertia app entry
└── priv/
    └── repo/migrations/
```

---

## nb_serializer Usage

### Field Types

All fields **must** have explicit types:

```elixir
defmodule NbPingcrmWeb.Serializers.UserSerializer do
  use NbSerializer.Serializer

  schema do
    # Basic types
    field :id, :number
    field :name, :string
    field :email, :string
    field :active, :boolean

    # Date/time types (auto-formatted to ISO8601)
    field :created_at, :datetime
    field :deleted_at, :datetime, nullable: true

    # Optional fields (may be omitted)
    field :phone, :string, optional: true

    # Nullable fields (can be null)
    field :avatar, :string, nullable: true

    # Enums
    field :status, enum: ["active", "inactive", "pending"]

    # Lists
    field :tags, list: :string
    field :roles, list: [enum: ["admin", "user", "guest"]]
  end
end
```

### Computed Fields

Use named module functions (no anonymous functions):

```elixir
schema do
  field :id, :number
  field :first_name, :string
  field :last_name, :string
  field :name, :string, compute: :compute_name
  field :photo, :string, compute: :compute_photo, nullable: true
end

# Function signature: (data, opts) -> value
def compute_name(user, _opts) do
  "#{user.first_name} #{user.last_name}"
end

def compute_photo(user, _opts) do
  case user.photo_path do
    nil -> nil
    path -> "/storage/#{path}"
  end
end
```

### Relationships

```elixir
schema do
  field :id, :number
  field :name, :string

  # Single association
  has_one :organization, OrganizationSerializer

  # Collection
  has_many :contacts, ContactSerializer

  # Conditional inclusion
  has_many :users, UserSerializer, if: :include_users?
end

def include_users?(_data, opts) do
  opts[:include_users] == true
end
```

### Conditional Fields

```elixir
schema do
  field :id, :number
  field :email, :string
  field :admin_notes, :string, if: :is_admin?
  field :private_data, :string, unless: :is_public?
end

def is_admin?(_data, opts) do
  opts[:current_user] && opts[:current_user].owner
end
```

### Using in Controllers

```elixir
# Single record
render_inertia(conn, :users_show,
  user: {UserSerializer, user}
)

# Collection
render_inertia(conn, :users_index,
  users: {UserSerializer, users}
)

# With options
render_inertia(conn, :users_index,
  users: {UserSerializer, users, include_organization: true}
)
```

---

## nb_inertia Usage

### Controller Setup

```elixir
defmodule NbPingcrmWeb.UserController do
  use NbPingcrmWeb, :controller
  use NbInertia.Controller

  def index(conn, params) do
    {users, meta} = Accounts.list_users(params)

    render_inertia(conn, :users_index,
      users: {UserSerializer, users},
      meta: {FlopMetaSerializer, meta, schema: User}
    )
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    render_inertia(conn, :users_show,
      user: {UserSerializer, user}
    )
  end
end
```

### Page Props with inertia_page

Use `inertia_page` to define page props that are auto-generated as TypeScript types by nb_ts.

**IMPORTANT**: Never manually write TypeScript interfaces for page props - they are auto-generated.

```elixir
defmodule NbPingcrmWeb.UserController do
  use NbPingcrmWeb, :controller
  use NbInertia.Controller

  # Define page props - generates UsersIndexProps TypeScript type
  inertia_page :users_index do
    prop :users, UserSerializer
    prop :meta, FlopMetaSerializer
    prop :filters, :map  # For search/filter state
  end

  # Page with no page-specific props (only shared props)
  inertia_page :dashboard do
  end

  def index(conn, params) do
    {users, meta} = Accounts.list_users(params)

    render_inertia(conn, :users_index,
      users: users,
      meta: meta,
      filters: %{search: params["search"]}
    )
  end
end
```

Frontend usage with auto-generated types:

```tsx
// CORRECT: Use auto-generated page props + shared props
import type { UsersIndexProps, AuthProps } from "@/types";

type PageProps = UsersIndexProps & { auth: AuthProps };

export default function UsersIndex() {
  const { props } = usePage<PageProps>();
  // props.users, props.meta, props.filters are all typed
}
```

```tsx
// WRONG: Never manually define prop types
interface PageProps {
  users: User[];  // ❌ Don't do this
  meta: FlopMeta;
}
```

### Modal Rendering

```elixir
def edit(conn, %{"id" => id}) do
  user = Accounts.get_user!(id)

  render_inertia_modal(conn, :users_edit,
    [user: {UserSerializer, user}],
    base_url: ~p"/users",
    size: :lg,
    slideover: true,
    position: :right
  )
end
```

### Shared Props with inertia_shared

Shared props are available on every page in a controller. Use `inertia_shared(SharedPropsModule)` in your controller to automatically merge shared props with page props.

**IMPORTANT**:
- Use `inertia_shared()` in the controller, NOT a plug
- Generated TypeScript page props automatically `extends` the shared props type
- Never manually merge types - this is auto-generated

#### Step 1: Define SharedProps Module

```elixir
# lib/nb_pingcrm_web/inertia_shared/auth.ex
defmodule NbPingcrmWeb.InertiaShared.Auth do
  use NbInertia.SharedProps
  alias NbPingcrmWeb.Serializers.{UserSerializer, AccountSerializer}

  inertia_shared do
    prop(:user, UserSerializer, nullable: true)
    prop(:account, AccountSerializer, nullable: true)
    prop(:flash, :map)
  end

  @impl NbInertia.SharedProps.Behaviour
  def build_props(conn, _opts) do
    scope = conn.assigns[:current_scope]
    flash = Phoenix.Flash.get(conn.assigns, :flash) || %{}

    base = %{flash: normalize_flash(flash)}

    if scope && scope.user do
      user = scope.user |> NbPingcrm.Repo.preload(:account)
      Map.merge(base, %{user: user, account: user.account})
    else
      Map.merge(base, %{user: nil, account: nil})
    end
  end

  defp normalize_flash(flash) do
    %{success: flash["success"], error: flash["error"], info: flash["info"], warning: flash["warning"]}
    |> Enum.reject(fn {_k, v} -> is_nil(v) end)
    |> Map.new()
  end
end
```

#### Step 2: Use inertia_shared in Controller

```elixir
defmodule NbPingcrmWeb.PageController do
  use NbPingcrmWeb, :controller
  use NbInertia.Controller

  alias NbPingcrmWeb.InertiaShared.Auth

  # This merges Auth props into ALL pages in this controller
  inertia_shared(Auth)

  inertia_page :dashboard do
  end

  def home(conn, _params) do
    render_inertia(conn, :dashboard)
  end
end
```

#### Step 3: Generated TypeScript Types (Auto-Extended)

nb_ts generates page props that automatically extend shared props:

```typescript
// assets/js/types/AuthProps.ts (auto-generated)
export interface AuthProps {
  user: User | null;
  account: Account | null;
  flash: Record<string, any>;
}

// assets/js/types/DashboardProps.ts (auto-generated)
import type { AuthProps } from "./AuthProps";
export interface DashboardProps extends AuthProps {
  // Page-specific props would be here
}
```

#### Step 4: Frontend Usage

```tsx
// CORRECT: Just import the page props - shared props are included via extends
import type { DashboardProps } from "@/types";

export default function Dashboard() {
  const { props } = usePage<DashboardProps>();
  const { user, account, flash } = props;  // All props available directly

  return (
    <div>
      <h1>Welcome {user?.firstName}</h1>
      {flash.success && <Alert>{flash.success}</Alert>}
    </div>
  );
}
```

```tsx
// WRONG: Never manually merge types - this is redundant
import type { DashboardProps, AuthProps } from "@/types";
type PageProps = DashboardProps & { auth: AuthProps };  // ❌ Don't do this
```

```tsx
// WRONG: Never use a plug to inject shared props
defmodule NbPingcrmWeb.Plugs.InertiaSharedProps do  // ❌ Don't do this
  def call(conn, _opts) do
    Inertia.Controller.assign_prop(conn, :auth, ...)
  end
end
```

### Frontend - Enhanced Components

**Always import from `@/lib/inertia`**, not from `@inertiajs/react`:

```typescript
// CORRECT
import { router, Link, useForm } from '@/lib/inertia';

// WRONG - bypasses nb_routes integration
import { router, Link, useForm } from '@inertiajs/react';
```

### router (Programmatic Navigation)

```typescript
import { router } from '@/lib/inertia';
import { users_path, update_user_path } from '@/routes';

// RouteResult objects - method auto-detected
router.visit(users_path());                    // GET
router.visit(update_user_path.patch(user.id)); // PATCH

// With options
router.visit(users_path(), {
  preserveState: true,
  preserveScroll: true,
  only: ['users'],
});

// Plain strings still work
router.visit('/users');
router.post('/users', { data: formData });
```

### Link Component

```tsx
import { Link } from '@/lib/inertia';
import { user_path, delete_user_path } from '@/routes';

// RouteResult objects
<Link href={user_path(user.id)}>View</Link>
<Link href={delete_user_path.delete(user.id)} as="button">Delete</Link>

// With options
<Link
  href={user_path(user.id)}
  preserveState
  preserveScroll
  only={['user']}
>
  View
</Link>
```

### useForm Hook (Route Binding)

```tsx
import { useForm } from '@/lib/inertia';
import { update_user_path } from '@/routes';

function EditUser({ user }: EditUserProps) {
  // Bound to route - submit() needs no URL/method
  const form = useForm(
    { first_name: user.first_name, last_name: user.last_name, email: user.email },
    update_user_path.patch(user.id)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit({
      preserveScroll: true,
      onSuccess: () => console.log('Saved!'),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.data.first_name}
        onChange={e => form.setData('first_name', e.target.value)}
      />
      {form.errors.first_name && <span>{form.errors.first_name}</span>}
      <button type="submit" disabled={form.processing}>Save</button>
    </form>
  );
}
```

### Unbound Form (Traditional)

```tsx
const form = useForm({ name: '', email: '' });

form.submit('post', '/users', {
  onSuccess: () => console.log('Created!'),
});
```

---

## nb_routes Usage

### Configuration

```elixir
# config/config.exs
config :nb_routes,
  router: NbPingcrmWeb.Router,
  variant: :rich,           # Returns {url, method} objects
  with_methods: true,       # Enable .get(), .post(), etc.
  with_forms: true          # Enable .form helpers
```

### Route Helper Patterns

```typescript
import {
  users_path,
  user_path,
  new_user_path,
  edit_user_path,
  create_user_path,
  update_user_path,
  delete_user_path
} from '@/routes';

// Basic usage - returns { url, method }
users_path()              // { url: "/users", method: "get" }
user_path(1)              // { url: "/users/1", method: "get" }

// Method variants
user_path.get(1)          // Explicit GET
user_path.url(1)          // Just URL string: "/users/1"

// Mutation routes
create_user_path.post()           // { url: "/users", method: "post" }
update_user_path.patch(1)         // { url: "/users/1", method: "patch" }
delete_user_path.delete(1)        // { url: "/users/1", method: "delete" }

// Query parameters
users_path({ query: { page: 2, search: 'john' } })
// { url: "/users?page=2&search=john", method: "get" }

// Form helpers (for HTML forms with method spoofing)
update_user_path.form.patch(1)
// { action: "/users/1?_method=PATCH", method: "post" }
```

### With Flop Parameters

```typescript
import { flopToQueryParams } from '@/components/flop';
import { users_path } from '@/routes';

const flop = useFlopParams(meta, {
  onParamsChange: (params) => {
    router.visit(users_path({ query: flopToQueryParams(params) }), {
      preserveState: true,
      preserveScroll: true,
    });
  },
});
```

---

## nb_ts Usage

### Automatic Type Generation

Types are auto-generated on compile. Manual generation:

```bash
mix nb_ts.gen.types
```

### Generated Files

```
assets/js/types/
├── index.ts              # Re-exports all types
├── UserSerializer.ts     # From UserSerializer
├── AccountSerializer.ts  # From AccountSerializer
├── FlopMetaSerializer.ts # From FlopMetaSerializer
└── ...
```

### Using Generated Types

```typescript
import type { User, Account, FlopMeta } from '@/types';

interface UsersIndexProps {
  users: User[];
  meta: FlopMeta;
  filters: {
    search?: string;
    role?: string;
    trashed?: string;
  };
}

export default function UsersIndex({ users, meta, filters }: UsersIndexProps) {
  // Full type safety
}
```

### Custom TypeScript Types (via ~TS sigil)

```elixir
import NbTs.Sigil

schema do
  field :id, :number
  field :status, :typescript, type: ~TS"'active' | 'inactive' | 'pending'"
  field :metadata, :typescript, type: ~TS"Record<string, unknown>"
  field :config, :typescript, type: ~TS"{ theme: string; locale: string }"
end
```

---

## nb_flop Usage

### Schema Setup

```elixir
defmodule NbPingcrm.Accounts.User do
  use Ecto.Schema

  @derive {
    Flop.Schema,
    filterable: [:first_name, :last_name, :email, :owner],
    sortable: [:first_name, :last_name, :email, :owner, :inserted_at],
    default_limit: 10,
    default_order: %{
      order_by: [:last_name, :first_name],
      order_directions: [:asc, :asc]
    }
  }

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :owner, :boolean, default: false
    # ...
  end
end
```

### Context Usage

```elixir
def list_users(account_id, params \\ %{}) do
  User
  |> User.for_account(account_id)
  |> User.filter_trashed(params["trashed"])
  |> User.search(params["search"])
  |> Flop.validate_and_run(params, for: User)
end
```

### Controller Usage

```elixir
def index(conn, params) do
  account_id = conn.assigns.current_scope.account.id

  case Accounts.list_users(account_id, params) do
    {:ok, {users, meta}} ->
      render_inertia(conn, :users_index,
        users: {UserSerializer, users},
        meta: {FlopMetaSerializer, meta, schema: User},
        filters: %{
          search: params["search"],
          role: params["role"],
          trashed: params["trashed"]
        }
      )

    {:error, _changeset} ->
      conn
      |> put_flash(:error, "Invalid parameters")
      |> redirect(to: ~p"/users")
  end
end
```

### Frontend - useFlopParams Hook

```typescript
import { useFlopParams, flopToQueryParams } from '@/components/flop';
import { router } from '@/lib/inertia';
import { users_path } from '@/routes';

function UsersIndex({ users, meta, filters }: UsersIndexProps) {
  const flop = useFlopParams(meta, {
    onParamsChange: (params) => {
      router.visit(users_path({ query: flopToQueryParams(params) }), {
        preserveState: true,
        preserveScroll: true,
      });
    },
  });

  return (
    <div>
      {/* Search */}
      <input
        defaultValue={filters.search}
        onChange={(e) => flop.setFilter('search', 'ilike', `%${e.target.value}%`)}
      />

      {/* Table with sortable headers */}
      <table>
        <thead>
          <tr>
            <SortableHeader
              field="last_name"
              currentSort={flop.params.orderBy?.[0]}
              currentDirection={flop.getSortDirection('last_name')}
              onSort={flop.setSort}
            >
              Name
            </SortableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <UserRow key={user.id} user={user} />)}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination meta={meta} onPageChange={flop.setPage} />
    </div>
  );
}
```

### Flop Hook Methods

```typescript
const flop = useFlopParams(meta, options);

// Sorting
flop.setSort('field', 'asc');     // Set specific sort
flop.toggleSort('field');          // Cycle: asc → desc → none
flop.clearSort();                  // Remove sorting
flop.getSortDirection('field');    // Get current direction

// Filtering
flop.setFilter('field', '==', 'value');   // Add/update filter
flop.removeFilter('field');                // Remove filter
flop.clearFilters();                       // Clear all filters
flop.getFilterValue('field', '==');        // Get filter value

// Page-based pagination
flop.setPage(2);           // Go to page
flop.nextPage();           // Next page
flop.previousPage();       // Previous page
flop.setPageSize(25);      // Change page size

// Cursor-based pagination
flop.goToNextCursor();     // Use endCursor
flop.goToPreviousCursor(); // Use startCursor
```

---

## Common Patterns

### Soft Deletes

```elixir
# Schema
field :deleted_at, :utc_datetime

# Query helpers
def filter_trashed(query, nil), do: from(q in query, where: is_nil(q.deleted_at))
def filter_trashed(query, "with"), do: query
def filter_trashed(query, "only"), do: from(q in query, where: not is_nil(q.deleted_at))

# Context functions
def soft_delete(record) do
  record
  |> Ecto.Changeset.change(deleted_at: DateTime.utc_now(:second))
  |> Repo.update()
end

def restore(record) do
  record
  |> Ecto.Changeset.change(deleted_at: nil)
  |> Repo.update()
end
```

### Search

```elixir
def search(query, nil), do: query
def search(query, ""), do: query
def search(query, term) do
  search_term = "%#{term}%"
  from q in query,
    where: ilike(q.first_name, ^search_term) or
           ilike(q.last_name, ^search_term) or
           ilike(q.email, ^search_term)
end
```

### Multi-tenancy (Account Scoping)

```elixir
# Always scope queries to account
def for_account(query, account_id) do
  from q in query, where: q.account_id == ^account_id
end

# In controller
account_id = conn.assigns.current_scope.account.id
users = Accounts.list_users(account_id, params)
```

### Flash Messages

```elixir
# Controller
conn
|> put_flash(:success, "User created successfully.")
|> redirect(to: ~p"/users/#{user}")

# Frontend - access via shared props
function Layout({ children, flash }: LayoutProps) {
  return (
    <div>
      {flash.success && <Alert variant="success">{flash.success}</Alert>}
      {flash.error && <Alert variant="error">{flash.error}</Alert>}
      {children}
    </div>
  );
}
```

---

## Testing

### Controller Tests

```elixir
describe "index" do
  test "lists users", %{conn: conn} do
    conn = get(conn, ~p"/users")
    assert_inertia(conn, "Users/Index")
  end
end
```

### Context Tests

```elixir
describe "list_users/2" do
  test "returns paginated users" do
    account = insert(:account)
    users = insert_list(3, :user, account: account)

    {:ok, {result, meta}} = Accounts.list_users(account.id)

    assert length(result) == 3
    assert meta.total_count == 3
  end
end
```

---

## File Naming Conventions

### Elixir
- Serializers: `lib/nb_pingcrm_web/serializers/{name}_serializer.ex`
- Controllers: `lib/nb_pingcrm_web/controllers/{name}_controller.ex`
- Schemas: `lib/nb_pingcrm/{context}/{name}.ex`
- Contexts: `lib/nb_pingcrm/{context}.ex`

### TypeScript/React
- Pages: `assets/js/pages/{Resource}/{Action}.tsx` (e.g., `Users/Index.tsx`)
- Layouts: `assets/js/layouts/{Name}.tsx`
- Components: `assets/js/components/{name}.tsx`
- Types: `assets/js/types/` (auto-generated)

---

## Dependencies

### Elixir
- **phoenix** (~> 1.7): Web framework
- **ecto_sql** (~> 3.10): Database layer
- **flop** (~> 0.26): Pagination, sorting, filtering
- **nb_vite**: Vite integration
- **nb_inertia**: Inertia.js integration
- **nb_routes**: Route helpers
- **nb_serializer**: JSON serialization
- **nb_ts**: TypeScript generation
- **nb_flop**: Flop serializers and components

### JavaScript
- **react** (^18): UI framework
- **@inertiajs/react**: Inertia adapter
- **@nordbeam/nb-inertia**: Enhanced components
- **typescript**: Type checking
- **tailwindcss**: Styling
- **shadcn/ui**: Component library
