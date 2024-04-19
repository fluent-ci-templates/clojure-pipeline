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
    Ok(stdout)
}

pub fn setup_boot() -> Result<String, Error> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec!["mkdir", "-p", "$HOME/.local/bin"])?
        .with_exec(vec!["type boot >/dev/null 2>&1 || pkgx curl -fsSLo boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh"])?
        .with_exec(vec!["type boot >/dev/null 2>&1 || mv boot $HOME/.local/bin/boot"])?
        .with_exec(vec!["type boot >/dev/null 2>&1 || chmod +x $HOME/.local/bin/boot"])?
        .stdout()?;
    Ok(stdout)
}

pub fn setup_clojure(version: String) -> Result<String, Error> {
    let version = if version.is_empty() {
        version
    } else {
        format!("@{}", version)
    };

    let path = dag().get_env("PATH")?;
    let home = dag().get_env("HOME")?;
    dag().set_envs(vec![(
        "PATH".into(),
        format!("{}/.local/bin:{}", home, path),
    )])?;

    setup_java()?;
    setup_lein()?;
    setup_boot()?;

    let stdout = dag()
        .mise()?
        .with_exec(vec![&format!(
            "type clojure > /dev/null 2>&1 || mise install clojure{}",
            version
        )])?
        .with_exec(vec!["clojure", "--version"])?
        .with_exec(vec!["lein", "--version"])?
        .with_exec(vec!["boot", "--version"])?
        .stdout()?;
    Ok(stdout)
}
