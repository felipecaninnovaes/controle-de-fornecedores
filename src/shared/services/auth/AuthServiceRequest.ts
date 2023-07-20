import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'


interface IToken {
  id: string,
  key: string,
}

export async function verify_username_and_passowrd(username: string, password: string) {
  const appDirPath = await appConfigDir() + 'database.sqlite'
  const result: Array<IToken> = (await invoke('verify_user_password_fn', { local: appDirPath, username: username, password: password }))
  
  if (!result.length) {
    return ('')
  }
  return ('{"accessToken": ' + '"' + result[0].key +'",'+ '"userID": ' + '"' + result[0].id +'"' +'}')
}