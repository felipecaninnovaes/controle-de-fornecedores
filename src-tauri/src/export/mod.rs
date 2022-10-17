pub mod exports {
    #[allow(unused_must_use)]
    use rusqlite::{Connection, Result};
    use rust_xlsxwriter::{Workbook};
    use std::fs::File;
    use std::io::Read;
    use std::io::Write;
    
    


    pub fn read_cache(log: String) -> String {
        let mut data = String::new();
        let mut f = File::open(log).expect("falha to open file");
        f.read_to_string(&mut data).expect("Unable to read string");
        return data;
    }

    pub fn write_cache(log: String, value: String) {
        let data = value;
        let mut f = File::create(log).expect("Unable to create file");
        f.write_all(data.as_bytes()).expect("Unable to write data");
    }
    #[allow(non_snake_case)]
    #[derive(Debug)]
    struct Empresas {
        id: i32,
        mes: String,
        fornecedor: String,
        dataPagamento: String,
        valor: String,
        banco: String,
    }
#[allow(non_snake_case)]
pub fn insert_in_database(local: String ,mes: String, fornecedor: String, dataPagamento: String, valor: String, banco: String)  -> Result<()> {
    let conn = Connection::open(local)?;
    let query = "INSERT OR REPLACE INTO empresas(mes, fornecedor, dataPagamento, valor, banco) VALUES (?, ?, ?, ?, ?)";
    let mut stmt = conn.prepare_cached(query)?;
    stmt.execute((mes, fornecedor, dataPagamento, valor, banco))?;
    Ok(())
}
#[allow(non_snake_case)]
pub fn edit_in_database(local: String ,id: i32,mes: String, fornecedor: String, dataPagamento: String, valor: String, banco: String)  -> Result<()> {
    let conn = Connection::open(local)?;
    let query = "INSERT OR REPLACE INTO empresas(id, mes, fornecedor, dataPagamento, valor, banco) VALUES (?, ?, ?, ?, ?, ?)";
    let mut stmt = conn.prepare_cached(query)?;
    stmt.execute((id, mes, fornecedor, dataPagamento, valor, banco))?;
    Ok(())
}

pub fn create_data_base(local: String)  -> Result<()> {
    let conn = Connection::open(local)?;
    conn.execute(
        "CREATE TABLE if not exists empresas (
            id   INTEGER PRIMARY KEY,
            mes TEXT NOT NULL,
            fornecedor TEXT NOT NULL,
            dataPagamento TEXT NOT NULL,
            valor TEXT NOT NULL,
            banco TEXT NOT NULL
        )",
        (), // empty list of parameters.
    )?;  
    Ok(())
}
#[allow(non_snake_case)]
pub fn export_export_data(local: String ,mes_value: String, log: String, xlsx_folder: String) -> Result<()> {
    let conn = Connection::open(local)?;
    let mut workbook = Workbook::new(&xlsx_folder);
    let worksheet = workbook.add_worksheet();
    worksheet.write_string_only(0, 0, "Lancamento").expect("Falha ao gravar");
    worksheet.write_string_only(0, 1, "Mes").expect("Falha ao gravar");
    worksheet.write_string_only(0, 2, "Fornecedor").expect("Falha ao gravar");
    worksheet.write_string_only(0, 3, "Data de Pagamento").expect("Falha ao gravar");
    worksheet.write_string_only(0, 4, "valor").expect("Falha ao gravar");
    worksheet.write_string_only(0, 5, "banco").expect("Falha ao gravar");



    let mut stmt = conn.prepare("SELECT id, mes, fornecedor, dataPagamento, valor, banco FROM empresas WHERE mes = :mes")?;
    let empresas_iter = stmt.query_map(&[(":mes", &mes_value)], |row| { Ok(Empresas {
        id: row.get(0)?,
        mes: row.get(1)?,
        fornecedor: row.get(2)?,
        dataPagamento: row.get(3)?,
        valor: row.get(4)?,
        banco: row.get(5)?,
    })
    })?;
    write_cache(log.to_string(), "1".to_string());
    for empresas in empresas_iter {
        let id: String = empresas.as_ref().unwrap().id.to_string();
        let mes: String = empresas.as_ref().unwrap().mes.to_string();
        let fornecedor: String = empresas.as_ref().unwrap().fornecedor.to_string();
        let dataPagamento: String = empresas.as_ref().unwrap().dataPagamento.to_string();
        let valor: String = empresas.as_ref().unwrap().valor.to_string();
        let banco: String = empresas.as_ref().unwrap().banco.to_string();
        let cache: String = read_cache(log.to_string());
        println!("{}", cache);
        let my_num: u32 = cache.trim().parse()
        .expect("please give me correct string number!");
        worksheet.write_string_only(my_num, 0, &id.to_string()).expect("Falha ao gravar");
        worksheet.write_string_only(my_num, 1, &mes.to_string()).expect("Falha ao gravar");
        worksheet.write_string_only(my_num, 2, &fornecedor.to_string()).expect("Falha ao gravar");
        worksheet.write_string_only(my_num, 3, &dataPagamento.to_string()).expect("Falha ao gravar");
        worksheet.write_string_only(my_num, 4, &valor.to_string()).expect("Falha ao gravar");
        worksheet.write_string_only(my_num, 5, &banco.to_string()).expect("Falha ao gravar");
        let my_num: u32 = my_num + 1;
        write_cache(log.to_string(),my_num.to_string());
        // let num: i32 = num + 1;
    };
    workbook.close().expect("Falha ao salvar");
    Ok(())
}

}