import { route, type Param } from './lib/wayfinder';

/**
 * GET /users
 * @action :index
 */
const index = route('/users', 'get');

/**
 * GET /users/create
 * @action :new
 */
const new_ = route('/users/create', 'get');

/**
 * POST /users
 * @action :create
 */
const create = route('/users', 'post');

/**
 * GET /users/:id/edit
 * @action :edit
 */
const edit = route<{ id: Param }, 'get'>('/users/:id/edit', 'get');

/**
 * PUT /users/:id
 * @action :update
 */
const update = route<{ id: Param }, 'put'>('/users/:id', 'put');

/**
 * DELETE /users/:id
 * @action :delete
 */
const delete_ = route<{ id: Param }, 'delete'>('/users/:id', 'delete');

/**
 * PUT /users/:id/restore
 * @action :restore
 */
const restore = route<{ id: Param }, 'put'>('/users/:id/restore', 'put');

export const users = {
  index,
  new: new_,
  create,
  edit,
  update,
  delete: delete_,
  restore,
} as const;

export { index, new_, create, edit, update, delete_, restore };
