pub mod select_all_users_from_database {
    
    pub use rusqlite::{Connection, Result};
    pub use serde::{Deserialize, Serialize};
    use serde_rusqlite::*;
    pub use serde_json::*;
    #[allow(dead_code)]
    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    #[allow(non_snake_case)]
    pub struct Usuarios {
        id: i32,
        key: String,
        username: String,
        password: String
    }

    pub fn select_all_users_from_database(local: String) -> Result<Vec<Usuarios>> {

        let conn = Connection::open(local)?;

        let mut statement = conn.prepare("SELECT * FROM usuarios").unwrap();
        let res = from_rows::<Usuarios>(statement.query([]).unwrap());

        let mut names = Vec::new();
        for usuarios in res {
           names.push(usuarios.unwrap())
        }
        Ok(names)
    }
}