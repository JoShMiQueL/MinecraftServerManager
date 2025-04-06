import { defineConfig, globalIgnores } from 'eslint/config';
import neostandard from 'neostandard';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  neostandard({
    ts: true,
    jsx: true,
    semi: true
  }),
  eslintPluginPrettierRecommended,
  globalIgnores(['src-tauri/**'])
]);
