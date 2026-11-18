#!/bin/bash
# Auto-backup Shotly to GitHub (origin/main). Run by Claude Code hooks.
#   auto-backup.sh          -> only backs up if 30+ min since the last backup
#   auto-backup.sh --force  -> backs up now (used when a session ends)

INTERVAL_SECONDS=1800

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/..}" || exit 0
STAMP=".git/last-auto-backup"

say() { printf '{"systemMessage": "%s"}\n' "$1"; }

if [ "$1" != "--force" ] && [ -f "$STAMP" ]; then
  last=$(cat "$STAMP")
  [ $(( $(date +%s) - last )) -lt $INTERVAL_SECONDS ] && exit 0
fi

# Only back up main, and never in the middle of a merge/rebase.
[ "$(git rev-parse --abbrev-ref HEAD)" = "main" ] || exit 0
[ -d .git/rebase-merge ] || [ -d .git/rebase-apply ] || [ -f .git/MERGE_HEAD ] && exit 0

git add -A
if ! git diff --cached --quiet; then
  git commit -q -m "Auto-backup: $(date '+%Y-%m-%d %H:%M')" || { say "Shotly auto-backup: commit failed"; exit 0; }
fi

git fetch -q origin main
if ! git rebase -q origin/main >/dev/null 2>&1; then
  git rebase --abort >/dev/null 2>&1
  say "Shotly auto-backup: GitHub has changes that conflict with local ones. Backup paused; ask Claude to sort it out."
  exit 0
fi

if [ -n "$(git rev-list origin/main..main)" ]; then
  if git push -q origin main 2>/dev/null; then
    date +%s > "$STAMP"
    say "Shotly backed up to GitHub"
  else
    say "Shotly auto-backup: push to GitHub failed"
  fi
else
  date +%s > "$STAMP"
fi
