import { useEffect, useState } from 'react'
import { ask, message } from '@tauri-apps/api/dialog'
import { arch, platform } from '@tauri-apps/api/os'
import { Environment } from '../../environment'
interface Version {
    tag_name: string
}

export const checkUpdatesApp = async () => {
    const [version, setVersion] = useState<Version[]>([])

    useEffect(() => {
        fetch('https://api.github.com/repos/felipecaninnovaes/controle-de-fornecedores/releases/latest')
            .then(response => response.json()
                .then(data => setVersion(data.tag_name))
            )
    }, [])
    
    const remoteVersion = String(version)
    const currentVersion = String(Environment.APP_VERSION)
    // console.log(remoteVersion)
    if (currentVersion !== remoteVersion && remoteVersion !== '') {
        const response = await ask('A versão '+ remoteVersion + ' está disponivel', {title: 'Atualização', type: 'warning'})
        if(response === true) {
            const archName = await platform()
            if (archName === 'linux') {
                window.location.href = 'https://github.com/felipecaninnovaes/controle-de-fornecedores/releases/download/' + remoteVersion + '/controle-de-fornecedores_' + remoteVersion + '_amd64.AppImage'
                await message('Instalador salvo nos Downloads', { title: 'Instalador', type: 'info' })
            }
            if (archName === 'win32') {
                window.location.href = 'https://github.com/felipecaninnovaes/controle-de-fornecedores/releases/download/' + remoteVersion + '/controle-de-fornecedores_' + remoteVersion + '_x64_Windows.ms'
                await message('Instalador salvo nos Downloads', { title: 'Instalador', type: 'info' })
            }
        }
    }
}