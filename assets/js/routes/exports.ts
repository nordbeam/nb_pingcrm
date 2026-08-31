import { route } from './lib/wayfinder';

/**
 * GET /nb-flop/export
 * @action :index
 */
const index = route('/nb-flop/export', 'get');

export const exports = {
  index,
} as const;

export { index };
