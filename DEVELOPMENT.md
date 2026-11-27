# Development (DEVELOPMENT)

This guide is for anyone who wants to **clone, modify and rebuild Pomint** to suit their own needs (change the UI, default durations, notifications, app name, etc.). If you only want to install and use the app, see [README.md](README.md).

Pomint is a Tauri 2 desktop app: the React + TypeScript + Vite frontend lives in `src/`, and the Rust backend lives in `src-tauri/`. In desktop mode, Tauri loads Vite on the fixed port `1420`.

## 1. Prerequisites

| Item | Recommended | Notes |
| --- | --- | --- |
| Operating system | Windows | Current releases target Windows only and bundle as NSIS (`.exe`). |
| Node.js | 22 + npm | The repo does not declare `engines`; this version comes from CI (`.github/workflows/ci.yml`). Vite 8 requires Node ≥ 20.19 / 22.13 / 23.5. |
| Rust | stable | `Cargo.toml` uses `edition = "2024"`, so Rust ≥ 1.85 is required. CI uses the `stable` toolchain. |
| Git | any modern version | To clone the repository. |

Building a Tauri app on Windows also requires **WebView2** and **Visual Studio Build Tools** (with the "Desktop development with C++" workload), per the standard Tauri 2 requirements.

There is no `.nvmrc` or `rust-toolchain` file in the repo; select the right version yourself if you have multiple installations (`node -v`, `npm -v`, `rustc --version`).

## 2. First-time setup

```powershell
git clone https://github.com/Aquarius2301/Pomint.git
cd Pomint
npm ci
```

- Use `npm` because the repo only has `package-lock.json`; CI also uses `npm ci`. Avoid yarn/pnpm unless you intend to create a different lockfile.
- `npm ci` also installs `@tauri-apps/cli` (the `tauri` command). `src-tauri/Cargo.lock` is committed; Cargo downloads crates on the first build.
- `npm ci` creates `node_modules/`; builds create `dist/` and `src-tauri/target/`.

If you plan to build your own installer, generate your own signing key pair:

```powershell
npm run tauri:signer
```

This command creates **2 files** in `keys/`: `pomint.key` (private key) and `pomint.key.pub` (public key). When prompted, set a password and remember it, then complete these 3 steps:

1. **Create** `keys/pomint.key.pwd` yourself with exactly that password — `scripts/release-installer.ts` reads this file.
2. Copy the entire contents of `keys/pomint.key.pub` into the `plugins.updater.pubkey` field in `src-tauri/tauri.conf.json` so the updater can verify signatures made by your key.
3. If you will publish from your own repository, also change `plugins.updater.endpoints` to that repo's `latest.json` file (see section 5).

**Never commit or share the private key/password.** The `.pub` file is a public key and is meant to be placed in the config.

## 3. Running the app

### 3.1. Full desktop app (recommended)

```powershell
npm run tauri
```

This starts Vite (via `beforeDevCommand: npm run dev` in `src-tauri/tauri.conf.json`) and then opens a Tauri window at `http://localhost:1420`.

- Port `1420` uses `strictPort`: if it is already in use, Vite fails instead of switching ports. Close the process occupying it.
- For special devices/hosts, set the `TAURI_DEV_HOST` environment variable to bind Vite to that host; HMR then uses WebSocket on port `1421` (see `vite.config.ts`).
- **Testing note:** in dev mode the timer runs **10x faster** (`import.meta.env.DEV` in `src/hooks/useCountdown/useCountdown.ts`) so you do not have to wait 25 minutes. Release builds run at normal 1x speed.

### 3.2. Frontend only, in a browser

```powershell
npm run dev
```

Open the URL printed by Vite (by default `http://localhost:1420`). This is the quickest way to tweak CSS/layout, but there is **no Rust backend**: no OS notifications, tray, `window.api.notify`, app info from Tauri, or updater. The code has fallbacks (`isTauri()`), so the UI still renders.

After building, you can also serve the static `dist/` with `npm run preview` (still without Tauri APIs).

### 3.3. Checks

Run these before committing:

```powershell
npm run typecheck   # tsc --noEmit, fast feedback while editing
npm run build       # tsc && vite build; this is the CI frontend gate
npm run check:rust  # cargo check --manifest-path src-tauri/Cargo.toml
```

The repo has **no test runner or lint runner**; "linting" effectively means strict mode in `tsconfig.json` (`strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`). Do not leave unused imports/variables/parameters, do not use `any`, and avoid adding new dependencies. CI (`.github/workflows/ci.yml`) runs `npm run build` when `src/**` changes and `cargo check` when `src-tauri/**` changes.

## 4. Code structure and where to make changes

### 4.1. Frontend (`src/`)

```text
src/
  main.tsx                  entry: mounts React into #root
  App.tsx                   installs the Tauri bridge, hosts AppRoutes
  routes/index.tsx          switches pages via PageKey state (no React Router)
  pages/                    TimerPage, SettingsPage, AboutPage, ChangelogPage
  components/               shared components
  layouts/AppLayout.tsx     common app shell
  hooks/                    useCountdown, usePomodoro, useSystemTray, useTauriNotification, ...
  stores/                   Zustand: settings, pomodoro, theme, appInfo
  api/tauri.ts              Tauri boundary (invoke, isTauri, getAppInfo)
  constants/                shared constants, defaults, VERSION
  utils/                    pure helpers (formatTime, sound, ...)
  styles.css                global styles
  vite-env.d.ts             types for VITE_DISTRIBUTION and window.api
```

