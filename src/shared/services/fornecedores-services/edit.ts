import { invoke } from '@tauri-apps/api/tauri'
import { appDir } from '@tauri-apps/api/path'

interface IFormData {
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

export const edit_db = async (id: string, dados: IFormData) => {
  const appDirPath = await appDir() + 'database.sqlite'
  let data = dados.dataPagamento.toString()
  const mesSplitValues = data.split('-')
  const MonthAndYear = String(mesSplitValues[0] + '-' + mesSplitValues[1])
  data = String(mesSplitValues[2] + '-' + mesSplitValues[1] + '-' + mesSplitValues[0])

  return (await invoke('edit_in_database_fn', {
    local: appDirPath,
    id: id,
    mes: MonthAndYear,
    fornecedor: dados.fornecedor,
    cnpj: dados.cnpj,
    dataPagamento: dados.dataPagamento,
    numeroDaNota: dados.numeroDaNota,
    valor: dados.valor,
    multa: dados.multa,
    juros: dados.juros,
    banco: dados.banco
  }))
}