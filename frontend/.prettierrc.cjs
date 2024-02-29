// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  singleQuote: false, // TODO: Let's turn this on eventually
  trailingComma: "es5",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "^@test-utils$",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/contexts/(.*)$",
    "^@/hooks/(.*)$",
    "^@/api/(.*)$",
    "^@/assets/(.*)$",
    "^@/components/(.*)$",
    "^@/screens/(.*)$",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};
