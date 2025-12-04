import { route, type Route, type RouteOptions, type Param } from './lib/wayfinder';

/**
 * GET /dev/dashboard/js-:md5
 * @action :index
 */
const index = route('/dev/dashboard/js-:md5', 'get');

export const live_dashboard_asset_js = {
  index,
} as const;

export { index };
