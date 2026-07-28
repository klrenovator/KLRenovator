import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";
import globals from "globals";

// ─────────────────────────────────────────────────────────────────────────
// NOTE (fixed): this config previously registered no `files` patterns and no
// TypeScript parser. ESLint 9 flat config only matches **/*.js, **/*.mjs and
// **/*.cjs by default — so every .ts/.tsx file in the project was silently
// skipped and `npm run lint` always reported 0 problems. Verified by running
// eslint against a deliberately broken .tsx file: "File ignored because no
// matching configuration was supplied".
//
// The TypeScript block below is what actually makes linting work.
// ─────────────────────────────────────────────────────────────────────────

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "dist/**",
      "build/**",
      "next-env.d.ts",
      // Generated from config/site.ts — see scripts/gen-site-public.mjs
      "config/site-public.ts",
    ],
  },

  js.configs.recommended,
  nextPlugin.configs["core-web-vitals"],

  // ── TypeScript / TSX ───────────────────────────────────────────────────
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,

      // TypeScript's own compiler (npm run typecheck) is the source of truth
      // for unused/any — keeping these off avoids duplicate noise.
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      // TS handles undefined identifiers; the base rule misfires on types.
      "no-undef": "off",

      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": "error",
      "no-console": "off",

      // Real bugs worth failing on.
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-constant-condition": ["error", { checkLoops: false }],
    },
  },

  // ── Plain JS (scripts, config files) ───────────────────────────────────
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      "no-console": "off",
    },
  },
];

export default eslintConfig;
