
import { invoke } from '@tauri-apps/api/tauri'
import { downloadDir, appConfigDir } from '@tauri-apps/api/path'

export const export_xlsx = async (periodo: string) => {
  const appDirPath = await appConfigDir() + 'database.sqlite'
  const xlsxFolderLocation = (await downloadDir() + 'relatorio_duplicata_' + periodo + '.xlsx')
  return (await invoke('export_xlsx_fn', { local: appDirPath, mesValue: periodo, xlsxFolder: xlsxFolderLocation }))
}