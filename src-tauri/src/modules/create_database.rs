pub mod create_database {
    pub use rusqlite::{Connection, Result};

    #[allow(dead_code)]
    pub fn create_database_fornecedores(local: &String) -> Result<()> {
        let conn = Connection::open(local)?;
        conn.execute(
            "CREATE TABLE if not exists empresas (
            id   INTEGER PRIMARY KEY,
            mes TEXT NOT NULL,
            fornecedor TEXT NOT NULL,
            cnpj TEXT NOT NULL,
            dataPagamento TEXT NOT NULL,
            numeroDaNota TEXT NOT NULL,
            valor TEXT NOT NULL,
            multa TEXT NOT NULL,
            juros TEXT NOT NULL,
            desconto TEXT NOT NULL,
            banco TEXT NOT NULL
        )",
            (), // empty list of parameters.
        )?;
        Ok(())
    }
    pub fn create_database_user(local: &String) -> Result<()> {
        let conn = Connection::open(local)?;
        conn.execute(
            "CREATE TABLE if not exists usuarios (
            id   INTEGER PRIMARY KEY,
            key TEXT NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )",
            (), // empty list of parameters.
        )?;
        Ok(())
    }
}
