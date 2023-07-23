pub mod insert_in_database {

    pub use rusqlite::{Connection, Result};

    use crate::modules::token::token::generate_token;
    #[allow(dead_code)]
    pub fn insert_in_database(
        local: String,
        mes: String,
        fornecedor: String,
        cnpj: String,
        data_pagamento: String,
        numero_da_nota: String,
        valor: String,
        multa: String,
        juros: String,
        desconto: String,
        banco: String,
    ) -> Result<()> {
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO empresas(mes, fornecedor, cnpj, dataPagamento, numeroDaNota, valor, multa, juros, desconto, banco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((
            mes,
            fornecedor,
            cnpj,
            data_pagamento,
            numero_da_nota,
            valor,
            multa,
            juros,
            desconto,
            banco,
        ))?;
        Ok(())
    }
    #[allow(dead_code)]
    pub fn insert_user_in_database(
        local: &String,
        username: &String,
        password: &String,
    ) -> Result<()> {
        let key = generate_token();
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO usuarios (key, username, password) VALUES (?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((key, username, password))?;
        Ok(())
    }
}
