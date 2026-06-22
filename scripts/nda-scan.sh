#!/usr/bin/env bash
# nda-scan.sh — CI confidentiality gate for this PUBLIC repo.
#
# Reads the forbidden-term list from the AIOS_CONFIDENTIAL_TERMS environment
# variable (a GitHub Actions secret), so the term list is NEVER committed here.
# Scans the git tree (case-insensitive) and fails on any match.
#
# Usage: scripts/nda-scan.sh [--require]
#   --require : if no terms are configured, FAIL (fail-closed). Use on the deploy
#               path so a deploy can never run unguarded. Without it, an absent
#               secret skips cleanly (e.g. pull requests from forks, which by
#               design cannot read repo secrets).
set -uo pipefail
REQUIRE="${1:-}"

# Terms come from the secret in CI; on a dev machine, fall back to the private
# local list so `npm run build` is gated too. The term list is never committed.
TERMS="${AIOS_CONFIDENTIAL_TERMS:-}"
if [ -z "$TERMS" ] && [ -f "$HOME/.config/aios-nda/terms.txt" ]; then
  TERMS="$(cat "$HOME/.config/aios-nda/terms.txt")"
fi

if [ -z "$TERMS" ]; then
  if [ "$REQUIRE" = "--require" ]; then
    echo "nda-scan: BLOCKED — no terms configured (fail-closed on deploy path)." >&2
    exit 1
  fi
  echo "nda-scan: skipped — no terms configured (nothing to check)."
  exit 0
fi

RE="$(printf '%s\n' "$TERMS" | grep -vE '^[[:space:]]*#' | sed '/^[[:space:]]*$/d' | paste -sd '|' -)"
if [ -z "$RE" ]; then
  if [ "$REQUIRE" = "--require" ]; then
    echo "nda-scan: BLOCKED — no active terms in AIOS_CONFIDENTIAL_TERMS." >&2; exit 1
  fi
  echo "nda-scan: skipped — no active terms."; exit 0
fi

EXCL=(':!*.png' ':!*.jpg' ':!*.jpeg' ':!*.gif' ':!*.pdf' ':!*.ico'
  ':!*.woff' ':!*.woff2' ':!*.lock' ':!LICENSE'
  ':!scripts/nda-scan.sh' ':!**/nda-scan.sh')

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  # --untracked also scans new (un-ignored) files, matching what a build would
  # actually publish; ignored paths (node_modules, dist) are still skipped.
  hits="$(git grep --untracked -nEiI -e "$RE" -- "${EXCL[@]}" 2>/dev/null || true)"
else
  hits="$(grep -rEiIn --exclude='*.png' --exclude='*.lock' --exclude='nda-scan.sh' -e "$RE" . 2>/dev/null || true)"
fi

if [ -n "$hits" ]; then
  echo "=========================================================" >&2
  echo "NDA-GATE: BLOCKED — confidential identifier(s) detected:" >&2
  echo "$hits" | sed 's/^/  /' >&2
  echo "---------------------------------------------------------" >&2
  echo "Remove the term(s) above before this can build or deploy." >&2
  echo "=========================================================" >&2
  exit 1
fi
echo "nda-scan: clean — no confidential identifiers found."
exit 0
