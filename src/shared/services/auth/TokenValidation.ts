import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'


export async function tokenValidation(id: string, token: string) {
    const appDirPath = await appConfigDir() + 'database.sqlite'
    const validate: boolean = await invoke('check_token_valid_fn', { local: appDirPath, token: token, id: id })
    return (validate)
}