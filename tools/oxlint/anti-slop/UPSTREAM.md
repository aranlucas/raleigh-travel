# Vendored anti-slop

Source: https://github.com/dmmulroy/anti-slop/tree/c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b/skills/install-anti-slop/assets/anti-slop

Exact upstream commit: `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b`.
Production plugin copied unchanged; root MIT license and nested Stylistic license/provenance preserved. No local source deviations.

All 18 generic rules and native `oxc/no-accumulating-spread` are enabled. Effect rules are not enabled because Effect is not a direct dependency.

Application fixes add parsed weather/provider/storage contracts, remove a module mock in favor of exercising the real hook with controlled timers, and use Map lookups for dynamic keys. A bounded unicorn/prefer-top-level-await exception surrounds three Zod schema declarations because schema catch is not Promise.catch; anti-slop rules remain enabled without exceptions. The vendored plugin is excluded from application TypeScript checking.
