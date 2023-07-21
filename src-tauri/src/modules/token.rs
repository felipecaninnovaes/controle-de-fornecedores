pub mod token {

    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    pub use serde_json::*;
    use serde_rusqlite::*;    
    pub use md5;
    pub use chrono::Utc;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    pub struct TokenSession {
        key: String,
    }

    pub fn check_token_valid(local: String, token: String, id: String) -> Result<bool> {
        let conn = Connection::open(local)?;
        let mut stmt = conn.prepare("SELECT * FROM usuarios WHERE id = ?")?;
        let token_iter = stmt.query_map([id], |row| Ok(TokenSession { key: row.get(1)? }))?;
        let mut result: String = String::new();
        for token in token_iter {
            result = token.unwrap().key;
        }
        if result == token {
            Ok(true)
        } else {
            Ok(false)
        }
    }

    pub fn generate_token() -> String {
        let dt = Utc::now();
        let random = dt.timestamp().to_string();
        let token = format!("{:X}", md5::compute(&random));
        return token;
    }
}