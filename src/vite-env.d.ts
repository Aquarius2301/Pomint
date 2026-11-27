/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_DISTRIBUTION?: "portable" | "installer";
}

declare global {
  interface Window {
    api: {
      notify: (payload: NotificationPayload) => Promise<void>;
    };
  }
}

export {};
