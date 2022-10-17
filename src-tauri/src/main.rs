#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod export;
use export::exports as exports;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[allow(dead_code)]
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[allow(non_snake_case)]
#[tauri::command]
fn create_database(local: String) {
    exports::create_data_base(local).expect("Erro ao criar o banco de dados");
}
#[allow(non_snake_case)]
#[tauri::command]
fn edit_in_database(local: String ,id: i32 ,mes: String, fornecedor: String, dataPagamento: String, valor: String, banco: String){
    exports::edit_in_database(local, id ,mes, fornecedor, dataPagamento, valor, banco).expect("Erro ao editar");
}

#[allow(non_snake_case)]
#[tauri::command]
fn insert_database(local: String ,mes: String, fornecedor: String, dataPagamento: String, valor: String, banco: String){
    exports::insert_in_database(local ,mes, fornecedor, dataPagamento, valor, banco).expect("Erro ao inserir");
}

#[allow(non_snake_case)]
#[tauri::command]
fn export_xlsx(local: String ,mesValue: String, log: String, xlsxFolder: String) {
    exports::export_export_data(local, mesValue, log, xlsxFolder).expect("Erro ao exportar")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_database, edit_in_database, insert_database, export_xlsx])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
