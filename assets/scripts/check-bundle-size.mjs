import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import zlib from 'node:zlib';

const projectRoot = path.resolve(import.meta.dirname, '..', '..');
const manifestCandidates = [
  path.join(projectRoot, 'priv', 'static', 'assets', 'manifest.json'),
  path.join(projectRoot, 'priv', 'static', 'assets', '.vite', 'manifest.json'),
];
const defaultManifestPath =
  manifestCandidates.find((filePath) => fs.existsSync(filePath)) ?? manifestCandidates[0];
const defaultBaselinePath = path.join(import.meta.dirname, 'bundle-size-baseline.json');
const defaultSsrPath = path.join(projectRoot, 'priv', 'static', 'ssr.js');

const limits = {
  client: 160 * 1024,
  ssr: 750 * 1024,
  regression: 0.05,
};

function usage() {
  console.log(`Usage: node scripts/check-bundle-size.mjs [options]

Checks the gzip size of the initial Inertia client assets and production SSR bundle.

Options:
  --manifest <path>       Vite manifest (default: priv/static/assets/manifest.json)
  --ssr <path>            SSR bundle (default: priv/static/ssr.js)
  --baseline <path>       JSON baseline (default: scripts/bundle-size-baseline.json)
  --update-baseline       Replace the baseline with the current measured sizes
  --json                  Print machine-readable results
  --help                  Show this help

Environment overrides:
  CLIENT_GZIP_BUDGET_KB   Initial client graph budget (default: 160)
  SSR_GZIP_BUDGET_KB      SSR bundle budget (default: 750)
  BUNDLE_REGRESSION_PCT   Allowed increase over baseline (default: 5)
`);
}

function parseArgs(argv) {
  const options = {
    manifestPath: defaultManifestPath,
    ssrPath: defaultSsrPath,
    baselinePath: defaultBaselinePath,
    updateBaseline: false,
    json: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--help') {
      usage();
      process.exit(0);
    }

    if (argument === '--update-baseline') {
      options.updateBaseline = true;
      continue;
    }

    if (argument === '--json') {
      options.json = true;
      continue;
    }

    if (['--manifest', '--ssr', '--baseline'].includes(argument)) {
      const value = argv[index + 1];

      if (!value || value.startsWith('--')) {
        throw new Error(`${argument} requires a path`);
      }

      options[`${argument.slice(2)}Path`] = path.resolve(process.cwd(), value);
      index += 1;
      continue;
    }

    throw new Error(`Unknown option: ${argument}`);
  }

  return options;
}

function readJson(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} not found at ${filePath}. Build the assets first.`);
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Could not parse ${label} at ${filePath}: ${error.message}`);
  }
}

function gzipBytes(filePath) {
  return zlib.gzipSync(fs.readFileSync(filePath), { level: 9 }).length;
}

