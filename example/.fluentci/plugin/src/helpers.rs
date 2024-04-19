use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_java() -> Result<String, Error> {
    let version = dag().get_env("JAVA_VERSION")?;
    let version = if version.is_empty() {
        version
    } else {
        format!("@{}", version)
    };

    let stdout = dag()
        .mise()?
        .with_exec(vec![&format!(
            "type java >/dev/null 2>&1 || mise install java{}",
            version
        )])?
        .stdout()?;
    Ok(stdout)
}

pub fn setup_lein() -> Result<String, Error> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec!["mkdir", "-p", "$HOME/.local/bin"])?
        .with_exec(vec!["type lein >/dev/null 2>&1 || pkgx wget https://codeberg.org/leiningen/leiningen/raw/branch/stable/bin/lein"])?
        .with_exec(vec!["type lein >/dev/null 2>&1 || mv lein $HOME/.local/bin/lein"])?
        .with_exec(vec!["type lein >/dev/null 2>&1 || chmod +x $HOME/.local/bin/lein"])?
        .stdout()?;

    let path = dag().get_env("PATH")?;
    let home = dag().get_env("HOME")?;
    dag().set_envs(vec![(
        "PATH".into(),
        format!("{}/.local/bin:{}", home, path),
    )])?;

    Ok(stdout)
}

pub fn setup_clojure(version: String) -> Result<String, Error> {
    let version = if version.is_empty() {
        version
    } else {
        format!("@{}", version)
    };

    setup_java()?;
    setup_lein()?;

    let stdout = dag()
        .mise()?
        .with_exec(vec![&format!(
            "type clojure > /dev/null 2>&1 || mise install clojure{}",
            version
        )])?
        .stdout()?;
    Ok(stdout)
}
