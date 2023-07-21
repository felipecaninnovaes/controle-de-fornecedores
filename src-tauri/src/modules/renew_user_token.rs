pub mod renew_user_token {

    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    pub use serde_json::*;
    use serde_rusqlite::*;

    use crate::modules::token::token::generate_token;

    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    #[derive(Clone)]
    pub struct IUsuarios {
       pub id: i32,
       pub key: String,
       pub username: String,
       pub password: String
    }

    pub fn edit_key_user_in_database(
        local: String,
        id: String,
        token: String,
        username: String,
        password: String
    ) -> Result<()> {
        
        let conn = Connection::open(local)?;
        let query = "INSERT OR REPLACE INTO usuarios (id, key, username, password) VALUES (?, ?, ?, ?)";
        let mut stmt = conn.prepare_cached(query)?;
        stmt.execute((id, token, username, password))?;
        Ok(())
    }
    pub fn renew_user_token(local: String, id: String) -> Result<Vec<IUsuarios>> {

        let conn = Connection::open(local.to_string())?;

        let mut statement = conn.prepare("SELECT * FROM usuarios WHERE id = ?").unwrap();
        let res = from_rows::<IUsuarios>(statement.query([id.clone()]).unwrap());
        let mut result: Vec<IUsuarios> = Vec::new();

        for users in res {

            if (users.as_ref().unwrap().username.to_string()) == "" {
                println!("Empty")
            } else {
                let token = generate_token();
                let username = users.as_ref().unwrap().username.to_string(); 
                let password = users.as_ref().unwrap().password.to_string();
                result.push(IUsuarios { id: id.parse::<i32>().unwrap(), key: token, username: username, password: password });
            }


        }
        Ok(result)
    }
}
