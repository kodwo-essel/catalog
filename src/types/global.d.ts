// src/types/global.d.ts
export {};

declare global {
  interface Window {
    RUNTIME_CONFIG: {
      API_URL: string;
    };
  }
}
