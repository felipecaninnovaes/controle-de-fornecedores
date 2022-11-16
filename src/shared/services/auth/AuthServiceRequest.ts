
import { invoke } from '@tauri-apps/api/tauri'
import { appDir } from '@tauri-apps/api/path'

export async function verify_username_and_passowrd(username: string, password: string) {
    const appDirPath = await appDir() + 'database.sqlite'
    const result: any = (await invoke('verify_user_password_fn', { local: appDirPath, username: username, password: password }))
  
    if (!result.length) {
      return ('')
    }
    return ('{"accessToken": "aaaaaaaaaa.bbbbbbbbbb.cccccccc"}')
  }