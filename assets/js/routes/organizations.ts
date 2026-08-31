import { route, type Param } from './lib/wayfinder';

/**
 * GET /organizations
 * @action :index
 */
const index = route('/organizations', 'get');

/**
 * GET /organizations/create
 * @action :new
 */
const new_ = route('/organizations/create', 'get');

/**
 * POST /organizations
 * @action :create
 */
const create = route('/organizations', 'post');

/**
 * GET /organizations/:id/edit
 * @action :edit
 */
const edit = route<{ id: Param }, 'get'>('/organizations/:id/edit', 'get');

/**
 * PUT /organizations/:id
 * @action :update
 */
const update = route<{ id: Param }, 'put'>('/organizations/:id', 'put');

/**
 * DELETE /organizations/:id
 * @action :delete
 */
const delete_ = route<{ id: Param }, 'delete'>('/organizations/:id', 'delete');

/**
 * PUT /organizations/:id/restore
 * @action :restore
 */
const restore = route<{ id: Param }, 'put'>('/organizations/:id/restore', 'put');

export const organizations = {
  index,
  new: new_,
  create,
  edit,
  update,
  delete: delete_,
  restore,
} as const;

export { index, new_, create, edit, update, delete_, restore };
