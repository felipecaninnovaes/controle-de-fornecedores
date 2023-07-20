pub mod verify_user_password {

    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    pub use serde_json::*;
    use serde_rusqlite::*;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    pub struct UserSelectUsename {
        id: i32,
        key: String,
    }

    pub fn verify_user_password(local: String, username: String, password: String) -> Result<Vec<UserSelectUsename>> {
        let conn = Connection::open(local)?;

        let mut statement = conn.prepare("SELECT * FROM usuarios WHERE username = ? AND password = ?").unwrap();
        let res = from_rows::<UserSelectUsename>(statement.query([username, password]).unwrap());
        
        let mut names = Vec::new();
        for users in res {
            names.push(users.unwrap())
        }
        if names == Vec::new() {
            Ok(Vec::new())
        } else {
            Ok(names)
        }
     }
}