- Use the `@/` alias for cross-folder imports (e.g. `@/hooks`, `@/stores`); use relative imports within the same module. Each area has an `index.ts` public barrel — update the relevant barrel when adding files.
- Naming conventions: a component's main file is `index.tsx`, a hook is `useX.ts` in `src/hooks/useX/`, a store is `useXStore.ts` in `src/stores/useXStore/`. Split long files into `components/`, `types.ts`, `utils.ts`.
- State is persisted by Zustand under keys like `pomint-...-store`. When changing the shape of persisted data, add safe defaults/migration; do not rename or remove fields carelessly.

### 4.2. Backend (`src-tauri/`)

```text
src-tauri/
  src/main.rs               keeps the windows_subsystem attribute, only calls pomint_lib::run()
  src/lib.rs                tauri::Builder, registers opener/notification/updater plugins, generate_handler!
  src/commands/notify.rs    the only Rust command currently: takes {title, body}
  tauri.conf.json           app name, version, window, NSIS bundle, updater config
  capabilities/default.json permissions (core, opener, notification, updater, window/app)
  icons/                    app icons and installer/uninstaller icons
```

The timer, mode switching, tray and most logic still live in the frontend; Rust only provides small commands. When adding a plugin/command, register it in `lib.rs`/`commands/mod.rs` and grant **the fewest permissions necessary** in `capabilities/default.json`.

### 4.3. Common change map

| Goal | Start here |
| --- | --- |
| Change durations/defaults, cycles, auto-start | `src/constants/`, `src/stores/useSettingsStore/` |
| Change light/dark colors, use Ant Design tokens | `src/stores/useThemeStore/`, `src/styles.css`, components in `src/pages/` |
| Change countdown / mode switching / alarm sound | `src/hooks/useCountdown/`, `src/hooks/usePomodoro/`, `src/utils/sound.ts` |
| Change notification content | `src/hooks/useTauriNotification.ts` and `src-tauri/src/commands/notify.rs` |
| Add/edit text, About, in-app Changelog | `src/pages/`, `CHANGELOG.md`, `src/constants/common.ts` |
| Change name/productName/identifier/window icon | `src-tauri/tauri.conf.json`, `src-tauri/icons/`, `src/constants/common.ts` |
| Change dev port / import alias | `vite.config.ts`, `src-tauri/tauri.conf.json` (`devUrl`), `tsconfig.json` |

After frontend changes: `npm run build`. After Rust changes: `npm run check:rust`. If a change affects both (e.g. adding a command), run both.

## 5. Building your own version

`npm run tauri build` (or `npm run tauri -- build ...`) automatically runs `npm run build` (`beforeBuildCommand`) and then packages from `dist/`.

```powershell
# Frontend only, into dist/
npm run build

# NSIS installer (with updater artifacts, requires signing keys)
npm run tauri -- build --bundles nsis

# Portable build, no installer bundle
npm run tauri -- build --no-bundle
```

The repo provides 3 scripts that wrap these commands with the right environment variables:

| Command | `VITE_DISTRIBUTION` | Behavior |
| --- | --- | --- |
| `npm run release:installer` | `installer` | Reads `keys/pomint.key` + `keys/pomint.key.pwd` (the latter is created by you), then builds with `--bundles nsis`. |
| `npm run release:portable` | `portable` | Builds with `--no-bundle`; no keys needed. |
| `npm run release` | — | Runs the installer build, then the portable build. |

`VITE_DISTRIBUTION` is read in `src/pages/AboutPage/` and `src/pages/SettingsPage/`: for `portable`, the update UI is hidden/disabled. Build output is usually in `src-tauri/target/release/` (portable exe) and `src-tauri/target/release/bundle/nsis/` (installer).

**If you fork and release your own builds:** by default `src-tauri/tauri.conf.json` points at the original repo's public key and `latest.json` URL. An installer signed with your key will **not** match that public key; follow steps 2–3 in section 2 (copy `keys/pomint.key.pub` into `plugins.updater.pubkey` and change `endpoints` to your releases), or use `portable` mode to skip the updater. Never commit the private key/password.

Before creating a `v*` tag, keep the version in sync in **4 places** (the release CI fails otherwise):

- `package.json`
- `src-tauri/tauri.conf.json`
- `src-tauri/Cargo.toml`
- `src/constants/common.ts`

Release notes come from the matching section in [CHANGELOG.md](CHANGELOG.md); see `.github/workflows/release.yml` for the logic.

## 6. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Port 1420 is already in use` | Close the process using port 1420; Vite uses `strictPort: true`. |
| `npm run dev` has no notifications/tray | That is the browser fallback; use `npm run tauri` for the Rust backend. |
| The timer runs too fast | You are in dev mode (10x). Release builds run at 1x. |
| First Tauri build fails on Windows | Check WebView2 and Visual Studio Build Tools (C++ workload). |
| `npm run release:installer` cannot read the key | Run `npm run tauri:signer` to get `pomint.key`/`pomint.key.pub`, then create `keys/pomint.key.pwd` with the password you used. |
| Browser/Defender warns about your build | The app is not Authenticode-signed; only run builds you made yourself or downloaded from a trusted source. |
| TypeScript errors after editing | Run `npm run typecheck`; remember strict mode, avoid `any`, remove unused imports. |

## 7. References

- [README.md](README.md) — introduction, features and end-user installation instructions.
- [CHANGELOG.md](CHANGELOG.md) — version history / release notes.
- [LICENSE](LICENSE) — MIT, Copyright (c) 2026 Khang Ta.
- `.github/workflows/ci.yml` — automated checks.
- `.github/workflows/release.yml` — tag, build and release workflow.
