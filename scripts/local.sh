#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if command -v pnpm >/dev/null 2>&1 && command -v node >/dev/null 2>&1; then
  exec pnpm "${@:-dev}"
fi
amlok_runtime="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies"
if [[ ! -x "$amlok_runtime/node/bin/node" ]]; then
  echo 'Install Node.js 20.9+ and pnpm, then run pnpm install and pnpm dev.' >&2
  exit 1
fi
export PATH="$amlok_runtime/node/bin:$PATH"
exec "$amlok_runtime/bin/fallback/pnpm" "${@:-dev}"
