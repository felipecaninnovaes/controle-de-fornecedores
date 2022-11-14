
import { invoke } from '@tauri-apps/api/tauri'
import { appDir } from '@tauri-apps/api/path'

export async function delete_in_database(id: string) {
    const appDirPath = await appDir() + 'database.sqlite'
    return (await invoke('delete_in_database_fn', { local: appDirPath, id: id.toString() }))
  
  }