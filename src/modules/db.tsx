
import { appDir, downloadDir } from '@tauri-apps/api/path';

import { invoke } from "@tauri-apps/api/tauri";
import { createDir, BaseDirectory } from '@tauri-apps/api/fs';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Fornecedores {
  id: String,
  mes: String,
  fornecedor: String,
  data_pagamento: String,
  valor: String,
  banco: String,
}

export async function create_database() {
  createDir('log', { dir: BaseDirectory.App, recursive: true })
  const appDirPath = await appDir() + "database.sqlite";
  return (await invoke("create_database_fn", { local: appDirPath }));
}


export async function select_from_database(id: Number) {

  const appDirPath = await appDir() + "database.sqlite";
  const result = await invoke("select_from_database_fn", { local: appDirPath, id: id });
  // const fornecedor: Fornecedores = {
  //   id: result[0],
  //   mes: result[1],
  //   fornecedor: result[2],
  //   data_pagamento: result[3],
  //   valor: result[4],
  //   banco: result[5]
  // }
  // var myJsonString = JSON.stringify(result)
  console.log(result)
  return result
}


export async function insert_db(fornecedor: String, dataPagamento: String, valor: String, banco: String) {
  const appDirPath = await appDir() + "database.sqlite";
  const data = dataPagamento.toString().replace("-", "/").replace("-", "/")
  const mes_split = data.split("/")
  const mes = String(mes_split[0] + "/" + mes_split[1]);
  console.log(data)
  if (fornecedor === "" || valor === "" || banco === "" || data === '') {
    const notify = () => toast.error('Campo em branco', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    notify()
  } else {
    const notify = () => toast.success('Inserido com sucesso', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    notify()


    // console.log(mes)
    return (await invoke("insert_database_fn", { local: appDirPath, mes: mes, fornecedor: fornecedor, dataPagamento: dataPagamento, valor: valor, banco: banco }));
  }

}

export async function export_xlsx(periodo: String) {
  console.log(periodo)
  const mes = periodo.replace("-", "/")
  console.log(mes)
  const appDirPath = await appDir() + "database.sqlite";
  const xlsx_folder = (await downloadDir() + "relatorio_duplicata_" + (mes).replace('/', '') + ".xlsx")

  if (mes === "") {
    const notify = () => toast.error('Campo em branco', {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    notify()
  } else {

    const notify = () => toast.success('Arquivo gerado na pasta de Downloads', {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    notify()
    return (await invoke("export_xlsx_fn", { local: appDirPath, mesValue: mes, xlsxFolder: xlsx_folder }));
  }





}
