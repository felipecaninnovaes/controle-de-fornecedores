pub mod edit_in_database {

    pub use rusqlite::{Connection, Result};
    use tauri::utils::config::parse;
    #[allow(dead_code)]
    pub fn edit_in_database(
        local: String,
        id: String,
        mes: String,
        fornecedor: String,
        cnpj: String,
        data_pagamento: String,
        valor: String,
        multa: String,
        juros: String,
        banco: String,
    ) -> Result<()> {
        let idC:i32 = id.trim().parse().unwrap();
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO empresas(id, mes, fornecedor, cnpj, dataPagamento, valor, multa, juros, banco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((id, mes, fornecedor, cnpj, data_pagamento, valor, multa, juros, banco))?;
        Ok(())
    }
}
