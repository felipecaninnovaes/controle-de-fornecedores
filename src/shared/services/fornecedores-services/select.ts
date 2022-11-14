
import { invoke } from '@tauri-apps/api/tauri'
import { appDir } from '@tauri-apps/api/path'

export async function select_from_id_in_database(id: string) {
    const appDirPath = await appDir() + 'database.sqlite'
    await invoke('select_from_id_in_database_fn', { local: appDirPath, id: '1' }).then((message) => console.log(message))
  }
  
  export async function select_from_database() {
    const appDirPath = await appDir() + 'database.sqlite'
    const resultOfSelectDataBase = await invoke('select_from_database_fn', { local: appDirPath })
    return resultOfSelectDataBase
  }