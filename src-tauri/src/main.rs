#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod modules;
use modules::{
    edit_in_database::edit_in_database::edit_in_database, 
    insert_in_database::insert_in_database::insert_in_database, 
    select_from_database::select_from_database::{select_from_database, Empresas},
    create_database::create_database::create_database,
    export_database_to_exel::export_database_to_exel::export_database_to_exel,
    delete_in_database::delete_in_database::delete_in_database
};

#[allow(non_snake_case)]
#[tauri::command]
fn delete_in_database_fn(local: String ,id: String){
    delete_in_database(local ,id).expect("Erro ao inserir");
}

#[allow(dead_code)]
#[tauri::command]
fn select_from_database_fn(local: String) -> Vec<Empresas>{
    select_from_database(local).expect("Erro ao selecionar no banco de dados")
}

#[tauri::command]
fn create_database_fn(local: String) {
    create_database(local).expect("Erro ao criar o banco de dados");
}
#[allow(non_snake_case)]
#[tauri::command]
fn edit_in_database_fn(local: String ,id: String ,mes: String, fornecedor: String, cnpj: String, dataPagamento: String, valor: String, multa: String, juros: String, banco: String){
    edit_in_database(local, id ,mes, fornecedor, cnpj, dataPagamento, valor, multa, juros, banco).expect("Erro ao editar");
}

#[allow(non_snake_case)]
#[tauri::command]
fn insert_database_fn(local: String ,mes: String, fornecedor: String, cnpj: String, dataPagamento: String, valor: String, multa: String, juros: String, banco: String){
    insert_in_database(local ,mes, fornecedor, cnpj, dataPagamento, valor, multa, juros, banco).expect("Erro ao inserir");
}

#[allow(non_snake_case)]
#[tauri::command]
fn export_xlsx_fn(local: String ,mesValue: String, xlsxFolder: String) {
    export_database_to_exel(local, mesValue, xlsxFolder).expect("Erro ao exportar")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_database_fn, edit_in_database_fn, insert_database_fn, export_xlsx_fn, select_from_database_fn, delete_in_database_fn])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
