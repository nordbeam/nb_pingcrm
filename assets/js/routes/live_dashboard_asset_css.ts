import { route, type Route, type RouteOptions, type Param } from './lib/wayfinder';

/**
 * GET /dev/dashboard/css-:md5
 * @action :index
 */
const index = route('/dev/dashboard/css-:md5', 'get');

export const live_dashboard_asset_css = {
  index,
} as const;

export { index };
