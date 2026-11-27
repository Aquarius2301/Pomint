import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  VITE_DISTRIBUTION: "portable",
};

const isWindows = process.platform === "win32";

const result = spawnSync(
  isWindows ? "cmd.exe" : "npm",
  isWindows
    ? ["/d", "/s", "/c", "npm run tauri -- build --no-bundle"]
    : ["run", "tauri", "--", "build", "--no-bundle"],
  {
    stdio: "inherit",
    env,
    shell: false,
  },
);

if (result.error) {
  throw result.error;
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
