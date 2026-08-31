import { route, type Param } from './lib/wayfinder';

/**
 * GET /contacts
 * @action :index
 */
const index = route('/contacts', 'get');

/**
 * GET /contacts/create
 * @action :new
 */
const new_ = route('/contacts/create', 'get');

/**
 * POST /contacts
 * @action :create
 */
const create = route('/contacts', 'post');

/**
 * GET /contacts/:id/edit
 * @action :edit
 */
const edit = route<{ id: Param }, 'get'>('/contacts/:id/edit', 'get');

/**
 * PUT /contacts/:id
 * @action :update
 */
const update = route<{ id: Param }, 'put'>('/contacts/:id', 'put');

/**
 * DELETE /contacts/:id
 * @action :delete
 */
const delete_ = route<{ id: Param }, 'delete'>('/contacts/:id', 'delete');

/**
 * PUT /contacts/:id/restore
 * @action :restore
 */
const restore = route<{ id: Param }, 'put'>('/contacts/:id/restore', 'put');

export const contacts = {
  index,
  new: new_,
  create,
  edit,
  update,
  delete: delete_,
  restore,
} as const;

export { index, new_, create, edit, update, delete_, restore };
