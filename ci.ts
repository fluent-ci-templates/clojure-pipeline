import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import {
  test,
  uberjar,
} from "https://pkg.fluentci.io/clojure_pipeline@v0.3.1/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await test(client, src);
    await uberjar(client, src);
  });
}

pipeline();
