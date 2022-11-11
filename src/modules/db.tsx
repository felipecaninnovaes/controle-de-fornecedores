import { appDir, downloadDir } from '@tauri-apps/api/path';

import { invoke } from "@tauri-apps/api/tauri";
import { createDir, BaseDirectory } from '@tauri-apps/api/fs';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Fornecedores {
  id: String,
  mes: String,
  cnpj: String,
  fornecedor: String,
  data_pagamento: String,
  valor: String,
  multa: String,
  juros: String,
  banco: String,
}


export async function create_database() {
  createDir('log', { dir: BaseDirectory.App, recursive: true })
  const appDirPath = await appDir() + "database.sqlite";
  return (await invoke("create_database_fn", { local: appDirPath }));
}

export async function delete_in_database(id: String) {
  const appDirPath = await appDir() + "database.sqlite";
  const notify = () => toast.success('Registro apagado', {
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
  return (await invoke("delete_in_database_fn", { local: appDirPath, id: id.toString() }));
  
}

export async function select_from_database() {
  const appDirPath = await appDir() + "database.sqlite";
  const result = await invoke("select_from_database_fn", { local: appDirPath});
  return result
}

export async function edit_db(id: String, fornecedor: String, cnpj: String, data_pagamento: String, valor: String, multa: String, juros: String, banco: String) {
  const appDirPath = await appDir() + "database.sqlite";
  let data = data_pagamento.toString().replace("-", "/").replace("-", "/")
  const mes_split = data.split("/")
  const mes = String(mes_split[0] + "/" + mes_split[1]);
  data = String(mes_split[2] + "/" + mes_split[1] + "/" + mes_split[0])
  if (fornecedor === "" || valor === "" || banco === "" || data === '' || multa === '' || juros === '') {
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
    const notify = () => toast.success('Editado com sucesso', {
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
    return (await invoke("edit_in_database_fn", { local: appDirPath, id: id, mes: mes, fornecedor: fornecedor, cnpj: cnpj, dataPagamento: data, valor: valor, multa: multa, juros: juros, banco: banco }));
  }
}
export async function insert_db(fornecedor: String, cnpj: String, data_pagamento: String, valor: String, multa: String, juros: String, banco: String) {
  const appDirPath = await appDir() + "database.sqlite";
  let data = data_pagamento.toString().replace("-", "/").replace("-", "/")
  const mes_split = data.split("/")
  const mes = String(mes_split[0] + "/" + mes_split[1]);
  data = String(mes_split[2] + "/" + mes_split[1] + "/" + mes_split[0])
  if (fornecedor === "" || valor === "" || banco === "" || data === '' || multa === '' || juros === '') {
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
    return (await invoke("insert_database_fn", { local: appDirPath, mes: mes, fornecedor: fornecedor, cnpj: cnpj, dataPagamento: data, valor: valor, multa: multa, juros: juros, banco: banco }));
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
