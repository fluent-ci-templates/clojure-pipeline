# Clojure Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fclojure_pipeline&query=%24.version)](https://pkg.fluentci.io/clojure_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![codecov](https://img.shields.io/codecov/c/gh/fluent-ci-templates/clojure-pipeline)](https://codecov.io/gh/fluent-ci-templates/clojure-pipeline)

A ready-to-use CI/CD Pipeline for your [Clojure](https://clojure.org/) projects.

## 🚀 Usage

Run the following command:

```bash
dagger run fluentci clojure_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t clojure
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

Or simply:

```bash
fluentci
```

## Jobs

| Job     | Description         |
| ------- | ------------------- |
| test    | Run the tests       |
| uberjar | Build an uberjar    |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://pkg.fluentci.io/clojure_pipeline/mod.ts";

const { test, uberjar } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await test(client, src);
    await uberjar(client, src);
  });
}

pipeline();
```
