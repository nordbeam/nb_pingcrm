/**
 * Vite plugin to add 'node:' prefix to Node.js built-in modules
 *
 * This is required for Deno compatibility in SSR builds.
 * Deno requires the 'node:' prefix for Node.js built-ins (e.g., 'node:path'),
 * while Vite and most Node.js code uses bare imports (e.g., 'path').
 *
 * This plugin transforms the imports during the SSR build to make the
 * bundle compatible with Deno.
 */

const nodeBuiltins = new Set([
  'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'console',
  'constants', 'crypto', 'dgram', 'diagnostics_channel', 'dns', 'domain',
  'events', 'fs', 'http', 'http2', 'https', 'inspector', 'module', 'net',
  'os', 'path', 'perf_hooks', 'process', 'punycode', 'querystring',
  'readline', 'repl', 'stream', 'string_decoder', 'sys', 'timers',
  'tls', 'trace_events', 'tty', 'url', 'util', 'v8', 'vm', 'wasi',
  'worker_threads', 'zlib'
]);

export default function nodePrefixPlugin() {
  return {
    name: 'node-prefix',
    enforce: 'pre',

    // Transform imports to add 'node:' prefix to Node.js built-ins
    resolveId(source, importer, options) {
      // Only apply during SSR build
      if (!options.ssr) return null;

      // Check if this is a Node.js built-in module
      if (nodeBuiltins.has(source)) {
        return `node:${source}`;
      }

      // Check for path-based node built-ins (e.g., 'path/posix')
      const baseModule = source.split('/')[0];
      if (nodeBuiltins.has(baseModule)) {
        return source.replace(baseModule, `node:${baseModule}`);
      }

      return null;
    }
  };
}
