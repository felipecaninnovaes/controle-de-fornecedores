pub mod insert_user_in_database {

    pub use rusqlite::{Connection, Result};
    use crypto::pbkdf2::{pbkdf2_check, pbkdf2_simple};


    #[allow(dead_code)]
    pub fn insert_user_in_database(
        local: String,
        key: String,
        username: String,
        password: String
    ) -> Result<()> {

        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO usuarios(key, username, password) VALUES (?, ?, ?,)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((key, username, password))?;
        Ok(())
    }
}
