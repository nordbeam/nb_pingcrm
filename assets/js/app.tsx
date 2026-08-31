import 'phoenix-colocated/nb_pingcrm/colocated.css';
import { createInertiaApp, http, InitialModalHandler, ModalStackProvider } from '@/lib/inertia';
import { ModalStackRenderer } from '@/components/modals';
import type { Page } from '@inertiajs/core';
import type { ComponentType } from 'react';

type PageModule = {
  default: ComponentType<Record<string, unknown>>;
};

const pages = import.meta.glob<PageModule>('./pages/**/*.tsx');

const resolvePageComponent = async (name: string, page?: Page) => {
  const path = `./pages/${name}.tsx`;
  const resolver = pages[path];
  if (!resolver) {
    const pageUrl = page?.url ? ` at ${page.url}` : '';
    throw new Error(`Page not found: ${name}${pageUrl}`);
  }
  return (await resolver()).default;
};

const getCsrfToken = () =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

http.onRequest((config) => {
  const csrfToken = getCsrfToken();

  if (!csrfToken) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      'x-csrf-token': csrfToken,
    },
  };
});

void createInertiaApp({
  // Inertia v3.5+: reconcile server-provided head elements.
  serverHead: true,
  resolve: resolvePageComponent,
  // Inertia v3 owns mounting and hydration; this wrapper adds one modal stack
  // around the official app without bypassing the adapter's hydrateRoot path.
  withApp: (app, { page }) => (
    <ModalStackProvider resolveComponent={resolvePageComponent}>
      {app}
      <InitialModalHandler resolveComponent={resolvePageComponent} initialPage={page} />
      <ModalStackRenderer />
    </ModalStackProvider>
  ),
  // Inertia v3: optional layout callback for default layouts
  // layout: (name) => AppLayout,
  // Inertia v3 (React only): enable React.StrictMode wrapper
  // strictMode: true,
});
