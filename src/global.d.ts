// global.d.ts
export {};

declare global {
  interface Window {
    reactFunction?: (data: unknown) => void;
    callAngularFunction?: (data: unknown) => unknown;
    keycloakInstance: any;
  }
}
