import { route } from './lib/wayfinder';

/**
 * POST /nb-flop/bulk-action
 * @action :create
 */
const create = route('/nb-flop/bulk-action', 'post');

export const action_execute_bulks = {
  create,
} as const;

export { create };
