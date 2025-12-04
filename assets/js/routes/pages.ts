import { route, type Route, type RouteOptions, type Param } from './lib/wayfinder';

/**
 * GET /
 * @action :index
 */
const index = route('/', 'get');

export const pages = {
  index,
} as const;

export { index };
