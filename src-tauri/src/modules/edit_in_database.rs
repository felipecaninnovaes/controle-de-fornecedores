pub mod edit_in_database {

    pub use rusqlite::{Connection, Result};

    use crate::modules::token::token::generate_token;
    #[allow(dead_code)]
    pub fn edit_in_database(
        local: &String,
        id: &String,
        mes: &String,
        fornecedor: &String,
        cnpj: &String,
        data_pagamento: &String,
        numero_da_nota: &String,
        valor: &String,
        multa: &String,
        juros: &String,
        desconto: &String,
        banco: &String,
    ) -> Result<()> {
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO empresas(id, mes, fornecedor, cnpj, dataPagamento, numeroDaNota, valor, multa, juros, desconto, banco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((id, mes, fornecedor, cnpj, data_pagamento, numero_da_nota, valor, multa, juros, desconto, banco))?;
        Ok(())
    }
    #[allow(dead_code)]
    pub fn edit_user_in_database(
        local: String,
        id: String,
        username: String,
        password: String
    ) -> Result<()> {
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO usuarios(id, key, username, password) VALUES (?, ?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((id, (generate_token().to_string()), username, password))?;
        Ok(())
    }
}
