import { Directory, dag } from "../../sdk/client.gen.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  uberjar = "uberjar",
  test = "test",
}

export const exclude = [".git", ".fluentci", "target"];

/**
 * @function
 * @description Builds an uberjar
 * @param {string | Directory} src
 * @returns {Promise<Directory | string>}
 */
export async function uberjar(
  src: Directory | string | undefined = "."
): Promise<Directory | string> {
  const context = await getDirectory(dag, src);
  const ctr = dag
    .pipeline(Job.uberjar)
    .container()
    .from("ghcr.io/fluentci-io/clojure:latest")
    .withMountedCache("/root/.m2", dag.cacheVolume("maven"))
    .withMountedCache("/app/target", dag.cacheVolume("clojure-build"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["sh", "-c", 'eval "$(devbox global shellenv)" && lein uberjar'])
    .withExec(["cp", "-r", "target", "/"]);

  await ctr.stdout();
  const id = await ctr.directory("/target").id();
  await ctr.directory("/target").export("./target");

  return id;
}

/**
 * @function
 * @description Runs tests
 * @param {string | Directory} src
 * @returns {string}
 */
export async function test(
  src: Directory | string | undefined = "."
): Promise<string> {
  const context = await getDirectory(dag, src);
  const ctr = dag
    .pipeline(Job.test)
    .container()
    .from("ghcr.io/fluentci-io/clojure:latest")
    .withMountedCache("/root/.m2", dag.cacheVolume("maven"))
    .withMountedCache("/app/target", dag.cacheVolume("clojure-build"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(["sh", "-c", 'eval "$(devbox global shellenv)" && lein test']);

  const result = await ctr.stdout();
  return result;
}

export type JobExec = (src?: string) => Promise<string | Directory>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.uberjar]: uberjar,
  [Job.test]: test,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.uberjar]: "Builds an uberjar",
  [Job.test]: "Runs tests",
};
