# Modal SSR Implementation Notes

## Problem Statement

When accessing modal URLs directly (e.g., `/contacts/create`), the page fails with:
```
usePage must be used within the Inertia component
```

## Root Cause Analysis

### How inertiaui/modal Works

Reference: https://github.com/inertiaui/modal

Their key insight is using `renderApp(App, props)` which passes a **render function as children** to the Inertia `App` component:

```jsx
// inertiaui/modal pattern
export const renderApp = (App, pageProps) => {
  const renderInertiaApp = ({ Component, props, key }) => {
    return (
      <>
        {renderComponent()}
        <ModalRoot />   // ← INSIDE App context, so usePage() works!
      </>
    );
  };

  return (
    <ModalStackProvider>
      <App {...pageProps}>{renderInertiaApp}</App>  // ← render function as children
    </ModalStackProvider>
  );
}
```

The Inertia `App` component calls the children function with `{ Component, props, key }`, which means anything rendered in that function is INSIDE the Inertia page context.

### Our Original (Broken) Approach

```jsx
// Our original setup - BROKEN
<ModalStackProvider>
  <ModalRoot>                 // ← OUTSIDE App context
    <App {...props} />
    <ModalStackRenderer />    // ← OUTSIDE App context, usePage() fails!
  </ModalRoot>
</ModalStackProvider>
```

Problems:
1. `ModalRoot` and `ModalStackRenderer` are siblings/parents of `App`, not children
2. `usePage()` only works INSIDE the Inertia `App` component
3. Modal components that call `usePage()` (like ContactsCreate) crash

### Why Initial Modal Detection Fails

The `_nb_modal` prop is injected into page data by `DirectRenderer` when accessing modal URLs directly. But our `ModalRoot` only listened for `router.on('navigate')` events, missing the INITIAL page load.

inertiaui/modal solves this by:
1. Calling `usePage()` in ModalRoot to get initial props
2. Checking `$page.props._inertiaui_modal` on mount
3. This only works because ModalRoot is INSIDE the App context

## The Fix

### New Architecture

```jsx
// Fixed setup
<ModalStackProvider>
  <App {...props}>
    {({ Component, props, key }) => (
      <>
        {renderComponent()}
        <InitialModalHandler />   // ← INSIDE App, can use usePage()
        <ModalStackRenderer />    // ← INSIDE App, modals can use usePage()
      </>
    )}
  </App>
</ModalStackProvider>
```

### Components Needed

1. **`InitialModalHandler`** - Detects `_nb_modal` in initial page props and pushes to modal stack
2. **`ModalStackRenderer`** - Renders modals from the stack (already exists)
3. Remove `ModalRoot` - Its functionality is split between InitialModalHandler and router event handling

### SSR Considerations

For SSR (`ssr.tsx`), we need the same pattern but simpler:
- No need for modal rendering during SSR (modals are client-side)
- But we still need the render function pattern for consistency
- The `ModalStackProvider` wrapper is still needed for context

## Files Changed

1. **`assets/js/app.tsx`** - Use render function pattern
2. **`assets/js/ssr.tsx`** - Match the render function pattern
3. **`assets/js/components/InitialModalHandler.tsx`** - New component
4. **`assets/js/lib/inertia.ts`** - Remove ModalRoot export if not needed

## Backend Flow

### Two Code Paths (Both Now Work!)

The modal system has two code paths depending on whether it's a direct URL access or XHR navigation:

#### Path A: Direct URL Access (No X-Inertia header)

When `/contacts/create` is accessed directly (bookmark, refresh, shared link):

1. Phoenix routes to `ContactsController.new/2`
2. `render_inertia_modal` is called with `base_url: ~p"/contacts"`
3. `DirectRenderer` detects no `X-Inertia` header
4. `DirectRenderer`:
   - Fetches `/contacts` (base page) via internal HTTP request
   - Gets the HTML and Inertia page data
   - Injects `_nb_modal` into page props
   - Returns composed HTML
5. Browser receives HTML with:
   - Component: "Contacts/Index" (base page)
   - Props: `{ contacts: [...], _nb_modal: { component: "Contacts/Create", ... } }`
6. Client hydrates, `InitialModalHandler` detects `_nb_modal`, opens modal

#### Path B: XHR Navigation (X-Inertia header present) - **FIXED!**

When clicking "New contact" button from `/contacts`:

1. ModalLink/Inertia router sends XHR request to `/contacts/create`
2. `render_inertia_modal` is called with `base_url: ~p"/contacts"`
3. `XhrRenderer` detects `X-Inertia` header (XHR request)
4. `XhrRenderer` (NEW BEHAVIOR - like inertiaui/modal):
   - **Dispatches internal sub-request to base URL** (`/contacts`)
   - Gets the base page JSON response (Contacts/Index with contacts list)
   - Injects `_nb_modal` into base page props
   - Returns composed JSON with base page component
5. Client receives JSON:
   ```json
   {
     "component": "Contacts/Index",      // ← Base page (backdrop)
     "props": {
       "contacts": [...],                // ← Base page props
       "_nb_modal": {                    // ← Modal data
         "component": "Contacts/Create",
         "props": {...},
         "url": "/contacts/create",
         "baseUrl": "/contacts"
       }
     },
     "url": "/contacts/create"           // ← Modal URL (address bar)
   }
   ```
