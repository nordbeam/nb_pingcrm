import { route, type Route, type RouteOptions, type Param } from './lib/wayfinder';

/**
 * GET /users/register
 * @action :new
 */
const new_ = route('/users/register', 'get');

/**
 * POST /users/register
 * @action :create
 */
const create = route('/users/register', 'post');

export const user_registrations = {
  new: new_,
  create,
} as const;

export { new_, create };
