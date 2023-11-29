pub mod select_from_database {
    
    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    use serde_rusqlite::*;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    pub struct Empresas {
        id: i32,
        mes: String,
        fornecedor: String,
        cnpj: String,
        dataPagamento: String,
        numeroDaNota: String,
        valor: String,
        multa: String,
        juros: String,
        desconto: String,
        banco: String,
    }

    pub fn select_from_database(local: String) -> Result<Vec<Empresas>> {

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