import { JobSpec, Workflow } from "fluent_github_actions";

export function generateYaml(): Workflow {
  const workflow = new Workflow("Clojure Tests");

  const push = {
    branches: ["main"],
  };

  const setupDagger = `\
  curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.8.1 sh
  sudo mv bin/dagger /usr/local/bin
  dagger version`;

  const tests: JobSpec = {
    "runs-on": "ubuntu-latest",
    steps: [
      {
        uses: "actions/checkout@v3",
      },
      {
        uses: "denoland/setup-deno@v1",
        with: {
          "deno-version": "v1.37",
        },
      },
      {
        name: "Setup Fluent CI CLI",
        run: "deno install -A -r https://cli.fluentci.io -n fluentci",
      },
      {
        name: "Setup Dagger",
        run: setupDagger,
      },
      {
        name: "Run Dagger Pipelines",
        run: "fluentci run clojure_pipeline",
      },
    ],
  };

  workflow.on({ push }).jobs({ tests });

  return workflow;
}
