import type { ErrorBag, Errors, PageProps as InertiaPageProps } from '@inertiajs/core';
import type { AuthLoginPropsRuntime } from './AuthLoginProps';
import type { AuthLoginPropsWire } from './AuthLoginProps';
import type { AuthRegisterPropsRuntime } from './AuthRegisterProps';
import type { AuthRegisterPropsWire } from './AuthRegisterProps';
import type { ContactsCreatePropsRuntime } from './ContactsCreateProps';
import type { ContactsCreatePropsWire } from './ContactsCreateProps';
import type { ContactsEditPropsRuntime } from './ContactsEditProps';
import type { ContactsEditPropsWire } from './ContactsEditProps';
import type { ContactsIndexPropsRuntime } from './ContactsIndexProps';
import type { ContactsIndexPropsWire } from './ContactsIndexProps';
import type { DashboardPropsRuntime } from './DashboardProps';
import type { DashboardPropsWire } from './DashboardProps';
import type { OrganizationsCreatePropsRuntime } from './OrganizationsCreateProps';
import type { OrganizationsCreatePropsWire } from './OrganizationsCreateProps';
import type { OrganizationsEditPropsRuntime } from './OrganizationsEditProps';
import type { OrganizationsEditPropsWire } from './OrganizationsEditProps';
import type { OrganizationsIndexPropsRuntime } from './OrganizationsIndexProps';
import type { OrganizationsIndexPropsWire } from './OrganizationsIndexProps';
import type { ReportsIndexPropsRuntime } from './ReportsIndexProps';
import type { ReportsIndexPropsWire } from './ReportsIndexProps';
import type { UsersCreatePropsRuntime } from './UsersCreateProps';
import type { UsersCreatePropsWire } from './UsersCreateProps';
import type { UsersEditPropsRuntime } from './UsersEditProps';
import type { UsersEditPropsWire } from './UsersEditProps';
import type { UsersIndexPropsRuntime } from './UsersIndexProps';
import type { UsersIndexPropsWire } from './UsersIndexProps';
import type { SharedProps } from './SharedProps';
import { z } from 'zod';
import { AuthLoginPropsSchema } from './AuthLoginProps';
import { AuthRegisterPropsSchema } from './AuthRegisterProps';
import { ContactsCreatePropsSchema } from './ContactsCreateProps';
import { ContactsEditPropsSchema } from './ContactsEditProps';
import { ContactsIndexPropsSchema } from './ContactsIndexProps';
import { DashboardPropsSchema } from './DashboardProps';
import { OrganizationsCreatePropsSchema } from './OrganizationsCreateProps';
import { OrganizationsEditPropsSchema } from './OrganizationsEditProps';
import { OrganizationsIndexPropsSchema } from './OrganizationsIndexProps';
import { ReportsIndexPropsSchema } from './ReportsIndexProps';
import { UsersCreatePropsSchema } from './UsersCreateProps';
import { UsersEditPropsSchema } from './UsersEditProps';
import { UsersIndexPropsSchema } from './UsersIndexProps';

export type InertiaRuntimeProps = InertiaPageProps & {
  errors: Errors & ErrorBag;
};

export interface Pages {
  'Auth/Login': AuthLoginPropsRuntime & InertiaRuntimeProps;
  'Auth/Register': AuthRegisterPropsRuntime & InertiaRuntimeProps;
  'Contacts/Create': ContactsCreatePropsRuntime & InertiaRuntimeProps;
  'Contacts/Edit': ContactsEditPropsRuntime & InertiaRuntimeProps;
  'Contacts/Index': ContactsIndexPropsRuntime & InertiaRuntimeProps;
  Dashboard: DashboardPropsRuntime & InertiaRuntimeProps;
  'Organizations/Create': OrganizationsCreatePropsRuntime & InertiaRuntimeProps;
  'Organizations/Edit': OrganizationsEditPropsRuntime & InertiaRuntimeProps;
  'Organizations/Index': OrganizationsIndexPropsRuntime & InertiaRuntimeProps;
  'Reports/Index': ReportsIndexPropsRuntime & InertiaRuntimeProps;
  'Users/Create': UsersCreatePropsRuntime & InertiaRuntimeProps;
  'Users/Edit': UsersEditPropsRuntime & InertiaRuntimeProps;
  'Users/Index': UsersIndexPropsRuntime & InertiaRuntimeProps;
}

