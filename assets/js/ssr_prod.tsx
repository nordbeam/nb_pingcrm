import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@/lib/inertia';
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function render(page: any) {
  if (page?.component === '__nb_inertia_healthcheck__') {
    return { head: [], body: '' };
  }

  return await createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    // Inertia v3: resolve receives (name, props)
    resolve: async (name, _props) => {
      // Eager loading - all pages are bundled
      const pages = import.meta.glob<PageModule>('./pages/**/*.tsx', { eager: true });
      const pagePath = `./pages/${name}.tsx`;

      if (!pages[pagePath]) {
        // List available pages for debugging
        const availablePages = Object.keys(pages)
          .map((p) => p.replace('./pages/', '').replace('.tsx', ''))
          .sort();

        throw new Error(
          `❌ SSR Page Not Found\n\n` +
            `Component: ${name}\n` +
            `Expected file: assets/js/pages/${name}.tsx\n\n` +
            `This page file doesn't exist or wasn't bundled in the SSR build.\n\n` +
            `Common causes:\n` +
            `• The file hasn't been created yet\n` +
            `• The file name doesn't match the component name\n` +
            `• The file has the wrong extension\n` +
            `• The component name in your controller doesn't match the file path\n` +
            `• The SSR bundle needs to be rebuilt (run your package manager's build:ssr script)\n\n` +
            `Available pages (${availablePages.length}):\n` +
            availablePages.map((p) => `  - ${p}`).join('\n'),
        );
      }

      return pages[pagePath].default;
    },
    setup: ({ App, props }) => <App {...props} />,
  });
}
