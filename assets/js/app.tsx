import React, { createElement } from "react";

import { hydrateRoot, createRoot } from "react-dom/client";
import {
  createInertiaApp,
  http,
  ModalStackProvider,
  ModalStackRenderer,
  InitialModalHandler,
} from "@/lib/inertia";

// Import layouts
import AppLayout from "./layouts/AppLayout";
import GuestLayout from "./layouts/GuestLayout";

const getCsrfToken = () =>
  document
    .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
    ?.getAttribute("content");

http.onRequest((config) => {
  const csrfToken = getCsrfToken();

  if (!csrfToken) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...(config.headers ?? {}),
      "x-csrf-token": csrfToken,
    },
  };
});

const pages = import.meta.glob("./pages/**/*.tsx");

// Define which pages use which layout
const guestPages = [
  "Auth/Login",
  "Auth/Register",
  "Auth/ForgotPassword",
  "Auth/ResetPassword",
];

// Component resolver for modals
const resolveComponent = async (name: string): Promise<React.ComponentType<any>> => {
  const path = `./pages/${name}.tsx`;
  const resolver = pages[path];
  if (!resolver) {
    throw new Error(`Modal component not found: ${name}`);
  }
  const module = await resolver() as { default: React.ComponentType<any> };
  return module.default;
};

createInertiaApp({
  resolve: async (name) => {
    const path = `./pages/${name}.tsx`;
    const resolver = pages[path];
    if (!resolver) {
      throw new Error(`Page not found: ${name}`);
    }

    const module = await resolver() as { default: React.ComponentType & { layout?: (page: React.ReactNode) => React.ReactNode } };
    const page = module.default;

    // Use page-defined layout if available, otherwise determine from path
    if (!page.layout) {
      if (guestPages.includes(name)) {
        page.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;
      } else {
        page.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
      }
    }

    return module;
  },
  setup({ App, el, props }) {
    // Render function that includes modals INSIDE the Inertia App context
    // This allows usePage() to work in modal components
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

      return (
        <>
          {renderComponent()}
          {/* InitialModalHandler and ModalStackRenderer are INSIDE App context */}
          {/* So usePage() works in modal components */}
          <InitialModalHandler resolveComponent={resolveComponent} />
          <ModalStackRenderer />
        </>
      );
    };

    const app = (
      <ModalStackProvider resolveComponent={resolveComponent}>
        <App {...props}>{renderInertiaApp}</App>
      </ModalStackProvider>
    );

    // Use hydrateRoot when server-side rendered, createRoot otherwise
    if (el.dataset.serverRendered === 'true') {
      hydrateRoot(el, app);
    } else {
      createRoot(el).render(app);
    }
  },
});
