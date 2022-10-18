pub mod edit_in_database {
    
    pub use rusqlite::{Connection, Result};
    #[allow(dead_code)]
    pub fn edit_in_database(
        local: String,
        id: i32,
        mes: String,
        fornecedor: String,
        data_pagamento: String,
        valor: String,
        banco: String,
    ) -> Result<()> {
        struct Empresas {
            id: i32,
            mes: String,
            fornecedor: String,
            data_pagamento: String,
            valor: String,
            banco: String,
        }

        
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO empresas(id, mes, fornecedor, dataPagamento, valor, banco) VALUES (?, ?, ?, ?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((id, mes, fornecedor, data_pagamento, valor, banco))?;
        Ok(())
    }
}
