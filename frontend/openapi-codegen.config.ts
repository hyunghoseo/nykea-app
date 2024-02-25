import { defineConfig } from "@openapi-codegen/cli";
import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";

export default defineConfig({
  api: {
    from: {
      relativePath:
        "../backend/src/extensions/documentation/documentation/1.0.0/full_documentation.json",
      source: "file",
    },
    outputDir: "./src/api",
    to: async (context) => {
      const filenamePrefix = "api";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
