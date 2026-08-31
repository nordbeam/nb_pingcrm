import type { ComponentProps } from 'react';

type InertiaModule = typeof import('@/lib/inertia');
type DirectReactModule = typeof import('@nordbeam/nb-inertia/react');
type DirectReactServerModule = typeof import('@nordbeam/nb-inertia/react/server');

/** Compile-time contract for the Inertia 3.7 surface used by this application. */
type Inertia37Exports = Pick<
  InertiaModule,
  | 'Deferred'
  | 'Form'
  | 'InfiniteScroll'
  | 'WhenVisible'
  | 'http'
  | 'useFormWithPrecognition'
  | 'useHttpWithPrecognition'
  | 'usePoll'
  | 'usePrefetch'
>;

type Inertia37Router = Pick<
  InertiaModule['router'],
  'activePolls' | 'flash' | 'getCached' | 'once' | 'optimistic' | 'poll' | 'replace'
>;

type Inertia37PollingState = Pick<
  ReturnType<InertiaModule['usePoll']>,
  'polling' | 'start' | 'stop'
>;

type Inertia37FormProps = Pick<ComponentProps<InertiaModule['Form']>, 'cancelOnUnmount'>;

/** Prove the GitHub-installed package exposes the official adapter entrypoints directly. */
type DirectInertia37Exports = Pick<
  DirectReactModule,
  | 'Deferred'
  | 'Form'
  | 'InfiniteScroll'
  | 'WhenVisible'
  | 'router'
  | 'usePoll'
  | 'usePrefetch'
  | 'useRemember'
>;

type DirectInertia37FormProps = Pick<ComponentProps<DirectReactModule['Form']>, 'cancelOnUnmount'>;

type DirectInertia37ServerExport = Pick<DirectReactServerModule, 'default'>;

export type {
  DirectInertia37Exports,
  DirectInertia37FormProps,
  DirectInertia37ServerExport,
  Inertia37Exports,
  Inertia37FormProps,
  Inertia37PollingState,
  Inertia37Router,
};
