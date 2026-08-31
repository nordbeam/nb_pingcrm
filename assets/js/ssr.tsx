import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@/lib/inertia';
import type { ComponentType } from 'react';

type PageModule = {
  default: ComponentType<Record<string, unknown>>;
};

/**
 * Development SSR entry point with on-demand page loading
 *
 * Creates the page map once at module level, then only loads
 * the specific requested page on each render.
 */
// Lazy loading - create import functions once at module level
const pages = import.meta.glob<PageModule>('./pages/**/*.tsx');

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
            `This page file doesn't exist or wasn't found by Vite's glob.\n\n` +
            `Common causes:\n` +
            `• The file hasn't been created yet\n` +
            `• The file name doesn't match the component name\n` +
            `• The file has the wrong extension\n` +
            `• The component name in your controller doesn't match the file path\n\n` +
            `Available pages (${availablePages.length}):\n` +
            availablePages.map((p) => `  - ${p}`).join('\n'),
        );
      }

      // Dynamically import only the requested page
      const pageModule = await pages[pagePath]();
      return pageModule.default;
    },
    setup: ({ App, props }) => <App {...props} />,
  });
}
