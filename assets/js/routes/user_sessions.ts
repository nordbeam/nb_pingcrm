import { route, type Param } from './lib/wayfinder';

/**
 * GET /users/log-in
 * @action :new
 */
const new_ = route('/users/log-in', 'get');

/**
 * POST /users/log-in
 * @action :create
 */
const create = route('/users/log-in', 'post');

/**
 * DELETE /users/log-out
 * @action :delete
 */
const delete_ = route('/users/log-out', 'delete');

/**
 * GET /users/log-in/:token
 * @action :confirm
 */
const confirm = route<{ token: Param }, 'get'>('/users/log-in/:token', 'get');

export const user_sessions = {
  new: new_,
  create,
  delete: delete_,
  confirm,
} as const;

export { new_, create, delete_, confirm };
