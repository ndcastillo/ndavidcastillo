#!/usr/bin/env bash
set -euo pipefail

mode="${1:-post}"
shift || true

case "$mode" in
  post)
    prefix="post(blog)"
    default_subject="update blog post"
    ;;
  feat-blog)
    prefix="feat(blog)"
    default_subject="update blog styles and structure"
    ;;
  *)
    echo "Unknown publish mode: $mode"
    echo "Use: post | feat-blog"
    exit 1
    ;;
esac

subject="${*:-$default_subject}"
commit_message="$prefix: $subject"

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes to publish."
  exit 0
fi

echo "Changes to publish:"
git status --short

npm run build

git add .
git commit -m "$commit_message"
git pull --rebase origin main
git push origin main