/** Backwards-compatible wire/input page shapes. */
export interface PageWirePages {
  'Auth/Login': AuthLoginPropsWire;
  'Auth/Register': AuthRegisterPropsWire;
  'Contacts/Create': ContactsCreatePropsWire;
  'Contacts/Edit': ContactsEditPropsWire;
  'Contacts/Index': ContactsIndexPropsWire;
  Dashboard: DashboardPropsWire;
  'Organizations/Create': OrganizationsCreatePropsWire;
  'Organizations/Edit': OrganizationsEditPropsWire;
  'Organizations/Index': OrganizationsIndexPropsWire;
  'Reports/Index': ReportsIndexPropsWire;
  'Users/Create': UsersCreatePropsWire;
  'Users/Edit': UsersEditPropsWire;
  'Users/Index': UsersIndexPropsWire;
}

export type PageComponent = keyof Pages;
export type PagePropsFor<K extends PageComponent> = Pages[K];
export type PageProps<K extends PageComponent = PageComponent> = PagePropsFor<K>;
export type PageWirePropsFor<K extends keyof PageWirePages> = PageWirePages[K] & SharedProps;
export type PageWireProps<K extends keyof PageWirePages = keyof PageWirePages> =
  PageWirePropsFor<K>;

/** Result shape used by generated field adapters and nb_inertia runtime. */
export interface SchemaSuccess<T = unknown> {
  success: true;
  data?: T;
  value?: T;
}

export interface SchemaFailureResult {
  success: false;
  error?: unknown;
  issues?: unknown;
}

export type SchemaResult<T = unknown> = SchemaSuccess<T> | SchemaFailureResult;

/** A parser/validator for one wire value. Mirrors nb_inertia's contract. */
export interface PagePropSchema<T = unknown> {
  schema?: unknown;
  safeParse?: (value: unknown) => SchemaResult<T>;
  parse?: (value: unknown) => T | SchemaResult<T>;
  decode?: (value: unknown) => T | SchemaResult<T>;
  validate?: (value: unknown) => unknown;
  transform?: (value: unknown) => T;
  transforms?: boolean;
  decodeEnabled?: boolean;
  isTransform?: boolean;
  type?: string | string[];
  enum?: readonly unknown[];
  required?: boolean | readonly string[];
  properties?: Record<string, PagePropSchema>;
  items?: PagePropSchema;
}

export interface PageSchema<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends PagePropSchema<T> {
  /** Full-page parser for initial/navigation/history/SSR snapshots. */
  fullSchema?: unknown;
  /** Alias for consumers that call the complete input shape `wireSchema`. */
  wireSchema?: unknown;
  fields: Record<string, PagePropSchema>;
  shape: Record<string, PagePropSchema>;
  propertySchemas: Record<string, PagePropSchema>;
  required: readonly string[];
  transformFields: Readonly<Record<string, true>>;
}

export interface PageSchemaRegistry {
  get(component: string): PageSchema | PagePropSchema | undefined;
}

/** Per-component entries (schemas and field adapters). */
export const pageSchemas: Record<string, PageSchema> = {};

