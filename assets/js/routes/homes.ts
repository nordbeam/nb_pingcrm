import { route } from './lib/wayfinder';

/**
 * GET /
 * @action :index
 */
const index = route('/', 'get');

export const homes = {
  index,
} as const;

export { index };
