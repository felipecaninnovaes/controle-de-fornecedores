pub mod export_database_to_exel {
    pub use rusqlite::{Connection, Result};
    use rust_xlsxwriter::Workbook;

    pub fn export_database_to_exel(
        local: String,
        mes_value: String,
        xlsx_folder: String,
    ) -> Result<()> {
        #[allow(dead_code)]
        struct Empresas {
            id: i32,
            mes: String,
            fornecedor: String,
            cnpj: String,
            data_pagamento: String,
            valor: String,
            multa: String,
            juros: String,
            banco: String,
        }
        let conn = Connection::open(local)?;
        let mut workbook = Workbook::new();
        let worksheet = workbook.add_worksheet();
        worksheet
            .write_string_only(0, 0, "Data de Pagamento")
            .expect("Falha ao gravar");
            worksheet
                .write_string_only(0, 1, "Fornecedor")
                .expect("Falha ao gravar");
                worksheet
                    .write_string_only(0, 2, "CNPJ")
                    .expect("Falha ao gravar");
        worksheet
            .write_string_only(0, 3, "Valor")
            .expect("Falha ao gravar");
            worksheet
                .write_string_only(0, 4, "Multa")
                .expect("Falha ao gravar");
                worksheet
                    .write_string_only(0, 5, "Juros")
                    .expect("Falha ao gravar");
        worksheet
            .write_string_only(0, 6, "Banco")
            .expect("Falha ao gravar");

        let mut stmt = conn.prepare("SELECT id, mes, fornecedor, cnpj, dataPagamento, valor, multa, juros, banco FROM empresas WHERE mes = :mes")?;
        let empresas_iter = stmt.query_map(&[(":mes", &mes_value)], |row| {
            Ok(Empresas {
                id: row.get(0)?,
                mes: row.get(1)?,
                fornecedor: row.get(2)?,
                cnpj: row.get(3)?,
                data_pagamento: row.get(4)?,
                valor: row.get(5)?,
                multa: row.get(6)?,
                juros: row.get(7)?,
                banco: row.get(8)?,
            })
        })?;
        let mut num: u32 = 1;
        for empresas in empresas_iter {
            worksheet
                .write_string_only(
                    num,
                    0,
                    empresas
                        .as_ref()
                        .unwrap()
                        .data_pagamento
                        .to_string()
                        .as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string_only(
                    num,
                    1,
                    empresas.as_ref().unwrap().fornecedor.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string_only(num, 2, empresas.as_ref().unwrap().cnpj.to_string().as_str())
                .expect("Falha ao gravar");
            worksheet
                .write_string_only(
                    num,
                    3,
                    empresas.as_ref().unwrap().valor.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string_only(
                    num,
                    4,
                    empresas.as_ref().unwrap().multa.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string_only(
                    num,
                    5,
                    empresas.as_ref().unwrap().juros.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string_only(
                    num,
                    6,
                    empresas.as_ref().unwrap().banco.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            num += 1;
        }
        workbook.save(&xlsx_folder).expect("Falha ao salvar");
        Ok(())
    }
}
