import { defineConfig, globalIgnores } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import neostandard from "neostandard";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  neostandard({
    ts: true,
    jsx: true,
    semi: true,
  }),
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  globalIgnores(["src-tauri/**"]),
]);
