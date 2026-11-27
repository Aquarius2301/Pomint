import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const env = {
  ...process.env,
  VITE_DISTRIBUTION: "installer",
  TAURI_SIGNING_PRIVATE_KEY: readFileSync("keys/pomint.key", "utf8").trim(),
  TAURI_SIGNING_PRIVATE_KEY_PASSWORD: readFileSync(
    "keys/pomint.key.pwd",
    "utf8",
  ).trim(),
};

const isWindows = process.platform === "win32";

const result = spawnSync(
  isWindows ? "cmd.exe" : "npm",
  isWindows
    ? ["/d", "/s", "/c", "npm run tauri -- build --bundles nsis"]
    : ["run", "tauri", "--", "build", "--bundles", "nsis"],
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
