pub mod delete_in_database {

    pub use rusqlite::{params ,Connection, Result};
    #[allow(dead_code)]
    pub fn delete_in_database(
        local: &String,
        id: &String
    ) -> Result<()> {
        let conn = Connection::open(local)?;
        conn.execute("delete from empresas WHERE id =(?1)", &[&id])?;
        Ok(())
    }
    #[allow(dead_code)]
    pub fn delete_users_in_database(
        local: &String,
        id: &String
    ) -> Result<()> {
        let conn = Connection::open(local)?;
        conn.execute("delete from usuarios WHERE id =(?1)", &[&id])?;
        Ok(())
    }
}
