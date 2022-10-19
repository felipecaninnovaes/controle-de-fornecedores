pub mod select_from_database {

    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    use serde_rusqlite::*;
    pub use serde_json::*;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    pub struct Empresas {
        id: i32,
        mes: String,
        fornecedor: String,
        dataPagamento: String,
        valor: String,
        banco: String,
    }

    pub fn select_from_database(local: String, id: i32) -> Result<Vec<Empresas>> {

        let conn = Connection::open(local)?;

        let mut statement = conn.prepare("SELECT * FROM empresas").unwrap();
        let res = from_rows::<Empresas>(statement.query([]).unwrap());

        let mut names = Vec::new();
        for empresas in res {
           names.push(empresas.unwrap())
        }
        Ok(names)
    }
}