6. `InitialModalHandler` detects `_nb_modal` via `router.on('navigate')`, opens modal
7. **Backdrop shows Contacts/Index, modal shows Contacts/Create** - CORRECT!

### Previous Broken XHR Behavior

The old `XhrRenderer` returned the modal component directly:
```json
{
  "component": "Contacts/Create",  // ← Modal, not base page!
  "props": {...}
}
```

This relied on an axios interceptor to swap the component client-side. But Inertia uses `fetch`, not axios, so the interceptor never ran. The fix was to adopt inertiaui/modal's approach: dispatch an internal sub-request to the base URL server-side.

## Key Learnings

1. **Inertia's App component provides page context** - `usePage()` only works inside it
2. **Children-as-function pattern** - Inertia's App accepts a render function as children
3. **Modal rendering must be inside App** - Or modal components can't use `usePage()`
4. **Initial modal detection needs usePage()** - So the detector must also be inside App
5. **SSR doesn't render modals** - Only the base page is SSR'd; modals are client-side

## Testing Checklist

- [x] `/contacts` loads (index page, no modal)
- [x] `/contacts/create` loads (index + create modal) - **FIXED**
- [x] Click "New contact" from /contacts opens modal - **FIXED (backdrop now correct)**
- [x] Modal close navigates back to /contacts - **FIXED**
- [x] Refresh on /contacts/create shows modal
- [x] Direct link to /contacts/create shows modal
- [x] usePage() works in modal components - **FIXED**
- [x] SSR works for all pages
- [x] XHR modal backdrop shows correct page - **FIXED**

## Modal Close Navigation - FIXED

### Root Cause

The `popModal` function in `modalStack.tsx` had a **stale closure bug**. When looking up the modal's `onClose` callback, it used `modals.find()` where `modals` came from the outer closure - which could be empty/stale:

```typescript
// BROKEN: modals in closure could be stale
const popModal = useCallback(
  (id: string) => {
    const modal = modals.find((m) => m.id === id);  // <-- Stale closure!
    const onCloseCallback = modal?.onClose;
    // ...
  },
  [modals, onStackChange]
);
```

### The Fix

Access the current state via `setModals` callback (using `prev`) instead of relying on the closure:

```typescript
// FIXED: Use prev from setModals callback to access current state
const popModal = useCallback(
  (id: string) => {
    const callbackRef: { current: (() => void) | null } = { current: null };

    setModals((prev) => {
      // Find modal in CURRENT state, not stale closure
      const modal = prev.find((m) => m.id === id);
      callbackRef.current = modal?.onClose || null;

      const newModals = prev.filter((m) => m.id !== id);
      if (onStackChange) {
        onStackChange(newModals);
      }
      return newModals;
    });

    // setModals callback runs synchronously, so callbackRef is set
    setTimeout(() => {
      if (callbackRef.current) {
        callbackRef.current();
      }
    }, 0);
  },
  [onStackChange]  // No longer depends on `modals`
);
```

### Files Changed

- `nb_inertia/priv/nb_inertia/react/modals/modalStack.tsx` - Fixed stale closure in `popModal`

### Why This Works

1. React's `useState` setter accepts a callback that receives the **current** state
2. By finding the modal inside `setModals((prev) => ...)`, we always use fresh state
3. We capture the `onClose` callback in a ref-like object during the state update
4. Since `setModals` callback runs synchronously, the ref is set before `setTimeout`
5. The callback is called after a 0ms timeout to ensure the modal has been removed from DOM

## Backend Files Changed

1. **`nb_inertia/lib/nb_inertia/modal/xhr_renderer.ex`** - Now dispatches internal sub-request to base URL
2. **`nb_inertia/lib/nb_inertia/modal/http_client.ex`** - Added `fetch_base_page_json/2` for XHR modal requests
3. **`nb_inertia/lib/nb_inertia/modal/base_renderer.ex`** - Updated to handle new XhrRenderer return type

## Important: Version Header Handling

When dispatching internal sub-requests for XHR modals, we must forward the `X-Inertia-Version` header from the original request. Inertia checks this header and returns HTTP 409 Conflict if the version doesn't match.

**The problem:**
```
RuntimeError: Failed to fetch base page: HTTP 409
```

**The solution:** Forward the version header from the original request instead of getting it from application config:

```elixir
# In http_client.ex - build_inertia_headers/1
defp get_inertia_version_from_request(conn) do
  # First, try to get version from the original request header
  case get_req_header(conn, "x-inertia-version") do
    [version | _] when version != "" ->
      version

    _ ->
      # Fall back to application config
      case Application.get_env(:inertia, :version) do
        nil -> ""
        fun when is_function(fun, 0) -> fun.()
        version when is_binary(version) -> version
        _ -> ""
      end
  end
end
```

This ensures version consistency between the original XHR request and the internal sub-request to the base URL.

## References

- inertiaui/modal source: `/tmp/inertiaui-modal/src/Modal.php` (shows internal dispatch pattern)
- inertiaui/modal dispatch: `/tmp/inertiaui-modal/src/DispatchBaseUrlRequest.php`
- Inertia.js SSR docs: https://inertiajs.com/server-side-rendering
- Our DirectRenderer: `nb_inertia/lib/nb_inertia/modal/direct_renderer.ex`
- Our XhrRenderer: `nb_inertia/lib/nb_inertia/modal/xhr_renderer.ex`
