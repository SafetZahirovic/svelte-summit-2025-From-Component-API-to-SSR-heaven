import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginSvelte from "eslint-plugin-svelte";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],
  eslintConfigPrettier,
  ...eslintPluginSvelte.configs["flat/prettier"],
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: { ...globals.node, ...globals.browser, HTMLLottieElement: true },
      parser: svelteParser,
      parserOptions: {
        parser: tsEslint.parser,
        extraFileExtensions: [".svelte"],
      },
    },
  },
  {
    ignores: ["**/dist", "**/node_modules"],
  }
);
