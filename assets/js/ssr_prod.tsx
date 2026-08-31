import ReactDOMServer from 'react-dom/server.browser';
import { createInertiaApp, InitialModalHandler, ModalStackProvider } from '@/lib/inertia';
import { ModalStackRenderer } from '@/components/modals';
import type { Page } from '@inertiajs/core';
import type { ComponentType } from 'react';

type PageModule = {
  default: ComponentType<Record<string, unknown>>;
};

/**
 * Production SSR entry point with eager page loading
 *
 * Uses eager import.meta.glob() to bundle all pages into the SSR bundle.
 * This is required for Deno/DenoRider which doesn't support dynamic imports
 * in the same way as Node.js.
 */
const pages = import.meta.glob<PageModule>('./pages/**/*.tsx', { eager: true });

const resolvePageComponent = async (name: string, page?: Page) => {
  const pagePath = `./pages/${name}.tsx`;

  if (!pages[pagePath]) {
    const availablePages = Object.keys(pages)
      .map((path) => path.replace('./pages/', '').replace('.tsx', ''))
      .sort();

    const pageUrl = page?.url ? ` at ${page.url}` : '';

    throw new Error(
      `SSR page not found: ${name}${pageUrl}\n` +
        `Expected: assets/js/pages/${name}.tsx\n` +
        `Available pages (${availablePages.length}):\n` +
        availablePages.map((path) => `  - ${path}`).join('\n'),
    );
  }

  return pages[pagePath].default;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function render(page: any) {
  if (page?.component === '__nb_inertia_healthcheck__') {
    return { head: [], body: '' };
  }

  return await createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    serverHead: true,
    resolve: resolvePageComponent,
    setup: ({ App, props }) => (
      <ModalStackProvider resolveComponent={resolvePageComponent}>
        <App {...props} />
        <InitialModalHandler
          resolveComponent={resolvePageComponent}
          initialPage={props.initialPage}
        />
        <ModalStackRenderer />
      </ModalStackProvider>
    ),
  });
}
