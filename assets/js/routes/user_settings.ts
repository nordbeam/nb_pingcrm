import { route, type Route, type RouteOptions, type Param } from './lib/wayfinder';

/**
 * GET /users/settings
 * @action :index
 */
const index = route('/users/settings', 'get');

/**
 * GET /users/settings/confirm-email/:token
 * @action :show
 */
const show = route<{ token: Param }>('/users/settings/confirm-email/:token', 'get');

/**
 * PUT /users/settings
 * @action :update
 */
const update = route('/users/settings', 'put');

export const user_settings = {
  index,
  show,
  update,
} as const;

export { index, show, update };
