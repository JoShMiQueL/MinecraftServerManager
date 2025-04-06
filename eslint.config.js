import { defineConfig, globalIgnores } from "eslint/config";
import neostandard from "neostandard";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  neostandard({
    ts: true,
    jsx: true,
    semi: true,
  }),
  globalIgnores(["src-tauri/**"]),
]);
