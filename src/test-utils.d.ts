/// <reference types="@testing-library/jest-dom" />

declare namespace NodeJS {
  interface Global {
    crypto: {
      randomUUID: () => string;
    };
  }
}

// Ampliación para window.localStorage
interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  clear(): void;
}

// Si es necesario, amplía las interfaces de window para permitir la simulación en pruebas
declare global {
  interface Window {
    localStorage: Storage;
  }
}

export {};
