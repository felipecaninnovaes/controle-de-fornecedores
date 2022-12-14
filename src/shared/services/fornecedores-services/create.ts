
import { invoke } from '@tauri-apps/api/tauri'
import { createDir, BaseDirectory } from '@tauri-apps/api/fs'
import { appConfigDir } from '@tauri-apps/api/path'

export const createDataBase = async () => {
  createDir('log', { dir: BaseDirectory.App, recursive: true })
  const appDirPath = await appConfigDir() + 'database.sqlite'
  return (await invoke('create_database_fn', { local: appDirPath }))
}