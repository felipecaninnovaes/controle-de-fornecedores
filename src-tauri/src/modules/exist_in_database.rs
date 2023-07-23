pub mod exist_in_database {

    pub use rusqlite::{Connection, Result};

    use crate::modules::insert_in_database::insert_in_database::insert_user_in_database;
    pub struct IdUser {
        id: i32,
    }

    #[allow(dead_code)]
    pub fn exist_user_in_database(local: &String, id: &String) -> Result<bool> {
        let conn = Connection::open(local)?;
        let mut stmt = conn.prepare("SELECT * FROM usuarios WHERE id = ?")?;
        let id_iter = stmt.query_map([id], |row| Ok(IdUser { id: row.get(0)? }))?;
        let mut result = String::new();
        for id in id_iter {
            result.push_str(
                id.expect("Erro ao receber os dados")
                    .id
                    .to_string()
                    .as_str(),
            );
        }
        if &result == id {
            Ok(true)
        } else {
            Ok(false)
        }
    }

    pub fn create_admin_user(local: &String) -> Result<()> {
        let exist = exist_user_in_database(&local, &"1".to_string());
        if exist.expect("Error ao obter os dados") == true {
            Ok(())
        } else {
            let _ = insert_user_in_database(
                &local,
                &"admin@email.com".to_string(),
                &"12345".to_string(),
            )
            .expect("Erro ao criar o usuario");
            Ok(())
        }
    }
}
