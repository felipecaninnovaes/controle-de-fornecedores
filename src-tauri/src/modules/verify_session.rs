pub mod verify_session {

    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    pub use serde_json::*;
    use serde_rusqlite::*;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    pub struct VerifySession {
        id: i32,
        key: String,
    }

    pub fn verify_session(local: String, id: String) -> Result<Vec<VerifySession>, rusqlite::Error> {
        let conn = Connection::open(local)?;
        let fix_id: String = id.replace(&['(', ')', ',', '\"', '.', ';', ':', '\''][..], "");
        let mut statement = conn.prepare("SELECT * FROM usuarios WHERE id = ? ").unwrap();
        let res = from_rows::<VerifySession>(statement.query([fix_id]).unwrap());

        let mut names = Vec::new();
        for users in res {
            names.push(users.unwrap())
        }
        Ok(names)
     }
}