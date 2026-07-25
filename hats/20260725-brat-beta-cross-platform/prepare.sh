#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if repo_root="$(git -C "$script_dir" rev-parse --show-toplevel 2>/dev/null)"; then
  :
else
  repo_root="$(cd "$script_dir/../.." && pwd)"
fi

prepared_dir="$script_dir/.prepared"
bundle_dir="$prepared_dir/Archive Olive"
checksum_file="$prepared_dir/SHA256SUMS"

sha256_file() {
  local path="$1"
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$path"
  elif command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$path"
  else
    echo "ERROR: shasum or sha256sum is required" >&2
    return 1
  fi
}

checksum_entry() {
  local path="$1"
  local label="$2"
  local digest
  digest="$(sha256_file "$path" | awk '{print $1}')"
  printf '%s  %s\n' "$digest" "$label"
}

manifest_version() {
  node -e "const m=require(process.argv[1]); process.stdout.write(m.version)" "$repo_root/manifest.json"
}

current_commit() {
  git -C "$repo_root" rev-parse HEAD 2>/dev/null || printf '%s' "archive-without-git-metadata"
}

print_summary() {
  local status="$1"
  local version
  version="$(manifest_version)"

  cat <<SUMMARY
HAT_PREPARE_SUMMARY
mode=blank
status=$status
app_url=n/a-native-obsidian
database=n/a
schema_version=n/a
seed_records=public-fixtures-only
candidate_commit=$(current_commit)
manifest_version=$version
bundle=$bundle_dir
checksums=$checksum_file
cleanup=bash hats/20260725-brat-beta-cross-platform/prepare.sh cleanup
guide=hats/20260725-brat-beta-cross-platform/guide.md
END_HAT_PREPARE_SUMMARY
SUMMARY
}

prepare() {
  cd "$repo_root"
  node scripts/validate.mjs --release

  mkdir -p "$bundle_dir"
  cp -f theme.css "$bundle_dir/theme.css"
  cp -f manifest.json "$bundle_dir/manifest.json"
  cp -f LICENSE "$bundle_dir/LICENSE"

  local checksum_tmp="$checksum_file.tmp"
  : >"$checksum_tmp"
  checksum_entry "$bundle_dir/theme.css" "Archive Olive/theme.css" >>"$checksum_tmp"
  checksum_entry "$bundle_dir/manifest.json" "Archive Olive/manifest.json" >>"$checksum_tmp"
  checksum_entry "$bundle_dir/LICENSE" "Archive Olive/LICENSE" >>"$checksum_tmp"
  mv -f "$checksum_tmp" "$checksum_file"

  print_summary "prepared"
}

cleanup() {
  case "$prepared_dir" in
    "$script_dir/.prepared") ;;
    *)
      echo "ERROR: refusing to clean unexpected path: $prepared_dir" >&2
      exit 1
      ;;
  esac

  if [[ -d "$prepared_dir" ]]; then
    rm -rf -- "$prepared_dir"
  fi
  print_summary "clean"
}

info() {
  if [[ -f "$bundle_dir/theme.css" && -f "$bundle_dir/manifest.json" && -f "$bundle_dir/LICENSE" && -f "$checksum_file" ]]; then
    print_summary "prepared"
    printf '\n'
    cat "$checksum_file"
  else
    print_summary "not-run"
  fi
}

case "${1:-info}" in
  prepare)
    prepare
    ;;
  cleanup)
    cleanup
    ;;
  info)
    info
    ;;
  *)
    echo "Usage: $0 {prepare|cleanup|info}" >&2
    exit 2
    ;;
esac
