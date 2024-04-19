use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_clojure;

pub mod helpers;

#[plugin_fn]
pub fn setup(version: String) -> FnResult<String> {
    let stdout = setup_clojure(version)?;
    Ok(stdout)
}

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    setup_clojure(dag().get_env("CLOJURE_VERSION")?)?;

    let stdout = dag()
        .pipeline("test")?
        .mise()?
        .with_exec(vec!["lein", "test", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn uberjar(args: String) -> FnResult<String> {
    setup_clojure(dag().get_env("CLOJURE_VERSION")?)?;

    let stdout = dag()
        .pipeline("uberjar")?
        .mise()?
        .with_exec(vec!["lein", "uberjar", &args])?
        .stdout()?;
    Ok(stdout)
}
