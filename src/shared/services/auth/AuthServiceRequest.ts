import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'
import { tokenValidation } from './TokenValidation'

export async function verify_username_and_passowrd(username: string, password: string) {
  const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'
  const LOCAL_STORAGE_USER_ID = 'USER_ID'
  const appDirPath = await appConfigDir() + 'database.sqlite'
  const result: any = (await invoke('verify_user_password_fn', { local: appDirPath, username: username, password: password }))
  
  if (!result.length) {
    return ('')
  }
  return ('{"accessToken": ' + '"' + result[0].key +'",'+ '"userID": ' + '"' + result[0].id +'"' +'}')
}