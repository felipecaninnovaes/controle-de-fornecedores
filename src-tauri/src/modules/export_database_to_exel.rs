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
            numero_da_nota: String,
            valor: String,
            multa: String,
            juros: String,
            desconto: String,
            banco: String,
        }
        let conn = Connection::open(local)?;
        let mut workbook = Workbook::new();
        let worksheet = workbook.add_worksheet();
        worksheet
            .write_string(0, 0, "DATA DE PAGAMENTO")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 1, "MES")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 2, "FORNECEDOR")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 3, "CNPJ")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 4, "NUMERO DA NOTA")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 5, "VALOR")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 6, "MULTA")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 7, "JUROS")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 8, "DESCONTO")
            .expect("Falha ao gravar");
        worksheet
            .write_string(0, 9, "BANCO")
            .expect("Falha ao gravar");

        let mut stmt = conn.prepare("SELECT id, mes, fornecedor, cnpj, dataPagamento, numeroDaNota, valor, multa, juros, desconto, banco FROM empresas WHERE mes = :mes")?;
        let empresas_iter = stmt.query_map(&[(":mes", &mes_value)], |row| {
            Ok(Empresas {
                id: row.get(0)?,
                mes: row.get(1)?,
                fornecedor: row.get(2)?,
                cnpj: row.get(3)?,
                data_pagamento: row.get(4)?,
                numero_da_nota: row.get(5)?,
                valor: row.get(6)?,
                multa: row.get(7)?,
                juros: row.get(8)?,
                desconto: row.get(9)?,
                banco: row.get(10)?,
            })
        })?;
        let mut num: u32 = 1;
        for empresas in empresas_iter {
            worksheet
                .write_string(
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
                .write_string(num, 1, empresas.as_ref().unwrap().mes.to_string().as_str())
                .expect("Falha ao gravar");
            worksheet
                .write_string(
                    num,
                    2,
                    empresas.as_ref().unwrap().fornecedor.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string(num, 3, empresas.as_ref().unwrap().cnpj.to_string().as_str())
                .expect("Falha ao gravar");
            worksheet
                .write_string(
                    num,
                    4,
                    &empresas.as_ref().unwrap().numero_da_nota.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string(
                    num,
                    5,
                    empresas.as_ref().unwrap().valor.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string(
                    num,
                    6,
                    empresas.as_ref().unwrap().multa.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string(
                    num,
                    7,
                    empresas.as_ref().unwrap().juros.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string(
                    num,
                    8,
                    &empresas.as_ref().unwrap().desconto.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            worksheet
                .write_string(
                    num,
                    9,
                    empresas.as_ref().unwrap().banco.to_string().as_str(),
                )
                .expect("Falha ao gravar");
            num += 1;
        }
        workbook.save(&xlsx_folder).expect("Falha ao salvar");
        Ok(())
    }
}