function manifestAssetPath(manifestPath, assetFile) {
  const manifestDirectory = path.dirname(manifestPath);
  const assetDirectory =
    path.basename(manifestDirectory) === '.vite'
      ? path.dirname(manifestDirectory)
      : manifestDirectory;

  return path.resolve(assetDirectory, assetFile.replace(/^assets\//, ''));
}

function clientGraph(manifestPath, manifest) {
  const entryKeys = ['css/app.css', 'js/app.tsx'];

  const files = new Map();
  const visited = new Set();

  function visit(entryKey) {
    if (visited.has(entryKey)) return;
    visited.add(entryKey);

    const asset = manifest[entryKey];

    if (!asset?.file) {
      throw new Error(`Manifest import ${entryKey} is missing or has no file`);
    }

    const assetPath = manifestAssetPath(manifestPath, asset.file);

    if (!fs.existsSync(assetPath)) {
      throw new Error(`Built asset ${asset.file} for ${entryKey} is missing at ${assetPath}`);
    }

    files.set(asset.file, gzipBytes(assetPath));
    for (const importKey of asset.imports ?? []) visit(importKey);
  }

  for (const entryKey of entryKeys) {
    if (!manifest[entryKey]?.file) {
      throw new Error(`Manifest entry ${entryKey} is missing from ${manifestPath}`);
    }

    visit(entryKey);
  }

  return {
    files: [...files.entries()].map(([file, gzip]) => ({ file, gzip })),
    gzip: [...files.values()].reduce((total, size) => total + size, 0),
  };
}

function envNumber(name, fallback) {
  const value = process.env[name];
  if (value === undefined) return fallback;

  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${name} must be a non-negative number, got ${value}`);
  }

  return number;
}

function formatBytes(bytes) {
  return `${bytes.toLocaleString('en-US')} bytes (${(bytes / 1024).toFixed(1)} KiB)`;
}

function compareRegression(name, current, baseline) {
  if (!baseline || typeof baseline[name] !== 'number') {
    return { status: 'baseline-missing' };
  }

  const maximum = baseline[name] * (1 + limits.regression);
  return {
    status: current <= maximum ? 'pass' : 'fail',
    baseline: baseline[name],
    maximum,
    percent: ((current - baseline[name]) / baseline[name]) * 100,
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const manifest = readJson(options.manifestPath, 'Vite manifest');
  const client = clientGraph(options.manifestPath, manifest);
  const ssr = gzipBytes(options.ssrPath);
  const baseline = fs.existsSync(options.baselinePath)
    ? readJson(options.baselinePath, 'bundle-size baseline')
    : null;

  const result = {
    clientInitialGraphGzipBytes: client.gzip,
    clientInitialGraphBudgetBytes: envNumber('CLIENT_GZIP_BUDGET_KB', limits.client / 1024) * 1024,
    clientFiles: client.files,
    ssrGzipBytes: ssr,
    ssrBudgetBytes: envNumber('SSR_GZIP_BUDGET_KB', limits.ssr / 1024) * 1024,
    regressionPercent: envNumber('BUNDLE_REGRESSION_PCT', limits.regression * 100),
  };

  limits.regression = result.regressionPercent / 100;
  result.regression = {
    clientInitialGraphGzipBytes: compareRegression(
      'clientInitialGraphGzipBytes',
      client.gzip,
      baseline,
    ),
    ssrGzipBytes: compareRegression('ssrGzipBytes', ssr, baseline),
  };

  const failures = [];
  if (client.gzip > result.clientInitialGraphBudgetBytes) failures.push('client absolute budget');
  if (ssr > result.ssrBudgetBytes) failures.push('SSR absolute budget');

  if (!options.updateBaseline) {
    for (const [name, comparison] of Object.entries(result.regression)) {
      if (comparison.status === 'fail') failures.push(`${name} regression`);
    }
  }

  if (options.updateBaseline && failures.length === 0) {
    const nextBaseline = {
      clientInitialGraphGzipBytes: client.gzip,
      ssrGzipBytes: ssr,
    };
    fs.writeFileSync(options.baselinePath, `${JSON.stringify(nextBaseline, null, 2)}\n`);
    result.baselineUpdated = options.baselinePath;
  }

  if (options.json) {
    console.log(JSON.stringify({ ...result, failures }, null, 2));
  } else {
    console.log(
      `Initial client graph: ${formatBytes(client.gzip)} / ${formatBytes(result.clientInitialGraphBudgetBytes)}`,
    );
    for (const file of client.files) console.log(`  ${file.file}: ${formatBytes(file.gzip)}`);
    console.log(`SSR bundle: ${formatBytes(ssr)} / ${formatBytes(result.ssrBudgetBytes)}`);

    if (baseline) {
      for (const [name, comparison] of Object.entries(result.regression)) {
        const delta = comparison.percent;
        console.log(
          `${name}: ${delta >= 0 ? '+' : ''}${delta.toFixed(2)}% vs baseline (${comparison.status})`,
        );
      }
    } else {
      console.log(`No baseline found at ${options.baselinePath}; absolute budgets only.`);
    }

    if (options.updateBaseline) console.log(`Baseline updated: ${options.baselinePath}`);
  }

  if (failures.length > 0) {
    throw new Error(`Bundle size budget failed: ${failures.join(', ')}`);
  }
}

try {
  main();
} catch (error) {
  console.error(`bundle-size check: ${error.message}`);
  process.exitCode = 1;
}
