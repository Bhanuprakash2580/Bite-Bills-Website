/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare const Astro: Readonly<import("astro").AstroGlobal>;

declare global {
  interface SDKTypeMode {
    strict: true;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly BASE_NAME: string;
  }
}

// Minimal metadata type used by route objects
type PageMetadata = {
  title?: string;
  description?: string;
  [key: string]: unknown;
};

// React Router DOM types are built-in for v6+
