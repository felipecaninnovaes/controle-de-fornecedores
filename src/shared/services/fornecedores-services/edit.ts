import { invoke } from '@tauri-apps/api/tauri'
import { appDir } from '@tauri-apps/api/path'

export async function edit_db(id: string, fornecedor: string, cnpj: string, data_pagamento: string, valor: string, multa: string, juros: string, banco: string) {
    const appDirPath = await appDir() + 'database.sqlite'
    let data = data_pagamento.toString().replace('-', '/').replace('-', '/')
    const mesSplitValues = data.split('/')
    const MonthAndYear = String(mesSplitValues[0] + '/' + mesSplitValues[1])
    data = String(mesSplitValues[2] + '/' + mesSplitValues[1] + '/' + mesSplitValues[0])
  
    return (await invoke('edit_in_database_fn', { local: appDirPath, id: id, mes: MonthAndYear, fornecedor: fornecedor, cnpj: cnpj, dataPagamento: data, valor: valor, multa: multa, juros: juros, banco: banco }))
  }