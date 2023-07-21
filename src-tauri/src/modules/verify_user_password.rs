pub mod verify_user_password {

    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    pub use serde_json::*;
    use serde_rusqlite::*;
    use crate::modules::renew_user_token::renew_user_token::edit_key_user_in_database;
    use crate::modules::renew_user_token::renew_user_token::renew_user_token;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    pub struct UserSelectUsename {
        id: i32,
        key: String,
    }
    pub fn verify_user_password(local: String, username: String, password: String) -> Result<Vec<UserSelectUsename>> {
        let conn = Connection::open(local.to_string())?;
        let mut statement = conn.prepare("SELECT * FROM usuarios WHERE username = ? AND password = ?").unwrap();
        let result = from_rows::<UserSelectUsename>(statement.query([username, password]).unwrap());
        let mut names = Vec::new();
        let mut id = String::new();
        for users in result {
            id = users.as_ref().unwrap().id.to_string();
        }
        if id == "" {
            Ok(Vec::new())
        } else {
            let tokens = renew_user_token(local.to_string(), id.to_string()).unwrap();

            for i in tokens {
                let _ = edit_key_user_in_database(local.to_string(), i.id.to_string(), i.key.to_string(), i.username.to_string(), i.password.to_string());
                names.push(UserSelectUsename {id: i.id, key: i.key.to_string()});
            }
            Ok(names)
        }
     }
}