pub mod count {
    
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
        cnpj: String,
        dataPagamento: String,
        valor: String,
        multa: String,
        juros: String,
        banco: String,
    }

    pub fn count(local: &String) -> Result<i32> {
        let mut rowCount = 0;
        let mut pageCount = 1;

        let conn = Connection::open(local)?;

        let mut statement = conn.prepare("SELECT * FROM empresas").unwrap();
        let res = from_rows::<Empresas>(statement.query([]).unwrap());
        for empresas in res {
           if rowCount == 10 {
            pageCount += 1;
            rowCount = 0
        }
        rowCount += 1;
        }
        Ok(pageCount)
    }
}