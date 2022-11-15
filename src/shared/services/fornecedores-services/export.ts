
import { invoke } from '@tauri-apps/api/tauri'
import { appDir, downloadDir } from '@tauri-apps/api/path'

export const export_xlsx = async (periodo: string) => {
    const mounthReplacedSeparetor = periodo.replace('-', '/')
    const appDirPath = await appDir() + 'database.sqlite'
    const xlsxFolderLocation = (await downloadDir() + 'relatorio_duplicata_' + (mounthReplacedSeparetor).replace('/', '') + '.xlsx')
    return (await invoke('export_xlsx_fn', { local: appDirPath, mesValue: mounthReplacedSeparetor, xlsxFolder: xlsxFolderLocation }))
  }