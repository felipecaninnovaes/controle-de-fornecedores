import { useEffect, useState } from 'react'
import { ask } from '@tauri-apps/api/dialog'

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
    const currentVersion = String('1.1.0')
    console.log(remoteVersion)
    if (currentVersion !== remoteVersion && remoteVersion !== '') {
        const yes = await ask('Are you sure?', 'Tauri')
    }
}