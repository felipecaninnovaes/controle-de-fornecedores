
import { invoke } from '@tauri-apps/api/tauri'
import { createDir, BaseDirectory } from '@tauri-apps/api/fs'
import { appDir, downloadDir } from '@tauri-apps/api/path'

export async function export_xlsx(periodo: string) {
    const mounthReplacedSeparetor = periodo.replace('-', '/')
    const appDirPath = await appDir() + 'database.sqlite'
    const xlsxFolderLocation = (await downloadDir() + 'relatorio_duplicata_' + (mounthReplacedSeparetor).replace('/', '') + '.xlsx')
    return (await invoke('export_xlsx_fn', { local: appDirPath, mesValue: mounthReplacedSeparetor, xlsxFolder: xlsxFolderLocation }))
  }