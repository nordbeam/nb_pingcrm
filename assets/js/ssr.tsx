import React, { createElement } from "react";
import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import { ModalStackProvider } from "@/lib/inertia";

// Import layouts
import AppLayout from "./layouts/AppLayout";
import GuestLayout from "./layouts/GuestLayout";

/**
 * SSR entry point
 *
 * This file exports a `render` function that is called by:
 * - Development: nb-vite's SSR endpoint (Vite Module Runner)
 * - Production: DenoRider (embedded Deno runtime)
 *
 * Uses eager loading to bundle all pages into the SSR bundle.
 *
 * IMPORTANT: The setup function must use the same render-function-as-children
 * pattern as app.tsx to ensure hydration works correctly. Modal components
 * are not rendered during SSR (they're client-side only), but the structure
 * must match.
 */

// Eager load all pages for SSR
const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

// Define which pages use which layout
const guestPages = [
  "Auth/Login",
  "Auth/Register",
  "Auth/ForgotPassword",
  "Auth/ResetPassword",
];

export async function render(page: any) {
  return await createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const path = `./pages/${name}.tsx`;
      const module = pages[path] as { default: React.ComponentType & { layout?: (page: React.ReactNode) => React.ReactNode } };

      if (!module) {
        const availablePages = Object.keys(pages)
          .map((p) => p.replace("./pages/", "").replace(".tsx", ""))
          .sort();

        throw new Error(
          `SSR Page Not Found\n\n` +
            `Component: ${name}\n` +
            `Expected file: assets/js/pages/${name}.tsx\n\n` +
            `Available pages (${availablePages.length}):\n` +
            availablePages.map((p) => `  - ${p}`).join("\n")
        );
      }

      const pageComponent = module.default;

      // Apply layout if not already defined
      if (!pageComponent.layout) {
        if (guestPages.includes(name)) {
          pageComponent.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;
        } else {
          pageComponent.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
        }
      }

      return module;
    },
    setup: ({ App, props }) => {
      // Use the same render-function-as-children pattern as app.tsx
      // This ensures hydration works correctly
      const renderInertiaApp = ({ Component, props: pageProps, key }: any) => {
        const renderComponent = () => {
          const child = createElement(Component, { key, ...pageProps });

          // Handle layouts
          if (typeof Component.layout === 'function') {
            return Component.layout(child);
          }

          if (Array.isArray(Component.layout)) {
            return Component.layout
              .concat(child)
              .reverse()
              .reduce((children: any, Layout: any) => createElement(Layout, pageProps, children));
          }

          return child;
        };

        // During SSR, we only render the page component
        // Modal components (InitialModalHandler, ModalStackRenderer) are client-side only
        // They will be rendered during hydration
        return renderComponent();
      };

      return (
        <ModalStackProvider>
          <App {...props}>{renderInertiaApp}</App>
        </ModalStackProvider>
      );
    },
  });
}
