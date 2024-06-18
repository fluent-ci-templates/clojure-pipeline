# Clojure Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/clojure_pipeline)](https://pkg.fluentci.io/clojure_pipeline)
[![deno module](https://shield.deno.dev/x/clojure_pipeline)](https://deno.land/x/clojure_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.42)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/clojure)](https://jsr.io/@fluentci/clojure)
[![codecov](https://img.shields.io/codecov/c/gh/fluent-ci-templates/clojure-pipeline)](https://codecov.io/gh/fluent-ci-templates/clojure-pipeline)

A ready-to-use CI/CD Pipeline for your [Clojure](https://clojure.org/) projects.

## 🚀 Usage

Run the following command:

```bash
fluentci run clojure_pipeline
```

Or, if you want to use it as a template :

```bash
fluentci init -t clojure
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

Or simply:

```bash
fluentci
```

## Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger install github.com/fluent-ci-templates/clojure-pipeline@main
```

## Jobs

| Job     | Description         |
| ------- | ------------------- |
| test    | Run the tests       |
| uberjar | Build an uberjar    |

```typescript
uberjar(
  src: Directory | string
): Promise<Directory | string>

test(src: Directory | string): Promise<string>
```

## Programmatic usage

You can also use this pipeline programmatically :

```ts
import { test, uberjar } from "jsr:@fluentci/clojure";

await test();
await uberjar();
```
