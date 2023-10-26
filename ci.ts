import {
  test,
  uberjar,
} from "https://pkg.fluentci.io/clojure_pipeline@v0.4.1/mod.ts";

await test(src);
await uberjar(src);
