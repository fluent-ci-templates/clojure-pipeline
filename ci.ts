import {
  test,
  uberjar,
} from "https://pkg.fluentci.io/clojure_pipeline@v0.6.0/mod.ts";

await test(src);
await uberjar(src);
