#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod modules;
use modules::{
    create_database::create_database::create_database_fornecedores,
    create_database::create_database::create_database_user,
    delete_in_database::delete_in_database::*,
    edit_in_database::edit_in_database::*,
    export_database_to_exel::export_database_to_exel::export_database_to_exel,
    insert_in_database::insert_in_database::*,
    insert_user_in_database::insert_user_in_database::insert_user_in_database as auto_create_user,
    select_all_users_from_database::select_all_users_from_database::{
        select_all_users_from_database, Usuarios,
    },
    select_from_database::select_from_database::{select_from_database, Empresas},
    select_from_mes_in_database::select_from_mes_in_database::{
        select_from_mes_in_database, EmpresasSelectID,
    },
    verify_user_password::verify_user_password::{verify_user_password, UserSelectUsename}, verify_session::verify_session::{verify_session, VerifySession}
};

#[allow(non_snake_case)]
#[tauri::command]
fn verify_user_password_fn(
    local: String,
    username: String,
    password: String,
) -> Vec<UserSelectUsename> {
    verify_user_password(local, username, password).expect("Erro ao inserir")
}
#[allow(non_snake_case)]
#[tauri::command]
fn verify_user_token_fn(
    local: String,
    id: String,
) -> Vec<VerifySession> {
    verify_session(local, id).expect("Erro ao inserir")
}

#[tauri::command]
fn delete_in_database_fn(local: String, id: String) {
    delete_in_database(local, id).expect("Erro ao inserir");
}

#[tauri::command]
fn delete_user_in_database_fn(local: String, id: String) {
    delete_users_in_database(local, id).expect("Erro ao inserir");
}

#[allow(dead_code)]
#[tauri::command]
fn select_from_database_fn(local: String) -> Vec<Empresas> {
    select_from_database(local).expect("Erro ao selecionar no banco de dados")
}

#[tauri::command]
fn select_all_users_from_database_fn(local: String) -> Vec<Usuarios> {
    select_all_users_from_database(local).expect("Erro ao selecionar no banco de dados")
}

#[tauri::command]
fn select_from_mes_in_database_fn(local: String, mes: String) -> Vec<EmpresasSelectID> {
    select_from_mes_in_database(local, mes).expect("Erro ao selecionar no banco de dados")
}

#[tauri::command]
fn create_database_fn(local: String) {
    create_database_fornecedores(local.to_string()).expect("Erro ao criar o banco de dados");
    create_database_user(local).expect("Erro ao criar o banco de dados");
}
#[tauri::command]
fn auto_create_user_fn(local: String) {
    auto_create_user(local.to_string()).expect("Erro ao criar usuairo o banco de dados");
}

#[allow(non_snake_case)]
#[tauri::command]
fn edit_in_database_fn(
    local: String,
    id: String,
    mes: String,
    fornecedor: String,
    cnpj: String,
    dataPagamento: String,
    numeroDaNota: String,
    valor: String,
    multa: String,
    juros: String,
    desconto: String,
    banco: String,
) {
    edit_in_database(
        local,
        id,
        mes,
        fornecedor,
        cnpj,
        dataPagamento,
        numeroDaNota,
        valor,
        multa,
        juros,
        desconto,
        banco,
    )
    .expect("Erro ao editar");
}

#[allow(non_snake_case)]
#[tauri::command]
fn insert_database_fn(
    local: String,
    mes: String,
    fornecedor: String,
    cnpj: String,
    dataPagamento: String,
    numeroDaNota: String,
    valor: String,
    multa: String,
    juros: String,
    desconto: String,
    banco: String,
) {
    insert_in_database(
        local,
        mes,
        fornecedor,
        cnpj,
        dataPagamento,
        numeroDaNota,
        valor,
        multa,
        juros,
        desconto,
        banco,
    )
    .expect("Erro ao inserir");
}

#[tauri::command]
fn insert_user_in_database_fn(local: String, username: String, password: String) {
    insert_user_in_database(local, username, password).expect("Erro ao inserir");
}

#[tauri::command]
fn edit_user_in_database_fn(local: String, id: String, username: String, password: String) {
    edit_user_in_database(local, id, username, password).expect("Erro ao inserir");
}

#[allow(non_snake_case)]
#[tauri::command]
fn export_xlsx_fn(local: String, mesValue: String, xlsxFolder: String) {
    export_database_to_exel(local, mesValue, xlsxFolder).expect("Erro ao exportar")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            create_database_fn,
            edit_in_database_fn,
            insert_database_fn,
            edit_user_in_database_fn,
            export_xlsx_fn,
            select_from_database_fn,
            delete_in_database_fn,
            delete_user_in_database_fn,
            select_from_mes_in_database_fn,
            verify_user_password_fn,
            auto_create_user_fn,
            insert_user_in_database_fn,
            select_all_users_from_database_fn,
            verify_user_token_fn,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
