import { route } from './lib/wayfinder';

/**
 * POST /nb-flop/action
 * @action :create
 */
const create = route('/nb-flop/action', 'post');

export const action_executes = {
  create,
} as const;

export { create };