/** Per-field schemas for Auth/Login. Missing partial/deferred fields are untouched. */
export const AuthLoginPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: AuthLoginPropsSchema.shape.account as unknown as PagePropSchema,
  email: AuthLoginPropsSchema.shape.email as unknown as PagePropSchema,
  flash: AuthLoginPropsSchema.shape.flash as unknown as PagePropSchema,
  mode: AuthLoginPropsSchema.shape.mode as unknown as PagePropSchema,
  sudoMode: AuthLoginPropsSchema.shape.sudoMode as unknown as PagePropSchema,
  user: {
    schema: AuthLoginPropsSchema.shape.user,
    safeParse(value: unknown) {
      return AuthLoginPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return AuthLoginPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Auth/Login'] = {
  schema: AuthLoginPropsSchema,
  fullSchema: AuthLoginPropsSchema,
  wireSchema: AuthLoginPropsSchema,
  fields: AuthLoginPropsFieldSchemas,
  shape: AuthLoginPropsFieldSchemas,
  propertySchemas: AuthLoginPropsFieldSchemas,
  required: ['account', 'email', 'flash', 'mode', 'sudoMode', 'user'],
  transformFields: {
    user: true,
  },
};

/** Per-field schemas for Auth/Register. Missing partial/deferred fields are untouched. */
export const AuthRegisterPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: AuthRegisterPropsSchema.shape.account as unknown as PagePropSchema,
  flash: AuthRegisterPropsSchema.shape.flash as unknown as PagePropSchema,
  user: {
    schema: AuthRegisterPropsSchema.shape.user,
    safeParse(value: unknown) {
      return AuthRegisterPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return AuthRegisterPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Auth/Register'] = {
  schema: AuthRegisterPropsSchema,
  fullSchema: AuthRegisterPropsSchema,
  wireSchema: AuthRegisterPropsSchema,
  fields: AuthRegisterPropsFieldSchemas,
  shape: AuthRegisterPropsFieldSchemas,
  propertySchemas: AuthRegisterPropsFieldSchemas,
  required: ['account', 'flash', 'user'],
  transformFields: {
    user: true,
  },
};

/** Per-field schemas for Contacts/Create. Missing partial/deferred fields are untouched. */
export const ContactsCreatePropsFieldSchemas: Record<string, PagePropSchema> = {
  account: ContactsCreatePropsSchema.shape.account as unknown as PagePropSchema,
  flash: ContactsCreatePropsSchema.shape.flash as unknown as PagePropSchema,
  organizations: {
    schema: ContactsCreatePropsSchema.shape.organizations,
    safeParse(value: unknown) {
      return ContactsCreatePropsSchema.shape.organizations.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return ContactsCreatePropsSchema.shape.organizations.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,

  user: {
    schema: ContactsCreatePropsSchema.shape.user,
    safeParse(value: unknown) {
      return ContactsCreatePropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return ContactsCreatePropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Contacts/Create'] = {
  schema: ContactsCreatePropsSchema,
  fullSchema: ContactsCreatePropsSchema,
  wireSchema: ContactsCreatePropsSchema,
  fields: ContactsCreatePropsFieldSchemas,
  shape: ContactsCreatePropsFieldSchemas,
  propertySchemas: ContactsCreatePropsFieldSchemas,
  required: ['account', 'flash', 'organizations', 'user'],
  transformFields: {
    organizations: true,
    user: true,
  },
};

/** Per-field schemas for Contacts/Edit. Missing partial/deferred fields are untouched. */
export const ContactsEditPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: ContactsEditPropsSchema.shape.account as unknown as PagePropSchema,
  contact: {
    schema: ContactsEditPropsSchema.shape.contact,
    safeParse(value: unknown) {
      return ContactsEditPropsSchema.shape.contact.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return ContactsEditPropsSchema.shape.contact.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,

  flash: ContactsEditPropsSchema.shape.flash as unknown as PagePropSchema,
  organizations: {
    schema: ContactsEditPropsSchema.shape.organizations,
    safeParse(value: unknown) {
      return ContactsEditPropsSchema.shape.organizations.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return ContactsEditPropsSchema.shape.organizations.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,

  user: {
    schema: ContactsEditPropsSchema.shape.user,
    safeParse(value: unknown) {
      return ContactsEditPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return ContactsEditPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Contacts/Edit'] = {
  schema: ContactsEditPropsSchema,
  fullSchema: ContactsEditPropsSchema,
  wireSchema: ContactsEditPropsSchema,
  fields: ContactsEditPropsFieldSchemas,
  shape: ContactsEditPropsFieldSchemas,
  propertySchemas: ContactsEditPropsFieldSchemas,
  required: ['account', 'contact', 'flash', 'organizations', 'user'],
  transformFields: {
    contact: true,
    organizations: true,
    user: true,
  },
};

/** Per-field schemas for Contacts/Index. Missing partial/deferred fields are untouched. */
export const ContactsIndexPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: ContactsIndexPropsSchema.shape.account as unknown as PagePropSchema,
  contacts: ContactsIndexPropsSchema.shape.contacts as unknown as PagePropSchema,
  flash: ContactsIndexPropsSchema.shape.flash as unknown as PagePropSchema,
  user: {
    schema: ContactsIndexPropsSchema.shape.user,
    safeParse(value: unknown) {
      return ContactsIndexPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return ContactsIndexPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Contacts/Index'] = {
  schema: ContactsIndexPropsSchema,
  fullSchema: ContactsIndexPropsSchema,
  wireSchema: ContactsIndexPropsSchema,
  fields: ContactsIndexPropsFieldSchemas,
  shape: ContactsIndexPropsFieldSchemas,
  propertySchemas: ContactsIndexPropsFieldSchemas,
  required: ['account', 'contacts', 'flash', 'user'],
  transformFields: {
    user: true,
  },
};

/** Per-field schemas for Dashboard. Missing partial/deferred fields are untouched. */
export const DashboardPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: DashboardPropsSchema.shape.account as unknown as PagePropSchema,
  activities: DashboardPropsSchema.shape.activities as unknown as PagePropSchema,
  flash: DashboardPropsSchema.shape.flash as unknown as PagePropSchema,
  stats: DashboardPropsSchema.shape.stats as unknown as PagePropSchema,
  user: {
    schema: DashboardPropsSchema.shape.user,
    safeParse(value: unknown) {
      return DashboardPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return DashboardPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Dashboard'] = {
  schema: DashboardPropsSchema,
  fullSchema: DashboardPropsSchema,
  wireSchema: DashboardPropsSchema,
  fields: DashboardPropsFieldSchemas,
  shape: DashboardPropsFieldSchemas,
  propertySchemas: DashboardPropsFieldSchemas,
  required: ['account', 'activities', 'flash', 'stats', 'user'],
  transformFields: {
    user: true,
  },
};

/** Per-field schemas for Organizations/Create. Missing partial/deferred fields are untouched. */
export const OrganizationsCreatePropsFieldSchemas: Record<string, PagePropSchema> = {
  account: OrganizationsCreatePropsSchema.shape.account as unknown as PagePropSchema,
  flash: OrganizationsCreatePropsSchema.shape.flash as unknown as PagePropSchema,
  user: {
    schema: OrganizationsCreatePropsSchema.shape.user,
    safeParse(value: unknown) {
      return OrganizationsCreatePropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return OrganizationsCreatePropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Organizations/Create'] = {
  schema: OrganizationsCreatePropsSchema,
  fullSchema: OrganizationsCreatePropsSchema,
  wireSchema: OrganizationsCreatePropsSchema,
  fields: OrganizationsCreatePropsFieldSchemas,
  shape: OrganizationsCreatePropsFieldSchemas,
  propertySchemas: OrganizationsCreatePropsFieldSchemas,
  required: ['account', 'flash', 'user'],
  transformFields: {
    user: true,
  },
};

/** Per-field schemas for Organizations/Edit. Missing partial/deferred fields are untouched. */
export const OrganizationsEditPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: OrganizationsEditPropsSchema.shape.account as unknown as PagePropSchema,
  flash: OrganizationsEditPropsSchema.shape.flash as unknown as PagePropSchema,
  organization: {
    schema: OrganizationsEditPropsSchema.shape.organization,
    safeParse(value: unknown) {
      return OrganizationsEditPropsSchema.shape.organization.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return OrganizationsEditPropsSchema.shape.organization.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,

  user: {
    schema: OrganizationsEditPropsSchema.shape.user,
    safeParse(value: unknown) {
      return OrganizationsEditPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return OrganizationsEditPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Organizations/Edit'] = {
  schema: OrganizationsEditPropsSchema,
  fullSchema: OrganizationsEditPropsSchema,
  wireSchema: OrganizationsEditPropsSchema,
  fields: OrganizationsEditPropsFieldSchemas,
  shape: OrganizationsEditPropsFieldSchemas,
  propertySchemas: OrganizationsEditPropsFieldSchemas,
  required: ['account', 'flash', 'organization', 'user'],
  transformFields: {
    organization: true,
    user: true,
  },
};

/** Per-field schemas for Organizations/Index. Missing partial/deferred fields are untouched. */
export const OrganizationsIndexPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: OrganizationsIndexPropsSchema.shape.account as unknown as PagePropSchema,
  flash: OrganizationsIndexPropsSchema.shape.flash as unknown as PagePropSchema,
  organizations: OrganizationsIndexPropsSchema.shape.organizations as unknown as PagePropSchema,
  user: {
    schema: OrganizationsIndexPropsSchema.shape.user,
    safeParse(value: unknown) {
      return OrganizationsIndexPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return OrganizationsIndexPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Organizations/Index'] = {
  schema: OrganizationsIndexPropsSchema,
  fullSchema: OrganizationsIndexPropsSchema,
  wireSchema: OrganizationsIndexPropsSchema,
  fields: OrganizationsIndexPropsFieldSchemas,
  shape: OrganizationsIndexPropsFieldSchemas,
  propertySchemas: OrganizationsIndexPropsFieldSchemas,
  required: ['account', 'flash', 'organizations', 'user'],
  transformFields: {
    user: true,
  },
};

/** Per-field schemas for Reports/Index. Missing partial/deferred fields are untouched. */
export const ReportsIndexPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: ReportsIndexPropsSchema.shape.account as unknown as PagePropSchema,
  contactsByCountry: ReportsIndexPropsSchema.shape.contactsByCountry as unknown as PagePropSchema,
  contactsByOrganization: ReportsIndexPropsSchema.shape
    .contactsByOrganization as unknown as PagePropSchema,
  contactsOverTime: ReportsIndexPropsSchema.shape.contactsOverTime as unknown as PagePropSchema,
  flash: ReportsIndexPropsSchema.shape.flash as unknown as PagePropSchema,
  organizationsByCountry: ReportsIndexPropsSchema.shape
    .organizationsByCountry as unknown as PagePropSchema,
  recentActivity: ReportsIndexPropsSchema.shape.recentActivity as unknown as PagePropSchema,
  totals: ReportsIndexPropsSchema.shape.totals as unknown as PagePropSchema,
  trashed: ReportsIndexPropsSchema.shape.trashed as unknown as PagePropSchema,
  user: {
    schema: ReportsIndexPropsSchema.shape.user,
    safeParse(value: unknown) {
      return ReportsIndexPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return ReportsIndexPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Reports/Index'] = {
  schema: ReportsIndexPropsSchema,
  fullSchema: ReportsIndexPropsSchema,
  wireSchema: ReportsIndexPropsSchema,
  fields: ReportsIndexPropsFieldSchemas,
  shape: ReportsIndexPropsFieldSchemas,
  propertySchemas: ReportsIndexPropsFieldSchemas,
  required: [
    'account',
    'contactsByCountry',
    'contactsByOrganization',
    'contactsOverTime',
    'flash',
    'organizationsByCountry',
    'recentActivity',
    'totals',
    'trashed',
    'user',
  ],
  transformFields: {
    user: true,
  },
};

/** Per-field schemas for Users/Create. Missing partial/deferred fields are untouched. */
export const UsersCreatePropsFieldSchemas: Record<string, PagePropSchema> = {
  account: UsersCreatePropsSchema.shape.account as unknown as PagePropSchema,
  flash: UsersCreatePropsSchema.shape.flash as unknown as PagePropSchema,
  user: {
    schema: UsersCreatePropsSchema.shape.user,
    safeParse(value: unknown) {
      return UsersCreatePropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return UsersCreatePropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Users/Create'] = {
  schema: UsersCreatePropsSchema,
  fullSchema: UsersCreatePropsSchema,
  wireSchema: UsersCreatePropsSchema,
  fields: UsersCreatePropsFieldSchemas,
  shape: UsersCreatePropsFieldSchemas,
  propertySchemas: UsersCreatePropsFieldSchemas,
  required: ['account', 'flash', 'user'],
  transformFields: {
    user: true,
  },
};

/** Per-field schemas for Users/Edit. Missing partial/deferred fields are untouched. */
export const UsersEditPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: UsersEditPropsSchema.shape.account as unknown as PagePropSchema,
  editedUser: {
    schema: UsersEditPropsSchema.shape.editedUser,
    safeParse(value: unknown) {
      return UsersEditPropsSchema.shape.editedUser.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return UsersEditPropsSchema.shape.editedUser.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,

  flash: UsersEditPropsSchema.shape.flash as unknown as PagePropSchema,
  user: {
    schema: UsersEditPropsSchema.shape.user,
    safeParse(value: unknown) {
      return UsersEditPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return UsersEditPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Users/Edit'] = {
  schema: UsersEditPropsSchema,
  fullSchema: UsersEditPropsSchema,
  wireSchema: UsersEditPropsSchema,
  fields: UsersEditPropsFieldSchemas,
  shape: UsersEditPropsFieldSchemas,
  propertySchemas: UsersEditPropsFieldSchemas,
  required: ['account', 'editedUser', 'flash', 'user'],
  transformFields: {
    editedUser: true,
    user: true,
  },
};

/** Per-field schemas for Users/Index. Missing partial/deferred fields are untouched. */
export const UsersIndexPropsFieldSchemas: Record<string, PagePropSchema> = {
  account: UsersIndexPropsSchema.shape.account as unknown as PagePropSchema,
  flash: UsersIndexPropsSchema.shape.flash as unknown as PagePropSchema,
  user: {
    schema: UsersIndexPropsSchema.shape.user,
    safeParse(value: unknown) {
      return UsersIndexPropsSchema.shape.user.safeParse(value) as SchemaResult;
    },
    parse(value: unknown) {
      return UsersIndexPropsSchema.shape.user.parse(value);
    },
    transforms: true,
    decodeEnabled: true,
    isTransform: true,
  } as PagePropSchema,

  users: UsersIndexPropsSchema.shape.users as unknown as PagePropSchema,
};

// Registry entry metadata is deliberately field-local: ordinary Zod
// validation remains validation, while codec/custom failures are decode.
pageSchemas['Users/Index'] = {
  schema: UsersIndexPropsSchema,
  fullSchema: UsersIndexPropsSchema,
  wireSchema: UsersIndexPropsSchema,
  fields: UsersIndexPropsFieldSchemas,
  shape: UsersIndexPropsFieldSchemas,
  propertySchemas: UsersIndexPropsFieldSchemas,
  required: ['account', 'flash', 'user', 'users'],
  transformFields: {
    user: true,
  },
};

/**
 * Stable adapter consumed by nb_inertia's schema runtime.  The registry
 * intentionally has no registry-wide `transforms` flag: each transformed
 * field is marked in its own wrapper so ordinary validation failures are
 * never mislabeled as decode failures.
 */
export const pageSchemaRegistry: PageSchemaRegistry = {
  get(component: string): PageSchema | PagePropSchema | undefined {
    return pageSchemas[component];
  },
};

/** Raw full-page Zod schemas for complete wire snapshots. */
export const pageSchemaObjects: Record<string, z.ZodTypeAny> = Object.keys(pageSchemas).reduce(
  (schemas, component) => {
    schemas[component] = pageSchemas[component].fullSchema as z.ZodTypeAny;
    return schemas;
  },
  {} as Record<string, z.ZodTypeAny>,
);

/** Explicit aliases for consumers that prefer a wire/full-page name. */
export const pageWireSchemas = pageSchemaObjects;
export const pageFullSchemas = pageSchemaObjects;

/**
 * Type-safe, framework-neutral prop narrowing.  The central Inertia
 * runtime has already validated/decoded `props`; this helper intentionally
 * does not parse again (which would feed a Date back into an ISO codec).
 */
export function pageProps<K extends keyof Pages>(page: K, props: unknown): Pages[K] {
  void page;
  return props as Pages[K];
}

export interface PageSnapshot {
  component: string;
  props: unknown;
}

/**
 * Creates the page-scoped helper used by React/Vue adapters.  The adapter
 * supplies the framework's current-page accessor, keeping this generated
 * module free of a UI-framework dependency.  In development, a mismatch
 * between the requested key and current component throws immediately.
 */
export function createUsePageProps(getPage: () => PageSnapshot) {
  return function usePageProps<K extends keyof Pages>(page: K): Pages[K] {
    const current = getPage();
    const runtime = globalThis as {
      __DEV__?: boolean;
      process?: { env?: { NODE_ENV?: string } };
    };
    const nodeEnv = runtime.process?.env?.NODE_ENV;
    const development = runtime.__DEV__ === true || nodeEnv === 'development' || nodeEnv === 'test';

    if (development && current.component !== page) {
      throw new Error(`Expected Inertia page ${String(page)}, received ${current.component}`);
    }

    return pageProps(page, current.props);
  };
}

/**
 * Decode a complete wire snapshot with the page's full Zod schema.
 * This is for callers that own a complete snapshot boundary; the
 * nb_inertia runtime uses `pageSchemaRegistry` and field schemas for
 * partial/deferred responses.  Decode failures are allowed to throw.
 */
export function decodePageProps<K extends keyof Pages>(page: K, props: unknown): Pages[K] {
  const schema = pageSchemaObjects[String(page)];
  if (!schema) {
    throw new Error(`No generated schema for Inertia page ${String(page)}`);
  }

  return schema.parse(props) as Pages[K];
}
