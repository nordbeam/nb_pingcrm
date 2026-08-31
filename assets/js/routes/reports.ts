import { route } from './lib/wayfinder';

/**
 * GET /reports
 * @action :index
 */
const index = route('/reports', 'get');

export const reports = {
  index,
} as const;

export { index };
