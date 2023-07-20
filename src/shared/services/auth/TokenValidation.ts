import { invoke } from '@tauri-apps/api/tauri'
import { appConfigDir } from '@tauri-apps/api/path'


export async function tokenValidation(id: string, token: string) {

  interface IToken {
    id: string,
    key: string,
  }

const appDirPath = await appConfigDir() + 'database.sqlite'
const result: Array<IToken> = await invoke('verify_user_token_fn', { local: appDirPath, id: id , token: token})

if (token == result[0].key) {
  return(true)
} else {
  return(false)
}
}