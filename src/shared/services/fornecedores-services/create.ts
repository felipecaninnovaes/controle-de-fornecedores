
import { invoke } from '@tauri-apps/api/tauri'
import { createDir, BaseDirectory } from '@tauri-apps/api/fs'
import { appDir } from '@tauri-apps/api/path'

export const createDataBase = async () => {
    createDir('log', { dir: BaseDirectory.App, recursive: true })
    const appDirPath = await appDir() + 'database.sqlite'
    return (await invoke('create_database_fn', { local: appDirPath }))
  }