pub mod create_database {
    pub use rusqlite::{Connection, Result};

    #[allow(dead_code)]
    pub fn create_database(local: String) -> Result<()> {
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
        conn.execute(
            "CREATE TABLE if not exists venda (
            id   INTEGER PRIMARY KEY,
            idCliente TEXT NOT NULL,
            produto TEXT NOT NULL,
            saida TEXT NOT NULL,
            valor TEXT NOT NULL
        )",
            (), // empty list of parameters.
        )?;
        conn.execute(
            "CREATE TABLE if not exists cliente (
            id   INTEGER PRIMARY KEY,
            nome TEXT NOT NULL,
            sobrenome TEXT NOT NULL,
            cpf TEXT NOT NULL,
            dataDeNascimento TEXT NOT NULL,
            endereco TEXT NOT NULL,
            telefone TEXT NOT NULL
        )",
            (), // empty list of parameters.
        )?;
        conn.execute(
            "CREATE TABLE if not exists estoque (
            id   INTEGER PRIMARY KEY,
            codigo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            valorEntrada TEXT NOT NULL,
            valorSaida TEXT NOT NULL,
            quantidade TEXT NOT NULL
        )",
            (), // empty list of parameters.
        )?;
        conn.execute(
            "CREATE TABLE if not exists venda (
            id   INTEGER PRIMARY KEY,
            idCliente TEXT NOT NULL,
            produto TEXT NOT NULL,
            quantidade TEXT NOT NULL,
            valor TEXT NOT NULL
        )",
            (), // empty list of parameters.
        )?;
        Ok(())
    }

    pub fn create_database_user(local: String) -> Result<()> {
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
