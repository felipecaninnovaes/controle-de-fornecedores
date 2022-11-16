
import { invoke } from '@tauri-apps/api/tauri'
import { appDir, downloadDir } from '@tauri-apps/api/path'

export const export_xlsx = async (periodo: string) => {
    const appDirPath = await appDir() + 'database.sqlite'
    const xlsxFolderLocation = (await downloadDir() + 'relatorio_duplicata_' + periodo + '.xlsx')
    return (await invoke('export_xlsx_fn', { local: appDirPath, mesValue: periodo, xlsxFolder: xlsxFolderLocation }))
  }