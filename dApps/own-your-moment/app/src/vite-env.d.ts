/// <reference types="vite/client" />

interface Window {
  Buffer?: typeof import("buffer").Buffer;
  process?: typeof import("process");
}
