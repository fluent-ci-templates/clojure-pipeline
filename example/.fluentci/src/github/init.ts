import { generateYaml } from "./config.ts";

generateYaml().save(".github/workflows/clojure-tests.yml");
