pub mod select_from_database {

    pub use rusqlite::{Connection, Result};

    #[allow(dead_code)]
    pub fn select_from_database(local: String, id: i32) -> Result<Vec<String>> {
        struct Empresas {
            id: i32,
            mes: String,
            fornecedor: String,
            data_pagamento: String,
            valor: String,
            banco: String,
        }

        let conn = Connection::open(local)?;
        let mut stmt = conn.prepare(
            "SELECT id, mes , fornecedor, dataPagamento, valor, banco FROM empresas WHERE id = :id",
        )?;
        let rows = stmt.query_map(&[(":id", &id)], |row| {
            Ok(Empresas {
                id: row.get(0)?,
                mes: row.get(1)?,
                fornecedor: row.get(2)?,
                data_pagamento: row.get(3)?,
                valor: row.get(4)?,
                banco: row.get(5)?,
            })
        })?;

        let mut names = Vec::new();
        for empresas in rows {
            names.push(empresas.as_ref().unwrap().id.to_string());
            names.push(empresas.as_ref().unwrap().mes.to_string());
            names.push(empresas.as_ref().unwrap().fornecedor.to_string());
            names.push(empresas.as_ref().unwrap().data_pagamento.to_string());
            names.push(empresas.as_ref().unwrap().valor.to_string());
            names.push(empresas.as_ref().unwrap().banco.to_string());
        }
        // println!("{:?}", names);
        Ok(names)
    }
}
