
import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'

export const delete_user_in_database = async (id: string) => {
  const appDirPath = await appConfigDir() + 'database.sqlite'
  return (await invoke('delete_user_in_database_fn', { local: appDirPath, id: id.toString() }))
}