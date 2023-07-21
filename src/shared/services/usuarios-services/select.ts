
import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'


// interface IFormData {
//   key: String,
//   username: String,
//   password: String
// }

export const select_all_users_from_database = async () => {
  const appDirPath = await appConfigDir() + 'database.sqlite'
  const resultOfSelectDataBase = await invoke('select_all_users_from_database_fn', { local: appDirPath })
  return resultOfSelectDataBase
}