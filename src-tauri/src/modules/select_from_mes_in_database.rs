pub mod select_from_mes_in_database {

    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    use serde_rusqlite::*;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    pub struct EmpresasSelectID {
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

    pub fn select_from_mes_in_database(
        local: String,
        mes: String,
    ) -> Result<Vec<EmpresasSelectID>> {
        let conn = Connection::open(local)?;

        let mut statement = conn
            .prepare("SELECT * FROM empresas WHERE mes = ?")
            .unwrap();
        let res = from_rows::<EmpresasSelectID>(statement.query([mes]).unwrap());

        let mut names = Vec::new();
        for empresas in res {
            names.push(empresas.unwrap())
        }
        Ok(names)
    }
}
