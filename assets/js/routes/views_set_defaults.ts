import { route, type Param } from './lib/wayfinder';

/**
 * POST /nb-flop/views/:id/default
 * @action :create
 */
const create = route<{ id: Param }, 'post'>('/nb-flop/views/:id/default', 'post');

export const views_set_defaults = {
  create,
} as const;

export { create };
