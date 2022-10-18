import { readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { getGData, RawData } from "./getGData";
import { groupBy } from "./helpers/groupBy";
import { ensureDirectory } from "./helpers/ensureDirectory";
import { analyseAll } from "./analysis";
import prettier from "prettier";
import { generateTypes } from "./generateTs";
import { capitalize } from "./helpers/capitalize";
import { singular } from "./helpers/singular";

const prettierOptions = { parser: "typescript" };

export interface GeneratorConfig {
  /** true if the config is disabled */
  disabled?: boolean;

  /** Overrides the generated type for specific fields. */
  overrides: Record<string, string>;

  /** Extracts all values of the key into a type union named as the value. */
  extractedTypes: Record<string, string>;

  /** Extracts all values of the key into a type union named as the value. */
  description: Record<string, string>;

  /** Mapping to override the generated category names. */
  nameOverride: Record<string, string>;

  /** The key in G that this config is used for. Should match the config file name. */
  GKey: string;

  /** The key that should be used to group elements before analysing them. null disables grouping. */
  groupKey: string | null;
}

export class Generator {
  configMap = new Map<string, GeneratorConfig>();
  targetDir: string;
  private configDir?: string;

  constructor(targetDir: string) {
    ensureDirectory(targetDir);
    this.targetDir = targetDir;
  }

  loadConfig(configDir: string) {
    this.configDir = configDir;
    const configFiles = readdirSync(configDir).filter((file) => path.extname(file) === ".json");

    for (const configFile of configFiles) {
      const config = JSON.parse(
        readFileSync(path.join(configDir, configFile), "utf-8")
      ) as GeneratorConfig;

      this.configMap.set(config.GKey, config);
    }
  }

  generateDefaultConfigs(data: RawData) {
    for (const GKey of Object.keys(data)) {
      if (GKey === "version") {
        continue;
      }

      if (this.configMap.has(GKey)) {
        continue;
      }

      if (this.configDir) {
        const defaultConfig: GeneratorConfig = {
          disabled: true,
          GKey: GKey,
          groupKey: null,
          nameOverride: {},
          overrides: {},
          extractedTypes: {},
          description: {},
        };

        writeFileSync(
          path.join(this.configDir, `${GKey}.json`),
          JSON.stringify(defaultConfig, null, 2)
        );
      }
    }
  }

  async generate() {
    const data = await getGData();
    const tmpDir = path.resolve(__dirname, "..", "tmp");

    // generate disabled config files for each missing G key
    this.generateDefaultConfigs(data);

    const gTypesIndex: string[] = [];
    const gDataType: string[] = ["\nexport type GData = {"];

    for (const config of this.configMap.values()) {
      const { groupKey, GKey, disabled } = config;

      if (disabled) continue;

      const outDir = path.join(this.targetDir, "GTypes", GKey);

      const grouped = groupKey ? groupBy(data[GKey], groupKey) : { [GKey]: data[GKey] };
      const analysis = analyseAll(grouped, config);

      ensureDirectory(outDir);
      ensureDirectory(path.join(tmpDir, GKey));

      writeFileSync(path.join(tmpDir, GKey, "grouped.json"), JSON.stringify(grouped, null, 2));

      for (const val of analysis) {
        writeFileSync(
          path.join(tmpDir, `${GKey}/${val.category}_analysis.json`),
          JSON.stringify(val, null, 2)
        );

        writeFileSync(
          path.join(outDir, `${val.category}.ts`),
          prettier.format(generateTypes(val, groupKey, config), prettierOptions)
        );
      }

      // Generate index.ts exporting everything inside the category
      const index = analysis.map((val) => `export * from './${val.category}';`);

      const capitalizedGKey = capitalize(GKey);
      const singularGKey = singular(capitalizedGKey);
      const gKeyType = `G${singularGKey}`;

      if (groupKey) {
        // Add empty line
        index.push("");

        // Import all keys and GItem to generate union
        index.push(
          ...analysis.map(
            (val) =>
              `import type { ${singular(val.category)}Key, G${singular(val.category)} } from './${
                val.category
              }';`
          )
        );

        // Generate union type for all category keys e.g. ItemsKey
        index.push(`\nexport type ${singularGKey}Key =`);
        index.push(...analysis.map((val) => `| ${singular(val.category)}Key`));
        index.push(`;`);

        // Generate union type for all category G definitions e.g. GItems
        index.push(`\nexport type ${gKeyType} =`);
        index.push(...analysis.map((val) => `| G${singular(val.category)}`));
        index.push(`;`);
      }

      // Import GTypes for GTypes/index.ts
      gTypesIndex.push(`import type { ${singularGKey}Key, ${gKeyType} } from './${GKey}';`);

      // Generate GData interface
      gDataType.push(`${GKey}: {[T in ${singularGKey}Key]: ${gKeyType}};`);

      writeFileSync(
        path.join(outDir, "index.ts"),
        prettier.format(index.join("\n") + ";", prettierOptions)
      );
    }

    // Generate index.ts for GTypes
    const gTypesDir = path.join(this.targetDir, "GTypes");

    // End the gDataType definition
    gDataType.push("}");

    gTypesIndex.push(gDataType.join("\n"));

    writeFileSync(
      path.join(gTypesDir, "index.ts"),
      prettier.format(`${gTypesIndex.join("\n")}`, prettierOptions)
    );
  }
}
