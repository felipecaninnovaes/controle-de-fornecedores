
import { invoke } from '@tauri-apps/api/tauri'
import { appDir } from '@tauri-apps/api/path'
interface IFormData {
    dataPagamento: string,
    fornecedor: string,
    cnpj: string,
    valor: string,
    multa: string,
    juros: string,
    banco: string
}

export const insert_db = async (dados: IFormData) => {

    const appDirPath = await appDir() + 'database.sqlite'
    let data = dados.dataPagamento.toString()
    const mesSplitValues = data.split('-')
    const MonthAndYear = String(mesSplitValues[0] + '-' + mesSplitValues[1])
    data = String(mesSplitValues[2] + '-' + mesSplitValues[1] + '-' + mesSplitValues[0])

    return (await invoke('insert_database_fn', { local: appDirPath, mes: MonthAndYear, fornecedor: dados.fornecedor, cnpj: dados.cnpj, dataPagamento: dados.dataPagamento, valor: dados.valor, multa: dados.multa, juros: dados.juros, banco: dados.banco }))
}

export const insertUser = async () => {
    const appDirPath = await appDir() + 'database.sqlite'
    return (await invoke('insert_user_in_database_fn', { local: appDirPath }))
  }