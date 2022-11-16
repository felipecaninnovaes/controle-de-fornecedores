
import { invoke } from '@tauri-apps/api/tauri'
import { appDir } from '@tauri-apps/api/path'


interface IFormData {
  banco: string,
  cnpj: string,
  dataPagamento: string,
  fornecedor: string,
  id: string,
  juros: string,
  mes: string,
  multa: string,
  valor: string
}
export const select_from_mes_in_database = async (mes: string) => {
  const appDirPath = await appDir() + 'database.sqlite'
  const resultOfSelectDataBase: any = await invoke('select_from_mes_in_database_fn', { local: appDirPath, mes: mes })
  return resultOfSelectDataBase
}

export const select_from_database = async () => {
  const appDirPath = await appDir() + 'database.sqlite'
  const resultOfSelectDataBase = await invoke('select_from_database_fn', { local: appDirPath })
  return resultOfSelectDataBase
}