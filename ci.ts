import {
  test,
  uberjar,
} from "https://pkg.fluentci.io/clojure_pipeline@v0.6.1/mod.ts";

await test();
await uberjar();
