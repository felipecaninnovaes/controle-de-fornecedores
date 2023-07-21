import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'

interface IFormData {
  username: String,
  password: String
}

export const edit_user_db = async (id: string, dados: IFormData) => {
  const appDirPath = await appConfigDir() + 'database.sqlite'

  return (await invoke('edit_user_in_database_fn', {
    local: appDirPath,
    id: id,
    username: dados.username,
    password: dados.password
  }))
}