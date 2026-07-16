import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import js from "@eslint/js";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "dist/**", "build/**"]
  },
  js.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "no-console": "off",
      "no-unused-vars": "off",
      "no-undef": "off"
    }
  }
];

export default eslintConfig;
