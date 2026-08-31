import 'phoenix-colocated/nb_pingcrm/colocated.css';
import { createInertiaApp, http } from '@/lib/inertia';
import { createRoot } from 'react-dom/client';
import type { ComponentType } from 'react';

type PageModule = {
  default: ComponentType<Record<string, unknown>>;
};

const pages = import.meta.glob<PageModule>('./pages/**/*.tsx');

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
  // Inertia v3: resolve receives (name, props). Props can be used for
  // per-page layout selection or conditional logic.
  resolve: async (name, _props) => {
    const path = `./pages/${name}.tsx`;
    const resolver = pages[path];
    if (!resolver) {
      throw new Error(`Page not found: ${name}`);
    }
    return (await resolver()).default;
  },
  setup({ App, el, props }) {
    if (!el) throw new Error('Inertia root element was not found');
    createRoot(el).render(<App {...props} />);
  },
  // Inertia v3: optional layout callback for default layouts
  // layout: (name) => AppLayout,
  // Inertia v3 (React only): enable React.StrictMode wrapper
  // strictMode: true,
});
