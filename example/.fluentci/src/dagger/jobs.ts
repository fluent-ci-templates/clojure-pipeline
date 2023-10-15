import { connect } from "../../deps.ts";

export enum Job {
  uberjar = "uberjar",
  test = "test",
}

export const exclude = [".git", ".fluentci", "target"];

export const uberjar = async (src = ".") => {
  await connect(async (client) => {
    const context = client.host().directory(src);
    const ctr = client
      .pipeline(Job.uberjar)
      .container()
      .from("ghcr.io/fluent-ci-templates/clojure:latest")
      .withMountedCache("/root/.m2", client.cacheVolume("maven"))
      .withMountedCache("/app/target", client.cacheVolume("clojure-build"))
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        'eval "$(devbox global shellenv)" && lein uberjar',
      ]);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "done";
};

export const test = async (src = ".") => {
  await connect(async (client) => {
    const context = client.host().directory(src);
    const ctr = client
      .pipeline(Job.test)
      .container()
      .from("ghcr.io/fluent-ci-templates/clojure:latest")
      .withMountedCache("/root/.m2", client.cacheVolume("maven"))
      .withMountedCache("/app/target", client.cacheVolume("clojure-build"))
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec(["sh", "-c", 'eval "$(devbox global shellenv)" && lein test']);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "done";
};

export type JobExec = (src?: string) =>
  | Promise<string>
  | ((
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.uberjar]: uberjar,
  [Job.test]: test,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.uberjar]: "Builds an uberjar",
  [Job.test]: "Runs tests",
};
