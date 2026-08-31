import { route, type Param } from './lib/wayfinder';

/**
 * GET /nb-flop/views
 * @action :index
 */
const index = route('/nb-flop/views', 'get');

/**
 * POST /nb-flop/views
 * @action :create
 */
const create = route('/nb-flop/views', 'post');

/**
 * PUT /nb-flop/views/:id
 * @action :update
 */
const update = route<{ id: Param }, 'put'>('/nb-flop/views/:id', 'put');

/**
 * DELETE /nb-flop/views/:id
 * @action :delete
 */
const delete_ = route<{ id: Param }, 'delete'>('/nb-flop/views/:id', 'delete');

export const views = {
  index,
  create,
  update,
  delete: delete_,
} as const;

export { index, create, update, delete_ };
