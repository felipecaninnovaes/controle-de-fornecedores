pub mod insert_user_in_database {

    pub use rusqlite::{Connection, Result};

    use crate::modules::token::token::generate_token;
    #[allow(dead_code)]
    pub fn insert_user_in_database( local: String
    ) -> Result<()> {
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO usuarios (id ,key, username, password) VALUES (?, ?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute(("1",(generate_token().to_string()),("admin@email.com"),"12345"))?;
        Ok(())
    }
}
