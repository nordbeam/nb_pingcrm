// Enhanced Inertia.js integration with nb_routes support (React)
//
// This file re-exports enhanced components from nb_inertia that provide
// automatic integration with nb_routes rich mode. Import from this file
// instead of @inertiajs/react to get the enhanced functionality.
//
// Example:
//   import { router, Link, useForm } from '@/lib/inertia';
//   import { user_path } from '@/routes';
//
//   router.visit(user_path(1));           // Works with RouteResult objects
//   <Link href={user_path(1)}>User</Link> // Works with RouteResult objects

import { createInertiaApp as createSchemaAwareInertiaApp } from '@nordbeam/nb-inertia/react/createInertiaApp';
import { createUsePageProps as createTypedUsePageProps } from '@nordbeam/nb-inertia/react/usePageProps';
import type { Pages } from '@/types/pages';

/**
 * The generated Zod registry is loaded only in development. Vite
 * folds this DEV branch out of production bundles, so the default
 * production path contains neither the registry nor Zod. Pass an
 * explicit schemaRuntime/pageSchemas option to enforce production
 * checks and choose a report or throw policy.
 */
async function createInertiaAppWithSchemas(options: Record<string, unknown> = {}) {
  if (!import.meta.env.DEV) return createSchemaAwareInertiaApp(options);

  try {
    const { pageSchemaRegistry } = await import('@/types/pages');
    return createSchemaAwareInertiaApp({
      ...options,
      pageSchemas: pageSchemaRegistry,
      schemaRuntime: { mode: 'throw', registry: pageSchemaRegistry },
    });
  } catch {
    // `pages.ts` is created by `mix ts.gen`; keep a fresh install
    // usable before the first generation has run.
    return createSchemaAwareInertiaApp(options);
  }
}

export const createInertiaApp = createInertiaAppWithSchemas as typeof createSchemaAwareInertiaApp;

export { router } from '@nordbeam/nb-inertia/react/router';
// The adapter entrypoint lazy-loads page-schema decoding only when a
// registry is configured. This keeps disabled production bundles free
// of the optional validation runtime.
export {
  clearPageSchemaRuntimeConfig,
  configurePageSchemaRuntime,
  getPageSchemaRuntimeConfig,
} from '@nordbeam/nb-inertia/react/createInertiaApp';
/** Page-scoped props inferred from the generated component map. */
export const usePageProps = createTypedUsePageProps<Pages>();
export {
  createUsePageProps,
  PagePropsComponentMismatchError,
} from '@nordbeam/nb-inertia/react/usePageProps';
export type {
  PageMap,
  PagePropsHookOptions,
  PagePropsMismatch,
  PageSnapshotLike,
  UsePageProps,
} from '@nordbeam/nb-inertia/react/usePageProps';
export type {
  PagePropSchema,
  PageSchema,
  PageSchemaValue,
  PageSchemaAppOptions,
  PageSchemaRegistry,
  PageSchemaRegistryLike,
  PageSchemaRuntimeOptions,
  SchemaFailure,
  SchemaFailureResult,
  SchemaFailureReporter,
  SchemaParser,
  SchemaResult,
  SchemaSuccess,
  SchemaRuntime,
  SchemaRuntimeMode,
  SchemaRuntimePhase,
} from '@nordbeam/nb-inertia/shared/schemaRuntime';
export { Link } from '@inertiajs/react';
export { useForm } from '@nordbeam/nb-inertia/react/useForm';
export { useHttp } from '@nordbeam/nb-inertia/react/useHttp';
export { useRoutes } from '@nordbeam/nb-inertia/react/useRoutes';
export { usePage } from '@nordbeam/nb-inertia/react/usePage';
export { Head } from '@nordbeam/nb-inertia/react/Head';

// Flash data hooks
export { useFlash } from '@nordbeam/nb-inertia/react/useFlash';
export { useOnFlash } from '@nordbeam/nb-inertia/react/useOnFlash';

// Modal components
export {
  ClientModalLink,
  Modal,
  HeadlessModal,
  InitialModalHandler,
  ModalLink,
  ModalPageProvider,
  ModalRenderer,
  CloseButton,
  ModalStackProvider,
  useCurrentModal,
  useIsInModal,
  useModalPageContext,
  useModalStack,
  useModal,
} from '@nordbeam/nb-inertia/react/modals';

// Re-export everything else from Inertia
export * from '@inertiajs/react';
