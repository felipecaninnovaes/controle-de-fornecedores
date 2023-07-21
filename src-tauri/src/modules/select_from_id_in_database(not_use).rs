pub mod select_from_id_in_database {

    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    pub use serde_json::*;
    use serde_rusqlite::*;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    struct EmpresasSelectID {
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

    fn select_from_id_in_database(local: String, id: String) -> Result<Vec<EmpresasSelectID>> {
        let conn = Connection::open(local)?;

        let mut statement = conn.prepare("SELECT * FROM empresas WHERE id = ?").unwrap();
        let res = from_rows::<EmpresasSelectID>(statement.query([id]).unwrap());

        let mut names = Vec::new();
        for empresas in res {
            names.push(empresas.unwrap())
        }
        Ok(names)
    }

    fn select_user_where_id_in_database(
        local: String,
        id: String,
    ) -> Result<Vec<EmpresasSelectID>> {
        let conn = Connection::open(local)?;

        let mut statement = conn.prepare("SELECT * FROM usuarios WHERE id = ?").unwrap();
        let res = from_rows::<EmpresasSelectID>(statement.query([id]).unwrap());

        let mut names = Vec::new();
        for empresas in res {
            names.push(empresas.unwrap())
        }
        Ok(names)
    }
}
