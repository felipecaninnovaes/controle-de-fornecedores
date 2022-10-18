pub mod insert_in_database {

    pub use rusqlite::{Connection, Result};
    #[allow(dead_code)]
    pub fn insert_in_database(
        local: String,
        mes: String,
        fornecedor: String,
        data_pagamento: String,
        valor: String,
        banco: String,
    ) -> Result<()> {
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO empresas(mes, fornecedor, dataPagamento, valor, banco) VALUES (?, ?, ?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((mes, fornecedor, data_pagamento, valor, banco))?;
        Ok(())
    }
}
