
import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'


interface IFormData {
  mes: string,
  fornecedor: string,
  cnpj: string,
  dataPagamento: string,
  numeroDaNota: string,
  valor: string,
  multa: string,
  juros: string,
  desconto: string,
  banco: string
}
export const select_from_mes_in_database = async (mes: string) => {

  const appDirPath = await appConfigDir() + 'database.sqlite'
  const resultOfSelectDataBase: IFormData = await invoke('select_from_mes_in_database_fn', { local: appDirPath, mes: mes }) as IFormData

  return resultOfSelectDataBase
}

export const select_from_database = async () => {
  const appDirPath = await appConfigDir() + 'database.sqlite'
  const resultOfSelectDataBase = await invoke('select_from_database_fn', { local: appDirPath })
  return resultOfSelectDataBase
}