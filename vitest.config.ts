import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^.*\.(jpg|jpeg|png|gif|svg|webp)$/,
        replacement: resolve(__dir, "src/__mocks__/fileMock.ts"),
      },
    ],
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/test-utils.tsx"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
