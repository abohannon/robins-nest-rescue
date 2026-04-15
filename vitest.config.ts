import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^.*\.(jpg|jpeg|png|gif|svg|webp)$/,
        replacement:
          "/Users/adam.bohannon/Projects/robins-nest/web/robins-nest-rescue/src/__mocks__/fileMock.ts",
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
