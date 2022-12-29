
import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'
interface IFormData {
    username: String,
    password: String
}

export const insert_user = async (dados: IFormData) => {

    const appDirPath = await appConfigDir() + 'database.sqlite'

    return (await invoke('insert_user_in_database_fn', {
        local: appDirPath,
        username: dados.username,
        password: dados.password
    }))
}