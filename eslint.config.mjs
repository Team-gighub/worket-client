import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import preferArrow from "eslint-plugin-prefer-arrow";

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    plugins: {
      "prefer-arrow": preferArrow,
    },
    rules: {
      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
          allowStandaloneDeclarations: false,
        },
      ],
    },
  },
]);

export default eslintConfig;
